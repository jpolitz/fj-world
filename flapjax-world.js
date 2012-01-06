function world(init, handlers, facets) {
  
  var worldChangedE = receiverE();
  var worldValueB = worldChangedE.startsWith(init);
  var handlerEvents = handlers.map(function(handler) {
    return handler[0].mapE(function(v) {
      worldChangedE.sendEvent(handler[1](worldValueB.valueNow(), v));
    });
  });

  var worldFacets = {};
  Object.keys(facets).forEach(function(k) {
    worldFacets[k] = worldValueB.liftB(facets[k]);
  });
  return worldFacets;
}

