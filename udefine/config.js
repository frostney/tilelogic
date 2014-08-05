(function(name) {
  udefine.configure(function(root) {
    udefine.inject.add(name, {
      root: root,
      name: 'Tilemap'
    });
  });
})('tilemap');