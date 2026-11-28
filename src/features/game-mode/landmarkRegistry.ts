import type { PortfolioSectionId } from '../../types/portfolio';
import { WORLD, type PlayerState } from './platformerSimulation';

export type LandmarkType = 'portal' | 'sign' | 'computer' | 'workbench' | 'bookshelf' | 'crystal';

export interface LandmarkDefinition {
  id: PortfolioSectionId;
  x: number;
  y: number;
  type: LandmarkType;
  visual: {
    frameSize: number;
    baselineOffset: number;
  };
  interaction: {
    kind: 'proximity';
    radius: number;
  };
}

function defineLandmark(
  id: PortfolioSectionId,
  x: number,
  type: LandmarkType,
  frameSize: number,
  baselineOffset: number,
): LandmarkDefinition {
  return {
    id,
    x,
    y: WORLD.floorY,
    type,
    visual: { frameSize, baselineOffset },
    interaction: { kind: 'proximity', radius: 170 },
  };
}

export const LANDMARKS: readonly LandmarkDefinition[] = [
  defineLandmark('presentation', 210, 'portal', 160, 0),
  defineLandmark('career', 1040, 'sign', 128, 0),
  defineLandmark('skills', 1900, 'computer', 136, 5),
  defineLandmark('contributions', 2760, 'workbench', 168, 4),
  defineLandmark('education', 3610, 'bookshelf', 148, 7),
  defineLandmark('contact', 4450, 'crystal', 175, 8),
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
