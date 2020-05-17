---
layout: plugin
permalink: plugins/@jsdevtools/chai-exec/
pluginName: @jsdevtools/chai-exec
---

Chai Exec
=======================

#### Chai assertions for testing your CLI

[![Cross-Platform Compatibility](https://jstools.dev/img/badges/os-badges.svg)](https://github.com/JS-DevTools/chai-exec/blob/master/.github/workflows/CI-CD.yaml)
[![Build Status](https://github.com/JS-DevTools/chai-exec/workflows/CI-CD/badge.svg)](https://github.com/JS-DevTools/chai-exec/blob/master/.github/workflows/CI-CD.yaml)

[![Coverage Status](https://coveralls.io/repos/github/JS-DevTools/chai-exec/badge.svg?branch=master)](https://coveralls.io/github/JS-DevTools/chai-exec?branch=master)
[![Dependencies](https://david-dm.org/JS-DevTools/chai-exec.svg)](https://david-dm.org/JS-DevTools/chai-exec)

[![npm](https://img.shields.io/npm/v/@jsdevtools/chai-exec.svg)](https://www.npmjs.com/package/@jsdevtools/chai-exec)
[![License](https://img.shields.io/npm/l/@jsdevtools/chai-exec.svg)](LICENSE)
[![Buy us a tree](https://img.shields.io/badge/Treeware-%F0%9F%8C%B3-lightgreen)](https://plant.treeware.earth/JS-DevTools/chai-exec)


Features
--------------------------
- **Easy to use**<br>
  Pass your CLI and arguments as a single string, an array of strings, or as separate parameters.

- **Don't repeat yourself**<br>
  Set your common [defaults](#chaiexecdefaults) _once_.  Each test ony needs to specify the arguments that are unique to it.

- **Fluent assertions**<br>
  Test your CLI using intuitive fluent syntax, such as `myCLI.should.exit.with.code(0)` or `myCLI.stdout.should.contain("some string")`.

- **Async Support**<br>
  Just use `await chaiExecAsync()` instead of `chaiExec()`.  Everything else is the same.

- **Windows Support**<br>
  Excellent Windows support, thanks to [cross-spawn](https://github.com/moxystudio/node-cross-spawn).


Related Projects
--------------------------
- [ez-spawn](https://github.com/JS-DevTools/ez-spawn) - Simple, consistent process spawning


Examples
--------------------------

```javascript
const chaiExec = require("@jsdevtools/chai-exec");
const chai = require("chai");

chai.use(chaiExec);

describe("My CLI", () => {
  it("should exit with a zero exit code", () => {
    // Run your CLI
    let myCLI = chaiExec('my-cli --arg1 --arg2 "some other arg"');

    // Should syntax
    myCLI.should.exit.with.code(0);
    myCLI.stdout.should.contain("Success!");
    myCLI.stderr.should.be.empty;

    // Expect sytnax
    expect(myCLI).to.exit.with.code(0);
    expect(myCLI).stdout.to.contain("Success!");
    expect(myCLI).stderr.to.be.empty;

    // Assert syntax
    assert.exitCode(myCLI, 0);
    assert.stdout(myCLI, "Success!");
    assert.stderr(myCLI, "");
  });
});
```


Installation
--------------------------
Install using [npm](https://docs.npmjs.com/getting-started/what-is-npm):

```bash
npm install @jsdevtools/chai-exec
```

Then require it in your test file and register it with Chai:

```javascript
const chaiExec = require("@jsdevtools/chai-exec");
const chai = require("chai");

chai.use(chaiExec);
```


Usage
--------------------------

### `chaiExec(cli, [args], [options])`

You can pass your CLI and its arguments as a single string, an array of strings, or as separate parameters.  The following examples all do the same thing:

```javascript
chaiExec(`git commit -am "Fixed a bug"`);           // Pass the CLI and args as a single string
chaiExec("git", "commit", "-am", "Fixed a bug");    // Pass the CLI and args as separate params
chaiExec(["git", "commit", "-am", "Fixed a bug"]);  // Pass the CLI and args as an array
chaiExec("git", ["commit", "-am", "Fixed a bug"]);  // Pass the CLI as a string and args as an array
```

See [ez-spawn options](https://github.com/JS-DevTools/ez-spawn#options-object) for details about the `options` parameter.

### `chaiExecAsync(cli, [args], [options])`

The `chaiExecAsync()` function works exactly the same as `chaiExec()`, except that it runs your CLI asynchronously and returns a `Promise` that resolves when the CLI exits.  You'll need to explicitly require the `chaiExecAsync` export, like this:

```javascript
const { chaiExecAsync } = require("@jsdevtools/chai-exec");
```

You can then use `chaiExecAsync` exactly the same as `chaiExec`, but remember to use the `async` and `await` keywords, since it's asynchronous.

```javascript
const { chaiExecAsync } = require("@jsdevtools/chai-exec");
const chai = require("chai");

chai.use(chaiExecAsync);

describe("My CLI", () => {
  it("should exit with a zero exit code", async () => {
    // Run your CLI
    let myCLI = await chaiExecAsync('my-cli --arg1 --arg2 "some other arg"');

    // Should syntax
    myCLI.should.exit.with.code(0);
    myCLI.stdout.should.contain("Success!");
    myCLI.stderr.should.be.empty;

    // Expect sytnax
    expect(myCLI).to.exit.with.code(0);
    expect(myCLI).stdout.to.contain("Success!");
    expect(myCLI).stderr.to.be.empty;

    // Assert syntax
    assert.exitCode(myCLI, 0);
    assert.stdout(myCLI, "Success!");
    assert.stderr(myCLI, "");
  });
});
```

### `chaiExec.defaults`

When writing tests for a CLI, you'll often want to use the same command, args, and/or options for every test.  Rather than repeating the same parameters every time you call `chaiExec`, you can just set `chaiExec.defaults` once.  Your default values will be used for every subsequent `chaiExec()` call.  You can specify additional CLI arguments and/or options for each call, in addition to the defaults.

- `defaults.command` (string)<br>
  The name or path of your CLI.  Set this once, and then you only ever need to pass arguments to `chaiExec()`

- `defaults.args` (string or array of strings)<br>
  Arguments to pass to your CLI every time.  If you pass additional arguments when you call `chaiExec()`, they will be appended to the default arguments.

- `defaults.options` ([options object](https://github.com/JS-DevTools/ez-spawn#options-object))<br>
  Default options to use every time.  If you pass additional options when you call `chaiExec()`, they will be merged with the default arguments.

```javascript
const chaiExec = require("@jsdevtools/chai-exec");
const chai = require("chai");

chai.use(chaiExec);

// Set some defaults
chaiExec.defaults = {
  command: "my-cli",
  args: "--arg1 --arg2",
  options: {
    cwd: "/usr/bin"
  }
};

describe("My CLI", () => {
  it("should use defaults", () => {
    // Run your CLI using defaults + one-time args
    let myCLI("--arg3 --arg4");

    myCLI.command.should.equal("my-cli");
    myCLI.args.should.deep.equal([ "--arg1", "--arg2", "--arg3", "--arg4" ]);
  });
});
```


Assertions
--------------------------

### `.exitCode(number, [message])`

**aliases:** `.exit.code` or `.status`

Asserts on your CLI's exit code.  You can test for a specific code, a list of codes, or a range.

```javascript
// Should syntax
myCLI.exitCode.should.equal(0);
myCLI.should.have.exitCode(0);
myCLI.should.exit.with.code(0);
myCLI.should.exit.with.a.code.that.is.oneOf(0, [0, 1, 2, 3]);
myCLI.should.have.an.exit.code.of.at.least(0).and.at.most(5);

// Expect sytnax
expect(myCLI).exitCode.to.equal(0);
expect(myCLI).to.have.exitCode(0);
expect(myCLI).to.exit.with.code(0);
expect(myCLI).to.exit.with.a.code.that.is.oneOf([0, 1, 2, 3]);
expect(myCLI).to.have.an.exit.code.of.at.least(0).and.at.most(5);

// Assert syntax
assert.equal(myCLI.exitCode, 0);

assert.exitCode(myCLI, 0);
assert.exitCode(myCLI, [0, 1, 2, 3]);

assert.notExitCode(myCLI, 1);
assert.notExitCode(myCLI, [1, 2, 3]);

assert.exitCodeBetween(myCLI, 0, 5);
assert.exitCodeNotBetween(myCLI, 1, 5);
```

### `.stdout(string, [message])`

Asserts on your CLI's standard output (non-error, non-warning output).  You can test for a specific string, a substring, or a regular expression.

```javascript
// Should syntax
myCLI.stdout.should.equal("Success!");
myCLI.should.have.stdout.that.contains("Success!");
myCLI.should.have.stdout.that.does.not.contain("Failure!");
myCLI.should.have.stdout.that.matches(/^Success!$/);
myCLI.should.have.stdout.that.does.not.match(/^Failure!$/);

// Expect syntax
expect(myCLI).stdout.to.equal("Success!");
expect(myCLI).to.have.stdout.that.contains("Success!");
expect(myCLI).to.have.stdout.that.does.not.contain("Failure!");
expect(myCLI).to.have.stdout.that.matches(/^Success!$/);
expect(myCLI).to.have.stdout.that.does.not.match(/^Failure!$/);

// Assert syntax
assert.stdout(myCLI, "Success!");
assert.stdout(myCLI, /^Success!$/);

assert.include(myCLI.stdout, "Success!");
assert.notInclude(myCLI.stdout, "Failure!");

assert.match(myCLI.stdout, /^Success!$/);
assert.notMatch(myCLI.stdout, /^Failure!$/);
```

### `.stderr(string, [message])`

Asserts on your CLI's stderr output (errors and warnings).  You can test for a specific string, a substring, or a regular expression.

```javascript
// Should syntax
myCLI.stderr.should.equal("Failure!");
myCLI.should.have.stderr.that.contains("Failure!");
myCLI.should.have.stderr.that.does.not.contain("Success!");
myCLI.should.have.stderr.that.matches(/^Failure!$/);
myCLI.should.have.stderr.that.does.not.match(/^Success!$/);

// Expect syntax
expect(myCLI).stderr.to.equal("Failure!");
expect(myCLI).to.have.stderr.that.contains("Failure!");
expect(myCLI).to.have.stderr.that.does.not.contain("Success!");
expect(myCLI).to.have.stderr.that.matches(/^Failure!$/);
expect(myCLI).to.have.stderr.that.does.not.match(/^Success!$/);

// Assert syntax
assert.stderr(myCLI, "Failure!");
assert.stderr(myCLI, /^Failure!$/);

assert.include(myCLI.stderr, "Failure!");
assert.notInclude(myCLI.stderr, "Success!");

assert.match(myCLI.stderr, /^Failure!$/);
assert.notMatch(myCLI.stderr, /^Success!$/);
```

### `.output(string, [message])`

Asserts on **all** of your CLI's output (stdout + output).  You can test for a specific string, a substring, or a regular expression.

```javascript
// Should syntax
myCLI.output.should.equal("Success!");
myCLI.should.have.output.that.contains("Failure!");
myCLI.should.have.output.that.does.not.contain("Success!");
myCLI.should.have.output.that.matches(/^(Success|Failure)!$/);
myCLI.should.have.output.that.does.not.match(/^(Success|Failure)!$/);

// Expect syntax
expect(myCLI).output.to.equal("Success!");
expect(myCLI).to.have.output.that.contains("Failure!");
expect(myCLI).to.have.output.that.does.not.contain("Success!");
expect(myCLI).to.have.output.that.matches(/^(Success|Failure)!$/);
expect(myCLI).to.have.output.that.does.not.match(/^(Success|Failure)!$/);

// Assert syntax
assert.output(myCLI, "Failure!");
assert.output(myCLI, /^(Success|Failure)!$/);

assert.include(myCLI.output, "Failure!");
assert.notInclude(myCLI.output, "Success!");

assert.match(myCLI.output, /^Failure!$/);
assert.notMatch(myCLI.output, /^Success!$/);
```


Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome! [File an issue](https://github.com/JS-DevTools/chai-exec/issues) on GitHub and [submit a pull request](https://github.com/JS-DevTools/chai-exec/pulls).

#### Building/Testing
To build/test the project locally on your computer:

1. __Clone this repo__<br>
`git clone hhttps://github.com/JS-DevTools/chai-exec.git`

2. __Install dependencies__<br>
`npm install`

3. __Run the tests__<br>
`npm test`



License
--------------------------
Chai Exec is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.

This package is [Treeware](http://treeware.earth). If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/JS-DevTools/chai-exec) to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.



Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://jstools.dev/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jstools.dev/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jstools.dev/img/badges/coveralls.svg)](https://coveralls.io)
