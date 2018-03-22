---
layout: plugin
permalink: plugins/chai-react-element/
pluginName: chai-react-element
---

# chai-react-element
[![Build Status](https://travis-ci.org/electricmonk/chai-react-element.png)](https://travis-ci.org/electricmonk/chai-react-element)

[![Dependency Status](https://david-dm.org/electricmonk/chai-react-element.svg)](https://david-dm.org/electricmonk/chai-react-element)
[![devDependency Status](https://david-dm.org/electricmonk/chai-react-element/dev-status.svg)](https://david-dm.org/electricmonk/chai-react-element#info=devDependencies)

## Motivation

This library provides chaining behavior and allows nested assertions using the `include` language chain for React-style VDOMs. Assertions are made against unrendered (or shallow-rendered) elements, making for lighter tests that do not rely on a DOM (be it fake or real).

By using duck typing, the plugin can accept a `ReactElement` or any object that has the same properties as a `ReactElement`:
* A string `type` property
* A `props` property that is an object, or no `props` property at all

### Alternatives
There are several other Chai plugins intended to help make assertions on React objects. This library differs from the alternatives in the following manners:

* [Chai React Assertions](https://www.npmjs.com/package/chai-react-assertions) - does not provide chaining behavior, language is less fluent
* [Chai React](https://www.npmjs.com/package/chai-react) - meant for use with *rendered* React components.

## Usage
```javascript
expect(<div>hello</div>).to.have.text('hello');
expect(<div></div>).to.have.elementOfType('div')
expect(<div data-foo="bar"></div>).to.have.prop('data-foo', 'bar');

expect(<div><div data-foo="bar"></div></div>).to.include.prop('data-foo', 'bar');

expect(<div><span>hello</span></div>).to.include.elementOfType('span').with.text('hello');
```

The chain works non-eagerly, i.e. does not match against the first element found, meaning that this assertion will hold:
```javascript
expect(<div><span></span><span>hello</span></div>).to.include.elementOfType('span').with.text('hello');

```

### Setup
```
$ npm install chai-react-element
```

> Note: currently only React 0.13.x is supported. Work on moving to React 0.14.x will commence in the near future.

```javascript
import chai, {expect} from 'chai';
import matcher from 'chai-react-element';
chai.use(matcher);
```

The plugin is exported as an ES6 module. If using ES5, please use:
```javascript
chai.use(require('chai-react-element').default);
```

### Caveats
Chainable behavior is only supported for the `.elementOfType` assertion. This means that the `.prop` and `.text` assertions can only be used at the end of an assertion chain, and the following style is unsupported:
```javascript
expect(<div data-foo="bar"><span></span></div>).to.have.prop('data-foo', 'bar').with.an.elementOfType('span')
```
Negative assertions may behave unexpectedly for nested assertions. For instance, the following example will fail as soon as it encounters the first `span` element, while it should fail only on the second element.
```javascript
expect(<div><span></span><span data-foo="bar"></span></div>).to.not.include.elementOfType('span').with.prop('data-foo');
```

## Contributing

### Setup
This project uses Gulp for build and tests, and `webpack-dev-server` for running and debugging in-browser.
To install the project, just run `npm install`. 

To start the development environment, run `npm start`, or, if you have Gulp installed globally, `gulp dev`. This runs tests using Mocha and in addition starts `webpack-dev-server` on port 8080. To run the tests, use `npm test` (or `gulp test`).

### Issues
Please open an issue on the project's GitHub repo for any problem you might find. Please refrain from creating pull requests before discussing your problem in an issue.

### Pull Requests
Please try to develop your submission using Test-Driven Development. At the very least, make sure that your changes are well-covered with tests, and that your code is clean.

### Roadmap
 * Support React 0.14.x
 * Support nested negative assertions (see above)
