module.exports=function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(r(1)),n=a(r(2)),i=a(r(3)),u=a(r(4)),s=a(r(5)),f=a(r(6));function a(t){return t&&t.__esModule?t:{default:t}}function l(t){var e={},r=void 0,i=void 0;for(var u in this.bus=new o.default({target:this}),this.isDeferred=!1,this.onsave=[],this.onchange=[],this.value={},t=t||{},window.localStorage)if("undefined"!==(r=window.localStorage.getItem(u))&&"null"!==r)try{i=JSON.parse(r),(0,n.default)(e,u,i)}catch(t){i=r,(0,n.default)(e,u,i)}if(t.version=t.version||0,e.version=e.version||0,e.version&&t.version>e.version)for(var s in e)delete e[s];for(s in t)this.value[s]=t[s];for(s in e)this.value[s]=e[s];return this.save()}l.prototype.on=function(t,e){return this.bus.on(t,e),this},l.prototype.once=function(t,e){return this.bus.once(t,e),this},l.prototype.off=function(t,e){return this.bus.off(t,e),this},l.prototype.onChange=function(t){return"function"==typeof t&&this.onchange.push(t),this},l.prototype.offChange=function(t){return"function"==typeof t&&this.onchange.splice(this.onchange.indexOf(t),1),this},l.prototype.triggerPaths=function(t){for(var e={},r=void 0,o=0,n=t.length;o<n;o++)for(var u=t[o].length;u>0;u--)e[r=t[o].slice(0,u)]||(e[r]=!0,this.bus.trigger(r.join("."),(0,i.default)(this.value,r)));return this},l.prototype.triggerOnChange=function(t){for(var e=[],r=this.onchange.slice(),o=0,n=t.length;o<n;o++)-1===e.indexOf(t[o][0])&&e.push(t[o][0]);for(o=0,n=e.length;o<n;o++)for(var i=0,u=r.length;i<u;i++)r[i](e[o],this.value[e[o]])},l.prototype.set=function(t,e){var r=(0,f.default)(t),o=(0,s.default)({},this.value),a=[],l=-1,c=r.length,h=void 0;function p(t){for(var e=0,r=t.length+1,o=void 0;++e<r;)if(o=t.slice(0,e).join("."),-1!==a.indexOf(o))return!1;return a.push(o),!0}for(;++l<c;)p(h=r[l].slice(0,Math.max(1,r[l].length-1)))&&(0,n.default)(o,h,(0,u.default)((0,i.default)(o,h))),h=r[l],(0,n.default)(o,h,(0,i.default)(t,h));return this.value=o,this.triggerPaths(r),this.triggerOnChange(r),this.save(e)},l.prototype.get=function(t){return(0,i.default)(this.value,[].concat(t).join("."))},l.prototype.save=function(t){var e=this;function r(){var t=(0,f.default)(e.value),r=-1,o=t.length;for(e.isDeferred=!0;++r<o;)window.localStorage.setItem(t[r].join("."),JSON.stringify((0,i.default)(e.value,t[r])));for(;e.onsave.length;)e.onsave[0](),e.onsave.shift()}t&&this.onsave.push(t),this.isDeferred?(clearTimeout(this.isDeferred),this.isDeferred=setTimeout(r,100)):r()},l.prototype.getPathList=function(t){return(0,f.default)(t)},l.prototype.copy=function(t){return(0,u.default)(t)},e.default=l},function(t,e,r){"use strict";function o(t){this.target=t.target||this,this.subscribers={}}o.prototype.once=function(t,e){var r=this;return this.on(t,function o(n){r.off(t,o),e.call(r.target,n)})},o.prototype.off=function(t,e){var r=t.toLowerCase().trim(),o=(this.subscribers[r]||[]).indexOf(e);return o>-1?this.subscribers[r].splice(o,1):void 0===e&&(this.subscribers[r]=[]),this.target},o.prototype.on=function(t,e){var r=t.toLowerCase().trim();return"function"==typeof e&&(this.subscribers[r]=(this.subscribers[r]||[]).concat(e)),this.target},o.prototype.trigger=function(t,e){for(var r=t.toLowerCase().trim(),o=(this.subscribers[r]||[]).slice(),n=0,i=o.length;n<i;n++)o[n].call(this.target,e);return this.target},t.exports=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(t,e,r){var n=t,i=Array.isArray(e)?e.join(".").split("."):e.split("."),u=-1,s=i.length-1;for(;++u<s;)"object"!==o(n[i[u]])||null==n[i[u]]?n[i[u]]={}:n[i[u]]=n[i[u]],n=n[i[u]];n[i[s]]=r}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var r=t,o=Array.isArray(e)?e.join(".").split("."):e.split("."),n=-1,i=o.length;for(;++n<i;){if(!r[o[n]])return r[o[n]];r=r[o[n]]}return r}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function t(e){var r=-1;var n;var i;if(e)if(Array.isArray(e))for(i=[],n=e.length;++r<n;)i[r]=t(e[r]);else if("object"===(void 0===e?"undefined":o(e)))for(var u in i={},e)i[u]=t(e[u]);return i||e}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var r=void 0;for(r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(t){var e=[];return function t(e,r,n){var i=[],u=-1,s=0;if(!n||Array.isArray(n)||"object"!==(void 0===n?"undefined":o(n))&&"function"!=typeof n)e.push(r);else{for(var f in n)n.hasOwnProperty(f)&&i.push(f);for(u=-1,s=i.length;++u<s;)t(e,r.concat(i[u]),n[i[u]]);s||t(e,r,void 0)}}(e,[],t),e.sort(function(t,e){t.length,e.length})}}]).default;