'use strict';

/**
 * WeakMap used to store original inline cssText of child nodes,
 * avoiding pollution of DOM element properties.
 * @type {WeakMap<HTMLElement, string>}
 */
var inlineCssCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

/**
 * @param {HTMLElement} element
 * @param {string} property
 * @return {string}
 */
function getStyleValue(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
}

/**
 * @param {HTMLElement} element
 * @return {number}
 */
function getLineHeight(element) {
    var lineHeight = getStyleValue(element, 'line-height');

    if (lineHeight === 'normal') {

        /*
         * CSS spec says 'normal' is typically ~1.2, but it is font-dependent.
         * 1.2 is a reasonable default for most web fonts.
         */
        return parseInt(getStyleValue(element, 'font-size'), 10) * 1.2;
    }

    return parseFloat(lineHeight);
}

/**
 * @param {HTMLElement} element
 */
function setupLineHeight(element) {
    for (var index = 0; index < element.childNodes.length; index++) {
        var childNode = element.childNodes[index];

        if (childNode.nodeType === 1) {
            // Store original inline cssText in a WeakMap instead of on the element itself
            if (inlineCssCache) {
                inlineCssCache.set(childNode, childNode.style.cssText);
            } else {
                childNode._inlineCssText = childNode.style.cssText;
            }
            childNode.style.lineHeight = '100%';
        }
    }
}

/**
 * @param {HTMLElement} element
 */
function removeLineHeight(element) {
    for (var index = 0; index < element.childNodes.length; index++) {
        var childNode = element.childNodes[index];

        if (childNode.nodeType === 1) {
            childNode.removeAttribute('style');

            var savedCss = inlineCssCache
                ? inlineCssCache.get(childNode)
                : childNode._inlineCssText;

            if (savedCss) {
                childNode.style.cssText = savedCss;
            }

            if (inlineCssCache) {
                inlineCssCache.delete(childNode);
            } else {
                childNode._inlineCssText = null;
            }
        }
    }
}

/**
 * Binary-search for the longest text that fits within maxHeight,
 * then trim character-by-character to find the exact cut point.
 *
 * @param {Text} textNode
 * @param {HTMLElement} rootElement
 * @param {number} maxHeight
 * @return {boolean}
 */
function truncateTextNode(textNode, rootElement, maxHeight) {
    var originalText = textNode.textContent;

    textNode.textContent = '';

    // If even with empty text the container overflows, this node cannot help
    if (rootElement.clientHeight > maxHeight) return false;

    // Binary search by words for a fast initial approximation
    var words = originalText.split(' ');
    var lo = 0;
    var hi = words.length;

    while (lo < hi) {
        var mid = Math.floor((lo + hi + 1) / 2);

        textNode.textContent = words.slice(0, mid).join(' ');

        if (rootElement.clientHeight <= maxHeight) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }

    // Lo words fit; now trim character-by-character from that boundary
    var textContent = words.slice(0, lo).join(' ');
    var length = textContent.length;

    while (length > 0) {
        textNode.textContent = textContent.substring(0, length) + '…';

        if (rootElement.clientHeight <= maxHeight) return true;

        length--;
    }

    textNode.textContent = '';

    return false;
}

/**
 * @param {HTMLElement} element
 * @param {HTMLElement} rootElement
 * @param {number} maxHeight
 * @param {number} lineHeight
 * @return {boolean}
 */
function truncateElementNode(element, rootElement, maxHeight, lineHeight) {
    var childNodes = element.childNodes;
    var length = childNodes.length - 1;

    while (length > -1) {
        var childNode = childNodes[length--];
        var func =
            childNode.nodeType === 1 ? truncateElementNode : truncateTextNode;

        if (func(childNode, rootElement, maxHeight, lineHeight)) return true;

        element.removeChild(childNode);
    }

    return false;
}

/**
 * @param {HTMLElement} rootElement
 * @param {number} lineCount
 */
function truncate(rootElement, lineCount) {
    var lineHeight = getLineHeight(rootElement);
    var maxHeight = Math.round(lineHeight * lineCount);

    if (rootElement.clientHeight <= maxHeight) return;

    setupLineHeight(rootElement);
    truncateElementNode(rootElement, rootElement, maxHeight, lineHeight);
    removeLineHeight(rootElement);
}

/**
 * @param {HTMLElement} rootElement
 * @param {number} lineCount
 */
function native(rootElement, lineCount) {
    rootElement.style.overflow = 'hidden';
    rootElement.style.textOverflow = 'ellipsis';
    rootElement.style.webkitBoxOrient = 'vertical';
    rootElement.style.display = '-webkit-box';
    rootElement.style.webkitLineClamp = lineCount;
}

/**
 * Clamp the text content of an element to a given number of lines.
 * Uses the native -webkit-line-clamp if available; otherwise falls back
 * to a JavaScript truncation algorithm.
 *
 * @param {HTMLElement} element
 * @param {number} lineCount  Positive integer; 0 or falsy values are ignored.
 */
function webkitLineClamp(element, lineCount) {
    if (!lineCount) return;

    if (!(element instanceof Element)) {
        throw new TypeError('webkit-line-clamp: first argument must be a DOM Element');
    }

    (typeof element.style.webkitLineClamp === 'undefined' ? truncate : native)(element, lineCount);
}

(function wrapper(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory;
        module.exports.webkitLineClamp = factory;
    } else {
        root.webkitLineClamp = factory;
    }

    /*
     * Use `typeof globalThis` to safely reference the global object in strict mode
     * and across bundlers (webpack, rollup, etc.) where `this` may be undefined.
     */
}(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : window, webkitLineClamp));
