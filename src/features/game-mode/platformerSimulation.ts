export interface WorldBounds {
  width: number;
  height: number;
  floorY: number;
}

export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  grounded: boolean;
  facing: -1 | 1;
}

export interface CameraState {
  x: number;
}

export interface MovementInput {
  direction: -1 | 0 | 1;
  jumpPressed: boolean;
}

export const WORLD: WorldBounds = { width: 4800, height: 1600, floorY: 1270 };
export const PLAYER_SIZE = { width: 56, height: 140 };
export const PHYSICS = {
  acceleration: 1800,
  maxSpeed: 420,
  deceleration: 2200,
  gravity: 2100,
  jumpVelocity: 720,
  maxFrameDelta: 1 / 20,
  cameraSmoothing: 8,
} as const;

export function createPlayer(x = 105, world: WorldBounds = WORLD): PlayerState {
  return {
    x: clamp(x, 0, world.width - PLAYER_SIZE.width),
    y: world.floorY - PLAYER_SIZE.height,
    vx: 0,
    vy: 0,
    ...PLAYER_SIZE,
    grounded: true,
    facing: 1,
  };
}

export function stepPlayer(
  player: PlayerState,
  input: MovementInput,
  elapsedSeconds: number,
  world: WorldBounds = WORLD,
): PlayerState {
  const dt = clamp(elapsedSeconds, 0, PHYSICS.maxFrameDelta);
  let vx = player.vx;

  if (input.direction !== 0) {
    vx = approach(vx, input.direction * PHYSICS.maxSpeed, PHYSICS.acceleration * dt);
  } else {
    vx = approach(vx, 0, PHYSICS.deceleration * dt);
  }

  let vy = player.vy;
  let grounded = player.grounded;
  if (input.jumpPressed && grounded) {
    vy = -PHYSICS.jumpVelocity;
    grounded = false;
  }

  const previousBottom = player.y + player.height;
  let x = clamp(player.x + vx * dt, 0, world.width - player.width);
  vy += PHYSICS.gravity * dt;
  let y = player.y + vy * dt;
  const bottom = y + player.height;

  if (vy >= 0 && previousBottom <= world.floorY && bottom >= world.floorY) {
    y = world.floorY - player.height;
    vy = 0;
    grounded = true;
  } else {
    grounded = false;
  }

  if ((x === 0 && vx < 0) || (x === world.width - player.width && vx > 0)) vx = 0;

  return {
    ...player,
    x,
    y,
    vx,
    vy,
    grounded,
    facing: input.direction === 0 ? player.facing : input.direction,
  };
}

export function stepCamera(
  camera: CameraState,
  player: PlayerState,
  viewportWorldWidth: number,
  elapsedSeconds: number,
  world: WorldBounds = WORLD,
  reduceMotion = false,
): CameraState {
  const maxX = Math.max(0, world.width - viewportWorldWidth);
  const target = clamp(player.x + player.width / 2 - viewportWorldWidth / 2, 0, maxX);
  const dt = clamp(elapsedSeconds, 0, PHYSICS.maxFrameDelta);
  const blend = reduceMotion ? 1 : 1 - Math.exp(-PHYSICS.cameraSmoothing * dt);
  const currentX = clamp(camera.x, 0, maxX);
  const x = currentX + (target - currentX) * blend;
  return { x: Math.abs(target - x) < 0.01 ? target : x };
}

function approach(value: number, target: number, amount: number): number {
  if (value < target) return Math.min(value + amount, target);
  if (value > target) return Math.max(value - amount, target);
  return target;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
