const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
module.exports = [{
    input: 'src/index.ts',
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript()
    ],
    onwarn: function(warning) {
        switch (warning.code) {
            case 'THIS_IS_UNDEFINED': return;
        }
        console.warn( warning.message );
    },
    output: {
        sourcemap: true,
        file: 'bundle.js',
        format: 'iife'
    }
}, {
    input: 'src/sw.ts',
    plugins: [
        typescript(),
        nodeResolve(),
        commonjs()
    ],
    onwarn: function(warning) {
        switch (warning.code) {
            case 'THIS_IS_UNDEFINED': return;
        }
        console.warn( warning.message );
    },
    output: {
        file: 'sw.js',
        format: 'iife'
    }
}]
