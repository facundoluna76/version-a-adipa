'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { CATEGORIES } from '@/data/courses';
import type { Modality } from '@/types';

/* ─── Types ─────────────────────────────────────────────────────────── */
export interface Filters {
  search: string;
  category: string;
  modalities: Modality[];
  maxPrice: number | null;
  onlyFeatured: boolean;
  onlyNew: boolean;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating';
}

export const DEFAULT_FILTERS: Filters = {
  search: '',
  category: 'todos',
  modalities: [],
  maxPrice: null,
  onlyFeatured: false,
  onlyNew: false,
  sortBy: 'relevance',
};

/* ─── Static options ─────────────────────────────────────────────────── */
const MODALITIES: { value: Modality; label: string; icon: string }[] = [
  { value: 'En Vivo', label: 'En Vivo', icon: '🔴' },
  { value: 'Online', label: 'Online', icon: '💻' },
  { value: 'Presencial', label: 'Presencial', icon: '📍' },
];

const PRICE_OPTIONS: { value: number | null; label: string }[] = [
  { value: null,   label: 'Todos los precios' },
  { value: 75000,  label: 'Hasta $75.000' },
  { value: 85000,  label: 'Hasta $85.000' },
  { value: 95000,  label: 'Hasta $95.000' },
];

/* ─── Props ──────────────────────────────────────────────────────────── */
interface FilterSidebarProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  courseCounts: {
    categories: Record<string, number>;
    modalities: Record<string, number>;
  };
  activeCount: number;
  resultCount: number;
  isOpen: boolean;        // mobile drawer visibility
  onClose: () => void;
}

/* ─── Sub-components ─────────────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-adipa-gray-500 dark:text-white">
      {children}
    </h3>
  );
}

function Divider() {
  return <div className="border-b border-adipa-gray-200 dark:border-adipa-gray-700/50" />;
}

/* ─── Main component ─────────────────────────────────────────────────── */
export function FilterSidebar({
  filters,
  onChange,
  courseCounts,
  activeCount,
  resultCount,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const hasActive = activeCount > 0;

  const toggleModality = (m: Modality) => {
    const next = filters.modalities.includes(m)
      ? filters.modalities.filter((x) => x !== m)
      : [...filters.modalities, m];
    onChange({ modalities: next });
  };

  const totalCourses = Object.values(courseCounts.categories).reduce(
    (a, b) => a + b,
    0,
  );

  /* ── Shared filter panel content ── */
  const panelContent = (
    <div className="flex flex-col gap-5">

      {/* Search */}
      <div>
        <SectionTitle>Buscar</SectionTitle>
        <div className="relative">
          <Search
            size={13}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-adipa-gray-400 dark:text-adipa-dark"
            aria-hidden="true"
          />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Título o instructor…"
            aria-label="Buscar cursos por título o instructor"
            className={clsx(
              'w-full rounded-lg border border-adipa-gray-200 bg-adipa-gray-50 py-2 pl-8 pr-3 text-sm',
              'text-adipa-dark placeholder:text-adipa-gray-400',
              'transition-all focus:border-adipa-cyan focus:bg-white focus:outline-none focus:ring-2 focus:ring-adipa-cyan/20',
              'dark:border-adipa-gray-700 dark:bg-adipa-gray-800 dark:text-black dark:focus:bg-adipa-gray-800',
            )}
          />
        </div>
      </div>

      <Divider />

      {/* Categoría */}
      <div>
        <SectionTitle>Categoría</SectionTitle>
        <ul className="space-y-0.5" role="radiogroup" aria-label="Categoría">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'todos'
                ? totalCourses
                : (courseCounts.categories[cat.id] ?? 0);
            const isActive = filters.category === cat.id;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onChange({ category: cat.id })}
                  className={clsx(
                    'flex w-full items-center justify-between rounded-[7px] px-3 py-2 text-sm transition-colors cursor-pointer',
                    isActive
                      ? 'bg-adipa-cyan/10 font-semibold text-adipa-cyan'
                      : 'text-adipa-gray-700 hover:bg-adipa-gray-100 dark:text-white dark:hover:bg-adipa-gray-700/50',
                  )}
                >
                  <span className="text-left leading-snug">{cat.label}</span>
                  <span
                    className={clsx(
                      'ml-2 flex-shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                      isActive
                        ? 'bg-adipa-cyan text-white'
                        : 'bg-adipa-gray-200 text-adipa-gray-500 dark:bg-adipa-gray-700 dark:text-white',
                    )}
                  >
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Divider />

      {/* Modalidad */}
      <div>
        <SectionTitle>Modalidad</SectionTitle>
        <ul className="space-y-2" role="group" aria-label="Filtrar por modalidad">
          {MODALITIES.map(({ value, label, icon }) => {
            const count = courseCounts.modalities[value] ?? 0;
            const checked = filters.modalities.includes(value);
            const id = `modality-${value.replace(/\s/g, '-')}`;
            return (
              <li key={value}>
                <label htmlFor={id} className="flex cursor-pointer items-center gap-3">
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleModality(value)}
                    className="h-4 w-4 flex-shrink-0"
                  />
                  <span className="flex flex-1 items-center gap-2 text-sm text-adipa-gray-700 dark:text-white">
                    {label}
                  </span>
                  <span className="rounded-full bg-adipa-gray-200 px-1.5 py-0.5 text-[10px] font-bold text-adipa-gray-500 dark:bg-adipa-gray-700 dark:text-white">
                    {count}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <Divider />

      {/* Precio máximo */}
      <div>
        <SectionTitle>Precio máximo</SectionTitle>
        <ul className="space-y-0.5" role="radiogroup" aria-label="Precio máximo">
          {PRICE_OPTIONS.map(({ value, label }) => {
            const isActive = filters.maxPrice === value;
            return (
              <li key={label}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onChange({ maxPrice: value })}
                  className={clsx(
                    'flex w-full items-center gap-2.5 rounded-[7px] px-3 py-2 text-sm transition-colors cursor-pointer',
                    isActive
                      ? 'bg-adipa-cyan/10 font-semibold text-adipa-cyan'
                      : 'text-adipa-gray-700 hover:bg-adipa-gray-100 dark:text-white dark:hover:bg-adipa-gray-700/50',
                  )}
                >
                  <span
                    className={clsx(
                      'h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 transition-colors',
                      isActive
                        ? 'border-adipa-cyan bg-adipa-cyan'
                        : 'border-adipa-gray-400',
                    )}
                  />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Divider />

      {/* Mostrar solo */}
      <div>
        <SectionTitle>Mostrar solo</SectionTitle>
        <ul className="space-y-2.5" role="group" aria-label="Filtros especiales">
          {(
            [
              { key: 'onlyFeatured', label: 'Cursos destacados', icon: '⭐' },
              { key: 'onlyNew',      label: 'Cursos nuevos',     icon: '🆕' },
            ] as const
          ).map(({ key, label, icon }) => {
            const id = `special-${key}`;
            return (
              <li key={key}>
                <label htmlFor={id} className="flex cursor-pointer items-center gap-3">
                  <input
                    id={id}
                    type="checkbox"
                    checked={filters[key]}
                    onChange={(e) => onChange({ [key]: e.target.checked })}
                    className="h-4 w-4 flex-shrink-0"
                  />
                  <span className="flex items-center gap-2 text-sm text-adipa-gray-700 dark:text-white">
                    <span aria-hidden="true">{icon}</span>
                    {label}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Clear filters */}
      {hasActive && (
        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_FILTERS })}
          className="flex w-full items-center justify-center gap-2 rounded-[7px] border border-adipa-red/40 py-2 text-sm font-semibold text-adipa-red transition-colors hover:bg-adipa-red/5 cursor-pointer"
        >
          <X size={13} aria-hidden="true" />
          Limpiar filtros ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden w-64 flex-shrink-0 lg:block"
        aria-label="Panel de filtros"
      >
        <div className="sticky top-36 rounded-2xl border border-adipa-gray-200 bg-white p-5 dark:border-adipa-gray-700/50 dark:bg-adipa-gray-900">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <p className="flex items-center gap-2 font-bold text-adipa-dark dark:text-white">
              <SlidersHorizontal size={15} className="text-adipa-cyan" aria-hidden="true" />
              Filtros
            </p>
            {hasActive && (
              <span className="rounded-full bg-adipa-cyan px-2 py-0.5 text-xs font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>
          {panelContent}
        </div>
      </aside>

      {/* ── Mobile drawer ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Filtros de cursos"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-white p-6 dark:bg-adipa-gray-900">
            {/* Drag handle */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-adipa-gray-200 dark:bg-adipa-gray-700" />

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <p className="flex items-center gap-2 font-bold text-adipa-dark dark:text-white">
                <SlidersHorizontal size={15} className="text-adipa-cyan" aria-hidden="true" />
                Filtros
                {hasActive && (
                  <span className="rounded-full bg-adipa-cyan px-2 py-0.5 text-xs font-bold text-white">
                    {activeCount}
                  </span>
                )}
              </p>
              <button
                onClick={onClose}
                aria-label="Cerrar filtros"
                className="rounded-full p-2 text-adipa-gray-500 transition-colors hover:bg-adipa-gray-100 dark:hover:bg-adipa-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            {panelContent}

            {/* Apply button */}
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-adipa-purple py-3 font-semibold text-white transition-colors hover:bg-adipa-cyan"
            >
              Ver {resultCount} {resultCount === 1 ? 'curso' : 'cursos'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
