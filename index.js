'use strict';

/**
 * @param {HTMLElement} element
 * @param {string} style
 * @return {string}
 */
function getStyleValue(element, style) {
    return window.getComputedStyle(element, null).getPropertyValue(style);
}

/**
 * @param {HTMLElement} element
 * @return {number}
 */
function getLineHeight(element) {
    var lineHeight = getStyleValue(element, 'line-height');

    if (lineHeight === 'normal') {
        return parseInt(getStyleValue(element, 'font-size'), 10) * 1.25;
    }

    return parseFloat(lineHeight);
}

/**
 * @param {HTMLElement} textNode
 * @param {HTMLElement} rootElement
 * @param {number} maxHeight
 * @return {boolean}
 */
function truncateTextNode(textNode, rootElement, maxHeight) {
    var textContent = textNode.textContent;
    var chunks = textNode.textContent.split(' ');

    while (chunks.pop()) {
        textNode.textContent = chunks.join(' ');

        if (rootElement.clientHeight <= maxHeight) {
            textNode.textContent = textContent;
            break;
        }

        textContent = textNode.textContent;
    }

    var length = textContent.length;

    while (length > 1) {
        textContent = textContent.substring(0, length - 1);

        length = textContent.length;

        textNode.textContent = textContent + '…';

        if (rootElement.clientHeight <= maxHeight) return true;
    }

    return false;
}

/**
 * @param {HTMLElement} element
 * @param {HTMLElement} rootElement
 * @param {number} maxHeight
 * @return {boolean}
 */
function truncateElementNode(element, rootElement, maxHeight) {
    var cssText = element.style.cssText;
    var childNodes = element.childNodes;
    var length = childNodes.length - 1;

    element.style.lineHeight = getLineHeight(rootElement) + 'px';

    while (length > -1) {
        var childNode = childNodes[length--];

        if ((childNode.nodeType === 1 ? truncateElementNode : truncateTextNode)(childNode, rootElement, maxHeight)) {
            if (cssText) {
                element.style.cssText = cssText;
            } else {
                element.removeAttributeNode(element.attributes.getNamedItem('style'));
            }

            return true;
        }

        element.removeChild(childNode);
    }

    return false;
}

/**
 * @param {HTMLElement} rootElement
 * @param {number} lineCount
 */
function truncate(rootElement, lineCount) {
    var maxHeight = Math.round(getLineHeight(rootElement) * lineCount);

    if (rootElement.clientHeight <= maxHeight) return;

    truncateElementNode(rootElement, rootElement, maxHeight);
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
 * @param {HTMLElement} element
 * @param {number} lineCount
 */
module.exports = function webkitLineClamp(element, lineCount) {
    if (!lineCount) return;

    (typeof element.style.webkitLineClamp === 'undefined' ? truncate : native)(element, lineCount);
};
