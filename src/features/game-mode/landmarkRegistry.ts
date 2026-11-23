import type { PortfolioSectionId } from '../../types/portfolio';
import { WORLD, type PlayerState } from './platformerSimulation';

export type LandmarkType = 'portal' | 'sign' | 'computer' | 'workbench' | 'bookshelf' | 'crystal';

export interface LandmarkDefinition {
  id: PortfolioSectionId;
  x: number;
  y: number;
  type: LandmarkType;
  interaction: {
    kind: 'collision';
    radius: number;
    hitbox: { width: number; height: number; top: number };
  };
}

const ICON_TOP = 365 * (WORLD.floorY / 488);
const ICON_HITBOX = { width: 100, height: 92, top: ICON_TOP };

export const LANDMARKS: readonly LandmarkDefinition[] = [
  { id: 'presentation', x: 210, y: WORLD.floorY, type: 'portal', interaction: { kind: 'collision', radius: 170, hitbox: ICON_HITBOX } },
  { id: 'career', x: 1040, y: WORLD.floorY, type: 'sign', interaction: { kind: 'collision', radius: 170, hitbox: ICON_HITBOX } },
  { id: 'skills', x: 1900, y: WORLD.floorY, type: 'computer', interaction: { kind: 'collision', radius: 170, hitbox: ICON_HITBOX } },
  { id: 'contributions', x: 2760, y: WORLD.floorY, type: 'workbench', interaction: { kind: 'collision', radius: 170, hitbox: ICON_HITBOX } },
  { id: 'education', x: 3610, y: WORLD.floorY, type: 'bookshelf', interaction: { kind: 'collision', radius: 170, hitbox: ICON_HITBOX } },
  { id: 'contact', x: 4450, y: WORLD.floorY, type: 'crystal', interaction: { kind: 'collision', radius: 170, hitbox: ICON_HITBOX } },
];

export function findNearbyLandmark(player: PlayerState): LandmarkDefinition | null {
  const playerPoint = { x: player.x + player.width / 2, y: player.y + player.height };
  let nearest: LandmarkDefinition | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const landmark of LANDMARKS) {
    const distance = Math.hypot(playerPoint.x - landmark.x, playerPoint.y - landmark.y);
    if (distance <= landmark.interaction.radius && distance < nearestDistance) {
      nearest = landmark;
      nearestDistance = distance;
    }
  }

  return nearest;
}

export function findHitLandmark(
  previousPlayer: PlayerState,
  nextPlayer: PlayerState,
  landmarks: readonly LandmarkDefinition[] = LANDMARKS,
): LandmarkDefinition | null {
  return landmarks.find((landmark) => {
    const { width, height, top } = landmark.interaction.hitbox;
    const hitbox = { left: landmark.x - width / 2, right: landmark.x + width / 2, top, bottom: top + height };
    const previouslyOverlapped = overlaps(previousPlayer, hitbox);
    return !previouslyOverlapped && overlaps(nextPlayer, hitbox);
  }) ?? null;
}

function overlaps(player: PlayerState, box: { left: number; right: number; top: number; bottom: number }): boolean {
  return player.x < box.right
    && player.x + player.width > box.left
    && player.y < box.bottom
    && player.y + player.height > box.top;
}
