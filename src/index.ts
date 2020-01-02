type ForEachIterator = (x: number, y: number, data: any) => void;
type MapIterator = (x: number, y: number, data: any) => any;
type Reviver = (x: number, y: number) => any;
type Tiles = Array<Array<any>>;

const DefaultReviver = () => TileLogic.defaultType;

class TileLogic {
  tile: Tiles;

  constructor(
    public width: number = TileLogic.defaultWidth,
    public height: number = TileLogic.defaultHeight,
    reviver: Reviver = DefaultReviver
  ) {
    this.tile = [...Array(this.width)].map((row, x) =>
      [...Array(this.height)].map((cell, y) => reviver(x, y))
    );
  }

  static defaultType = "empty";

  static defaultHeight = 4;

  static defaultWidth = 4;

  static fromArray(source: Tiles): TileLogic {
    const width = source.length;
    const height = source[0].length;

    return new TileLogic(width, height, (x, y) => source[x][y]);
  }

  forEach(callback: ForEachIterator) {
    this.map(callback);
  }

  map(callback: MapIterator): Array<any> {
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

  toArray(): Array<Array<any>> {
    return this.map((x, y, content) => content);
  }

  flatten(): Array<{x: number, y: number, type: any}> {
    return this.map((x, y, content) => ({
      x,
      y,
      type: content
    }));
  }

  equals(tileLogic: TileLogic): boolean {
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
