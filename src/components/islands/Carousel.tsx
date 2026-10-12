import type * as React from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { IconButton } from '@/components/ui';
import type { ImageSource } from '@/lib/images';
import { Picture } from '@/components/sections/Picture';
import { withIslandBoundary } from './IslandBoundary';

/**
 * <Carousel client:visible /> — photo carousel built on a CSS scroll-snap track.
 *
 * No JS: a horizontally scrollable, snapping row of slides (touch/trackpad/keyboard
 * scroll; the track is focusable). Hydrated: adds previous/next IconButtons and
 * dot buttons, keeps the current slide in sync via IntersectionObserver, and
 * supports ←/→ keys on the track. Smooth scrolling only when the visitor does
 * not prefer reduced motion. No autoplay.
 *
 * Props (serialisable)
 *  - slides: { image: ImageSource; alt: string; caption?: string }[]
 *  - label?: string      accessible name of the carousel (default "Galeria de fotos")
 *  - aspect?: string     slide aspect ratio (default '16/9')
 */
export type CarouselSlide = { image: ImageSource; alt: string; caption?: string };

export type CarouselProps = {
  slides: CarouselSlide[];
  label?: string;
  aspect?: string;
};

function CarouselImpl({ slides, label = 'Galeria de fotos', aspect = '16/9' }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [current, setCurrent] = useState(0);
  const baseId = useId();

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(index)) setCurrent(index);
          }
        }
      },
      { root: track, threshold: 0.6 },
    );
    track.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = (index + slides.length) % slides.length;
      const slide = track.querySelector<HTMLElement>(`[data-index="${clamped}"]`);
      if (!slide) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const left = track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
      setCurrent(clamped);
    },
    [slides.length],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(current + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current - 1);
    }
  };

  const style = { '--flj-carousel-aspect': aspect.replace('/', ' / ') } as React.CSSProperties;

  return (
    <section className="flj-carousel" aria-roledescription="carrossel" aria-label={label} style={style}>
      <ul
        ref={trackRef}
        className="flj-carousel__track"
        role="list"
        tabIndex={0}
        aria-label={`${label}: role para ver mais fotos`}
        onKeyDown={hydrated ? onKeyDown : undefined}
      >
        {slides.map((slide, i) => (
          <li
            key={`${slide.image.src}-${i}`}
            id={`${baseId}-slide-${i}`}
            className="flj-carousel__slide"
            data-index={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${slides.length}`}
          >
            <figure className="flj-carousel__figure">
              <Picture
                image={slide.image}
                alt={slide.alt}
                sizes="(min-width: 75em) 72rem, 100vw"
                loading={i === 0 ? 'eager' : 'lazy'}
                className="flj-carousel__img"
              />
              {slide.caption && <figcaption className="flj-carousel__caption">{slide.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
      {hydrated && slides.length > 1 && (
        <div className="flj-carousel__controls">
          <IconButton icon="chevron-left" label="Foto anterior" variant="secondary" onClick={() => goTo(current - 1)} />
          <div className="flj-carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className="flj-carousel__dot"
                aria-label={`Ir para a foto ${i + 1} de ${slides.length}`}
                aria-current={i === current ? 'true' : undefined}
                aria-controls={`${baseId}-slide-${i}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <IconButton icon="chevron-right" label="Próxima foto" variant="secondary" onClick={() => goTo(current + 1)} />
        </div>
      )}
    </section>
  );
}

export const Carousel = withIslandBoundary(CarouselImpl, 'Carousel');
