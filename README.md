chai-docs
=========

The chaijs.com website source code. Contributions welcome.

## Development

Download all dependencies:

```
$ git submodule update --init
$ npm install
```

Generate docs and start the doc-server:

```
$ make
```

## FAQ

#### How can I get my plugin featured on the website?

This happens automatically! Every day we have an automated build process which looks for npm modules with the `chai-plugin` keyword. If you publish a chai plugin to npm then make sure it has the `keywords` array in the `package.json` that includes the string `"chai-plugin"`. Like so:

```json
{
  "name": "my-awesome-chai-plugin",
  "keywords": [ "chai-plugin" ]
}
```

If your plugin supports web browsers, as well as node.js, then you can add the `"browser"` keyword. If your plugin _only_ supports browsers, then add both `"browser"` and `"browser-only"` keywords:

```json
{
  "name": "chai-dom",
  "keywords": [ "chai-plugin", "browser", "browser-only" ]
}
```
