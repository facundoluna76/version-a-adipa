'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Sun,
  Moon,
  MessageCircle,
  Zap,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useCart } from '@/components/providers/CartProvider';
import { FadeIn } from '@/components/ui/FadeIn';
import { NAV_ITEMS } from '@/data/courses';

export function Header() {
  const { theme, toggle } = useTheme();
  const { items, openCart } = useCart();
  const [isScrolled, setIsScrolled]     = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showBanner, setShowBanner]     = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  /* Update body padding-top to match header height */
  useEffect(() => {
    const updatePadding = () => {
      if (headerRef.current) {
        const h = headerRef.current.offsetHeight;
        document.getElementById('main-content')?.style.setProperty('padding-top', `${h}px`);
      }
    };
    updatePadding();
    const ro = new ResizeObserver(updatePadding);
    if (headerRef.current) ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, [showBanner]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      {/* ─── Fixed header wrapper ─── */}
      <div
        ref={headerRef}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-shadow duration-300',
          isScrolled && 'shadow-md',
        )}
      >
        {/* Promo banner */}
        {showBanner && (
          <div className="relative flex items-center justify-center bg-adipa-red px-4 py-2.5">
            <p className="text-center text-sm font-medium text-white">
              <Zap size={14} className="mr-1 inline-block" aria-hidden="true" />
              Escoge tu programa con hasta{' '}
              <strong>35% OFF</strong>{' '}
              ⚡ Solo en Black Sale
            </p>
            <button
              onClick={() => setShowBanner(false)}
              aria-label="Cerrar banner promocional"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* ─── Main header bar ─── */}
        <header
          className={clsx(
            'transition-colors duration-300',
            isScrolled
              ? 'bg-white/95 backdrop-blur-md dark:bg-adipa-gray-900/95'
              : 'bg-white dark:bg-adipa-gray-900',
          )}
          role="banner"
        >
          {/* Top bar */}
          <div className="border-b border-adipa-gray-200 dark:border-adipa-gray-700/50">
            <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              {/* Logo */}
              <FadeIn>
              <Link href="/" className="flex-shrink-0" aria-label="ADIPA — Inicio">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-adipa.svg"
                  alt="ADIPA"
                  width={120}
                  height={23}
                  className="h-7 w-auto"
                />
              </Link>
              </FadeIn>

              {/* Desktop search */}
              <FadeIn delay={60} className="mx-6 hidden max-w-md flex-1 lg:flex">
                <div className="relative w-full">
                  <input
                    type="search"
                    placeholder="¿Qué quieres aprender?"
                    aria-label="Buscar cursos"
                    className={clsx(
                      'w-full rounded-full border border-adipa-gray-200 bg-adipa-gray-50',
                      'py-2 pl-4 pr-12 text-sm text-adipa-gray-700',
                      'placeholder:text-adipa-gray-500 transition-all duration-200',
                      'focus:border-adipa-purple focus:ring-2 focus:ring-adipa-purple/20 focus:outline-none',
                      'dark:border-adipa-gray-700 dark:bg-adipa-gray-900/80 dark:text-white dark:placeholder:text-white',
                    )}
                  />
                  <button
                    aria-label="Buscar"
                    className="absolute right-0 top-0 flex h-full items-center justify-center rounded-r-full bg-adipa-cyan px-4 text-white transition-colors hover:bg-adipa-cyan-600"
                  >
                    <Search size={16} />
                  </button>
                </div>
              </FadeIn>

              {/* Right actions */}
              <FadeIn delay={120} className="flex items-center gap-2">
                {/* Dark mode toggle */}
                <button
                  onClick={toggle}
                  aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                  className="rounded-full p-2 text-adipa-gray-500 transition-colors hover:bg-adipa-purple-50 hover:text-adipa-purple dark:text-white dark:hover:bg-adipa-gray-700 cursor-pointer"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Cart */}
                <button
                  onClick={openCart}
                  aria-label={`Ver carrito (${items.length} ${items.length === 1 ? 'item' : 'items'})`}
                  className="relative rounded-full p-2 text-adipa-gray-500 transition-colors hover:bg-adipa-purple-50 hover:text-adipa-purple dark:text-white cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-adipa-red text-[10px] font-bold text-white">
                    {items.length}
                  </span>
                </button>

                {/* Auth */}
                <div className="hidden items-center gap-2 sm:flex">
                  <button className="rounded-full px-4 py-2 text-sm font-semibold text-adipa-gray-700 transition-colors hover:text-adipa-purple dark:text-white cursor-pointer">
                    Iniciar Sesión
                  </button>
                  <button className="rounded-full bg-adipa-purple px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-adipa-purple-600 hover:shadow-md hover:shadow-adipa-purple/25 cursor-pointer">
                    Regístrate
                  </button>
                </div>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setIsMobileOpen((v) => !v)}
                  aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                  aria-expanded={isMobileOpen}
                  className="rounded-full p-2 text-adipa-gray-500 dark:text-white transition-colors hover:bg-adipa-purple-50 lg:hidden"
                >
                  {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </FadeIn>
            </div>
          </div>

          {/* Navigation bar */}
          <nav aria-label="Navegación principal" className="hidden lg:block">
            <div className="mx-auto flex max-w-screen-xl items-center gap-1 px-4 py-2 sm:px-6 lg:px-8">
              <FadeIn delay={180}>
              <Link
                href="#"
                className="mr-4 flex items-center gap-1.5 text-sm text-adipa-gray-500 hover:text-adipa-purple"
              >
                <MessageCircle size={14} className="text-green-500" />
                <span className="dark:text-white">Descubre ADIPA</span>
              </Link>
              </FadeIn>
              <FadeIn delay={240}>
                <div className="h-4 w-px bg-adipa-gray-200 dark:bg-adipa-gray-700" />
              </FadeIn>
              {NAV_ITEMS.map((item, i) => (
                <FadeIn key={item.label} delay={300 + i * 60}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                    item.label === 'Cursos'
                      ? 'font-bold text-adipa-purple'
                      : 'text-adipa-gray-700 hover:text-adipa-purple dark:text-white',
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={clsx(
                        'rounded-sm px-1 py-0.5 text-[10px] font-bold text-white',
                        item.badgeColor === 'green' ? 'bg-green-500' : 'bg-adipa-red',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
                </FadeIn>
              ))}
            </div>
          </nav>
        </header>
      </div>

      {/* ─── Mobile menu overlay ─── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" aria-modal="true" role="dialog" aria-label="Menú móvil">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 overflow-y-auto bg-white shadow-2xl dark:bg-adipa-gray-900">
            <div className="flex items-center justify-between border-b border-adipa-gray-200 p-4 dark:border-adipa-gray-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-adipa.svg" alt="ADIPA" width={100} height={19} className="h-6 w-auto" />
              <button
                onClick={() => setIsMobileOpen(false)}
                aria-label="Cerrar menú"
                className="rounded-full p-2 text-adipa-gray-500 dark:text-white hover:bg-adipa-purple-50"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="¿Qué quieres aprender?"
                  className="w-full rounded-full border border-adipa-gray-200 bg-adipa-gray-50 py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-adipa-purple/20 dark:border-adipa-gray-700 dark:bg-adipa-gray-800"
                />
                <Search size={16} className="absolute right-3 top-3 text-adipa-gray-400" />
              </div>
            </div>
            <nav className="px-2 pb-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={clsx(
                    'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-150',
                    item.label === 'Cursos'
                      ? 'bg-adipa-purple-50 font-bold text-adipa-purple'
                      : 'text-adipa-gray-700 hover:bg-adipa-gray-50 dark:text-white',
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={clsx(
                        'rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-white',
                        item.badgeColor === 'green' ? 'bg-green-500' : 'bg-adipa-red',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            <div className="border-t border-adipa-gray-200 p-4 dark:border-adipa-gray-700">
              <button className="mb-2 w-full rounded-full border border-adipa-purple py-2.5 text-sm font-semibold text-adipa-purple hover:bg-adipa-purple-50">
                Iniciar Sesión
              </button>
              <button className="w-full rounded-full bg-adipa-purple py-2.5 text-sm font-semibold text-white hover:bg-adipa-purple-600">
                Regístrate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
