# webkit-line-clamp
![GitHub Action Status](https://github.com/LeMarck/webkit-line-clamp/actions/workflows/lint.yml/badge.svg)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![NPM Version](http://img.shields.io/npm/v/webkit-line-clamp.svg?style=flat)](https://www.npmjs.com/package/webkit-line-clamp)

JS polyfill CSS property [**-webkit-line-clamp**](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp).
Works with nested DOM nodes.

## Browsers support

[Can I use: `-webkit-line-clamp`](https://caniuse.com/#feat=css-line-clamp)


## Installation

```shell script
$ yarn add webkit-line-clamp
# or
$ npm install webkit-line-clamp
```

## Usage

```js
import webkitLineClamp from 'webkit-line-clamp';
// or 
import { webkitLineClamp } from 'webkit-line-clamp';

webkitLineClamp(document.getElementById('text'), 3);
```

## License

[**MIT License**](LICENSE)
