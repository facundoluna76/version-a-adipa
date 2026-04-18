import { Header } from '@/components/Header/Header';
import { Hero } from '@/components/Hero/Hero';
import { CourseGrid } from '@/components/Courses/CourseGrid';
import { ContactForm } from '@/components/Contact/ContactForm';
import { Footer } from '@/components/Footer/Footer';
import { FadeIn } from '@/components/ui/FadeIn';
import { STATS } from '@/data/courses';
import {
  ShieldCheck,
  Award,
  Globe,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  MessageCircle,
} from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Skip to content */}
      <a
        href="#cursos"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-md focus:bg-adipa-purple focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido principal
      </a>

      {/* Header (includes promo banner internally) */}
      <Header />

      {/* pt is set dynamically by Header via ResizeObserver */}
      <main id="main-content" style={{ paddingTop: '0px' }}>
        {/* Hero */}
        <Hero />

        {/* Stats bar */}
        <section
          aria-label="Estadísticas de ADIPA"
          className="bg-white py-10 dark:bg-adipa-gray-900"
        >
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 100}>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl font-black text-adipa-purple sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-xs text-adipa-gray-500 sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Course grid */}
        <CourseGrid />

        {/* Why ADIPA section */}
        <section
          aria-labelledby="why-adipa-heading"
          className="bg-white py-20 dark:bg-adipa-gray-900"
        >
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-adipa-purple">
                ¿Por qué elegirnos?
              </p>
              <h2
                id="why-adipa-heading"
                className="mb-3 text-2xl font-black text-adipa-dark dark:text-white sm:text-3xl"
              >
                La plataforma que eligen los{' '}
                <span className="gradient-text">profesionales</span>
              </h2>
              <p className="mx-auto max-w-xl text-adipa-gray-500">
                Más de 15.000 psicólogos y profesionales de la salud mental ya
                eligieron ADIPA para potenciar su carrera.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  Icon: Award,
                  title: 'Certificado oficial',
                  desc: 'Todos los cursos incluyen certificado de participación reconocido en Chile y Latinoamérica.',
                },
                {
                  Icon: ShieldCheck,
                  title: 'Docentes expertos',
                  desc: 'Aprende con más de 50 especialistas activos en sus áreas, con experiencia clínica real.',
                },
                {
                  Icon: Globe,
                  title: 'Acceso desde cualquier lugar',
                  desc: 'Cursos online, en vivo y presenciales. Accede desde Chile, México, Colombia y más.',
                },
                {
                  Icon: Clock,
                  title: 'Flexibilidad horaria',
                  desc: 'Clases en vivo grabadas disponibles 24/7. Aprende a tu ritmo sin perder contenido.',
                },
              ].map(({ Icon, title, desc }, i) => (
                <FadeIn key={title} delay={(i + 1) * 100}>
                  <div className="rounded-2xl border border-adipa-gray-200 bg-adipa-gray-50 p-6 transition-all hover:border-adipa-purple/30 hover:shadow-md dark:border-adipa-gray-700/60 dark:bg-adipa-gray-900/60">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-adipa-purple/10">
                      <Icon size={24} className="text-adipa-purple" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 font-bold text-adipa-dark dark:text-white">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-adipa-gray-500">{desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          aria-labelledby="testimonials-heading"
          className="bg-adipa-purple-50 py-20 dark:bg-adipa-gray-900/50"
        >
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-12 text-center">
              <h2
                id="testimonials-heading"
                className="text-2xl font-black text-adipa-dark dark:text-white sm:text-3xl"
              >
                Lo que dicen nuestros estudiantes
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Ps. Javiera Mendoza',
                  role: 'Psicóloga Clínica, Santiago',
                  quote:
                    'ADIPA transformó mi práctica clínica. El curso de psicoterapia breve me dio herramientas concretas que aplico desde la primera sesión.',
                  rating: 5,
                  avatar: 'JM',
                },
                {
                  name: 'Dr. Cristóbal Reyes',
                  role: 'Neuropsicólogo, Buenos Aires',
                  quote:
                    'La calidad de los docentes es impresionante. Aprendí más en 20 horas que en años de práctica independiente. Totalmente recomendado.',
                  rating: 5,
                  avatar: 'CR',
                },
                {
                  name: 'Mg. Daniela Fuentes',
                  role: 'Psicóloga Organizacional, Medellín',
                  quote:
                    'Excelente plataforma. El contenido es actualizado, los materiales son de calidad y el soporte al estudiante es muy rápido.',
                  rating: 5,
                  avatar: 'DF',
                },
              ].map(({ name, role, quote, rating, avatar }, i) => (
                <FadeIn key={name} delay={(i + 1) * 100}>
                <blockquote
                  className="rounded-2xl bg-white p-6 shadow-sm dark:bg-adipa-gray-900"
                >
                  {/* Stars */}
                  <div
                    className="mb-4 flex gap-1"
                    aria-label={`${rating} estrellas de 5`}
                  >
                    {Array.from({ length: rating }).map((_, i) => (
                      <span key={i} className="text-adipa-orange" aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-adipa-gray-700 dark:text-adipa-gray-300">
                    &ldquo;{quote}&rdquo;
                  </p>

                  <footer className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-adipa-purple text-sm font-bold text-white">
                      {avatar}
                    </div>
                    <div>
                      <cite className="block text-sm font-bold not-italic text-adipa-dark dark:text-white">
                        {name}
                      </cite>
                      <span className="text-xs text-adipa-gray-500">{role}</span>
                    </div>
                  </footer>
                </blockquote>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section
          id="contacto"
          aria-labelledby="contact-heading"
          className="bg-white py-20 dark:bg-adipa-dark"
        >
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Left: info */}
              <FadeIn>
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-adipa-purple">
                  Contacto
                </p>
                <h2
                  id="contact-heading"
                  className="mb-4 text-2xl font-black text-adipa-dark dark:text-white sm:text-3xl"
                >
                  ¿Tienes dudas?{' '}
                  <span className="gradient-text">Estamos para ayudarte</span>
                </h2>
                <p className="mb-8 text-adipa-gray-500">
                  Nuestro equipo de orientadores vocacionales te ayudará a
                  encontrar el programa ideal para potenciar tu carrera.
                </p>

                <ul className="space-y-5">
                  {[
                    {
                      Icon: MessageCircle,
                      title: 'WhatsApp',
                      detail: '+56 9 1234 5678',
                      sub: 'Respuesta inmediata en horario laboral',
                      color: 'text-green-500',
                    },
                    {
                      Icon: Mail,
                      title: 'Email',
                      detail: 'contacto@adipa.cl',
                      sub: 'Respondemos en menos de 24 horas',
                      color: 'text-adipa-purple',
                    },
                    {
                      Icon: Phone,
                      title: 'Teléfono',
                      detail: '+56 2 1234 5678',
                      sub: 'Lunes a Viernes, 9:00 - 18:00',
                      color: 'text-adipa-cyan-600',
                    },
                  ].map(({ Icon, title, detail, sub, color }) => (
                    <li key={title} className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-adipa-gray-50 dark:bg-adipa-gray-900/60 ${color}`}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-adipa-dark dark:text-white">
                          {title}
                        </p>
                        <p className="text-sm text-adipa-purple">{detail}</p>
                        <p className="text-xs text-adipa-gray-400">{sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Trust checkmarks */}
                <div className="mt-10 space-y-2">
                  {[
                    'Asesoría personalizada sin costo',
                    'Respuesta garantizada en 24 horas',
                    'Información detallada de cada programa',
                  ].map((item) => (
                    <p key={item} className="flex items-center gap-2 text-sm text-adipa-gray-600 dark:text-adipa-gray-400">
                      <CheckCircle size={16} className="flex-shrink-0 text-green-500" aria-hidden="true" />
                      {item}
                    </p>
                  ))}
                </div>
              </FadeIn>

              {/* Right: form */}
              <FadeIn delay={150}>
              <div className="rounded-2xl border border-adipa-gray-200 bg-adipa-gray-50 p-6 dark:border-adipa-gray-700/60 dark:bg-adipa-gray-900/40 sm:p-8">
                <h3 className="mb-6 text-lg font-bold text-adipa-dark dark:text-white">
                  Envíanos un mensaje
                </h3>
                <ContactForm />
              </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
