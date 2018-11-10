# webkit-line-clamp
[![Build Status](https://travis-ci.org/LeMarck/webkit-line-clamp.svg?branch=master)](https://travis-ci.org/LeMarck/webkit-line-clamp)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm Version](http://img.shields.io/npm/v/webkit-line-clamp.svg?style=flat)](https://www.npmjs.com/package/webkit-line-clamp)

JS polyfill CSS property [**-webkit-line-clamp**](https://caniuse.com/#feat=css-line-clamp).
Works with nested DOM nodes.

## Installation

Install via [**yarn**](https://yarnpkg.com):

```sh
$ yarn add webkit-line-clamp
```

Or [**npm**](https://npmjs.com):

```sh
$ npm install --save webkit-line-clamp
```

## Usage

#### JavaScript
```js
var webkitLineClamp = require('webkit-line-clamp');

webkitLineClamp(document.getElementById('text'), 3);
```

#### TypeScript
```ts
import webkitLineClamp from 'webkit-line-clamp';

webkitLineClamp(document.getElementById('text'), 3);
```

## License

[**MIT**](LICENSE)
