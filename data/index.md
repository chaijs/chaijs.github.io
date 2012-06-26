---
  title: Home
  weight: 0
---

Extend Chai with assertions for the Sinon.JS mocking framework.

    var listener = sinon.spy();
    eventEmitter.on('event', listener);
    eventEmitter.emit('event', 'chai', 'tea');
    listener.should.have.been.calledWith('chai', 'tea');
    listener.should.have.been.calledOnce;
