docs: clean-docs
	@./node_modules/.bin/codex build 
	cp chai/chai.js out/chai.js
	mkdir -p out/public/js/tests
	cp node_modules/mocha/mocha.js out/public/js/tests
	cp -R chai/test/*.js out/public/js/tests

clean-docs:
	@rm -rf out

docs-server:
	@node app.js

.PHONY: docs clean-docs docs-server
