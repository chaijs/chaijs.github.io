---
  title: Node
  weight: 5
  render-file: false
---

### Node.js

Package is available through [npm](http://npmjs.org):

    npm install chai

Recommend adding it to `package.json` devDependancies using a `*` as the version tag.
This will ensure that you always have the most recent version after running `npm install`,
which can be especially powerful when paired with a continuous integration tool.

```javascript
devDependencies: {
  "chai": "*",
  "mocha": "*" // our preference, but you can use any test runner you like
}
```
