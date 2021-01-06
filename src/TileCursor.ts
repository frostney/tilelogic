import TileLogic, { Position } from './TileLogic';

type OptionalPosition = { x?: number; y?: number };

const clamp = (min: number, max: number) => (value: number) => {
  if (value <= min) {
    return min;
  }

  if (value >= max) {
    return max;
  }

  return value;
};

class TileCursor<T> {
  constructor(
    private context: TileLogic<T>,
    public readonly position: Position
  ) {}

  private clampWidth(value: number): number {
    return clamp(0, this.context.width - 1)(value);
  }

  private clampHeight(value: number): number {
    return clamp(0, this.context.height - 1)(value);
  }

  content(): T {
    return this.context.get(this.position);
  }

  move(delta: OptionalPosition): TileCursor<T> {
    return new TileCursor<T>(this.context, {
      x: this.clampWidth(this.position.x + (delta.x || 0)),
      y: this.clampHeight(this.position.y + (delta.y || 0)),
    });
  }

  up(): TileCursor<T> {
    return this.move({ y: -1 });
  }

  down(): TileCursor<T> {
    return this.move({ y: 1 });
  }

  right(): TileCursor<T> {
    return this.move({ x: 1 });
  }

  left(): TileCursor<T> {
    return this.move({ x: -1 });
  }
}

export default TileCursor;
