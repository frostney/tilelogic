# tilelogic

[![Build Status](https://travis-ci.org/frostney/tilelogic.svg?branch=master)](https://travis-ci.org/frostney/tilelogic)
[![Dependency Status](https://david-dm.org/frostney/tilelogic.svg)](https://david-dm.org/frostney/tilelogic)
[![devDependency Status](https://david-dm.org/frostney/tilelogic/dev-status.svg)](https://david-dm.org/frostney/tilelogic#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/frostney/tilelogic/badge.svg?branch=master)](https://coveralls.io/github/frostney/tilelogic?branch=master)

Provides logic for tilemaps. There is no actual drawing involved, that is something you need to do for yourself.

Demo: http://jsfiddle.net/dzr34wnv/  

## Features
* Small and simple
* Provides *only* the logic for tilemaps
* No dependencies

## Installing
```
npm install tilelogic
```

Don't use NPM? Just grab the `tilelogic.umd.js` file from the `dist` folder or use it from NPMCDN: `https://npmcdn.com/tilelogic/dist/tilelogic.umd.js`.

## Constructing a tilemap

```javascript
var tilemap = new TileLogic(10, 10);
// Creates a 10 by 10 tilemap
```
By default all tiles will be filled with the value of `TileLogic.defaultTile`, which is `"empty"` by default.

If a third parameter is provided as the constructor, it will be filled with that data.
```javascript
// Here we fill the tilemap with the complete data we provided as the third parameter
var t2 = new TileLogic(2, 2, [[0, 1], [1, 2]]); // > [[0, 1], [1, 2]]

// Fill rows with same data
var t3 = new TileLogic(2, 2, [2, 4]); // > [[2, 2], [4, 4]]

// We can provide a function to allow for more dynamic data generation
var t4 = new TileLogic(2, 2, function(x, y) {
    return (x % 2 === 0) ? y * 2 : y * x * 2;
});
```


## Accessing a tile
All tiles can be accessed through the `tile` property, which is the tile array.

`tilemap.tile[0][0]` for example accesses the top-left tile.

## Helper functions

### Each
```javascript
tilemap.each(function(x, y, tile) {
    // Iterate through the tilemap
    // x and y are the current position
    // tile is the content of each tile
});
```

### Map
```javascript
tilemap.map(function(x, y, tile) {
    // Iterate through the tilemap
    // x and y are the current position
    // tile is the content of each tile
    return x;
});
// We now get an array with all the x-values
```

### Equals
Compare two tilemaps with each other
```javascript
tilemap.equals(new TileMap(10, 10));
```

### Flatten
Flattens the tile to make it easier to draw either on the DOM or canvas.
```javascript
tilemap.flatten(); // Returns an array with the content of each tile
```

```javascript
tilemap.flattenWithModifier(); // Returns an array with items in the structure {x, y, content}
```

## License
Tilelogic is public domain. If this does not work for you, you can alternatively use the MIT license.
