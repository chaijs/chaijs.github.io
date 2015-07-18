---
  title: Browser
  weight: 10
  render-file: false
---

### Browser

Include the chai browser build in your testing suite.

    <script src="chai.js" type="text/javascript"></script>

This will provide `chai` as a global object, or `define` it if you are using AMD.

The latest tagged version will be available for hot-linking at [http://chaijs.com/chai.js](/chai.js).
If you prefer to host yourself, use the `chai.js` file from the root of the github project.
We recommend that you always use a version tag as your starting point, so the 
[tag download list](https://github.com/chaijs/chai/tags) is the best place to start.

Currently supports all modern browsers: IE 9+, Chrome 7+, FireFox 4+, Safari 5+. Please note
that the `should` style is currently not compatible with IE9. 

If you want to know if your browser is compatible, run the [online test suite](/api/test/).
