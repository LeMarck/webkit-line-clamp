# webkit-line-clamp

![GitHub Action Status](https://github.com/LeMarck/webkit-line-clamp/actions/workflows/lint.yml/badge.svg)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![NPM Version](http://img.shields.io/npm/v/webkit-line-clamp.svg?style=flat)](https://www.npmjs.com/package/webkit-line-clamp)

A JavaScript polyfill for the CSS [`-webkit-line-clamp`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) property.

- Works with **nested DOM nodes** (not just plain text).
- Uses the **native browser implementation** when available; falls back to a pure-JS algorithm otherwise.
- Zero dependencies, ~1 KB minified.

## Browser support

Native `-webkit-line-clamp` support: [Can I use: css-line-clamp](https://caniuse.com/#feat=css-line-clamp)

The polyfill (JS fallback) works in any browser that supports `window.getComputedStyle`.

## Installation

```shell
npm install webkit-line-clamp
# or
yarn add webkit-line-clamp
```

## Usage

### ES module

```js
import webkitLineClamp from 'webkit-line-clamp';
// or named import
import { webkitLineClamp } from 'webkit-line-clamp';

webkitLineClamp(document.getElementById('text'), 3);
```

### CommonJS

```js
const webkitLineClamp = require('webkit-line-clamp');

webkitLineClamp(document.getElementById('text'), 3);
```

### Browser (script tag)

```html
<script src="https://unpkg.com/webkit-line-clamp/index.js"></script>
<script>
  webkitLineClamp(document.getElementById('text'), 3);
</script>
```

## API

### `webkitLineClamp(element, lineCount)`

| Parameter   | Type          | Description                                     |
|-------------|---------------|-------------------------------------------------|
| `element`   | `HTMLElement` | The DOM element whose text should be clamped.   |
| `lineCount` | `number`      | Maximum number of lines to show. Must be > 0.   |

Returns `void`. Throws `TypeError` if `element` is not a DOM `Element`.

## How it works

1. If the browser supports `-webkit-line-clamp` natively, the function applies the required CSS properties directly (`display: -webkit-box`, `-webkit-box-orient: vertical`, `overflow: hidden`).
2. Otherwise, it calculates the maximum container height (`lineHeight × lineCount`), then removes words and characters from the end of the text until the element fits, appending an ellipsis (`…`).

## Example

```html
<p id="text" style="width: 200px; font-size: 16px; line-height: 1.5;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>

<script>
  webkitLineClamp(document.getElementById('text'), 2);
</script>
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a full history of changes.

## License

[MIT](LICENSE)
