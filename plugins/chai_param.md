---
layout: plugin
permalink: plugins/chai-param/
pluginName: chai-param
---

chai-param
==========

Use chai to validate your method's parameters

## Quick start

Install it on your project

    npm install chai-param
    
Require and load it

    var chai = require('chai'),
        chaiParam = require('chai-param'),
        expect = chai.expect,
        should = chai.should(),
        param = chaiParam.param;

    chai.use(chaiParam);
    
Happy method guarding :)
    
    function register(user, pass) {
    	// using should
    	param(user, 'user', 'UsersCtl.register').should.not.be.empty;
    	
    	// or using expect
    	expect(user).param('user', 'UsersCtl.register')
    		.to.have.length.above(5)
    		.and.below(16);
    }
    
## Config

Chai-param can be configured by setting the values in `chaiParam.config` object properties. E.g:

    var chaiParam = require('chai-param');
    
    chaiParam.config.improveMessages = true;

### improveMessages

> Type: `Boolean` Default: `true`

Controls whether or not `chai-param` should replace chai's messages by more descriptive ones. So, for example, instead of getting

    UserCtl.register: expected 'asdf' to have a length above 5 but got 4
    
You'll get...

![Improved error message](https://cloud.githubusercontent.com/assets/117560/3900275/483cbe6c-2289-11e4-99d9-344f0c865edd.png)

### showCaller on error messages

> Type: `Boolean` Default: `true`

This option is only available for node and **requires `improveMessages` to be `true`**.

    chaiParam.config.showCaller = true;

### disableColors

> Type: `Boolean` Default: `false`
  
Disables message coloring. Boring, but useful for tests.
