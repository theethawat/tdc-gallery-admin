---
name: Ethereal Archive
colors:
  surface: '#f7fafd'
  surface-dim: '#d7dadd'
  surface-bright: '#f7fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f7'
  surface-container: '#ebeef1'
  surface-container-high: '#e5e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#181c1e'
  on-surface-variant: '#43474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f4'
  outline: '#737781'
  outline-variant: '#c3c6d1'
  surface-tint: '#375f97'
  primary: '#375f97'
  on-primary: '#ffffff'
  primary-container: '#7096d1'
  on-primary-container: '#002d5b'
  inverse-primary: '#a7c8ff'
  secondary: '#5b5891'
  on-secondary: '#ffffff'
  secondary-container: '#c1bdfe'
  on-secondary-container: '#4d4a82'
  tertiary: '#296956'
  on-tertiary: '#ffffff'
  tertiary-container: '#63a18c'
  on-tertiary-container: '#003528'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3b'
  on-primary-fixed-variant: '#1b477d'
  secondary-fixed: '#e3dfff'
  secondary-fixed-dim: '#c4c0ff'
  on-secondary-fixed: '#17134a'
  on-secondary-fixed-variant: '#434078'
  tertiary-fixed: '#aff0d8'
  tertiary-fixed-dim: '#94d3bd'
  on-tertiary-fixed: '#002118'
  on-tertiary-fixed-variant: '#07513f'
  background: '#f7fafd'
  on-background: '#181c1e'
  surface-variant: '#e0e3e6'
typography:
  display-lg:
    fontFamily: Ibm Plex Sans Thai
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Ibm Plex Sans Thai
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Ibm Plex Sans Thai
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Ibm Plex Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
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
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-lg: 48px
  stack-md: 24px
  stack-sm: 12px
---

## Brand & Style

The design system is built upon the "Digital Sanctuary" philosophy—a high-end editorial approach that prioritizes mental clarity and quiet professionalism. It is designed for discerning users who require a focused environment for consuming and organizing high-value information.

The aesthetic merges **Minimalism** with **Tonal Layering**. Unlike traditional corporate interfaces, it avoids harsh whites and aggressive shadows, opting instead for a luminous, atmospheric quality. The brand voice is calm, archival, and sophisticated, evoking the feeling of a premium physical gallery translated into a fluid digital medium.

## Colors

The palette is a curated selection of cool, atmospheric tones. To maintain the "Sanctuary" feel, pure #FFFFFF white is strictly forbidden as a background. Instead, the design system utilizes **Off-White (#F4F7FA)** and **Very Light Blue** as its foundational surfaces.

- **Primary (Sky Blue):** Used for navigation and key structural indicators.
- **Secondary (Soft Lavender):** Reserved for delicate accents, high-end editorial highlights, and soft gradients.
- **Tertiary (Mint):** A functional accent for success states and refreshing call-outs.
- **Surface Strategy:** Depth is created through "Ink-on-Paper" tonal shifts—stacking slightly darker surfaces on lighter bases to create a sense of physical layering without using shadows.

## Typography

The design system pairs the technical precision of **IBM Plex Sans** with the approachable clarity of **Nunito Sans**. 

IBM Plex Sans is used for headlines, titles, and labels to provide a structured, archival authority. Nunito Sans is reserved for body text, where its softer terminals provide a high degree of comfort for long-form reading.

The type scale follows an editorial rhythm with generous line heights to ensure a "breathable" reading experience. Headlines use a tighter letter-spacing for a premium, custom-set appearance, while small labels use increased letter-spacing and uppercase styling to denote archival metadata. Body text must maintain a line height of at least 1.6 to prevent visual fatigue during long-form reading.

## Layout & Spacing

The system employs a **Fixed Grid** philosophy for desktop to maintain editorial integrity, transitioning to a fluid model for mobile. 

A 12-column grid is used with expansive margins (64px) to create the "Airy Layout" central to the brand. Whitespace is treated as an active design element, not "empty" space. Vertical rhythm is governed by a strict 8px baseline, with large section breaks typically utilizing `stack-lg` (48px) to clearly separate archival collections.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layers** and **Subtle Tinted Shadows**. 

1.  **Level 0 (Base):** The primary surface color (`#F4F7FA`).
2.  **Level 1 (Cards/Containers):** Elevated by using a secondary surface color or a 1px border of a slightly darker tone.
3.  **Level 2 (Interactive):** Elements that float above the surface use an extremely diffused shadow (Blur: 30px, Opacity: 4%) tinted with the Primary Sky Blue color rather than black.

The use of backdrop blurs (15px-20px) is encouraged for overlays and navigation bars to maintain the "Ethereal" feeling of light passing through glass.

## Shapes

The shape language is defined by a **Structured Rounded** aesthetic. This approach balances professional stability with a contemporary, accessible feel.

All interactive elements—buttons, chips, and input fields—must use a `rounded-DEFAULT` (8px) radius. Non-interactive containers like cards should use a `rounded-lg` (16px) or `rounded-xl` (24px) radius to maintain harmony with the navigation elements while providing enough structure for content organization.

## Components

- **Buttons:** Rounded (8px). Primary buttons use a subtle gradient from Sky Blue to Soft Lavender. Text is semi-bold IBM Plex Sans.
- **Input Fields:** Rounded (8px) with a 1px soft blue border. Focus states use a subtle mint-tinted outer glow.
- **Chips/Tags:** Used for archival categorization. Small, rounded (8px), with a background color that is a 10% opacity version of the accent colors.
- **Cards:** Large corner radius (16px-24px). No heavy shadows; depth is conveyed via a subtle tonal shift from the background or a very light, tinted stroke.
- **Lists:** High vertical padding (16px-24px per item) with hair-line separators in the secondary surface color. Body text uses Nunito Sans.
- **Progress Indicators:** Soft, rounded bars using the Mint accent to denote "active" or "fresh" archival processes.
- **Navigation:** A floating rounded "Island" bar at the top or bottom of the viewport using glassmorphism effects and a 16px corner radius.