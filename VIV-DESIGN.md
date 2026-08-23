---
name: Vivianne Site
description: Airy cloudy and vivid light and sky blue ocean theme with white colors
colors:
  canvas: "#ffffff"
  surface-raised: "#ffffff"
  surface-soft: "rgba(79, 163, 255, 0.08)"
  surface-subtle: "rgba(79, 163, 255, 0.04)"
  ink: "#0c3b6d"
  ink-strong: "rgba(12, 59, 109, 0.82)"
  body-text: "#466a8d"
  mute: "rgba(12, 59, 109, 0.5)"
  hairline: "#d8ebff"
  hairline-strong: "rgba(79, 163, 255, 0.38)"
  accent-sky: "#4fa3ff"
  accent-ocean: "#0a5a9c"
  gradient-logo: "linear-gradient(135deg, #4fa3ff 0%, #a3d5ff 55%, #ffffff 100%)"
typography:
  h1:
    fontFamily: Sora
    fontSize: 3rem
    fontWeight: 500
    letterSpacing: "-0.02em"
    lineHeight: 1.1
  body-md:
    fontFamily: Sora
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  eyebrow:
    fontFamily: Sora
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  sm: 18px
  md: 28px
  full: 9999px
spacing:
  sm: 8px
  md: 24px
  lg: 64px
  xl: 128px
components:
  button-primary:
    backgroundColor: "{colors.accent-ocean}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.full}"
  card-outer:
    backgroundColor: "{colors.surface-subtle}"
    rounded: "{rounded.md}"
  card-inner:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.sm}"
  glass-surface:
    backgroundColor: "rgba(255, 255, 255, 0.4)"
    backdropFilter: "blur(24px) saturate(150%)"
    border: "1px solid rgba(255, 255, 255, 0.5)"
  background-animated:
    type: "reactbits-animated-granient"
    colors: ["#ffffff", "#4fa3ff", "#a3d5ff"]
---

# Design System: Vivianne Site
**Project ID:** vivianne-site

## 1. Visual Theme & Atmosphere
The atmosphere captures the essence of a vivid, breezy day by the ocean. It is airy, cloudy, and bright, with a palette inspired by sky blue and ocean depths against pure white foam and clouds. It feels fresh, fluid, and vibrant. The design density relies on generous whitespace and flowing, unhurried motion, resembling the gentle rolling of ocean waves. A predominantly "sky and foam" palette is used, avoiding harsh blacks and grays, saving the vivid sky-blue-to-white gradient to make the visual identity feel bright and boundless. The global background utilizes a sky blue and white animated granient component (from `reactbits.dev`) to create a living, breathing fluid atmosphere.

## 2. Color Palette & Roles
* **Canvas & Surfaces:** Pure white (`#ffffff`) creates the expansive feeling of clouds and sea foam. Serves as the base page background, providing extreme clarity.
* **Surface Raised (Pure White)** (`#ffffff`) - Used for the inner core of cards/containers that sit "above" the canvas.
* **Ink & Text:** Deep ocean blue (`#0c3b6d`) replaces black for a softer but highly legible contrast. Primary text color.
* **Ink Strong (Softened Ink)** (`rgba(12, 59, 109, 0.82)`) - Used for secondary emphasis.
* **Body (Warm Blue-Gray)** (`#466a8d`) - Used for body and paragraph text to reduce eye strain.
* **Mute (Translucent Ink)** (`rgba(12, 59, 109, 0.5)`) - De-emphasized labels, metadata, and eyebrow text.
* **Hairline (Light Sky Blue)** (`#d8ebff`) - Default borders and structural dividers; barely visible.
* **Hairline Strong (Translucent Sky Blue)** (`rgba(79, 163, 255, 0.38)`) - Stronger borders, such as dashed placeholder outlines.
* **Surface Soft (Subtle Sky Tint)** (`rgba(79, 163, 255, 0.08)`) - Subtle tinted backgrounds for icon circles and eyebrow badges.
* **Surface Subtle (Lightest Sky Tint)** (`rgba(79, 163, 255, 0.04)`) - The lightest background tint, used sparingly for outer bezel shells.
* **Logo Ring (Sky Blue to Cloud White Gradient)** (`linear-gradient(135deg, #4fa3ff 0%, #a3d5ff 55%, #ffffff 100%)`) - Reserved exclusively for the logo and brand accents.

## 3. Typography Rules
The system uses the **Sora** variable font (with fallbacks to system-ui and sans-serif). Font weights are strictly limited to medium (500) and normal (400) to keep the aesthetic light and floating — no bold, semibold, or light weights are used on text, establishing hierarchy through size and color instead. Headers are large and utilize tight letter-spacing with tight line height. Body text is set with a relaxed line height for comfortable reading, mimicking the easy rhythm of waves. Tiny "eyebrow" text is uppercase, medium weight, and uses extreme letter-spacing.

## 4. Component Stylings
* **Animated Background:** The global background relies on a ReactBits (`reactbits.dev`) animated granient component. It cycles smoothly between pure white (`#ffffff`), sky blue (`#4fa3ff`), and light sky blue (`#a3d5ff`), simulating a dynamic, moving cloudy sky with a textured, grainy feel.
* **Buttons:** Pill-shaped (fully rounded at `9999px`), like smooth sea glass. Assigned a deep ocean blue background with a white foreground. Buttons often feature a trailing icon inside a distinct circular chip that translates diagonally and scales up slightly on hover, introducing fluid, kinetic tension.
* **Cards/Containers:** Employs a double-bezel nested architecture that feels buoyant. The outer tray ("bezel-shell") has a generous `28px` corner roundness, pale sky-blue tinted background, and a `1px` inset shadow rim. The inner core ("bezel-core") sits slightly less rounded (`18px`), with a white surface, layered floating shadows, and a `1px` white inset highlight on top. On hover, the core lifts smoothly as if hovering in the air.
* **Inputs/Forms:** Subtle tinted sky-blue backgrounds (`rgba(79, 163, 255, 0.08)`) with barely visible borders (`#d8ebff`). Pill-shaped or softly rounded corners (`18px`). Focus state relies on a strong ocean blue (`#0c3b6d`) outline.
* **Glass Surface / Fluid Glass:** UI elements such as floating panels, navigation, and overlays should heavily utilize a fluid glass aesthetic. This is achieved using heavily blurred frosted glass (`backdrop-filter: blur(24px) saturate(150%)`), layered translucent white backgrounds (`rgba(255, 255, 255, 0.4)`), thin semi-transparent white borders (`rgba(255, 255, 255, 0.5)`), and soft outer shadow stacks. The glass elements should feel wet, polished, and refractive, absorbing the animated granient background underneath them.
* **Glass Pill (Navigation):** Floating bar shaped as a pill, built with the fluid glass architecture mentioned above, an inner radial highlight, and a subtle outer shadow stack, mimicking sunlight refracting through water or thin clouds.

## 5. Layout Principles
The layout prioritizes an airy, breezy whitespace strategy. Major sections breathe heavily with massive vertical padding (128px-160px). Content width is strictly constrained, capping at `1280px` for full-width sections, and text paragraphs are deliberately constrained to a comfortable reading measure (max 48 characters for body text, 18-30 characters for headings). Grid alignment uses asymmetric 12-column bento grids (e.g., alternating 7-col and 5-col cards, or text-heavy 1.1fr / 0.9fr visual splits in heroes) with a standard `24px` gap, letting the content float seamlessly with a global horizontal margin of `24px`.
