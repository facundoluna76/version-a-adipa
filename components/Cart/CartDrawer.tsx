'use client';

import { X, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { useCart } from '@/components/providers/CartProvider';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
}

export function CartDrawer() {
  const { items, removeFromCart, clearCart, isOpen, closeCart, total } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Carrito de compras"
        aria-modal="true"
        className={clsx(
          'fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col',
          'bg-white shadow-2xl dark:bg-adipa-gray-900',
          'transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-adipa-gray-200 px-6 py-4 dark:border-adipa-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-adipa-purple" aria-hidden="true" />
            <h2 className="font-bold text-adipa-dark dark:text-white">Carrito</h2>
            {items.length > 0 && (
              <span className="rounded-full bg-adipa-purple px-2 py-0.5 text-xs font-bold text-white">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="rounded-full p-2 text-adipa-gray-500 transition-colors hover:bg-adipa-gray-100 dark:text-white dark:hover:bg-adipa-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Empty state ── */}
        {items.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingCart
              size={52}
              className="text-adipa-gray-200 dark:text-adipa-gray-700"
              aria-hidden="true"
            />
            <p className="font-semibold text-adipa-dark dark:text-white">
              Tu carrito está vacío
            </p>
            <p className="text-sm text-adipa-gray-500 dark:text-adipa-gray-400">
              Hacé clic en &ldquo;Inscribirme&rdquo; en cualquier curso para agregarlo.
            </p>
            <button
              onClick={closeCart}
              className="rounded-full bg-adipa-purple px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-adipa-cyan"
            >
              Ver cursos
            </button>
          </div>
        )}

        {/* ── Items list ── */}
        {items.length > 0 && (
          <>
            <ul className="flex-1 divide-y divide-adipa-gray-200 overflow-y-auto dark:divide-adipa-gray-700">
              {items.map(({ course }) => (
                <li key={course.id} className="flex gap-3 p-4">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-adipa-dark dark:text-white">
                      {course.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-adipa-purple">
                        {formatPrice(course.discountPrice)}
                      </span>
                      <button
                        onClick={() => removeFromCart(course.id)}
                        aria-label={`Eliminar ${course.title} del carrito`}
                        className="rounded-full p-1.5 text-adipa-gray-400 transition-colors hover:bg-red-50 hover:text-adipa-red"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* ── Footer ── */}
            <div className="border-t border-adipa-gray-200 px-6 py-4 dark:border-adipa-gray-700">
              {items.length > 1 && (
                <button
                  onClick={clearCart}
                  className="mb-3 flex w-full items-center justify-center gap-1.5 text-xs text-adipa-gray-400 transition-colors hover:text-adipa-red"
                >
                  <Trash2 size={12} aria-hidden="true" />
                  Vaciar carrito
                </button>
              )}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-semibold text-adipa-dark dark:text-white">Total</span>
                <span className="text-xl font-black text-adipa-purple">
                  {formatPrice(total)}
                </span>
              </div>
              <button className="w-full rounded-full bg-adipa-purple py-3 font-semibold text-white transition-colors hover:bg-adipa-cyan">
                Ir al pago
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
