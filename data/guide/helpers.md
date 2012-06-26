---
  title: Building a Helper
  weight: 7
---

# Building a Helper

> This tutorial assumes that you are familiar with the plugin [core concepts](/guide/plugins/).
> If you have not yet read that article, it is recommended that you do so before continuing.

Providing chainable helper assertions is the most common use of the plugin utilities
that Chai exposes. Before we get into the basics, we are going to need a topic 
for which we will extend Chai's assertions to comprehend. For this, we will be
using a very minimal data model object. 

```javascript
/**
 * # Model
 *
 * A constructor for a simple data model
 * object. Has a `type` and contains arbitrary
 * attributes.
 *
 * @param {String} type
 */

function Model (type) {
  this._type = type;
  this._attrs = {};
}

/**
 * .set (key, value)
 *
 * Set an attribute to be stored in this model.
 *
 * @param {String} key
 * @param {Mixted} value
 */

Model.prototype.set = function (key, value) {
  this._attrs[key] = value;
};

/**
 * .set (key, value)
 *
 * Get an attribute that is stored in this model.
 *
 * @param {String} key
 */

Model.prototype.get = function (key) {
  return this._attrs[key];
};
```

Practically speaking, this could be any data model object returned from a 
ORM database in node or constructed from your MVC framework of choice in 
the browser. 

Hopefully this is rather self explanitory, but as a for-instance, we can 
easily construct a person from this.

```javascript
var arthur = new Model('person');
arthur.set('name', 'Arthur Dent');
arthur.set('occupation', 'traveller');
console.log(arthur.get('name')); // Arthur Dent
```

Now that we have our subject, we can move on to the basics of plugins.
