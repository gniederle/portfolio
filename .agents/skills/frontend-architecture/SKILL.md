---
name: frontend-architecture
description: Apply the approved React, TypeScript, and CSS architecture to this portfolio when planning, adding, or refactoring frontend components, state, or content presentation.
---

# Frontend architecture

Use this skill for frontend architecture and implementation work in this portfolio. Read `docs/planejamento.md` before making structural choices and inspect the existing project before assuming its layout or dependencies.

## Project conventions

- Use React with TypeScript and Vite. Keep the application static; do not add a backend, database, game engine, or external state manager unless the user approves a change in scope.
- Keep professional content separate from presentation. The game and institutional modes must read the same content data.
- Represent the six approved sections with stable identifiers and typed content. Keep Portuguese and English values in local dictionaries/data; do not duplicate components by language.
- Use React's local state/hooks for mode, language, active section, open panel, and other small UI state. Avoid adding a state-management package for this scope.
- Build cohesive components around responsibilities such as the top bar, game scene, character, interest points, information panels, and institutional view. Keep scene movement updates separate from infrequent interface state where practical.
- Use modular CSS and shared design variables. Do not add a styling framework or component library without a concrete need and approval.
- Keep user-facing content faithful to the curriculum and approved planning. Never invent roles, dates, projects, metrics, skills, or professional claims.

## When changing architecture

Prefer the smallest structure that supports the approved experience. Explain meaningful trade-offs when a proposed change adds a dependency, runtime layer, state system, or deployment requirement. Preserve existing conventions when they remain compatible with the approved architecture. Do not implement unrelated features as part of a refactor.
