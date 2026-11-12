#
# Generate the docs and start the doc server
#

all: generated_data docs-server

#
# Generate the docs (plugin data is committed; refresh it with `make plugins`)
#
generated_data: releases api-docs chaijs

#
# Generate the api docs
#
# The chai release to document. Override CHAI_DIR to build from a local
# checkout instead, e.g. `make api-docs CHAI_DIR=../chai`.
#

CHAI_REF ?= v4.3.7
CHAI_CLONE = .chai
CHAI_DIR ?= $(CHAI_CLONE)

api-docs: clean-api-docs
	@mkdir -p _data
	@if [ "$(CHAI_DIR)" = "$(CHAI_CLONE)" ]; then \
		rm -rf $(CHAI_CLONE); \
		git -c advice.detachedHead=false clone -q --depth 1 --branch $(CHAI_REF) https://github.com/chaijs/chai.git $(CHAI_CLONE); \
	fi
	@node _scripts/build-api-docs.js $(CHAI_DIR)/lib > _data/chai.json

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
# Generate plugins from the accepted list in _plugins.json
#

plugins: clean-plugins
	@node _scripts/fetch-plugins.js
	@node _scripts/build-plugin-tags.js
	@node _scripts/build-plugin-pages.js

#
# Accept or reject newly published plugins (run manually, then open a PR)
#

MIN_DOWNLOADS ?= 0

review-plugins:
	@node _scripts/review-plugins.js --min-downloads $(MIN_DOWNLOADS)

#
# Install all dependencies
#

install:
	@npm install
	@bundle install

#
# Clean
#

clean: clean-api-docs clean-releases

#
# Clean the plugins
#

clean-plugins:
	@rm -rf _data/plugins/ _data/plugin_keywords.json plugins/*.md

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
should_build = true
ifneq ($(TRAVIS_BRANCH), master)
	should_build = false
endif
ifneq ($(TRAVIS_PULL_REQUEST), false)
	should_build = false
endif
ifeq ($(should_build), false)
pages:
	@echo "Cowardly refusing to build pages"
else
pages: install clean generated_data
	@if [ -z "$$(git status --porcelain)" ]; then\
		echo "Nothing to commit. Build complete";\
	else\
		echo "Comitting to master";\
		git config user.name "ChaiJs Bot";\
		git config user.email "chaijs-bot@keithcirkel.co.uk";\
		git add -f chai.js _data plugins/*.md;\
		git commit -m '(data): Auto build _data';\
		git push "https://${GH_TOKEN}@github.com/chaijs/chaijs.github.io" HEAD:refs/heads/master;\
	fi
endif

.PHONY: all api-docs releases plugins review-plugins install clean-plugins clean-api-docs docs-server nightly chaijs
