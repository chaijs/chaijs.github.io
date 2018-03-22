---
layout: plugin
permalink: plugins/chai-json-pattern/
pluginName: chai-json-pattern
---

# Chai JSON Pattern
> Deep matching objects with clear, JSON-like syntax.

[![CircleCI](https://circleci.com/gh/damian-brainhub/chai-json-pattern/tree/master.svg?style=svg)](https://circleci.com/gh/damian-brainhub/chai-json-pattern/tree/master)

# Introduction
Chai JSON pattern allows you to create *blueprints* for JavaScript objects to ensure *validation* of key information. It enables you to use JSON syntax extend with easy to use validators. It came up mostly for testing API with cucumber-js, but can be used in any application. Additionaly you can extend base functionality with custom validators. For more information see API reference.
# API
See the detailed [API Reference](https://github.com/damian-brainhub/chai-json-pattern/blob/master/API.md).

# Example

```js

const pattern = `
    {
        "username": String AND alphanum AND minLength(3) AND maxLength(30),
        "password": String AND regex("/^[0-9a-zA-Z]{5,30}$/"),
        "access_token"?: String AND Number,
        "birthyear": Integer AND range(1900, 2017),
        "email": String,
        ...
    }
`;

expect(user).to.matchPattern(pattern);
```
The above pattern require `user` to be an object with keys that satisfy following conditions:
* `username`
    * required string
    * contain only alphanumeric characters
    * must have at least 3 characters, and maximum 30
* `password`
    * required string
    * must satisfy the custom regex
* `access_token`
    * optional string or number
* `birthyear`
    * required Integer between 1900 and 2017
* `email`
    * required string
* allow another keys (e.g. createdAt, updateAt, etc.)

If `user` will not satisfy pattern, test will not pass, and you will see error with diff between `user` and pattern.

# Usage
Usage is a two steps process. First, you have to install `chai-json-pattern` package.
```
npm run --save-dev chai-json-pattern
```
Then import `chaiJsonPattern` and use `matchPattern`:
```js
import chai, { expect } from 'chai';
import chaiJsonPattern from 'chai-json-pattern';

chai.use(chaiJsonPattern);

expect({ a: 2 }).to.matchPattern(`{
    "a": Number AND range(0, 5),
}`);
```
