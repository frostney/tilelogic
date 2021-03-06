import TileCursor from './TileCursor';

type ForEachIterator<T> = (x: number, y: number, data: T) => void;
type MapIterator<T, U> = (x: number, y: number, data: T) => U;
type Reviver<T> = (x: number, y: number) => T;
type Tiles<T> = Array<Array<T>>;
export type Position = { x: number; y: number };
export type Tile<T> = Position & { data: T };

const DefaultReviver = () => null;

class TileLogic<T> {
  protected tile: Tiles<T>;

  constructor(
    public readonly width: number = TileLogic.defaultWidth,
    public readonly height: number = TileLogic.defaultHeight,
    reviver: Reviver<T> = DefaultReviver
  ) {
    this.tile = [...Array(this.height)].map((column: number, x: number) =>
      [...Array(this.width)].map((cell: number, y: number) => reviver(x, y))
    );
  }

  static defaultHeight: number = 4;
  static defaultWidth: number = 4;

  static fromArray<T>(source: Tiles<T>): TileLogic<T> {
    const width = source.length;
    const height = source[0].length;

    return new TileLogic<T>(
      width,
      height,
      (x: number, y: number) => source[x][y]
    );
  }

  forEach(callback: ForEachIterator<T>) {
    this.map(callback);
  }

  map<U>(callback: MapIterator<T, U>): Array<U> {
    const result = [];

    for (let x = 0, xl = this.tile.length; x < xl; x++) {
      for (let y = 0, yl = this.tile[x].length; y < yl; y++) {
        result.push(callback(x, y, this.tile[x][y]));
      }
    }

    return result;
  }

  toArray(): Tiles<T> {
    return this.tile;
  }

  flatten(): Array<Tile<T>> {
    return this.map<Tile<T>>((x: number, y: number, content: T) => ({
      x,
      y,
      data: content,
    }));
  }

  cursor(pos: Position): TileCursor<T> {
    return new TileCursor<T>(this, pos);
  }

  get(pos: Position): T {
    return this.tile[pos.x][pos.y];
  }

  set(tile: Tile<T>) {
    this.tile[tile.x][tile.y] = tile.data;
  }

  equals(tileLogic: TileLogic<T>): boolean {
    if (!(tileLogic instanceof TileLogic)) {
      throw new Error('Argument is not a TileLogic instance');
    }

    if (this.width !== tileLogic.width) {
      return false;
    }

    if (this.height !== tileLogic.height) {
      return false;
    }

    for (let x = 0, xl = this.tile.length; x < xl; x++) {
      for (let y = 0, yl = this.tile[x].length; y < yl; y++) {
        if (tileLogic.tile[x][y] !== this.tile[x][y]) {
          return false;
        }
      }
    }

    return true;
  }
}

export default TileLogic;
