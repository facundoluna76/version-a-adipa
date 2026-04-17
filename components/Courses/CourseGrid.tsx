'use client';

import { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { CourseCard } from './CourseCard';
import { CategoryFilter } from './CategoryFilter';
import { CATEGORIES, COURSES } from '@/data/courses';

export function CourseGrid() {
  const [activeCategory, setActiveCategory] = useState('todos');

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'todos') return COURSES;
    return COURSES.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const courseCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: COURSES.length };
    COURSES.forEach((c) => {
      counts[c.category] = (counts[c.category] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section
      id="cursos"
      aria-labelledby="courses-heading"
      className="bg-adipa-gray-50 py-16 dark:bg-adipa-dark"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
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
          <p className="mx-auto max-w-xl text-adipa-gray-500 dark:text-adipa-gray-400">
            Formación de alto impacto impartida por los mejores especialistas de
            Latinoamérica.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            courseCounts={courseCounts}
          />
        </div>

        {/* Results count */}
        <p
          className="mb-6 text-sm text-adipa-gray-500 dark:text-adipa-gray-400"
          aria-live="polite"
          aria-atomic="true"
        >
          Mostrando{' '}
          <strong className="text-adipa-dark dark:text-white">
            {filteredCourses.length}
          </strong>{' '}
          {filteredCourses.length === 1 ? 'curso' : 'cursos'}
          {activeCategory !== 'todos' &&
            ` en "${CATEGORIES.find((c) => c.id === activeCategory)?.label}"`}
        </p>

        {/* Grid */}
        {filteredCourses.length > 0 ? (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Grilla de cursos"
          >
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen size={48} className="mb-4 text-adipa-gray-200" aria-hidden="true" />
            <h3 className="mb-2 text-lg font-bold text-adipa-dark dark:text-white">
              No hay cursos en esta categoría
            </h3>
            <p className="text-adipa-gray-500">
              Prueba con otra categoría o vuelve pronto.
            </p>
          </div>
        )}

        {/* Load more CTA */}
        {filteredCourses.length > 0 && (
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 rounded-full border-2 border-adipa-purple px-8 py-3 font-semibold text-adipa-purple transition-all hover:bg-adipa-purple hover:text-white hover:shadow-lg hover:shadow-adipa-purple/25">
              <BookOpen size={16} aria-hidden="true" />
              Ver todos los cursos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
