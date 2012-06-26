---
  title: Core Plugin Concepts
  weight: 6
---

# Core Plugin Concepts

Plugins are for more than just writing vendor integrations. As a tester, one can write
a plugin to validate input data, assert schema validation on an object, or ensure proper behavior
on a dom element. The API is flexible enough that any syncronous tasks can easily be encapsulated
within a single assertion and reused throughout your tests.

This tutorial will show you how to access Chai's plugin API, use flags to transfer data through
the language chain, and write your first assertion (and thorough error messages). Once you have 
finished here, [Building a Helper](/guide/helpers) will show you how to compose properties and
methods for use on the Chai language chain.
