import TileCursor from './TileCursor';
import TileLogic from './TileLogic';

describe('TileCursor', () => {
  let tileLogic;
  let tileCursor;

  beforeEach(() => {
    tileLogic = new TileLogic<string>(
      4,
      4,
      (x: number, y: number) => `x${x}-y${y}`
    );
    tileCursor = new TileCursor<string>(tileLogic, { x: 1, y: 1 });
  });

  it('returns the correct position', () => {
    expect(tileCursor.position.x).toBe(1);
    expect(tileCursor.position.y).toBe(1);
  });

  it('returns the correct content', () => {
    expect(tileCursor.content()).toBe('x1-y1');
  });

  it('can move up', () => {
    expect(tileCursor.up().content()).toBe('x1-y0');
  });

  it('can move down', () => {
    expect(tileCursor.down().content()).toBe('x1-y2');
  });

  it('can move left', () => {
    expect(tileCursor.left().content()).toBe('x0-y1');
  });

  it('can move right', () => {
    expect(tileCursor.right().content()).toBe('x2-y1');
  });

  it('can move in any direction', () => {
    expect(tileCursor.move({ x: 0, y: 0 }).position).toEqual({ x: 1, y: 1 });
    expect(tileCursor.move({ x: 0 }).position).toEqual({ x: 1, y: 1 });
    expect(tileCursor.move({ y: 0 }).position).toEqual({ x: 1, y: 1 });

    expect(tileCursor.move({ x: 1, y: 1 }).position).toEqual({ x: 2, y: 2 });
    expect(tileCursor.move({ x: -1, y: -1 }).position).toEqual({ x: 0, y: 0 });

    expect(tileCursor.move({ x: -2, y: -2 }).position).toEqual({ x: 0, y: 0 });
    expect(tileCursor.move({ x: 10, y: 10 }).position).toEqual({ x: 3, y: 3 });
  });
});
