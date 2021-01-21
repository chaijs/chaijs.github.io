---
layout: plugin
permalink: plugins/chai-dynamodb/
pluginName: chai-dynamodb
---

# chai-dynamodb

A [Chai](https://www.chaijs.com/) plugin that adds a matcher to check for the use of a [DynamoDB reserved word](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html) in a string. Very useful for testing AWS Lambda code!

[![NPM Version](https://img.shields.io/npm/v/chai-dynamodb.svg?style=flat)]()
[![NPM License](https://img.shields.io/npm/l/chai-dynamodb.svg?style=flat)](http://www.tldrlegal.com/license/mit-license)
[![NPM Downloads](https://img.shields.io/npm/dt/chai-dynamodb.svg?style=flat)]()  
[![NPM](https://nodei.co/npm/chai-dynamodb.png?downloads=true)](https://www.npmjs.com/package/chai-dynamodb)

## Using

Also see the [tests](https://github.com/cadam11/chai-dynamodb/tree/master/test/)

### browser-side

Include chai-dynamodb after Chai:

    <script src="chai.js"></script>
    <script src="chai-dynamodb.js"></script>

### server-side

Have chai use chai-dynamodb:

```javascript
var chai = require('chai');
chai.use(require('chai-dynamodb'));
```

## Assertions

Check any string for a DynamoDB reserved word that is **not** prefixed by either `#` or `:` (idiomatically used to prefix expression attribute names and values respectively). The assertion is true if the string doesn't have any reserved words that would cause a call to DynamoDB to fail.

### noReservedWords

```javascript
const safe = 'id, phone, email';
const notSafe = 'id, name, phone, email';
const usingAttributeNamePrefix = 'id, #name, phone, email';
const usingAttributeValuePrefix = 'username = :name';

// using should-style assertions
safe.should.have.noReservedWords();
notSafe.should.have.noReservedWords(); // fails
usingAttributeNamePrefix.should.have.noReservedWords();
usingAttributeValuePrefix.should.have.noReservedWords();

// using expect-style assertions
expect(safe).to.have.noReservedWords();
expect(notSafe).to.have.noReservedWords(); // fails
expect(usingAttributeNamePrefix).to.have.noReservedWords();
expect(usingAttributeValuePrefix).to.have.noReservedWords();

// using tdd assertions
assert.noReservedWords(safe);
assert.noReservedWords(notSafe); // fails
assert.noReservedWords(usingAttributeNamePrefix);
assert.noReservedWords(usingAttributeValuePrefix);
```

### noReservedWordsExcept

Useful when there is planned use of specific keywords. Takes a single **string** or **array** of strings as its argument. Not case-sensitive.

```javascript
const usingAttributeNamePrefix = 'SET #name = :fullname';
const usingAttributeValuePrefix = 'SET username = :name';
const missingPrefix = 'SET username = name';

// using should-style assertions
usingAttributeNamePrefix.should.have.noReservedWordsExcept('set');
usingAttributeValuePrefix.should.have.noReservedWordsExcept('SET');
missingPrefix.should.have.noReservedWordsExcept(['SET', 'NAME']);
missingPrefix.should.have.noReservedWordsExcept('SET'); // fails

// using expect-style assertions
expect(usingAttributeNamePrefix).to.have.noReservedWordsExcept('set');
expect(usingAttributeValuePrefix).to.have.noReservedWordsExcept('SET');
expect(missingPrefix).to.have.noReservedWordsExcept(['SET', 'NAME']);
expect(missingPrefix).to.have.noReservedWordsExcept('SET'); // fails

// using tdd assertions
assert.noReservedWordsExcept(usingAttributeNamePrefix, 'set');
assert.noReservedWordsExcept(usingAttributeValuePrefix, 'SET');
assert.noReservedWordsExcept(missingPrefix, ['SET', 'NAME']);
assert.noReservedWordsExcept(missingPrefix, 'SET'); // fails
```

## Limitations

DynamoDB is an actively developed product at AWS, so it's possible they'll add more to the current reserved list of **573** words. This library can be a helpful early protection against the small mistakes that plague us all, but if it's mission-critical you should probably check https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html yourself.
