# Design System

## Direction

Preserve Awake’s editorial character: confident type, white space, pill controls, softly colored surfaces, and restrained motion. Tokens are semantic so rebranding does not require component rewrites.

## Colors

| Token     | Value     | Use                                |
| --------- | --------- | ---------------------------------- |
| `canvas`  | `#ffffff` | Page background                    |
| `surface` | `#f4f4f4` | Navigation, accordion, muted cards |
| `border`  | `#e8e8e8` | Rules and outlined cards           |
| `muted`   | `#a4a5a5` | Supporting metadata                |
| `body`    | `#767778` | Body copy                          |
| `ink`     | `#1b1d1e` | Headings, controls, dark surfaces  |
| `brand`   | `#4928fd` | Primary accent                     |
| `violet`  | `#ba81ee` | Creativity/brand strategy          |
| `sky`     | `#70b5ff` | Innovation/digital design          |
| `orange`  | `#ffaf68` | Strategy/UI/UX                     |
| `yellow`  | `#f6e683` | Starter plan and ratings           |
| `green`   | `#79d45e` | Analytics                          |
| `rose`    | `#f4889a` | Development                        |

Hero wash: cyan → white → cream with a large blur. CTA wash: `#cdeffb` → white → `#fdeecb`. Pale colors are surfaces; readable copy remains `ink`.

## Typography

- Sans: Inter Tight through `next/font/google`, weights 400–700.
- Display accent: Instrument Serif through `next/font/google`, italic.
- Body: 16 px / 1.5; 14 px for labels and metadata.
- Heading weight: 500; legal subsections may use 600.
- Hero: `clamp(2.75rem, 11vw, 8rem)`, `0.92` line height, and tightened responsive tracking. The smaller minimum protects 320 px layouts while retaining the original editorial scale.
- Section heading: `clamp(2.25rem, 4vw, 3rem)`.
- Card titles: 20–24 px.
- Body line length targets 60–75 characters.

## Spacing and container

Base rhythm: 4 px. Preferred steps mirror the source: `4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 120, 150 px`.

- Mobile section padding: 64 px.
- Tablet/laptop section padding: 80–120 px.
- Hero top padding: 128 px at 320–639 px, 144 px at `sm`, 160 px at `md`, and 180 px at `xl` to clear the fixed navigation.
- Hero bottom padding: 64 px mobile, 80 px tablet, and 96 px desktop.
- Hero content gap: 32 px mobile, 36 px at `sm`, and 40 px at `lg`.
- Client marquee block padding: 64 px mobile, 80 px tablet, and 96 px desktop.
- Card padding: 24 px mobile, 32–40 px desktop.
- Grid gap: 24 px.
- Container maximum: 1296 px.
- Gutters: 20 px mobile, 24 px tablet, 32 px desktop.

## Radius and shadows

| Token   | Value   | Use                         |
| ------- | ------- | --------------------------- |
| `sm`    | 8 px    | Small controls              |
| `md`    | 16 px   | Cards, inputs, accordions   |
| `lg`    | 24 px   | Feature and CTA surfaces    |
| `pill`  | 9999 px | Navigation, badges, buttons |
| `round` | 50%     | Icons and avatars           |

- Soft shadow: `0 1px 2px rgb(0 0 0 / 0.05), 0 8px 24px rgb(0 0 0 / 0.06)`.
- Floating shadow: `0 10px 30px rgb(27 29 30 / 0.12)`.

## Buttons, cards, and fields

- Buttons are pills with a minimum 48 px target height and 20–24 px horizontal padding.
- Variants: dark, brand, light, and outline.
- Icon buttons use the same `ButtonLink` primitive, with a 32 px contrasting circular icon well; no section duplicates CTA styles.
- The Hero uses the brand variant (`brand` background, white label, white/ink icon well) and links to `/contact` instead of a placeholder URL.
- Focus: 2 px brand ring with 2 px white offset.
- Hover motion is a small translation/rotation and is removed for reduced motion.
- Cards default to 16 px radius; large editorial cards use 24 px.
- Inputs use 16 px radius, 12 px vertical/20 px horizontal padding, persistent labels, and a brand focus ring.
- Errors use associated text and never rely on color alone.

## Breakpoints

| Name  | Width   | Intent                    |
| ----- | ------- | ------------------------- |
| `sm`  | 640 px  | Large phones              |
| `md`  | 768 px  | Tablets                   |
| `lg`  | 1024 px | Laptop grids              |
| `xl`  | 1280 px | Full desktop navigation   |
| `2xl` | 1536 px | Ultra-wide breathing room |

The original header switches around 1200 px. Tailwind’s 1280 px `xl` boundary prevents six links and the CTA from crowding smaller laptops.

## Motion

- Controls: 180–220 ms ease-out.
- Header: 300 ms.
- Drawer: 300 ms; backdrop: 200 ms.
- Hero reveal: 18 px plus opacity over 600 ms using the `[0.22, 1, 0.36, 1]` easing curve; content groups begin at 50, 140, and 230 ms for subtle stagger.
- Shared viewport reveal: 12–20 px plus opacity over 500–700 ms, once.
- Client marquee: 22-second linear loop with two equivalent logo groups for a seamless handoff. Hover, focus, and focus-within pause the animation.
- Reduced motion: Hero reveals immediately; the marquee becomes a centered, wrapping static logo grid and hides its duplicate group.
- Portfolio overlay: 300–400 ms.
- Counter: about 1000 ms after first intersection.
- Marquee: linear 20 s loop, pauseable on hover/focus.
- Reduced motion removes transforms/continuous animation and shows final values.

## Accessibility rules

- Never suppress global focus outlines.
- Minimum target size is 44 × 44 px.
- Drawers trap focus, close on Escape, restore focus, and lock background scrolling.
- Hover-revealed content is also available on focus and touch.
- Anchored sections use `scroll-margin-top`.

## About layout

- Section padding follows the established 64/80/96 px mobile/tablet/desktop rhythm.
- The thesis and principle visual are separated from the statistics by 64 px on mobile and 80 px from `md` upward.
- The thesis is capped at 80 rem and uses the shared section-heading scale.
- Creativity, Innovation, and Strategy remain pill-shaped icon treatments from the source; they wrap naturally at 320 px and use Instrument Serif for continuity with Hero emphasis.
- Statistics stack on mobile and become three equal columns at 768 px. Dividers appear only in the multi-column layout.
- Counter values use `clamp(3.75rem, 12vw, 8rem)`, tabular numerals, and a reserved two-character width to prevent animation-driven layout shift.

## Service cards

- Grid progression: one column below 640 px, two at `sm`, three at `md`, and five at `xl`; 16 px gaps remain constant.
- Cards have a 192 px mobile and 208 px larger minimum height, 24/32 px responsive padding, 16 px radius, and equal-height wrappers.
- Pastel surfaces come directly from the source palette. Darker `*-ink` tokens provide AA-conscious text/icon contrast without changing the visual family.
- Cards use semantic `<article>` elements and are keyboard focusable so focus receives the same presentation available on hover.
- Hover/focus token: 4 px upward translation, soft shadow, 25% semantic border, and 1.05 icon scale over 200 ms ease-out.
- Reduced motion removes card and icon transforms while retaining border, shadow, and focus-outline feedback.
- The action band uses the existing `ink` surface, 16 px radius, responsive 24/32/40 px padding, and shared `light`/`outlineLight` button variants.

## Phase 6 motion tokens

- About thesis begins at 50 ms; principle visual begins at 140 ms.
- Statistics reveal at 80, 160, and 240 ms.
- Services heading begins at 50 ms; cards stagger from 60 ms in 60 ms steps; the action band begins at 120 ms.
- Counters run once for 1000 ms with cubic ease-out after 50% intersection and immediately show final values for reduced-motion users.

## Portfolio layout

- Section padding and heading scale reuse the established 64/80/96 px rhythm and `clamp(2.25rem, 5vw, 3rem)` section heading.
- Projects render as one column through 767 px and two equal columns from 768 px onward.
- Grid gaps are 24 px horizontally and 40 px vertically, matching the source’s generous project separation.
- Project media keeps the source 624:410 aspect ratio at every breakpoint; intrinsic dimensions and responsive `sizes` prevent layout shift.
- Category and technology badges use a white surface, 1 px `border`, 14 px text, 16 px horizontal padding, and pill radius.

## Portfolio interaction tokens

- Card focus uses the global 2 px brand outline with a 4 px offset around the complete link target.
- Hover and focus-visible states are equivalent: brand title color, 65% ink overlay, visible CTA control, and 1.035 image scale.
- Image zoom uses 500 ms ease-out; overlay and CTA transitions use 300 ms; title color uses 200 ms.
- The CTA control is 48 × 48 px with a white resting surface and brand hover/focus surface.
- Reduced motion removes image and CTA translation/scale while preserving overlay, color, and focus feedback.
- Cards reveal once at 80, 160, 240, and 320 ms through the shared `Reveal` boundary.

## Portfolio image strategy

- All four source JPGs remain 624 × 410 and are served through `next/image` from `public/images/work`.
- Portfolio media is below the fold, receives no `priority` hint, and uses native Next.js lazy loading.
- Each project supplies a lightweight color-matched SVG `blurDataURL` through the data contract.
- Alternative text describes the actual visual rather than repeating the project title.

## Testimonials

- The source editorial mosaic is one column on mobile, two columns at `md`, and a 12-column composition at `lg`; wide cards span eight columns and narrow cards span four.
- Cards reserve a 320 px mobile and 384 px laptop minimum height, use 16 px radius, and apply 24/32/40 px responsive padding.
- Source tones remain photo, yellow, ink, and light-surface. Copy stays high contrast and unavailable author/rating fields remain absent rather than being fabricated.
- Testimonial copy uses 24–40 px responsive type; the original `91%` statistic uses a fluid 64–96 px display scale.
- Hover elevation is 4 px with the shared soft shadow over 200 ms. Image zoom is limited to 1.025 over 500 ms and is disabled for reduced motion.
- Testimonial reveals stagger at 80, 160, 240, and 320 ms through the shared `Reveal` boundary.

## Pricing

- Plans stack through laptop widths and become two columns at `xl`; each card changes to a two-column content/features composition from `md` upward.
- Cards use 16 px radius, 24/32/40 px responsive padding, the source yellow Starter surface, and brand Pro surface.
- Prices use a 48–72 px responsive scale with tabular numerals. Currency and duration remain separately announced for clear screen-reader output.
- Feature rows use Lucide checks, 16 px gaps, and 16 px copy. CTAs reuse the existing `light` button variant with a minimum 48 px target.
- Card elevation is 4 px over 200 ms with reduced-motion transforms removed. Plan reveals begin at 80 and 160 ms.

## Reusable CTA

- CTA spacing follows 64 px mobile, 80 px tablet, and 96 px desktop section rhythm. Content is centered and capped for readable line length.
- Supported background tokens are `gradient`, `surface`, and `none`; the homepage uses the established cyan/white/cream gradient wash.
- Titles use the shared section-heading scale and buttons wrap or stack without fixed widths at 320 px.
- Button variants are selected through the typed CTA data contract and map to the shared `ButtonLink` primitive.
- CTA content reveals once after 50 ms; reduced-motion users receive the complete server-rendered state immediately.

## Blog module

- Article cards use a mobile-first one/two/three-column progression at the base, `md`, and `xl` breakpoints.
- Media reserves a 3:2 aspect ratio, uses intrinsic `next/image` dimensions, responsive `sizes`, lazy loading, and an optional typed blur placeholder.
- Metadata uses 14 px text with category emphasis; card titles use 24 px type and summaries use the body scale.
- Hover and focus-visible states share the 1.035 image zoom, brand title/control color, and a complete-card focus outline. Reduced motion removes the zoom.
- The source has no Blog content. The current empty adapter deliberately suppresses the section; these tokens become active when CMS/MDX records are supplied.

## Contact

- The Contact page uses the existing gradient wash, with 144/176/192 px responsive top spacing to clear the fixed header and 64/80/96 px bottom spacing.
- The page title uses `clamp(2.75rem, 7vw, 5rem)` and the established Instrument Serif emphasis.
- Content stacks on mobile and becomes a flexible form/contact-details split at `lg`; neither column has a fixed horizontal width.
- Form controls have a 48 px minimum height, 16 px radius, persistent labels, 20 px horizontal padding, and a brand focus ring. Error/status rows reserve space to avoid validation-driven layout shift.
- Fields form one column below 640 px and two above it; textarea and action rows span both columns.
- Contact entrances use the shared `Reveal` boundary at 50, 120, and 200 ms. Native form interaction remains immediate under reduced motion.

## Footer

- Footer uses the `surface` background, 64/80/96 px responsive top spacing, and the shared container gutters.
- Content stacks on mobile, navigation groups become two columns at `sm`, and the complete footer uses a 12-column grid at `lg`.
- Footer headings use 16 px medium text; navigation, contact, and supporting copy use body tokens with brand hover/focus color.
- Social controls are 44 × 44 px circles with border/color feedback and a 2 px global focus outline.
- The original template has no newsletter, so no newsletter component or empty interaction is included.

## Token ownership after production hardening

- Visual output is unchanged by Phase 10.1.
- Tailwind theme colors, shadows, fonts, and global behavior remain in `app/globals.css`; they are not duplicated as unused TypeScript constants.
- Canonical internal destinations live in `constants/routes.ts`.
- The repeated premium motion curve and shared reveal/drawer durations live in `constants/motion.ts` with their existing numeric values.
- Site identity, metadata, navigation, social, and contact configuration live under `config/` and do not define visual styles.
- Section-specific spacing, timing, and responsive classes remain colocated with the component when they are not reused.
