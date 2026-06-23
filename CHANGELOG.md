# Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] — 2026-06-23

### Fixed
- Replaced direct property assignment on DOM elements (`element.inlineCssText`) with a `WeakMap`-based cache to avoid polluting the DOM object prototype.
- Replaced linear `while (chunks.pop())` word-search with a binary search, significantly reducing the number of forced reflows on long text.
- Fixed edge case in text truncation where the last word was always dropped before the first height check.
- Replaced `this` in the UMD wrapper with `globalThis` / `self` / `window` fallback chain — fixes breakage in strict mode and common bundlers (webpack, rollup) where top-level `this` is `undefined`.
- Added a `TypeError` guard in `webkitLineClamp` for non-Element first arguments.
- Corrected JSDoc type annotation: `truncateTextNode`'s first parameter is `Text`, not `HTMLElement`.
- Changed the `line-height: normal` multiplier from `1.25` to `1.2` to better match the CSS specification default.

## [1.2.2] — 2020-01-20

### Fixed
- Fixed a bug where `line-height` was incorrectly set on child nodes, causing wrong height calculations when child elements had their own `line-height` declarations.

## [1.2.1] — 2019-08-27

### Added
- Two import styles are now supported:

```js
import webkitLineClamp from 'webkit-line-clamp';
// or
import { webkitLineClamp } from 'webkit-line-clamp';
```

## [1.2.0] — 2019-07-24

### Added
- Ability to use the library directly in a browser (via `<script>` tag).
- Live demo page (`index.html` + `style.css`).

### Fixed
- Error when calculating the height of a container that holds text nodes with variable heights.
- CSS fixes for Internet Explorer compatibility.

## [1.1.0] — 2018-11-10

### Added
- TypeScript declarations (`index.d.ts`).

## [1.0.1] — 2018-12-25

### Fixed
- Bug with incorrect container height calculation.

## [1.0.0] — 2018-09-24

### Added
- Initial release: JavaScript polyfill for the CSS `-webkit-line-clamp` property.
- Supports nested DOM nodes.
- Falls back to native `-webkit-line-clamp` when the browser supports it.
- UMD module format (CommonJS + global).
