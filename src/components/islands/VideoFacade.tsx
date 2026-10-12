import { useState, type MouseEvent } from 'react';
import { metrics } from '@sentry/react';
import { Icon } from '@/components/ui';
import type { ImageSource } from '@/lib/images';
import { linkAttrs } from '@/components/sections/utils';
import { Picture } from '@/components/sections/Picture';
import { withIslandBoundary } from './IslandBoundary';

/**
 * <VideoFacade client:visible /> — lightweight video placeholder (poster +
 * play button). The real player iframe is created only after a click.
 *
 * Props (serialisable)
 *  - provider: 'youtube' | 'drive'
 *  - id: string           YouTube video id (e.g. "D-8BeTLw0Ts") or Drive file id
 *  - title: string        accessible title (button label "Reproduzir vídeo: <title>", iframe title)
 *  - poster?: ImageSource from img() (recommended). YouTube falls back to
 *                         i.ytimg.com/vi/<id>/hqdefault.jpg; Drive falls back to a navy card.
 *  - posterAlt?: string   default "Miniatura do vídeo: <title>"
 *  - aspect?: '16/9' | '9/16' (default '16/9')
 *
 * No JS: the facade is a plain link to the video page (YouTube watch / Drive
 * view), so it always works. Hydrated: the click is intercepted and swapped for
 * the embed (youtube-nocookie.com/embed/<id>?autoplay=1 or
 * drive.google.com/file/d/<id>/preview).
 *
 * Telemetry: metrics.count('video_play', 1, { attributes: { provider, video_id } }).
 */
export type VideoFacadeProps = {
  provider: 'youtube' | 'drive';
  id: string;
  title: string;
  poster?: ImageSource;
  posterAlt?: string;
  aspect?: '16/9' | '9/16';
};

function urls(provider: VideoFacadeProps['provider'], id: string) {
  const vid = encodeURIComponent(id);
  return provider === 'youtube'
    ? {
        page: `https://www.youtube.com/watch?v=${vid}`,
        embed: `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0`,
        poster: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
      }
    : {
        page: `https://drive.google.com/file/d/${vid}/view`,
        embed: `https://drive.google.com/file/d/${vid}/preview`,
        poster: undefined,
      };
}

function VideoFacadeImpl({ provider, id, title, poster, posterAlt, aspect = '16/9' }: VideoFacadeProps) {
  const alt = posterAlt ?? `Miniatura do vídeo: ${title}`;
  const [playing, setPlaying] = useState(false);
  const { page, embed, poster: fallbackPoster } = urls(provider, id);
  const cls = `flj-video flj-video--${aspect === '9/16' ? 'portrait' : 'landscape'}`;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab/window) behave like a normal link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    setPlaying(true);
    try {
      metrics.count('video_play', 1, { attributes: { provider, video_id: id } });
    } catch {
      // Telemetry must never block playback.
    }
  };

  if (playing) {
    return (
      <div className={`${cls} flj-video--playing`}>
        <iframe
          className="flj-video__frame"
          src={embed}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={cls}>
      <a
        className="flj-video__facade"
        {...linkAttrs(page)}
        onClick={onClick}
        aria-label={`Reproduzir vídeo: ${title}`}
      >
        {poster ? (
          <Picture image={poster} alt={alt} sizes="(min-width: 60em) 40rem, 100vw" className="flj-video__poster" />
        ) : fallbackPoster ? (
          <img className="flj-video__poster" src={fallbackPoster} alt={alt} width={480} height={360} loading="lazy" decoding="async" />
        ) : (
          <span className="flj-video__blank" aria-hidden="true" />
        )}
        <span className="flj-video__play" aria-hidden="true">
          <Icon name="play" size={32} />
        </span>
        <span className="flj-video__title" aria-hidden="true">
          {title}
        </span>
      </a>
    </div>
  );
}

export const VideoFacade = withIslandBoundary(VideoFacadeImpl, 'VideoFacade');
