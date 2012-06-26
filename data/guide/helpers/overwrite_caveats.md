---
  title: Overwriting Caveats
  weight: 80
  render-file: false
---

### Overwriting Caveats

Given all that can be done, the major caveat to be aware of is that
methods as properties defined with `addChainableMethod` cannot be fully 
overwritten. There is no `overwriteChainableMethod`, as the current implementation
does not permit us to "look ahead" and get the `_super` of the method 
aspect of an assertion's implementation. As such, it is best to stay
away from overwriting any chainable method. In core, these currently are
`a`, `an`, `contain`, `include`, and `length`. 

Some plugins also use this functionality, so be sure to fully inspect the
implementation of an assertion before attempting to overwrite it.
