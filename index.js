const zlib = require(`zlib`);
const fs = require(`fs`);

module.exports = function(options = {
	forceCompressionType: `Gzip`,
	forceCompression: false,
	changeSendFile: true,
	cacheControl: `no-cache`,
	flushInterval: 1500
}) {
	options = options || {};
	if (options.forceCompressionType == undefined) {
		options.forceCompressionType = `Gzip`;
	}
	if (options.forceCompression == undefined) {
		options.forceCompression = false;
	}
	if (options.changeSendFile == undefined) {
		options.changeSendFile = true;
	}
	if (options.cacheControl == undefined) {
		options.cacheControl = `no-cache`;
	}
	if (options.flushInterval == undefined) {
		options.flushInterval = 1500;
	}
	return function(req, res, next) {
		if (options.changeSendFile == true) {
			res.sendFile = function(path) {
				res.setHeader(`Cache-Control`, options[`cacheControl`]);
				var enc = req.headers[`accept-encoding`];

				if (!enc) {
					enc = ``;
				}

				var raw;
				try {
					fs.accessSync(path);
					raw = fs.createReadStream(path);
				} catch(e) {
					console.error(e);
					return;
				}
				
				if (options.forceCompression == false) {
					if (enc.match(/\bgzip\b/)) {
						res.writeHead(200, {
							"content-encoding": "gzip"
						});
						raw.pipe(zlib.createGzip()).pipe(res);
					} else if (enc.match(/\bdeflate\b/)) {
						res.writeHead(200, {
							"content-encoding": "deflate"
						});
						raw.pipe(zlib.createDeflate()).pipe(res);
					} else if (enc.match(/\bbr\b/)) {
						res.writeHead(200, {
							"content-encoding": "br"
						});
						raw.pipe(zlib.createBrotliCompress()).pipe(res);
					} else {
						res.writeHead(200, {});
						raw.pipe(res);
					}
				} else {
					if (options.forceCompressionType.toLocaleLowerCase() == `gzip`) {
						res.writeHead(200, {
							"content-encoding": "gzip"
						});
						raw.pipe(zlib.createGzip()).pipe(res);
					} else if (options.forceCompressionType.toLocaleLowerCase() == `deflate`) {
						res.writeHead(200, {
							"content-encoding": "deflate"
						});
					} else if (options.forceCompressionType.toLocaleLowerCase() == `br` || options.forceCompressionType.toLocaleLowerCase() == `brotli`) {
						res.writeHead(200, {
							"content-encoding": "br"
						});
						raw.pipe(zlib.createBrotliCompress()).pipe(res);
					} else {
						console.error(`Invalid compression type.`);
					}
				}
			}
		}
		var timer = setInterval(() => {
			res.flush();
		}, options.flushInterval);

		res.on(`close`, () => {
			clearInterval(timer);
		});
		next();
	}
}
