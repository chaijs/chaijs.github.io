---
  title: Using Chai with ESM and Plugins
  layout: guide
  bodyClass: guide
  weight: 0
  order: 20
  headings:
    - Importing Chai
    - Using Plugins
    - Exposing Globals in Plugins
---

# Using Chai with ESM and Plugins

This guide provides an overview of how to use Chai with ECMAScript modules (ESM) and plugins, including examples using the `chai-http` plugin.

## Importing Chai

To use Chai with ESM, you can import Chai in your test files using the `import` statement. Here's how you can import the `expect` interface:

```javascript
import { expect } from 'chai';
```

## Using Plugins

Chai plugins can extend Chai's capabilities. To use a plugin, you first need to install it, then use the `use` method to load it. Here's how to use the `chai-http` plugin as an example:

```javascript
import chai from 'chai';
import { request }, chaiHttp from 'chai-http';

chai.use(chaiHttp);

// Now you can use `chai-http` using the `request` function.
```

### chai-http Example

Here's an example of using `chai-http` to test an HTTP GET request:

```javascript
import chai, { expect } from 'chai';
import { request }, chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('GET /user', () => {
  it('should return the user', done => {
    request('http://example.com')
      .get('/user')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
```