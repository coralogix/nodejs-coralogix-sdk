# Coralogix Node.js SDK

[![npm](https://img.shields.io/npm/v/coralogix-logger.svg)](https://www.npmjs.com/package/coralogix-logger)
[![license](https://img.shields.io/github/license/coralogix/nodejs-coralogix-sdk.svg)](https://raw.githubusercontent.com/coralogix/nodejs-coralogix-sdk/master/LICENSE)
[![node](https://img.shields.io/node/v/coralogix-logger.svg)](https://www.npmjs.com/package/coralogix-logger)
[![npm](https://img.shields.io/npm/dt/coralogix-logger.svg)](https://www.npmjs.com/package/coralogix-logger)
[![Build Status](https://travis-ci.org/coralogix/nodejs-coralogix-sdk.svg?branch=master)](https://travis-ci.org/coralogix/nodejs-coralogix-sdk)
[![codecov](https://codecov.io/gh/coralogix/nodejs-coralogix-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/coralogix/nodejs-coralogix-sdk)
[![Maintainability](https://api.codeclimate.com/v1/badges/474f12c23edee33936b9/maintainability)](https://codeclimate.com/github/coralogix/python-coralogix-sdk/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/474f12c23edee33936b9/test_coverage)](https://codeclimate.com/github/coralogix/python-coralogix-sdk/test_coverage)
[![GitHub issues](https://img.shields.io/github/issues/coralogix/nodejs-coralogix-sdk.svg)](https://github.com/coralogix/nodejs-coralogix-sdk/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/coralogix/nodejs-coralogix-sdk.svg)](https://github.com/coralogix/nodejs-coralogix-sdk/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/coralogix/nodejs-coralogix-sdk.svg)](https://github.com/coralogix/nodejs-coralogix-sdk/graphs/contributors)

-----
Use *coralogix-logger* to easily send your logs to [Coralogix's](http://www.coralogix.com) log analytics platform.

## Table of Content

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#installation)
    * [JavaScript](#javascript)
    * [TypeScript](#typescript)

## Prerequisites

Before beginning you must have installed:

* Node.js
* npm

## Installation

```sh
npm install --save coralogix-logger
```

## Usage

### JavaScript

```js
var Coralogix = require("coralogix-logger");

// global confing for application name, private key, subsystem name
const config = new Coralogix.LoggerConfig({
    applicationName: "node tester",
    privateKey: "YOUR_PRIVATE_KEY",
    subsystemName: "node tester sub",
});

Coralogix.CoralogixLogger.configure(config);

// create a new logger with category
const logger = new Coralogix.CoralogixLogger("My Category");

// create a log
const log = new Coralogix.Log({
    severity: Coralogix.Severity.info,
    className: "className",
    methodName: "methodName",
    text: "log data",
})
// send log to coralogix
logger.addLog(log);
```

### TypeScript

For using *TypeScript* sources you should clone this repository, because
it's not included in *npm* distribution.

```typescript
import {Log, Severity, CoralogixLogger, LoggerConfig} from "coralogix-logger";

// global confing for application name, private key, subsystem name
const config = new LoggerConfig({
    applicationName: "node tester",
    privateKey: "YOUR_PRIVATE_KEY",
    subsystemName: "node tester sub",
});

CoralogixLogger.configure(config);

// create a new logger with category
logger: CoralogixLogger = new CoralogixLogger("My Category")

// create a log
const log = new Log({
    severity: Severity.info,
    className: "className",
    methodName: "methodName",
    text: "log data",
})
// send log to coralogix
logger.addLog(log);
```
