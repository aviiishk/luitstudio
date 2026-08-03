# 11. Performance Report

## Scope

This report covers Phase 10.2 performance engineering for the production Next.js application. The UI, component architecture, spacing, colors, typography, and animation behavior were treated as frozen.

The audit used the optimized Next.js production build, generated manifests, emitted assets, source boundaries, image metadata, dependency tree, and response headers from a temporary local production server. No Lighthouse score is claimed because Lighthouse work is outside this phase.

## Executive summary

- All application routes are statically prerendered. No route requires request-time dynamic rendering.
- The largest route is `/` at **151 kB First Load JS**. `/contact` is **144 kB**.
- Shared First Load JS is **102 kB**, primarily the React and Next.js runtime.
- Route-specific application code is small. Framer Motion is the largest optional client-side feature cost.
- 61 of 68 audited application/component/hook/library source files remain server-rendered or shared. Hydration is limited to five interactive components and their two reusable hooks.
- All rendered images use `next/image`, intrinsic dimensions, and responsive `sizes`. Only the first above-the-fold reviewer image is prioritized.
- Hashed JavaScript, CSS, and fonts receive one-year immutable caching. Static HTML receives a one-year shared-cache lifetime from the production server.
- The image optimizer negotiates WebP correctly. Its current optimized-image response lifetime is 60 seconds; direct files in `public/` use `max-age=0`.
- The build has no dynamic routes, no asynchronous data waterfalls, and no useful Suspense or streaming boundary to add today.

## Production build baseline

Build environment: Next.js 15.5.20, React 19.1.1, Node.js 20.19.5.

| Route          | Route JS | First Load JS | Rendering |
| -------------- | -------: | ------------: | --------- |
| `/`            |  6.05 kB |        151 kB | Static    |
| `/contact`     |  1.93 kB |        144 kB | Static    |
| `/_not-found`  |    995 B |        103 kB | Static    |
| `/robots.txt`  |    127 B |        103 kB | Static    |
| `/sitemap.xml` |    127 B |        103 kB | Static    |
| `/icon.svg`    |      0 B |           0 B | Static    |

Shared First Load JS is **102 kB**:

- Next.js/runtime chunk: 46.2 kB
- React/runtime chunk: 54.2 kB
- Other shared chunks: 1.99 kB

All eight generated outputs completed as static content. The optimized build compiled in 2.6 seconds during the measured baseline.

### Largest emitted client bundles

The following are raw, minified file sizes on disk. The First Load JS figures above are the more useful transfer estimates reported by Next.js.

| Bundle                                 |  Raw size | Audit attribution                             |
| -------------------------------------- | --------: | --------------------------------------------- |
| `255-3981a3d1f3561bd8.js`              | 169.32 kB | Next.js client/runtime and navigation support |
| `4bd1b696-c023c6e3521b1417.js`         | 168.96 kB | React DOM/runtime                             |
| `918-7a6fa3c60e5ebd7a.js`              | 119.38 kB | Framer Motion runtime                         |
| `356-1143d17a0ca27254.js`              |  13.24 kB | Home route interactive code                   |
| `app/layout-928aaa8cff011987.js`       |  12.16 kB | Shared layout/header client code              |
| `562-d4f75d8fa7b4fcd4.js`              |   9.60 kB | Navigation and Lucide icon code               |
| `619-ba102abea3e3d0e4.js`              |   8.34 kB | Shared client support code                    |
| `app/contact/page-add24c3c57ff4e81.js` |   4.16 kB | Contact form client code                      |

The raw Framer Motion chunk is shared by routes that use motion, but its transferred contribution is smaller than its raw file size because production servers compress JavaScript.

### Generated document size

| Output        |  Raw HTML | RSC payload |
| ------------- | --------: | ----------: |
| `/`           | 165.68 kB |    73.94 kB |
| `/contact`    |  48.27 kB |    22.29 kB |
| `/_not-found` |  29.43 kB |    13.84 kB |

The home document is largest because the complete landing page is server-rendered into the first response. This improves immediate content availability and SEO, but future CMS growth should be watched so the HTML and RSC payloads do not expand without limit.

## Rendering and hydration audit

### Server Components

Pages, section composition, cards, grids, data mapping, footer content, metadata, and image markup remain Server Components by default. There are no request APIs such as `cookies()`, `headers()`, `draftMode()`, `noStore()`, or `force-dynamic` in the production application.

### Client Components

The client boundaries are justified by browser-only behavior:

| Boundary           | Reason it must remain client-side                                                        |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `SiteHeader`       | Current pathname, active-section observation, scroll state, menu state, and entry motion |
| `MobileNavigation` | Focus trap, Escape handling, body scroll lock, drawer state, and motion                  |
| `Reveal`           | Viewport-triggered Framer Motion animation and reduced-motion detection                  |
| `AnimatedCounter`  | Intersection Observer and requestAnimationFrame counter behavior                         |
| `ContactForm`      | Presentation-only submission state and live status feedback                              |
| `useActiveSection` | Intersection Observer hook used by the header                                            |
| `useScrolled`      | Browser scroll-state hook used by the header                                             |

No unnecessary Client Component was found that could be converted to a Server Component without removing approved behavior. Data and noninteractive card markup do not create independent hydration roots.

### Static and dynamic rendering

- `/`, `/contact`, not-found, icon, robots, and sitemap outputs are statically generated.
- There are no dynamic pages in the build.
- Metadata is statically composed from typed configuration; it adds no client JavaScript or request-time work.
- The contact form has no backend action and does not force dynamic rendering.

### Suspense and streaming

There is no asynchronous route data, slow server component, or independent request waterfall. Adding Suspense boundaries now would add complexity without allowing meaningful streaming. Reassess when a CMS, API, or server action introduces asynchronous work.

### Dynamic imports

No dynamic import was added in this phase. The two credible candidates are the closed mobile drawer and Framer Motion feature loading. Both require interaction and animation regression testing:

- Deferring the drawer can remove its icons and focus-management code from the initial execution path, but may delay the first menu open unless it is prefetched on intent.
- Framer Motion `LazyMotion` can reduce eager motion code, but it affects every approved motion boundary and should be measured as a dedicated change rather than introduced during a frozen-UI audit.

## Image audit

### Inventory

The production image directory contains 15 source assets:

- Five SVG client marks with intrinsic `viewBox` dimensions.
- Ten JPEG photographs with known intrinsic dimensions.
- Largest source asset: `work-img-4.jpg`, 624 × 410, 238,074 bytes.
- Hero reviewer portraits: 500 × 500 sources rendered at 44 × 44, providing ample density without upscaling.

### Implementation findings

- Every rendered image uses `next/image`.
- Every image receives explicit intrinsic `width` and `height` values, preventing layout shift.
- Every image supplies a `sizes` value appropriate to its layout.
- Portfolio and testimonial images reserve stable aspect ratios and include blur placeholders.
- Below-the-fold images use Next.js lazy loading by default.
- Next.js uses asynchronous image decoding by default; duplicate `decoding` attributes are unnecessary.
- Only the first 44 px hero reviewer portrait uses `priority`, so the page creates one image preload rather than preloading all four portraits.
- SVG marquee assets preserve their intrinsic aspect ratios with `object-contain`.

### Format and transfer verification

For a 640 px request of `work-img-1.jpg`:

| Request                        | Response format | Response size | Cache policy                          |
| ------------------------------ | --------------- | ------------: | ------------------------------------- |
| Direct public asset            | JPEG            | 121,047 bytes | `public, max-age=0`                   |
| Next image optimizer           | WebP            |  13,422 bytes | `public, max-age=60, must-revalidate` |
| Optimizer without WebP support | JPEG            |  17,070 bytes | `public, max-age=60, must-revalidate` |

The default configuration serves WebP even when AVIF is accepted; AVIF is not currently enabled. WebP already produces a substantial reduction for the measured image. Enabling AVIF should only follow real-device encoding/transfer measurements because it can trade smaller files for slower first-time encoding.

### Image caching recommendation

The current 60-second optimized-image cache lifetime is conservative for version-controlled local assets. A longer `images.minimumCacheTTL` can reduce revalidation and optimizer work after the deployment/CDN strategy is defined. Direct `public/` filenames are not content-hashed, so they should not receive long-lived immutable headers unless filenames are versioned or hashed first.

## Font audit

Fonts are self-hosted by `next/font/google`; there are no runtime Google Fonts requests.

| Font             | Configuration                                    | Latin output |
| ---------------- | ------------------------------------------------ | -----------: |
| Inter Tight      | Variable 100–900, normal, Latin, `display: swap` |     43.86 kB |
| Instrument Serif | 400 normal, Latin, `display: swap`               |     14.69 kB |
| Instrument Serif | 400 italic, Latin, `display: swap`               |     15.32 kB |

- The requested `latin` subset is configured for both families.
- Inter Tight uses one variable file instead of separate files for each weight used by the UI.
- Instrument Serif loads only the normal and italic styles used by the design.
- Fallback metric overrides are emitted, reducing font-swap layout shift.
- Hashed WOFF2 files receive `public, max-age=31536000, immutable`.
- The generated static HTML did not expose a font preload link during this audit. Before adding manual preload tags, verify the deployed browser waterfall; manual hints can duplicate Next.js font behavior and compete with the hero image for bandwidth.

## Caching and metadata

Production response verification showed:

| Resource                | Cache policy                          |
| ----------------------- | ------------------------------------- |
| Static route HTML       | `s-maxage=31536000`                   |
| Hashed JavaScript       | `public, max-age=31536000, immutable` |
| Hashed CSS              | `public, max-age=31536000, immutable` |
| Hashed WOFF2 fonts      | `public, max-age=31536000, immutable` |
| Optimized images        | `public, max-age=60, must-revalidate` |
| Direct `public/` images | `public, max-age=0`                   |

Metadata, Open Graph fields, Twitter fields, viewport data, robots, sitemap, and favicon output are generated on the server and add no hydration cost. `poweredByHeader` is disabled.

## Dependency and unused-JavaScript audit

The declared runtime dependency set is intentionally small: Next.js, React, React DOM, Framer Motion, and Lucide React.

- All five declared runtime packages are referenced by production code or the framework runtime.
- Lucide imports are named imports, allowing unused icons to be tree-shaken.
- No Bootstrap, jQuery, AOS, Owl Carousel, or archived-template package is in the production dependency graph.
- No duplicate direct runtime package was found.
- `npm ls --depth=0` reports five extraneous WASM helper artifacts in the local installation (`@emnapi/core`, `@emnapi/runtime`, `@emnapi/wasi-threads`, `@napi-rs/wasm-runtime`, and `@tybys/wasm-util`). They are not declared, imported, or part of application client bundles. A clean deployment should use `npm ci` rather than committing or copying the local `node_modules` tree.
- Framer Motion is the largest discretionary client dependency. It remains justified by the approved reveal, header, and drawer animation system.

## Prioritized optimization opportunities

### Measure next

1. Run a browser coverage and performance trace on a representative mobile device to quantify Framer Motion parse/evaluation cost and confirm the actual font waterfall.
2. Test intent-prefetched dynamic loading for `MobileNavigation`, comparing First Load JS and first-open latency before adopting it.
3. Prototype Framer Motion `LazyMotion` on a separate branch and regression-test every reveal, reduced-motion path, header entrance, and drawer exit.

### Consider when deployment caching is defined

1. Increase `images.minimumCacheTTL` for version-controlled local images.
2. Enable AVIF only if production measurements show a net improvement after encoding latency and CDN cache-hit rates.
3. Use versioned filenames before applying immutable caching to direct `public/` assets.

### Reassess when a CMS is introduced

1. Add Suspense boundaries around genuinely independent asynchronous sections.
2. Stream slow CMS-backed sections while retaining the hero and navigation in the initial response.
3. Add route-level caching/revalidation policies based on each content type's freshness requirement.
4. Monitor home HTML/RSC growth as portfolio, testimonials, and blog datasets expand.

## Changes made in Phase 10.2

- Added this measured performance report.
- Made no UI, layout, animation, architecture, rendering, dependency, or application-source changes.
- Kept all current client boundaries because each is required by approved interactive behavior.
- Left speculative dynamic imports and cache changes unimplemented until they can be measured against real user experience and deployment behavior.

## Validation result

- TypeScript: passed with zero errors.
- ESLint: passed with zero warnings.
- Prettier: passed after formatting this report.
- Production build: passed; all eight generated outputs are static.
- Final route metrics match the measured baseline: `/` remains 151 kB First Load JS, `/contact` remains 144 kB, and shared First Load JS remains 102 kB.
