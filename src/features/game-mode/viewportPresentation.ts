import type { WorldBounds } from './platformerSimulation';

export interface ViewportPresentation {
  scale: number;
  offsetX: number;
  offsetY: number;
  worldWidth: number;
  skyBackground: string;
  groundGrassHeight: number;
  groundDetailTop: number;
  groundDetailBottom: number;
  groundPathTop: number;
  groundPathBottom: number;
}

const MIN_SCALE = 0.28;
const MAX_SCALE = 0.65;
const MAX_ULTRAWIDE_SCALE = 0.72;
const FULL_MIN_SCALE = 0.42;
const FULL_MIN_SCALE_HEIGHT = 740;
const SKY_TOP = [150, 206, 250] as const;
const SKY_BOTTOM = [223, 241, 243] as const;
const LANDSCAPE_ART_HEIGHT = 488;

export function getViewportPresentation(
  viewportWidth: number,
  viewportHeight: number,
  world: WorldBounds,
): ViewportPresentation {
  const safeWidth = Math.max(0, viewportWidth);
  const safeHeight = Math.max(0, viewportHeight);
  const adaptiveMinimum = clamp(safeHeight / FULL_MIN_SCALE_HEIGHT, MIN_SCALE, FULL_MIN_SCALE);
  const heightScale = clamp(safeHeight / world.height, adaptiveMinimum, MAX_SCALE);
  const widthScale = safeWidth / world.width;
  const scale = heightScale === MAX_SCALE && widthScale > MAX_SCALE
    ? Math.min(widthScale, MAX_ULTRAWIDE_SCALE)
    : heightScale;
  const worldWidth = safeWidth / scale;
  const renderedWorldWidth = world.width * scale;
  const offsetX = Math.max(0, (safeWidth - renderedWorldWidth) / 2);
  const floorScreenY = safeHeight * (world.floorY / world.height);
  const offsetY = floorScreenY - world.floorY * scale;
  const renderedWorldHeight = Math.max(world.height * scale, 1);
  const worldBottomY = offsetY + renderedWorldHeight;
  const skyStart = skyColor(clamp(-offsetY / renderedWorldHeight, 0, 1));
  const skyEnd = skyColor(clamp((safeHeight - offsetY) / renderedWorldHeight, 0, 1));
  const skyBackground = createSkyBackground(offsetY, worldBottomY, safeHeight, skyStart, skyEnd);
  const groundScale = (world.floorY / LANDSCAPE_ART_HEIGHT) * scale;

  return {
    scale,
    offsetX,
    offsetY,
    worldWidth,
    skyBackground,
    groundGrassHeight: 54 * groundScale,
    groundDetailTop: 7 * groundScale,
    groundDetailBottom: 19 * groundScale,
    groundPathTop: 20 * groundScale,
    groundPathBottom: 48 * groundScale,
  };
}

function createSkyBackground(
  worldTopY: number,
  worldBottomY: number,
  viewportHeight: number,
  startColor: string,
  endColor: string,
): string {
  if (worldTopY >= 0 && worldBottomY <= viewportHeight) {
    return `linear-gradient(to bottom, ${SKY_TOP_COLOR} 0px, ${SKY_TOP_COLOR} ${worldTopY}px, ${SKY_BOTTOM_COLOR} ${worldBottomY}px, ${SKY_BOTTOM_COLOR} 100%)`;
  }

  if (worldTopY < 0 && worldBottomY <= viewportHeight) {
    return `linear-gradient(to bottom, ${startColor} 0px, ${SKY_BOTTOM_COLOR} ${worldBottomY}px, ${SKY_BOTTOM_COLOR} 100%)`;
  }

  if (worldTopY >= 0 && worldBottomY > viewportHeight) {
    return `linear-gradient(to bottom, ${SKY_TOP_COLOR} 0px, ${SKY_TOP_COLOR} ${worldTopY}px, ${endColor} 100%)`;
  }

  return `linear-gradient(to bottom, ${startColor} 0px, ${endColor} 100%)`;
}

const SKY_TOP_COLOR = `rgb(${SKY_TOP.join(' ')})`;
const SKY_BOTTOM_COLOR = `rgb(${SKY_BOTTOM.join(' ')})`;

function skyColor(progress: number): string {
  const channels = SKY_TOP.map((start, index) => Math.round(start + (SKY_BOTTOM[index] - start) * progress));
  return `rgb(${channels.join(' ')})`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
