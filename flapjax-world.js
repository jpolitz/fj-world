function world(init, handlers, facets) {
  var handlerEvents = mergeE.apply(null,
    handlers.map(function(handler) {
      return handler[0].mapE(function(eventValue) {
        return function(world) { return handler[1](world, eventValue); };
      });
    })
  );

  var worldValueB = handlerEvents.collectE(
    init,
    function(handler, world) { return handler(world); }
  ).startsWith(init);

  var worldFacets = {};
  Object.keys(facets).forEach(function(k) {
    worldFacets[k] = worldValueB.liftB(facets[k]);
  });
  return worldFacets;
}

