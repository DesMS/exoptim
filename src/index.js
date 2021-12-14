'use strict';

// Repl.it new intellisense sucks, is more laggy, and doesn't even use monaco, just let us choose or let us use vscode.dev

const https = require(`https`);
const http = require(`http`);
const path = require(`path`);
const zlib = require(`zlib`);
const pat = require(`path`);
const net = require(`net`);
const dns = require(`dns`);
const fs = require(`fs`);
const os = require(`os`);

var doneexpress = false;

exports = module.exports = main;

function main(options = {
	forceCompressionType: `gzip`,
	forceCompression: false,
	minCompression: 0,
	changeSendFile: true,
	changeSend: true,
	changeJson: true,
	cacheControl: `no-cache`,
	flush: true,
	flushInterval: 1500,
	changeExIp: true,
	returnIpType: `ipv4`,
	returnMultiIp: false,
	autoType: true,
	secure: true
}) {
	options = options || {};
	
	if (options.forceCompressionType == undefined) {
		options.forceCompressionType = `gzip`;
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
	if (options.changeExIp == undefined) {
		options.changeExIp = true;
	}
	if (options.returnMultiIp == undefined) {
		options.returnMultiIp = false;
	}
	if (options.returnIpType == undefined) {
		options.returnIpType = `ipv4`;
	}
	if (options.flush == undefined) {
		options.flush = true;
	}
	if (options.minCompression == undefined) {
		options.minCompression = 0;
	}
	if (options.changeJson == undefined) {
		options.changeJson = true;
	}
	if (options.changeJsonp == undefined) {
		options.changeJsonp = true;
	}
	if (options.changeWrite == undefined) {
		options.changeWrite = true;
	}
	if (options.autoType == undefined) {
		options.autoType = true;
	}
	if (options.changeExResponseTime == undefined) {
		options.changeExResponseTime = true;
	}
	if (options.secure == undefined || options.secure == {}) {
		options.secure = true;
	}

	options.forceCompressionType = options.forceCompressionType.toLowerCase();
	options.cacheControl = options.cacheControl.toLowerCase();
	options.returnIpType = options.returnIpType.toLowerCase();
	options.minCompression = parseInt(options.minCompression);
	options.flushInterval = parseInt(options.flushInterval);

	return function(req, res, next) {
		if (doneexpress == false) {
			doneexpress = true;
			const app = res.app;

			if (options.secure == true) {
				app.disable(`x-powered-by`);
				app.set(`etag`, `strong`);
				dns.lookup(os.hostname(), function (err, ip, fam) 	{
					app.set(`trust proxy`, (i) => {
						if (i == ip || i == `127.0.0.1` || i == `127.0.0.8` || i == `::128` || i == `::1` || i == `169.254.0.0` || i == `196.254.0.16` || i == `fe80::` || i == `fe80::10` || i == `10.0.0.0` || i == `10.0.0.8` || i == `172.16.0.0` || i == `172.16.0.12` || i == `192.168.0.0` || i == `192.168.0.16` || i == `fc00::` || i == `fc00::7`) {
							return true;
						} else {
							return false;
						}
					});
				});
			}
		}
		if (options.changeSendFile == true) {
			res.sendFile = function(path, fn) {
				try {
					res.set({
						'Cache-Control': options[`cacheControl`]
					});
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
					res.end(new Buffer.from(e.toString()));
					return;
				}
				
				var extension = pat.extname(path);
				fs.readFile(path, (e, data) => {
					if (e) {
						if (fn != undefined) {
							fn(e);
						} else {
							console.error(e);
						}
						res.end(new Buffer.from(e.toString()));
						return;
					}
					var body = new Buffer.from(data);
					if (options.forceCompression == false) {
						if (enc.match(/\bgzip\b/)) {
							zlib.gzip(body, (e, data) => {
								if (e) {
									if (fn != undefined) {
										fn(e);
									} else {
										console.error(e);
									}
									res.end(new Buffer.from(e.toString()));
									return;
								} else {
									res.set({
										'Content-Encoding': `gzip`
									});
									if (options.autoType == true) {
										res.set({
											'Content-Type': extension
										});
									}
									res.end(data);
								}
							});
						} else if (enc.match(/\bdeflate\b/)) {
							zlib.deflate(body, (e, data) => {
								if (e) {
									if (fn != undefined) {
										fn(e);
									} else {
										console.error(e);
									}
									res.end(new Buffer.from(e.toString()));
									return;
								} else {
									res.set({
										'Content-Encoding': `deflate`
									});
									if (options.autoType == true) {
										res.set({
											'Content-Type': extension
										});
									}
									res.end(data);
								}
							});
						} else if (enc.match(/\bbr\b/)) {
							zlib.brotliCompress(body, (e, data) => {
								if (e) {
									if (fn != undefined) {
										fn(e);
									} else {
										console.error(e);
									}
									res.end(new Buffer.from(e.toString()));
									return;
								} else {
									res.set({
										'Content-Encoding': `br`
									});
									if (options.autoType == true) {
										res.set({
											'Content-Type': extension
										});
									}
									res.end(data);
								}
							});
						} else {
							try {
								res.end(body);
							} catch (e) {
								if (fn != undefined) {
									fn(e);
								} else {
									console.error(e);
								}
								res.end(new Buffer.from(e.toString()));
								return;
							}
						}
					} else {
						if (options.forceCompressionType == `gzip`) {
							try {
								zlib.gzip(body, (e, data) => {
									if (e) {
										if (fn != undefined) {
											fn(e);
										} else {
											console.error(e);
										}
										res.end(new Buffer.from(e.toString()));
										return;
									} else {
										res.set({
											'Content-Encoding': `gzip`
										});
										if (options.autoType == true) {
											res.set({
												'Content-Type': extension
											});
										}
										res.end(data);
									}
								});
							} catch (e) {
								if (fn != undefined) {
									fn(e);
								} else {
									console.error(e);
								}
								res.end(new Buffer.from(e.toString()));
								return;
							}
						} else if (options.forceCompressionType == `deflate`) {
							try {
								zlib.deflate(body, (e, data) => {
									if (e) {
										if (fn != undefined) {
											fn(e);
										} else {
											console.error(e);
										}
										res.end(new Buffer.from(e.toString()));
										return;
									} else {
										res.set({
											'Content-Encoding': `deflate`
										});
										if (options.autoType == true) {
											res.set({
												'Content-Type': extension
											});
										}
										res.end(data);
									}
								});
							} catch (e) {
								if (fn != undefined) {
									fn(e);
								} else {
									console.error(e);
								}
								res.end(new Buffer.from(e.toString()));
								return;
							}
						} else if (options.forceCompressionType == `br` || options.forceCompressionType == `brotli`) {
							try {
								zlib.brotliCompress(body, (e, data) => {
									if (e) {
										if (fn != undefined) {
											fn(e);
										} else {
											console.error(e);
										}
										res.end(new Buffer.from(e.toString()));
										return;
									} else {
										res.set({
											'Content-Encoding': `br`
										});
										if (options.autoType == true) {
											res.set({
												'Content-Type': extension
											});
										}
										res.end(data);
									}
								});
							} catch (e) {
								if (fn != undefined) {
									fn(e);
								} else {
									console.error(e);
								}
								res.end(new Buffer.from(e.toString()));
								return;
							}
						} else {
							if (fn != undefined) {
								fn(`Invalid compression type.`);
							} else {
								console.error(`Invalid compression type.`);
							}
							res.end(new Buffer.from(`Invalid compression type.`));
							return;
						}
					}
				});
			}
		}
		if (options.changeSend == true) {
			res.send = function(body = ``) {
				body = new Buffer.from(body.toString());
				
				var enc;

				try {
					res.set({
						'Cache-Control': options[`cacheControl`]
					});
					enc = req.headers[`accept-encoding`];

					if (!enc) {
						enc = ``;
					}
				} catch (e) {
					console.error(e);
					res.end(new Buffer.from(e.toString()));
					return;
				}

				if (Buffer.byteLength(body) < options.minCompression) {
					res.end(body);
					return;
				}

				if (options.forceCompression == false) {
					if (enc.match(/\bgzip\b/)) {
						try {
							zlib.gzip(body, (err, data) => {
								if (err) {
									res.end(new Buffer.from(err));
								} else {
									res.set({
										'Content-Encoding': `gzip`
									});
									res.end(data);
								}
							});
						} catch (e) {
							console.error(e);
							res.end(new Buffer.from(e.toString()));
							return;
						}
					} else if (enc.match(/\bdeflate\b/)) {
						try {
							zlib.deflate(body, (err, data) => {
								if (err) {
									res.end(new Buffer.from(err));
								} else {
									res.set({
										'Content-Encoding': `deflate`
									});
									res.end(data);
								}
							});
						} catch (e) {
							console.error(e);
							res.end(new Buffer.from(e.toString()));
							return;
						}
					} else if (enc.match(/\bbr\b/)) {
						try {
							zlib.brotliCompress(body, (err, data) => {
								if (err) {
									res.end(new Buffer.from(err));
								} else {
									res.set({
										'Content-Encoding': `br`
									});
									res.end(data);
								}
							});
						} catch (e) {
							console.error(e);
							res.end(new Buffer.from(e.toString()));
							return;
						}
					} else {
						try {
							res.end(body);
						} catch (e) {
							console.error(e);
							res.end(new Buffer.from(e.toString()));
							return;
						}
					}
				} else {
					if (options.forceCompressionType == `gzip`) {
						try {
							zlib.gzip(body, (err, data) => {
								if (err) {
									res.end(new Buffer.from(err));
								} else {
									res.set({
										'Content-Encoding': `gzip`
									});
									res.end(data);
								}
							});
						} catch (e) {
							console.error(e);
							res.end(new Buffer.from(e.toString()));
							return;
						}
					} else if (options.forceCompressionType.toLocaleLowerCase() == `deflate`) {
						try {
							zlib.deflate(body, (err, data) => {
								if (err) {
									res.end(new Buffer.from(err));
								} else {
									res.set({
										'Content-Encoding': `deflate`
									});
									res.end(data);
								}
							});
						} catch (e) {
							console.error(e);
							res.end(new Buffer.from(e.toString()));
							return;
						}
					} else if (options.forceCompressionType == `br` || options.forceCompressionType == `brotli`) {
						try {
							zlib.brotliCompress(body, (err, data) => {
								if (err) {
									res.end(new Buffer.from(err));
								} else {
									res.set({
										'Content-Encoding': `br`
									});
									res.end(data);
								}
							});
						} catch (e) {
							console.error(e);
							res.end(new Buffer.from(e.toString()));
							return;
						}
					} else {
						if (fn != undefined) {
							fn(e);
						} else {
							console.error(`Invalid compression type.`);
							res.end(new Buffer.from(`Invalid compression type.`));
						}
						return;
					}
				}
			}
		}
		if (options.changeJson == true) {

		}
		if (options.changeJsonp == true) {
			
		}
		if (options.changeWrite == true) {
			
		}
		if (options.changeExIp == true) {
			var ip = ``;
			var ips = [];
			var ipheadtypes = [];
			var ipconnectiontypes = [];

			if (req.headers) {
				if (checkIp(req.headers[`true-client-ip`]) == true) {
					ipheadtypes[ipheadtypes.length] = `true-client-ip`;
				}

				if (checkIp(req.headers[`x-real-ip`]) == true) {
					ipheadtypes[ipheadtypes.length] = `x-real-ip`;
				}

				if (checkIp(req.headers[`fastly-client-ip`]) == true) {
					ipheadtypes[ipheadtypes.length] = `fastly-client-ip`;
				}

				if (checkIp(req.headers[`cf-connecting-ip`]) == true) {
					ipheadtypes[ipheadtypes.length] = `cf-connecting-ip`;
				}

				if (checkIp(req.headers[`x-client-ip`]) == true) {
					ipheadtypes[ipheadtypes.length] = `x-client-ip`;
				}

				if (checkIp(req.headers[`x-cluster-client-ip`]) == true) {
					ipheadtypes[ipheadtypes.length] = `x-cluster-client-ip`;
				}

				if (checkIp(req.headers[`forwarded-for`]) == true) {
					ipheadtypes[ipheadtypes.length] = `forwarded-for`;
				}

				if (checkIp(req.headers[`x-forwarded-for`]) == true) {
					ipheadtypes[ipheadtypes.length] = `x-forwarded-for`;
				}

				if (checkIp(req.headers[`forwarded`]) == true) {
					ipheadtypes[ipheadtypes.length] = `forwarded`;
				}

				if (checkIp(req.headers[`x-forwarded`]) == true) {
					ipheadtypes[ipheadtypes.length] = `x-forwarded`;
				}

				for (var i = 0; i < ipheadtypes.length; i++) {
					ips[ips.length] = req.headers[ipheadtypes[i]];
				}
			}

			if (req.connection) {
				if (checkIp(req.connection.remoteAddress) == true) {
					ips[ips.length] = req.connection.remoteAddress;
				}

				if (req.connection.socket && checkIp(req.connection.socket.remoteAddress) == true) {
					ips[ips.length] = req.connection.socket.remoteAddress;
				}
			}

			if (req.socket && checkIp(req.socket.remoteAddress) == true) {
				ips[ips.length] = req.socket.remoteAddress;
			}

			if (req.info && checkIp(req.info.remoteAddress) == true) {
				ips[ips.length] = req.info.remoteAddress
			}

			if (req.requestContext && req.requestContext.identity && checkIp(req.requestContext.identity.sourceIp) == true) {
				ips[ips.length] = req.requestContext.identity.sourceIp;
			}

			if (options.returnMultiIp == true) {
				req.exip = ips;
			} else {
				req.exip = ips[0];
			}
		}
		if (options.flush == true) {
			try {
				var timer = setInterval(() => {
					res.flushHeaders();
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
		}
		next();
	}
	
	function checkIp(ip = ``) {
		if (options.returnIpType == `ipv4`) {
			if (net.isIPv4(ip)) {
				return true;
			} else {
				return false;
			}
		} else if (options.returnIpType == `ipv6`) {
			if (net.isIPv6(ip)) {
				return true;
			} else {
				return false;
			}
		} else if (options.returnIpType == `both`) {
			if (net.isIP(ip)) {
				return true;
			} else {
				return false;
			}
		}
	}
}