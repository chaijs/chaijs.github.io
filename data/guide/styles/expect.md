---
  title: Expect
  weight: 5
  render-file: false
---

## BDD

<a href="/api/bdd" class="clean-button">View full BDD API</a>

The BDD style comes in two flavors: `expect` and `should`. Both use the same
chainable language to construct assertions, but they differ in the way an
assertion is initially constructed. In the case of `should`, there are also
some caveats and additional tools to overcome the caveats. 

### Expect

The BDD style is exposed through `expect` or `should` interfaces. In both
scenarios, you chain together natural language assertions.

    var expect = require('chai').expect
      , foo = 'bar'
      , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.length(3);
    expect(beverages).to.have.property('tea').with.length(3);

Expect also allows you to include arbitrary messages to prepend to any failed
assertions that might occur. 

    var answer = 43;

    // AssertionError: expected 43 to equal 42.
    expect(answer).to.equal(42); 

    // AssertionError: topic [answer]: expected 43 to equal 42.
    expect(answer, 'topic [answer]').to.equal(42);

This comes in handy when being used with nondescript topics such as 
booleans or numbers.
