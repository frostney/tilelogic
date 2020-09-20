import TileLogic, { Tile, Position } from './TileLogic';

class ImmutableTileLogic<T> extends TileLogic<T> {
    set(tile: Tile<T>): ImmutableTileLogic<T> {
        return new ImmutableTileLogic<T>(this.width, this.height, (x: number, y: number) => {
            if (x === tile.x && y === tile.y) {
                return tile.data;
            }

            return this.tile[x][y];
        });
    }

    swap(from: Position, to: Position) {
        const fromTile = this.get(from);
        const toTile = this.get(to);

        return new ImmutableTileLogic<T>(this.width, this.height, (x: number, y: number) => {
            if (x === from.x && y === from.y) {
                return toTile;
            }

            if (x === to.x && y === to.y) {
                return fromTile;
            }

            return this.tile[x][y];
        });
    }
}

export default ImmutableTileLogic;