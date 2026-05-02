## Brand & Style

The visual identity of this design system centers on the concept of "The Atmospheric Sanctuary." It transitions from grounded professionalism to an airy, weightless aesthetic that prioritizes mental clarity and calm. The target audience includes high-level professionals and wellness-oriented users who seek a digital environment that feels like a breath of fresh air.

The style leverages **Modern Minimalism** fused with **Subtle Glassmorphism**. By using translucent layers and soft-focus backgrounds, the interface avoids the clinical coldness of traditional corporate design, opting instead for a premium, ethereal quality. Visual elements should feel as though they are floating in a high-altitude space, utilizing high-key lighting and delicate tonal transitions to guide the eye without causing cognitive fatigue.

## Layout & Spacing

The layout philosophy is built on a **Fluid 12-Column Grid** with high margins to allow the content to "breathe." Spacing is rhythmic, based on an 8px base unit, but applied with a preference for larger gaps to emphasize the minimalist aesthetic.

Whitespace is treated as a structural element rather than empty space. Containers should have generous internal padding (MD or LG) to prevent content from feeling cramped. Alignment should be rigorous, favoring left-aligned text for readability, while using centered layouts for high-impact, sparse landing moments.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows** rather than harsh borders. Surfaces are tiered using subtle shifts in background tint:
- **Level 0 (Base):** Off-white or lightest sky-blue tint.
- **Level 1 (Card):** Pure white with a delicate, large-radius shadow (#7CB9E8 at 8% opacity) to create a floating effect.
- **Level 2 (Modals/Popovers):** Semi-transparent white with a background blur (12px to 20px) and a subtle 1px border in a slightly darker blue tint.

Shadows must never be black or neutral gray; they should always carry a hint of the primary sky-blue color to maintain the atmospheric theme.

## Components

- **Buttons:** Primary buttons use a very subtle linear gradient (Sky Blue to a slightly lighter tint) with white text. Secondary buttons are ghost-style with a 1px lavender border.
- **Chips & Tags:** Small, pill-shaped elements using the tertiary light pink or lavender at low saturation (10-15% opacity) for the background.
- **Cards:** White backgrounds, rounded-lg corners, and ambient sky-blue shadows. Borders should be avoided unless the card is placed on a white background, in which case a 1px "Ice Blue" border is used.
- **Input Fields:** Soft gray-blue backgrounds that shift to white on focus, highlighted by a subtle glow in the primary blue.
- **Lists:** High-density lists are discouraged. Items should have clear vertical separation and use soft dividers that fade out at the edges.
- **Glass Overlays:** For navigation bars or headers, use a 70% transparent white background with a backdrop blur to maintain the sense of depth as users scroll content.
