# mcheyser-site — Progress

## Current Status
**Phase:** Copy rewrite complete — ready for review and deploy

### What's Done
- Full copy rewrite across all 4 content files:
  - `pages/HomePage.tsx` — All 9 sections rewritten (Hero, Problem, What I Do, Transformation, Method, Who This Is For, About, Testimonials, Final CTA)
  - `pages/ApplyPage.tsx` — New hero, expectation cards, simplified form (7 fields vs old 10+), updated confirmation screen, updated trust section
  - `components/Header.tsx` — Mobile menu tagline updated, CTA text updated
  - `components/Footer.tsx` — CTA section, description, nav links, email address, tagline all updated
- Positioning pivot: Community facilitation → Operational strategy + technical execution
- CTA language: "Apply for a Consultation" (per user request to keep "apply" language)
- Build verified: `vite build` succeeds, dev server starts clean

### What's Next
- Review the site visually and confirm copy reads well
- Replace placeholder testimonial names ("Name TBD") with real testimonials
- Consider updating images (e.g., `overwhelmed.png` alt text updated but image itself may need replacement for new positioning)
- Deploy

## Design Decisions
- **Kept "Apply" language**: User requested CTAs say "Apply for a Consultation" instead of "Book a Strategy Call" from the copy doc
- **Simplified Apply form**: Removed radio button groups (involvement level, budget), reduced to 7 clean fields
- **Footer email**: Changed from `hello@mcheyser.com` to `patrick@mcheyser.com` to match the copy doc's confirmation screen
- **Footer tagline**: Changed from "Facilitating human connection since 2014" to "Building things that work since 2014"
- **Preserved all infrastructure**: Scroll animations, EmailJS integration, hash routing, IntersectionObserver — all untouched

## Session Context
- Branch: `main`
- Key files: `pages/HomePage.tsx`, `pages/ApplyPage.tsx`, `components/Header.tsx`, `components/Footer.tsx`
- EmailJS env vars: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

## Blockers/Questions
- Testimonials use "Name TBD" — need real names/quotes when available
- Images may need updating to match new operations/tech positioning
- EmailJS template may need field name updates if the template references old field names (e.g., `community` → `challenge`, new fields `company`, `company_type`, `referral`)
