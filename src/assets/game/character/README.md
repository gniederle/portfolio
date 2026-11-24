# Character sprite atlas

`character-spritesheet.png` is the high-resolution RGBA atlas used by the game and kept as the editable raster master. The approved concept reference remains unchanged at `docs/referencias/personagem-aprovado.png`.

The atlas is a 4-column × 3-row grid, 1448 × 1086 px overall (362 × 362 px cells), with transparent background. Read cells left to right, top to bottom:

| Cell | Pose |
| --- | --- |
| 1 | Idle |
| 2–5 | Walk cycle |
| 6 | Rising |
| 7 | Falling |
| 8–9 | Landing |
| 10–11 | Impact / interaction, reserved for a later interaction pass |
| 12 | Empty |

Runtime displays the atlas with nearest-neighbor pixel rendering. The DOM clips one cell at a time; horizontal facing is mirrored with CSS. World scale is applied by the existing world transform, so the atlas does not change physics dimensions.
