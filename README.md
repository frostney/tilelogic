tilelogic
=========

Provides logic for tilemaps. There is no actual drawing involved, that is something you need to do for yourself.

```javascript
var tilemap = new TileLogic(10, 10);
// Creates a 10 by 10 tilemap
```



Helper functions
```javascript
tilemap.each(function(x, y, tile) {

});
```

```javascript
tilemap.map(function(x, y, tile) {

});
```

Compare two tilemaps with each other
```javascript
tilemap.equals(new TileMap(10, 10));
```

License
-------
Tilelogic is public domain. If this does not work for you, you can alternatively use the MIT license.