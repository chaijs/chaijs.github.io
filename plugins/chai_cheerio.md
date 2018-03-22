---
layout: plugin
permalink: plugins/chai-cheerio/
pluginName: chai-cheerio
---

# chai-cheerio

[![Build Status](https://travis-ci.org/Merott/chai-cheerio.svg?branch=master)](https://travis-ci.org/Merott/chai-cheerio)

chai-cheerio is an extension to the [chai](http://chaijs.com/) assertion library that
provides a set of Cheerio-specific assertions. It was forked from [`chai-jquery`](https://github.com/chaijs/chai-jquery),
and modified to work with [`cheerio`](https://github.com/cheeriojs/cheerio)
instead of jQuery.

In the following documentation, all links to `chai-jquery` point directly to the version
that `chai-cheerio` is based on.

## Usage

As this is a port of `chai-jquery`, I recommend that you check out the original
project's [README](https://github.com/chaijs/chai-jquery/blob/e1c6697286274bc4c6170040c0f1a7742c8b5798/README.md)
for usage information.

Here, I will highlight the differences in assertion capabilities between
`chai-cheerio` and `chai-jquery`:

1. `chai-cheerio` does not implement [`visible`](https://github.com/chaijs/chai-jquery/blob/e1c6697286274bc4c6170040c0f1a7742c8b5798/README.md#visible) and [`hidden`](https://github.com/chaijs/chai-jquery/blob/e1c6697286274bc4c6170040c0f1a7742c8b5798/README.md#hidden)
assertions. This is due to [known limitations](https://github.com/cheeriojs/cheerio/issues/362)
in the upstream `cheerio` project. Feel free to suggest workarounds, or even better, submit PRs.
2. `chai-cheerio` cannot identify an element by the original selector that was used
to find it, which means that for `.exist` assertion errors, it will simply output
`expected `**`element`**` to exist` or `expected `**`element`**` not to exist`, unlike
`chai-jquery`, which outputs `expected `**`#foo`**` not to exist` to identify the element.
This is because `chai-jquery` makes use of jQuery's deprecated [`.selector`](https://api.jquery.com/selector/)
property, while `cheerio` does not have this property. Again, feel free to
suggest workarounds or submit PRs.
3. `chai-cheerio` does not implement the [`focus`](https://github.com/chaijs/chai-jquery/blob/e1c6697286274bc4c6170040c0f1a7742c8b5798/README.md#focus) assertion.

## Contributing

To run the test suite, run `npm install` (requires
[Node.js](http://nodejs.org/) to be installed on your system), and then:

```
npm test
```
