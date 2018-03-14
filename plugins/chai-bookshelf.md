---
layout: plugin
permalink: plugins/chai-bookshelf/
pluginName: chai-bookshelf
---

# chai-bookshelf

Make assertions on your [bookshelf.js](http://bookshelfjs.org) models.

[![Build Status](https://travis-ci.org/elliotf/chai-bookshelf.png)](https://travis-ci.org/elliotf/chai-bookshelf)

## Install

Install via npm: `npm install chai-bookshelf`

Note that it's handy to use the shortcut --save-dev: `npm install --save-dev chai-bookshelf`

## Using

    var chai = require('chai');
    chai.use(require('chai-bookshelf'));

## Assertions

Right now, only basic assertions on relationships are supported.

### Relationships

Remove boiler plate from your code by making straightforward assertions

Supported Relationships include:

* hasOne `expect(ClassA).to.haveOne(ClassB)`
* hasMany `expect(ClassA).to.haveMany(ClassB)`
* belongsTo `expect(ClassA).to.belongTo(ClassB)`
* belongsToMany `expect(ClassA).to.belongToMany(ClassB)`

#### Basic Example

A basic example showing a test of a relationship

    describe('User model', function() {
      var User
        , Thing
      ;

      beforeEach(function() {
        Thing = db.Model.extend({
          tableName: 'things'
        });

        User = db.Model.extend({
          things: function() {
            return this.hasMany(Thing);
          }
        });
      });

      describe('Relationships', function() {
        it('has many things', function() {
          expect(User).to.haveMany(Thing);
        })
      });
    });

#### Specifying the attribute name example

By default, the assertion will use the singular form of the tablename.  If the attribute is named something other than the target model's class (for example, to be plural) you will need to specify the name of the attribute that represents the relationship.

    describe('User model', function() {
      var User
        , Thing
      ;

      beforeEach(function() {
        User = db.Model.extend({});

        Thing = db.Model.extend({
          owner: function() {
            this.belongsTo(User);
          }
        });
      });

      describe('Relationships', function() {
        it('has many things', function() {
          expect(Thing).to.belongTo(User, 'owner');
        })
      });
    });
