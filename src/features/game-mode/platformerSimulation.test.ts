import { describe, expect, it } from 'vitest';
import {
  PHYSICS,
  WORLD,
  createPlayer,
  stepCamera,
  stepPlayer,
} from './platformerSimulation';

describe('platformer simulation', () => {
  it('accelerates continuously and decelerates after input release', () => {
    let player = { ...createPlayer(), y: createPlayer().y - 100, grounded: false };
    player = stepPlayer(player, { direction: 1, jumpPressed: false }, 0.1);
    expect(player.x).toBeGreaterThan(105);
    expect(player.vx).toBeGreaterThan(0);
    const beforeRelease = player.x;
    player = stepPlayer(player, { direction: 0, jumpPressed: false }, 0.03);
    expect(player.x).toBeGreaterThan(beforeRelease);
    expect(player.vx).toBeLessThan(PHYSICS.maxSpeed);
  });

  it('applies gravity, permits one grounded jump, and lands on the floor', () => {
    let player = { ...createPlayer(), y: createPlayer().y - 100, grounded: false };
    player = stepPlayer(player, { direction: 0, jumpPressed: false }, 0.02);
    expect(player.vy).toBeGreaterThan(0);

    player = createPlayer();
    player = stepPlayer(player, { direction: 0, jumpPressed: true }, 0.02);
    expect(player.grounded).toBe(false);
    expect(player.vy).toBeLessThan(0);
    const airborneY = player.y;
    player = stepPlayer(player, { direction: 0, jumpPressed: true }, 0.02);
    expect(player.y).toBeLessThan(airborneY);

    for (let frame = 0; frame < 120 && !player.grounded; frame += 1) {
      player = stepPlayer(player, { direction: 0, jumpPressed: false }, 1 / 60);
    }
    expect(player.grounded).toBe(true);
    expect(player.y + player.height).toBe(WORLD.floorY);
    expect(player.vy).toBe(0);
  });

  it('clamps the player at world boundaries and discards excessive frame deltas', () => {
    let player = { ...createPlayer(0), y: createPlayer(0).y - 100, grounded: false };
    player = { ...player, vx: -PHYSICS.maxSpeed };
    player = stepPlayer(player, { direction: -1, jumpPressed: false }, 10);
    expect(player.x).toBe(0);
    expect(player.vx).toBe(0);
    expect(player.vy).toBe(105);
    expect(player.y).toBeLessThan(WORLD.floorY);
  });

  it('smoothly follows the player while clamping the camera to the world', () => {
    const player = { ...createPlayer(2200), vx: 0 };
    const camera = stepCamera({ x: 0 }, player, 1800, 1 / 60);
    expect(camera.x).toBeGreaterThan(0);
    expect(camera.x).toBeLessThan(2200);

    let atEnd = { x: 0 };
    for (let frame = 0; frame < 40; frame += 1) {
      atEnd = stepCamera(atEnd, createPlayer(WORLD.width), 1800, 1 / 20);
    }
    expect(atEnd.x).toBe(WORLD.width - 1800);
    const atStart = stepCamera({ x: 10 }, createPlayer(0), 1800, 1);
    expect(atStart.x).toBeGreaterThanOrEqual(0);
    expect(atStart.x).toBeLessThan(10);
    expect(stepCamera({ x: 0 }, player, 1800, 1 / 60, WORLD, true).x).toBe(1328);
  });
});
