import { describe, expect, it } from 'vitest';
import { WORLD } from './platformerSimulation';
import { getViewportPresentation } from './viewportPresentation';

describe('responsive world presentation', () => {
  it.each([
    { name: 'desktop', width: 1440, height: 836, expectedScale: 0.5225 },
    { name: 'tablet portrait', width: 768, height: 946, expectedScale: 0.59125 },
    { name: 'phone portrait', width: 390, height: 766, expectedScale: 0.47875 },
    { name: 'phone landscape', width: 844, height: 312, expectedScale: 0.42 },
    { name: 'ultrawide', width: 3440, height: 1376, expectedScale: 3440 / WORLD.width },
  ])('scales the full world uniformly for $name', ({ width, height, expectedScale }) => {
    const presentation = getViewportPresentation(width, height, WORLD);
    expect(presentation.scale).toBeCloseTo(expectedScale, 4);
    expect(presentation.worldWidth).toBeCloseTo(width / presentation.scale, 4);
  });

  it('keeps the logical ground at the same viewport proportion at every scale', () => {
    const presentation = getViewportPresentation(844, 312, WORLD);
    const renderedFloorY = WORLD.floorY * presentation.scale + presentation.offsetY;
    expect(renderedFloorY).toBeCloseTo(312 * (WORLD.floorY / WORLD.height), 6);
  });

  it('scales the world to remove side bands on target ultrawide screens', () => {
    const presentation = getViewportPresentation(3440, 1376, WORLD);
    expect(presentation.offsetX).toBe(0);
    expect(WORLD.width * presentation.scale).toBeCloseTo(3440, 6);
  });
});
