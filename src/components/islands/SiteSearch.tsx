import { useCallback, useEffect, useRef, useState } from 'react';
import { logger } from '@sentry/react';
import { Dialog, Icon } from '@/components/ui';
import { withIslandBoundary } from './IslandBoundary';

export type SiteSearchProps = {
  /** Where Pagefind writes its bundle (astro-pagefind: `<outDir>/pagefind/`). */
  bundlePath?: string;
};

type Status = 'idle' | 'loading' | 'ready' | 'unavailable';

interface PagefindUIInstance {
  destroy?: () => void;
}
type PagefindUIConstructor = new (options: Record<string, unknown>) => PagefindUIInstance;

declare global {
  interface Window {
    PagefindUI?: PagefindUIConstructor;
  }
}

const SCRIPT_ID = 'flj-pagefind-ui-js';
const STYLE_ID = 'flj-pagefind-ui-css';

/** Inject a <script>/<link> once and resolve when it has loaded. */
function loadAsset(kind: 'script' | 'style', id: string, url: string): Promise<void> {
  const existing = document.getElementById(id);
  if (existing?.dataset.loaded === 'true') return Promise.resolve();
  return new Promise((resolve, reject) => {
    const el =
      (existing as HTMLScriptElement | HTMLLinkElement | null) ??
      (kind === 'script'
        ? Object.assign(document.createElement('script'), { src: url, async: true })
        : Object.assign(document.createElement('link'), { rel: 'stylesheet', href: url }));
    el.id = id;
    el.addEventListener('load', () => {
      el.dataset.loaded = 'true';
      resolve();
    });
    el.addEventListener('error', () => {
      el.remove();
      reject(new Error(`Falha ao carregar ${url}`));
    });
    if (!existing) document.head.append(el);
  });
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
}

/**
 * Header search: a trigger button that opens a modal and lazy-loads Pagefind's
 * default UI (`/pagefind/pagefind-ui.{js,css}`). Those files only exist after
 * `astro build`, so they are injected at runtime — never bundled. In `astro dev`
 * without a previous build a friendly pt-BR notice is shown instead.
 * Shortcuts: Ctrl/⌘+K or "/" open the search.
 */
function SiteSearchImpl({ bundlePath = '/pagefind/' }: SiteSearchProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<PagefindUIInstance | null>(null);

  const focusInput = useCallback(() => {
    // Wait a frame so the modal has painted before moving focus into it.
    requestAnimationFrame(() => {
      containerRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    });
  }, []);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      await Promise.all([
        loadAsset('style', STYLE_ID, `${bundlePath}pagefind-ui.css`),
        loadAsset('script', SCRIPT_ID, `${bundlePath}pagefind-ui.js`),
      ]);
      const PagefindUI = window.PagefindUI;
      if (!PagefindUI || !containerRef.current) throw new Error('PagefindUI indisponível');
      instanceRef.current = new PagefindUI({
        element: containerRef.current,
        bundlePath,
        showSubResults: true,
        showImages: false,
        resetStyles: false,
        translations: { placeholder: 'O que você procura?' },
      });
      setStatus('ready');
      focusInput();
    } catch (error) {
      setStatus('unavailable');
      if (import.meta.env.PROD) {
        logger.warn('Pagefind UI failed to load', {
          bundlePath,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }, [bundlePath, focusInput]);

  const statusRef = useRef<Status>('idle');
  statusRef.current = status;

  // Lazy-load on first open (and retry after a failure); refocus the field on later opens.
  const openSearch = useCallback(() => {
    setOpen(true);
    const current = statusRef.current;
    if (current === 'idle' || current === 'unavailable') void load();
    else if (current === 'ready') focusInput();
  }, [load, focusInput]);

  // Global shortcuts.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const combo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const slash = e.key === '/' && !e.metaKey && !e.ctrlKey && !isTypingTarget(e.target);
      if (combo || slash) {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openSearch]);

  useEffect(() => () => instanceRef.current?.destroy?.(), []);

  return (
    <>
      <button
        type="button"
        className="flj-search-trigger"
        aria-haspopup="dialog"
        aria-label="Buscar no site"
        onClick={openSearch}
      >
        <Icon name="search" size={18} />
        <span className="flj-search-trigger__label" aria-hidden="true">
          Buscar
        </span>
      </button>

      <Dialog
        open={open}
        title="Buscar no site"
        onClose={() => setOpen(false)}
        width={720}
        className="flj-search"
      >
        {status === 'loading' && (
          <p className="flj-search__status" role="status">
            Carregando a busca…
          </p>
        )}
        {status === 'unavailable' && (
          <p className="flj-search__status flj-search__status--warn" role="status">
            {import.meta.env.DEV
              ? 'A busca é gerada durante o build e ainda não existe no modo de desenvolvimento. Rode "npm run build" e depois "npm run preview" para testá-la.'
              : 'Não foi possível carregar a busca agora. Verifique sua conexão e tente novamente.'}
          </p>
        )}
        <div ref={containerRef} className="flj-search__ui" />
      </Dialog>
    </>
  );
}

export const SiteSearch = withIslandBoundary(SiteSearchImpl, 'SiteSearch');
export default SiteSearch;
