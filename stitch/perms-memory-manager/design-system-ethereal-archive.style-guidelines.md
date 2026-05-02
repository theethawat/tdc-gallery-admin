
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