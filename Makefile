#
# Generate the docs and start the doc server
#

all: plugins releases api-docs docs-server

#
# Generate the api docs
#

api-docs: clean-api-docs
	@mkdir -p _data
	@npm install chai@latest
	@./node_modules/.bin/dox < ./node_modules/chai/chai.js > _data/chai.json


#
# Generate the releases
#

releases:
	@mkdir -p _data
	@curl -s "https://api.github.com/repos/chaijs/chai/releases" > _data/releases.json

#
# Generate plugins
#

plugins: clean-plugins
	@mkdir -p _data/plugins
	@./node_modules/.bin/npm-plugin-fetcher -o _data/plugins chai-plugin
	@xargs -n1 -I! sh -c 'echo ! && curl -s "https://registry.npmjs.com/!" > _data/plugins/!.json' < _legacy_plugins
	@node _scripts/build-plugin-tags.js

#
# Install all dependencies
#

install:
	@npm install
	@bundle install

#
# Clean the plugins
#

clean-plugins:
	@rm -rf _data/plugins*

#
# Clean the api- docs
#

clean-api-docs:
	@rm -rf _data/chai.json

#
# Start the doc server locally
#

docs-server:
	@bundle exec jekyll serve

#
# Nightly data build process
#
nightly: all
	@git config user.name "ChaiJs Bot"
	@git config user.email "chaijs-bot@keithcirkel.co.uk"
	@git add _data
	@git commit -m '(nightly): build _data'
	@git push "https://${GH_TOKEN}@github.com/chaijs/chai-docs" HEAD:refs/heads/gh-pages

#
# Instructions
#

.PHONY: install plugins api-docs docs-server nightly
