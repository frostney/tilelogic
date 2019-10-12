type ForEachIterator = (x: number, y: number, data: any) => void
type MapIterator = (x: number, y: number, data: any) => any
type Reviver = (x: number, y: number) => any

const DefaultReviver = () => TileLogic.defaultType;

class TileLogic {
  tile: Array<Array<any>>

  constructor(public width: number = TileLogic.defaultWidth, public height: number = TileLogic.defaultHeight, reviver: Reviver = DefaultReviver) {
    this.tile = [...Array(this.width)].map((row, x) => 
      [...Array(this.height)].map((cell, y) => reviver(x, y))
    );
  }

  static defaultType = 'empty';
  static defaultHeight = 4;
  static defaultWidth = 4;

  forEach(callback: ForEachIterator) {
    this.map(callback);
    return;
  }

  map(callback: MapIterator) {
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

  toArray() {
    return this.map((x, y, content) => content);
  }

  flatten() {
    return this.map((x, y, content) => ({
      x,
      y,
      type: content,
    }));
  }

  equals(tileLogic: TileLogic) {
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
      throw new Error('Argument is not a TileLogic instance');
    }

    return result;
  }
}

export default TileLogic;
