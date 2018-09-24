'use strict';

var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');

module.exports = {
    input: 'index.js',
    output: {
        file: 'dist/webkit-line-clamp.min.js',
        format: 'iife',
        name: 'webkitLineClamp',
        sourcemap: true,
        strict: true
    },
    plugins: [
        commonjs(),
        uglify.uglify()
    ]
};
