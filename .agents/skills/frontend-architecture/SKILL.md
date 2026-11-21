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

### Reutilização e prevenção de duplicação

Ao desenvolver funcionalidades com React e TypeScript:

1. Utilize componentes compartilhados quando houver estrutura visual ou comportamento realmente reutilizável.
2. Extraia lógica compartilhada para hooks ou funções utilitárias quando isso melhorar a organização.
3. Centralize tipos, interfaces, constantes e configurações que sejam compartilhados.
4. Evite repetir estruturas JSX, regras de negócio e estilos CSS.
5. Utilize propriedades e composição de componentes para permitir reutilização sem criar componentes excessivamente genéricos.
6. Centralize os dados profissionais e suas traduções, evitando manter versões independentes para cada modo de apresentação.
7. Antes de criar novos arquivos ou componentes, verifique se já existe uma implementação com a mesma responsabilidade.
8. Ao identificar duplicações, avalie se a extração realmente melhora a manutenção e a legibilidade.

**Importante:** não aplicar abstrações prematuras. Código reutilizável deve resolver uma necessidade real, e não apenas reduzir a quantidade de linhas.