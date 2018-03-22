---
layout: plugin
permalink: plugins/chai-fetch/
pluginName: chai-fetch
---

# chai-fetch [![Travis Build Status](https://img.shields.io/travis/pimterry/chai-fetch.svg)](https://travis-ci.org/pimterry/chai-fetch)

Chai matchers to make matching fetch responses clear &amp; easy

`fetch('http://example.com').then((response) => response.text()).then((text) => expect(text).to.equal('hi there'))`
is pretty much the simplest way to assert on the body of a fetch response, and that's a huge horrible mess. This
library takes away that pain, and makes life easier.

## Getting started

Install `chai-fetch` with:

```js
npm install --save-dev chai-fetch
```

Chai-fetch is a commonjs module, and should work out of the box in node, or with
bundling tools like browserify & webpack.

Chai-fetch is written in TypeScript, so will work completely fine with JS, but
if you're using TypeScript too you'll also get working typings out of the box.

An example test using this (with [http-server-mock](https://github.com/pimterry/http-server-mock)
to fake HTTP responses) would look like:

```js
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);

const { expect } = chai;

describe('Chai-fetch', () => {
    beforeEach(() => mockServer.start(8080));
    afterEach(() => mockServer.stop());

    describe('.responseText', () => {
        it('should match responses with matching bodies', () => {
            mockServer.get('/match').thenReply(200, 'matching body')
            .then(() =>
                expect(fetch('http://localhost:8080/match')).to.have.responseText('matching body')
            );
        });
    });
});
```

## Tips

* Remember that the assertions here are all asynchronous, so you need to `return` or `.then` or `await` on them, to
  ensure that your test framework waits for the result and catches failures.

* Take a look at [http-server-mock](https://github.com/pimterry/http-server-mock) to mock your server responses.

* If you're writing HTTP tests like this, and you're using Babel, TypeScript or just some very modern JS engines,
you can make them a little more readable with async/await:

    ```js
    it('should match responses with matching bodies', async () => {
        await mockServer.get('/match').thenReply(200, 'matching body');

        await expect(fetch('http://localhost:8080/match')).to.have.responseText('matching body');
    });
    ```

## API

### `.responseText(expectedText)`

e.g. `expect(fetch('http://example.com')).to.have.responseText('hi there')`

If the object being tested is a fetch response, or a promise for a fetch response, this asserts that the full text
of the body is equal to the text given.

You can also pass a regular expression: `.responseText(/match a substring/)`.

This does _not_ test the status code (just like fetch itself doesn't), but both normal and negated tests will fail
if a passed response promise is rejected entirely (e.g. if you have a network error).

### `.responseStatus(expectedStatus)`

e.g. `expect(fetch('http://example.com')).to.have.responseStatus(200)`

If the object being tested is a fetch response, or a promise for a fetch response, this asserts that the status of
the response is the status given.

### More to come (file an issue!)