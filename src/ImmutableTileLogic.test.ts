import ImmutableTileLogic from './ImmutableTileLogic';

describe('ImmutableTileLogic', function() {
  it('set', () => {
    const t = new ImmutableTileLogic<number>();
    expect(t.get({ x: 0, y: 0 })).toEqual(null);

    const t2 = t.set({ x: 0, y: 0, data: 5 });
    expect(t.get({ x: 0, y: 0 })).toEqual(null);
    expect(t2.get({ x: 0, y: 0 })).toEqual(5);
  });

  it('swap', () => {
    const t = new ImmutableTileLogic<number>();
    const t2 = t.set({ x: 0, y: 0, data: 5 });
    const t3 = t2.set({ x: 1, y: 1, data: 10 });

    const t4 = t3.swap({ x: 0, y: 0 }, { x: 1, y: 1 });

    expect(t3.get({ x: 0, y: 0 })).toEqual(5);
    expect(t3.get({ x: 1, y: 1 })).toEqual(10);
    expect(t4.get({ x: 0, y: 0 })).toEqual(10);
    expect(t4.get({ x: 1, y: 1 })).toEqual(5);
  });
});
