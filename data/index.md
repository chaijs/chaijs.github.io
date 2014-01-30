---
  title: Home
  weight: 0
---

Create expressive integration tests with chai and [selenium-webdriver](https://npmjs.org/package/selenium-webdriver).

    chai.use(chaiWebdriver(driver));
    driver.get('http://chaijs.com/');
    expect('nav h1').dom.to.contain.text('Chai');
    expect('#node .button').dom.to.have.style('float', 'left');
