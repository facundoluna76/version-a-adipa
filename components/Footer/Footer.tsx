import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const FOOTER_LINKS = {
  formacion: {
    title: 'Formación',
    links: [
      { label: 'Cursos', href: '#' },
      { label: 'Diplomados', href: '#' },
      { label: 'Especializaciones', href: '#' },
      { label: 'Sesiones Magistrales', href: '#' },
      { label: 'Seminarios', href: '#' },
    ],
  },
  recursos: {
    title: 'Recursos',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'eBooks gratuitos', href: '#' },
      { label: 'Glosario', href: '#' },
      { label: 'Investigaciones', href: '#' },
    ],
  },
  empresa: {
    title: 'ADIPA',
    links: [
      { label: 'Quiénes somos', href: '#' },
      { label: 'Acreditaciones', href: '#' },
      { label: 'Docentes', href: '#' },
      { label: 'Trabaja con nosotros', href: '#' },
    ],
  },
};

/* Inline SVGs for social icons (lucide-react dropped branded icons) */
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}
function TwitterXIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#', Icon: InstagramIcon },
  { name: 'Facebook', href: '#', Icon: FacebookIcon },
  { name: 'LinkedIn', href: '#', Icon: LinkedinIcon },
  { name: 'YouTube', href: '#', Icon: YoutubeIcon },
  { name: 'Twitter / X', href: '#', Icon: TwitterXIcon },
];

export function Footer() {
  return (
    <footer
      className="border-t border-adipa-gray-200 bg-adipa-gray-50 dark:border-adipa-gray-700/50 dark:bg-adipa-dark"
      aria-label="Pie de página"
    >
      {/* Main footer */}
      <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="ADIPA — Inicio">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-adipa.svg"
                alt="ADIPA"
                width={140}
                height={27}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-adipa-gray-500 dark:text-white">
              Plataforma de educación continua especializada en psicología y
              salud mental con presencia en Chile y Latinoamérica.
            </p>

            {/* Contact info */}
            <ul className="mt-5 space-y-2 text-sm text-adipa-gray-700 dark:text-white">
              <li className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0 text-adipa-purple" aria-hidden="true" />
                <a href="mailto:contacto@adipa.cl" className="hover:text-adipa-purple transition-colors">
                  contacto@adipa.cl
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0 text-adipa-purple" aria-hidden="true" />
                <a href="tel:+56912345678" className="hover:text-adipa-purple transition-colors">
                  +56 9 1234 5678
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-adipa-purple" aria-hidden="true" />
                <span>Santiago de Chile, Chile</span>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-6 flex gap-3" aria-label="Redes sociales">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-adipa-purple text-white transition-all hover:bg-adipa-cyan"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-adipa-dark dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-adipa-gray-500 transition-colors hover:text-adipa-purple dark:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-adipa-gray-200 dark:border-white/5">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-adipa-gray-500 dark:text-white">
            © {new Date().getFullYear()} ADIPA. Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            {['Términos y condiciones', 'Política de privacidad', 'Cookies'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-adipa-gray-500 dark:text-white transition-colors hover:text-adipa-purple"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
