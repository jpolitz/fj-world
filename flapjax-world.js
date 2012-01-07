function world(init, handlers) 
/*: ∀ a . a * Array<∃ b . {0: EventStream<b>, 1: a * b -> a}> -> Behavior a */
{
  return mergeE.apply(zeroE,
    handlers.map(function(handler)
    /*: ∃ b . {0: EventStream<b>, 1: a * b -> a} -> EventStream<a -> a> */
    {
      return handler[0].mapE(function(eventValue) /*: b -> (a -> a) */ {
        return function(world) /*: a -> a */ {
          return handler[1](world, eventValue);
        };
      });
    }))
   .collectE(init, function(handler, world) /*: (a -> a) * a -> a */ {
      return handler(world);
    })
   .startsWith(init);
}

