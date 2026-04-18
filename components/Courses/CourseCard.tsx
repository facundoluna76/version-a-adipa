import Image from 'next/image';
import { Calendar, Clock, Star, Users } from 'lucide-react';
import { clsx } from 'clsx';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article
      className={clsx(
        'group flex flex-col overflow-hidden rounded-2xl',
        'bg-white dark:bg-adipa-gray-900',
        'border border-adipa-gray-200 dark:border-adipa-gray-700/60',
        'shadow-sm hover:shadow-xl hover:shadow-adipa-purple/10',
        'card-hover',
        'focus-within:ring-2 focus-within:ring-adipa-purple focus-within:ring-offset-2',
      )}
      aria-label={`Curso: ${course.title}`}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={course.imageUrl}
          alt={`Imagen del curso ${course.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="modality" modality={course.modality}>
            {course.modality}
          </Badge>
          {course.isNew && <Badge variant="new">NUEVO</Badge>}
        </div>

        {/* Featured / top-right badge */}
        {course.isFeatured && !course.isNew && (
          <div className="absolute right-3 top-3">
            <Badge variant="featured">DESTACADO</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="mb-1.5 line-clamp-2 text-base font-bold leading-snug text-adipa-dark dark:text-white">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="mb-3 text-sm text-adipa-gray-500 dark:text-white">
          {course.instructor}{' '}
          <span className="text-xs font-normal">· {course.instructorTitle}</span>
        </p>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-adipa-gray-500 dark:text-white">
          {course.description}
        </p>

        {/* Meta info */}
        <div className="mb-4 flex flex-wrap gap-3 text-xs text-adipa-gray-500 dark:text-white">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-adipa-purple" aria-hidden="true" />
            <span>
              <span className="sr-only">Inicio: </span>
              {formatDate(course.startDate)}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-adipa-purple" aria-hidden="true" />
            <span>{course.duration}</span>
          </span>
        </div>

        {/* Rating */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center gap-0.5" aria-label={`Calificación: ${course.rating} de 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={clsx(
                  i < Math.floor(course.rating)
                    ? 'fill-adipa-orange text-adipa-orange'
                    : 'fill-adipa-gray-200 text-adipa-gray-200',
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-adipa-orange">{course.rating.toFixed(1)}</span>
          <span className="flex items-center gap-1 text-xs text-adipa-gray-500 dark:text-white">
            <Users size={11} aria-hidden="true" />
            {course.reviewCount} reseñas
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between border-t border-adipa-gray-200 pt-4 dark:border-adipa-gray-700/60">
          <div>
            <p
              className="text-xs text-adipa-gray-400 dark:text-white line-through"
              aria-label={`Precio original: ${formatPrice(course.originalPrice)}`}
            >
              {formatPrice(course.originalPrice)}
            </p>
            <p
              className="flex items-center gap-2 text-lg font-black text-adipa-purple"
              aria-label={`Precio con descuento: ${formatPrice(course.discountPrice)}`}
            >
              {formatPrice(course.discountPrice)}
              <Badge variant="discount">-{course.discountPercentage}%</Badge>
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            aria-label={`Inscribirme al curso ${course.title}`}
          >
            Inscribirme
          </Button>
        </div>
      </div>
    </article>
  );
}
