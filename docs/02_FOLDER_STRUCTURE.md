# Folder Structure

## Production architecture

```text
app/                         App Router routes, route metadata exports, composition
components/
  layout/                    Shared site chrome and navigation
  sections/                  Feature sections grouped by domain
  shared/                    Reusable composed behavior
  ui/                        Low-level visual primitives
config/                      Typed application configuration
  contact.ts                 Canonical address, email, and phone
  metadata.ts                Default, viewport, and route metadata
  navigation.ts              Desktop, mobile, and footer navigation
  site.ts                    Identity, canonical URL, author, copyright
  social.ts                  Canonical social profiles and display sets
constants/                   Reusable non-content constants
  motion.ts                  Shared motion duration/easing values
  routes.ts                  Canonical internal destinations
data/                        Typed content adapters for sections
hooks/                       Existing reusable browser-state hooks
lib/                         Framework-facing shared logic such as fonts
public/images/               Runtime assets grouped by domain
types/                       Shared domain and configuration contracts
utils/                       Pure reusable formatting/attribute helpers
docs/                        Architecture, design, migration, and QA records
archive/bootstrap-template/  Untouched historical Bootstrap source
```

## Ownership rules

### `app/` owns routes and composition

App Router files compose sections and export metadata sourced from `config/metadata.ts`. They do not own repeated site identity or presentation implementations. The root layout owns fonts and shared chrome.

### `config/` owns environment-aware application configuration

Site identity, metadata defaults, contact details, social profiles, and navigation are centralized here. Configuration may depend on environment variables and shared types, but never imports UI components.

### `constants/` owns stable reusable values

Only values used across multiple modules belong here. Routes and the shared motion curve qualify. Tailwind-only spacing, color, radius, shadow, and breakpoint tokens remain in `app/globals.css` rather than being duplicated in TypeScript.

### `data/` owns replaceable content adapters

Section datasets remain separate from global configuration. Components accept typed records; future CMS/API adapters normalize external data into the same domain contracts.

### Components are grouped by responsibility

- `layout/` contains site-wide chrome.
- `sections/` contains page-level domains.
- `shared/` contains reusable composed behavior.
- `ui/` contains low-level typed primitives.

Interactive boundaries stay narrow. Page composition, content, cards, and configuration remain server-compatible unless browser state or motion requires hydration.

### `utils/`, `lib/`, and `hooks/` remain distinct

- `utils/` contains pure framework-independent helpers.
- `lib/` contains shared framework integrations such as `next/font` setup.
- `hooks/` contains only existing reusable React hooks.

### Imports use the root alias

Production TypeScript uses `@/` imports, including barrel exports. Relative imports are limited to framework-required CSS loading in `app/layout.tsx`.

## Assets and archive isolation

Runtime assets live only in `public/images`. The historical Bootstrap template is preserved unchanged under `archive/bootstrap-template/src`, including its HTML, Sass, vendor assets, Bootstrap, jQuery, Owl Carousel, and AOS files.

The archive exists only for migration reference. ESLint, Prettier, and TypeScript explicitly exclude it. Production code has no imports, asset URLs, styles, scripts, or build configuration dependencies pointing into the archive.
