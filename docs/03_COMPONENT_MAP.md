# Component Map

| Component          | Responsibility                                                         | Used on                           |
| ------------------ | ---------------------------------------------------------------------- | --------------------------------- |
| `SiteHeader`       | Fixed responsive header, scrolled state, desktop navigation            | All routes                        |
| `MobileNavigation` | Animated drawer, backdrop, focus and Escape behavior                   | All routes below `xl`             |
| `Container`        | Shared max-width and responsive gutters                                | All sections                      |
| `Button`           | Dark, brand, light, and outline pill CTAs                              | Site-wide                         |
| `IconLink`         | Accessible social/external icon control                                | Team and Footer                   |
| `Card`             | Shared surface, radius, border, and spacing variants                   | Card-based sections               |
| `SectionHeading`   | Heading with optional Instrument Serif emphasis                        | Marketing sections                |
| `Reveal`           | Shared reduced-motion-safe Framer Motion entrance boundary             | Hero and later marketing sections |
| `AnimatedCounter`  | Once-only, reduced-motion-safe intersection counter                    | About                             |
| `ScrollToTop`      | Progressive scroll-to-top control                                      | Long routes                       |
| `Hero`             | Semantic section shell, background, container, and content composition | Home                              |
| `HeroContent`      | Server-composed H1, supporting copy, and stagger groups                | Hero                              |
| `HeroBackground`   | Decorative cyan/white/cream blurred background layers                  | Hero                              |
| `HeroCTA`          | Reusable brand CTA and social-proof composition                        | Hero                              |
| `HeroImage`        | Optimized reviewer portrait stack and accessible star rating           | Hero                              |
| `ClientMarquee`    | Semantic heading and infinite, pauseable logo rail                     | Home                              |
| `ClientLogo`       | Intrinsically sized `next/image` renderer for one client mark          | Client marquee                    |
| `About`            | Semantic About shell, anchor, container, and section composition       | Home `#aboutus`                   |
| `AboutContent`     | Agency thesis and original three-principle composition                 | About                             |
| `AboutImage`       | Icon-led Creativity, Innovation, and Strategy visual                   | About                             |
| `AboutStats`       | Data-driven responsive statistic grid                                  | About                             |
| `AboutExperience`  | Reusable labeled statistic and animated value                          | About                             |
| `Services`         | Semantic Services shell, heading, grid, and action band                | Home `#services`                  |
| `ServiceGrid`      | Responsive, staggered service-card layout                              | Services                          |
| `ServiceCard`      | Reusable typed service icon/title card with hover/focus parity         | Services                          |
| `ServicesCTA`      | Original dark project CTA with light and outline actions               | Services                          |
| `Portfolio`        | Featured-project section shell and data-source adapter                 | Home `#work`                      |
| `PortfolioGrid`    | Responsive two-column project layout and reveal staggering             | Portfolio                         |
| `PortfolioCard`    | CMS-agnostic project article with image, overlay, CTA, title, and tags | Portfolio                         |
| `PortfolioBadge`   | Reusable outlined category/technology label                            | Portfolio cards                   |
| `TeamSection`      | Responsive team grid                                                   | Home `#team`                      |
| `TeamMemberCard`   | Portrait, name, role, socials                                          | Team                              |
| `Testimonials`     | Testimonial section shell and source-data adapter                      | Home                              |
| `TestimonialsGrid` | Responsive editorial mosaic and reveal staggering                      | Testimonials                      |
| `TestimonialCard`  | Typed quote, statistic, author, and optional image presentation        | Testimonials                      |
| `Pricing`          | Pricing section shell and source-data adapter                          | Home `#pricing`                   |
| `PricingCard`      | Reusable plan, price, CTA, and feature composition                     | Pricing                           |
| `PricingFeature`   | Consistent accessible feature-list item                                | Pricing cards                     |
| `FaqSection`       | Heading and accordion data                                             | Home and Contact                  |
| `Accordion`        | Keyboard-accessible disclosure list                                    | FAQ sections                      |
| `AwardsSection`    | Awards grid                                                            | Home `#awards`                    |
| `AwardCard`        | Platform, achievement, year                                            | Awards                            |
| `CTA`              | Reusable typed conversion section with configurable background/buttons | Home and future routes            |
| `Blog`             | CMS-ready article-section adapter; renders only when data exists       | Home data boundary                |
| `BlogGrid`         | Responsive article layout and reveal staggering                        | Blog                              |
| `BlogCard`         | Typed article image, metadata, summary, and accessible link            | Blog grid                         |
| `BlogMeta`         | Category, machine-readable date, and author metadata                   | Blog cards                        |
| `Contact`          | Contact-page composition and original gradient treatment               | `/contact`                        |
| `ContactForm`      | Typed, validation-ready presentation form and submission status        | Contact                           |
| `ContactInfo`      | Address, email, phone, and social contact panel                        | Contact                           |
| `SocialLinks`      | Typed accessible Lucide-powered external social list                   | Contact and Footer                |
| `Footer`           | Shared data adapter and responsive footer composition                  | All routes                        |
| `FooterNavigation` | Typed navigation-group renderer                                        | Footer                            |
| `FooterSocial`     | Footer adapter for shared social links                                 | Footer                            |
| `FooterCopyright`  | Copyright boundary                                                     | Footer                            |
| `LegalDocument`    | Readable legal-content surface                                         | Privacy and Terms                 |
| `NotFoundContent`  | 404 artwork and return CTA                                             | Not found                         |

## Shared navigation data

Navigation URLs are root-prefixed so the same header works on supporting routes:

- About Us → `/#aboutus`
- Services → `/#services`
- Work → `/#work`
- Team → `/#team`
- Pricing → `/#pricing`
- Awards → `/#awards`
- Contact → `/contact`

Active-section highlighting runs on the homepage and degrades to normal links elsewhere.
