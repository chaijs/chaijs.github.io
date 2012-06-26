---
  title: Overwriting Language Chains
  weight: 50
  render-file: false
---

## Overwriting Language Chains

Now that we can successfully add assertions to the language chain,
we should work on being able to safely overwrite existing assertions,
such as those from Chai's core or other plugins. 

Chai provides a number of utilties that allow your to overwrite
existing behavior of an already existing assertion, but revert to
the already defined assertion behavior if the subject of the assertion
does not meet your criteria.

Let's start with a simple example of overwriting a property.
