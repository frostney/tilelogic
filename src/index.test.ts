import TileLogic from "./index";

describe("TileLogic", function() {
  it("can be instantiated", function() {
    const t = new TileLogic();

    expect(typeof t).toBe("object");
    expect(t instanceof TileLogic).toBe(true);
  });

  it("has default values", function() {
    const t = new TileLogic();

    expect(typeof t.width).toBe("number");
    expect(typeof t.height).toBe("number");
    expect(t.width).toEqual(TileLogic.defaultWidth);
    expect(t.height).toEqual(TileLogic.defaultHeight);

    for (let i = 0, j = TileLogic.defaultWidth; i < j; i++) {
      for (let k = 0, l = TileLogic.defaultHeight; k < l; k++) {
        expect(t.tile[i][k]).toEqual(TileLogic.defaultType);
      }
    }
  });

  it("allows different data type values", function() {
    const t1 = new TileLogic(2, 2, () => "empty");
    const t2 = new TileLogic(2, 2, (x: number, y: number) => {
      if (x === 0) {
        return "empty";
      }
      return "non-empty";
    });
    const t3 = new TileLogic(2, 2, function(x: number, y: number) {
      return x + y;
    });

    expect(t1.tile[0][0]).toEqual("empty");
    expect(t1.tile[0][1]).toEqual("empty");
    expect(t1.tile[1][0]).toEqual("empty");
    expect(t1.tile[1][1]).toEqual("empty");

    expect(t2.tile[0][0]).toEqual("empty");
    expect(t2.tile[0][1]).toEqual("empty");
    expect(t2.tile[1][0]).toEqual("non-empty");
    expect(t2.tile[1][1]).toEqual("non-empty");

    expect(t3.tile[0][0]).toEqual(0);
    expect(t3.tile[0][1]).toEqual(1);
    expect(t3.tile[1][0]).toEqual(1);
    expect(t3.tile[1][1]).toEqual(2);
  });

  it(".fromArray", function() {
    const t = TileLogic.fromArray([[1, 2], [3, 4]]);

    expect(t.tile[0][0]).toEqual(1);
    expect(t.tile[0][1]).toEqual(2);
    expect(t.tile[1][0]).toEqual(3);
    expect(t.tile[1][1]).toEqual(4);
  });

  it("#forEach", function(done) {
    const t = new TileLogic(4, 4, () => "empty");

    let i = 0;

    const toBeDone = function() {
      if (t.width * t.height === i) {
        done();
      }
    };

    t.forEach(function(x, y, type) {
      expect(typeof x).toBe("number");
      expect(typeof y).toBe("number");
      expect(typeof type).toBe("string");
      i++;
      toBeDone();
    });
  });

  it("#toArray", function() {
    const t = new TileLogic(2, 2, () => "empty");

    const array = t.toArray();
    expect(Array.isArray(array)).toBe(true);
    expect(array.length).toEqual(4);
    expect(array).toEqual(["empty", "empty", "empty", "empty"]);
  });

  it("#flatten", function() {
    const t = new TileLogic(2, 2, () => "empty");

    const flattened = t.flatten();
    expect(Array.isArray(flattened)).toBe(true);
    expect(flattened.length).toEqual(4);
    expect(flattened).toEqual([
      {
        x: 0,
        y: 0,
        type: "empty"
      },
      {
        x: 0,
        y: 1,
        type: "empty"
      },
      {
        x: 1,
        y: 0,
        type: "empty"
      },
      {
        x: 1,
        y: 1,
        type: "empty"
      }
    ]);
  });

  it("#equals", function() {
    const t1 = new TileLogic(2, 2, () => "empty");
    const t2 = new TileLogic(2, 2, () => "empty");

    const t3 = new TileLogic(2, 3, () => "empty");
    const t4 = new TileLogic(3, 2, () => "empty");

    const t5 = new TileLogic(3, 3, () => "empty");

    const t6 = new TileLogic(2, 2, () => "not-empty");

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
  });
});
