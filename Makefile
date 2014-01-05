#
# Generate the docs and start the doc server
#

all: docs docs-server

#
# Generate the docs
#

docs: clean-docs
	@./node_modules/.bin/codex build
	cp chai/chai.js out/chai.js
	mkdir -p out/public/js/tests
	cp node_modules/mocha/mocha.js out/public/js/tests
	cp -R chai/test/*.js out/public/js/tests

#
# Clean the docs
#

clean-docs:
	@rm -rf out

#
# Start the doc server locally
#

docs-server:
	@node app.js

#
# Instructions
#

.PHONY: docs clean-docs docs-server
