# chai-wait-for

Drop-in replacement for `expect` that waits for the assertion to succeed (retries on an interval you choose, until a timeout
you choose).

Provides an especially clean syntax for working with some chai plugins like `chai-fs`, `chai-webdriverio-async` etc:

```js
await waitFor('#submittedMessage').to.have.text('Your changes have been saved!')
```

# Usage

```sh
npm install --save-dev chai-wait-for
```

```js
// First, use the plugin
const chai = require('chai')
const chaiWaitFor = require('chai-wait-for')
chai.use(chaiWaitFor)

// Then create your `waitFor` with default options:
const waitFor = chaiWaitFor.bindWaitFor({
  // If no assertion attempt succeeds before this time elapses (in milliseconds), the waitFor will fail.
  timeout: 5000,
  // If an assertion attempt fails, it will retry after this amount of time (in milliseconds)
  retryInterval: 100,
})

it('wait for something', async function () {
  this.timeout(10000)

  const myObj = { foo: 0 }

  setInterval(() => myObj.foo++, 1000)

  // Then use it just like you would expect() (but note you must await it!)
  await waitFor(myObj).to.have.property('foo').that.equals(3)

  // You can also use a getter function:
  await waitFor(() => myObj.foo).to.equal(4)

  // If you need to override the defaults:
  await waitFor.timeout(1000)(myObj).to.have.property('foo').that.equals(3)
  await waitFor.retryInterval(500)(myObj).to.have.property('foo').that.equals(3)
})
```

# Plugin usage order/usage with `chai-as-promised`

All `chai` language chains that were defined before you use `chai-wait-for` will be available to use with it.

This is similar to `chai-as-promsied`, but although you generally need to `chai.use(require('chai-as-promised'))` after
all your other chai plugins, this is actually not the case for `chai-wait-for`, because `chai-wait-for` doesn't add or
overwrite any language chains.
Instead you should use `chai-wait-for` after `chai-as-promised`, so that you can `waitFor` `.eventually` assertions:

```js
const chai = require('chai')
const chaiWaitFor = require('chai-wait-for')
chai.use(require('chai-as-promised'))
chai.use(chaiWaitFor)

const waitFor = chaiWaitFor.bindWaitFor({ retryInterval: 100, timeout: 5000 })

it('wait for something', async function () {
  // User.findOne returns a promise; use .eventually.not.exist to wait for user to be deleted
  await waitFor(() => User.findOne({ where: { username: 'dude' } })).to
    .eventually.not.exist
})
```
