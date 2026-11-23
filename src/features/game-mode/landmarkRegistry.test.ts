import { describe, expect, it } from 'vitest';
import { sectionOrder } from '../../navigation/sections';
import { findHitLandmark, findNearbyLandmark, LANDMARKS } from './landmarkRegistry';
import { createPlayer, stepPlayer } from './platformerSimulation';

describe('game landmark registry', () => {
  it('defines exactly the six approved sections with unique ids and interaction configuration', () => {
    expect(LANDMARKS.map(({ id }) => id)).toEqual(sectionOrder);
    expect(new Set(LANDMARKS.map(({ id }) => id)).size).toBe(6);
    expect(LANDMARKS.every(({ interaction }) => interaction.kind === 'collision' && interaction.hitbox.width > 0)).toBe(true);
  });

  it('detects a nearby landmark using player and landmark world coordinates', () => {
    expect(findNearbyLandmark(createPlayer())?.id).toBe('presentation');
    expect(findNearbyLandmark(createPlayer(1040))?.id).toBe('career');
  });

  it('returns no landmark when the player is outside the configured radius', () => {
    expect(findNearbyLandmark(createPlayer(600))).toBeNull();
  });

  it('does not change its result based on camera or viewport coordinates', () => {
    const player = createPlayer(1040);
    expect(findNearbyLandmark(player)?.id).toBe('career');
  });

  it('activates when the moving player overlaps the icon hitbox, not at jump start', () => {
    let player = createPlayer(210 - 28);
    let hit = findHitLandmark(player, player);
    expect(hit).toBeNull();

    for (let frame = 0; frame < 30 && !hit; frame += 1) {
      const next = stepPlayer(player, { direction: 0, jumpPressed: frame === 0 }, 1 / 60);
      hit = findHitLandmark(player, next);
      player = next;
    }

    expect(hit?.id).toBe('presentation');
  });

  it('does not activate a distant icon when the player jumps', () => {
    let player = createPlayer(600);
    let hit: ReturnType<typeof findHitLandmark> = null;
    for (let frame = 0; frame < 45 && !hit; frame += 1) {
      const next = stepPlayer(player, { direction: 0, jumpPressed: frame === 0 }, 1 / 60);
      hit = findHitLandmark(player, next);
      player = next;
    }
    expect(hit).toBeNull();
  });

  it('does not emit a second hit while the player remains inside the same icon', () => {
    let player = createPlayer(210 - 28);
    let hit: ReturnType<typeof findHitLandmark> = null;
    for (let frame = 0; frame < 30 && !hit; frame += 1) {
      const next = stepPlayer(player, { direction: 0, jumpPressed: frame === 0 }, 1 / 60);
      hit = findHitLandmark(player, next);
      player = next;
    }
    expect(hit?.id).toBe('presentation');
    expect(findHitLandmark(player, player)).toBeNull();
  });
});
