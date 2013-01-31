/**
 * Please add your plugin information here. Data will be automatically
 * pulled from the references sources and used to display on the site.
 *
 * @param {String} `name` required
 * @param {String} `url` plugin page will be located at http://chaijs.com/plugins/{{url}}
 * @param {String} `repo` path on github required
 * @param {String} `pkg` url to json package.js
 * @param {String} `markdown` markdown file to use for content.
 * @param {Boolean} `node` supports node.js. defaults to true
 * @param {Boolean} `browser` supports browser. defaults to true
 */

module.exports = [

    { name: 'Chai Spies'
    , desc: 'Function spies and assertions.'
    , url: 'chai-spies'
    , link: 'https://github.com/chaijs/chai-spies'
    , tags: [ 'mocks-and-spies' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-spies/master/README.md' }

  , { name: 'Chai HTTP'
    , desc: 'HTTP request/response assertions.'
    , url: 'chai-http'
    , link: 'https://github.com/chaijs/chai-http'
    , tags: [ 'http' ]
    , pkg: 'https://raw.github.com/chaijs/chai-http/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-http/master/README.md'
    , browser: false }

  , { name: 'Sinon–Chai'
    , desc: 'Extend Chai with assertions for the Sinon.JS mocking framework.'
    , url: 'sinon-chai'
    , link: 'http://github.com/domenic/sinon-chai'
    , tags: [ 'vendor', 'mocks-and-spies' ]
    , pkg: 'https://raw.github.com/domenic/sinon-chai/master/package.json'
    , markdown: 'https://raw.github.com/domenic/sinon-chai/master/README.md'
    , browser:
      { 'sinon-chai.js': 'https://raw.github.com/domenic/sinon-chai/master/lib/sinon-chai.js' }
    }

  , { name: 'Chai as Promised'
    , desc: 'Extends Chai with assertions about promises.'
    , url: 'chai-as-promised'
    , link: 'http://github.com/domenic/chai-as-promised'
    , tags: [ 'async' ]
    , pkg: 'https://raw.github.com/domenic/chai-as-promised/master/package.json'
    , markdown: 'https://raw.github.com/domenic/chai-as-promised/master/README.md'
    , browser:
      { 'chai-as-promised.js': 'https://raw.github.com/domenic/chai-as-promised/master/lib/chai-as-promised.js' }
    }

 , { name: 'Chai jQuery'
    , desc: 'Extend Chai with assertions for the DOM and jQuery.'
    , url: 'chai-jquery'
    , link: 'https://github.com/chaijs/chai-jquery'
    , tags: [ 'vendor', 'dom' ]
    , pkg: 'https://raw.github.com/chaijs/chai-jquery/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-jquery/master/README.md'
    , node: false
    , browser:
      { 'chai-jquery.js': 'https://raw.github.com/chaijs/chai-jquery/master/chai-jquery.js' }
    }

  , { name: 'Chai Timers'
    , desc: 'Timers, stopwatches, and other time-based assertions for the Chai Assertion Library.'
    , url: 'chai-timers'
    , link: 'https://github.com/chaijs/chai-timers'
    , tags: [ 'math' ]
    , pkg: 'https://raw.github.com/chaijs/chai-timers/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-timers/master/README.md' }

  , { name: 'Chai Stats'
    , desc: 'Function spies and assertions.'
    , url: 'chai-stats'
    , link: 'https://github.com/chaijs/chai-stats'
    , tags: [ 'math' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-stats/master/README.md' }

  , { name: 'Chai Null'
    , desc: 'Null Object Pattern implmentation for Chai.'
    , url: 'chai-null'
    , link: 'https://github.com/chaijs/chai-null'
    , tags: [ 'object-constructors' ]
    , pkg: 'https://raw.github.com/chaijs/chai-null/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-null/master/Readme.md'
    , browser:
      { 'chai-null.js': 'https://raw.github.com/chaijs/chai-null/master/chai-null.js' }
    }

  , { name: 'Chai Factories'
    , desc: 'A simple &amp; straight-forward factory builder for your awesome tests.'
    , url: 'chai-factories'
    , link: 'https://github.com/chaijs/chai-factories'
    , tags: [ 'object-constructors' ]
    , pkg: 'https://raw.github.com/chaijs/chai-factories/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-factories/master/Readme.md'
    , browser:
      { 'chai-factories.js': 'https://raw.github.com/chaijs/chai-null/master/chai-factories.js' }
    }

  , { name: 'Chai Changes'
    , desc: 'Change assertions'
    , url: 'chai-changes'
    , link: 'https://github.com/matthijsgroen/chai-changes'
    , tags: [ 'objects' ]
    , pkg: 'https://raw.github.com/matthijsgroen/chai-changes/master/package.json'
    , markdown: 'https://raw.github.com/matthijsgroen/chai-changes/master/README.md'
    , browser:
      { 'chai-changes.js': 'https://raw.github.com/matthijsgroen/chai-changes/master/chai-changes.js' }
    }

  , { name: 'Chai Backbone'
    , desc: 'Extend Chai with assertions for the Backbone.js framework.'
    , url: 'chai-backbone'
    , link: 'https://github.com/matthijsgroen/chai-backbone'
    , tags: [ 'vendor', 'dom' ]
    , pkg: 'https://raw.github.com/matthijsgroen/chai-backbone/master/package.json'
    , markdown: 'https://raw.github.com/matthijsgroen/chai-backbone/master/README.md'
    , browser:
      { 'chai-backbone.js': 'https://raw.github.com/matthijsgroen/chai-backbone/master/chai-backbone.js' }
    }

  , { name: 'Chai Fuzzy'
    , desc: 'Loose matchers inspired by jasmine, based on underscore'
    , url: 'chai-fuzzy'
    , link: 'https://github.com/elliotf/chai-fuzzy'
    , tags: [ 'array' ]
    , pkg: 'https://raw.github.com/elliotf/chai-fuzzy/master/package.json'
    , markdown: 'https://raw.github.com/elliotf/chai-fuzzy/master/README.md'
    , browser:
      { 'chai-fuzzy.js': 'https://raw.github.com/elliotf/chai-fuzzy/master/index.js' }
    }

  , { name: 'Chai Things'
    , desc: 'Chai support for assertions on array elements'
    , url: 'chai-things'
    , link: 'https://github.com/RubenVerborgh/Chai-Things'
    , tags: [ 'array' ]
    , pkg: 'https://raw.github.com/RubenVerborgh/Chai-Things/master/package.json'
    , markdown: 'https://raw.github.com/RubenVerborgh/Chai-Things/master/README.md'
    , browser:
      { 'chai-things.js': 'https://raw.github.com/RubenVerborgh/Chai-Things/master/lib/chai-things.js' }
    }

  , { name: 'Chai Interface'
    , desc: 'Chai assertions about an object\' interface',
    , url: 'chai-interface'
    , link: 'https://github.com/AgileDiagnosis/chai-interface'
    , tags: ['interface', 'object']
    , pkg: 'https://raw.github.com/AgileDiagnosis/chai-interface/master/package.json'
    , markdown: 'https://raw.github.com/AgileDiagnosis/chai-interface/master/README.md'
    }
];
