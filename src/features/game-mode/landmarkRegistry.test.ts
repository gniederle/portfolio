import { describe, expect, it } from 'vitest';
import { sectionOrder } from '../../navigation/sections';
import { findNearbyLandmark, LANDMARKS } from './landmarkRegistry';
import { createPlayer, stepPlayer } from './platformerSimulation';

describe('game landmark registry', () => {
  it('defines exactly the six approved sections with unique ids and interaction configuration', () => {
    expect(LANDMARKS.map(({ id }) => id)).toEqual(sectionOrder);
    expect(new Set(LANDMARKS.map(({ id }) => id)).size).toBe(6);
    expect(LANDMARKS.every(({ interaction, visual }) =>
      interaction.kind === 'proximity'
      && interaction.radius > 0
      && visual.frameSize > 0
      && visual.baselineOffset >= 0,
    )).toBe(true);
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

  it('allows the player to pass through a landmark without opening a card', () => {
    let player = createPlayer(105);
    for (let frame = 0; frame < 60; frame += 1) {
      player = stepPlayer(player, { direction: 1, jumpPressed: false }, 1 / 60);
    }
    expect(player.x).toBeGreaterThan(LANDMARKS[0].x + 98);
    expect(findNearbyLandmark(player)).toBeNull();
  });
});
