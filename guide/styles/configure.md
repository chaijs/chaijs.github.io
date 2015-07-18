---
  title: Configuration
  weight: 15
  render-file: false
---

## Configuration

### config.includeStack

- **@param** _{Boolean}_
- **@default** `false`

User configurable property, influences whether stack trace is included in 
Assertion error message. Default of `false` suppresses stack trace in the error 
message.

```javascript
chai.config.includeStack = true; // turn on stack trace
```

### config.showDiff

- **@param** _{Boolean}_
- **@default** `true`

User configurable property, influences whether or not the `showDiff` flag 
should be included in the thrown AssertionErrors. `false` will always be `false`; 
`true` will be true when the assertion has requested a diff be shown.

```javascript
chai.config.showDiff = false; // turn off reporter diff display
```

### config.truncateThreshold

- **@param** _{Number}_
- **@default** `40`

User configurable property, sets length threshold for actual and expected values 
in assertion errors. If this threshold is exceeded, the value is truncated.

Set it to zero if you want to disable truncating altogether.

```javascript
chai.config.truncateThreshold = 0; // disable truncating
```
