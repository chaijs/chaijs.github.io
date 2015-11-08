#
# Generate the docs and start the doc server
#

all: plugins docs-server

#
# Generate the docs
#

docs: clean-docs
	@mkdir -p _data
	@./node_modules/.bin/dox < ./node_modules/chai/chai.js > _data/chai.json

#
# Generate plugins
#

plugins:
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
# Clean the docs
#

clean-docs:
	@rm -rf _site _data

#
# Start the doc server locally
#

docs-server:
	@bundle exec jekyll serve

#
# Instructions
#

.PHONY: install plugins docs docs-server
