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
const zlib = require(`zlib`);
const fs = require(`fs`);

module.exports = function(options = {
	forceCompressionType: `Gzip`,
	forceCompression: false,
	changeSendFile: true,
	changeSend: true,
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
	if (options.changeSend == undefined) {
		options.changeSend = true;
	}
	if (options.cacheControl == undefined) {
		options.cacheControl = `no-cache`;
	}
	if (options.flushInterval == undefined) {
		options.flushInterval = 1500;
	}
	return function(req, res, next) {
		if (options.changeSendFile == true) {
			res.sendFile = function(path, fn) {
				try {
					res.setHeader(`Cache-Control`, options[`cacheControl`]);
					var enc = req.headers[`accept-encoding`];

					if (!enc) {
						enc = ``;
					}
				} catch (e) {
					if (fn != undefined) {
						fn(e);
					} else {
						console.error(e);
					}
					return;
				}

				var raw;
				try {
					fs.accessSync(path);
					raw = fs.createReadStream(path);
				} catch(e) {
					if (fn != undefined) {
						fn(e);
					} else {
						console.error(e);
					}
					return;
				}
				
				if (options.forceCompression == false) {
					if (enc.match(/\bgzip\b/)) {
						try {
							res.writeHead(200, {
								"content-encoding": "gzip"
							});
							raw.pipe(zlib.createGzip()).pipe(res);
						} catch (e) {
							if (fn != undefined) {
								fn(e);
							} else {
								console.error(e);
							}
							return;
						}
					} else if (enc.match(/\bdeflate\b/)) {
						try {
							res.writeHead(200, {
								"content-encoding": "deflate"
							});
							raw.pipe(zlib.createDeflate()).pipe(res);
						} catch (e) {
							if (fn != undefined) {
								fn(e);
							} else {
								console.error(e);
							}
							return;
						}
					} else if (enc.match(/\bbr\b/)) {
						try {
							res.writeHead(200, {
								"content-encoding": "br"
							});
							raw.pipe(zlib.createBrotliCompress()).pipe(res);
						} catch (e) {
							if (fn != undefined) {
								fn(e);
							} else {
								console.error(e);
							}
							return;
						}
					} else {
						try {
							res.writeHead(200, {});
							raw.pipe(res);
						} catch (e) {
							if (fn != undefined) {
								fn(e);
							} else {
								console.error(e);
							}
							return;
						}
					}
				} else {
					if (options.forceCompressionType.toLocaleLowerCase() == `gzip`) {
						try {
							res.writeHead(200, {
								"content-encoding": "gzip"
							});
							raw.pipe(zlib.createGzip()).pipe(res);
						} catch (e) {
							if (fn != undefined) {
								fn(e);
							} else {
								console.error(e);
							}
							return;
						}
					} else if (options.forceCompressionType.toLocaleLowerCase() == `deflate`) {
						try {
							res.writeHead(200, {
								"content-encoding": "deflate"
							});
							raw.pipe(zlib.createDeflate()).pipe(res);
						} catch (e) {
							if (fn != undefined) {
								fn(e);
							} else {
								console.error(e);
							}
							return;
						}
					} else if (options.forceCompressionType.toLocaleLowerCase() == `br` || options.forceCompressionType.toLocaleLowerCase() == `brotli`) {
						try {
							res.writeHead(200, {
								"content-encoding": "br"
							});
							raw.pipe(zlib.createBrotliCompress()).pipe(res);
						} catch (e) {
							if (fn != undefined) {
								fn(e);
							} else {
								console.error(e);
							}
							return;
						}
					} else {
						if (fn != undefined) {
							fn(e);
						} else {
							console.error(`Invalid compression type.`);
						}
						return;
					}
				}
			}
		}
		if (options.changeSend == true) {
			/*res.send = function(data) {

			}*/
		}
		try {
		var timer = setInterval(() => {
			res.flush();
		}, options.flushInterval);
		} catch (e) {
			console.error(e);
		}

		res.on(`close`, () => {
			try {
				clearInterval(timer);
			} catch (e) {
				console.error(e);
			}
		});
		next();
	}
}
