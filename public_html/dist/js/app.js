var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/
!function (e, n, A) {
  function o(e, n) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
  }function t() {
    var e, n, A, t, a, i, l;for (var f in r) {
      if (r.hasOwnProperty(f)) {
        if (e = [], n = r[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (A = 0; A < n.options.aliases.length; A++) {
          e.push(n.options.aliases[A].toLowerCase());
        }for (t = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) {
          i = e[a], l = i.split("."), 1 === l.length ? Modernizr[l[0]] = t : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = t), s.push((t ? "" : "no-") + l.join("-"));
        }
      }
    }
  }function a(e) {
    var n = u.className,
        A = Modernizr._config.classPrefix || "";if (c && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var o = new RegExp("(^|\\s)" + A + "no-js(\\s|$)");n = n.replace(o, "$1" + A + "js$2");
    }Modernizr._config.enableClasses && (n += " " + A + e.join(" " + A), c ? u.className.baseVal = n : u.className = n);
  }function i(e, n) {
    if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) for (var A in e) {
      f(e, A) && i(A, e[A]);
    } else {
      e = e.toLowerCase();var o = e.split("."),
          t = Modernizr[o[0]];if (2 == o.length && (t = t[o[1]]), "undefined" != typeof t) return Modernizr;n = "function" == typeof n ? n() : n, 1 == o.length ? Modernizr[o[0]] = n : (!Modernizr[o[0]] || Modernizr[o[0]] instanceof Boolean || (Modernizr[o[0]] = new Boolean(Modernizr[o[0]])), Modernizr[o[0]][o[1]] = n), a([(n && 0 != n ? "" : "no-") + o.join("-")]), Modernizr._trigger(e, n);
    }return Modernizr;
  }var s = [],
      r = [],
      l = { _version: "3.6.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
      var A = this;setTimeout(function () {
        n(A[e]);
      }, 0);
    }, addTest: function addTest(e, n, A) {
      r.push({ name: e, fn: n, options: A });
    }, addAsyncTest: function addAsyncTest(e) {
      r.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = l, Modernizr = new Modernizr();var f,
      u = n.documentElement,
      c = "svg" === u.nodeName.toLowerCase();!function () {
    var e = {}.hasOwnProperty;f = o(e, "undefined") || o(e.call, "undefined") ? function (e, n) {
      return n in e && o(e.constructor.prototype[n], "undefined");
    } : function (n, A) {
      return e.call(n, A);
    };
  }(), l._l = {}, l.on = function (e, n) {
    this._l[e] || (this._l[e] = []), this._l[e].push(n), Modernizr.hasOwnProperty(e) && setTimeout(function () {
      Modernizr._trigger(e, Modernizr[e]);
    }, 0);
  }, l._trigger = function (e, n) {
    if (this._l[e]) {
      var A = this._l[e];setTimeout(function () {
        var e, o;for (e = 0; e < A.length; e++) {
          (o = A[e])(n);
        }
      }, 0), delete this._l[e];
    }
  }, Modernizr._q.push(function () {
    l.addTest = i;
  }), Modernizr.addAsyncTest(function () {
    function e(e, n, A) {
      function o(n) {
        var o = n && "load" === n.type ? 1 == t.width : !1,
            a = "webp" === e;i(e, a && o ? new Boolean(o) : o), A && A(n);
      }var t = new Image();t.onerror = o, t.onload = o, t.src = n;
    }var n = [{ uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=", name: "webp" }, { uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==", name: "webp.alpha" }, { uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA", name: "webp.animation" }, { uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=", name: "webp.lossless" }],
        A = n.shift();e(A.name, A.uri, function (A) {
      if (A && "load" === A.type) for (var o = 0; o < n.length; o++) {
        e(n[o].name, n[o].uri);
      }
    });
  }), t(), a(s), delete l.addTest, delete l.addAsyncTest;for (var p = 0; p < Modernizr._q.length; p++) {
    Modernizr._q[p]();
  }e.Modernizr = Modernizr;
}(window, document);

// Store the form element
var form = document.getElementsByClassName("js-form")[0];
var phone = document.getElementById('phone');
var loader = document.getElementById('js-formLoader');

/**
 * [hasWhiteSpace description]
 * @param  {[type]}  string [description]
 * @return {Boolean}        [description]
 */
var hasWhiteSpace = function hasWhiteSpace(s) {
  return (/\s/g.test(s)
  );
};

/**
 * [CONFIG description]
 * @type {Object}
 */
var CONFIG = {
  'post_location': form.getAttribute('action'),
  'success_msg': ['Thank you, your interest has been registered and someone will be in touch shortly'],
  'error_msg': []

  /**
   * [hideFormElements description]
   * @return {[type]} [description]
   */
};function hideFormElements() {
  var form_rows = form.getElementsByClassName('form__row'),
      form_button = form.getElementsByClassName('button')[0];

  for (var i = 0; i < form_rows.length; i++) {
    form_rows.item(i).style.display = 'none';
  }
  form_button.style.display = 'none';
}

/**
 * [showMessage description]
 * @param  {[type]} messageArray [description]
 * @param  {[type]} type         [description]
 * @return {[type]}              [description]
 */
function showMessage(messageArray, type) {
  var messageEl = form.getElementsByClassName('form__message')[0],
      messageString = '';

  for (var i = 0; i < messageArray.length; i++) {
    messageString += messageArray[i] + '<br />';
  }
  messageEl.innerHTML = messageString;
  messageEl.style.display = 'block';

  if (type === 'error') {
    messageEl.classList.remove('form__message--success');
    messageEl.classList.add('form__message--error');
  } else if (type === 'success') {
    messageEl.classList.remove('form__message--error');
    messageEl.classList.add('form__message--success');
  }

  form.scrollIntoView();
}

/**
 * [sendData description]
 * @return {[type]} [description]
 */
function sendData() {
  var formData = new FormData(form),
      req = new XMLHttpRequest();

  // Define what happens on successful data submission
  req.addEventListener("load", function (event) {
    var response = JSON.parse(req.response);
    CONFIG.error_msg = [];

    loader.style.display = 'none';
    form.classList.remove('form--loading');

    if (req.status === 400 || req.status === 404) {
      for (var key in response) {
        CONFIG.error_msg.push(response[key]);
      }
      showMessage(CONFIG.error_msg, 'error');
    } else if (req.status === 404 || req.status === 502) {
      hideFormElements();
    } else {
      showMessage(CONFIG.success_msg, 'success');
      hideFormElements();
    }
  });

  // Set up our request
  req.open("POST", CONFIG.post_location);

  // The data sent is what the user provided in the form
  req.send(formData);
}

/**
 * Handle the form submit event
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
form.addEventListener("submit", function (event) {
  loader.style.display = 'block';
  form.classList.add('form--loading');

  event.preventDefault();
  sendData();
});

/**
 * [description]
 * @return {[type]} [description]
 */
phone.addEventListener('blur', function () {
  /**  Remove any whiteplace from the input **/
  if (hasWhiteSpace(this.value)) {
    this.value = this.value.replace(/\s/g, "");
  }

  /** Add some custom validity messages on conditions **/
  if (this.value.length !== 0) {
    if (this.value.length < 11) {
      this.setCustomValidity('Number must be at least 11 digits');
    } else if (this.value.length >= 18) {
      this.setCustomValidity('Number too long');
    } else {
      this.setCustomValidity('');
    }
  }
}, false);

function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

function lazyLoad(w, d) {
	var b = d.getElementsByTagName('body')[0];
	var s = d.createElement("script");s.async = true;
	var v = !("IntersectionObserver" in w) ? "8.9.0" : "10.8.0";
	s.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/" + v + "/lazyload.min.js";
	w.lazyLoadOptions = {
		elements_selector: ".js-lazyload"
	}; // Your options here. See "recipes" for more information about async.
	b.appendChild(s);
}

var waypoints = new IntersectionObserver(function (elements) {
  elements.forEach(function (element) {
    if (element.intersectionRatio > 0) {
      element.target.classList.add('js-waypoint--in-viewport');
      waypoints.unobserve(element.target);
    }
  });
}, {
  rootMargin: '300px 0px'
});

function updateClasses(object, method) {
  for (var element in object) {
    var el = object[element].el;
    var className = object[element].class;

    if (method == 'reset') {
      el.classList.remove(className);
    } else {
      el.classList.toggle(className);
    }
  }
}

var LIMIT = Math.tan(45 * 1.5 / 180 * Math.PI);

var pageWidth = window.innerWidth || document.body.clientWidth;
var threshold = Math.max(1, Math.floor(0.01 * pageWidth));

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var SWIPE_LEFT = new Event('swipe-left');
var SWIPE_RIGHT = new Event('swipe-right');
var SWIPE_UP = new Event('swipe-up');
var SWIPE_DOWN = new Event('swipe-down');
var TAP = new Event('click');

function handleGesture(e, element) {
  var x = touchendX - touchstartX;
  var y = touchendY - touchstartY;
  var xy = Math.abs(x / y);
  var yx = Math.abs(y / x);
  if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
    if (yx <= LIMIT) {
      if (x < 0) {
        element.dispatchEvent(SWIPE_LEFT);
      } else {
        element.dispatchEvent(SWIPE_RIGHT);
      }
    }
    if (xy <= LIMIT) {
      if (y < 0) {
        element.dispatchEvent(SWIPE_UP);
      } else {
        element.dispatchEvent(SWIPE_DOWN);
      }
    }
  } else {
    element.dispatchEvent(TAP);
  }
}

function bindSwipe(element) {
  element.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);

  element.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event, element);
  }, false);
}

function splitTime(time) {
  var timeSplitArray = time.toString().split('');
  if (timeSplitArray.length < 2) {
    timeSplitArray.unshift('0');
  }
  return timeSplitArray;
}

/**
 * Remaining time between now and endtime.
 * Returns an object of the total time remaining and each individual unit
 * @param  {string} endtime A valid string that can be parsed by Date
 * @return {object}         Time units (hours, mins etc.) and total time.
 */
function getTimeRemaining(endtime) {
  var T = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(T / 1000 % 60),
      minutes = Math.floor(T / 1000 / 60 % 60),
      hours = Math.floor(T / (1000 * 60 * 60) % 24),
      days = Math.floor(T / (1000 * 60 * 60 * 24));
  return {
    'total': T,
    'days': splitTime(days),
    'hours': splitTime(hours),
    'minutes': splitTime(minutes),
    'seconds': splitTime(seconds)
  };
}

/**
 * Find children of the provided parent that match specific sub-classes.
 * The NodeList that is returned is bound to an object for iterating over later.
 * @param  {string} className Class of the parent countdown element
 * @return {object}           Object of NodeLists
 */
function getChildElements(className) {
  var clockDays = document.querySelectorAll('.' + className + ' .' + className + '--days'),
      clockHours = document.querySelectorAll('.' + className + ' .' + className + '--hours'),
      clockMinutes = document.querySelectorAll('.' + className + ' .' + className + '--minutes'),
      clockSeconds = document.querySelectorAll('.' + className + ' .' + className + '--seconds');
  return {
    'days': clockDays,
    'hours': clockHours,
    'minutes': clockMinutes,
    'seconds': clockSeconds
  };
}

/**
 * [initialiseCountdown description]
 * @param  {[type]} className [description]
 * @param  {[type]} endtime   [description]
 * @return {[type]}           [description]
 */
function initialiseCountdown(className, endtime) {
  var clock = document.getElementsByClassName(className),
      els = getChildElements(className);

  var timeinterval = setInterval(function () {
    var t = getTimeRemaining(endtime);

    for (var element in els) {
      for (var i = 0; i < element.length; i++) {
        if (els[element][i] !== undefined && els[element][i].innerHTML != t[element][i]) {
          els[element][i].innerHTML = t[element][i];
        }
      }
    }
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }, 1000);
}

/*! smooth-scroll v14.2.0 | (c) 2018 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
  var t,
      n = (this.document || this.ownerDocument).querySelectorAll(e),
      o = this;do {
    for (t = n.length; --t >= 0 && n.item(t) !== o;) {}
  } while (t < 0 && (o = o.parentElement));return o;
}), function () {
  function e(e, t) {
    t = t || { bubbles: !1, cancelable: !1, detail: void 0 };var n = document.createEvent("CustomEvent");return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
  }if ("function" == typeof window.CustomEvent) return !1;e.prototype = window.Event.prototype, window.CustomEvent = e;
}(), function () {
  for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) {
    window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
  }window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
    var o = new Date().getTime(),
        i = Math.max(0, 16 - (o - e)),
        r = window.setTimeout(function () {
      t(o + i);
    }, i);return e = o + i, r;
  }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
    clearTimeout(e);
  });
}(), function (e, t) {
  "function" == typeof define && define.amd ? define([], function () {
    return t(e);
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.SmoothScroll = t(e);
}("undefined" != typeof global ? global : "undefined" != typeof window ? window : undefined, function (e) {
  "use strict";
  var t = { ignore: "[data-scroll-ignore]", header: null, topOnEmptyHash: !0, speed: 500, clip: !0, offset: 0, easing: "easeInOutCubic", customEasing: null, updateURL: !0, popstate: !0, emitEvents: !0 },
      n = function n() {
    return "querySelector" in document && "addEventListener" in e && "requestAnimationFrame" in e && "closest" in e.Element.prototype;
  },
      o = function o() {
    for (var e = {}, t = 0; t < arguments.length; t++) {
      !function (t) {
        for (var n in t) {
          t.hasOwnProperty(n) && (e[n] = t[n]);
        }
      }(arguments[t]);
    }return e;
  },
      i = function i(t) {
    return !!("matchMedia" in e && e.matchMedia("(prefers-reduced-motion)").matches);
  },
      r = function r(t) {
    return parseInt(e.getComputedStyle(t).height, 10);
  },
      a = function a(e) {
    var t;try {
      t = decodeURIComponent(e);
    } catch (n) {
      t = e;
    }return t;
  },
      c = function c(e) {
    "#" === e.charAt(0) && (e = e.substr(1));for (var t, n = String(e), o = n.length, i = -1, r = "", a = n.charCodeAt(0); ++i < o;) {
      if (0 === (t = n.charCodeAt(i))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");t >= 1 && t <= 31 || 127 == t || 0 === i && t >= 48 && t <= 57 || 1 === i && t >= 48 && t <= 57 && 45 === a ? r += "\\" + t.toString(16) + " " : r += t >= 128 || 45 === t || 95 === t || t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122 ? n.charAt(i) : "\\" + n.charAt(i);
    }var c;try {
      c = decodeURIComponent("#" + r);
    } catch (e) {
      c = "#" + r;
    }return c;
  },
      u = function u(e, t) {
    var n;return "easeInQuad" === e.easing && (n = t * t), "easeOutQuad" === e.easing && (n = t * (2 - t)), "easeInOutQuad" === e.easing && (n = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1), "easeInCubic" === e.easing && (n = t * t * t), "easeOutCubic" === e.easing && (n = --t * t * t + 1), "easeInOutCubic" === e.easing && (n = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e.easing && (n = t * t * t * t), "easeOutQuart" === e.easing && (n = 1 - --t * t * t * t), "easeInOutQuart" === e.easing && (n = t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e.easing && (n = t * t * t * t * t), "easeOutQuint" === e.easing && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e.easing && (n = t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), e.customEasing && (n = e.customEasing(t)), n || t;
  },
      s = function s() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  },
      l = function l(t, n, o, i) {
    var r = 0;if (t.offsetParent) do {
      r += t.offsetTop, t = t.offsetParent;
    } while (t);return r = Math.max(r - n - o, 0), i && (r = Math.min(r, s() - e.innerHeight)), r;
  },
      m = function m(e) {
    return e ? r(e) + e.offsetTop : 0;
  },
      d = function d(e, t, n) {
    t || history.pushState && n.updateURL && history.pushState({ smoothScroll: JSON.stringify(n), anchor: e.id }, document.title, e === document.documentElement ? "#top" : "#" + e.id);
  },
      f = function f(t, n, o) {
    0 === t && document.body.focus(), o || (t.focus(), document.activeElement !== t && (t.setAttribute("tabindex", "-1"), t.focus(), t.style.outline = "none"), e.scrollTo(0, n));
  },
      h = function h(t, n, o, i) {
    if (n.emitEvents && "function" == typeof e.CustomEvent) {
      var r = new CustomEvent(t, { bubbles: !0, detail: { anchor: o, toggle: i } });document.dispatchEvent(r);
    }
  };return function (r, p) {
    var g,
        v,
        w,
        y,
        E,
        b,
        S,
        A = {};A.cancelScroll = function (e) {
      cancelAnimationFrame(S), S = null, e || h("scrollCancel", g);
    }, A.animateScroll = function (n, i, r) {
      var a = o(g || t, r || {}),
          c = "[object Number]" === Object.prototype.toString.call(n),
          p = c || !n.tagName ? null : n;if (c || p) {
        var v = e.pageYOffset;a.header && !y && (y = document.querySelector(a.header)), E || (E = m(y));var w,
            b,
            C,
            O = c ? n : l(p, E, parseInt("function" == typeof a.offset ? a.offset(n, i) : a.offset, 10), a.clip),
            I = O - v,
            q = s(),
            F = 0,
            L = function L(t, o) {
          var r = e.pageYOffset;if (t == o || r == o || (v < o && e.innerHeight + r) >= q) return A.cancelScroll(!0), f(n, o, c), h("scrollStop", a, n, i), w = null, S = null, !0;
        },
            H = function H(t) {
          w || (w = t), F += t - w, b = F / parseInt(a.speed, 10), b = b > 1 ? 1 : b, C = v + I * u(a, b), e.scrollTo(0, Math.floor(C)), L(C, O) || (S = e.requestAnimationFrame(H), w = t);
        };0 === e.pageYOffset && e.scrollTo(0, 0), d(n, c, a), h("scrollStart", a, n, i), A.cancelScroll(!0), e.requestAnimationFrame(H);
      }
    };var C = function C(t) {
      if (!i() && 0 === t.button && !t.metaKey && !t.ctrlKey && "closest" in t.target && (w = t.target.closest(r)) && "a" === w.tagName.toLowerCase() && !t.target.closest(g.ignore) && w.hostname === e.location.hostname && w.pathname === e.location.pathname && /#/.test(w.href)) {
        var n = c(a(w.hash)),
            o = g.topOnEmptyHash && "#" === n ? document.documentElement : document.querySelector(n);o = o || "#top" !== n ? o : document.documentElement, o && (t.preventDefault(), A.animateScroll(o, w));
      }
    },
        O = function O(e) {
      if (history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(g) && history.state.anchor) {
        var t = document.querySelector(c(a(history.state.anchor)));t && A.animateScroll(t, null, { updateURL: !1 });
      }
    },
        I = function I(e) {
      b || (b = setTimeout(function () {
        b = null, E = m(y);
      }, 66));
    };return A.destroy = function () {
      g && (document.removeEventListener("click", C, !1), e.removeEventListener("resize", I, !1), e.removeEventListener("popstate", O, !1), A.cancelScroll(), g = null, v = null, w = null, y = null, E = null, b = null, S = null);
    }, A.init = function (i) {
      if (!n()) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";A.destroy(), g = o(t, i || {}), y = g.header ? document.querySelector(g.header) : null, E = m(y), document.addEventListener("click", C, !1), y && e.addEventListener("resize", I, !1), g.updateURL && g.popstate && e.addEventListener("popstate", O, !1);
    }, A.init(p), A;
  };
});

/*! mediabox v1.1.2 | (c) 2017 Pedro Rogerio | https://github.com/pinceladasdaweb/mediabox */
(function (root, factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = factory();
    } else {
        root.MediaBox = factory();
    }
})(window, function () {
    "use strict";

    var MediaBox = function MediaBox(element) {
        if (!this || !(this instanceof MediaBox)) {
            return new MediaBox(element);
        }

        if (!element) {
            return false;
        }

        this.selector = element instanceof NodeList ? element : document.querySelectorAll(element);
        this.root = document.querySelector('body');
        this.run();
    };

    MediaBox.prototype = {
        run: function run() {
            Array.prototype.forEach.call(this.selector, function (el) {
                el.addEventListener('click', function (e) {
                    e.preventDefault();

                    var link = this.parseUrl(el.getAttribute('href'));
                    this.render(link);
                    this.events();
                }.bind(this), false);
            }.bind(this));

            this.root.addEventListener('keyup', function (e) {
                if ((e.keyCode || e.which) === 27) {
                    this.close(this.root.querySelector('.mediabox-wrap'));
                }
            }.bind(this), false);
        },
        template: function template(s, d) {
            var p;

            for (p in d) {
                if (d.hasOwnProperty(p)) {
                    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
                }
            }
            return s;
        },
        parseUrl: function parseUrl(url) {
            var service = {},
                matches;

            if (matches = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {
                service.provider = "youtube";
                service.id = matches[2];
            } else if (matches = url.match(/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/)) {
                service.provider = "vimeo";
                service.id = matches[3];
            } else {
                service.provider = "Unknown";
                service.id = '';
            }

            return service;
        },
        render: function render(service) {
            var embedLink, lightbox;

            if (service.provider === 'youtube') {
                embedLink = 'https://www.youtube.com/embed/' + service.id;
            } else if (service.provider === 'vimeo') {
                embedLink = 'https://player.vimeo.com/video/' + service.id;
            } else {
                throw new Error("Invalid video URL");
            }

            lightbox = this.template('<div class="mediabox-wrap" role="dialog" aria-hidden="false"><div class="mediabox-content" role="document" tabindex="0"><span id="mediabox-esc" class="mediabox-close" aria-label="close" tabindex="1"></span><iframe src="{embed}?autoplay=1" frameborder="0" allowfullscreen></iframe></div></div>', {
                embed: embedLink
            });

            this.lastFocusElement = document.activeElement;
            this.root.insertAdjacentHTML('beforeend', lightbox);
            document.body.classList.add('stop-scroll');
        },
        events: function events() {
            var wrapper = document.querySelector('.mediabox-wrap');
            var content = document.querySelector('.mediabox-content');

            wrapper.addEventListener('click', function (e) {
                if (e.target && e.target.nodeName === 'SPAN' && e.target.className === 'mediabox-close' || e.target.nodeName === 'DIV' && e.target.className === 'mediabox-wrap' || e.target.className === 'mediabox-content' && e.target.nodeName !== 'IFRAME') {
                    this.close(wrapper);
                }
            }.bind(this), false);

            document.addEventListener('focus', function (e) {
                if (content && !content.contains(e.target)) {
                    e.stopPropagation();
                    content.focus();
                }
            }, true);

            content.addEventListener('keypress', function (e) {
                if (e.keyCode === 13) {
                    this.close(wrapper);
                }
            }.bind(this), false);
        },
        close: function close(el) {
            if (el === null) return true;
            var timer = null;

            if (timer) {
                clearTimeout(timer);
            }

            el.classList.add('mediabox-hide');

            timer = setTimeout(function () {
                var el = document.querySelector('.mediabox-wrap');
                if (el !== null) {
                    document.body.classList.remove('stop-scroll');
                    this.root.removeChild(el);
                    this.lastFocusElement.focus();
                }
            }.bind(this), 500);
        }
    };

    return MediaBox;
});

/**
 * [NAV_ITEMS description]
 * @type {Object}
 */
var NAV_ITEMS = {
  'button': {
    el: document.querySelector(".js-hamburger"),
    class: 'hamburger--active'
  },
  'nav': {
    el: document.querySelector('.header__nav'),
    class: 'header__nav--active'
  },
  'body': {
    el: document.querySelector('body'),
    class: 'body--nav-active'
  }
};

var WAYPOINT = document.querySelectorAll('.js-waypoint');
var EVENT_DATE = 'September 27 2018 09:30:00 GMT+0100';

/**
 * [description]
 * @return {[type]} [description]
 */
document.addEventListener("DOMContentLoaded", function () {

  if (detectIE() >= 12) {
    document.getElementsByTagName('body')[0].classList.add('ua-edge');
  }

  var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      menuLinks = document.getElementsByClassName('navigation__item');

  lazyLoad(window, document);
  initialiseCountdown('js-countdown', EVENT_DATE);
  MediaBox('.js-mediabox');

  var scroll = new SmoothScroll('a[href*="#"]', {
    'header': windowWidth < 992 ? '.header' : null
  });

  /**
   * [waypoint description]
   * @type {[type]}
   */
  WAYPOINT.forEach(function (waypoint) {
    waypoints.observe(waypoint);
  });

  /**
   *
   */
  bindSwipe(NAV_ITEMS.body.el);
  NAV_ITEMS.button.el.addEventListener("click", function () {
    return updateClasses(NAV_ITEMS);
  });
  NAV_ITEMS.body.el.addEventListener('swipe-right', function () {
    return updateClasses(NAV_ITEMS, 'reset');
  });
  for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function () {
      return updateClasses(NAV_ITEMS, 'reset');
    });
  }
});

caches.delete('images-cache');

navigator.serviceWorker.getRegistrations().then(function (registrations) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = registrations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var registration = _step.value;

      registration.unregister();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
});

//
// /**
//  * [if description]
//  * @param  {[type]} serviceWorker [description]
//  * @return {[type]}               [description]
//  */
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     location.protocol === 'https:' && navigator.serviceWorker.register('/sw.js');
//   });
// }
//# sourceMappingURL=app.js.map
