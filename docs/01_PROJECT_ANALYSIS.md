# Awake Template — Project Analysis

## Overview

Awake is a creative-agency and portfolio template with one section-heavy landing page and four supporting pages. Its visual language uses oversized editorial headings, pill controls, soft pastel surfaces, generous spacing, rounded cards, and a restrained purple accent. Inter Tight is the primary typeface; Instrument Serif supplies italic display phrases.

The current implementation is static HTML backed by a customized Bootstrap 5.3.3 build. Global layout fragments are duplicated in every file, and behavior is initialized from one jQuery script.

## Pages

| Existing file                                                   | Next.js route           | Content                     |
| --------------------------------------------------------------- | ----------------------- | --------------------------- |
| `archive/bootstrap-template/src/html/index.html`                | `/`                     | Full agency landing page    |
| `archive/bootstrap-template/src/html/contact.html`              | `/contact`              | Contact form and FAQ        |
| `archive/bootstrap-template/src/html/privacy-policy.html`       | `/privacy-policy`       | Privacy policy content      |
| `archive/bootstrap-template/src/html/terms-and-conditions.html` | `/terms-and-conditions` | Terms content               |
| `archive/bootstrap-template/src/html/404.html`                  | `app/not-found.tsx`     | Illustrated not-found state |

All pages share a fixed header, mobile offcanvas, footer, vendor promotion, and scroll-to-top control. The “Get This Template” promotion is vendor chrome and will not ship in the agency application.

## Landing-page sections

1. Fixed navigation with section links and Contact CTA.
2. Hero with oversized headline, CTA, reviewer avatars, stars, and review count.
3. Infinite client-logo marquee.
4. About section with three principles and animated metrics.
5. Five service tiles and a two-option CTA band.
6. Four-project portfolio grid with hover overlays.
7. Four-person team grid with social links.
8. Asymmetric customer-story/testimonial grid.
9. Starter and Pro pricing plans.
10. Six-item FAQ accordion.
11. Three award cards.
12. Gradient contact CTA.
13. Multi-column footer.

Supporting pages add a contact form, reusable FAQ, legal-content cards, and the 404 illustration.

## Existing dependencies

| Dependency           | Current role                                                            | Migration                                           |
| -------------------- | ----------------------------------------------------------------------- | --------------------------------------------------- |
| Bootstrap 5.3.3      | Grid, utilities, typography, forms, cards, navbar, accordion, offcanvas | Tailwind utilities and design tokens                |
| Bootstrap JS         | Offcanvas, collapse, tooltip                                            | React state and accessible disclosure patterns      |
| jQuery 3.6.3         | Scroll listeners and number animation                                   | Focused React hooks and browser APIs                |
| AOS                  | Scroll entrance effects                                                 | Framer Motion viewport animation                    |
| Owl Carousel         | Included but no authored initialization found                           | Remove                                              |
| Iconify CDN          | Solar, Lucide, and social icons                                         | Lucide React where equivalents exist                |
| Google Fonts imports | Inter Tight and Instrument Serif                                        | `next/font/google`                                  |
| FormSubmit           | Contact delivery                                                        | Typed form action/API boundary in the contact phase |

## Behaviors discovered

- Header gains a white surface and shadow after 60 px of scrolling.
- Desktop navigation highlights the section in view.
- Navigation becomes a right-side offcanvas below the existing `xl` breakpoint.
- Counters animate from zero over one second.
- The logo marquee runs for 20 seconds and pauses on hover.
- Portfolio images reveal a dark overlay from above on hover.
- Team portraits turn grayscale on hover.
- FAQ behaves as a single-open accordion.
- AOS effects run once with staggered delays.
- Social icons use tooltips.
- A floating control appears after 100 px and scrolls smoothly to the top.

## Assets

- Dark/white logos and favicon.
- Five client-brand SVGs.
- Four 624 × 410 portfolio JPGs.
- Four 300 × 373 team PNGs.
- Five 500 × 500 portraits, four currently used.
- Customer images at 1001 × 572 and 344 × 220.
- One 1340 × 758 404 PNG.
- Three award-platform SVGs.

Raster assets will use `next/image` with intrinsic dimensions and responsive `sizes`. SVG brand artwork remains SVG; decorative icons become Lucide components.

## Issues to correct

- All pages have the same generic title and no descriptions or social metadata.
- Placeholder links use `#` or `javascript:void(0)`.
- Source copy contains mojibake such as `â€™` and `Â©`.
- Global CSS removes focus outlines.
- The menu trigger lacks an accessible name.
- Form controls are inconsistently named and validated.
- FAQ answers are duplicated and one question repeats.
- Supporting-page hash links target sections that exist only on the homepage.
- Scroll-highlighting DOM queries can throw when a matching link is absent.
- The favicon MIME declaration is wrong.

## Rebuild principles

- Server Components by default; narrow client islands for interaction.
- Typed, data-driven repeated content.
- Shared primitives own variants, focus states, and motion conventions.
- Original assets remain the visual source of truth; legacy CSS/JS is never imported.
- Motion respects `prefers-reduced-motion`.
- Metadata, landmarks, heading order, and keyboard behavior are built in.
