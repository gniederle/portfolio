# Game artwork

These original PNG assets are the production artwork currently rendered by the game mode. They are kept in the repository at their exported resolution; CSS uses nearest-neighbour pixel rendering when scaling them to the logical world.

## Character

- `character/character-spritesheet.png`: transparent 4-column by 3-row atlas, with 362 × 362 px frames. `character/README.md` documents the frame map used by the CSS animation states.

## World environment

- `environment/world-background.png`: 2172 × 724 px, 3:1 panorama mapped proportionally to the 4800 × 1600 logical world. The path line is aligned to the world floor; the image contains no interaction targets.

## Landmarks

Each landmark is a separate transparent 1254 × 1254 px PNG. The registry defines its world-space visual size, baseline correction, and collision area, independently from the source file resolution.

| File | Approved point of interest |
| --- | --- |
| `landmarks/presentation-portal.png` | Presentation portal |
| `landmarks/career-signpost.png` | Career signpost |
| `landmarks/skills-computer-block.png` | Skills computer and suspended block |
| `landmarks/contributions-workbench.png` | Contributions workbench |
| `landmarks/education-bookshelf.png` | Education bookshelf |
| `landmarks/contact-crystal.png` | Contact crystal |

All landmark images are decorative; names, focus, and interaction remain owned by the semantic React interface and the world-coordinate registry. The competency collision reaction is a separate pending mechanic and is not enabled by the artwork alone.
