# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (Next.js built-in, flat config)
```

No test runner is configured.

## Architecture

**Next.js 15 App Router** with React 19, TypeScript (strict), Tailwind CSS 4, and shadcn/ui (new-york style, neutral base).

### Page Composition

`src/app/page.tsx` is a `"use client"` component that composes all section components in order: Hero → ProjectsSection → CallToAction → AboutSection → ExperienceSection → EducationSection → ContactSection. The page guards rendering behind a `mounted` state check to prevent SSR/hydration mismatches.

### Data Layer

Static portfolio content lives in `src/data/`. Key structures:
- **Projects**: have a `visibility` field (`public` | `privateCaseStudy`). Private projects open in a Dialog modal instead of linking externally. Projects are filtered by group keys (`featured`, `alpha`, `public`).
- **Technologies**: use a lookup/alias system in `src/data/technologies.ts` for normalized name matching and react-icons integration.
- **Experience**: `src/lib/` contains a custom date parser that handles multi-language month names (English and Portuguese) for sorting.

### i18n

Uses `next-intl` with locale files at `src/locales/en.json` and `src/locales/pt.json`. Locale state is persisted client-side via a Zustand store (`useLocaleStore`). The layout provider dynamically loads the active locale's JSON. Switch UI is in `src/components/langSwitcher.tsx`.

### Theming

`next-themes` handles dark/light mode. All colors are defined as CSS custom properties in `src/app/globals.css` using the oklch color space. Primary palette is sky/indigo. Theme toggle is in `src/components/ThemeSwitcher.tsx`.

### State

Zustand 5 with `persist` middleware for client-side state (locale, any other persisted UI state). No server-side state management.

### Animations

Framer Motion 12 is used in section components (Hero, ProjectsSection) with staggered animation variants. Keep animation logic local to the component using it.

### Path Alias

`@/*` maps to `src/*` — always use this for imports.

### Image Optimization

`next/image` is configured to allow images from `via.placeholder.com` and `xl7064gpfgvoyo7p.public.blob.vercel-storage.com` (Vercel Blob Storage).

### shadcn/ui

Components live in `src/components/ui/`. Add new shadcn components with `npx shadcn@latest add <component>`. Icons use lucide-react; additional icons come from react-icons.
