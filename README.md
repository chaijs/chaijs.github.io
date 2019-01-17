chai-docs
=========

The chaijs.com website source code. Contributions welcome.

## Quick Start guide

You need to have `git`, `node` with `npm` and `ruby` with `bundler`, then -
with this repository checked out - you can run the following:

```
$ make install
$ make
```

The site should be being served up on [http://127.0.0.1:4000/](http://127.0.0.1:4000/).

## Full Instructions

You'll need to have `git`, `node` with `npm` and `ruby` with `bundler`. Follow
the install instructions here for your operating system:

<details>
<summary>Installation on Debian Linux</summary>

If you're running a debian based distro, run the following command:

```
$ sudo apt-get install -y git nodejs ruby
```

The `nodejs` package on ubuntu is quite old, you _probably_ want a newer
version. [Consult the documentation for adding the official Node.js
PPA](https://github.com/nodesource/distributions/blob/master/README.md)

Now you'll need to install `bundler` for ruby:

```
$ sudo gem install bundler
```
</details>

<details>
<summary>Installation on MacOS</summary>

#### Git

Firstly ensure you have `git` which comes with the XCode Command Line Tools.
You can run the following command:

```sh
$ xcode-select --install
```

You should now have `git`, you can check by running

```sh
$ git --version
git version 2.20.1
```

#### Node

If you have homebrew, you can simply run `brew install node`. Otherwise you'll
need to vist the [node.js site](https://nodejs.org/en/download/) and download
the Node.js installer. Node ships with npm by default, so you should find that
when you run `node -v` and `npm -v` on the command line, you get some output
like this:

```sh
$ node -v
11.1.0
$ npm -v
6.4.1
```

#### Ruby

Ruby comes installed by default on MacOS. However `bundler` does not. To
install bundler, run the following:

```sh
$ sudo gem install bundler
```

Now you should have bundler, you can check by running:

```sh
$ bundler -v
Bundler version 2.0.1
```
</details>

## Cloning the repository

To clone the website to your local machine, run the following:

```
$ git clone https://github.com/chaijs/chaijs.github.io
```

It will generate a folder named `chaijs.github.io`, from within that directory,
you can run `make install` to download the dependencies:

```
$ make install
```

Read the logs carefully, you might notice a message saying:

```
Following files may not be writable, so sudo is needed:
  ...
```

If you see this message, you can opt to run `sudo make install` - or
alternatively run the steps manually:

```
$ sudo bundle install
$ npm install
```

## Running the server

The server can be run using the bare `make` command, like so:

```sh
$ make
```

This command is shorthand for the following two commands:

```sh
$ make generated_data
$ make docs-server
```

`make docs-server` will run the `jekyll` web server, which hosts the website on
[http://127.0.0.1:4000/](http://127.0.0.1:4000/). You should be able to visit this
URL and see a local copy of the chaijs website running.
