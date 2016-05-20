"use strict";
var DOMUtils = (function () {
    function DOMUtils() {
    }
    DOMUtils.parseProps = function (ele) {
        var _props = {};
        _props['fnNode'] = ele;
        for (var i = 0; i < ele.attributes.length; i++) {
            var a = ele.attributes[i];
            if (a.name.indexOf('data-prop-') < 0) {
                continue;
            }
            var name_1 = a.name
                .replace('data-prop-', '')
                .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            var value = a.value || '';
            if (typeof value === 'string' && value.toLocaleLowerCase() === 'false') {
                value = false;
            }
            if (typeof value === 'string' && value.toLocaleLowerCase() === 'true') {
                value = true;
            }
            if (typeof value === 'string' && value.length > 2 &&
                (value[0] === '{' && value[value.length - 1] === '}') ||
                (value[0] === '[' && value[value.length - 1] === ']')) {
                value = JSON.parse(value);
            }
            _props[name_1] = value;
        }
        return _props;
    };
    DOMUtils.openPortal = function (ele) {
        var tag;
        switch (ele.tagName) {
            case 'span':
                tag = 'span';
                break;
            default:
                tag = 'div';
        }
        var node = window.document.createElement(tag);
        var className = ele.getAttribute('data-component-css-class') || null;
        node.setAttribute('data-habitat', 'react');
        if (className) {
            node.className = "" + className;
        }
        if (ele === window.document.body) {
            document.body.appendChild(node);
        }
        else {
            ele.parentNode.insertBefore(node, ele.nextSibling);
        }
        if (ele.tagName !== 'input' || ele.tagName !== 'textarea') {
            ele.parentNode.removeChild(ele);
        }
        else {
            ele.setAttribute('style', 'display:none;');
        }
        return node;
    };
    return DOMUtils;
}());
exports.DOMUtils = DOMUtils;