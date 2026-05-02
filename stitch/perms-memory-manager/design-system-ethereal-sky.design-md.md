---
name: Ethereal Sky
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#41484e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#71787f'
  outline-variant: '#c0c7cf'
  surface-tint: '#1c648e'
  primary: '#1c648e'
  on-primary: '#ffffff'
  primary-container: '#7cb9e8'
  on-primary-container: '#00496d'
  inverse-primary: '#90cdfd'
  secondary: '#67558c'
  on-secondary: '#ffffff'
  secondary-container: '#d5bffe'
  on-secondary-container: '#5d4b81'
  tertiary: '#795465'
  on-tertiary: '#ffffff'
  tertiary-container: '#d3a6b9'
  on-tertiary-container: '#5c3a4b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cae6ff'
  primary-fixed-dim: '#90cdfd'
  on-primary-fixed: '#001e30'
  on-primary-fixed-variant: '#004b70'
  secondary-fixed: '#ebddff'
  secondary-fixed-dim: '#d2bcfb'
  on-secondary-fixed: '#220f44'
  on-secondary-fixed-variant: '#4f3d73'
  tertiary-fixed: '#ffd8e7'
  tertiary-fixed-dim: '#e9bacd'
  on-tertiary-fixed: '#2e1221'
  on-tertiary-fixed-variant: '#5f3c4d'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: IBM Plex Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 1.5rem
  margin: 2rem
---

## Brand & Style

The visual identity of this design system centers on the concept of "The Atmospheric Sanctuary." It transitions from grounded professionalism to an airy, weightless aesthetic that prioritizes mental clarity and calm. The target audience includes high-level professionals and wellness-oriented users who seek a digital environment that feels like a breath of fresh air.

The style leverages **Modern Minimalism** fused with **Subtle Glassmorphism**. By using translucent layers and soft-focus backgrounds, the interface avoids the clinical coldness of traditional corporate design, opting instead for a premium, ethereal quality. Visual elements should feel as though they are floating in a high-altitude space, utilizing high-key lighting and delicate tonal transitions to guide the eye without causing cognitive fatigue.

## Colors

The palette is anchored by a sophisticated sky-blue primary, supported by muted lavender and soft pink to provide warmth without sacrificing professionalism. 

- **Primary (Sky Blue):** Used for core interactions and brand presence. It must feel expansive and clear.
- **Secondary (Lavender):** Employed for supporting elements and soft highlights, providing a gentle contrast to the blue.
- **Tertiary (Light Pink):** Reserved for delicate accents, notifications, or celebratory UI states.
- **Neutrals:** Backgrounds utilize very light blue tints (Ice Blue) or soft off-whites to reduce screen glare. 

Avoid any saturation of green or teal to prevent the interface from shifting into a "playful" or "tropical" mood. All gradients should be linear and low-contrast, mimicking the natural transition of a horizon.

## Typography

This design system uses **IBM Plex Sans** for its exceptional clarity and technical precision in both English and Thai scripts. The typography is balanced between industrial structure and humanistic curves.

Large display headings use a tighter tracking and medium weights to establish a confident presence. Body text utilizes a generous line-height (1.6) to enhance readability and contribute to the "airy" feel of the sanctuary style. Label styles should be primarily uppercase with slight letter spacing to differentiate them from body content, ensuring a clean hierarchy. For Thai characters, ensure line heights are strictly maintained to accommodate tall vowel marks without clipping.

## Layout & Spacing

The layout philosophy is built on a **Fluid 12-Column Grid** with high margins to allow the content to "breathe." Spacing is rhythmic, based on an 8px base unit, but applied with a preference for larger gaps to emphasize the minimalist aesthetic.

Whitespace is treated as a structural element rather than empty space. Containers should have generous internal padding (MD or LG) to prevent content from feeling cramped. Alignment should be rigorous, favoring left-aligned text for readability, while using centered layouts for high-impact, sparse landing moments.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows** rather than harsh borders. Surfaces are tiered using subtle shifts in background tint:
- **Level 0 (Base):** Off-white or lightest sky-blue tint.
- **Level 1 (Card):** Pure white with a delicate, large-radius shadow (#7CB9E8 at 8% opacity) to create a floating effect.
- **Level 2 (Modals/Popovers):** Semi-transparent white with a background blur (12px to 20px) and a subtle 1px border in a slightly darker blue tint.

Shadows must never be black or neutral gray; they should always carry a hint of the primary sky-blue color to maintain the atmospheric theme.

## Shapes

The shape language is **Rounded**, reflecting the softness of clouds and organic forms found in nature. 

Primary containers and buttons use a 0.5rem base radius. Larger cards and sections should scale up to 1rem or 1.5rem to emphasize the sanctuary-like softness. Avoid sharp 90-degree corners, as they conflict with the "calm and airy" goal. Conversely, avoid full pill-shapes for primary buttons to maintain a professional, architectural edge; reserve pill-shapes exclusively for status chips and tags.

## Components

- **Buttons:** Primary buttons use a very subtle linear gradient (Sky Blue to a slightly lighter tint) with white text. Secondary buttons are ghost-style with a 1px lavender border.
- **Chips & Tags:** Small, pill-shaped elements using the tertiary light pink or lavender at low saturation (10-15% opacity) for the background.
- **Cards:** White backgrounds, rounded-lg corners, and ambient sky-blue shadows. Borders should be avoided unless the card is placed on a white background, in which case a 1px "Ice Blue" border is used.
- **Input Fields:** Soft gray-blue backgrounds that shift to white on focus, highlighted by a subtle glow in the primary blue.
- **Lists:** High-density lists are discouraged. Items should have clear vertical separation and use soft dividers that fade out at the edges.
- **Glass Overlays:** For navigation bars or headers, use a 70% transparent white background with a backdrop blur to maintain the sense of depth as users scroll content.
