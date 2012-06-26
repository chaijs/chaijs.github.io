---
  title: Contributing
  weight: 10
  render-file: false
---

### Developing

Please avoid making changes to the browser versions of chai if you are developing in the browser. All
changes to the library are to be made to `lib/*` and then packaged for the browser using the `make`
command.

### Testing

Tests are written in `exports` style on [mocha test framework](http://visionmedia.github.com/mocha/).
There is a test file for each of the interfaces. The tests for `expect` and `assert` must pass in node.js
and in the browser, whereas the should tests only need to pass on node.js.

Browsers tests are currently known to pass in Chrome 16 and Firefox 8. Please let me know if you can test
in other browsers or other version.

#### Server Side Testing

It's quite simple...

      make test


#### Browser Side Testing

It's also quite simple. Open up `test/browser/index.html` in your nearest browser.


### Building

If you have made changes to any of the components, you must rebuild the browser package.

      $ make

### Contributors 

     commits: 493
     files  : 45
     authors: 
       363  Jake Luer               73.6%
        66  Veselin Todorov         13.4%
        36  Domenic Denicola        7.3%
         5  Jo Liss                 1.0%
         5  Juliusz Gonera          1.0%
         4  josher19                0.8%
         4  John Firebaugh          0.8%
         3  Jeff Barczewski         0.6%
         2  Jakub Nešetřil          0.4%
         1  Anand Patil             0.2%
         1  Benjamin Horsleben      0.2%
         1  Vinay Pulim             0.2%
         1  Sasha Koss              0.2%
         1  Kilian Ciuffolo         0.2%
