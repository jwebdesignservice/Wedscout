# WedScout — Full Redesign Brief

## Goals
Modern, editorial, visually distinct. Every section should feel intentional — clean layout, strong typography hierarchy, purposeful colour use, smooth animation. Readable at a glance, beautiful on scroll.

---

## Colour System — How to Use It Correctly

| Token | Hex | Use For |
|---|---|---|
| `cream` | `#FFF4E2` | Primary backgrounds (Hero, Vendors, Footer-adjacent) |
| `cream-dark` | `#F7E9D4` | Secondary/alternating light backgrounds (Categories) |
| `charcoal` | `#1A1A1A` | Headings, body text, dark section backgrounds |
| `green-brand` | `#2B895A` | CTAs, accents, badges, inverted section backgrounds |
| `green-dark` | `#1F6944` | Hover states on green elements only |
| `white` | `#FFFFFF` | Text/cards on dark/green backgrounds |

### Rhythm Rule
Never stack two sections with the same background. The flow must be:
```
cream → cream-dark → [dark: #1A1A1A] → [green: #2B895A] → cream → dark footer
```
This creates visual breathing room and makes each section feel distinct.

### Text on Each Background
- On `cream` / `cream-dark` → use `text-charcoal` (full) and `text-charcoal/70` (secondary). Never go below `/60`.
- On `#1A1A1A` → use `text-white` (full) and `text-white/70` (secondary).
- On `#2B895A` → use `text-white` (full) and `text-white/80` (secondary).

---

## Logo

Create an inline SVG logo placed in `/public/logo.svg` and a `Logo` component at `/components/Logo.tsx`.

### Logo Design Spec
- Wordmark: **"Wed**Scout**"** — "Wed" in Cormorant Garamond italic, light weight. "Scout" in Poppins semibold, normal case.
- Icon: A minimalist diamond/ring shape combined with a location pin — single path, clean. Use `#2B895A`.
- Sizes: full (icon + wordmark), icon-only (for favicon/mobile).
- Works on all backgrounds — provide a `variant` prop: `default` (dark text), `light` (white text), `icon-only`.

---

## Section-by-Section Redesign

---

### 1. Navbar
**Background:** Transparent → `cream/95 + backdrop-blur` on scroll  
**Height:** 72px desktop, 64px mobile

**Changes:**
- Replace text wordmark with `<Logo variant="default" />` component
- Add a thin animated underline on nav link hover (slide in from left, `bg-green-brand`, 1px, w-full)
- "Browse Vendors" CTA: pill shape, `bg-green-brand`, slight box-shadow `shadow-green-brand/20 shadow-md` on hover
- Add a subtle `border-b border-cream-dark` when scrolled
- Mobile menu: full-screen overlay, not a dropdown. Animate links in staggered with `framer-motion`. Close button top-right.

---

### 2. Hero
**Background:** `cream` with a layered SVG graphic  
**Layout:** Split — left text, right graphic (50/50 on desktop, stacked on mobile)

**Changes:**
- Move from centred layout to **left-aligned two-column**
- Left column: badge, H1, subheading, search bar, stats
- Right column: **SVG illustration** (see Graphics section below)
- H1: `text-6xl md:text-7xl lg:text-8xl` — "Find vendors who" on line 1, "match your vision." on line 2. "vision" in italic green.
- Search bar: pill-style, white, `shadow-xl shadow-charcoal/8`, inputs separated by a vertical divider. Search button inside the pill, green, no separate border.
- Stats row: three numbers with thin green left-border dividers between them
- Background: subtle SVG line pattern (intersecting arcs, low opacity `green-brand/6`) behind right column
- Scroll indicator: keep, but make it the animated chevron-down style

**Animations:**
- Badge: fade up, 0ms delay
- H1: word-by-word fade-up stagger (each word 50ms apart)
- Subtext: fade up, 200ms
- Search bar: fade up + slight scale from 0.97, 300ms
- Stats: fade up, 400ms
- Illustration: fade in + float upward 8px, 500ms, then continuous gentle float loop

---

### 3. Categories
**Background:** `cream-dark`  
**Layout:** Header + 6-column grid (desktop), 3-col tablet, 2-col mobile

**Changes:**
- Cards: white background (`bg-white`), `rounded-2xl`, subtle `shadow-sm`, `border border-cream-dark`
- On hover: lift with `shadow-lg shadow-green-brand/10`, border becomes `border-green-brand/30`, icon bg fills to `bg-green-brand`, icon turns white
- Icon: larger, 24px, inside a 48×48 rounded-xl container
- Category name: `text-charcoal`, semibold, 14px
- Count: `text-charcoal/50`, 12px — bump to `/60`
- Add a subtle `transition-transform duration-200 hover:-translate-y-1` on each card
- Header: left-aligned section label (green, uppercase, tracking-widest), large heading, "View all" link right-aligned

**SVG Graphic:** Decorative ring of small dots / floral motif, top-right corner of the section, `green-brand/8` opacity. Purely decorative.

---

### 4. Featured Vendors
**Background:** `cream` (white cards on cream)  
**Layout:** 4-column grid desktop, 2-col tablet, 1-col mobile

**Changes:**
- Card image placeholder: replace flat colour blocks with **SVG vendor graphics** — each card gets a unique SVG scene (see Graphics section). Full bleed, `h-52`, `rounded-t-3xl`.
- Cards: `bg-white`, `rounded-3xl`, `shadow-md shadow-charcoal/5`, border `border-transparent hover:border-green-brand/20`
- Tag badge: `bg-green-brand` pill, absolute top-left, white text, 11px
- Vendor category: green, uppercase, tracking-wide, 11px
- Vendor name: `font-heading text-xl`, charcoal, hover → green transition
- Location: `text-charcoal/65` (bump up from /50)
- Star + rating: keep, increase review count opacity to `/65`
- Price range: `text-charcoal/65`, right-aligned
- Bottom CTA button: centered, `bg-green-brand`, pill, "View All Vendors →"

**Hover effect on card:** `hover:-translate-y-1 hover:shadow-xl hover:shadow-green-brand/10`

---

### 5. How It Works
**Background:** `bg-[#1A1A1A]` (dark section)  
**Layout:** 3-column horizontal steps, connected by a dashed line

**Changes:**
- Background: dark charcoal — this section must visually pop against the cream sections around it
- Section label: `text-green-brand`, uppercase
- H2: `text-white`, large, italic on "effortless."
- Step connector line: dashed, `border-t border-dashed border-white/15`, sits behind the icon circles
- Icon circles: `bg-white/8 border border-white/15`, icon in `text-green-brand`, step number badge in `bg-green-brand`
- Step title: `text-white`, `font-heading text-2xl`
- Step description: `text-white/65` — must be readable (not below 60)
- On hover per step: icon circle scales up `scale-110`, glow effect `shadow-lg shadow-green-brand/20`

**SVG Graphic:** Subtle grid/dot pattern over the dark background, `white/3` opacity. Creates texture without distraction.

**Animations:**
- Steps animate in one by one on scroll with stagger
- Icon circle: pulse ring animation on entry (`ring-green-brand/30`)

---

### 6. Testimonials
**Background:** `bg-[#2B895A]` (green section)  
**Layout:** 3-column card grid

**Changes:**
- Background: solid green — bold, distinctive, warm
- Section label: `text-white/60`, uppercase
- H2: `text-white`, "real weddings." italic
- Cards: `bg-white/12 backdrop-blur-sm`, `border border-white/20`, `rounded-3xl`
- Quote icon: `text-white/25`, 32px
- Quote text: `text-white/90` — high contrast, must be fully readable
- Author initials avatar: `bg-white`, initials in `text-green-brand`
- Author name: `text-white`, semibold
- Author location: `text-white/60`
- Divider: `border-white/20`

**Hover on card:** `hover:bg-white/18 hover:-translate-y-1 transition-all`

**SVG Graphic:** Large decorative quotation mark SVG, `white/5`, behind the section title. Adds depth.

---

### 7. CTA Banner
**Background:** `cream-dark` (wrapper), inner card `bg-[#1A1A1A]`  
**Layout:** Two-column — left text, right buttons

**Changes:**
- Switch inner card from green to **dark charcoal** — green is already used in Testimonials above
- Decorative element: thin green horizontal rule above the heading, animated width expansion on scroll
- H2: `text-white`, large
- Subtext: `text-white/65`
- Primary button: `bg-green-brand text-white`, pill, hover `bg-green-dark`
- Secondary button: `border border-white/25 text-white`, hover `bg-white/10`
- Add subtle SVG: scattered small diamond shapes `white/5` as background texture

---

### 8. Footer
**Background:** `bg-[#1A1A1A]`  
**Layout:** Brand col (2/5 width) + 3 link columns

**Changes:**
- Logo: `<Logo variant="light" />`
- Brand description: `text-white/55` — bump from /50
- Social icons: on hover, animate to `bg-green-brand` fill with subtle `scale-110`
- Column headings: `text-white/35` (slightly lighter than /40 — current is barely visible)
- Links: `text-white/60` hover `text-white` — add underline slide-in on hover
- Bottom bar: thin `border-white/8` separator, copyright `text-white/30`
- Add "Made for couples in Texas 🤍" tagline replacing generic copy

---

## SVG Graphics to Create

All SVGs should be inline React components in `/components/graphics/`. Clean, minimal, no raster images. Use the brand colour palette.

### 1. `HeroIllustration.tsx`
**Concept:** Romantic but modern. A stylised venue/arch with florals, set against a soft circular backdrop.
- Large arch shape (think wedding ceremony arch) in `cream-dark` with `green-brand` floral accents
- Scattered small diamond/ring shapes floating around
- Soft circular gradient behind it in `green-brand/10`
- Two abstract figure silhouettes beneath the arch (minimal, elegant, gender-neutral)
- Animated: gentle float (translateY -6px → 0px, 4s loop), small shapes rotate slowly

### 2. `VendorCardGraphics.tsx` (4 variants)
One SVG per vendor card placeholder — each themed to the vendor category:
- **Photography:** Camera outline + soft burst of light rays, muted `#d4e8dd` bg
- **Florals:** Stylised flower/bloom, layered petals in warm tones, `#e8ddd4` bg  
- **Videography:** Film reel / clapperboard motif, soft lavender bg `#ddd4e8`
- **Planning:** Calendar with a ring motif, soft blue-grey bg `#d4dde8`

Each SVG: centred composition, soft background fill, icon element in a slightly darker shade of the bg colour. No text.

### 3. `HowItWorksTexture.tsx`
- Dark background texture: evenly spaced dot grid, `rgba(255,255,255,0.03)` dots, 24px grid spacing
- Full section overlay, `pointer-events-none absolute inset-0`

### 4. `TestimonialsQuote.tsx`
- Giant decorative `"` in the section background
- `rgba(255,255,255,0.04)`, very large (300px+), positioned top-right
- `font-heading italic` rendered as SVG text or path

### 5. `CategoriesDecor.tsx`
- Ring of small circular dots forming an arc, `green-brand/8`
- Top-right corner of the categories section
- Purely decorative, no interactivity

---

## Animation Standards

Use `framer-motion` throughout. Consistent easing and timing.

| Type | Config |
|---|---|
| Section entry | `opacity: 0→1, y: 30→0, duration: 0.6, once: true` |
| Card entry | `opacity: 0→1, y: 20→0, stagger: 0.08` |
| Hover lift | `hover:-translate-y-1` via Tailwind |
| Hover glow | `hover:shadow-lg hover:shadow-green-brand/10` |
| Button press | `whileTap={{ scale: 0.97 }}` |
| Icon entry pulse | `scale: 0.8→1, opacity: 0→1` |
| Hero float loop | `y: [0, -8, 0], duration: 4, repeat: Infinity, ease: easeInOut` |

---

## Typography Rules

- `font-heading` (Cormorant Garamond): All H1, H2, H3. Light (300) for large display text. Semibold (600) for card titles.
- `font-body` (Poppins): All body, labels, buttons, captions. Never use for headings.
- Section labels: `font-body text-xs uppercase tracking-widest font-semibold` — always in `green-brand` on light bgs, `white/60` on dark/green bgs.
- Never use `text-charcoal/40` — minimum `/60` for readability.

---

## Responsiveness

- Mobile-first. Every section must be tested at 375px, 768px, 1280px.
- Hero: stacked on mobile (illustration hidden or scaled down below text)
- Category grid: 2-col mobile → 3-col tablet → 6-col desktop
- Vendor cards: 1-col mobile → 2-col tablet → 4-col desktop
- How It Works: stacked with vertical connector line on mobile
- Testimonials: 1-col mobile → 3-col desktop
- Navbar mobile: full-screen overlay menu

---

## Implementation Order

1. Create `/components/Logo.tsx` + `/public/logo.svg`
2. Create `/components/graphics/` — all 5 SVG components
3. Rebuild `Navbar.tsx` — logo + hover animations + mobile overlay
4. Rebuild `Hero.tsx` — two-column layout + illustration
5. Rebuild `Categories.tsx` — white cards + decor graphic
6. Rebuild `FeaturedVendors.tsx` — SVG card graphics + improved readability
7. Rebuild `HowItWorks.tsx` — dark bg + texture + step animations
8. Rebuild `Testimonials.tsx` — green bg + white cards + quote graphic
9. Rebuild `CtaBanner.tsx` — dark card + green CTA
10. Rebuild `Footer.tsx` — logo component + improved contrast
11. Final pass: responsiveness, animation timing, readability audit

---

## Readability Audit Checklist (run before done)

- [ ] No body text below `text-charcoal/60` on light backgrounds
- [ ] No body text below `text-white/65` on dark/green backgrounds
- [ ] All buttons have visible contrast (4.5:1 minimum)
- [ ] Section labels visible on every background
- [ ] Card text readable without hover state
- [ ] Mobile text sizes never below 13px (`text-xs` minimum)
