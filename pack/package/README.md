# EXOptim

[![https://nodei.co/npm/exoptim.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/exoptim.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/exoptim)

Nodejs compression via zlib and others with other useful features.

(It is recommended to change express.static() to exoptim.static())

## Changlog

### V0.0.11

Releasing next update (With compressed files)

## Installation

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

### changeExIp

Allowed Values:

`true` - Changes the value of `req.exip` to the users ip value or array stated in `options.returnMultiIp` (Recommended)

`false` - Disables the changing of `req.exip`

### returnMultiIp

Allowed Values:

`true` - Returns an array instead of a string (Includes all ips instead of first ip)

`false` - Returns first ip (Recommended)

### returnIpType

Allowed Values:

`ipv4` - Returns on ipv4 addresses (Recommended)

`ipv6` - Returns only ipv6 addresses

`both` - Returns both ip values into array, or if disable, checks every ip

### flush

Allowed Values:

`true`: Flushes the headers every flushInterval ms (Recommended)

`false`: Don't flush the headers

### minCompression

Allowed Values:

Number in bytes, `1000` is 1 kilobyte, `1000 * 1000` is 1 megabyte, `1000 * 1000 * 1000` is 1 gigabyte (10 is recommended)

### autoType

Allowed Values:

`true`: Automatically sets the res.type (Recommended)

`false`: Leaves res.type blank

## secure

Allowed Values:

`true`: Uses best options

`false`: Disables secure

`{}`: Comming Soon, will default to `true`