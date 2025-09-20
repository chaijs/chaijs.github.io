---
  title: Installation
  layout: guide
  bodyClass: guide
  weight: 0
  order: 10
  headings:
    - Node.js
    - Browser
---

# Installation

Chai is available for both node.js and the browser using any
test framework you like. There are also a number of other tools
that include Chai.

### Node.js

Package is available through [npm](http://npmjs.org):

```bash
npm install --save-dev chai
```

### Browser

Include the chai browser build in your testing suite. You can either link to your own self-hosted version of chai or through a NPM CDN like [jsDelivr](https://www.jsdelivr.com/) or [unpkg](https://www.unpkg.com/).

```html
<script type="module">
  import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/+esm';

  expect(1 + 1).to.equal(2);
</script>
```
