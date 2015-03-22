(function() {

  var factory = function() {
    var TileLogic = (function() {

      var TileLogic = function(width, height, data) {
        if (typeof width === 'number') {
          width = {
            min: 0,
            max: width
          };
        }

        if (typeof height === 'number') {
          height = {
            min: 0,
            max: height
          };
        }

        if (width == null) {
          width = {
            min: 0,
            max: 4
          };
        }

        if (height == null) {
          height = {
            min: 0,
            max: 4
          };
        }

        this.tile = [];
        this.width = width;
        this.height = height;

        this.generateTiles(width, height);

        var self = this;

        if (data != null) {
          this.each(function(x, y) {
            if (typeof data === 'function') {
              self.tile[x][y] = data(x, y);
            } else {
              // If it's not an array, fill everything with the same object
              // Or every row, depending how the data object is specified
              if (Array.isArray(data)) {
                if (Array.isArray(data[x])) {
                  self.tile[x][y] = data[x][y];              
                } else {
                  self.tile[x][y] = data[x];
                }
              } else {
                self.tile[x][y] = data;
              }  
            }                 
          });
        }
      };

      TileLogic.defaultType = 'empty';

      TileLogic.prototype.generateTiles = function(width, height) {
        for (var x = width.min, xl = width.max; x < xl; x++) {
          for (var y = height.min, yl = height.max; y < yl; y++) {
            this.tile[x] = this.tile[x] || [];
            this.tile[x].push(TileLogic.defaultType);
          }
        }
      };

      TileLogic.prototype.each = TileLogic.prototype.forEach = function(callback) {
        this.map(callback);
        return;
      };

      TileLogic.prototype.map = function(callback) {
        var result = [];

        var tile = this.tile;
        for (var x = 0, xl = tile.length; x < xl; x++) {
          (function(tileY) {
            for (var y = 0, yl = tileY.length; y < yl; y++) {
              result.push(callback(x, y, tile[x][y]));
            }
          })(tile[x]);
        }

        return result;
      };

      TileLogic.prototype.flatten = function() {
        return this.map(function(x, y, content) {
          return content;
        });
      };

      TileLogic.prototype.flattenWithModifier = function() {
        return this.map(function(x, y, content) {
          return {
            x: x,
            y: y,
            type: content
          };
        });
      };

      TileLogic.prototype.equals = function(TileLogic) {
        var result = true;

        if (TileLogic instanceof TileLogic) {
          var tile = this.tile;
          for (var x = 0, xl = tile.length; x < xl; x++) {
            (function(tileY) {
              for (var y = 0, yl = tileY.length; y < yl; y++) {
                if (TileLogic.tile[x][y] !== tile[x][y]) {
                  result = false;
                  return;
                }
              }
            })(tile[x]);
          }
        } else {
            throw new Error('Argument is not a tile map');
          }

        return result;
      };

      return TileLogic;

    })();
    
    return TileLogic;
  };
  

  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    if (typeof exports !== null) {
      module.exports = factory();
    } else {
      window.TileLogic = factory();
    }
  }

}).call(this);