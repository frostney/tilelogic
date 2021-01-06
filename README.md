# tilelogic

![](https://github.com/actions/frostney/tilelogic/workflows/.github/workflows/nodejs/badge.svg)

Provides logic for tilemaps. There is no actual drawing involved, that is something you need to do for yourself.

## Features

- Small and simple
- Provides _only_ the logic for tilemaps
- No dependencies

## Installing

```
npm install tilelogic
```

(or if you prefer Yarn it would be `yarn add tilelogic`)

## Constructing a tilemap

```javascript
import { TileLogic } from 'tilelogic';

var tileLogic = new TileLogic(10, 10);
// Creates a 10 by 10 tilemap
```

By default all tiles will be filled with `null`.
In order to fill the tile map with the values you would like you would need to provide a third parameter (a so-called reviver) which is a function that provides the x and y coordinate and needs to return the data

```javascript
const tileLogic = new TileLogic(4, 4, (x, y) => {
  if (x === 0 && y === 0) {
    return 'Hello';
  }

  return 'World';
});
```

If you are using TypeScript, TileLogic is using generics to set the type of the tiles

```typescript
const tileLogic = new TileLogic<string>(4, 4, () => 'Hello World');
```

## Accessing a tile

Tiles can be accessed through a convienent `get` method.

```javascript
tilelogic.get({ x: 0, y: 0 }); // < The content at position x: 0 y: 0
```

## Setting content in a tile

```javascript
tileLogic.set({ x: 0, y: 0, content: 'Hello!' }); // < The content of the tile at position x: 0 y: 0 will now be "Hello"
```

## Helper functions

### `#forEach`

Iterates through the tilemap without modifying it. Starts at the top-left tile and goes through it row by row.

```javascript
tilemap.forEach(function(x: number, y: number, tile: T) {
  // Iterate through the tilemap
  // x and y are the current position
  // tile is the content of each tile
});
```

### `#map`

Iterates through the tilemap and returning

```javascript
tilemap.map(function(x, y, tile) {
  // Iterate through the tilemap
  // x and y are the current position
  // tile is the content of each tile
  return x;
});
// We now get an array with all the x-values
```

### `#toArray`

Returns a two-dimensional array with the data stored in the tile map.

### `.fromArray`

Takes in a two-dimensional array and returns a TileLogic instance

```typescript
const tiles = [
  [2, 2],
  [1, 1],
];

const tileLogic = TileLogic.fromArray<number>(tiles);
```

### `#equals`

Compare two tilemaps with each other and returns `true` if they match.

```javascript
tilemap.equals(new TileMap(10, 10));
```

### `#flatten`

Flattens the tile map into a one-dimensional array to make it easier to draw either on the DOM or canvas.

```javascript
tilemap.flatten(); // Returns an array with the content of each tile
```

## Immutable TileLogic

This library also exports an immutable version of TileLogic where any change to its data returns a new instance. `ImmutableTileLogic` includes all functionality from `TileLogic` as well as some extra helpful tools

```typescript
import { ImmutableTileLogic } from 'tilelogic';

const tileLogic = new ImmutableTileLogic<string>(4, 4, () => 'Hello');

const newTileLogic = tileLogic.set({ x: 2, y: 2, data: 'World' }); //< Returns a new instance and leaves the original untouched

const otherTileLogic = newTileLogic.swap({ x: 2, y: 2 }, { x: 0, y: 0 }); //< Returns a new instance where x: 2 y: 2 and x: 0 y: 0 have been swapped and 'World' is now at position x: 0 y: 0
```

## Using a cursor to navigate

TileLogic also provides a cursor to navigate inside the tilemap. It is read-only and is not able to modify the tile map directly.

```typescript
const tileLogic = new TileLogic<string>(4, 4, () => 'Hello');

const cursor = tileLogic.cursor({ x: 0, y: 0 });

cursor.content(); // < Returns 'Hello'
```

The cursor provides `up`, `down`, `right`, `left` and `move` methods to move in any direction.

## License

Tilelogic is public domain. If this does not work for you, you can alternatively use the MIT license.
