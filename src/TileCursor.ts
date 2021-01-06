import TileLogic, { Position } from './TileLogic';

type OptionalPosition = { x?: number; y?: number };
type PositionCallback = (pos: Position) => OptionalPosition;
const changePosition = (position: Position = { x: 0, y: 0 }) => (
  callback: PositionCallback = (p: Position) => p
): Position => {
  return { ...position, ...callback(position) };
};

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
    return new TileCursor<T>(
      this.context,
      changePosition(this.position)((pos: Position) => ({
        x: this.clampWidth(pos.x + (delta.x || 0)),
        y: this.clampHeight(pos.y + (delta.y || 0)),
      }))
    );
  }

  up(): TileCursor<T> {
    return new TileCursor<T>(
      this.context,
      changePosition(this.position)((pos: Position) => ({
        y: this.clampHeight(pos.y - 1),
      }))
    );
  }

  down(): TileCursor<T> {
    return new TileCursor<T>(
      this.context,
      changePosition(this.position)((pos: Position) => ({
        y: this.clampHeight(pos.y + 1),
      }))
    );
  }

  right(): TileCursor<T> {
    return new TileCursor<T>(
      this.context,
      changePosition(this.position)((pos: Position) => ({
        x: this.clampWidth(pos.x + 1),
      }))
    );
  }

  left(): TileCursor<T> {
    return new TileCursor<T>(
      this.context,
      changePosition(this.position)((pos: Position) => ({
        x: this.clampWidth(pos.x - 1),
      }))
    );
  }
}

export default TileCursor;
