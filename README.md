chai-docs
=========

The chaijs.com website source code. Contributions welcome.

## Development

You'll need `git`, `npm` and `ruby` with `bundler` to build the site

Download all dependencies:

```
$ git submodule update --init
$ npm install
$ bundle install
```

Generate docs and start the doc-server:

```
$ make
```
