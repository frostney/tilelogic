import ImmutableTileLogic from './ImmutableTileLogic';

describe('ImmutableTileLogic', function() {
  it('set', () => {
    const t = new ImmutableTileLogic<number>();
    expect(t.get({ x: 0, y: 0 })).toEqual(null);

    const t2 = t.set({ x: 0, y: 0, data: 5 });
    expect(t.get({ x: 0, y: 0 })).toEqual(null);
    expect(t2.get({ x: 0, y: 0 })).toEqual(5);
  });
});
