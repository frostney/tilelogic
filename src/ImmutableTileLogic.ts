import TileLogic, { Tile } from './TileLogic';

class ImmutableTileLogic<T> extends TileLogic<T> {
    set(tile: Tile<T>): ImmutableTileLogic<T> {
        return new ImmutableTileLogic<T>(this.width, this.height, (x: number, y: number) => {
            if (x === tile.x && y === tile.y) {
                return tile.data;
            }

            return this.tile[x][y];
        });
    }
}

export default ImmutableTileLogic;