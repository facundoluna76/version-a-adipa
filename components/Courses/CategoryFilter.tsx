'use client';

import { clsx } from 'clsx';
import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  courseCounts: Record<string, number>;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  courseCounts,
}: CategoryFilterProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      role="group"
      aria-label="Filtrar por categoría"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = cat.id === 'todos' ? courseCounts.todos : (courseCounts[cat.id] ?? 0);

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            aria-pressed={isActive}
            aria-label={`Filtrar por ${cat.label}${count ? `, ${count} cursos` : ''}`}
            className={clsx(
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium',
              'transition-all duration-200 ease-in-out',
              'focus-visible:outline-2 focus-visible:outline-adipa-purple focus-visible:outline-offset-2',
              isActive
                ? 'filter-pill-active'
                : [
                    'border border-adipa-gray-200 bg-white text-adipa-gray-700',
                    'hover:border-adipa-purple hover:text-adipa-purple',
                    'dark:border-adipa-gray-700 dark:bg-adipa-gray-900/60 dark:text-adipa-gray-300',
                    'dark:hover:border-adipa-purple dark:hover:text-adipa-purple',
                  ],
            )}
          >
            {cat.label}
            {count > 0 && (
              <span
                className={clsx(
                  'flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[11px] font-bold',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-adipa-purple-100 text-adipa-purple dark:bg-adipa-purple/20',
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
