# UI Registry

Last updated: 2026-07-22

This registry tracks implemented UI, its rendering boundary, public API, and ownership. Page data should flow into these components through typed props rather than being fetched inside presentation components.

## UI primitives

| Component    | Render mode       | Public API                                           | Status |
| ------------ | ----------------- | ---------------------------------------------------- | ------ |
| `Container`  | Server-compatible | Native `div` props plus `className`                  | Stable |
| `ButtonLink` | Server-compatible | Next `Link` props, `variant`, optional Lucide `icon` | Stable |

Button variants: `dark`, `brand`, `light`, `outlineLight`, `luit`, and `luitOutline`.

## Configuration registry

| Module                 | Responsibility                                     | Consumers                          |
| ---------------------- | -------------------------------------------------- | ---------------------------------- |
| `config/site.ts`       | Identity, URL, author, copyright                   | Metadata, chrome, content adapters |
| `config/metadata.ts`   | Default, viewport, and Contact metadata            | App Router layouts/pages           |
| `config/navigation.ts` | Desktop, mobile, and Footer navigation groups      | Header, drawer, Footer data        |
| `config/contact.ts`    | Canonical address, email, and phone                | Contact and Footer data            |
| `config/social.ts`     | Canonical profiles and route-specific display sets | Contact, mobile drawer, Footer     |
| `constants/routes.ts`  | Canonical internal destinations                    | Config, CTAs, navigation, sitemap  |
| `constants/motion.ts`  | Existing shared easing and duration values         | Reveal and mobile drawer           |

Configuration modules are data-only and never import UI. Section content remains in `data/`; global repeated values live in `config/`.

## Shared behavior

| Component         | Render mode     | Public API                                                       | Status |
| ----------------- | --------------- | ---------------------------------------------------------------- | ------ |
| `Reveal`          | Client boundary | `children`, optional `className`, optional seconds-based `delay` | Stable |
| `AnimatedCounter` | Client boundary | `value`, optional millisecond `duration`                         | Stable |

`Reveal` owns viewport entrance animation and reduced-motion behavior. Presentation components should not create independent Framer Motion timings when `Reveal` is sufficient.

## Layout

| Component          | Render mode     | Responsibility                                           | Status   |
| ------------------ | --------------- | -------------------------------------------------------- | -------- |
| `SiteHeader`       | Client boundary | Fixed header, scrolled state, active section, menu state | Approved |
| `MobileNavigation` | Client boundary | Focus-trapped animated navigation dialog                 | Approved |

## Hero and trust

| Component        | Render mode            | Responsibility                             | Status   |
| ---------------- | ---------------------- | ------------------------------------------ | -------- |
| `Hero`           | Server                 | Section composition                        | Approved |
| `HeroContent`    | Server                 | H1, supporting copy, stagger groups        | Approved |
| `HeroBackground` | Server                 | Decorative background layers               | Approved |
| `HeroCTA`        | Server                 | Primary conversion and social proof        | Approved |
| `HeroImage`      | Server                 | Reviewer portraits and rating              | Approved |
| `ClientMarquee`  | Server + CSS animation | Continuous/static client-logo presentation | Approved |
| `ClientLogo`     | Server                 | One intrinsically sized logo               | Approved |

## About

| Component         | Render mode                | Responsibility               | Status   |
| ----------------- | -------------------------- | ---------------------------- | -------- |
| `About`           | Server                     | Section composition          | Approved |
| `AboutContent`    | Server                     | Thesis and principles        | Approved |
| `AboutImage`      | Server                     | Icon-led principle visual    | Approved |
| `AboutStats`      | Server                     | Responsive statistics layout | Approved |
| `AboutExperience` | Server with counter island | One labeled metric           | Approved |

## Services

| Component     | Render mode | Public API / responsibility                     | Status   |
| ------------- | ----------- | ----------------------------------------------- | -------- |
| `Services`    | Server      | Section composition                             | Approved |
| `ServiceGrid` | Server      | Maps typed service data and owns layout/stagger | Approved |
| `ServiceCard` | Server      | `service: ServiceData`                          | Approved |
| `ServicesCTA` | Server      | Shared conversion action band                   | Approved |

## Portfolio

| Component        | Render mode | Public API / responsibility                    | Status   |
| ---------------- | ----------- | ---------------------------------------------- | -------- |
| `Portfolio`      | Server      | Selects featured data and composes the section | Approved |
| `PortfolioGrid`  | Server      | `projects: readonly PortfolioProject[]`        | Approved |
| `PortfolioCard`  | Server      | `project: PortfolioProject`                    | Approved |
| `PortfolioBadge` | Server      | `children: string`                             | Approved |

### Portfolio data boundary

- Domain contract: `types/portfolio.ts`.
- Current static adapter: `data/portfolio.ts`.
- UI components do not import static data except the section-level `Portfolio` adapter.
- `year` and `description` are nullable because the source template does not provide them.
- `PortfolioFilters` is intentionally absent because the source has no filter behavior.
- A future Sanity, Contentlayer, MDX, CMS, or API adapter should normalize records to `PortfolioProject[]` before passing them to `PortfolioGrid`.

## Testimonials

| Component          | Render mode | Public API / responsibility                       | Status   |
| ------------------ | ----------- | ------------------------------------------------- | -------- |
| `Testimonials`     | Server      | Selects testimonial data and composes the section | Approved |
| `TestimonialsGrid` | Server      | `testimonials: readonly Testimonial[]`            | Approved |
| `TestimonialCard`  | Server      | `testimonial: Testimonial`                        | Approved |

Testimonial records are defined by `types/testimonial.ts` and currently supplied by `data/testimonials.ts`. Optional avatar, author, company, rating, quote, statistic, and image fields preserve source truth while supporting future CMS records.

## Pricing

| Component        | Render mode | Public API / responsibility                | Status   |
| ---------------- | ----------- | ------------------------------------------ | -------- |
| `Pricing`        | Server      | Selects plan data and composes the section | Approved |
| `PricingCard`    | Server      | `plan: PricingPlan`                        | Approved |
| `PricingFeature` | Server      | `children: string`                         | Approved |

Pricing records are defined by `types/pricing.ts` and supplied by `data/pricing.ts`; the UI has no dependency on the static adapter beyond the section composition layer.

## CTA

| Component | Render mode | Public API / responsibility                           | Status   |
| --------- | ----------- | ----------------------------------------------------- | -------- |
| `CTA`     | Server      | `CtaContent`: title, description, buttons, background | Approved |

CTA domain types live in `types/cta.ts`; the homepage content adapter is `data/cta.ts`. Background and shared button variants are selected through typed tokens rather than section-specific markup.

## Blog

| Component  | Render mode | Public API / responsibility         | Status   |
| ---------- | ----------- | ----------------------------------- | -------- |
| `Blog`     | Server      | `articles?: readonly BlogArticle[]` | Approved |
| `BlogGrid` | Server      | `articles: readonly BlogArticle[]`  | Approved |
| `BlogCard` | Server      | `article: BlogArticle`              | Approved |
| `BlogMeta` | Server      | `author`, `category`, ISO `date`    | Approved |

Blog domain types live in `types/blog.ts`; `data/blog.ts` is deliberately empty because the source has no articles. `Blog` returns `null` for an empty collection and accepts normalized CMS/MDX records without UI changes.

## Contact

| Component     | Render mode     | Public API / responsibility                    | Status   |
| ------------- | --------------- | ---------------------------------------------- | -------- |
| `Contact`     | Server          | `content?: ContactContent`                     | Approved |
| `ContactForm` | Client boundary | Typed fields and presentation submission state | Approved |
| `ContactInfo` | Server          | `details: ContactDetails`                      | Approved |
| `SocialLinks` | Server          | `links`, optional inverse treatment            | Approved |

Contact types live in `types/contact.ts`; canonical details/social profiles live in `config/`, while form content remains in `data/contact.ts`. `ContactForm` is a client component because it prevents requests to an unconfigured backend and announces status honestly.

## Footer

| Component          | Render mode | Public API / responsibility          | Status   |
| ------------------ | ----------- | ------------------------------------ | -------- |
| `Footer`           | Server      | `content?: FooterContent`            | Approved |
| `FooterNavigation` | Server      | `groups: readonly NavigationGroup[]` | Approved |
| `FooterSocial`     | Server      | `links: readonly SocialLink[]`       | Approved |
| `FooterCopyright`  | Server      | `text: string`                       | Approved |

Footer types live in `types/footer.ts`; `data/footer.ts` composes canonical navigation, contact, social, and site configuration. The root layout owns one Footer instance for all routes. `Newsletter` is intentionally absent because the original template has no newsletter.
