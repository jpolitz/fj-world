function world(init, handlers, facets) {
  return mergeE.apply(null,
    handlers.map(function(handler) {
      return handler[0].mapE(function(eventValue) {
        return function(world) { return handler[1](world, eventValue); };
      });
    }))
   .collectE(init, function(handler, world) { return handler(world); })
   .startsWith(init);
}

