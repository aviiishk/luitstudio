# 12. Accessibility Report

## Scope and method

This audit covers the production App Router pages, shared layout, navigation, all migrated sections, forms, generated HTML, global CSS, motion behavior, and reusable controls.

The audit combined source inspection, WCAG contrast calculations, production-build markup inspection, and keyboard-flow review. The in-app browser was unavailable, so results that require a rendered browser, screen reader, zoom, or physical touch device are explicitly listed as manual QA rather than marked as passed.

Target: WCAG 2.2 Level AA.

## Current status

The semantic foundation is strong, but the site should not be represented as WCAG 2.2 AA conformant yet. Color contrast, noninteractive focus stops, no-JavaScript visibility, and several interaction details require remediation or manual verification.

## Verified strengths

- Each route has one `main` landmark and one visible `h1`.
- The root layout declares `<html lang="en">`.
- The global header, navigation regions, sections, articles, asides, addresses, blockquotes, and footer use semantic elements.
- Home headings follow an understandable `h1` → `h2` → `h3` structure. Pricing feature headings use `h4` beneath plan `h3` headings.
- The contact page uses one `h1`, followed by `h2` contact and footer groups.
- A skip link targets `#main-content` and becomes visible on focus.
- Global `:focus-visible` styling is present and has strong contrast against the current light backgrounds.
- Main buttons are at least 48 CSS pixels high; drawer rows are 52 pixels; social controls are 44 pixels.
- Icon-only controls have accessible names. Decorative Lucide icons use `aria-hidden="true"`.
- Current navigation state uses `aria-current`.
- The mobile drawer declares a modal dialog, moves focus to its close button, traps Tab navigation, closes on Escape or backdrop click, restores body scrolling, and returns focus to the trigger.
- External-link accessible names disclose that a new tab opens.
- Contact controls have programmatic labels, stable IDs/names, appropriate input types, required state, and name/email autocomplete hints.
- The form has reserved error containers and a polite status live region.
- Meaningful portfolio and testimonial images have descriptive alt text. Decorative reviewer and marquee images are hidden from assistive technology.
- All image dimensions are explicit, reducing layout shift during zoom and image loading.
- Framer Motion components, the animated counter, hover transforms, smooth scrolling, and the marquee account for `prefers-reduced-motion`.
- The marquee can be paused with keyboard focus as well as pointer hover.

## Findings

| ID      | Severity | Finding                                                                          | Evidence and impact                                                                                                                                                                                                                                    | Recommendation                                                                                                                                                                  |
| ------- | -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A11Y-01 | High     | Normal body text does not consistently meet 4.5:1 contrast.                      | `#767778` measures **4.49:1 on white** and **4.08:1 on `#f4f4f4`**. It is used for paragraph text, inactive navigation, statistics labels, blog metadata, the marquee heading, and footer content. WCAG thresholds are not rounded up.                 | Darken the body token enough to pass on every approved background, then retest all alpha variants. This is an accessibility-required visual correction.                         |
| A11Y-02 | High     | Muted drawer text is below AA contrast for small text.                           | `#0B1220` at 55% over `#FEFAF6` renders near `#787A80`, approximately **4.13:1**. The 11 px uppercase labels and 14 px footer copy need 4.5:1.                                                                                                         | Increase opacity or use a darker existing token while preserving the visual hierarchy.                                                                                          |
| A11Y-03 | Medium   | Service cards create noninteractive keyboard stops.                              | Each `article` has `tabIndex={0}` only to reproduce hover styling. It has no action, expanded content, or keyboard command. This adds five stops without functionality.                                                                                | Remove the tab stop, or make the card a real link/button if a real destination is introduced. Do not use focusability solely as a visual trigger.                               |
| A11Y-04 | Medium   | Hash navigation does not move focus to section headings.                         | Links scroll to sections, but the destination is not programmatically focused. Drawer cleanup also returns focus to the menu trigger after a navigation click. Screen-reader users may remain logically in the header after the page visually scrolls. | Define an intentional focus strategy for in-page navigation and distinguish navigation-close behavior from dismiss-close behavior. Verify with NVDA, VoiceOver, and TalkBack.   |
| A11Y-05 | Medium   | The star-rating label is attached to a generic `div`.                            | `aria-label="4 out of 5 stars"` on a generic element is not exposed consistently across browser/accessibility API combinations.                                                                                                                        | Use a semantic text alternative or an explicit image/group role, then verify the announcement.                                                                                  |
| A11Y-06 | Low      | Client identities are completely hidden from screen readers.                     | Both marquee lists use `aria-hidden="true"`, and every logo has empty alt text. Users hear the section heading but not which clients are represented.                                                                                                  | Decide whether client names are meaningful content. If so, expose one static list to assistive technology while keeping the duplicate animation copy hidden.                    |
| A11Y-07 | Medium   | Custom error semantics are only scaffolding.                                     | Empty live error paragraphs exist, but there is no validation state, `aria-invalid`, or error summary. Native required/email validation works, but future custom/backend errors are not yet wired.                                                     | When submission is implemented, populate field errors, toggle `aria-invalid`, link only active error/help text, and provide a focusable error summary for multi-field failures. |
| A11Y-08 | Medium   | The skip target requires browser verification.                                   | The skip link is correctly visible on focus, but `main` is not explicitly focusable. Browser handling of focus after hash navigation, especially Safari/VoiceOver, must be confirmed.                                                                  | Manually verify that activation moves both viewport and assistive-technology focus. Add `tabIndex={-1}` only if testing shows it is needed.                                     |
| A11Y-09 | Medium   | Placeholder contrast is likely insufficient.                                     | `placeholder:text-body/70` is lighter than the already borderline body token. Placeholder instructions are still user-facing text.                                                                                                                     | Measure the computed placeholder color and raise contrast to at least 4.5:1 without using placeholders as a substitute for labels.                                              |
| A11Y-10 | Manual   | Text and controls over testimonial photography require rendered contrast checks. | A fixed black overlay is present, but image luminance varies. Static token calculations cannot prove contrast over every crop and breakpoint.                                                                                                          | Test each photo card at all responsive crops with a contrast sampling tool. Increase overlay opacity only where required.                                                       |

## Semantic and heading audit

### Home

- One `h1`: “Building bold brands with thoughtful design.”
- Major content areas use `h2` headings.
- Service, portfolio, testimonial, and pricing card titles use subordinate headings.
- Footer group headings remain subordinate to page content.

### Contact

- One `h1`: “Love to hear from you, Get in touch.”
- Contact details and footer groups use `h2` headings.

No heading-level jump was identified that prevents understanding. The `header` inside the hero is a content header, not an extra page banner landmark.

## Keyboard and focus audit

Source behavior verifies:

- Visible global focus rings.
- Named menu trigger and close controls.
- Modal Tab/Shift+Tab cycling.
- Escape dismissal.
- Focus restoration after drawer dismissal.
- Keyboard-pausable marquee.
- Native anchors and buttons for actionable elements.

Manual verification remains necessary for:

- Exact sequential focus order at 320, 375, 768, 1024, 1280, and 1536 px.
- Focus visibility when fixed header content overlaps hash destinations.
- Safari Full Keyboard Access.
- Drawer focus containment with VoiceOver and TalkBack.
- Focus restoration after route and hash navigation.
- 200% and 400% zoom with no obscured focused control.

## Form and live-region audit

- Visible labels are correctly connected with `htmlFor`/`id`.
- Native types and required constraints are present.
- Name and email fields provide autocomplete values.
- The submit control is a semantic button with an accessible name.
- Submission status uses `role="status"` and `aria-live="polite"`.
- Empty error containers reserve layout space and are labeled by ID.

Limitations:

- No backend validation or submission exists by design.
- The form does not yet expose invalid state or real error messages.
- Browser-native validation wording and focus behavior require cross-browser testing.

## Motion audit

- Shared reveal, header, drawer, and counter logic uses reduced-motion detection.
- Global reduced-motion CSS disables smooth scrolling and reduces animation/transition duration.
- The marquee becomes a wrapped static list and removes its mask under reduced motion.
- Hover transforms include `motion-reduce:transform-none` where used.

Manual QA must confirm no brief entrance animation occurs before the reduced-motion preference is applied during hydration.

## Screen-reader manual QA checklist

- [ ] NVDA + current Chrome: landmarks, headings, drawer dialog, external-link names, form errors.
- [ ] NVDA + current Firefox: hash navigation, marquee region, rating announcement.
- [ ] VoiceOver + Safari on macOS: skip link, modal containment, focus restoration.
- [ ] VoiceOver + Safari on iOS: drawer reading order, rotor landmarks/headings, form keyboard.
- [ ] TalkBack + Chrome on Android: drawer traversal, touch exploration, live status.
- [ ] Confirm client logo treatment matches the intended content meaning.
- [ ] Confirm photo-card text contrast at every crop.
- [ ] Confirm 200% and 400% zoom/reflow without loss of content or focus.

## Accessibility release recommendation

Resolve A11Y-01 and A11Y-02 before claiming Level AA. Resolve or consciously redesign A11Y-03 and A11Y-04 before production sign-off. Complete the manual assistive-technology matrix before publishing a conformance statement.
