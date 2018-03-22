---
layout: plugin
permalink: plugins/chai-webdriver-promised/
pluginName: chai-webdriver-promised
---

Provides [selenium-webdriver](https://npmjs.org/package/selenium-webdriver) sugar for the [Chai](http://chaijs.com/) assertion library. Allows you to create expressive integration tests:

```javascript
expect('.frequency-field').dom.to.contain.text('One time')
expect('.toggle-pane').dom.to.eventually.not.be.visible()
```

## What sorts of assertions can we make?

All assertions start with a [Sizzle-compatible css selector](http://sizzlejs.com/), for example:

```javascript
expect('.list')
expect('div > h1')
expect('a[href=http://google.com]')
```

Then we add the dom flag, like so:

```javascript
expect(selector).dom
```

Finally, we can add our assertion to the chain:

### Text
Test the text value of the dom against supplied string. Exact matches only.
```javascript
expect(selector).dom.to.have.text('string')
```

### Text (contain)
Test the text value of the dom against supplied string. Partial matches allowed.
```javascript
expect(selector).dom.to.contain.text('string')
```

### Match
Test the text value of the dom against the regular expression.
```javascript
expect(selector).dom.to.match(/regex/)
```

### Text (regex)
Test the text value of the dom against the regular expression. (Same as `match` above).
```javascript
expect(selector).dom.to.have.text(/regex/)
```

### Displayed
Check whether or not the element is displayed (can be scrolled off-screen)
```javascript
expect(selector).dom.to.be.displayed()
```

### Visible
Check whether or not the element is visible on-screen
```javascript
expect(selector).dom.to.be.visible()
```

### Disabled
Check whether or not the form element is disabled
```javascript
expect(selector).dom.to.be.disabled()
```

### Count
Test how many elements exist in the dom with the supplied selector
```javascript
expect(selector).dom.to.have.count(number)
```

### Style
Test the CSS style of the element (exact string match).
```javascript
expect(selector).dom.to.have.style('property', 'value')
```

### Value
Test the value of a form field against supplied string.
```javascript
expect(selector).dom.to.have.value('string')
```

### HTML Class
Tests that the element has `warning` as one of its class attributes.
```javascript
expect(selector).dom.to.have.htmlClass('warning')
```

### Attribute
Test an element's attribute value. Exact matches only. By omitting `value` test simply checks for existance of attribute.
```javascript
expect(selector).dom.to.have.attribute('attribute', 'value')
```

### Not
You can also always add a `not` in there to negate the assertion:

```javascript
expect(selector).dom.not.to.have.style('property', 'value')
```


### Larger and smaller

Several of the assertion methods support the `larger` and `smaller` properties, which allow numeric comparisons. e.g. for `value()`:

Test for a numeric value larger (>=) than 0.
```javascript
expect('input[type=number]').dom.to.have.larger.value(0)
```

Test for a numeric value smaller (<=) than 0.
```javascript
expect('input[type=number]').dom.to.have.smaller.value(0)
```

Test for a numeric value not larger (<) than 0.
```javascript
expect('input[type=number]').dom.not.to.have.larger.value(0)
```

Test for a numeric value not smaller (>) than 0.
```javascript
expect('input[type=number]').dom.not.to.have.smaller.value(0)
```

Other methods which support `larger` and `smaller`:

Test for text with length larger (>=) than 0.
```javascript
expect(selector).dom.to.have.larger.text(0)
```

Test for number of elements matching `selector` larger (>=) than 0.
```javascript
expect(selector).dom.to.have.larger.count(0)
```

Test for css attribute value larger (>=) than 0 (ignores units).
```javascript
expect(selector).dom.to.have.larger.style('width', 0)
```

Test for attribute value larger (>=) than 0.
```javascript
expect(selector).dom.to.have.larger.attribute('offsetWidth', 0)
```


### Eventually

You can also add an `eventually` to tell `chai-webdriver-promised` to poll for the desired state up to the configured timeout (see Setup below):

```javascript
expect(selector).dom.to.eventually.have.htmlClass('warning')
```


### Everything returns a promise

All of these assertions return a `Q` promise, so you can just return the promise if you're using mocha.


## Setup

Setup is pretty easy. Just:

```javascript

// Start with a webdriver instance:
var sw = require('selenium-webdriver');
var driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.chrome())
  .build()

//optional timeout in ms to use with eventually (defaults to 1000)
var timeout = 15000;
//optional interval in ms to use when polling (defaults to 200)
var interval = 100;

// And then...
var chai = require('chai');
var chaiWebdriver = require('chai-webdriver-promised');
chai.use(chaiWebdriver(driver, timeout, interval));

// And you're good to go!
chai.describe('kitty test', function() {
  chai.before(function(done) {
    driver.get('http://github.com').then(done);
  });
  it('should not find a kitty', function() {
    return chai.expect('#site-container h1.heading').dom.to.not.contain.text("I'm a kitty!");
  });
});
```

## Contributing

so easy.

```bash
$EDITOR index.js      # edit index.js
npm test              # run the specs
```

## License

MIT.
