import { Icon } from '@/components/ui';
import type { InstagramPost } from '@/loaders/behold';
import { instagramUrl } from '@/data/site';
import { cx } from '@/lib/cx';
import { Heading, linkAttrs, type HeadingLevel } from './utils';

/**
 * <InstagramFeed> — static grid (up to `limit`, default 6) of Instagram posts
 * from the `instagram` collection (Behold loader). Each tile: square photo
 * (behold.pictures `sizes.medium`), navy date block (day + pt-BR month, in
 * America/Sao_Paulo), play/album marker, caption truncated to 3 lines, and the
 * whole tile links to the post (new tab, data-track="instagram-post").
 *
 * Props
 *  - posts: InstagramPost[]   pass `(await getCollection('instagram')).map(e => e.data)`;
 *                             sorted newest-first here.
 *  - limit?: number (default 6)
 *  - headingLevel?: 3 | 4 (default 3) — each caption snippet is a visually small heading
 *  - emptyText?: string       shown when there are no posts (default links to Instagram)
 *
 * Emoji and hashtags are stripped from captions (no emoji in UI).
 */
export interface InstagramFeedProps {
  posts: InstagramPost[];
  limit?: number;
  headingLevel?: HeadingLevel;
  emptyText?: string;
  className?: string;
}

const TZ = 'America/Sao_Paulo';
const dayFmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', timeZone: TZ });
const monthFmt = new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: TZ });
const fullFmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: TZ });

const EMOJI = /[\p{Extended_Pictographic}\p{Regional_Indicator}\u{FE0F}\u{200D}\u{20E3}]/gu;

/** Caption without emoji, trailing hashtags and extra whitespace. */
export function cleanCaption(post: Pick<InstagramPost, 'caption' | 'prunedCaption'>): string {
  const text = post.prunedCaption || post.caption || '';
  return text
    .replace(EMOJI, '')
    .replace(/(^|\s)#[\p{L}\p{N}_]+/gu, '$1')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ') > max * 0.6 ? cut.lastIndexOf(' ') : max).trimEnd()}…`;
}

export function InstagramFeed({ posts, limit = 6, headingLevel = 3, emptyText, className }: InstagramFeedProps) {
  const list = [...posts].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, limit);

  if (list.length === 0) {
    return (
      <p className="flj-insta__empty">
        {emptyText ?? 'Acompanhe as novidades do Fab Lab Joinville no Instagram: '}
        <a {...linkAttrs(instagramUrl)} data-track="instagram">
          @fablabjoinville
        </a>
      </p>
    );
  }

  return (
    <ul className={cx('flj-insta', className)} role="list">
      {list.map((post) => {
        const date = new Date(post.timestamp);
        const valid = !Number.isNaN(date.getTime());
        const caption = cleanCaption(post);
        const [firstLine = '', ...restLines] = caption.split('\n');
        const title = truncate(firstLine || 'Publicação no Instagram', 90);
        const body = truncate(restLines.join(' '), 160);
        const img = post.sizes.medium;
        const when = valid ? fullFmt.format(date) : '';
        const alt = `Imagem da publicação do Instagram${when ? ` de ${when}` : ''}: ${truncate(caption.replace(/\n/g, ' '), 120)}`;
        return (
          <li key={post.id} className="flj-insta__item">
            <a
              className="flj-insta__link"
              {...linkAttrs(post.permalink)}
              data-track="instagram-post"
            >
              <div className="flj-insta__media">
                <img
                  className="flj-insta__img"
                  src={img.mediaUrl}
                  srcSet={`${post.sizes.small.mediaUrl} ${post.sizes.small.width}w, ${img.mediaUrl} ${img.width}w, ${post.sizes.large.mediaUrl} ${post.sizes.large.width}w`}
                  sizes="(min-width: 60em) 24rem, (min-width: 40em) 50vw, 100vw"
                  width={img.width}
                  height={img.height}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                />
                {valid && (
                  <time className="flj-insta__date" dateTime={post.timestamp}>
                    <span className="flj-insta__day">{dayFmt.format(date)}</span>
                    <span className="flj-insta__month">{monthFmt.format(date).replace('.', '').toUpperCase()}</span>
                  </time>
                )}
                {post.mediaType !== 'IMAGE' && (
                  <span className="flj-insta__kind">
                    <Icon name={post.mediaType === 'VIDEO' ? 'play' : 'layers'} size={16} />
                    <span className="sr-only">{post.mediaType === 'VIDEO' ? 'Vídeo' : 'Álbum'}</span>
                  </span>
                )}
              </div>
              <div className="flj-insta__body">
                <Heading level={headingLevel} className="flj-insta__title">
                  {title}
                </Heading>
                {body && <p className="flj-insta__caption">{body}</p>}
                <span className="flj-insta__more">
                  Ver no Instagram
                  <Icon name="arrow-up-right" size={14} />
                </span>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
