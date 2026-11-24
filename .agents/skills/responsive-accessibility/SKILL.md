---
name: responsive-accessibility
description: Design or review this portfolio's desktop, tablet, and mobile layouts, input methods, information panels, keyboard access, and assistive-technology support.
---

# Responsive accessibility

Use this skill when changing responsive behavior, controls, panels, navigation, or accessibility. Consult `docs/planejamento.md` and work within its approved experience and visual references.

## Responsive behavior

- Support desktop, tablet, and mobile from the component and layout design, not as a final shrink-to-fit pass.
- Preserve one continuous horizontal world. On small screens, reframe or follow the relevant part of the world; do not merely scale the full desktop panorama until landmarks and character become unreadable.
- Keep the six points of interest recognizable and reachable through the character in game mode. Do not add a section menu to the game header; the header contains only the institutional-mode switch and language selector. The institutional mode provides conventional direct navigation to all sections without requiring gameplay.
- Provide keyboard controls on desktop and comfortable touch controls on mobile for moving and jumping. Game landmarks activate when the character contacts their activation areas; mouse selection of landmarks is not part of game mode. Keep institutional navigation usable by keyboard, mouse, and touch.
- Adapt information panels to available space. On mobile, allow a near-full-screen panel with readable content, internal scrolling as needed, and a prominent close control.

## Accessibility requirements

- Keep headings, text, links, buttons, landmarks, and panel content in semantic DOM. Do not put essential information or controls only in a canvas, image, animation, or color cue.
- Make every essential action available by keyboard, with visible focus and predictable focus order. When a panel opens, move focus into it; when it closes, restore focus to its trigger or the relevant section control.
- Give controls accessible names and keep text contrast and target sizes usable. Ensure PT/EN changes also update accessible labels and document language.
- Respect `prefers-reduced-motion`. The institutional mode is the route to all professional information that does not depend on movement or game skill.
- Check both visual layout and keyboard/screen-reader behavior at representative viewport sizes. Treat automated checks as support for, not a replacement for, manual review.
