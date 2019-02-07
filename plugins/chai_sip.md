---
layout: plugin
permalink: plugins/chai-sip/
pluginName: chai-sip
---

# chai-sip

## Installation

`$ npm install chai-sip --save`

## Introduction
[Chai](https://github.com/chaijs/chai) plugin simplifying development of SIP server tests written in Node for CI/CD pipelines. It supports sending SIP requests and assert based on responses.

It also supports test cases where sending of RTP media is required as it will send audio to the destinations in the SDP received for a 200 OK to a sent SIP invite request.

Current version supports

* Send SIP Invite requests with the following parameters
  * SIP Request URI
  * Custom headers and values
  * Content-type
  * Request body
* High level API to send SIPRec Invite requests with the following parameters
  * SIP Request URI
  * Custom headers and values
  * Content-type
  * Request body
* SIP Message requests with the following parameters
  * SIP Request URI
  * Custom headers and values
  * Content-type
  * Request body
* Wait for incoming SIP requests
* High level API to send SIP Bye request within established dialog
* Callback upon final SIP response
* Support for proxy authentication using SIP digest authentication
* Supports SIP over UDP, TCP and TLS transports
* Supports deployments with multiple proxy hops and record-route

In addtion to be able to send and receive SIP requests it provides the following new asserts:

* to.be.method() - To assert on a received SIP requests method type, for example `request.to.be.method("INVITE")`
* to.be.status() - To assert on a received SIP response status code, for example `response.to.be.status(200)`

If no headers, content-types and bodies are passed to the request function the plugin will generate default headers and bodies useful for basic test scenarios.

The plugin using sip.js, please have a look at its [documentation](https://github.com/kirm/sip.js/blob/master/doc/api.markdown) to understand the configuration options and SIP request and response models and header configuration in more detail.

If you need to troubleshoot your tests and get more information about what is going on set the LOG_LEVEL environment variable to the value verbose, for example:

`$ export LOG_LEVEL=verbose`

## Getting started

Have a look at the examples in [this repository](https://github.com/iotcomms/chai-sip-examples).

*This project is sponsored by [iotcomms.io](https://iotcomms.io).*
