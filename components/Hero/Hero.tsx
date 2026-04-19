'use client';

import { useState } from 'react';
import { Search, Star, Users } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

const QUICK_SEARCH_TAGS = ['Autismo', 'Wisc', 'Ados', 'Trauma', 'ADI-R', 'WAIS', 'Peers'];

export function Hero() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="hero-gradient relative overflow-hidden pt-12"
      aria-label="Hero — Catálogo de cursos"
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-adipa-cyan/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Trust indicators */}
        <FadeIn className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/70">
          <span className="flex items-center gap-1.5 text-sm">
            <Star size={14} className="fill-adipa-orange text-adipa-orange" aria-hidden="true" />
            <strong className="text-white">4.9/5</strong> Valoración promedio
          </span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" aria-hidden="true" />
          <span className="flex items-center gap-1.5 text-sm">
            <Users size={14} className="text-adipa-cyan" aria-hidden="true" />
            <strong className="text-white">+15.000</strong> Profesionales formados
          </span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" aria-hidden="true" />
          <span className="text-sm">🎓 Certificado de participación incluido</span>
        </FadeIn>

        {/* Main heading */}
        <FadeIn delay={100}>
          <h1 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Cursos de Psicología y salud mental con hasta{' '}
            <span className="text-adipa-orange">35% OFF</span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-8 max-w-xl text-center text-base text-white/80 sm:text-lg">
            Vive la mejor experiencia de aprendizaje y potencia tus conocimientos
            a través de nuestros cursos y diplomados.
          </p>
        </FadeIn>

        {/* Search bar */}
        <FadeIn delay={300} className="mx-auto mb-5 max-w-2xl">
        <form onSubmit={handleSearch} className="w-full" role="search">
          <div className="flex overflow-hidden rounded-full bg-white shadow-2xl shadow-adipa-purple/30">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué quieres aprender?"
              aria-label="Buscar cursos"
              className="flex-1 bg-transparent py-3.5 pl-6 pr-4 text-sm text-adipa-dark placeholder:text-adipa-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="flex items-center justify-center bg-adipa-cyan px-6 text-white transition-colors hover:bg-adipa-cyan-600 cursor-pointer"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
        </FadeIn>

        {/* Quick search pills */}
        <FadeIn delay={400} className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-white/60">Buscar:</span>
          {QUICK_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag);
                document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </FadeIn>
      </div>

      {/* Bottom wave */}
      <div className="absolute -bottom-px left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 48 C240 0 480 48 720 24 C960 0 1200 48 1440 24 L1440 48 Z"
            className="fill-white dark:fill-adipa-gray-900"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0 48 C240 0 480 48 720 24 C960 0 1200 48 1440 24 L1440 48 Z;
                M0 48 C240 20 480 10 720 32 C960 48 1200 10 1440 28 L1440 48 Z;
                M0 48 C240 8 480 40 720 16 C960 8 1200 40 1440 20 L1440 48 Z;
                M0 48 C240 0 480 48 720 24 C960 0 1200 48 1440 24 L1440 48 Z
              "
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
          </path>
        </svg>
      </div>
    </section>
  );
}
