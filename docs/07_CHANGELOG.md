# Changelog

## 2026-07-22 — Phase 10.1: Enterprise Architecture and Configuration

### Created

- `config/site.ts`, `config/navigation.ts`, `config/metadata.ts`, `config/social.ts`, and `config/contact.ts`
- `constants/routes.ts` and `constants/motion.ts`
- `types/navigation.ts`
- `utils/format-date.ts` and `utils/external-link.ts`
- `lib/fonts.ts`
- `docs/10_PROJECT_ARCHITECTURE.md`
- New production-focused root `README.md`

### Moved

- Moved the untouched legacy `src/` tree to `archive/bootstrap-template/src/`.
- Moved the original one-line template README to `archive/bootstrap-template/README.md`.
- Verified all 478 archived files with SHA-256 before and after the move; zero hashes changed.

### Consolidated

- Site identity, canonical URL, author, and copyright now have one owner in `config/site.ts`.
- Root and Contact metadata now come from `config/metadata.ts`.
- Desktop, mobile, and Footer navigation share canonical routes and typed configuration.
- Address, email, phone, and social destinations are no longer duplicated across Contact and Footer data.
- Shared external-link attributes, date formatting, font setup, and motion easing were extracted without changing behavior or visual values.
- Footer navigation now uses the shared `NavigationGroup` contract; contact information no longer requires an `Omit` workaround.

### Removed

- Removed superseded `lib/site-config.ts` and `lib/navigation.ts`.
- Removed the unused `public/images/logos/luit-studio.png`; all active public assets are referenced.
- Removed the generated TypeScript build cache from source state.
- Updated stale Awake package metadata and example environment URL.

### Archive isolation

- Production code, runtime assets, styles, scripts, and Next.js configuration have zero dependencies on `archive/bootstrap-template`.
- Tool exclusions protect the archive from linting, formatting, and type-checking; these exclusions are isolation guards, not runtime dependencies.

## 2026-07-22 — Phase 9: Blog, Contact, and Footer

### Added

- `types/blog.ts`, `types/contact.ts`, and `types/footer.ts`
- `data/blog.ts`, `data/contact.ts`, and `data/footer.ts`
- `components/sections/blog/Blog.tsx`, `BlogGrid.tsx`, `BlogCard.tsx`, `BlogMeta.tsx`, and `index.ts`
- `components/sections/contact/Contact.tsx`, `ContactForm.tsx`, `ContactInfo.tsx`, `SocialLinks.tsx`, and `index.ts`
- `components/sections/footer/Footer.tsx`, `FooterNavigation.tsx`, `FooterCopyright.tsx`, `FooterSocial.tsx`, and `index.ts`
- `app/contact/page.tsx` with route metadata
- Contact route entry in `app/sitemap.ts`

### Architectural decisions

- Confirmed that the source contains no Blog section, posts, post imagery, or newsletter. Added a complete typed Blog presentation boundary backed by an empty adapter; it returns `null` until authentic CMS/MDX content is available.
- Rebuilt Contact as the original standalone route rather than inserting the form into the homepage. Source field labels, select options, CTA, address, email, phone, and social destinations remain intact.
- Kept Contact composition, information, and all Footer components server-rendered. Only `ContactForm` hydrates to prevent an unconfigured backend request and announce the presentation-only state.
- Mounted Footer once in the root layout so content is consistent across every route without duplicated page markup.
- Centralized source contact values in `data/contact.ts`; Footer derives its contact/social values from that typed adapter to prevent drift.
- Preserved future supporting-page destinations in typed footer data without implementing out-of-scope legal routes.

### Reusable abstractions

- `BlogArticle` and `BlogImage` form a CMS-neutral contract; `Blog`, `BlogGrid`, and `BlogCard` accept readonly external collections.
- `ContactField` supports text, email, select, and textarea controls with typed options and validation metadata.
- `ContactInfo` and `SocialLinks` accept reusable typed data rather than importing static content.
- `FooterNavigation` renders any readonly group collection; `FooterSocial` reuses the shared accessible social renderer.
- `Footer` accepts a complete `FooterContent` prop and defaults to the current static adapter.

### Removed Bootstrap patterns

- Bootstrap form grids, form-control/select classes, card utilities, and centered button utilities became semantic form components with Tailwind tokens.
- The external FormSubmit endpoint was removed; no personal email address or pretend backend remains in the runtime.
- Footer rows, responsive columns, spacing utilities, tooltips, and repeated page markup became one root-level responsive component.
- Iconify social/contact/button icons were replaced with Lucide components.
- AOS attributes were replaced by the established reduced-motion-safe `Reveal` boundary.
- Generic logo markup became intrinsic `next/image` rendering.

## 2026-07-22 — Phase 8: Testimonials, Pricing, and CTA

### Added

- `types/testimonial.ts`, `types/pricing.ts`, and `types/cta.ts`
- `data/testimonials.ts`, `data/pricing.ts`, and `data/cta.ts`
- `components/sections/testimonials/Testimonials.tsx`
- `components/sections/testimonials/TestimonialsGrid.tsx`
- `components/sections/testimonials/TestimonialCard.tsx`
- `components/sections/testimonials/index.ts`
- `components/sections/pricing/Pricing.tsx`
- `components/sections/pricing/PricingCard.tsx`
- `components/sections/pricing/PricingFeature.tsx`
- `components/sections/pricing/index.ts`
- `components/sections/cta/CTA.tsx`
- `components/sections/cta/index.ts`
- `public/images/customer/customer-bg.jpg`
- `public/images/customer/customer-stories.jpg`

### Architectural decisions

- Preserved all testimonial and pricing content from the source while representing unavailable testimonial ratings, avatars, and authors as nullable data instead of inventing claims.
- Separated domain types, static data adapters, layout composition, and card presentation so future CMS/API records can be normalized without rewriting the UI.
- Kept all new presentation components server-rendered. The established `Reveal` boundary remains the only animation client component.
- Modeled the CTA as reusable typed content with configurable background and shared button variants rather than coupling it to the homepage.
- Preserved the source testimonial mosaic and pricing color hierarchy while using mobile-first layouts that remain fluid at 320 px.

### Reusable abstractions

- `TestimonialCard` supports quote, statistic, avatar, author metadata, rating, and two image treatments through one typed contract.
- `TestimonialsGrid` owns layout and stagger timing independently of the static data source.
- `PricingCard` and `PricingFeature` render any conforming readonly pricing dataset without repeated plan JSX.
- `CTA` accepts title, description, buttons, and background through `CtaContent`, allowing future pages to reuse the same conversion component.

### Removed Bootstrap patterns

- Bootstrap rows, responsive columns, spacing, background, flex, and rounded utilities were replaced with semantic components and Tailwind tokens.
- Repeated testimonial and pricing markup was replaced by typed dataset maps.
- AOS attributes and manual delay classes were replaced by the reduced-motion-safe shared `Reveal` component.
- Iconify pricing checks were replaced with Lucide `Check` icons.
- Source image CSS backgrounds were replaced with intrinsic `next/image` layers and blur placeholders.

## 2026-07-22 — Phase 7: Portfolio / Featured Projects

### Added

- `types/portfolio.ts`
- `data/portfolio.ts`
- `components/sections/portfolio/Portfolio.tsx`
- `components/sections/portfolio/PortfolioGrid.tsx`
- `components/sections/portfolio/PortfolioCard.tsx`
- `components/sections/portfolio/PortfolioBadge.tsx`
- `components/sections/portfolio/index.ts`
- `public/images/work/work-img-1.jpg`
- `public/images/work/work-img-2.jpg`
- `public/images/work/work-img-3.jpg`
- `public/images/work/work-img-4.jpg`
- `docs/09_UI_REGISTRY.md`

### Architectural decisions

- Split the feature into domain types, data, section composition, grid composition, and card presentation. Replacing `data/portfolio.ts` with a CMS/API adapter does not require changing card UI.
- Modeled unavailable source metadata (`year` and `description`) as nullable rather than fabricating portfolio claims.
- Kept project cards as Server Components. The existing `Reveal` boundary is the only animation hydration layer.
- Made the entire project card one semantic link inside an `<article>`, providing a large keyboard/pointer target without nested interactive controls.
- Omitted `PortfolioFilters` because the Bootstrap source contains no filtering interface.
- Retained the original external project destination and added safe new-tab behavior and explicit accessible labeling.

### Reusable abstractions

- `PortfolioProject`, `PortfolioImage`, and `PortfolioCta` define a CMS-neutral domain contract.
- `PortfolioGrid` accepts any readonly collection of conforming projects.
- `PortfolioCard` renders all project UI exclusively from its typed `project` prop.
- `PortfolioBadge` presents category and technology metadata consistently.

### Removed Bootstrap patterns

- Bootstrap rows, `col-md-6`, margin utilities, badges, positioning, and rounded utilities were replaced by Tailwind grid and component tokens.
- The CSS-only top-sliding work overlay became a shared hover/focus-visible overlay with reduced-motion handling.
- Iconify arrows were replaced with Lucide `ArrowUpRight`.
- Generic `alt="work"` strings were replaced with image-specific descriptions.
- Repeated authored card markup was replaced by a typed data map.

## 2026-07-22 — Phase 6: About and Services

### Added

- `components/sections/about/About.tsx`
- `components/sections/about/AboutContent.tsx`
- `components/sections/about/AboutImage.tsx`
- `components/sections/about/AboutStats.tsx`
- `components/sections/about/AboutExperience.tsx`
- `components/sections/about/index.ts`
- `components/sections/services/Services.tsx`
- `components/sections/services/ServiceGrid.tsx`
- `components/sections/services/ServiceCard.tsx`
- `components/sections/services/ServicesCTA.tsx`
- `components/sections/services/service-data.ts`
- `components/sections/services/index.ts`
- `components/shared/animated-counter.tsx`
- `docs/07_CHANGELOG.md`
- `docs/08_QA_CHECKLIST.md`

### Architectural decisions

- Kept page and section composition as Server Components. Only the existing `Reveal` wrapper and new intersection-driven counter hydrate on the client.
- Interpreted `AboutImage` as the source template’s icon-led principles visual because the original About section contains no raster image. No unrelated image or feature was invented.
- Modeled services as a readonly typed dataset containing copy, Lucide component references, and explicit theme classes.
- Kept `ServiceCard` presentation-independent from grid composition so cards can be reordered or reused without layout knowledge.
- Extended the approved `ButtonLink` primitive with structured light and outline-light variants required by the original Services action band. Existing variants preserve their behavior.
- Added darker semantic ink tokens derived from the source colors to improve pastel-card contrast.

### Reusable abstractions

- `AnimatedCounter` supplies once-only intersection animation, reduced-motion fallback, and stable tabular output.
- `AboutExperience` encapsulates one labeled statistic and can accept any numeric value and label.
- `ServiceCard` accepts strongly typed `ServiceData`; `ServiceGrid` owns responsive layout and stagger timing.
- `ServicesCTA` centralizes the original dual-action conversion band.

### Removed Bootstrap patterns

- Bootstrap `row`, `col-*`, flex, gap, spacing, border, rounded, and color utilities were replaced by mobile-first Tailwind composition.
- Iconify custom elements were replaced with tree-shakeable Lucide components.
- The jQuery `.count().animate()` behavior was replaced with a focused React/browser API component.
- AOS attributes and manually repeated delays were replaced with the shared Framer Motion `Reveal` boundary.
- Placeholder CTA URLs were replaced by meaningful `/contact` and `/#work` routes.
