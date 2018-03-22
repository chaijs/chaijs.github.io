---
layout: plugin
permalink: plugins/chai-fs-latest/
pluginName: chai-fs-latest
---

# chai-fs

[![Build Status](https://secure.travis-ci.org/Bartvds/chai-fs.png?branch=master)](http://travis-ci.org/Bartvds/chai-fs) [![Dependency Status](https://david-dm.org/Bartvds/chai-fs.svg)](https://david-dm.org/Bartvds/chai-fs) [![devDependency Status](https://david-dm.org/Bartvds/chai-fs/dev-status.svg)](https://david-dm.org/Bartvds/chai-fs#info=devDependencies) [![NPM version](https://badge.fury.io/js/chai-fs.png)](http://badge.fury.io/js/chai-fs)

[Chai](http://chaijs.com/) assertion [plugin](http://chaijs.com/plugins/chai-fs) for the Node.js filesystem API. Uses `path` and synchronous `fs` to assert files and directories.

All assertions are available in `expect`, `should` and `assert` style, and support the optional, message parameter.

## Forked

Forked because of peerDependencies issue.

## Usage

### server-side

Install from npm:

    $ npm install chai-fs

Have chai use the chai-fs module:

    var chai = require('chai');
    chai.use(require('chai-fs'));

### browser-side

No file system.

## Assertions

### basename()

Assert the return value of `path.basename(path)`

	expect(path).to.have.basename(name, ?msg);
	expect(path).to.not.have.basename(name, ?msg);
	
	path.should.have.basename(name, ?msg);
	path.should.not.have.basename(name, ?msg);
	
	assert.basename(path, name, ?msg);
	assert.notBasename(path, name, ?msg);


### dirname()

Assert the return value of `path.dirname(path)`

	expect(path).to.have.dirname(name, ?msg);
	expect(path).to.not.have.dirname(name, ?msg);
	
	path.should.have.dirname(name, ?msg);
	path.should.not.have.dirname(name, ?msg);
	
	assert.dirname(path, name, ?msg);
	assert.notDirname(path, name, ?msg);


### extname()

Assert the return value of `path.extname(path)`

	expect(path).to.have.extname(name, ?msg);
	expect(path).to.not.have.extname(name, ?msg);
	
	path.should.have.extname(name, ?msg);
	path.should.not.have.extname(name, ?msg);
	
	assert.extname(path, name, ?msg);
	assert.notExtname(path, name, ?msg);


### path()

Assert the path exists.

Uses `fs.existsSync()`.

	expect(path).to.be.a.path(?msg);
	expect(path).to.not.be.a.path(?msg);
	
	path.should.be.a.path(?msg);
	path.should.not.be.a.path(?msg);
	
	assert.pathExists(path, ?msg);
	assert.notPathExists(path, ?msg);


Use of Chai's `exist`-chain would've been nice *but* has issues with negations and the message parameter. So don't do that.

### directory()

Assert the path exists and is a directory.
	
Uses `fs.statSync().isDirectory()`

	expect(path).to.be.a.directory(?msg);
	expect(path).to.not.be.a.directory(?msg);
	
	path.should.be.a.directory(?msg);
	path.should.not.be.a.directory(?msg);
	
	assert.isDirectory(path,  ?msg);
	assert.notIsDirectory(path, ?msg);

### directory().and.empty

Assert the path exists, is a directory and contains zero item. 

	expect(path).to.be.a.directory(?msg).and.empty;
	expect(path).to.be.a.directory(?msg).and.not.empty;
	
	path.should.be.a.directory(?msg).and.empty;
	path.should.be.a.directory(?msg).and.not.empty;
	
	assert.isEmptyDirectory(path, ?msg);
	assert.notIsEmptyDirectory(path, ?msg);

* Chains after `directory()`
* Uses `fs.readdirSync().length === 0`.
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `directory()`.

### file()

Assert the path exists and is a file.

Uses `fs.statSync().isFile()`

	expect(path).to.be.a.file(?msg);
	expect(path).to.not.be.a.file(?msg);
	
	path.should.be.a.file(?msg);
	path.should.not.be.a.file(?msg);
	
	assert.isFile(path, ?msg);
	assert.notIsFile(path, ?msg);

### file().and.empty

Assert the path exists, is a file and has zero size. 

	expect(path).to.be.a.file(?msg).and.empty;
	expect(path).to.be.a.file(?msg).and.not.empty;
	
	path.should.be.a.file(?msg).and.empty;
	path.should.be.a.file(?msg).and.not.empty;
	
	assert.isEmptyFile(path, ?msg);
	assert.notIsEmptyFile(path, ?msg); 

* Chains after `file()`
* Uses `fs.statSync().size === 0`.
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `file()`.

### file().with.json

Assert the path exists, is a file and contains json parsable text. 

	expect(path).to.be.a.file(?msg).with.json;
	expect(path).to.be.a.file(?msg).with.not.json;
	
	path.should.be.a.file(?msg).with.json;
	path.should.be.a.file(?msg).with.not.json;
	
	assert.jsonFile(path, ?msg);
	assert.notJsonFile(path, ?msg); 

* Chains after `file()`
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `file()`.
* The `with` chain is just syntax sugar.

### file().using.json.schema(obj)

Assert the path exists, is a file, contains json parsable text conforming to given JSON-Schema.

	expect(path).to.be.a.file(?msg).with.json.using.schema(obj);
	expect(path).to.be.a.file(?msg).with.json.not.using.schema(obj);
	
	path.should.be.a.file(?msg).with.json.using.schema(obj);
	path.should.be.a.file(?msg).with.json.not.using.schema(obj);
	
	assert.jsonSchemaFile(path, schema,?msg);
	assert.notJsonSchemaFile(path, schema, ?msg); 

* Chains after `file().with.json`
* The schema parameter must be a valid JSON-Schema v4. 
* Depends on the [chai-json-schema](https://github.com/Bartvds/chai-json-schema) plugin to be separately activated with `chai.use()`.
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `json`.
* The `with` and `using` chains are just syntax sugar.

### content()

Assert the path exists, is a file and has specific content.

	expect(path).to.have.content(data, ?msg);
	expect(path).to.not.have.content(data, ?msg);
	
	path.should.have.content(data, ?msg);
	path.should.not.have.content(data, ?msg);
	
	assert.fileContent(path, data, ?msg);
	assert.notFileContent(path, data, ?msg);

* Reads file as utf8 text (could update to support base64, binary Buffer etc). 

Note: *In a future version this might be supported as a chain behind file() and directory()* 

### content.that.match(/xyz/)

Assert the path exists, is a file and has content that match the regular expression. 

	expect(path).to.have.content.that.match(/xyz/, ?msg);
	expect(path).to.not.have.content.that.match(/xyz/, ?msg);
	
	path.should.have.content.that.match(/xyz/, ?msg);
	path.should.not.have.content.that.match(/xyz/, ?msg);
	
	assert.fileContentMatch(path, /xyz/, ?msg);
	assert.notFileContentMatch(path, /xyz/, ?msg);

* Reads file as utf8 text.

###  Planned assertions

There are some ideas for future assertions saved [in this document](https://github.com/Bartvds/chai-fs/tree/master/docs/planned.md).

## History

* 0.1.0 - Added content.match feature (thanks @legendary-mich)
* 0.0.2 - Plugin release
* 0.0.1 - Alpha release

## Contributing

Contributions are welcome. Please follow the code, test and style patterns and keep JSHint happy. Please make sure things work on all platforms, or at least Widows/Mac/Linux.

## Build & test

Install development dependencies in your git checkout:

    $ npm install

You need the global [grunt](http://gruntjs.com) command:

    $ npm install grunt-cli -g

Build and run tests:

    $ grunt

See the `Gruntfile` for additional commands.

### :wrench: Test generator

This plugin uses a prototype of an "assertion plugin test generator" to generates tests for all aspects of the assertions while keeping the specs DRY. 

The pattern splits the test into a style declaration tree and a set of variation on 3 types of test scenarios. The generator then combines ('multiplies') every scenario variation with the style tree data to get good coverage of all cases.

The style tree defines ways to use an assertion: first level is the style: expect/should and assert. Then it defines both the normal use and the negation, then divides those into different invocations patterns for each style. So you can test with/without message, or as a chained method or property etc.

The tests are ways to specify assertions and the test expectations. 

* `valid`  - test expected to pass (but fail the negation)
* `invalid` - test expected to fail (but pass the negation). 
* `error` - test expected to always fail (even when negated), because the data is invalid (eg: bad data type, missing parameters etc). 

The report field is used the verify the error message if the test fails. It supports a simple template format using the assertion data object.

#### Why?

This looks a bit complex and cumbersome but it does allow to quickly add large amount of detailed tests for all assertions. So far it seems to work empowering so I might extract this to a separate npm module later.

Note it will generate a large amount of case variations so a small error in the code or your test setup can explode the suite wit a many failing assertions. Look closely at which tests are failing to see what is causing what.

## License

Copyright (c) 2013 Bart van der Schoor

Licensed under the MIT license.
