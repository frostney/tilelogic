type Size = { min: number, max: number };
type ForEachIterator = (x: number, y: number, data: any) => void
type MapIterator = (x: number, y: number, data: any) => any

class TileLogic {
  tile: Array<Array<any>>
  width: Size
  height: Size

  constructor(initialWidth?, initialHeight?, data?) {
    let width: Size;
    let height: Size;

    if (typeof initialWidth === 'number') {
      width = {
        min: 0,
        max: initialWidth,
      };
    }

    if (typeof initialHeight === 'number') {
      height = {
        min: 0,
        max: initialHeight,
      };
    }

    if (width == null) {
      width = {
        min: 0,
        max: TileLogic.defaultWidth,
      };
    }

    if (height == null) {
      height = {
        min: 0,
        max: TileLogic.defaultHeight,
      };
    }

    this.tile = [];
    this.width = width;
    this.height = height;

    this.generateTiles(width, height);

    if (data != null) {
      this.each((x: number, y: number) => {
        if (typeof data === 'function') {
          this.tile[x][y] = data(x, y);
        } else {
          // If it's not an array, fill everything with the same object
          // Or every row, depending how the data object is specified
          if (Array.isArray(data)) {
            if (Array.isArray(data[x])) {
              this.tile[x][y] = data[x][y];
            } else {
              this.tile[x][y] = data[x];
            }
          } else {
            this.tile[x][y] = data;
          }
        }
      });
    }
  }

  static defaultType = 'empty';
  static defaultHeight = 4;
  static defaultWidth = 4;

  generateTiles(width: Size, height: Size) {
    for (let x = width.min, xl = width.max; x < xl; x++) {
      for (let y = height.min, yl = height.max; y < yl; y++) {
        this.tile[x] = this.tile[x] || [];
        this.tile[x].push(TileLogic.defaultType);
      }
    }
  }

  forEach(callback: ForEachIterator) {
    this.map(callback);
    return;
  }

  each(callback: ForEachIterator) {
    // TODO: This will be deprecated soon
    this.forEach(callback);
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
    return this.toArray();
  }

  flattenWithModifier() {
    // TODO: `flatten` and `flattenWithModifier` will be put together into the `flatten` function
    return this.map((x, y, content) => ({
      x,
      y,
      type: content,
    }));
  }

  equals(tileLogic) {
    let result = true;

    if (tileLogic instanceof TileLogic) {
      if (this.width.min !== tileLogic.width.min || this.width.max !== tileLogic.width.max) {
        return false;
      }

      if (this.height.min !== tileLogic.height.min || this.height.max !== tileLogic.height.max) {
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
