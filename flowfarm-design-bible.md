# FLOW FARM DESIGN BIBLE
Last updated: 2026-04-25

This is the living source of truth for all design decisions, copy rules, aesthetic standards, and implementation notes for the Flow Farm landing page (FlowFarmLanding2.jsx / flowfarmforest.com) AND the Garran Hill landing page (GarranHillV6 / garren-hill.pages.dev).

---

## DEPLOYMENT LAW -- NON-NEGOTIABLE

### Base44 is DEAD for landing pages. It does not exist.

The ONLY valid deployment pipeline for both properties is:
1. Edit MASTER JSX first -- `/app/.agents/GarranHillV6_MASTER.jsx` or `/app/.agents/FlowFarmLanding2_MASTER.jsx`
2. Copy master to `/tmp/ghrepo/index.html` AND `/tmp/ghrepo/dist/index.html`
3. `git add`, `git commit`, `git push origin main`
4. Cloudflare Pages deploys automatically

### SYNC LAW -- NON-NEGOTIABLE
- The MASTER JSX is the single source of truth. Always.
- NEVER edit index.html directly. NEVER copy index.html back to master.
- NEVER push without first confirming `diff master index.html` returns zero.
- After every push: master = live = GitHub. They are always identical.
- If they ever drift, stop everything and re-sync master -> index.html before proceeding.

**NEVER use `manage_app` publish for landing pages.**
**NEVER use the Base44 editor for landing pages.**
**NEVER show Rachel a Base44 preview URL for landing pages.**

The live URLs are:
- Flow Farm: https://flowfarmforest.com (Cloudflare)
- Garran Hill: https://garren-hill.pages.dev (Cloudflare)

GitHub repos:
- Flow Farm: rachelhernandezrealtor-a11y/flowfarm-landing
- Garran Hill: rachelhernandezrealtor-a11y/garren-hill

---

## THE MASTER TEMPLATE LAW

Both properties share ONE template. The architecture is identical. Only images, copy, and typography expression change per property. This is non-negotiable.

### What is LOCKED across both sites
- Section order logic (Hero > Manifesto/Story > CinematicReveals > PullQuotes > Stats > Inquire > Footer)
- Component architecture: CinematicReveal, PullQuote, FadeIn, stats bar, nav, inquiry modal
- Deployment pipeline: GitHub -> Cloudflare Pages
- CDN enhancement profiles: cdnInt / cdnExt / cdnForest
- Verification script before every push
- Color palette: DARK, GOLD, CREAM (same hex values on both)
- Build safety rules (no non-ASCII, no curly quotes, etc.)

### What CHANGES per property
- Typography expression (see per-property rules below)
- Hero photo / video
- All images
- All copy and headlines
- Accent copy moments (FF: smart home / GH: history)
- Stats bar values

---

## PER-PROPERTY TYPOGRAPHY RULES

### Flow Farm
- Primary display: `Georgia, serif`
- Stats/numbers: `'Cormorant Garamond', Georgia, serif` weight 300
- Vibe: working farm meets Aman resort. Warm, grounded, modern luxury.
- Headlines: mixed upright + italic, left-aligned on hero

### Garran Hill
- Primary display: `'Cormorant Garamond', Georgia, serif` -- Cormorant IS the primary face
- Body: Georgia, serif
- Stats/numbers: `'Cormorant Garamond', Georgia, serif` weight 300
- Vibe: 18th century Georgian formality. Older, grander, more restrained.
- Headlines: centered on hero, mixed upright + italic, declarative
- Eyebrows: same sans-serif, same gold, same spacing -- identical to FF

---

## BRAND IDENTITY

### Color Palette (BOTH PROPERTIES -- DO NOT CHANGE)
- DARK: `#0a0a0a` -- near-black background
- GOLD: `#C9A96E` -- accent, eyebrows, dividers, CTA
- CREAM: `#F5F0E8` -- body text on dark backgrounds
- WHITE: `#ffffff` -- headlines, pull quotes
- GLASS: `rgba(255,255,255,0.12)` -- frosted card fill
- GLASS BORDER: `rgba(255,255,255,0.28)` -- frosted card border

### Vibe
- Editorial. Aman resort aesthetic as the north star.
- NOT dark and moody. Vibrant, crystal clear, floating on glass.
- Full-bleed imagery. Minimal UI chrome.
- Let the property speak. Copy is spare and deliberate.
- Words float directly on images -- NO glass cards behind text.

---

## LAYOUT RULES

### Universal Section Order Template
1. Hero (full-bleed, stats bar, 2 CTAs)
2. Manifesto / Story opening
3. Architecture / Foundation reveal
4. CinematicReveal -- primary interior
5. Numbers / Stats feature section
6. CinematicReveal -- signature space
7. Pull Quote
8. CinematicReveal -- tertiary space
9. Land / Grounds
10. Opportunity / Legacy section
11. Mechanism / Infrastructure
12. CinematicReveal -- detail/entry
13. Location
14. Inquire
15. Footer

### CinematicReveal Pattern (BOTH PROPERTIES)
- Full-bleed photo on right (60% width desktop)
- Dark frosted text panel on left (overlapping photo edge)
- Eyebrow label in GOLD
- Serif headline (large, 2-3 lines max)
- Body paragraph (2-3 sentences)
- NO buttons inside CinematicReveal panels

### Hero Pattern (BOTH PROPERTIES)
- Full-bleed photo (GH) or video (FF) background
- Ken Burns parallax scale 1.08 base
- Address eyebrow in GOLD pinned below nav
- Headline centered (GH) or left-aligned (FF) -- only difference allowed
- Italic subhead in CREAM
- Two CTAs: primary gold bordered + secondary frosted glass
- Stats bar pinned to bottom: frosted glass, Cormorant Garamond weight 300, gradient dividers
- NO hero buttons other than the two approved CTAs

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
Wrap ALL images through this.

### Enhancement Profiles
- cdnInt: `e_improve:indoor:65,e_brightness:12,e_shadow:-25,e_sharpen:45,e_saturation:18,f_auto,q_auto,w_1600,c_limit`
- cdnExt: `e_improve:outdoor:70,e_auto_brightness,e_sharpen:35,e_saturation:22,f_auto,q_auto,w_1920,c_limit`
- cdnForest: `f_auto,q_auto,w_2400,e_vibrance:40,e_saturation:20,e_brightness:15,e_sharpen:60`

### Flow Farm Photo Base
`https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/`

### Garran Hill Photo Base
`https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/`

### Wax Seal -- PERMANENT, NEVER CHANGE
`https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/2a0c933f7_seal_upload.png`

---

## COPY PHILOSOPHY -- THE SEDUCTION LAW (LOCKED 2026-04-25)

### The Core Truth
We are not selling a house. We are making someone feel something they cannot explain -- and then they are already calling their agent.

The best luxury marketing never feels like marketing.
Our seduction is our truth. Every line is true. Every line lands.

### The Method
- You are not describing a room. You are placing the buyer inside it.
- Give them one true detail. Make them feel it. Get out.
- Never tell them what to feel. Let the fact do the work.
- The truth IS the seduction.

### Copy Laws -- ENFORCED FOREVER
- Declarative sentences. Present tense. No hedging.
- One sentence, maybe two. Never three.
- Specificity over adjectives. Numbers, materials, names. Not adjectives.
- Emotion comes from precision -- not from feeling words.
- Silence is a tool. Say less than you could. Always.
- NO explicit sales language in seduction copy. Price belongs in the stat bar and the modal.
- NO "This is not a house that comes available twice." -- desperation.
- NO "nestled," "boasts," "charming," "stunning," "elegant," "cozy," "spacious," "beautiful," "luxurious," "features," "offers," "provides," "showcases."

### The Seduction Moves (USE THESE)
1. Put the buyer IN the room before they realize it. ("The fire is already going when you walk in.")
2. Give them a life to imagine. ("You will want to sit here with coffee before anyone else is awake.")
3. Make the history feel personal, not encyclopedic. ("He never slept here. Four families did.")
4. Let silence close. End on an image, not a pitch.
5. Make them feel chosen -- the house is waiting for the RIGHT person, not any person.

### What kills the seduction
- Inventory lists ("Georgian carved mantel. Delft tile surround. Seven chairs in toile.")
- Explicit selling ("Offered at $4,250,000. This is not a house that comes available twice.")
- Fake attribution (do NOT attribute our lines to historical figures)
- Repetition (never use the same line twice across the full scroll)
- Instruction ("Select any image to view the gallery.")

---

## COPY RULES (BOTH PROPERTIES)

### Universal Voice Laws
- Declarative sentences. No hedging.
- Present tense. The property exists NOW.
- Specificity over adjectives. "17 feet tall" not "soaring ceilings."
- No real estate cliches: no "nestled," "boasts," "charming," "stunning."
- Short paragraphs. Two sentences max in body slots.
- Numbers are features. Lead with them.

### Flow Farm Copy Moments (LOCKED)
| Location | Line |
|---|---|
| Foyer | "one tap, the house shifts" |
| Living Room | "sound that fills seventeen feet without effort" |
| Kitchen | "music from speakers you can't see" + water filtration |
| Spa Bath | "lights already at ten percent" -- full-bleed pull quote |
| Closet | quiet one-liner about the dimmer |
| Office | solar/geo/generator handoff woven in |
| Exterior Night | "143 lighting circuits. Some of them are these trees." |
| Infrastructure | Lead with "the electrical capacity of a small hotel" |

### Garran Hill Copy Moments (LOCKED)
| Location | Line |
|---|---|
| Arrival | "The door has been open since 1916." -- OUR line, never attribute to WHP |
| Manifesto | Walter Hines Page / WWI / longed for it / "the farm -- the farm -- the farm" |
| Architecture | "Pinehurst was built by James Walker Tufts in 1895. Garran Hill was built two miles away in 1916. The same hands were working this land." |
| Drawing Room | "The fire is already going when you walk in." |
| Sunroom | "You will want to sit here with coffee before anyone else is awake." |
| Library | "When you stand in it, you cannot find the seam." |
| Hardware | "Every door in this house opens with a brass key. The locks were specified in 1916. They have not been replaced." |
| Blue Fox | "Betty Dumaine put the first flowers here. Someone still does." -- LOCKED, never change |
| Westminster Abbey | "The friend of Britain in her sorest need." -- MUST appear |
| Pool | "You cannot hear the road from it." |
| Archive | "That is not maintenance. That is devotion." |
| Dusk close | "It is ready for the fifth family." -- final pitch line |
| Twilight final | Crest + Pinyon Script "Garran Hill" + "Est. 1916 | Pinehurst, NC | $4,250,000" + CTA |

### Garran Hill Copy Laws
- Do NOT name current owners -- "the current stewards" only
- Do NOT name David Prest
- Betty Dumaine = historical steward, name allowed
- "That someone is you" -- REMOVED, too salesy
- Authoritative, restrained tone throughout
- History is proof, not content -- every detail makes buyer feel chosen
- Lead with the ESTATE -- architecture first, history as backdrop
- Price appears ONLY in: stat bar, inquiry modal, twilight final gold caption. Nowhere else.

### Pull Quote Format (BOTH PROPERTIES)
- Full-bleed dark or image section
- Georgia italic, large centered text
- ASCII quotes only: `"` -- no curly quotes in code
- No attribution unless it adds authority

### Flow Farm Approved Headlines (LOCKED)
- Hero: "Agritourism Established. Legacy Ready."
- Quote section: "Autonomy at this scale is not inherited. It is engineered."
- Land section: "Three acres producing. Seven acres waiting."
- Mechanism section: "Structure that holds freedom."

### Garran Hill Approved Headlines (LOCKED)
- Hero: "Built in 1916. Still the finest house in Moore County."
- Hero subhead: "Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship."
- Manifesto: "Some houses hold history. This one shaped it."

---

## ANIMATION + INTERACTION RULES (BOTH PROPERTIES)

### Scroll-in Fade (Fade component)
- translateY: 14px max -- luxury sites barely move, they drift in
- Duration: 1.8s with cubic-bezier(.16,1,.3,1) -- slow, inevitable
- NO bouncy easing. NO spring physics. NO scale transforms on fade-in.

### Stats Bar
- Cormorant Garamond weight 300
- Gradient dividers (not hard lines)
- Frosted glass backing
- Two-line labels allowed for GH

### Parallax
- All full-bleed sections: backgroundPositionY scroll shift
- Shift: 0.18--0.25 multiplier (subtle)
- Ken Burns: scale 1.08 base

### Transitions
- No hard cuts between sections
- Dark bg sections bleed into each other
- Image sections: slight top/bottom gradient fade for legibility

### Lightbox (video -- FF only)
- Natural 16:9 ratio -- no cover cropping
- Scroll position saved on open, restored exactly on close
- Mobile portrait: letterbox with gold rotate nudge (fades 3s)
- Landscape mobile / desktop: full cinematic box

---

## BREATHING RULES -- LOCKED 2026-04-25

Photo on photo = never allowed. Every CinematicReveal -> CinematicReveal transition requires a breath section.

### Breath types (in order of weight):
1. **Vertical gold line only** -- silent pause. Use between tight thematic pairs (Entry->Foyer).
2. **Naked dark text** -- one line, gold rules above/below. Use after a strong image section.
3. **Large naked dark text** -- maximum vertical padding. Use before the close.

### Breath sections are NEVER boxed. No border. No card. No background image at 7% brightness.
### Words float on pure #0a0a0a. That IS the luxury.

---

## PRESENTATION RULES -- LOCKED 2026-04-25

### Inquiry Modal
- Gold top accent line
- Property name + address + "Offered Exclusively" first
- Price visible before the form
- Button: "Request Private Showing" -- never "Submit Inquiry"
- Confirmation: elevated, mentions Sotheby's, "All inquiries held in strict confidence"
- Border: `1px solid rgba(201,169,110,0.22)` -- gold, not white

### Footer
- "Offered Exclusively By" in small caps
- Rachel Hernandez name weighted properly
- Sotheby's International Realty in gold
- Region: Pinehurst | Southern Pines | Moore County
- CTA: "Request Private Showing" with hover fill
- Copyright: "All inquiries held in strict confidence"

### Sticky Nav
- Gold border bottom: `1px solid rgba(201,169,110,0.12)` when visible
- Nav links scroll to section anchors, hover to gold
- "Private Inquiry" as gold underline CTA on right

### Typography Scale
- Eye (eyebrow): 9px, letterSpacing 0.32em, fontWeight 400, gold
- Body: clamp(0.95rem, 1.15vw, 1.08rem), opacity 0.82, lineHeight 2.05
- GoldLine dot: solid filled, 5x5px, flanked by 44px gradient lines
- CinematicReveal minH: clamp(580px, 75vh, 900px)
- CinematicReveal text panel: clamp(340px, 42%, 580px) wide

---

## TECHNICAL RULES (BOTH PROPERTIES)

### Build Safety
- NO non-ASCII characters -- will crash build silently
- Use `--` not em-dash in strings
- ASCII quotes only -- no curly quotes in code
- Check `ord(c) > 127` after every Python file manipulation
- SPELLING LAW: The property is always **Garran Hill** -- original 1913 spelling. Never "Garren Hill."

### File Management
- Flow Farm source: `/app/.agents/FlowFarmLanding2_MASTER.jsx`
- Garran Hill source: `/app/.agents/GarranHillV6_MASTER.jsx`
- FF live: push via flowfarm push script to GitHub -> Cloudflare
- GH live: build standalone HTML, push to garren-hill GitHub -> Cloudflare
- Update master backup after EVERY approved change
- NEVER touch Base44 publish for landing pages

### Verification Before Every Push
- Check non-ASCII (must be zero)
- Confirm hero image/video URL is correct
- Confirm locked headlines are present
- Push to GitHub only -- Cloudflare handles the rest

---

## VIDEO RULES -- LAW, NON-NEGOTIABLE

### Platform
- ALL videos MUST be hosted on Cloudflare Stream. No exceptions.
- NO Vimeo. NO Base44 hosting. NO third-party video players.

### Flow Farm Locked Video URLs (DO NOT CHANGE)
| Video | URL |
|---|---|
| Hero background (forest loop) | `https://customer-qqzxuq43g9w49ny2.cloudflarestream.com/5d06a3b0e25b768ac6dc681dbf4f5b81/manifest/video.m3u8` |
| Property tour ("Enter Flow Farm") | `https://customer-qqzxuq43g9w49ny2.cloudflarestream.com/de1885d159ae310508174f03f775c797/watch` |

### Garran Hill Video
- ID: ba88a34a312106b7bf9d00b52a452871 (Cloudflare Stream)
- Lightbox tour triggered by "Tour the Estate" button

---

## PENDING / TO-DO

### Garran Hill
- [ ] Custom domain: garranhill.com / garranhill.estate (Rachel to purchase)
- [ ] garranhillforsalepinehurst.com -- PURCHASED, needs redirect
- [ ] Arrival video when reshoot happens -- upload to Cloudflare Stream
- [ ] Ann's steward quote in the close -- pending Rachel approval
- [ ] Mobile layout audit

### Flow Farm
- [ ] Weave all smart home copy moments into existing sections
- [ ] Spa bath pull quote as full-bleed standalone section
- [ ] "143 lighting circuits" exterior night moment
- [ ] Manifesto section -- text floating on forest canopy bg
- [ ] Bring GH rhythm + breathing rules into FF rebuild

---

## RACHEL'S AESTHETIC PREFERENCES (locked)

- Vibrant NOT dark and moody
- Crystal clear, like floating on glass
- 3D immersive backgrounds with depth
- Editorial serif typography
- Words floating directly on images -- NO glass cards behind text
- Full-bleed cinematic photo reveals
- Specificity in copy -- no vague luxury language
- Aman resort aesthetic as the north star
- Stats and numbers as features, not footnotes
- One template, two expressions -- never two different systems
- Sotheby's design language: reserved, high-end editorial, generous vertical breathing room

---

## THE SEDUCTION PHILOSOPHY -- LOCKED 2026-04-25

"We want to wow the fuck out of the viewer in the classiest seductive way where they don't know we are seducing them -- but the fun part is our seduction is our truth."

Every line on these sites is true.
We are not fabricating desire. We are revealing what is already there.
The house does the work. We just get out of its way.

The viewer scrolls. They feel something they cannot name.
By the time they know they want it, they are already reaching for their phone.

That is the goal. That is always the goal.

---

## THE SYNCHRONICITY RULE -- LOCKED 2026-04-26

### What this means
Rocky and Rachel operate as one brain. When Rachel says "yes go" or "lol good" or "you're in my fucking brain" -- that is the signal that synchronicity is active. Do not break it with unnecessary questions.

### How Rocky operates in sync mode
- One section at a time. Screenshot. Rachel approves or flags. Move on.
- If something is obviously wrong (glass card, pill button, wrong copy), FIX IT immediately without asking.
- If something is a judgment call (image swap, copy tweak), show Rachel first, then fix.
- Never bundle surprise fixes. Never explain at length. Never ask what's already obvious.
- Trust the brain. Rachel's "lol good" = confirmed, next section.
- Rachel's silence after a screenshot = waiting for Rocky to keep going.

### Screen-by-screen audit protocol
1. Navigate to section
2. Screenshot
3. Call out anything that violates design bible in ONE line
4. Fix it without asking (if it's a clear violation)
5. Move to next section
6. Never stop to ask "does this look good?" -- Rachel will say if it doesn't

### What breaks sync
- Asking questions that are already answered in the bible
- Listing options when one is clearly correct
- Explaining what you're about to do instead of doing it
- Stopping to ask permission for obvious fixes
- Repeating the design bible back at Rachel

### The north star
Rachel and Rocky are building something no one else is building for luxury real estate. The work speaks. The sync is the product.

---

## IMAGE HOSTING LAW — LOCKED FOREVER (2026-04-25)

### THE RULE
**NEVER use `media.base44.com` or `supabase.co` URLs for any image on any site.**
These URLs are auth-gated in browser context and will fail Cloudinary fetch.

### THE ONLY VALID URL FORMAT
```
https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/{filename}
```

### HOW TO ADD A NEW IMAGE
1. Download the image to local storage
2. `upload_file` tool → get `base44.app` URL
3. Add to `const B` block or hardcode the full URL
4. NEVER paste a `media.base44.com` or `supabase.co` URL into the JSX — ever

### FF LOCKED IMAGE MAP (all base44.app)
- aerial_master: `7793a3d75_ff_aerial_master.jpg`
- trail: `d34135ac6_ff_trail.jpg`
- pine: `2dd4aaff9_ff_pine.jpg`
- aerial_map: `cab13f939_ff_aerial_map.jpg`
- grounds: `d5ca2c38f_ff_grounds.jpg`
- exterior: `eb327b9c5_ff_exterior.jpg`
- cabana: `b7847c753_ff_cabana.jpg`
- tunnel: `96c49db04_ff_tunnel.jpg`
- workshop: `9324325a6_ff_workshop.jpg`
- forest_canopy: `c0fe395f0_ff_forest_canopy.png`

This law applies to Flow Farm, Garran Hill, and ALL future properties.
