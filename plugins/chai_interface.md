---
layout: plugin
permalink: plugins/chai-interface/
pluginName: chai-interface
---

# chai-interface
chai assertions about an object's interface

## installation

    $ npm install chai-interface

## usage
```js
    var chai = require('chai')
    chai.should()
    chai.use(require('chai-interface'))

    var foo = {
      bar: true,
      baz: 'green',
      qux: 37,
      quack: function () {},
      ducks: [1, 2, 3]
    }

    foo.should.have.interface({
      bar: Boolean,
      baz: String,
      qux: Number,
      quack: Function,
      ducks: Array
    })
```

Also, more complex, nested objects!
```js
    var user = {
      name: {
        first: 'Betty',
        last: 'Dodson'
      },
      emails: {
        work: 'b.dodson@megacorp.com',
        home: 'butterflychica947@lol.com',
        school: 'bdodso4@stateu.edu'
      }
    }

    user.should.have.interface({
      name: {
        first: String,
        last: String
      },
      emails: {
        work: String,
        home: String,
        school: String
      }
    })
```

## example error message

    Interface not as expected:
    {
      "bars": {
        "actual": "Array<String>",
        "expected": "Array<Number>",
        "actualValue": [
          "a",
          "b",
          "c"
        ]
      }
    }

## by the power of [tracery](https://github.com/AgileDiagnosis/tracery)

`chai-interface` does interface checking using `tracery`

## contributors

jden <jason@denizac.org> @leJDen

Please submit pull requests and issues through github.

## license

MIT
(c) 2013 Agile Diagnosis, Inc.
see LICENSE.md