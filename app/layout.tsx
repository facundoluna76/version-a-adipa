import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CartProvider } from '@/components/providers/CartProvider';
import { CartDrawer } from '@/components/Cart/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ADIPA — Cursos de Psicología con Certificado 2026',
    template: '%s | ADIPA',
  },
  description:
    'Plataforma de educación continua especializada en psicología y salud mental. Más de 200 cursos con certificado, impartidos por los mejores especialistas de Latinoamérica.',
  keywords: [
    'psicología',
    'cursos de psicología',
    'salud mental',
    'diplomados psicología',
    'neurociencias',
    'psicoterapia',
    'ADIPA',
    'educación continua',
  ],
  icons: {
    icon: '/favicon.svg',
  },
  authors: [{ name: 'ADIPA' }],
  creator: 'ADIPA',
  publisher: 'ADIPA',
  metadataBase: new URL('https://adipa.cl'),
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://adipa.cl/cursos',
    siteName: 'ADIPA',
    title: 'ADIPA — Cursos de Psicología con Certificado 2026',
    description:
      'Más de 200 cursos de psicología con certificado. Descuentos de hasta 35% OFF. ¡Inscríbete hoy!',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'ADIPA — Plataforma de Educación en Psicología',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADIPA — Cursos de Psicología con Certificado 2026',
    description: 'Más de 200 cursos de psicología con certificado. Hasta 35% OFF.',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6C5CE7' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F1A' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
