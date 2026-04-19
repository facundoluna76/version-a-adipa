'use client';

import { useState, useMemo } from 'react';
import { BookOpen, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { clsx } from 'clsx';
import { CourseCard } from './CourseCard';
import { FilterSidebar, DEFAULT_FILTERS } from './FilterSidebar';
import type { Filters } from './FilterSidebar';
import { FadeIn } from '@/components/ui/FadeIn';
import { COURSES } from '@/data/courses';

/* ─── Sort options ───────────────────────────────────────────────────── */
const SORT_OPTIONS: { value: Filters['sortBy']; label: string }[] = [
  { value: 'relevance',  label: 'Más relevantes'       },
  { value: 'rating',     label: 'Mejor valorados'      },
  { value: 'price-asc',  label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
];

/* ─── Helper: count active filters (excluding sort) ─────────────────── */
function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.search)                  n += 1;
  if (f.category !== 'todos')    n += 1;
  n += f.modalities.length;
  if (f.maxPrice !== null)       n += 1;
  if (f.onlyFeatured)            n += 1;
  if (f.onlyNew)                 n += 1;
  return n;
}

/* ─── Component ──────────────────────────────────────────────────────── */
export function CourseGrid() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Patch helper — merge partial updates */
  const updateFilters = (patch: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  /* Pre-computed counts for the sidebar badges */
  const courseCounts = useMemo(() => {
    const categories: Record<string, number> = {};
    const modalities: Record<string, number> = {};
    COURSES.forEach((c) => {
      categories[c.category] = (categories[c.category] ?? 0) + 1;
      modalities[c.modality] = (modalities[c.modality] ?? 0) + 1;
    });
    return { categories, modalities };
  }, []);

  /* Filtered + sorted result */
  const filteredCourses = useMemo(() => {
    let result = COURSES;

    /* 1. Text search */
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      );
    }

    /* 2. Category */
    if (filters.category !== 'todos') {
      result = result.filter((c) => c.category === filters.category);
    }

    /* 3. Modality (multi-select — OR logic) */
    if (filters.modalities.length > 0) {
      result = result.filter((c) => filters.modalities.includes(c.modality));
    }

    /* 4. Max price */
    if (filters.maxPrice !== null) {
      result = result.filter((c) => c.discountPrice <= filters.maxPrice!);
    }

    /* 5. Special flags */
    if (filters.onlyFeatured) result = result.filter((c) => c.isFeatured);
    if (filters.onlyNew)      result = result.filter((c) => c.isNew);

    /* 6. Sort */
    switch (filters.sortBy) {
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        result = [...result].sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      default:
        /* relevance: featured first, then by reviewCount */
        result = [...result].sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.reviewCount - a.reviewCount;
        });
    }

    return result;
  }, [filters]);

  const activeCount  = countActiveFilters(filters);
  const resultCount  = filteredCourses.length;

  return (
    <section
      id="cursos"
      aria-labelledby="courses-heading"
      className="bg-adipa-gray-50 py-16 dark:bg-adipa-dark"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <FadeIn className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-adipa-purple">
            Catálogo 2026
          </p>
          <h2
            id="courses-heading"
            className="mb-3 text-2xl font-black text-adipa-dark dark:text-white sm:text-3xl"
          >
            Cursos que te permitirán{' '}
            <span className="gradient-text">potenciar tu carrera</span>
          </h2>
          <p className="mx-auto max-w-xl text-adipa-gray-500 dark:text-white">
            Formación de alto impacto impartida por los mejores especialistas de
            Latinoamérica.
          </p>
        </FadeIn>

        {/* ── Main layout: sidebar + grid ── */}
        <div className="flex gap-8">

          {/* Sidebar (desktop only — mobile = drawer) */}
          <FilterSidebar
            filters={filters}
            onChange={updateFilters}
            courseCounts={courseCounts}
            activeCount={activeCount}
            resultCount={resultCount}
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />

          {/* Right column */}
          <div className="min-w-0 flex-1">

            {/* ── Top bar ── */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              {/* Left: mobile filter button + result count */}
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className={clsx(
                    'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors lg:hidden',
                    activeCount > 0
                      ? 'border-adipa-purple bg-adipa-purple/10 text-adipa-purple'
                      : 'border-adipa-gray-200 bg-white text-adipa-gray-700 dark:border-adipa-gray-700 dark:bg-adipa-gray-900 dark:text-white',
                  )}
                  aria-label={`Abrir filtros${activeCount > 0 ? `, ${activeCount} activos` : ''}`}
                >
                  <SlidersHorizontal size={15} aria-hidden="true" />
                  Filtros
                  {activeCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-adipa-purple text-[11px] font-bold text-white">
                      {activeCount}
                    </span>
                  )}
                </button>

                {/* Result count */}
                <p
                  className="text-sm text-adipa-gray-500 dark:text-white"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <strong className="text-adipa-dark dark:text-white">
                    {resultCount}
                  </strong>{' '}
                  {resultCount === 1 ? 'curso' : 'cursos'}
                </p>
              </div>

              {/* Right: sort dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="hidden text-adipa-gray-400 sm:block" aria-hidden="true" />
                <label htmlFor="sort-select" className="sr-only">
                  Ordenar cursos por
                </label>
                <select
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={(e) =>
                    updateFilters({ sortBy: e.target.value as Filters['sortBy'] })
                  }
                  className={clsx(
                    'rounded-full border border-adipa-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-adipa-gray-700',
                    'focus:border-adipa-purple focus:outline-none focus:ring-2 focus:ring-adipa-purple/20',
                    'dark:border-adipa-gray-700 dark:bg-adipa-gray-900 dark:text-white',
                    'cursor-pointer appearance-none',
                  )}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                  }}
                >
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Course grid ── */}
            {filteredCourses.length > 0 ? (
              <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                aria-label="Grilla de cursos"
              >
                {filteredCourses.map((course, i) => (
                  <FadeIn key={course.id} delay={i * 60}>
                    <CourseCard course={course} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-adipa-gray-200 py-24 text-center dark:border-adipa-gray-700/50">
                <BookOpen
                  size={48}
                  className="mb-4 text-adipa-gray-200 dark:text-adipa-gray-700"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-lg font-bold text-adipa-dark dark:text-white">
                  Sin resultados
                </h3>
                <p className="mb-5 text-sm text-adipa-gray-500 dark:text-white">
                  Ningún curso coincide con los filtros seleccionados.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="rounded-full bg-adipa-purple px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-adipa-purple-600"
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            {/* ── Load more CTA ── */}
            {filteredCourses.length > 0 && (
              <div className="mt-12 text-center">
                <button className="inline-flex items-center gap-2 rounded-full border-2 border-adipa-purple px-8 py-3 font-semibold text-adipa-purple transition-all hover:bg-adipa-purple hover:text-white hover:shadow-lg hover:shadow-adipa-purple/25 cursor-pointer">
                  Ver todos los cursos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
