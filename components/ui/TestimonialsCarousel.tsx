'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

interface Props {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

const VISIBLE = 3;

export function TestimonialsCarousel({ testimonials, autoPlayInterval = 4500 }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = testimonials.length;

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev' = 'next') => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(((index % total) + total) % total);
        setAnimating(false);
      }, 300);
    },
    [animating, total],
  );

  const next = useCallback(() => goTo(current + 1, 'next'), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, 'prev'), [current, goTo]);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, autoPlayInterval);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next, autoPlayInterval]);

  /* Three visible cards, wrapping around */
  const visibleItems = Array.from({ length: VISIBLE }, (_, i) => ({
    item: testimonials[(current + i) % total],
    key: (current + i) % total,
  }));

  return (
    <div
      className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-4">
        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Testimonio anterior"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-adipa-gray-200 bg-white text-adipa-purple shadow-sm transition-all hover:border-adipa-purple hover:bg-adipa-purple hover:text-white dark:border-adipa-gray-700 dark:bg-adipa-gray-900 dark:text-white dark:hover:bg-adipa-purple"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Cards */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          {visibleItems.map(({ item: t, key }, colIdx) => (
            <blockquote
              key={`${key}-${direction}`}
              className={clsx(
                'flex-1 min-w-0 rounded-2xl bg-white p-6 shadow-sm dark:bg-adipa-gray-900',
                'transition-all duration-300',
                /* on mobile hide 2nd and 3rd */
                colIdx > 0 && 'hidden sm:block',
                animating && direction === 'next' && 'opacity-0 translate-x-4',
                animating && direction === 'prev' && 'opacity-0 -translate-x-4',
                !animating && 'opacity-100 translate-x-0',
              )}
            >
              {/* Stars */}
              <div className="mb-3 flex gap-1" aria-label={`${t.rating} estrellas de 5`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-adipa-orange" aria-hidden="true">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-5 text-sm leading-relaxed text-adipa-gray-700 dark:text-white">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-adipa-purple text-sm font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <cite className="block text-sm font-bold not-italic text-adipa-dark dark:text-white">
                    {t.name}
                  </cite>
                  <span className="text-xs text-adipa-gray-500 dark:text-white">{t.role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Siguiente testimonio"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-adipa-gray-200 bg-white text-adipa-purple shadow-sm transition-all hover:border-adipa-purple hover:bg-adipa-purple hover:text-white dark:border-adipa-gray-700 dark:bg-adipa-gray-900 dark:text-white dark:hover:bg-adipa-purple"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2" aria-label="Indicadores de testimonio">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-label={`Ir al testimonio ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            className={clsx(
              'h-2 rounded-full transition-all duration-300',
              i === current
                ? 'w-6 bg-adipa-purple'
                : 'w-2 bg-adipa-gray-200 hover:bg-adipa-purple/40 dark:bg-adipa-gray-700',
            )}
          />
        ))}
      </div>
    </div>
  );
}
