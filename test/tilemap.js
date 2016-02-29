'use strict';

describe('TileLogic', function () {
  it('is a function', function () {
    expect(TileLogic).to.be.a('function');
  });

  it('can be instantiated', function () {
    var t = new TileLogic();

    expect(t).to.be.a('object');
    expect(function() {
      TileLogic();
    }).to.throw(TypeError);
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

  it('allows different data tyüe values', function() {
    var t1 = new TileLogic(2, 2, 'empty');
    var t2 = new TileLogic(2, 2, ['empty', 'non-empty']);
    var t3 = new TileLogic(2, 2, [[1, 2], [3, 4]]);
    var t4 = new TileLogic(2, 2, function(x, y) {
      return x + y;
    });

    expect(t1.tile[0][0]).to.equal('empty');
    expect(t1.tile[0][1]).to.equal('empty');
    expect(t1.tile[1][0]).to.equal('empty');
    expect(t1.tile[1][1]).to.equal('empty');

    expect(t2.tile[0][0]).to.equal('empty');
    expect(t2.tile[0][1]).to.equal('empty');
    expect(t2.tile[1][0]).to.equal('non-empty');
    expect(t2.tile[1][1]).to.equal('non-empty');

    expect(t3.tile[0][0]).to.equal(1);
    expect(t3.tile[0][1]).to.equal(2);
    expect(t3.tile[1][0]).to.equal(3);
    expect(t3.tile[1][1]).to.equal(4);

    expect(t4.tile[0][0]).to.equal(0);
    expect(t4.tile[0][1]).to.equal(1);
    expect(t4.tile[1][0]).to.equal(1);
    expect(t4.tile[1][1]).to.equal(2);
  });

  it('#each', function(done) {
    var t = new TileLogic(4, 4, 'empty');

    var i = 0;

    var toBeDone = function() {
      if (t.width.max * t.height.max === i) {
        done();
      }
    };

    t.each(function(x, y, type) {
      expect(x).to.be.a('number');
      expect(y).to.be.a('number');
      expect(type).to.be.a('string');
      i++;
      toBeDone();
    });
  });

  it('#toArray', function() {
    var t = new TileLogic(2, 2, 'empty');

    var array = t.toArray();
    expect(array).to.be.a('array');
    expect(array.length).to.equal(4);
    expect(array).to.deep.equal(['empty', 'empty', 'empty', 'empty']);

    var flattened = t.flatten();
    expect(flattened).to.be.a('array');
    expect(flattened.length).to.equal(4);
    expect(flattened).to.deep.equal(['empty', 'empty', 'empty', 'empty']);
  });

  it('#flattenWithModifier', function () {
    var t = new TileLogic(2, 2, 'empty');

    var flattened = t.flattenWithModifier();
    expect(flattened).to.be.a('array');
    expect(flattened.length).to.equal(4);
    expect(flattened).to.deep.equal([{
      x: 0,
      y: 0,
      type: 'empty'
    }, {
      x: 0,
      y: 1,
      type: 'empty'
    }, {
      x: 1,
      y: 0,
      type: 'empty'
    }, {
      x: 1,
      y: 1,
      type: 'empty'
    }]);
  });

  it('#equals', function() {
    var t1 = new TileLogic(2, 2, 'empty');
    var t2 = new TileLogic(2, 2, 'empty');

    var t3 = new TileLogic(2, 3, 'empty');
    var t4 = new TileLogic(3, 2, 'empty');

    var t5 = new TileLogic(3, 3, 'empty');

    var t6 = new TileLogic(2, 2, 'not-empty');

    expect(t1.equals(t2)).to.equal(true);
    expect(t2.equals(t1)).to.equal(true);

    expect(t1.equals(t3)).to.equal(false);
    expect(t3.equals(t1)).to.equal(false);

    expect(t1.equals(t4)).to.equal(false);
    expect(t4.equals(t1)).to.equal(false);

    expect(t1.equals(t5)).to.equal(false);
    expect(t5.equals(t1)).to.equal(false);

    expect(t1.equals(t6)).to.equal(false);
    expect(t6.equals(t1)).to.equal(false);

    expect(function() {
      t1.equals({});
    }).to.throw(Error);
  });
});
