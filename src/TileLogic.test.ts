import TileCursor from './TileCursor';
import TileLogic from './TileLogic';

describe('TileLogic', function() {
  it('has default values', function() {
    const t = new TileLogic<number>();

    expect(typeof t.width).toBe('number');
    expect(typeof t.height).toBe('number');
    expect(t.width).toEqual(TileLogic.defaultWidth);
    expect(t.height).toEqual(TileLogic.defaultHeight);

    for (let i = 0, j = TileLogic.defaultWidth; i < j; i++) {
      for (let k = 0, l = TileLogic.defaultHeight; k < l; k++) {
        expect(t.get({ x: i, y: k })).toEqual(null);
      }
    }
  });

  it('allows different data type values', function() {
    const t2 = new TileLogic<string>(2, 2, (x: number, y: number) => {
      if (x === 0) {
        return 'empty';
      }
      return 'non-empty';
    });
    const t3 = new TileLogic<number>(2, 2, function(x: number, y: number) {
      return x + y;
    });

    expect(t2.get({ x: 0, y: 0 })).toEqual('empty');
    expect(t2.get({ x: 0, y: 1 })).toEqual('empty');
    expect(t2.get({ x: 1, y: 0 })).toEqual('non-empty');
    expect(t2.get({ x: 1, y: 1 })).toEqual('non-empty');

    expect(t3.get({ x: 0, y: 0 })).toEqual(0);
    expect(t3.get({ x: 0, y: 1 })).toEqual(1);
    expect(t3.get({ x: 1, y: 0 })).toEqual(1);
    expect(t3.get({ x: 1, y: 1 })).toEqual(2);
  });

  it('.fromArray', function() {
    const t = TileLogic.fromArray<number>([
      [1, 2],
      [3, 4],
    ]);

    expect(t.get({ x: 0, y: 0 })).toEqual(1);
    expect(t.get({ x: 0, y: 1 })).toEqual(2);
    expect(t.get({ x: 1, y: 0 })).toEqual(3);
    expect(t.get({ x: 1, y: 1 })).toEqual(4);
  });

  it('#forEach', function(done) {
    const t = new TileLogic<string>(4, 4, () => 'empty');

    let i = 0;

    const toBeDone = function() {
      if (t.width * t.height === i) {
        done();
      }
    };

    t.forEach(function(x: number, y: number, type: string) {
      expect(typeof x).toBe('number');
      expect(typeof y).toBe('number');
      expect(typeof type).toBe('string');
      i++;
      toBeDone();
    });
  });

  it('#toArray', function() {
    const t = new TileLogic<string>(2, 2, () => 'empty');

    const array = t.toArray();
    expect(Array.isArray(array)).toBe(true);
    expect(array.length).toEqual(4);
    expect(array).toEqual(['empty', 'empty', 'empty', 'empty']);
  });

  it('#get', () => {
    const t = new TileLogic<string>(2, 2, () => 'empty');

    expect(t.get({ x: 0, y: 0 })).toEqual('empty');
  });

  it('#set', () => {
    const t = new TileLogic<string>(2, 2, () => 'empty');

    t.set({ x: 1, y: 1, data: 'hello!' });

    expect(t.get({ x: 1, y: 1 })).toEqual('hello!');
  });

  it('#cursor', () => {
    const t = new TileLogic<string>(2, 2, () => 'empty');

    const cursor = t.cursor({ x: 0, y: 0 });

    expect(cursor).toBeDefined();
    expect(cursor).toBeInstanceOf(TileCursor);
  });

  it('#flatten', function() {
    const t = new TileLogic<string>(2, 2, () => 'empty');

    const flattened = t.flatten();
    expect(Array.isArray(flattened)).toBe(true);
    expect(flattened.length).toEqual(4);
    expect(flattened).toEqual([
      {
        x: 0,
        y: 0,
        data: 'empty',
      },
      {
        x: 0,
        y: 1,
        data: 'empty',
      },
      {
        x: 1,
        y: 0,
        data: 'empty',
      },
      {
        x: 1,
        y: 1,
        data: 'empty',
      },
    ]);
  });

  it('#equals', function() {
    const t1 = new TileLogic<string>(2, 2, () => 'empty');
    const t2 = new TileLogic<string>(2, 2, () => 'empty');

    const t3 = new TileLogic<string>(2, 3, () => 'empty');
    const t4 = new TileLogic<string>(3, 2, () => 'empty');

    const t5 = new TileLogic<string>(3, 3, () => 'empty');

    const t6 = new TileLogic<string>(2, 2, () => 'not-empty');

    expect(t1.equals(t2)).toEqual(true);
    expect(t2.equals(t1)).toEqual(true);

    expect(t1.equals(t3)).toEqual(false);
    expect(t3.equals(t1)).toEqual(false);

    expect(t1.equals(t4)).toEqual(false);
    expect(t4.equals(t1)).toEqual(false);

    expect(t1.equals(t5)).toEqual(false);
    expect(t5.equals(t1)).toEqual(false);

    expect(t1.equals(t6)).toEqual(false);
    expect(t6.equals(t1)).toEqual(false);

    expect(() => {
      t1.equals(null);
    }).toThrow();
  });
});
