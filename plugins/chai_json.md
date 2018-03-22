---
layout: plugin
permalink: plugins/chai-json/
pluginName: chai-json
---

# chai-json
A chai plugin to validate json files


## Usage

### server-side

Install from npm:

    $ npm install chai-json

Have chai use the chai-fs module:

    var chai = require('chai');
    chai.use(require('chai-json'));



## Assertions

### jsonFile()

Assert that a file is a json
 

	expect(testFile).to.be.a.jsonFile();
  



### jsonObj()

Assert that the jsonFile given is equal to an javascript object.
     
     expect(testFile).to.be.a.jsonFile().and.to.be.jsonObj(jsonObj);
 


### jsonWithProps()

Assert that the jsonFile contains an object with given properties
```javascript

    /* 
    Content of testFile:  
 [{"repoName":"giper","labName":"TelnetClientSniffing_1","state":"STOPPED"},{"repoName":"giper","labName":"ErrorSameSubnet","state":"STOPPED"},
 {"repoName":"giper","labName":"ErrorSamePort","state":"STOPPED"},    
 {"repoName":"giper","labName":"ErrorWrongAction","state":"STOPPED"},{"repoName":"giper","labName":"ErrorNoDefinedAction","state":"NO_NETWORK"},{"repoName":"giper","labName":"ErrorCopyFile","state":"STOPPED"},
 {"repoName":"giper","labName":"TestActionNoArgs","state":"STOPPED"}
 ]
    */ 
    expect(testFile).to.be.a.jsonFile().and.contain.jsonWithProps({ repoName: 'giper' });
```
 

## Contributing

Contributions are welcome. Please follow the code, test and style patterns and keep Eslint happy. Look at Airbnb style guide for more informations. 

## Build & test

Install development dependencies in your git checkout:

    $ npm install

Run tests:

    $ mocha test





## License

Licensed under the MIT license.
