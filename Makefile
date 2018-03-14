#
# Generate the docs and start the doc server
#

all: generated_data docs-server

#
# Generate the docs
#
generated_data: plugins releases api-docs chaijs

#
# Generate the api docs
#

api-docs: clean-api-docs
	@mkdir -p _data
	@npm install chai@latest
	@./node_modules/.bin/dox --raw < ./node_modules/chai/chai.js > _data/chai.json

#
# Generate the api docs
#

chaijs: ./node_modules/chai/chai.js
	@@cp ./node_modules/chai/chai.js ./chai.js


#
# Generate the releases
#

releases: clean-releases
	@mkdir -p _data
	@curl -s $(shell [ -n "${GH_TOKEN}" ] && echo "-H \"Authorization: token ${GH_TOKEN}\"") "https://api.github.com/repos/chaijs/chai/releases" > _data/releases.json

#
# Generate plugins
#

plugins: clean-plugins
	@mkdir -p _data/plugins
	@./node_modules/.bin/npm-plugin-fetcher -b _scripts/banned_plugins.js -o _data/plugins chai-plugin
	@xargs -n1 -I! sh -c 'echo ! && curl -s "https://registry.npmjs.com/!" > _data/plugins/!.json' < _legacy_plugins
	@node _scripts/build-plugin-tags.js
	@node _scripts/build-plugin-pages.js

#
# Install all dependencies
#

install:
	@npm install
	@bundle install

#
# Clean
#

clean: clean-plugins clean-api-docs clean-releases

#
# Clean the plugins
#

clean-plugins:
	@rm -rf _data/plugins/ _data/plugin_keywords.json

#
# Clean the api- docs
#

clean-api-docs:
	@rm -rf _data/chai.json

#
# Clean the releases
#

clean-releases:
	@rm -rf _data/releases.json

#
# Start the doc server locally
#

docs-server:
	@bundle exec jekyll serve

#
# Pages data build process
#
ifneq ($(TRAVIS_BRANCH), master)
pages:
	@echo "Cowardly refusing to build pages"
else
pages: install clean generated_data
	@echo "Comitting to master"
	@git config user.name "ChaiJs Bot"
	@git config user.email "chaijs-bot@keithcirkel.co.uk"
	@git add -f chai.js _data plugins/*.md
	@git commit -m '(data): Auto build _data'
	@git push "https://${GH_TOKEN}@github.com/chaijs/chaijs.github.io" HEAD:refs/heads/master
endif

.PHONY: all api-docs releases plugins install clean-plugins clean-api-docs docs-server nightly chaijs
