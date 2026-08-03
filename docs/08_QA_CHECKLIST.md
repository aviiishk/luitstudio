# QA Checklist

Last updated: 2026-07-22

## Desktop

- [x] Source-level audit at 1280 px and 1536 px breakpoints.
- [x] About statistics form three equal columns with dividers.
- [x] Services form five equal-height columns at `xl`.
- [x] CTA switches to heading/actions columns without fixed-width overflow.
- [x] Portfolio renders two equal columns with stable 624:410 media ratios.
- [x] Testimonials use the source 8/4-column editorial mosaic at `lg` and above.
- [x] Pricing plans become two columns at `xl` with stable internal feature columns.
- [x] CTA content stays centered within its readable max width at 1280 px and 1536 px.
- [x] Contact uses a fluid form/details split without fixed column widths at 1280 px and 1536 px.
- [x] Footer uses a balanced 4/5/3 composition within the shared container.
- [ ] Live browser screenshot comparison at 1280 px and 1536 px — browser unavailable.

## Tablet

- [x] Source-level audit at 768 px and 1024 px breakpoints.
- [x] About statistics use three columns from 768 px.
- [x] Service grid uses three columns with wrapped remaining cards.
- [x] CTA remains stacked until `lg`, then separates content and actions.
- [x] Portfolio switches to two columns at 768 px and retains 24/40 px grid rhythm.
- [x] Testimonials use a balanced two-column layout from 768 px.
- [x] Pricing remains stacked while each card adopts its two-column internal layout.
- [x] CTA buttons wrap without fixed-width assumptions.
- [x] Contact remains stacked through tablet widths; form controls form two columns from 640 px.
- [x] Footer navigation groups form two columns while brand/contact blocks remain readable.
- [ ] Live browser screenshot comparison at 768 px and 1024 px — browser unavailable.

## Mobile

- [x] Source-level audit at 320 px and 375 px.
- [x] Principle pills wrap and remain within responsive container gutters.
- [x] Statistics stack without desktop dividers.
- [x] Services use a single column below 640 px.
- [x] CTA buttons stretch vertically and do not depend on fixed widths.
- [x] No Phase 6 negative margins or fixed horizontal dimensions can create page overflow.
- [x] Portfolio remains a single column with container-relative `sizes` at 320 px and 375 px.
- [x] Testimonials, pricing cards, feature lists, and CTA buttons stack at 320 px and 375 px.
- [x] Fluid testimonial and pricing type scales have mobile-safe minimums.
- [x] Phase 8 introduces no negative margins or fixed horizontal card widths.
- [x] Contact fields, status rows, social controls, and Footer groups stack without overflow at 320 px and 375 px.
- [x] Long email content can wrap without widening its container.
- [ ] Live browser screenshot comparison at 320 px and 375 px — browser unavailable.

## Accessibility

- [x] About and Services are labeled semantic `<section>` landmarks.
- [x] Both sections use H2 headings beneath the page H1; service/CTA titles use H3.
- [x] Decorative Lucide icons use `aria-hidden`.
- [x] Statistic cards expose stable descriptive accessible labels instead of announcing every animation frame.
- [x] Pastel surfaces use darker semantic ink colors for stronger contrast.
- [x] Existing global visible focus outline remains intact.
- [x] Every project is a semantic `<article>` containing one clearly labeled link.
- [x] Project images use meaningful visual descriptions.
- [x] External CTAs announce that they open in a new tab.
- [x] Testimonials use semantic `<article>`, `<blockquote>`, `<cite>`, and `<footer>` elements.
- [x] Testimonial facts and unavailable identities are represented without misleading ARIA or fabricated content.
- [x] Pricing feature lists use semantic list markup and decorative checks are hidden from assistive technology.
- [x] Testimonials, Pricing, and CTA use H2 headings beneath the single page H1.
- [x] Contact has one H1, persistent labels, associated controls, native required constraints, and error/status announcement regions.
- [x] Address, email, and phone use semantic `<address>`, `mailto:`, and normalized `tel:` markup.
- [x] External social links include destination labels, safe new-tab attributes, and visible focus states.
- [x] Footer uses semantic `<footer>`, `<nav>`, lists, headings, and contact markup.

## Reduced motion

- [x] `Reveal` removes translation and duration when reduced motion is requested.
- [x] Counters retain server-rendered final values and skip animation.
- [x] Service-card/icon transforms are disabled while non-motion state feedback remains.
- [x] Portfolio image zoom and CTA translation are disabled while overlay/color feedback remains.
- [x] Testimonial image/card and pricing-card transforms are disabled while visual state feedback remains.
- [x] All Phase 8 entrances reuse `Reveal` and immediately expose final content under reduced motion.
- [x] Contact entrances reuse `Reveal`; form, social, and navigation transitions collapse under the global reduced-motion rule.
- [x] Blog card transforms are motion-safe when authentic records are introduced.

## Keyboard navigation

- [x] Service cards can receive keyboard focus and mirror hover elevation/border/icon states.
- [x] Services CTA links are reachable in DOM order and use shared focus rings.
- [x] About content adds no unnecessary tab stops.
- [x] Portfolio focus order follows the visual data order with one tab stop per card.
- [x] Portfolio focus-visible state exposes the same title, overlay, and CTA treatment as hover.
- [x] Pricing and CTA links use the shared visible focus ring and follow source/data order.
- [x] Non-interactive testimonial cards add no unnecessary tab stops or hover-only information.
- [x] Contact focus order follows fields, submit control, contact links, then social links.
- [x] Footer focus order follows brand, social links, navigation groups, email, and phone.
- [x] Blog cards use one complete-card link with equivalent hover and focus-visible treatments.
- [ ] Manual Tab/Shift+Tab browser pass — browser unavailable.

## Image optimization

- [x] The original About and Services sections contain no raster images; none were invented or unnecessarily downloaded.
- [x] Phase 5 imagery remains served through `next/image` from `public/images`.
- [x] Phase 6 Lucide icons render as tree-shakeable React SVG components.
- [x] Four Portfolio JPGs use `next/image` with 624 × 410 intrinsic dimensions.
- [x] Portfolio `sizes` covers mobile full-width, tablet/desktop halves, and capped container width.
- [x] Below-the-fold project images are lazy-loaded and receive no `priority` hint.
- [x] Color-matched blur placeholders are supplied by typed project data.
- [x] Two testimonial JPGs use `next/image` with intrinsic source dimensions, responsive `sizes`, and blur placeholders.
- [x] Below-the-fold testimonial images retain native lazy loading and receive no `priority` hint.
- [x] Footer logo uses `next/image` with its intrinsic 118 × 32 SVG dimensions.
- [x] Blog image contracts require intrinsic dimensions and responsive `sizes`; no source blog imagery was invented.

## CLS

- [x] Counter output reserves two character widths and uses tabular numerals.
- [x] Service cards have stable minimum heights and equal-height wrappers.
- [x] No Phase 6 media requires late intrinsic-dimension calculation.
- [x] Portfolio aspect-ratio containers and intrinsic image dimensions reserve media space.
- [x] Testimonial image dimensions and the 86:55 story-media aspect ratio reserve space before image decode.
- [x] Pricing cards and CTA use stable server-rendered copy with no client measurement.
- [x] Contact status/error rows reserve vertical space before interaction.
- [x] Footer logo dimensions and static data prevent late layout measurement.

## LCP

- [x] Phase 6 content is below the Hero and introduces no priority images.
- [x] Section copy and card markup render on the server.
- [x] Client JavaScript is limited to reveal boundaries and three counters.
- [x] Portfolio cards, grid, data, and image rendering remain Server Components.
- [x] Portfolio adds no above-the-fold priority request competing with Hero LCP.
- [x] Phase 8 images are below the fold and do not compete with the Hero priority image.
- [x] Testimonials, pricing, and CTA data/UI remain server-rendered outside shared reveal islands.
- [x] Footer and Contact information remain Server Components; only the presentation form hydrates.
- [x] Empty Blog data produces no hidden media request or markup.

## Hover states

- [x] Image zoom, dark overlay, CTA reveal, and brand title color share one card group state.
- [x] `focus-visible` mirrors all meaningful hover-only information.
- [x] Overlay content is supplementary; project title and tags remain permanently visible.
- [x] Testimonial and pricing hover elevation is decorative and does not reveal required content.
- [x] Pricing and CTA links retain independent focus-visible states.
- [x] Contact and Footer links retain visible global focus rings and non-motion color feedback.
- [x] Blog card hover treatment is duplicated on focus-visible before future content activation.

## Lighthouse readiness

- [x] Semantic section/article/link structure supports accessibility auditing.
- [x] Responsive images, lazy loading, blur placeholders, and stable aspect ratios support performance scoring.
- [x] No Portfolio-specific third-party runtime or client component was introduced.
- [x] Phase 8 introduces no new third-party runtime or section-specific client boundary.
- [x] Phase 9 adds no third-party runtime; the only new client boundary prevents an unconfigured form submission.
- [x] `/contact` has route metadata, a canonical URL, and a sitemap entry.
- [ ] Lighthouse measurement requires a browser or deployed URL — browser unavailable.

## Known limitations

- The in-app browser exposes no controllable browser instance, so visual viewport screenshots and manual keyboard traversal remain pending.
- Contact submission is intentionally presentation-only until a secure backend endpoint and server-side validation are approved.
- Blog remains visually absent because the source provides no articles; its typed adapter is ready for authentic CMS/MDX data.
- Footer destinations for 404, Terms, Privacy, and Documentation preserve the source information architecture, but those routes remain outside this phase.
- Performance statements are architectural checks; field Core Web Vitals require a deployed build with real traffic.
