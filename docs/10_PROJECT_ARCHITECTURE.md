# Project Architecture

## Purpose

This document defines the production ownership model after Phase 10.1. The refactor changes organization and configuration only; UI markup, styling, responsive behavior, and animation values remain unchanged.

## Folder tree

```text
app/
  contact/page.tsx
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  layout/
  sections/
    about/
    blog/
    client-marquee/
    contact/
    cta/
    footer/
    hero/
    portfolio/
    pricing/
    services/
    testimonials/
  shared/
  ui/
config/
  contact.ts
  metadata.ts
  navigation.ts
  site.ts
  social.ts
constants/
  motion.ts
  routes.ts
data/
hooks/
lib/
  fonts.ts
public/images/
types/
utils/
  external-link.ts
  format-date.ts
docs/
archive/bootstrap-template/
  README.md
  src/
    html/
    assets/
      css/
      images/
      js/
      libs/
      scss/
```

## Rendering strategy

Server Components are the default. Pages, section shells, cards, configuration, static data, images, and metadata remain server-rendered or server-compatible.

Client boundaries exist only where browser APIs or interaction require them:

- `SiteHeader`: route state, active-section state, scroll state, mobile-menu state.
- `MobileNavigation`: focus management, keyboard handling, body scroll lock, Framer Motion.
- `Reveal`: viewport motion and reduced-motion preference.
- `AnimatedCounter`: intersection observation and reduced-motion behavior.
- `ContactForm`: prevents an unconfigured submission and announces presentation status.

No client component fetches configuration or static content.

## Data flow

```text
environment
  -> config/site.ts
  -> config/metadata.ts
  -> App Router metadata exports

constants/routes.ts
  -> config/navigation.ts
  -> Header / MobileNavigation / Footer data

config/contact.ts + config/social.ts
  -> data/contact.ts + data/footer.ts
  -> Contact / Footer presentation

data/*.ts
  -> section-level server adapter
  -> typed grid/card components
```

Presentation components accept typed props and do not own global configuration. Section-level components may select the current static adapter, which is the replacement seam for a CMS or API.

## Configuration ownership

### Site

`config/site.ts` owns the canonical name, short name, author, description, public URL, and copyright strings. `NEXT_PUBLIC_SITE_URL` is the only environment override.

### Metadata

`config/metadata.ts` owns root defaults, viewport metadata, and Contact metadata. Routes re-export configuration rather than repeating descriptions and Open Graph values.

### Navigation and routes

`constants/routes.ts` owns internal destinations. `config/navigation.ts` owns desktop, mobile, and Footer labels/order. This prevents CTAs and navigation surfaces from drifting to different URLs.

### Contact and social

`config/contact.ts` owns address, email, and phone. `config/social.ts` owns each external destination once, then exposes the existing Contact/Footer and mobile display sets without coupling configuration to icons.

### Motion

`constants/motion.ts` owns only values already shared by multiple components: the premium easing curve and shared reveal/drawer durations. One-off animation timings stay with their components.

## Shared components and helpers

- `components/ui`: visual primitives such as `ButtonLink` and `Container`.
- `components/shared`: reusable composed behavior such as `Reveal` and `AnimatedCounter`.
- `utils/format-date.ts`: deterministic UTC display formatting for CMS-ready article dates.
- `utils/external-link.ts`: consistent safe new-tab attributes and accessible labels.
- `lib/fonts.ts`: one `next/font` initialization point for root layout use.
- `hooks/`: only the existing reusable active-section and scroll-state hooks.

## Types

Domain contracts remain grouped by domain under `types/`. Navigation links/groups now share `types/navigation.ts`. `ContactInformation` is reusable independently of social links, so Footer no longer derives its type through `Omit<ContactDetails, "socialLinks">`.

There is no `any` in production source.

## Future CMS strategy

Static files under `data/` are adapters, not presentation contracts. A future Sanity, Contentlayer, MDX, or API integration should:

1. Fetch in a Server Component or server-only adapter.
2. Normalize external records to the existing domain types.
3. Pass readonly records to the existing grids/cards.
4. Keep global identity, navigation, contact, and metadata in `config/` unless the CMS explicitly becomes their source of truth.

Portfolio and Blog already expose the clearest adapter seams. The same pattern applies to testimonials and pricing.

## Legacy Bootstrap archive

The original template is preserved unchanged in `archive/bootstrap-template/` for historical migration reference only. The `src` tree was moved intact: 478 files were SHA-256 checked before and after archiving with zero differences.

Isolation rules:

- Never import from the archive.
- Never reference archived images from runtime CSS, JSX, metadata, or data files.
- Never execute archived scripts or package manifests as part of production workflows.
- ESLint, Prettier, and TypeScript exclusions prevent accidental processing.
- The Next.js application builds entirely from root production folders.

## Phase 10.1 file changes

Created:

- `config/contact.ts`
- `config/metadata.ts`
- `config/navigation.ts`
- `config/site.ts`
- `config/social.ts`
- `constants/motion.ts`
- `constants/routes.ts`
- `types/navigation.ts`
- `utils/external-link.ts`
- `utils/format-date.ts`
- `lib/fonts.ts`
- `docs/10_PROJECT_ARCHITECTURE.md`
- production root `README.md`

Moved without modification:

- `src/` -> `archive/bootstrap-template/src/`
- legacy `README.md` -> `archive/bootstrap-template/README.md`

Removed after replacement or verification:

- `lib/navigation.ts`
- `lib/site-config.ts`
- unused `public/images/logos/luit-studio.png`
- generated `tsconfig.tsbuildinfo`
