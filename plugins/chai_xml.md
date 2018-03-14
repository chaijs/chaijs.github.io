---
layout: plugin
permalink: plugins/chai_xml/
pluginName: chai_xml
---

chai-xml
========

Xml assertions for Chai.

## Install

In addition to the [chai](http://chaijs.com) package, you need to install the plugin :

```bash
npm install chai-xml --save-dev
```

## Example

```javascript
var chai    = require('chai');
var expect  = require('chai').expect;
var chaiXml = require('chai-xml');

//loads the plugin
chai.use(chaiXml);

describe('assert some xml', function(){

    var someXml = '<root>\n\t<child name="foo" value="bar"></child>\n</root>';
    var otherXml = '<root><child value="bar" name="foo" /></root>';

    it("should be valid", function(){
        expect(someXml).xml.to.be.valid();
    });

    it("should be the same string as otherXml ", function(){
        expect(someXml).to.not.equal(otherXml);
    });
    it("should be the same XML as otherXml ", function(){
        expect(someXml).xml.to.equal(otherXml);
    });

    it("should be the same XML ignoring the whitespace at the begining and end of the text nodes", function () {
        var formattedXml = "<tag>\n\tContent\n</tag>";
        var unformattedXml = "<tag>Content</tag>";
        expect(formattedXml).xml.to.deep.equal(unformattedXml);
    });
});
```

## Usage

 - XML must be a *string*
 - Add the property `xml` to your chain
 - The `equal/eq/equals` methods compare XML instead of the strings
 - The `valid` method check whether the XML is well-formed


## Contributing

Any contribution is welcome! Please check the [issues](https://github.com/krampstudio/chai-xml/issues). Do some unit tests as far as possible.

## Release History
 * _0.3.0_ adding `deep` comparison. Thanks to [PR #2](https://github.com/krampstudio/chai-xml/pull/2)
   * _0.3.1_ change package.json keywords
   * _0.3.2_ Add eslint, fix parsing error when invalid, add package-lock.json
 * _0.2.0_ initial release. Support `xml` property, `valid` method and overwrite the `equal/eq/equals` methods


## License
Copyright (c) 2014-2018 Bertrand Chevrier  
Licensed under the MIT license.
