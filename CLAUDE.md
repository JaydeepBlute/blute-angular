# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


## Tech Stack

- **Angular 21** with standalone components (no NgModules) and signals
- **TypeScript 5.9** with strict mode enabled, ES2022 target
- **Tailwind CSS 4** via `@tailwindcss/postcss` (configured in `.postcssrc.json`)
- **Vitest** for unit testing with Angular TestBed and JSDOM
- **Firebase Hosting** with GitLab CI/CD pipeline (`.gitlab-ci.yml`)
- **Nginx** for serving in Docker production builds

## Architecture

This is a corporate website SPA for Blute Technologies. All routes are defined in `src/app/app.routes.ts` with ~30+ routes organized into four nav categories.

**Route categories** (matching the navbar dropdowns):
- **Services**: product-engineering, mobile-app-development, web-application, devops, devsecops, cyber-security, it-consulting, networking
- **Technologies**: cloud, cognitive, agentic-ai, iot-solutions
- **Industries**: retail-ecommerce, healthcare-pharma, bfsi, government, manufacture, education, transportation, telecom, enterprise
- **Company**: about, team, portfolio, careers, clients, contact, privacy-policy, terms-of-use

Each route maps to a standalone component in its own directory under `src/app/`.

**Component pattern** — every page component follows the same structure:
- Standalone component with `CommonModule` and `RouterModule` imports
- SEO setup in `ngOnInit` via Angular's `Meta` and `Title` services
- Component-scoped SCSS for layout, `styles.css` for shared animations
- No centralized state; local state managed with signals or component properties

**Key shared components:**
- `src/app/navbar/` — dropdown nav with the four categories above
- `src/app/footer/` — site-wide footer
- `src/app/home/` — landing page with auto-rotating carousel (5s interval)

**SEO**: Every page sets its own title and meta description using Angular's `Meta`/`Title` services. This is a project convention — all new pages must do the same.

**Deployment flow**: Push to `main` → GitLab CI builds (`ng build`) → deploys to Firebase Hosting using `FIREBASE_TOKEN` CI/CD variable. The `firebase.json` configures a catch-all SPA rewrite (`**` → `/index.html`).

## Style Conventions

- 2-space indentation, single quotes (enforced by `.editorconfig` and Prettier)
- Prettier print width: 100 characters; Angular parser for HTML templates
- Component SCSS files for component-level styles; global animations live in `src/styles.css`
- Custom animations defined globally: `gridScroll`, `radarPulse`, `glowPulse`, `fadeUp`, etc.

## UI/UX, Responsiveness & SEO Guidelines

### 1. Beautiful Frontend & UI Consistency
- **Visual Design**: Prioritize rich aesthetics, clean typography (e.g., modern Google Fonts), smooth gradients, and glassmorphic designs. Avoid generic/plain colors; use cohesive dark modes and HSL-tailored color palettes.
- **Consistent Layout**: Align elements using predefined CSS grids/flex containers with uniform gaps, margins, and padding.
- **Interactive States**: Implement subtle, premium micro-animations (scale/hover effects, glowing borders, fade-up entries) on cards, buttons, and links.
- **No Placeholders**: Never use placeholder text or mock assets in public views; use high-quality SVGs, icon packs, or generated media.

### 2. Mobile-First Responsiveness
- **Layout Adapting**: Ensure all structural grids and flex boxes scale seamlessly from mobile devices to wide desktop screens without horizontal overflow.
- **Breakpoint Classes**: Explicitly define layout columns, spacing, and sizing using Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- **Fluid Typography**: Use relative sizing (`rem`, `em`, `vh/vw`) for text and container scaling to maintain proportions across various device screen ratios.

### 3. SEO & User Experience (UX) Integration
- **Angular SEO Services**: Every page component must utilize `Title` and `Meta` services in `ngOnInit` to set unique, descriptive page titles and description meta tags matching search intent.
- **Semantic HTML**: Structure templates using proper elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`). Never rely solely on generic `<div>` wrappers.
- **Heading Hierarchy**: Maintain a clean outline hierarchy: exactly one `<h1>` per page, followed by sequential `<h2>`, `<h3>` tags.
- **UX & Accessibility**: Verify that text contrast meets WCAG standards. Add descriptive `aria-label` tags for interactive elements and search engine indexability. Ensure buttons/links have interactive focus outlines.

## Observability & Logging Requirements

Every agent interaction or repository change must maintain standard project log files in the `logs/` directory:

- **Change Log (`logs/change.log`)**: Whenever decisions are made or files are changed, update the ASCII decision tree in this file with a timestamp and file path.
- **Memory Log (`logs/memory.log`)**: Store critical patterns, page/route listings, configurations, and long-term references. Update this whenever new components are added or architectural paradigms are updated.
- **Audit Log (`logs/audit.log`)**: Record all terminal/bash commands executed during the task with a timestamp for structural audit trails.


