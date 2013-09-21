---
  title: Assert
  weight: 5
  render-file: false
---

    var assert = chai.assert;

    assert.typeOf(foo, 'string');
    assert.equal(foo, 'bar');
    assert.lengthOf(foo, 3)
    assert.property(tea, 'flavors');
    assert.lengthOf(tea.flavors, 3);
