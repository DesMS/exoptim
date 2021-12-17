const ob = require('javascript-obfuscator');
const fs = require(`fs`);

var args = process.argv.slice(2);

fs.readFile(`../src/` + args[0], `utf8`, (e, data) => {
	if (e) {
		throw new Error(e);
		return;
	} else {
		var compressed = ob.obfuscate(data, {
			compact: true,
			controlFlowFlattening: false,
			controlFlowFlatteningThreshold: 0.5,
			deadCodeInjection: false,
			deadCodeInjectionThreshold: 0.4,
			debugProtection: false,
			debugProtectionInterval: false,
			disableConsoleOutput: false,
			domainLock: [],
			domainLockRedirectUrl: `about:blank`,
			forceTransformStrings: [],
			identifierNamesCache: null,
			identifierNamesGenerator: `mangled-shuffled`,
			identifiersDictionary: [],
			identifiersPrefix: '',
			ignoreRequireImports: false,
			inputFileName: '',
			log: false,
			numbersToExpressions: false,
			optionsPreset: `default`,
			renameGlobals: false,
			renameProperties: false,
			renamePropertiesMode: `safe`,
			reservedNames: [],
			reservedStrings: [],
			seed: 0,
			selfDefending: false,
			simplify: true,
			sourceMap: false,
			sourceMapBaseUrl: '',
			sourceMapFileName: '',
			sourceMapMode: `separate`,
			sourceMapSourcesMode: `sources-content`,
			splitStrings: false,
			splitStringsChunkLength: 10,
			stringArray: false,
			stringArrayIndexesType: [`hexadecimal-numeric-string`],
			stringArrayEncoding: [],
			stringArrayIndexShift: false,
			stringArrayRotate: false,
			stringArrayShuffle: false,
			stringArrayWrappersCount: 1,
			stringArrayWrappersChainedCalls: false,
			stringArrayWrappersParametersMaxCount: 2,
			stringArrayWrappersType: `variable`,
			stringArrayThreshold: 0.75,
			target: 'node',
			transformObjectKeys: false,
			unicodeEscapeSequence: false
		}).getObfuscatedCode();
		console.log(`Saved "${formatBytes(parseInt(Buffer.byteLength(data, `utf8`)) - parseInt(Buffer.byteLength(compressed, `utf8`)))}" of space, resulting in "${formatBytes(parseInt(Buffer.byteLength(compressed, `utf8`)), 2)}" of current used space, "${formatBytes(parseInt(Buffer.byteLength(data, `utf8`)), 2)}" old size for "src/index.js"\nWriting to "build/index.js"\n`);
		fs.writeFile(`../build/` + args[0], compressed, (e) => {
			if (e) {
				throw new Error(e);
				return;
			}
		});
		return;
	}
});

function formatBytes(a,b=2,k=1024){with(Math){let d=floor(log(a)/log(k));return 0==a?"0 Bytes":parseFloat((a/pow(k,d)).toFixed(max(0,b)))+" "+["Bytes","kB","mB","gB","tB","pB","eB","zB","yB"][d]}}