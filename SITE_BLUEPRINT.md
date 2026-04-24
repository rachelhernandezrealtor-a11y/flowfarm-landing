# SITE BLUEPRINT — Complete Reference for Fresh Builds
Last updated: 2026-04-21

## FLOW FARM — 107 Linden Trail, Aberdeen NC — $5,250,000

### Section Order (LOCKED)
1. Hero — video bg, headline, stats, CTA
2. Manifesto — copy, matterport link
3. Foundation — aerial photo, estate copy
4. CinematicReveal — Living Room
5. Numbers — stats grid
6. CinematicReveal — Conservatory
7. Quote — pull quote
8. CinematicReveal — Kitchen
9. Land — cabana/tunnel/workshop cards
10. Opportunity — forest bg, investment thesis
11. Mechanism — systems/infrastructure
12. CinematicReveal — Foyer
13. Location — map/proximity
14. Inquire — contact form
15. Footer

### IMAGE MAP — ALL CLOUDINARY ENHANCED
Base CDN: https://media.base44.com/images/public/69e248a2469cc39540781cce/
Cloudinary fn: `cdn = (url) => 'https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_1400,c_limit/' + encodeURIComponent(url)`
Interior enhance: e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15
Exterior enhance: e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20

KEY PHOTOS:
- living:       4db7d0477_livingroom.jpg (17ft trusses + piano + porch view)
- conservatory: 8cb2578a0_MONEYSHOT.jpg (octagonal dome money shot)
- kitchen:      1c4b8a04f_SOGOODKITCHEN.jpg (Wolf + Sub-Zero wide)
- dining:       db01725cb_sogoodtolivingroom.jpg (boat chandelier + glass table)
- spabath:      08da5b97d_spaprimarybath.jpg (dual vanities + tub)
- foyer:        9b1d02a04_260115107LindenTrailF-9727.jpg (herringbone entry)
- powderroom:   4e58028ab_260115107LindenTrailF-9769-2.jpg (gold hand-painted)
- wolf:         ef4b4a364_WOLFDOUBLEGASRANGE.jpg (Wolf close-up red knobs)
- office:       2b920c3b0_markofficemoneyshot.jpg (trusses + office)
- hallway:      8e3d794f9_secondfloorhallway.jpg
- aerial:       2ca329bbf_flowfarmmasterphotoswebsite.jpg
- exterior:     OLD CDN: /69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg
- grounds:      OLD CDN: /69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg
- cabana:       supabase: 3af6924d6_CabanaHouseMain.jpg
- tunnel:       supabase: 217fdb4a1_HighTunnel.jpg
- workshop:     supabase: 136958608_FarmWorkshop.jpg
- forest:       fbfaf627b_generated_image.png (Opportunity section bg)

### COPY — LOCKED
- Hero eyebrow: "The Architectural Masterpiece"
- Hero headline: "Agritourism Established. Legacy Ready." (2-line, italic on Established)
- Hero sub: "Where architectural excellence meets working land -- three miles from Pinehurst Resort."
- Stats: 3-ACRE VEGANIC FARM | 15 ACRES | 3 MI. TO PINEHURST | $5.25M
- CTA: "Enter Flow Farm"
- Manifesto h2: "Not just a home. A living system built for those who intend to leave something behind."
- Manifesto body: "Fifteen acres of forest and working farmland three miles from Pinehurst Resort. Designed by Robert E. Clark AIA as one of his final private commissions. Built to operate indefinitely, independently, and beautifully."
- Foundation h2: "A Foundation for What Comes Next."
- Quote: "Autonomy at this scale is not inherited. It is engineered."
- Land h2: "Three acres producing. Seven acres waiting."
- Mechanism h2: "Structure that holds freedom."

### SMART HOME COPY MOMENTS
- Foyer: "one tap, the house shifts"
- Living Room: "sound that fills seventeen feet without effort"
- Kitchen: "music from speakers you can't see" + water filtration mention
- Spa Bath: "lights already at ten percent" (full-bleed pull quote)
- Infrastructure: "the electrical capacity of a small hotel"
- Exterior night: "143 lighting circuits. Some of them are these trees."

### DESIGN TOKENS
- DARK: #0a0a0a
- GOLD: #C9A96E
- CREAM: #F5F0E8
- GLASS: rgba(255,255,255,0.12) border rgba(255,255,255,0.28)
- Font: Georgia serif + Cormorant Garamond weight 300 for stats
- Body text: rgba(255,255,255,0.32) on dark bg

### TECH
- VIDEO: https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4
- MATTERPORT FF: https://my.matterport.com/show/?m=xZRfSiQPuQ8
- Route: /FlowFarmLanding2
- Domain: flowfarmforest.com

---

## GARREN HILL — 200 Hollycrest Drive, Pinehurst NC

### IMAGE MAP
Base CDN: https://base44.app/api/apps/69e2578ca7113dbe93cb208d/files/mp/public/69e2578ca7113dbe93cb208d/
Cloudinary fetch wraps same formula above.

KEY PHOTOS (numbered series 200HollycrestDrive-X.jpg):
- Exterior hero: -1.jpg through -5.jpg (exterior)
- Interiors: -6.jpg through -47.jpg
- Extended series: -93.jpg through -119.jpg, -145.jpg+
- Also: 6e1617ac3_200HollycrestDrive-222.jpg, 0275eccb6_200HollycrestDrive-225.jpg (incoming_files)

### PROPERTY FACTS
- Address: 200 Hollycrest Drive, Pinehurst NC
- Built: 1916 by Walter Hines Page (Doubleday co-founder)
- 5 beds, 5 baths, 7 fireplaces, 4.15 acres
- Pool 20x40, 2 tennis courts
- VHF (Village Historic Foundation) recognized
- 1916 brick inlay at portico entry
- Wee Cottage moved via sky crane
- Matterport: https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&

### DESIGN
- Same Aman editorial treatment as Flow Farm
- Same color tokens, same section pattern
- Route: Currently embedded in FlowFarmLanding2 (platform routing bug workaround)
