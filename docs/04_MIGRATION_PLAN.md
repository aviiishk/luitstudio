# Migration Plan

## Phase 1 — Analyze the source template

Inventory pages, sections, assets, dependencies, breakpoints, behaviors, duplication, and content defects.

Exit criterion: every route and reusable pattern appears in the analysis and component map.

## Phase 2 — Create migration documentation

Document the source, architecture, components, phases, design tokens, and progress before implementation.

Exit criterion: all six requested documents exist and agree on naming.

## Phase 3 — Establish Next.js architecture

- Replace the manifest with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.
- Add strict TypeScript, ESLint, Prettier, App Router root files, global tokens, and initial metadata.
- Create component, library, and public-asset boundaries.
- Copy only assets needed by the current phase.

Exit criterion: type, lint, and production-build checks pass without Bootstrap or jQuery.

## Phase 4 — Migrate navigation

- Build fixed desktop navigation and the scrolled surface state.
- Build an accessible animated mobile drawer.
- Add root-safe section URLs, keyboard controls, focus restoration, body-scroll lock, active-section highlighting, and reduced-motion behavior.
- Verify and pause for approval.

Exit criterion: shared navigation works across widths and routes with no legacy runtime.

## Phase 5 — Hero and trust marquee

Implement the hero, reviewer stack, rating, CTA, and reduced-motion-safe client-logo marquee. Migrate the relevant profile and brand assets.

## Phase 6 — About and Services

Implement principle blocks, intersection-triggered counters, the service grid, and action band. Add anchored-section scroll offsets.

## Phase 7 — Work and Team

Implement responsive project and team cards, optimized imagery, and keyboard-equivalent hover interactions.

## Phase 8 — Testimonials, Pricing, FAQ, Awards, and CTA

Recreate the testimonial mosaic and pricing comparison, then add the reusable accordion, awards, and conversion CTA.

## Phase 9 — Supporting routes and Footer

Build Contact, Privacy, Terms, not-found, and Footer. Replace direct FormSubmit coupling with a typed submission boundary and normalize source encoding.

## Phase 10 — SEO and structured data

Complete unique route metadata, canonical URLs, Open Graph/Twitter data, icons, robots, sitemap, and Organization/WebSite JSON-LD. Deployment origin comes from environment configuration.

## Phase 11 — Performance and accessibility hardening

Audit client boundaries, images, fonts, bundle weight, reduced motion, focus order, contrast, headings, labels, and landmarks. Dynamic imports are added only when measured savings justify them.

## Phase 12 — Final QA

Test mobile through ultra-wide layouts. Run formatting, lint, type-check, production build, and accessibility checks. Validate links, forms, keyboard interaction, and progressive rendering. Preserve the isolated Bootstrap archive for historical migration reference; never use it as a production dependency.
