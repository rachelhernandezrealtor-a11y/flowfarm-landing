# FLOW FARM DESIGN BIBLE
Last updated: 2026-04-21

This is the living source of truth for all design decisions, copy rules, aesthetic standards, and implementation notes for the Flow Farm landing page (FlowFarmLanding2.jsx / flowfarmforest.com).

---

## BRAND IDENTITY

### Color Palette
- DARK: `#0a0a0a` — near-black background
- GOLD: `#C9A96E` — accent, eyebrows, dividers, CTA
- CREAM: `#F5F0E8` — body text on dark backgrounds
- WHITE: `#ffffff` — headlines, pull quotes
- GLASS: `rgba(255,255,255,0.12)` — frosted card fill
- GLASS BORDER: `rgba(255,255,255,0.28)` — frosted card border

### Typography
- Headlines: Georgia, serif — large, bold, mixed upright + italic for editorial feel
- Eyebrows: sans-serif, 10px, letter-spacing 0.36em, uppercase, GOLD color
- Body: Georgia or serif, 16-18px, CREAM or rgba(255,255,255,0.88)
- Pull quotes: Georgia italic, large (clamp 2rem–4rem), centered, white
- Stats/labels: sans-serif, small caps, spaced
- Font stack fallback: `'Cormorant Garamond', Georgia, serif` for serif moments

### Vibe
- Editorial. Aman resort meets working farm.
- NOT dark and moody. Vibrant, crystal clear, floating on glass.
- Full-bleed imagery. Minimal UI chrome.
- Let the property speak. Copy is spare and deliberate.

---

## LAYOUT RULES

### Section Order (DO NOT REORDER without Rachel approval)
1. Hero
2. Manifesto
3. Foundation
4. CinematicReveal — Living Room
5. Numbers
6. CinematicReveal — Conservatory
7. Quote
8. CinematicReveal — Kitchen
9. Land
10. Opportunity (forest bg)
11. Mechanism
12. CinematicReveal — Foyer
13. Location
14. Inquire
15. Footer

### CinematicReveal Pattern
- Full-bleed photo on right (60% width desktop)
- Dark frosted text panel on left (overlapping photo edge)
- Eyebrow label in GOLD
- Serif headline (large, 2-3 lines max)
- Body paragraph (2-3 sentences)
- NO buttons inside CinematicReveal panels

### Frosted Glass Cards
- Background: `rgba(255,255,255,0.12)`
- Border: `1px solid rgba(255,255,255,0.28)`
- Backdrop-filter: `blur(12px)` when on image backgrounds
- On pure dark bg: no backdrop-filter needed, just rgba fill

---

## IMAGE STANDARDS

### Cloudinary Fetch Base
```
https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_2400/
```
Wrap ALL images through this. Append Base44 CDN URL after the slash.

### Forest Background (Opportunity section)
- Cloudinary params: `f_auto,q_auto,w_2400,e_vibrance:40,e_saturation:20,e_brightness:15,e_sharpen:60`
- CSS filter on bg div: `saturate(1.25) brightness(1.12)`
- Scale: 108% base, Ken Burns to 112% on scroll
- Vignette: radial, dark edges only, crystal clear center
- Parallax: backgroundPositionY shifts on scroll

### Hero Background
- Static aerial photo (NO video autoplay on hero bg)
- Full bleed, `backgroundSize: cover`, `backgroundPosition: center`

### Key Hero Images (always use these for primary slots)
- Living room (trusses + piano): `4db7d0477_livingroom.jpg`
- Conservatory money shot (octagonal dome): `8cb2578a0_MONEYSHOT.jpg`
- Kitchen wide: `1c4b8a04f_SOGOODKITCHEN.jpg`
- Primary spa bath: `08da5b97d_spaprimarybath.jpg`
- Foyer herringbone: `9b1d02a04_260115107LindenTrailF-9727.jpg`
- Aerial establishing: `2ca329bbf_flowfarmmasterphotoswebsite.jpg`

---

## COPY RULES

### Voice
- Declarative sentences. No hedging.
- Present tense. The property exists NOW.
- Specificity over adjectives. "17 feet tall" not "soaring ceilings"
- No real estate clichés: no "nestled," "boasts," "charming," "stunning"
- Short paragraphs. Two sentences max in body slots.
- Numbers are features. Lead with them.

### Smart Home Copy Moments (WEAVE IN — do not replace existing copy)
| Location | Line |
|---|---|
| Foyer | "one tap, the house shifts" |
| Living Room | "sound that fills seventeen feet without effort" |
| Kitchen | "music from speakers you can't see" + water filtration mention |
| Spa Bath | "lights already at ten percent" — as FULL-BLEED PULL QUOTE |
| Closet | quiet one-liner about the dimmer (subtle) |
| Office | seamless power transfer — solar/geo/generator handoff woven in |
| Exterior Night | "143 lighting circuits. Some of them are these trees." — standalone |
| Infrastructure | Lead with "the electrical capacity of a small hotel" |

### Pull Quote Format
- Full-bleed dark or image section
- Georgia italic, large centered text
- Quotation marks: `"..."` (curly, but use ASCII `"` in JSX to avoid crashes)
- No attribution needed — these are editorial moments, not testimonials

### Approved Headlines (DO NOT change without Rachel approval)
- Hero: "Agritourism Established. Legacy Ready." (3-line treatment, left-aligned)
- Manifesto section: TBD
- Quote section: "Autonomy at this scale is not inherited. It is engineered."
- Land section: "Three acres producing. Seven acres waiting."
- Mechanism section: "Structure that holds freedom."

---

## ANIMATION + INTERACTION RULES

### Hero Stats Counter
- Sequential counter animation on page load
- Font: Cormorant Garamond weight 300 (thin, editorial)
- Ghostly dividers between stats
- Stats: 3-ACRE VEGANIC FARM | 15 ACRES | 3 MI. TO PINEHURST | $5.25M

### Parallax
- All full-bleed background sections use backgroundPositionY scroll shift
- Shift amount: 0.35–0.40 multiplier (subtle, not jarring)
- Ken Burns zoom: scale 1.08 base → 1.12 at bottom of section

### Transitions
- No hard cuts between sections
- Dark bg sections bleed into each other with no dividers
- Image sections have slight top/bottom gradient fade for text legibility

---

## TECHNICAL RULES

### Build Safety
- NO non-ASCII characters in JSX — will crash the build silently
- Use `--` instead of em-dash `—` in JSX strings
- Use `"` and `"` ASCII quotes only — no curly quotes in code
- All emoji must be wrapped in `<span role="img">` or removed
- Always check `ord(c) > 127` after any Python file manipulation

### File Management
- Source of truth: `/app/pages/FlowFarmLanding2.jsx`
- Master backup: `/app/.agents/FlowFarmLanding2_MASTER.jsx`
- Update master backup after every approved change
- NEVER use Base44 editor chat panel — it overwrites code
- Always edit via Rocky superagent chat only

### Cloudinary Helper Pattern
```js
const cdn = (url) => url ? `https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_2400/${encodeURIComponent(url)}` : url;
```

---

## PENDING / TO-DO

- [ ] Implement approved hero design (3-line headline, stats bar, gold CTA pill) — DO NOT touch until Rachel says go
- [ ] Weave all smart home copy moments into existing sections
- [ ] Spa bath pull quote as full-bleed standalone section
- [ ] "143 lighting circuits" exterior night moment
- [ ] Garren Hill landing page (same Aman treatment)
- [ ] Confirm forest Opportunity section looks vibrant on live site (Rachel to verify)
- [ ] Update master backup after next approved change

---

## RACHEL'S AESTHETIC PREFERENCES (running list)

- Vibrant NOT dark and moody
- Crystal clear, like floating on glass
- 3D immersive backgrounds with depth
- Editorial serif typography
- Glassmorphism frosted cards
- Full-bleed cinematic photo reveals
- Specificity in copy — no vague luxury language
- Aman resort aesthetic as the north star
- Stats and numbers as features, not footnotes
