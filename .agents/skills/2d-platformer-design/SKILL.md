---
name: 2d-platformer-design
description: Design the portfolio game's world movement, camera, basic physics, collision responses, player states, and platform-style interactions within its approved web stack.
---

# 2D platformer design

Use this skill when planning or implementing how the portfolio game moves and behaves as a 2D platformer. Read `docs/planejamento.md`, `.codex/agents/portfolio-architect.toml`, and the relevant environment, frontend, accessibility, and testing skills before changing the game.

## Scope and approved experience

- Focus on game feel and mechanics: world coordinates, camera follow, motion, collisions, state transitions, and interactions.
- Keep the experience a small portfolio presentation, not a full game. Preserve the one continuous world and the six approved sections and landmarks.
- In game mode, do not add a section menu to the header or mouse selection of landmarks. The game header contains only the institutional-mode switch and PT/EN selector. The institutional mode provides conventional section navigation and access to all information without requiring gameplay.
- Do not add levels, enemies, collectibles, extra sections, or new interactive props beyond the mechanic explicitly requested below. Keep natural decoration non-interactive.
- Preserve the approved character, landscape, scale, and original-art/IP rules. For sprites, crops, and visual assets, follow `pixel-art-environment`; do not estimate sprite-sheet frame offsets without visually checking the complete pose.

## World and camera

- Keep player position and landmark positions in world coordinates, independent of the viewport.
- Let the camera track the player near the viewport center during exploration, with a smooth horizontal follow and clamping at both world edges. Avoid letting the character traverse a static screen while the world remains still.
- Move the world through a transform or equivalent compositor-friendly CSS property. Keep text, controls, panels, and accessible landmark actions in the DOM.
- Preserve the continuous horizontal landscape. Use parallax only for existing background layers and only when it remains subtle and inexpensive.
- On narrow screens, follow and reframe the same world around the player or selected landmark. Do not scale the entire panorama until the character or landmarks become unreadable.

## Movement and simple physics

- Implement horizontal input with acceleration, a maximum speed, and predictable deceleration. Held keyboard and touch input should continue moving until release, cancellation, or loss of focus; a tap should still move once.
- Model vertical movement with gravity, vertical velocity, a jump impulse, and explicit grounded state. Common landmark cards open when the character contacts their activation areas; the jump itself does not trigger them. Reaching a landmark may require movement or a jump, while the institutional mode remains the route to all information without gameplay. Competencies uses the approved special underside-hit block, which remains pending until its collision and response are implemented.
- Use simple, typed collision bounds for the ground and only the specific objects that are intentionally part of an interaction. Resolve floor landing, underside hits, side contact, and world boundaries without treating every decorative pixel as a collider.
- Advance motion using elapsed time rather than assuming a particular display refresh rate. Clamp unusually large frame deltas after tab suspension so the character cannot tunnel through a surface or jump far from a single delayed frame.
- Keep the implementation small and local to the approved React, TypeScript, DOM, CSS, and image stack. Do not add Canvas, a game engine, a physics package, or another dependency.

## Player states and feedback

Use explicit, coherent states as needed: idle, walking, rising, falling, landing, and interacting. Derive rising/falling from vertical velocity and grounded state where practical; avoid conflicting booleans that can show a walk frame while airborne.

Keep state changes synchronized with the approved spritesheet poses and physics. Validate every frame crop and full animation at runtime so no state displays a partial or missing character. Respect `prefers-reduced-motion`; preserve the action and readable result when motion is reduced.

## Interactions at the six landmarks

- Reuse only the six approved points as the interaction map. Common points open their existing panels when the character contacts their activation areas. Do not add a section menu or mouse landmark selection to game mode. The institutional mode is the conventional direct-access route.
- **Required requested example — competencies:** retain the approved computer as the competencies landmark and integrate one original suspended impact block into that same point. The visitor can stand below it and jump to hit its underside; the block reacts visually and reveals the competencies information. This is part of the existing competencies point, not a seventh section or a license to add more interactive objects.
- For the five common points, use contact with the approved portal, sign, workbench, bookshelf, or crystal activation area. Do not add separate props or change a landmark's approved meaning without explicit approval.
- Feedback should be brief, legible, and secondary to the information panel. Do not hide content in animation. Sound is optional; add it only within an approved implementation scope, use original sounds, avoid autoplay, and provide mute/volume controls.

## Responsibilities and validation

Keep responsibilities conceptually clear—world, player, camera, physics, input, interactions, and game UI—but do not require a separate React component for every responsibility. Use the smallest modules that keep motion updates independent from infrequent interface state and keep professional content sourced from the shared portfolio data.

Use the existing Vitest and Playwright setup to verify horizontal movement and release, jump/gravity, landing, world limits, camera follow at desktop/tablet/mobile sizes, contact activation for common landmarks, panel opening, keyboard/touch controls, reduced motion, and the institutional mode's direct navigation. When the competencies block is implemented, also test underside hits, side contact, its visual reaction, and panel activation. Test visible behavior rather than implementation details; check for clipping, console errors, and horizontal overflow.

## Relationship with the project plan

`docs/planejamento.md` contains the project-specific decisions approved for this portfolio. Physical simulation—including gravity, vertical velocity, collisions, and landing—is within the approved scope. This skill complements the plan with technical guidance for 2D game development. If a future conflict arises, identify it and ask for guidance before implementing a decision that has not been approved.
