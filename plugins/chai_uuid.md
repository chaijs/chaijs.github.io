---
layout: plugin
permalink: plugins/chai-uuid/
pluginName: chai-uuid
---

# chai-uuid
Chai plugin for performing assertions on UUIDs

## Install
```bash
$ npm install chai-uuid
```

## Example
Use the `uuid` or `guid` method to test whether the assertion is a valid UUID.

```javascript
const chai = require("chai");
chai.use(require('chai-uuid'));
```

## Expect
```javascript
const chai = require("chai");
chai.use(require('chai-uuid'));
const expect = chai.expect;

// validate UUID v1
expect('bd74c8da-4d9e-11e7-b114-b2f933d5fe66').to.be.a.uuid('v1');
// validate UUID v2
expect('f6b93689-1c6a-2931-a785-c7d5606f7f4d').to.be.a.uuid('v2');
// validate UUID v3
expect('622ab4f8-c3e7-3747-a548-0e2d11bf5ab1').to.be.a.uuid('v3');
// validate UUID v4
expect('0ce529f4-8854-41ec-b67c-fbcb4e716e42').to.be.a.uuid('v4');
// validate UUID v5
expect('48a698a0-1641-5aca-bc1b-de9b1a482ee1').to.be.a.uuid('v5');
// validate UUID (any version)
expect('a416d989-91d1-48c9-b583-267df138834c').to.be.a.uuid();

// optionally, you can use the guid method
expect('a416d989-91d1-48c9-b583-267df138834c').to.be.a.guid();
```

## Should
```javascript
const chai = require("chai");
chai.use(require('chai-uuid'));
const should = chai.should();

// validate UUID v1
'bd74c8da-4d9e-11e7-b114-b2f933d5fe66'.should.be.a.uuid('v1');

// validate GUID
'bd74c8da-4d9e-11e7-b114-b2f933d5fe66'.should.be.a.guid();
```

## Assert
```javascript
const chai = require("chai");
chai.use(require('chai-uuid'));
const assert = chai.assert;

// validate UUID v1
assert.uuid('bd74c8da-4d9e-11e7-b114-b2f933d5fe66', 'v1');

// validate GUID
assert.guid('bd74c8da-4d9e-11e7-b114-b2f933d5fe66');
```