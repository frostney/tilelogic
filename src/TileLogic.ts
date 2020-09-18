type ForEachIterator<T> = (x: number, y: number, data: T) => void;
type MapIterator<T, U> = (x: number, y: number, data: T) => U;
type Reviver<T> = (x: number, y: number) => T;
type Tiles<T> = Array<Array<T>>;
type Position = { x: number, y: number };
export type Tile<T> = Position & { data: T };

const DefaultReviver = () => null;

class TileLogic<T> {
  protected tile: Tiles<T>;

  constructor(
    public width: number = TileLogic.defaultWidth,
    public height: number = TileLogic.defaultHeight,
    reviver: Reviver<T> = DefaultReviver
  ) {
    this.tile = [...Array(this.height)].map((column, x) =>
      [...Array(this.width)].map((cell, y) => reviver(x, y))
    );
  }

  static defaultHeight = 4;
  static defaultWidth = 4;

  static fromArray<T>(source: Tiles<T>): TileLogic<T> {
    const width = source.length;
    const height = source[0].length;

    return new TileLogic<T>(width, height, (x, y) => source[x][y]);
  }

  forEach(callback: ForEachIterator<T>) {
    this.map(callback);
  }

  map<U>(callback: MapIterator<T, U>): Array<U> {
    const result = [];

    for (let x = 0, xl = this.tile.length; x < xl; x++) {
      (tileY => {
        for (let y = 0, yl = tileY.length; y < yl; y++) {
          result.push(callback(x, y, this.tile[x][y]));
        }
      })(this.tile[x]);
    }

    return result;
  }

  toArray(): Array<T> {
    return this.map<T>((x, y, content) => content);
  }

  flatten(): Array<Tile<T>> {
    return this.map<Tile<T>>((x, y, content) => ({
      x,
      y,
      data: content
    }));
  }

  get(pos: Position): T {
    return this.tile[pos.x][pos.y];
  }

  set(tile: Tile<T>) {
    this.tile[tile.x][tile.y] = tile.data;
  }

  equals(tileLogic: TileLogic<T>): boolean {
    let result = true;

    if (tileLogic instanceof TileLogic) {
      if (this.width !== tileLogic.width) {
        return false;
      }

      if (this.height !== tileLogic.height) {
        return false;
      }

      for (let x = 0, xl = this.tile.length; x < xl; x++) {
        (tileY => {
          for (let y = 0, yl = tileY.length; y < yl; y++) {
            if (tileLogic.tile[x][y] !== this.tile[x][y]) {
              result = false;
              return;
            }
          }
        })(this.tile[x]);
      }
    } else {
      throw new Error("Argument is not a TileLogic instance");
    }

    return result;
  }
}

export default TileLogic;
