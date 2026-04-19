# Design System Strategy: The Academic Atelier

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

Unlike the high-velocity, transactional nature of social media, this system is rooted in the "Slow Web" movement. It prioritizes intentionality, academic warmth, and sophisticated connection. We are moving away from the "template" look by utilizing editorial layouts characterized by intentional asymmetry, significant breathing room (whitespace), and a focus on content as art. 

The experience should feel like walking through a sun-drenched university library or a modern boutique gallery—authoritative yet deeply inviting. We reject the dopamine-loop aesthetic (neon colors, sharp vibrations, hearts) in favor of tactile depth, earthy muted tones, and a "low-friction" visual hierarchy.

---

## 2. Colors: The Earthy Palette
The color strategy is built on organic transition rather than hard separation. We use an off-white/cream base to reduce eye strain and establish a premium, "paper-like" feel.

### Core Tokens
- **Background (`#fcf9f4`):** The canvas. This off-white/cream replaces pure white to provide an immediate "warm" academic quality.
- **Primary (`#7b563e` - Terracotta):** Used for key actions and brand identity. It represents grounded energy.
- **Secondary (`#546253` - Sage):** Used for growth-oriented features like "Groups" and "New Connections."
- **Tertiary (`#665e43` - Sand/Moss):** Used for highlighting academic interests or tags.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. 
Boundaries must be defined solely through background color shifts. For instance, a `surface-container-low` (`#f6f3ee`) section should sit directly on a `surface` (`#fcf9f4`) background. This creates a seamless, high-end editorial feel where the structure is felt rather than seen.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum paper.
- **Lowest Tier:** `surface-container-lowest` (`#ffffff`) for floating high-priority cards.
- **Highest Tier:** `surface-container-highest` (`#e5e2dd`) for deep recessed areas like search bars or inactive sidebars.

### The "Glass & Gradient" Rule
To add soul to digital surfaces, use Glassmorphism for floating overlays. Apply a semi-transparent `surface` color with a `backdrop-blur` (12px–20px). For hero elements, use a subtle linear gradient from `primary` (`#7b563e`) to `primary-container` (`#cc9e82`) at a 45-degree angle to simulate natural light hitting a textured surface.

---

## 3. Typography: The Modern Scholar
The typography pairs **Manrope** (for structural impact) with **Work Sans** (for approachable utility).

- **Display & Headlines (Manrope):** These are our "Editorial Voice." Large scales (up to `3.5rem`) should be used with tight letter-spacing (-0.02em) to create a bold, modern, yet academic statement. 
- **Body & Labels (Work Sans):** Chosen for its high legibility and friendly, open apertures. It keeps the "Connections" and "Groups" descriptions feeling human and accessible.
- **Hierarchy as Identity:** Use `headline-lg` for section headers with significant `top-margin` (using scale `12` or `16`) to create a sense of importance and "space to think."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often too "heavy" for an academic aesthetic. We achieve depth through **Tonal Layering**.

- **The Layering Principle:** Stack `surface-container-low` on `surface` for a soft lift. No shadows required.
- **Ambient Shadows:** If a card must "float" (e.g., a Connection request), use an extra-diffused shadow: `blur: 40px`, `y: 8px`, `opacity: 6%`. The shadow color must be a tinted version of `on-surface` (`#1c1c19`), never pure black.
- **The "Ghost Border" Fallback:** If a container lacks contrast against a background, use a "Ghost Border": `outline-variant` (`#d4c3ba`) at **15% opacity**. This provides a whisper of a boundary without breaking the editorial flow.

---

## 5. Components: Tactile & Friendly

### Buttons
- **Primary:** Terracotta (`primary`) background with `on-primary` text. Use `roundness-md` (0.75rem) for a friendly but professional silhouette.
- **Secondary:** Sage (`secondary`) background. Use for secondary actions like "Message Group."
- **States:** On hover, do not darken; instead, shift to a slightly lighter container tone (e.g., `primary-container`) to simulate a "glow" of interaction.

### Input Fields
- **Styling:** Forgo the 4-sided box. Use a `surface-container-high` background with a soft `roundness-sm`.
- **States:** On focus, the background shifts to `surface-container-lowest` with a 2px `primary` bottom-border only.

### Cards & Lists
- **The Divider Ban:** Strictly forbid 1px horizontal dividers. 
- **The Alternative:** Use vertical whitespace (Spacing `6` or `8`) or a subtle alternating background shift (`surface-container-low` to `surface`) to separate "Connections" in a list.

### Connection Chips
- **Usage:** For interest tags (e.g., "Architecture," "History"). 
- **Style:** Use `tertiary-container` with `on-tertiary-container` text. These should be pills (`roundness-full`) to contrast against the more structured `md` roundness of primary cards.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical layouts. Let a headline sit 20% from the left while the body sits 40% from the left.
- **Do** use the Spacing Scale religiously. Consistent, generous gaps are what make the system feel "High-End."
- **Do** use "Connections" and "Groups." The tone must always remain platonic, academic, and collaborative.

### Don't
- **Don't** use pure white (`#ffffff`) for anything other than the most elevated "floating" cards.
- **Don't** use hearts or "Like" icons. Use stars or "Save" icons to indicate interest in a Group.
- **Don't** use high-contrast borders. If the design feels "messy," increase the whitespace rather than adding lines.
- **Don't** use "Match" terminology. Use "New Connection Found" or "Suggested Group."

---

## 7. Spacing & Rhythm
The system uses a soft 0.35rem base (Scale 1). 
- Use **Spacing 8 (2.75rem)** for internal padding of large cards.
- Use **Spacing 16 (5.5rem)** for vertical section separation. 
This "excessive" spacing is a deliberate choice to signal luxury and academic calm.