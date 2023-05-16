const rust = require("@wasm-tool/rollup-plugin-rust")
const replace = require('rollup-plugin-re');

module.exports = {
	input: 'index.js',
	output: {
		dir: 'dist',
		format: 'cjs'
	},
	plugins: [
		rust({
			cargoArgs: ["-Zbuild-std=std,panic_abort", "-Zbuild-std-features=panic_immediate_abort"],
			wasmOptArgs: ["-Oz"],
			verbose: true,
			inlineWasm: true
		}),
		replace({
			patterns: [
				{
					test: 'input = import.meta.url.replace(/\\.js$/, \'_bg.wasm\');',
					replace: ''
				},
				{
					test: 'input = new URL(\'index_bg.wasm\', import.meta.url);',
					replace: ''
				}
			]
		})
	],
};
