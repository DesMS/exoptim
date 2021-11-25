# EXOptim

[![NPM Version](https://img.shields.io/node/v/[exoptim].svg?style=flat)](http://nodejs.org/download/)
[![Build Status](https://api.travis-ci.com/DesMS/exoptim.png?branch=master)](https://travis-ci.com/DesMS/exoptim)

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
</html>
```

Just type `node index.js` to run the server.

## Usage

```js
/*express app*/.use(/*exoptim require*/(/*options*/));
```

## Options

Default / Example.

```js
{
  forceCompressionType: "gzip",
  forceCompression: false,
  changeSendFile: true,
  cacheControl: "no-cache",
  flushInterval: 1500,
}
```

### forceCompressionType

Allowed Values:

`gzip` - Forces the "GZip" compression type type when data is sent.  (Recommended)
`deflate` - Forces the "Deflate" compression type type when data is sent.
`br` <-> `brotli` - Forces the "Brotli" compression type when data is sent.

(ONLY ACTIVATED IF forceCompression IS `true`)

### forceCompression

Allowed Values:

`true` - Forces compression to be set to "forceCompressionType" value.
`false` - Uses automatic compression.  (Recommended)

### changeSendFile

Allowed Values:

`true` - Changes res.sendFile() command to custom command to optimize command.  (Recommended)
`false` - Uses default res.sendFile() command.

### cacheControl

Allowed Values:

See mozilla documentation on cache-control header (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

### flushInterval

Allowed Values:

Number in MS (One millisecond is 1,000 times smaller than a second)
