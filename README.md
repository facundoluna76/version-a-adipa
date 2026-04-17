# ADIPA — Versión A (Next.js)

Landing page de catálogo de cursos para **ADIPA**, plataforma de educación continua especializada en psicología y salud mental.

## Stack

| Tecnología    | Versión       |
|--------------|---------------|
| Next.js      | 16.2.4        |
| React        | 19.x          |
| TypeScript   | 5.x (strict)  |
| Tailwind CSS | 4.x           |
| Node.js      | 22.x          |

## Instalación

```bash
# Instalar dependencias
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build de producción

```bash
npm run build
npm run start
```

## Estructura del proyecto

```
adipa-version-a/
├── app/
│   ├── globals.css        # Design tokens ADIPA + Tailwind v4
│   ├── layout.tsx         # RootLayout — SEO, metadata, ThemeProvider
│   └── page.tsx           # Página principal
├── components/
│   ├── Header/            # Header fijo con promo banner, dark mode toggle
│   ├── Hero/              # Hero con gradiente púrpura y CTA
│   ├── Courses/
│   │   ├── CourseCard.tsx      # Card de curso (imagen, precio, rating, badge)
│   │   ├── CourseGrid.tsx      # Grid con filtrado client-side
│   │   └── CategoryFilter.tsx  # Pills de categoría con conteo
│   ├── Contact/
│   │   └── ContactForm.tsx     # Formulario validado + estado de éxito
│   ├── Footer/                 # Footer con links y redes sociales
│   ├── providers/
│   │   └── ThemeProvider.tsx   # Dark mode con localStorage
│   └── ui/
│       ├── Badge.tsx      # Badges reutilizables
│       └── Button.tsx     # Botón con variantes y loading state
├── data/
│   └── courses.ts         # 12 cursos ficticios en 5 categorías
└── types/
    └── index.ts           # Tipos TypeScript (Course, Category, FormErrors…)
```

## Secciones implementadas

| Sección                  | Estado |
|--------------------------|--------|
| Promo banner dismissible | ✅     |
| Header sticky + búsqueda | ✅     |
| Hero con gradiente ADIPA | ✅     |
| Stats bar (4 métricas)   | ✅     |
| Grilla de cursos 3/2/1   | ✅     |
| Filtros por categoría    | ✅     |
| ¿Por qué ADIPA?          | ✅     |
| Testimonios              | ✅     |
| Formulario de contacto   | ✅     |
| Footer con redes         | ✅     |

## Bonus implementados

- ✅ **Dark mode** — Toggle con persistencia en `localStorage`
- ✅ **SEO básico** — Metadata, Open Graph, Twitter Cards, robots
- ✅ **Accesibilidad** — HTML semántico, ARIA, navegación por teclado
- ✅ **Responsive** — Mobile (375px), Tablet (768px), Desktop (1280px+)
- ✅ **Animaciones** — Hover en cards, transiciones, scroll suave
- ✅ **TypeScript strict** — `strict: true` habilitado

## Datos ficticios

Definidos en `data/courses.ts`:

- **12 cursos** en **5 categorías**: Psicología Clínica, Educación y Neurodesarrollo, Neurociencias, Psicología Organizacional, Psicología Jurídica y Forense
- Imágenes desde Unsplash (optimizadas por Next.js `Image`)

## Design Tokens ADIPA

| Token            | Color     | Uso                      |
|-----------------|-----------|--------------------------|
| `adipa-purple`  | `#6C5CE7` | Color principal, CTAs    |
| `adipa-cyan`    | `#22D3EE` | Acento, botón búsqueda   |
| `adipa-orange`  | `#F59E0B` | Descuentos, estrellas    |
| `adipa-red`     | `#EF4444` | Promo banner, alertas    |
| `adipa-dark`    | `#0F0F1A` | Fondo dark mode          |
