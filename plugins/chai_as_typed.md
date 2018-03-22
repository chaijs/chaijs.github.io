---
layout: plugin
permalink: plugins/chai-as-typed/
pluginName: chai-as-typed
---

# chai-as-typed

[![Build Status](https://travis-ci.org/vstirbu/chai-as-typed.svg?branch=master)](https://travis-ci.org/vstirbu/chai-as-typed)
[![Coverage Status](https://coveralls.io/repos/github/vstirbu/chai-as-typed/badge.svg?branch=master)](https://coveralls.io/github/vstirbu/chai-as-typed?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/vstirbu/chai-as-typed.svg)](https://greenkeeper.io/)

## Motivation

[TypeScript](https://www.typescriptlang.org/) has now the ability to do [type checking](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files) in plain JavaScript files. This behavior is not based on magic, but on well formed JSDoc [comments](https://github.com/Microsoft/TypeScript/wiki/JSDoc-support-in-JavaScript).

Now, if I have a JavaScript file augmented with the proper JSDoc comments, an editor such as [Visual Studio Code]() will be able to automatically get IntelliSense, which includes autocompletion and type checking:

![](https://raw.github.com/vstirbu/chai-as-typed/master/media/fsm-events-typescript.gif)

However, exposing reliably the type information about a module APIs requires testing. This plugin enhances Chai with specific helpers that make the task of checking the type information in plain JavaScript files easy.

## How to use

Considering that we have a javascript file, which starts with the following line:

```javascript
// @ts-check
```

we can test that the types used are correct with the following assertion:

```javascript
expect('/absolute/path/to/filename.js').to.have.types.validated();
```

If there are type errors, an error will be thrown indicating the position of the type violations:

```
Error: /absolute/path/to/filename.js (Ln 5, Col 6): Argument of type '123' is not assignable to parameter of type 'string'
```

Also, in case errors are expected, we can test using the following assertions indicating the number of errors expected:

```javascript
expect('/absolute/path/to/filename.js').to.have.types.errors(1);
```

## Installation ans setup

Do `npm install --save-dev chai-as-typed`, then:

```javascript
var chai = require('chai');
var chaiAsTyped = require('chai-as-typed');

chai.use(chaiAsTyped);
```

## Disclaimer

The plugin is in experimental phase. Use it gently and provide feedback! :)
