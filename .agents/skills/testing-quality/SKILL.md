---
name: testing-quality
description: Plan and perform focused quality checks for this portfolio, using Vitest for unit tests and Playwright for browser-level behavior.
---

# Testing and quality

Use this skill when adding or reviewing tests, validating a user flow, or assessing code quality in this portfolio. Read `docs/planejamento.md` and inspect the available scripts and installed tools before running checks.

## Approved test tools

- Use **Vitest** for unit-level behavior such as navigation state, section selection, content structure, and PT/EN dictionaries.
- Use **Playwright** for browser flows, including mode switching, opening and closing each information panel, language switching without losing section context, and key navigation.
- Cover representative desktop, tablet, and mobile viewports. Verify keyboard and touch-oriented flows where applicable.
- Check that the game and institutional modes show the same underlying professional information and that translations cover all visible interface text.
- Include accessibility-sensitive checks for dialog focus, focus restoration, keyboard operability, visible focus, and reduced-motion behavior when the relevant UI exists.

## Quality practice

- Test observable behavior and meaningful risks; avoid brittle tests tied to implementation details or exact copy where the meaning is what matters.
- Keep tests proportional to the portfolio's scope. Do not add a broad testing framework or auxiliary scripts when Vitest and Playwright cover the need.
- When applicable and supported by the project scripts, run the production build and TypeScript checks; report failures separately from test results.
- Use Playwright to check for relevant browser-console errors during key flows. Distinguish application errors from unrelated browser or extension noise.
- Do not install missing dependencies unless the user authorizes installation. If an approved tool is unavailable, state the limitation and do not imply its checks passed.
- Report commands run, results, and unverified areas. Do not claim the site is error-free unless the relevant build, type checks, tests, and browser checks were actually run.
