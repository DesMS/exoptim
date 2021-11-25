# EXOptim

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Nodejs compression via zlib and others.

## Installation

```bash
$ npm install exoptim
```

index.js:
```js
const express = require("express");
const exoptim = require("exoptim");

const app = express();

app.use(exoptim(/* Options */));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Hello World!");
});
```

index.html:
```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
```

Just type `node index.js` to run the server.

## Usage

```js
/*express app*/.use(/*exoptim require*/(/*options*/));
```

## Options

```json
{
  forceCompressionType: "gzip", // gzip, deflate, br <-> brotli
  forceCompression: false, // true, false
  changeSendFile: true, // true, false
  cacheControl: "no-cache", // See mozilla documentation on cache-control (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
  flushInterval: 1500, // Number, wait in milliseconds
}
```
