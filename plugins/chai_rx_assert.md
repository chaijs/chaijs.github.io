---
layout: plugin
permalink: plugins/chai-rx-assert/
pluginName: chai-rx-assert
---

# chai-rx-assert
Plugin for the chai assert library for comparing observables in tests</br>
(Thin wrapper around [rx-assert](https://github.com/AlexMost/rx-assert) library)

# Installation
```bash
npm install chai-rx-assert
```

# Usage
```javascript
var chai = require('chai');
var chaiRx = require('chai-rx-assert');
chai.use(chaiRx);

it('should return messages with delay', () => {
    var scheduler = new TestScheduler();

    var xs = scheduler.createHotObservable(onNext(250, 2), onCompleted(550));

    var results = scheduler.startScheduler(() => {
        return xs.delay(100, scheduler);
    });

    expect(results.messages).to.rxEqual([onNext(350, 2), onCompleted(650)]) // assert ok

    // or without wrapping in list

    expect(results.messages).to.rxEqual(onNext(350, 2), onCompleted(650)) // assert ok
});
```
> see full expample inside [test/test.js](https://github.com/AlexMost/chai-rx-assert/blob/master/test/test.js)
