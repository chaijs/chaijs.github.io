---
layout: plugin
permalink: plugins/chai-counting/
pluginName: chai-counting
---

# Chai Counting

A simple counting plugin for the [Chai assertion library](http://chaijs.com/). `expect(n).to.be.zero`, `expect(n).to.be.one`, and so on, through `expect(n).to.be.ten`. Alternatively, `n.should.be.zero`, `n.should.be.one`, etc. This saves you the agony of typing the parentheses in `n.should.be.eq(0);`.

[![Build Status](https://travis-ci.org/bhritchie/chai-counting.svg?branch=master)](https://travis-ci.org/bhritchie/chai-counting) [![npm](https://img.shields.io/npm/dt/chai-counting.svg)](https://www.npmjs.com/package/chai-counting)

## Install

	npm install chai-counting

## Use

	const chai = require('chai');
	const chaiCounting = require('chai-counting');
	chai.use(chaiCounting);