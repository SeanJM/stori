module.exports=function(t){function e(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,o){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function n(t){var e={},r=void 0,o=void 0;t=t||{};for(var n in window.localStorage)"undefined"!==(r=window.localStorage.getItem(n))&&(o=JSON.parse(r),e[n]=o);if(t.version=t.version||0,e.version=e.version||0,t.version>e.version)for(var s in e)delete e[s];for(s in t)this[s]=t[s];for(s in e)this[s]=e[s];this.__onchange=[],this.__bus=new i.default({target:this}),this.__deferred=!1,this.save()}Object.defineProperty(e,"__esModule",{value:!0});var i=o(r(1)),s=o(r(2)),u=o(r(3)),f=o(r(4)),c={__bus:!0,__deferred:!0};n.prototype.on=function(t,e){return this.__bus.on(t,e),this},n.prototype.once=function(t,e){return this.__bus.once(t,e),this},n.prototype.off=function(t,e){return this.__bus.off(t,e),this},n.prototype.onChange=function(t){return"function"==typeof t&&this.__onchange.push(t),this},n.prototype.offChange=function(t){return"function"==typeof t&&this.__onchange.splice(this.__onchange.indexOf(t),1),this},n.prototype.triggerPaths=function(t){for(var e={},r=void 0,o=0,n=t.length;o<n;o++)for(var i=t[o].length;i>0;i--)e[r=t[o].slice(0,i)]||(e[r]=!0,this.__bus.trigger(r.join("."),(0,u.default)(this,r)));return this},n.prototype.triggerOnChange=function(t){for(var e=[],r=this.__onchange.slice(),o=0,n=t.length;o<n;o++)-1===e.indexOf(t[o][0])&&e.push(t[o][0]);for(o=0,n=e.length;o<n;o++)for(var i=0,s=r.length;i<s;i++)r[i](e[o],this[e[o]])},n.prototype.set=function(t){for(var e=(0,f.default)(t),r=void 0,o=0,n=e.length;o<n;o++){if(r=(0,u.default)(t,e[o]),"function"===this[e[o][0]])throw new Error('[Store] Cannot set value "'+e[o][0]+'", it is a reserved name.');(0,s.default)(this,e[o],r)}return this.triggerPaths(e),this.triggerOnChange(e),this.save(),this},n.prototype.get=function(t){return(0,u.default)(this,[].concat(t).join("."))},n.prototype.save=function(){var t=this;clearTimeout(this.__deferred),this.__deferred=setTimeout(function(){for(var e in t)t.hasOwnProperty(e)&&!c[e]&&"function"!=typeof t[e]&&window.localStorage.setItem(e,JSON.stringify(t[e]))},50)},e.default=n},function(t,e,r){"use strict";function o(t){this.target=t.target||this,this.subscribers={}}o.prototype.once=function(t,e){var r=this;return this.on(t,function o(n){r.off(t,o),e.call(r.target,n)})},o.prototype.off=function(t,e){var r=t.toLowerCase().trim(),o=(this.subscribers[r]||[]).indexOf(e);return o>-1?this.subscribers[r].splice(o,1):void 0===e&&(this.subscribers[r]=[]),this.target},o.prototype.on=function(t,e){var r=t.toLowerCase().trim();return"function"==typeof e&&(this.subscribers[r]=(this.subscribers[r]||[]).concat(e)),this.target},o.prototype.trigger=function(t,e){for(var r=t.toLowerCase().trim(),o=(this.subscribers[r]||[]).slice(),n=0,i=o.length;n<i;n++)o[n].call(this.target,e);return this.target},t.exports=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(t,e,r){for(var n=t,i=Array.isArray(e)?e.join(".").split("."):e.split("."),s=0,u=i.length-1;s<u;s++)"object"===o(n[i[s]])&&null!=n[i[s]]||(n[i[s]]={}),n=n[i[s]];n[i.slice(-1)[0]]=r}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){for(var r=t,o=Array.isArray(e)?e.join(".").split("."):e.split("."),n=0,i=o.length;n<i;n++){if(void 0===r[o[n]])return;r=r[o[n]]}return r}},function(t,e,r){"use strict";function o(t,e,r){var i=[];if(void 0===r||null==r)t.push(e);else if(Array.isArray(r)||"object"!==(void 0===r?"undefined":n(r))&&"function"!=typeof r)t.push(e);else if("function"!=typeof r){for(var s in r)i.push(s);if(i.length)for(var u=0,f=i.length;u<f;u++)o(t,e.concat(i[u]),r[i[u]]);else o(t,e,void 0)}}Object.defineProperty(e,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(t){var e=[];return o(e,[],t),e}}]).default;