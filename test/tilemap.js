'use strict';

describe('TileLogic', function() {
  
  it('is a function', function() {
    expect(TileLogic).to.be.a('function');
  });
  
  it('can be instantiated', function() {
    var t = new TileLogic();
    
    expect(t).to.be.a('object');
  });
  
  it('has default values', function() {
    var t = new TileLogic();
    
    expect(t.width).to.be.a('object');
    expect(t.height).to.be.a('object');
    expect(t.width).to.deep.equal({min: 0, max: TileLogic.defaultWidth});
    expect(t.height).to.deep.equal({min: 0, max: TileLogic.defaultHeight});
    
    for (var i = 0, j = TileLogic.defaultWidth; i < j; i++) {
      for (var k = 0, l = TileLogic.defaultHeight; k < l; k++) {
        expect(t.tile[i][k]).to.equal(TileLogic.defaultType);
      }
    }
  });
  
});