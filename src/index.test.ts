import { TileLogic, ImmutableTileLogic } from './index';

describe('Given a TileLogic module', () => {
  it('should export a TileLogic class', () => {
    expect(TileLogic).toBeDefined();
  });

  it('should export an ImmutableTileLogic class', () => {
    expect(ImmutableTileLogic).toBeDefined();
  });
});
