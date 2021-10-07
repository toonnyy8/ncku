var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[Object.keys(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/has-tostringtag/shams.js"(exports2, module2) {
    "use strict";
    var hasSymbols = require_shams();
    module2.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/is-generator-function/index.js
var require_is_generator_function = __commonJS({
  "node_modules/is-generator-function/index.js"(exports2, module2) {
    "use strict";
    var toStr = Object.prototype.toString;
    var fnToStr = Function.prototype.toString;
    var isFnRegex = /^\s*(?:function)?\*/;
    var hasToStringTag = require_shams2()();
    var getProto = Object.getPrototypeOf;
    var getGeneratorFunc = function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e3) {
      }
    };
    var GeneratorFunction;
    module2.exports = function isGeneratorFunction(fn3) {
      if (typeof fn3 !== "function") {
        return false;
      }
      if (isFnRegex.test(fnToStr.call(fn3))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn3);
        return str === "[object GeneratorFunction]";
      }
      if (!getProto) {
        return false;
      }
      if (typeof GeneratorFunction === "undefined") {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
      }
      return getProto(fn3) === GeneratorFunction;
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s2 = 1e3;
    var m2 = s2 * 60;
    var h2 = m2 * 60;
    var d2 = h2 * 24;
    var w2 = d2 * 7;
    var y2 = d2 * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n2 = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n2 * y2;
        case "weeks":
        case "week":
        case "w":
          return n2 * w2;
        case "days":
        case "day":
        case "d":
          return n2 * d2;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n2 * h2;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n2 * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n2 * s2;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n2;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d2) {
        return Math.round(ms / d2) + "d";
      }
      if (msAbs >= h2) {
        return Math.round(ms / h2) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms / m2) + "m";
      }
      if (msAbs >= s2) {
        return Math.round(ms / s2) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d2) {
        return plural(ms, msAbs, d2, "day");
      }
      if (msAbs >= h2) {
        return plural(ms, msAbs, h2, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms, msAbs, m2, "minute");
      }
      if (msAbs >= s2) {
        return plural(ms, msAbs, s2, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n2, name) {
      var isPlural = msAbs >= n2 * 1.5;
      return Math.round(ms / n2) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i2 = 0; i2 < namespace.length; i2++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i2);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args2) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args2[0] = createDebug.coerce(args2[0]);
          if (typeof args2[0] !== "string") {
            args2.unshift("%O");
          }
          let index = 0;
          args2[0] = args2[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args2[index];
              match = formatter.call(self2, val);
              args2.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args2);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args2);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v2) => {
            enableOverride = v2;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i2;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i2 = 0; i2 < len; i2++) {
          if (!split[i2]) {
            continue;
          }
          namespaces = split[i2].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i2;
        let len;
        for (i2 = 0, len = createDebug.skips.length; i2 < len; i2++) {
          if (createDebug.skips[i2].test(name)) {
            return false;
          }
        }
        for (i2 = 0, len = createDebug.names.length; i2 < len; i2++) {
          if (createDebug.names[i2].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args2) {
      args2[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args2[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c2 = "color: " + this.color;
      args2.splice(1, 0, c2, "color: inherit");
      let index = 0;
      let lastC = 0;
      args2[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args2.splice(lastC, 0, c2);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r2;
      try {
        r2 = exports2.storage.getItem("debug");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v2) {
      try {
        return JSON.stringify(v2);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log2;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_2, k2) => {
        return k2.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args2) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c2 = this.color;
        const colorCode = "[3" + (c2 < 8 ? c2 : "8;5;" + c2);
        const prefix = `  ${colorCode};1m${name} [0m`;
        args2[0] = prefix + args2[0].split("\n").join("\n" + prefix);
        args2.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "[0m");
      } else {
        args2[0] = getDate() + name + " " + args2[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log2(...args2) {
      return process.stderr.write(util.format(...args2) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i2 = 0; i2 < keys.length; i2++) {
        debug.inspectOpts[keys[i2]] = exports2.inspectOpts[keys[i2]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v2, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v2, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/ee-first/index.js
var require_ee_first = __commonJS({
  "node_modules/ee-first/index.js"(exports2, module2) {
    "use strict";
    module2.exports = first;
    function first(stuff, done) {
      if (!Array.isArray(stuff))
        throw new TypeError("arg must be an array of [ee, events...] arrays");
      var cleanups = [];
      for (var i2 = 0; i2 < stuff.length; i2++) {
        var arr = stuff[i2];
        if (!Array.isArray(arr) || arr.length < 2)
          throw new TypeError("each array member must be [ee, events...]");
        var ee2 = arr[0];
        for (var j2 = 1; j2 < arr.length; j2++) {
          var event = arr[j2];
          var fn3 = listener(event, callback);
          ee2.on(event, fn3);
          cleanups.push({
            ee: ee2,
            event,
            fn: fn3
          });
        }
      }
      function callback() {
        cleanup();
        done.apply(null, arguments);
      }
      function cleanup() {
        var x2;
        for (var i3 = 0; i3 < cleanups.length; i3++) {
          x2 = cleanups[i3];
          x2.ee.removeListener(x2.event, x2.fn);
        }
      }
      function thunk(fn4) {
        done = fn4;
      }
      thunk.cancel = cleanup;
      return thunk;
    }
    function listener(event, done) {
      return function onevent(arg1) {
        var args2 = new Array(arguments.length);
        var ee2 = this;
        var err = event === "error" ? arg1 : null;
        for (var i2 = 0; i2 < args2.length; i2++) {
          args2[i2] = arguments[i2];
        }
        done(err, ee2, event, args2);
      };
    }
  }
});

// node_modules/on-finished/index.js
var require_on_finished = __commonJS({
  "node_modules/on-finished/index.js"(exports2, module2) {
    "use strict";
    module2.exports = onFinished;
    module2.exports.isFinished = isFinished;
    var first = require_ee_first();
    var defer = typeof setImmediate === "function" ? setImmediate : function(fn3) {
      process.nextTick(fn3.bind.apply(fn3, arguments));
    };
    function onFinished(msg, listener) {
      if (isFinished(msg) !== false) {
        defer(listener, null, msg);
        return msg;
      }
      attachListener(msg, listener);
      return msg;
    }
    function isFinished(msg) {
      var socket = msg.socket;
      if (typeof msg.finished === "boolean") {
        return Boolean(msg.finished || socket && !socket.writable);
      }
      if (typeof msg.complete === "boolean") {
        return Boolean(msg.upgrade || !socket || !socket.readable || msg.complete && !msg.readable);
      }
      return void 0;
    }
    function attachFinishedListener(msg, callback) {
      var eeMsg;
      var eeSocket;
      var finished = false;
      function onFinish(error) {
        eeMsg.cancel();
        eeSocket.cancel();
        finished = true;
        callback(error);
      }
      eeMsg = eeSocket = first([[msg, "end", "finish"]], onFinish);
      function onSocket(socket) {
        msg.removeListener("socket", onSocket);
        if (finished)
          return;
        if (eeMsg !== eeSocket)
          return;
        eeSocket = first([[socket, "error", "close"]], onFinish);
      }
      if (msg.socket) {
        onSocket(msg.socket);
        return;
      }
      msg.on("socket", onSocket);
      if (msg.socket === void 0) {
        patchAssignSocket(msg, onSocket);
      }
    }
    function attachListener(msg, listener) {
      var attached = msg.__onFinished;
      if (!attached || !attached.queue) {
        attached = msg.__onFinished = createListener(msg);
        attachFinishedListener(msg, attached);
      }
      attached.queue.push(listener);
    }
    function createListener(msg) {
      function listener(err) {
        if (msg.__onFinished === listener)
          msg.__onFinished = null;
        if (!listener.queue)
          return;
        var queue = listener.queue;
        listener.queue = null;
        for (var i2 = 0; i2 < queue.length; i2++) {
          queue[i2](err, msg);
        }
      }
      listener.queue = [];
      return listener;
    }
    function patchAssignSocket(res, callback) {
      var assignSocket = res.assignSocket;
      if (typeof assignSocket !== "function")
        return;
      res.assignSocket = function _assignSocket(socket) {
        assignSocket.call(this, socket);
        callback(socket);
      };
    }
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/content-disposition/index.js
var require_content_disposition = __commonJS({
  "node_modules/content-disposition/index.js"(exports2, module2) {
    "use strict";
    module2.exports = contentDisposition;
    module2.exports.parse = parse;
    var basename = require("path").basename;
    var Buffer2 = require_safe_buffer().Buffer;
    var ENCODE_URL_ATTR_CHAR_REGEXP = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g;
    var HEX_ESCAPE_REGEXP = /%[0-9A-Fa-f]{2}/;
    var HEX_ESCAPE_REPLACE_REGEXP = /%([0-9A-Fa-f]{2})/g;
    var NON_LATIN1_REGEXP = /[^\x20-\x7e\xa0-\xff]/g;
    var QESC_REGEXP = /\\([\u0000-\u007f])/g;
    var QUOTE_REGEXP = /([\\"])/g;
    var PARAM_REGEXP = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g;
    var TEXT_REGEXP = /^[\x20-\x7e\x80-\xff]+$/;
    var TOKEN_REGEXP = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
    var EXT_VALUE_REGEXP = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/;
    var DISPOSITION_TYPE_REGEXP = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/;
    function contentDisposition(filename, options) {
      var opts = options || {};
      var type = opts.type || "attachment";
      var params = createparams(filename, opts.fallback);
      return format(new ContentDisposition(type, params));
    }
    function createparams(filename, fallback) {
      if (filename === void 0) {
        return;
      }
      var params = {};
      if (typeof filename !== "string") {
        throw new TypeError("filename must be a string");
      }
      if (fallback === void 0) {
        fallback = true;
      }
      if (typeof fallback !== "string" && typeof fallback !== "boolean") {
        throw new TypeError("fallback must be a string or boolean");
      }
      if (typeof fallback === "string" && NON_LATIN1_REGEXP.test(fallback)) {
        throw new TypeError("fallback must be ISO-8859-1 string");
      }
      var name = basename(filename);
      var isQuotedString = TEXT_REGEXP.test(name);
      var fallbackName = typeof fallback !== "string" ? fallback && getlatin1(name) : basename(fallback);
      var hasFallback = typeof fallbackName === "string" && fallbackName !== name;
      if (hasFallback || !isQuotedString || HEX_ESCAPE_REGEXP.test(name)) {
        params["filename*"] = name;
      }
      if (isQuotedString || hasFallback) {
        params.filename = hasFallback ? fallbackName : name;
      }
      return params;
    }
    function format(obj) {
      var parameters = obj.parameters;
      var type = obj.type;
      if (!type || typeof type !== "string" || !TOKEN_REGEXP.test(type)) {
        throw new TypeError("invalid type");
      }
      var string = String(type).toLowerCase();
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i2 = 0; i2 < params.length; i2++) {
          param = params[i2];
          var val = param.substr(-1) === "*" ? ustring(parameters[param]) : qstring(parameters[param]);
          string += "; " + param + "=" + val;
        }
      }
      return string;
    }
    function decodefield(str) {
      var match = EXT_VALUE_REGEXP.exec(str);
      if (!match) {
        throw new TypeError("invalid extended field value");
      }
      var charset = match[1].toLowerCase();
      var encoded = match[2];
      var value;
      var binary = encoded.replace(HEX_ESCAPE_REPLACE_REGEXP, pdecode);
      switch (charset) {
        case "iso-8859-1":
          value = getlatin1(binary);
          break;
        case "utf-8":
          value = Buffer2.from(binary, "binary").toString("utf8");
          break;
        default:
          throw new TypeError("unsupported charset in extended field");
      }
      return value;
    }
    function getlatin1(val) {
      return String(val).replace(NON_LATIN1_REGEXP, "?");
    }
    function parse(string) {
      if (!string || typeof string !== "string") {
        throw new TypeError("argument string is required");
      }
      var match = DISPOSITION_TYPE_REGEXP.exec(string);
      if (!match) {
        throw new TypeError("invalid type format");
      }
      var index = match[0].length;
      var type = match[1].toLowerCase();
      var key;
      var names = [];
      var params = {};
      var value;
      index = PARAM_REGEXP.lastIndex = match[0].substr(-1) === ";" ? index - 1 : index;
      while (match = PARAM_REGEXP.exec(string)) {
        if (match.index !== index) {
          throw new TypeError("invalid parameter format");
        }
        index += match[0].length;
        key = match[1].toLowerCase();
        value = match[2];
        if (names.indexOf(key) !== -1) {
          throw new TypeError("invalid duplicate parameter");
        }
        names.push(key);
        if (key.indexOf("*") + 1 === key.length) {
          key = key.slice(0, -1);
          value = decodefield(value);
          params[key] = value;
          continue;
        }
        if (typeof params[key] === "string") {
          continue;
        }
        if (value[0] === '"') {
          value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
        }
        params[key] = value;
      }
      if (index !== -1 && index !== string.length) {
        throw new TypeError("invalid parameter format");
      }
      return new ContentDisposition(type, params);
    }
    function pdecode(str, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    }
    function pencode(char) {
      return "%" + String(char).charCodeAt(0).toString(16).toUpperCase();
    }
    function qstring(val) {
      var str = String(val);
      return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
    }
    function ustring(val) {
      var str = String(val);
      var encoded = encodeURIComponent(str).replace(ENCODE_URL_ATTR_CHAR_REGEXP, pencode);
      return "UTF-8''" + encoded;
    }
    function ContentDisposition(type, parameters) {
      this.type = type;
      this.parameters = parameters;
    }
  }
});

// node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/mime-db/db.json"(exports2, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana"
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana"
      },
      "image/avcs": {
        source: "iana"
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/mime-db/index.js"(exports2, module2) {
    module2.exports = require_db();
  }
});

// node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/mime-types/index.js"(exports2) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports2.charset = charset;
    exports2.charsets = { lookup: charset };
    exports2.contentType = contentType;
    exports2.extension = extension;
    exports2.extensions = Object.create(null);
    exports2.lookup = lookup;
    exports2.types = Object.create(null);
    populateMaps(exports2.extensions, exports2.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports2.charset(mime);
        if (charset2)
          mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports2.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path) {
      if (!path || typeof path !== "string") {
        return false;
      }
      var extension2 = extname("x." + path).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports2.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i2 = 0; i2 < exts.length; i2++) {
          var extension2 = exts[i2];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to2 = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to2 || from === to2 && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/ylru/index.js
var require_ylru = __commonJS({
  "node_modules/ylru/index.js"(exports2, module2) {
    "use strict";
    var LRU = class {
      constructor(max) {
        this.max = max;
        this.size = 0;
        this.cache = new Map();
        this._cache = new Map();
      }
      get(key, options) {
        let item = this.cache.get(key);
        const maxAge = options && options.maxAge;
        let now;
        function getNow() {
          now = now || Date.now();
          return now;
        }
        if (item) {
          if (item.expired && getNow() > item.expired) {
            item.expired = 0;
            item.value = void 0;
          } else {
            if (maxAge !== void 0) {
              const expired = maxAge ? getNow() + maxAge : 0;
              item.expired = expired;
            }
          }
          return item.value;
        }
        item = this._cache.get(key);
        if (item) {
          if (item.expired && getNow() > item.expired) {
            item.expired = 0;
            item.value = void 0;
          } else {
            this._update(key, item);
            if (maxAge !== void 0) {
              const expired = maxAge ? getNow() + maxAge : 0;
              item.expired = expired;
            }
          }
          return item.value;
        }
      }
      set(key, value, options) {
        const maxAge = options && options.maxAge;
        const expired = maxAge ? Date.now() + maxAge : 0;
        let item = this.cache.get(key);
        if (item) {
          item.expired = expired;
          item.value = value;
        } else {
          item = {
            value,
            expired
          };
          this._update(key, item);
        }
      }
      keys() {
        const cacheKeys = new Set();
        const now = Date.now();
        for (const entry of this.cache.entries()) {
          checkEntry(entry);
        }
        for (const entry of this._cache.entries()) {
          checkEntry(entry);
        }
        function checkEntry(entry) {
          const key = entry[0];
          const item = entry[1];
          if (entry[1].value && !entry[1].expired || item.expired >= now) {
            cacheKeys.add(key);
          }
        }
        return Array.from(cacheKeys.keys());
      }
      _update(key, item) {
        this.cache.set(key, item);
        this.size++;
        if (this.size >= this.max) {
          this.size = 0;
          this._cache = this.cache;
          this.cache = new Map();
        }
      }
    };
    module2.exports = LRU;
  }
});

// node_modules/cache-content-type/index.js
var require_cache_content_type = __commonJS({
  "node_modules/cache-content-type/index.js"(exports2, module2) {
    "use strict";
    var mimeTypes = require_mime_types();
    var LRU = require_ylru();
    var typeLRUCache = new LRU(100);
    module2.exports = (type) => {
      let mimeType = typeLRUCache.get(type);
      if (!mimeType) {
        mimeType = mimeTypes.contentType(type);
        typeLRUCache.set(type, mimeType);
      }
      return mimeType;
    };
  }
});

// node_modules/escape-html/index.js
var require_escape_html = __commonJS({
  "node_modules/escape-html/index.js"(exports2, module2) {
    "use strict";
    var matchHtmlRegExp = /["'&<>]/;
    module2.exports = escapeHtml;
    function escapeHtml(string) {
      var str = "" + string;
      var match = matchHtmlRegExp.exec(str);
      if (!match) {
        return str;
      }
      var escape;
      var html = "";
      var index = 0;
      var lastIndex = 0;
      for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escape = "&quot;";
            break;
          case 38:
            escape = "&amp;";
            break;
          case 39:
            escape = "&#39;";
            break;
          case 60:
            escape = "&lt;";
            break;
          case 62:
            escape = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape;
      }
      return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    }
  }
});

// node_modules/media-typer/index.js
var require_media_typer = __commonJS({
  "node_modules/media-typer/index.js"(exports2) {
    var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g;
    var textRegExp = /^[\u0020-\u007e\u0080-\u00ff]+$/;
    var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/;
    var qescRegExp = /\\([\u0000-\u007f])/g;
    var quoteRegExp = /([\\"])/g;
    var subtypeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/;
    var typeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/;
    var typeRegExp = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
    exports2.format = format;
    exports2.parse = parse;
    function format(obj) {
      if (!obj || typeof obj !== "object") {
        throw new TypeError("argument obj is required");
      }
      var parameters = obj.parameters;
      var subtype = obj.subtype;
      var suffix = obj.suffix;
      var type = obj.type;
      if (!type || !typeNameRegExp.test(type)) {
        throw new TypeError("invalid type");
      }
      if (!subtype || !subtypeNameRegExp.test(subtype)) {
        throw new TypeError("invalid subtype");
      }
      var string = type + "/" + subtype;
      if (suffix) {
        if (!typeNameRegExp.test(suffix)) {
          throw new TypeError("invalid suffix");
        }
        string += "+" + suffix;
      }
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i2 = 0; i2 < params.length; i2++) {
          param = params[i2];
          if (!tokenRegExp.test(param)) {
            throw new TypeError("invalid parameter name");
          }
          string += "; " + param + "=" + qstring(parameters[param]);
        }
      }
      return string;
    }
    function parse(string) {
      if (!string) {
        throw new TypeError("argument string is required");
      }
      if (typeof string === "object") {
        string = getcontenttype(string);
      }
      if (typeof string !== "string") {
        throw new TypeError("argument string is required to be a string");
      }
      var index = string.indexOf(";");
      var type = index !== -1 ? string.substr(0, index) : string;
      var key;
      var match;
      var obj = splitType(type);
      var params = {};
      var value;
      paramRegExp.lastIndex = index;
      while (match = paramRegExp.exec(string)) {
        if (match.index !== index) {
          throw new TypeError("invalid parameter format");
        }
        index += match[0].length;
        key = match[1].toLowerCase();
        value = match[2];
        if (value[0] === '"') {
          value = value.substr(1, value.length - 2).replace(qescRegExp, "$1");
        }
        params[key] = value;
      }
      if (index !== -1 && index !== string.length) {
        throw new TypeError("invalid parameter format");
      }
      obj.parameters = params;
      return obj;
    }
    function getcontenttype(obj) {
      if (typeof obj.getHeader === "function") {
        return obj.getHeader("content-type");
      }
      if (typeof obj.headers === "object") {
        return obj.headers && obj.headers["content-type"];
      }
    }
    function qstring(val) {
      var str = String(val);
      if (tokenRegExp.test(str)) {
        return str;
      }
      if (str.length > 0 && !textRegExp.test(str)) {
        throw new TypeError("invalid parameter value");
      }
      return '"' + str.replace(quoteRegExp, "\\$1") + '"';
    }
    function splitType(string) {
      var match = typeRegExp.exec(string.toLowerCase());
      if (!match) {
        throw new TypeError("invalid media type");
      }
      var type = match[1];
      var subtype = match[2];
      var suffix;
      var index = subtype.lastIndexOf("+");
      if (index !== -1) {
        suffix = subtype.substr(index + 1);
        subtype = subtype.substr(0, index);
      }
      var obj = {
        type,
        subtype,
        suffix
      };
      return obj;
    }
  }
});

// node_modules/type-is/index.js
var require_type_is = __commonJS({
  "node_modules/type-is/index.js"(exports2, module2) {
    "use strict";
    var typer = require_media_typer();
    var mime = require_mime_types();
    module2.exports = typeofrequest;
    module2.exports.is = typeis;
    module2.exports.hasBody = hasbody;
    module2.exports.normalize = normalize;
    module2.exports.match = mimeMatch;
    function typeis(value, types_) {
      var i2;
      var types = types_;
      var val = tryNormalizeType(value);
      if (!val) {
        return false;
      }
      if (types && !Array.isArray(types)) {
        types = new Array(arguments.length - 1);
        for (i2 = 0; i2 < types.length; i2++) {
          types[i2] = arguments[i2 + 1];
        }
      }
      if (!types || !types.length) {
        return val;
      }
      var type;
      for (i2 = 0; i2 < types.length; i2++) {
        if (mimeMatch(normalize(type = types[i2]), val)) {
          return type[0] === "+" || type.indexOf("*") !== -1 ? val : type;
        }
      }
      return false;
    }
    function hasbody(req) {
      return req.headers["transfer-encoding"] !== void 0 || !isNaN(req.headers["content-length"]);
    }
    function typeofrequest(req, types_) {
      var types = types_;
      if (!hasbody(req)) {
        return null;
      }
      if (arguments.length > 2) {
        types = new Array(arguments.length - 1);
        for (var i2 = 0; i2 < types.length; i2++) {
          types[i2] = arguments[i2 + 1];
        }
      }
      var value = req.headers["content-type"];
      return typeis(value, types);
    }
    function normalize(type) {
      if (typeof type !== "string") {
        return false;
      }
      switch (type) {
        case "urlencoded":
          return "application/x-www-form-urlencoded";
        case "multipart":
          return "multipart/*";
      }
      if (type[0] === "+") {
        return "*/*" + type;
      }
      return type.indexOf("/") === -1 ? mime.lookup(type) : type;
    }
    function mimeMatch(expected, actual) {
      if (expected === false) {
        return false;
      }
      var actualParts = actual.split("/");
      var expectedParts = expected.split("/");
      if (actualParts.length !== 2 || expectedParts.length !== 2) {
        return false;
      }
      if (expectedParts[0] !== "*" && expectedParts[0] !== actualParts[0]) {
        return false;
      }
      if (expectedParts[1].substr(0, 2) === "*+") {
        return expectedParts[1].length <= actualParts[1].length + 1 && expectedParts[1].substr(1) === actualParts[1].substr(1 - expectedParts[1].length);
      }
      if (expectedParts[1] !== "*" && expectedParts[1] !== actualParts[1]) {
        return false;
      }
      return true;
    }
    function normalizeType(value) {
      var type = typer.parse(value);
      type.parameters = void 0;
      return typer.format(type);
    }
    function tryNormalizeType(value) {
      if (!value) {
        return null;
      }
      try {
        return normalizeType(value);
      } catch (err) {
        return null;
      }
    }
  }
});

// node_modules/statuses/codes.json
var require_codes = __commonJS({
  "node_modules/statuses/codes.json"(exports2, module2) {
    module2.exports = {
      "100": "Continue",
      "101": "Switching Protocols",
      "102": "Processing",
      "103": "Early Hints",
      "200": "OK",
      "201": "Created",
      "202": "Accepted",
      "203": "Non-Authoritative Information",
      "204": "No Content",
      "205": "Reset Content",
      "206": "Partial Content",
      "207": "Multi-Status",
      "208": "Already Reported",
      "226": "IM Used",
      "300": "Multiple Choices",
      "301": "Moved Permanently",
      "302": "Found",
      "303": "See Other",
      "304": "Not Modified",
      "305": "Use Proxy",
      "306": "(Unused)",
      "307": "Temporary Redirect",
      "308": "Permanent Redirect",
      "400": "Bad Request",
      "401": "Unauthorized",
      "402": "Payment Required",
      "403": "Forbidden",
      "404": "Not Found",
      "405": "Method Not Allowed",
      "406": "Not Acceptable",
      "407": "Proxy Authentication Required",
      "408": "Request Timeout",
      "409": "Conflict",
      "410": "Gone",
      "411": "Length Required",
      "412": "Precondition Failed",
      "413": "Payload Too Large",
      "414": "URI Too Long",
      "415": "Unsupported Media Type",
      "416": "Range Not Satisfiable",
      "417": "Expectation Failed",
      "418": "I'm a teapot",
      "421": "Misdirected Request",
      "422": "Unprocessable Entity",
      "423": "Locked",
      "424": "Failed Dependency",
      "425": "Unordered Collection",
      "426": "Upgrade Required",
      "428": "Precondition Required",
      "429": "Too Many Requests",
      "431": "Request Header Fields Too Large",
      "451": "Unavailable For Legal Reasons",
      "500": "Internal Server Error",
      "501": "Not Implemented",
      "502": "Bad Gateway",
      "503": "Service Unavailable",
      "504": "Gateway Timeout",
      "505": "HTTP Version Not Supported",
      "506": "Variant Also Negotiates",
      "507": "Insufficient Storage",
      "508": "Loop Detected",
      "509": "Bandwidth Limit Exceeded",
      "510": "Not Extended",
      "511": "Network Authentication Required"
    };
  }
});

// node_modules/statuses/index.js
var require_statuses = __commonJS({
  "node_modules/statuses/index.js"(exports2, module2) {
    "use strict";
    var codes = require_codes();
    module2.exports = status;
    status.STATUS_CODES = codes;
    status.codes = populateStatusesMap(status, codes);
    status.redirect = {
      300: true,
      301: true,
      302: true,
      303: true,
      305: true,
      307: true,
      308: true
    };
    status.empty = {
      204: true,
      205: true,
      304: true
    };
    status.retry = {
      502: true,
      503: true,
      504: true
    };
    function populateStatusesMap(statuses, codes2) {
      var arr = [];
      Object.keys(codes2).forEach(function forEachCode(code) {
        var message2 = codes2[code];
        var status2 = Number(code);
        statuses[status2] = message2;
        statuses[message2] = status2;
        statuses[message2.toLowerCase()] = status2;
        arr.push(status2);
      });
      return arr;
    }
    function status(code) {
      if (typeof code === "number") {
        if (!status[code])
          throw new Error("invalid status code: " + code);
        return code;
      }
      if (typeof code !== "string") {
        throw new TypeError("code must be a number or string");
      }
      var n2 = parseInt(code, 10);
      if (!isNaN(n2)) {
        if (!status[n2])
          throw new Error("invalid status code: " + n2);
        return n2;
      }
      n2 = status[code.toLowerCase()];
      if (!n2)
        throw new Error('invalid status message: "' + code + '"');
      return n2;
    }
  }
});

// node_modules/destroy/index.js
var require_destroy = __commonJS({
  "node_modules/destroy/index.js"(exports2, module2) {
    "use strict";
    var ReadStream = require("fs").ReadStream;
    var Stream = require("stream");
    module2.exports = destroy;
    function destroy(stream) {
      if (stream instanceof ReadStream) {
        return destroyReadStream(stream);
      }
      if (!(stream instanceof Stream)) {
        return stream;
      }
      if (typeof stream.destroy === "function") {
        stream.destroy();
      }
      return stream;
    }
    function destroyReadStream(stream) {
      stream.destroy();
      if (typeof stream.close === "function") {
        stream.on("open", onOpenClose);
      }
      return stream;
    }
    function onOpenClose() {
      if (typeof this.fd === "number") {
        this.close();
      }
    }
  }
});

// node_modules/vary/index.js
var require_vary = __commonJS({
  "node_modules/vary/index.js"(exports2, module2) {
    "use strict";
    module2.exports = vary;
    module2.exports.append = append;
    var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    function append(header, field) {
      if (typeof header !== "string") {
        throw new TypeError("header argument is required");
      }
      if (!field) {
        throw new TypeError("field argument is required");
      }
      var fields = !Array.isArray(field) ? parse(String(field)) : field;
      for (var j2 = 0; j2 < fields.length; j2++) {
        if (!FIELD_NAME_REGEXP.test(fields[j2])) {
          throw new TypeError("field argument contains an invalid header name");
        }
      }
      if (header === "*") {
        return header;
      }
      var val = header;
      var vals = parse(header.toLowerCase());
      if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
        return "*";
      }
      for (var i2 = 0; i2 < fields.length; i2++) {
        var fld = fields[i2].toLowerCase();
        if (vals.indexOf(fld) === -1) {
          vals.push(fld);
          val = val ? val + ", " + fields[i2] : fields[i2];
        }
      }
      return val;
    }
    function parse(header) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i2 = 0, len = header.length; i2 < len; i2++) {
        switch (header.charCodeAt(i2)) {
          case 32:
            if (start === end) {
              start = end = i2 + 1;
            }
            break;
          case 44:
            list.push(header.substring(start, end));
            start = end = i2 + 1;
            break;
          default:
            end = i2 + 1;
            break;
        }
      }
      list.push(header.substring(start, end));
      return list;
    }
    function vary(res, field) {
      if (!res || !res.getHeader || !res.setHeader) {
        throw new TypeError("res argument is required");
      }
      var val = res.getHeader("Vary") || "";
      var header = Array.isArray(val) ? val.join(", ") : String(val);
      if (val = append(header, field)) {
        res.setHeader("Vary", val);
      }
    }
  }
});

// node_modules/only/index.js
var require_only = __commonJS({
  "node_modules/only/index.js"(exports2, module2) {
    module2.exports = function(obj, keys) {
      obj = obj || {};
      if (typeof keys == "string")
        keys = keys.split(/ +/);
      return keys.reduce(function(ret, key) {
        if (obj[key] == null)
          return ret;
        ret[key] = obj[key];
        return ret;
      }, {});
    };
  }
});

// node_modules/encodeurl/index.js
var require_encodeurl = __commonJS({
  "node_modules/encodeurl/index.js"(exports2, module2) {
    "use strict";
    module2.exports = encodeUrl;
    var ENCODE_CHARS_REGEXP = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g;
    var UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;
    var UNMATCHED_SURROGATE_PAIR_REPLACE = "$1\uFFFD$2";
    function encodeUrl(url) {
      return String(url).replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE).replace(ENCODE_CHARS_REGEXP, encodeURI);
    }
  }
});

// node_modules/koa/lib/response.js
var require_response = __commonJS({
  "node_modules/koa/lib/response.js"(exports2, module2) {
    "use strict";
    var contentDisposition = require_content_disposition();
    var getType = require_cache_content_type();
    var onFinish = require_on_finished();
    var escape = require_escape_html();
    var typeis = require_type_is().is;
    var statuses = require_statuses();
    var destroy = require_destroy();
    var assert = require("assert");
    var extname = require("path").extname;
    var vary = require_vary();
    var only = require_only();
    var util = require("util");
    var encodeUrl = require_encodeurl();
    var Stream = require("stream");
    module2.exports = {
      get socket() {
        return this.res.socket;
      },
      get header() {
        const { res } = this;
        return typeof res.getHeaders === "function" ? res.getHeaders() : res._headers || {};
      },
      get headers() {
        return this.header;
      },
      get status() {
        return this.res.statusCode;
      },
      set status(code) {
        if (this.headerSent)
          return;
        assert(Number.isInteger(code), "status code must be a number");
        assert(code >= 100 && code <= 999, `invalid status code: ${code}`);
        this._explicitStatus = true;
        this.res.statusCode = code;
        if (this.req.httpVersionMajor < 2)
          this.res.statusMessage = statuses[code];
        if (this.body && statuses.empty[code])
          this.body = null;
      },
      get message() {
        return this.res.statusMessage || statuses[this.status];
      },
      set message(msg) {
        this.res.statusMessage = msg;
      },
      get body() {
        return this._body;
      },
      set body(val) {
        const original = this._body;
        this._body = val;
        if (val == null) {
          if (!statuses.empty[this.status])
            this.status = 204;
          if (val === null)
            this._explicitNullBody = true;
          this.remove("Content-Type");
          this.remove("Content-Length");
          this.remove("Transfer-Encoding");
          return;
        }
        if (!this._explicitStatus)
          this.status = 200;
        const setType = !this.has("Content-Type");
        if (typeof val === "string") {
          if (setType)
            this.type = /^\s*</.test(val) ? "html" : "text";
          this.length = Buffer.byteLength(val);
          return;
        }
        if (Buffer.isBuffer(val)) {
          if (setType)
            this.type = "bin";
          this.length = val.length;
          return;
        }
        if (val instanceof Stream) {
          onFinish(this.res, destroy.bind(null, val));
          if (original != val) {
            val.once("error", (err) => this.ctx.onerror(err));
            if (original != null)
              this.remove("Content-Length");
          }
          if (setType)
            this.type = "bin";
          return;
        }
        this.remove("Content-Length");
        this.type = "json";
      },
      set length(n2) {
        this.set("Content-Length", n2);
      },
      get length() {
        if (this.has("Content-Length")) {
          return parseInt(this.get("Content-Length"), 10) || 0;
        }
        const { body } = this;
        if (!body || body instanceof Stream)
          return void 0;
        if (typeof body === "string")
          return Buffer.byteLength(body);
        if (Buffer.isBuffer(body))
          return body.length;
        return Buffer.byteLength(JSON.stringify(body));
      },
      get headerSent() {
        return this.res.headersSent;
      },
      vary(field) {
        if (this.headerSent)
          return;
        vary(this.res, field);
      },
      redirect(url, alt) {
        if (url === "back")
          url = this.ctx.get("Referrer") || alt || "/";
        this.set("Location", encodeUrl(url));
        if (!statuses.redirect[this.status])
          this.status = 302;
        if (this.ctx.accepts("html")) {
          url = escape(url);
          this.type = "text/html; charset=utf-8";
          this.body = `Redirecting to <a href="${url}">${url}</a>.`;
          return;
        }
        this.type = "text/plain; charset=utf-8";
        this.body = `Redirecting to ${url}.`;
      },
      attachment(filename, options) {
        if (filename)
          this.type = extname(filename);
        this.set("Content-Disposition", contentDisposition(filename, options));
      },
      set type(type) {
        type = getType(type);
        if (type) {
          this.set("Content-Type", type);
        } else {
          this.remove("Content-Type");
        }
      },
      set lastModified(val) {
        if (typeof val === "string")
          val = new Date(val);
        this.set("Last-Modified", val.toUTCString());
      },
      get lastModified() {
        const date = this.get("last-modified");
        if (date)
          return new Date(date);
      },
      set etag(val) {
        if (!/^(W\/)?"/.test(val))
          val = `"${val}"`;
        this.set("ETag", val);
      },
      get etag() {
        return this.get("ETag");
      },
      get type() {
        const type = this.get("Content-Type");
        if (!type)
          return "";
        return type.split(";", 1)[0];
      },
      is(type, ...types) {
        return typeis(this.type, type, ...types);
      },
      get(field) {
        return this.header[field.toLowerCase()] || "";
      },
      has(field) {
        return typeof this.res.hasHeader === "function" ? this.res.hasHeader(field) : field.toLowerCase() in this.headers;
      },
      set(field, val) {
        if (this.headerSent)
          return;
        if (arguments.length === 2) {
          if (Array.isArray(val))
            val = val.map((v2) => typeof v2 === "string" ? v2 : String(v2));
          else if (typeof val !== "string")
            val = String(val);
          this.res.setHeader(field, val);
        } else {
          for (const key in field) {
            this.set(key, field[key]);
          }
        }
      },
      append(field, val) {
        const prev = this.get(field);
        if (prev) {
          val = Array.isArray(prev) ? prev.concat(val) : [prev].concat(val);
        }
        return this.set(field, val);
      },
      remove(field) {
        if (this.headerSent)
          return;
        this.res.removeHeader(field);
      },
      get writable() {
        if (this.res.writableEnded || this.res.finished)
          return false;
        const socket = this.res.socket;
        if (!socket)
          return true;
        return socket.writable;
      },
      inspect() {
        if (!this.res)
          return;
        const o2 = this.toJSON();
        o2.body = this.body;
        return o2;
      },
      toJSON() {
        return only(this, [
          "status",
          "message",
          "header"
        ]);
      },
      flushHeaders() {
        this.res.flushHeaders();
      }
    };
    if (util.inspect.custom) {
      module2.exports[util.inspect.custom] = module2.exports.inspect;
    }
  }
});

// node_modules/koa-compose/index.js
var require_koa_compose = __commonJS({
  "node_modules/koa-compose/index.js"(exports2, module2) {
    "use strict";
    module2.exports = compose;
    function compose(middleware) {
      if (!Array.isArray(middleware))
        throw new TypeError("Middleware stack must be an array!");
      for (const fn3 of middleware) {
        if (typeof fn3 !== "function")
          throw new TypeError("Middleware must be composed of functions!");
      }
      return function(context, next) {
        let index = -1;
        return dispatch(0);
        function dispatch(i2) {
          if (i2 <= index)
            return Promise.reject(new Error("next() called multiple times"));
          index = i2;
          let fn3 = middleware[i2];
          if (i2 === middleware.length)
            fn3 = next;
          if (!fn3)
            return Promise.resolve();
          try {
            return Promise.resolve(fn3(context, dispatch.bind(null, i2 + 1)));
          } catch (err) {
            return Promise.reject(err);
          }
        }
      };
    }
  }
});

// node_modules/http-errors/node_modules/depd/lib/compat/callsite-tostring.js
var require_callsite_tostring = __commonJS({
  "node_modules/http-errors/node_modules/depd/lib/compat/callsite-tostring.js"(exports2, module2) {
    "use strict";
    module2.exports = callSiteToString2;
    function callSiteFileLocation(callSite) {
      var fileName;
      var fileLocation = "";
      if (callSite.isNative()) {
        fileLocation = "native";
      } else if (callSite.isEval()) {
        fileName = callSite.getScriptNameOrSourceURL();
        if (!fileName) {
          fileLocation = callSite.getEvalOrigin();
        }
      } else {
        fileName = callSite.getFileName();
      }
      if (fileName) {
        fileLocation += fileName;
        var lineNumber = callSite.getLineNumber();
        if (lineNumber != null) {
          fileLocation += ":" + lineNumber;
          var columnNumber = callSite.getColumnNumber();
          if (columnNumber) {
            fileLocation += ":" + columnNumber;
          }
        }
      }
      return fileLocation || "unknown source";
    }
    function callSiteToString2(callSite) {
      var addSuffix = true;
      var fileLocation = callSiteFileLocation(callSite);
      var functionName = callSite.getFunctionName();
      var isConstructor = callSite.isConstructor();
      var isMethodCall = !(callSite.isToplevel() || isConstructor);
      var line = "";
      if (isMethodCall) {
        var methodName = callSite.getMethodName();
        var typeName = getConstructorName(callSite);
        if (functionName) {
          if (typeName && functionName.indexOf(typeName) !== 0) {
            line += typeName + ".";
          }
          line += functionName;
          if (methodName && functionName.lastIndexOf("." + methodName) !== functionName.length - methodName.length - 1) {
            line += " [as " + methodName + "]";
          }
        } else {
          line += typeName + "." + (methodName || "<anonymous>");
        }
      } else if (isConstructor) {
        line += "new " + (functionName || "<anonymous>");
      } else if (functionName) {
        line += functionName;
      } else {
        addSuffix = false;
        line += fileLocation;
      }
      if (addSuffix) {
        line += " (" + fileLocation + ")";
      }
      return line;
    }
    function getConstructorName(obj) {
      var receiver = obj.receiver;
      return receiver.constructor && receiver.constructor.name || null;
    }
  }
});

// node_modules/http-errors/node_modules/depd/lib/compat/event-listener-count.js
var require_event_listener_count = __commonJS({
  "node_modules/http-errors/node_modules/depd/lib/compat/event-listener-count.js"(exports2, module2) {
    "use strict";
    module2.exports = eventListenerCount2;
    function eventListenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    }
  }
});

// node_modules/http-errors/node_modules/depd/lib/compat/index.js
var require_compat = __commonJS({
  "node_modules/http-errors/node_modules/depd/lib/compat/index.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events").EventEmitter;
    lazyProperty(module2.exports, "callSiteToString", function callSiteToString2() {
      var limit = Error.stackTraceLimit;
      var obj = {};
      var prep = Error.prepareStackTrace;
      function prepareObjectStackTrace2(obj2, stack3) {
        return stack3;
      }
      Error.prepareStackTrace = prepareObjectStackTrace2;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(obj);
      var stack2 = obj.stack.slice();
      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;
      return stack2[0].toString ? toString : require_callsite_tostring();
    });
    lazyProperty(module2.exports, "eventListenerCount", function eventListenerCount2() {
      return EventEmitter.listenerCount || require_event_listener_count();
    });
    function lazyProperty(obj, prop, getter) {
      function get() {
        var val = getter();
        Object.defineProperty(obj, prop, {
          configurable: true,
          enumerable: true,
          value: val
        });
        return val;
      }
      Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable: true,
        get
      });
    }
    function toString(obj) {
      return obj.toString();
    }
  }
});

// node_modules/http-errors/node_modules/depd/index.js
var require_depd = __commonJS({
  "node_modules/http-errors/node_modules/depd/index.js"(exports, module) {
    var callSiteToString = require_compat().callSiteToString;
    var eventListenerCount = require_compat().eventListenerCount;
    var relative = require("path").relative;
    module.exports = depd;
    var basePath = process.cwd();
    function containsNamespace(str, namespace) {
      var vals = str.split(/[ ,]+/);
      var ns = String(namespace).toLowerCase();
      for (var i2 = 0; i2 < vals.length; i2++) {
        var val = vals[i2];
        if (val && (val === "*" || val.toLowerCase() === ns)) {
          return true;
        }
      }
      return false;
    }
    function convertDataDescriptorToAccessor(obj, prop, message2) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      var value = descriptor.value;
      descriptor.get = function getter() {
        return value;
      };
      if (descriptor.writable) {
        descriptor.set = function setter(val) {
          return value = val;
        };
      }
      delete descriptor.value;
      delete descriptor.writable;
      Object.defineProperty(obj, prop, descriptor);
      return descriptor;
    }
    function createArgumentsString(arity) {
      var str = "";
      for (var i2 = 0; i2 < arity; i2++) {
        str += ", arg" + i2;
      }
      return str.substr(2);
    }
    function createStackString(stack2) {
      var str = this.name + ": " + this.namespace;
      if (this.message) {
        str += " deprecated " + this.message;
      }
      for (var i2 = 0; i2 < stack2.length; i2++) {
        str += "\n    at " + callSiteToString(stack2[i2]);
      }
      return str;
    }
    function depd(namespace) {
      if (!namespace) {
        throw new TypeError("argument namespace is required");
      }
      var stack2 = getStack();
      var site2 = callSiteLocation(stack2[1]);
      var file = site2[0];
      function deprecate2(message2) {
        log.call(deprecate2, message2);
      }
      deprecate2._file = file;
      deprecate2._ignored = isignored(namespace);
      deprecate2._namespace = namespace;
      deprecate2._traced = istraced(namespace);
      deprecate2._warned = Object.create(null);
      deprecate2.function = wrapfunction;
      deprecate2.property = wrapproperty;
      return deprecate2;
    }
    function isignored(namespace) {
      if (process.noDeprecation) {
        return true;
      }
      var str = process.env.NO_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function istraced(namespace) {
      if (process.traceDeprecation) {
        return true;
      }
      var str = process.env.TRACE_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function log(message2, site2) {
      var haslisteners = eventListenerCount(process, "deprecation") !== 0;
      if (!haslisteners && this._ignored) {
        return;
      }
      var caller;
      var callFile;
      var callSite;
      var depSite;
      var i2 = 0;
      var seen = false;
      var stack2 = getStack();
      var file = this._file;
      if (site2) {
        depSite = site2;
        callSite = callSiteLocation(stack2[1]);
        callSite.name = depSite.name;
        file = callSite[0];
      } else {
        i2 = 2;
        depSite = callSiteLocation(stack2[i2]);
        callSite = depSite;
      }
      for (; i2 < stack2.length; i2++) {
        caller = callSiteLocation(stack2[i2]);
        callFile = caller[0];
        if (callFile === file) {
          seen = true;
        } else if (callFile === this._file) {
          file = this._file;
        } else if (seen) {
          break;
        }
      }
      var key = caller ? depSite.join(":") + "__" + caller.join(":") : void 0;
      if (key !== void 0 && key in this._warned) {
        return;
      }
      this._warned[key] = true;
      var msg = message2;
      if (!msg) {
        msg = callSite === depSite || !callSite.name ? defaultMessage(depSite) : defaultMessage(callSite);
      }
      if (haslisteners) {
        var err = DeprecationError(this._namespace, msg, stack2.slice(i2));
        process.emit("deprecation", err);
        return;
      }
      var format = process.stderr.isTTY ? formatColor : formatPlain;
      var output = format.call(this, msg, caller, stack2.slice(i2));
      process.stderr.write(output + "\n", "utf8");
    }
    function callSiteLocation(callSite) {
      var file = callSite.getFileName() || "<anonymous>";
      var line = callSite.getLineNumber();
      var colm = callSite.getColumnNumber();
      if (callSite.isEval()) {
        file = callSite.getEvalOrigin() + ", " + file;
      }
      var site2 = [file, line, colm];
      site2.callSite = callSite;
      site2.name = callSite.getFunctionName();
      return site2;
    }
    function defaultMessage(site2) {
      var callSite = site2.callSite;
      var funcName = site2.name;
      if (!funcName) {
        funcName = "<anonymous@" + formatLocation(site2) + ">";
      }
      var context = callSite.getThis();
      var typeName = context && callSite.getTypeName();
      if (typeName === "Object") {
        typeName = void 0;
      }
      if (typeName === "Function") {
        typeName = context.name || typeName;
      }
      return typeName && callSite.getMethodName() ? typeName + "." + funcName : funcName;
    }
    function formatPlain(msg, caller, stack2) {
      var timestamp = new Date().toUTCString();
      var formatted = timestamp + " " + this._namespace + " deprecated " + msg;
      if (this._traced) {
        for (var i2 = 0; i2 < stack2.length; i2++) {
          formatted += "\n    at " + callSiteToString(stack2[i2]);
        }
        return formatted;
      }
      if (caller) {
        formatted += " at " + formatLocation(caller);
      }
      return formatted;
    }
    function formatColor(msg, caller, stack2) {
      var formatted = "[36;1m" + this._namespace + "[22;39m [33;1mdeprecated[22;39m [0m" + msg + "[39m";
      if (this._traced) {
        for (var i2 = 0; i2 < stack2.length; i2++) {
          formatted += "\n    [36mat " + callSiteToString(stack2[i2]) + "[39m";
        }
        return formatted;
      }
      if (caller) {
        formatted += " [36m" + formatLocation(caller) + "[39m";
      }
      return formatted;
    }
    function formatLocation(callSite) {
      return relative(basePath, callSite[0]) + ":" + callSite[1] + ":" + callSite[2];
    }
    function getStack() {
      var limit = Error.stackTraceLimit;
      var obj = {};
      var prep = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareObjectStackTrace;
      Error.stackTraceLimit = Math.max(10, limit);
      Error.captureStackTrace(obj);
      var stack2 = obj.stack.slice(1);
      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;
      return stack2;
    }
    function prepareObjectStackTrace(obj, stack2) {
      return stack2;
    }
    function wrapfunction(fn, message) {
      if (typeof fn !== "function") {
        throw new TypeError("argument fn must be a function");
      }
      var args = createArgumentsString(fn.length);
      var deprecate = this;
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = fn.name;
      var deprecatedfn = eval("(function (" + args + ') {\n"use strict"\nlog.call(deprecate, message, site)\nreturn fn.apply(this, arguments)\n})');
      return deprecatedfn;
    }
    function wrapproperty(obj, prop, message2) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("argument obj must be object");
      }
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      if (!descriptor) {
        throw new TypeError("must call property on owner object");
      }
      if (!descriptor.configurable) {
        throw new TypeError("property must be configurable");
      }
      var deprecate2 = this;
      var stack2 = getStack();
      var site2 = callSiteLocation(stack2[1]);
      site2.name = prop;
      if ("value" in descriptor) {
        descriptor = convertDataDescriptorToAccessor(obj, prop, message2);
      }
      var get = descriptor.get;
      var set = descriptor.set;
      if (typeof get === "function") {
        descriptor.get = function getter() {
          log.call(deprecate2, message2, site2);
          return get.apply(this, arguments);
        };
      }
      if (typeof set === "function") {
        descriptor.set = function setter() {
          log.call(deprecate2, message2, site2);
          return set.apply(this, arguments);
        };
      }
      Object.defineProperty(obj, prop, descriptor);
    }
    function DeprecationError(namespace, message2, stack2) {
      var error = new Error();
      var stackString;
      Object.defineProperty(error, "constructor", {
        value: DeprecationError
      });
      Object.defineProperty(error, "message", {
        configurable: true,
        enumerable: false,
        value: message2,
        writable: true
      });
      Object.defineProperty(error, "name", {
        enumerable: false,
        configurable: true,
        value: "DeprecationError",
        writable: true
      });
      Object.defineProperty(error, "namespace", {
        configurable: true,
        enumerable: false,
        value: namespace,
        writable: true
      });
      Object.defineProperty(error, "stack", {
        configurable: true,
        enumerable: false,
        get: function() {
          if (stackString !== void 0) {
            return stackString;
          }
          return stackString = createStackString.call(this, stack2);
        },
        set: function setter(val) {
          stackString = val;
        }
      });
      return error;
    }
  }
});

// node_modules/setprototypeof/index.js
var require_setprototypeof = __commonJS({
  "node_modules/setprototypeof/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
    function setProtoOf(obj, proto) {
      obj.__proto__ = proto;
      return obj;
    }
    function mixinProperties(obj, proto) {
      for (var prop in proto) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
          obj[prop] = proto[prop];
        }
      }
      return obj;
    }
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function")
        throw "";
      module2.exports = util.inherits;
    } catch (e3) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/toidentifier/index.js
var require_toidentifier = __commonJS({
  "node_modules/toidentifier/index.js"(exports2, module2) {
    module2.exports = toIdentifier;
    function toIdentifier(str) {
      return str.split(" ").map(function(token) {
        return token.slice(0, 1).toUpperCase() + token.slice(1);
      }).join("").replace(/[^ _0-9a-z]/gi, "");
    }
  }
});

// node_modules/http-errors/index.js
var require_http_errors = __commonJS({
  "node_modules/http-errors/index.js"(exports2, module2) {
    "use strict";
    var deprecate2 = require_depd()("http-errors");
    var setPrototypeOf = require_setprototypeof();
    var statuses = require_statuses();
    var inherits = require_inherits();
    var toIdentifier = require_toidentifier();
    module2.exports = createError;
    module2.exports.HttpError = createHttpErrorConstructor();
    module2.exports.isHttpError = createIsHttpErrorFunction(module2.exports.HttpError);
    populateConstructorExports(module2.exports, statuses.codes, module2.exports.HttpError);
    function codeClass(status) {
      return Number(String(status).charAt(0) + "00");
    }
    function createError() {
      var err;
      var msg;
      var status = 500;
      var props = {};
      for (var i2 = 0; i2 < arguments.length; i2++) {
        var arg = arguments[i2];
        if (arg instanceof Error) {
          err = arg;
          status = err.status || err.statusCode || status;
          continue;
        }
        switch (typeof arg) {
          case "string":
            msg = arg;
            break;
          case "number":
            status = arg;
            if (i2 !== 0) {
              deprecate2("non-first-argument status code; replace with createError(" + arg + ", ...)");
            }
            break;
          case "object":
            props = arg;
            break;
        }
      }
      if (typeof status === "number" && (status < 400 || status >= 600)) {
        deprecate2("non-error status code; use only 4xx or 5xx status codes");
      }
      if (typeof status !== "number" || !statuses[status] && (status < 400 || status >= 600)) {
        status = 500;
      }
      var HttpError2 = createError[status] || createError[codeClass(status)];
      if (!err) {
        err = HttpError2 ? new HttpError2(msg) : new Error(msg || statuses[status]);
        Error.captureStackTrace(err, createError);
      }
      if (!HttpError2 || !(err instanceof HttpError2) || err.status !== status) {
        err.expose = status < 500;
        err.status = err.statusCode = status;
      }
      for (var key in props) {
        if (key !== "status" && key !== "statusCode") {
          err[key] = props[key];
        }
      }
      return err;
    }
    function createHttpErrorConstructor() {
      function HttpError2() {
        throw new TypeError("cannot construct abstract class");
      }
      inherits(HttpError2, Error);
      return HttpError2;
    }
    function createClientErrorConstructor(HttpError2, name, code) {
      var className = toClassName(name);
      function ClientError(message2) {
        var msg = message2 != null ? message2 : statuses[code];
        var err = new Error(msg);
        Error.captureStackTrace(err, ClientError);
        setPrototypeOf(err, ClientError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(ClientError, HttpError2);
      nameFunc(ClientError, className);
      ClientError.prototype.status = code;
      ClientError.prototype.statusCode = code;
      ClientError.prototype.expose = true;
      return ClientError;
    }
    function createIsHttpErrorFunction(HttpError2) {
      return function isHttpError(val) {
        if (!val || typeof val !== "object") {
          return false;
        }
        if (val instanceof HttpError2) {
          return true;
        }
        return val instanceof Error && typeof val.expose === "boolean" && typeof val.statusCode === "number" && val.status === val.statusCode;
      };
    }
    function createServerErrorConstructor(HttpError2, name, code) {
      var className = toClassName(name);
      function ServerError(message2) {
        var msg = message2 != null ? message2 : statuses[code];
        var err = new Error(msg);
        Error.captureStackTrace(err, ServerError);
        setPrototypeOf(err, ServerError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(ServerError, HttpError2);
      nameFunc(ServerError, className);
      ServerError.prototype.status = code;
      ServerError.prototype.statusCode = code;
      ServerError.prototype.expose = false;
      return ServerError;
    }
    function nameFunc(func, name) {
      var desc = Object.getOwnPropertyDescriptor(func, "name");
      if (desc && desc.configurable) {
        desc.value = name;
        Object.defineProperty(func, "name", desc);
      }
    }
    function populateConstructorExports(exports3, codes, HttpError2) {
      codes.forEach(function forEachCode(code) {
        var CodeError;
        var name = toIdentifier(statuses[code]);
        switch (codeClass(code)) {
          case 400:
            CodeError = createClientErrorConstructor(HttpError2, name, code);
            break;
          case 500:
            CodeError = createServerErrorConstructor(HttpError2, name, code);
            break;
        }
        if (CodeError) {
          exports3[code] = CodeError;
          exports3[name] = CodeError;
        }
      });
      exports3["I'mateapot"] = deprecate2.function(exports3.ImATeapot, `"I'mateapot"; use "ImATeapot" instead`);
    }
    function toClassName(name) {
      return name.substr(-5) !== "Error" ? name + "Error" : name;
    }
  }
});

// node_modules/deep-equal/lib/keys.js
var require_keys = __commonJS({
  "node_modules/deep-equal/lib/keys.js"(exports2, module2) {
    exports2 = module2.exports = typeof Object.keys === "function" ? Object.keys : shim;
    exports2.shim = shim;
    function shim(obj) {
      var keys = [];
      for (var key in obj)
        keys.push(key);
      return keys;
    }
  }
});

// node_modules/deep-equal/lib/is_arguments.js
var require_is_arguments = __commonJS({
  "node_modules/deep-equal/lib/is_arguments.js"(exports2, module2) {
    var supportsArgumentsClass = function() {
      return Object.prototype.toString.call(arguments);
    }() == "[object Arguments]";
    exports2 = module2.exports = supportsArgumentsClass ? supported : unsupported;
    exports2.supported = supported;
    function supported(object) {
      return Object.prototype.toString.call(object) == "[object Arguments]";
    }
    exports2.unsupported = unsupported;
    function unsupported(object) {
      return object && typeof object == "object" && typeof object.length == "number" && Object.prototype.hasOwnProperty.call(object, "callee") && !Object.prototype.propertyIsEnumerable.call(object, "callee") || false;
    }
  }
});

// node_modules/deep-equal/index.js
var require_deep_equal = __commonJS({
  "node_modules/deep-equal/index.js"(exports2, module2) {
    var pSlice = Array.prototype.slice;
    var objectKeys = require_keys();
    var isArguments = require_is_arguments();
    var deepEqual = module2.exports = function(actual, expected, opts) {
      if (!opts)
        opts = {};
      if (actual === expected) {
        return true;
      } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();
      } else if (!actual || !expected || typeof actual != "object" && typeof expected != "object") {
        return opts.strict ? actual === expected : actual == expected;
      } else {
        return objEquiv(actual, expected, opts);
      }
    };
    function isUndefinedOrNull(value) {
      return value === null || value === void 0;
    }
    function isBuffer(x2) {
      if (!x2 || typeof x2 !== "object" || typeof x2.length !== "number")
        return false;
      if (typeof x2.copy !== "function" || typeof x2.slice !== "function") {
        return false;
      }
      if (x2.length > 0 && typeof x2[0] !== "number")
        return false;
      return true;
    }
    function objEquiv(a2, b2, opts) {
      var i2, key;
      if (isUndefinedOrNull(a2) || isUndefinedOrNull(b2))
        return false;
      if (a2.prototype !== b2.prototype)
        return false;
      if (isArguments(a2)) {
        if (!isArguments(b2)) {
          return false;
        }
        a2 = pSlice.call(a2);
        b2 = pSlice.call(b2);
        return deepEqual(a2, b2, opts);
      }
      if (isBuffer(a2)) {
        if (!isBuffer(b2)) {
          return false;
        }
        if (a2.length !== b2.length)
          return false;
        for (i2 = 0; i2 < a2.length; i2++) {
          if (a2[i2] !== b2[i2])
            return false;
        }
        return true;
      }
      try {
        var ka2 = objectKeys(a2), kb = objectKeys(b2);
      } catch (e3) {
        return false;
      }
      if (ka2.length != kb.length)
        return false;
      ka2.sort();
      kb.sort();
      for (i2 = ka2.length - 1; i2 >= 0; i2--) {
        if (ka2[i2] != kb[i2])
          return false;
      }
      for (i2 = ka2.length - 1; i2 >= 0; i2--) {
        key = ka2[i2];
        if (!deepEqual(a2[key], b2[key], opts))
          return false;
      }
      return typeof a2 === typeof b2;
    }
  }
});

// node_modules/http-assert/index.js
var require_http_assert = __commonJS({
  "node_modules/http-assert/index.js"(exports2, module2) {
    var createError = require_http_errors();
    var eql = require_deep_equal();
    module2.exports = assert;
    function assert(value, status, msg, opts) {
      if (value)
        return;
      throw createError(status, msg, opts);
    }
    assert.fail = function(status, msg, opts) {
      assert(false, status, msg, opts);
    };
    assert.equal = function(a2, b2, status, msg, opts) {
      assert(a2 == b2, status, msg, opts);
    };
    assert.notEqual = function(a2, b2, status, msg, opts) {
      assert(a2 != b2, status, msg, opts);
    };
    assert.ok = function(value, status, msg, opts) {
      assert(value, status, msg, opts);
    };
    assert.strictEqual = function(a2, b2, status, msg, opts) {
      assert(a2 === b2, status, msg, opts);
    };
    assert.notStrictEqual = function(a2, b2, status, msg, opts) {
      assert(a2 !== b2, status, msg, opts);
    };
    assert.deepEqual = function(a2, b2, status, msg, opts) {
      assert(eql(a2, b2), status, msg, opts);
    };
    assert.notDeepEqual = function(a2, b2, status, msg, opts) {
      assert(!eql(a2, b2), status, msg, opts);
    };
  }
});

// node_modules/delegates/index.js
var require_delegates = __commonJS({
  "node_modules/delegates/index.js"(exports2, module2) {
    module2.exports = Delegator;
    function Delegator(proto, target) {
      if (!(this instanceof Delegator))
        return new Delegator(proto, target);
      this.proto = proto;
      this.target = target;
      this.methods = [];
      this.getters = [];
      this.setters = [];
      this.fluents = [];
    }
    Delegator.prototype.method = function(name) {
      var proto = this.proto;
      var target = this.target;
      this.methods.push(name);
      proto[name] = function() {
        return this[target][name].apply(this[target], arguments);
      };
      return this;
    };
    Delegator.prototype.access = function(name) {
      return this.getter(name).setter(name);
    };
    Delegator.prototype.getter = function(name) {
      var proto = this.proto;
      var target = this.target;
      this.getters.push(name);
      proto.__defineGetter__(name, function() {
        return this[target][name];
      });
      return this;
    };
    Delegator.prototype.setter = function(name) {
      var proto = this.proto;
      var target = this.target;
      this.setters.push(name);
      proto.__defineSetter__(name, function(val) {
        return this[target][name] = val;
      });
      return this;
    };
    Delegator.prototype.fluent = function(name) {
      var proto = this.proto;
      var target = this.target;
      this.fluents.push(name);
      proto[name] = function(val) {
        if (typeof val != "undefined") {
          this[target][name] = val;
          return this;
        } else {
          return this[target][name];
        }
      };
      return this;
    };
  }
});

// node_modules/depd/index.js
var require_depd2 = __commonJS({
  "node_modules/depd/index.js"(exports2, module2) {
    var relative2 = require("path").relative;
    module2.exports = depd2;
    var basePath2 = process.cwd();
    function containsNamespace2(str, namespace) {
      var vals = str.split(/[ ,]+/);
      var ns = String(namespace).toLowerCase();
      for (var i2 = 0; i2 < vals.length; i2++) {
        var val = vals[i2];
        if (val && (val === "*" || val.toLowerCase() === ns)) {
          return true;
        }
      }
      return false;
    }
    function convertDataDescriptorToAccessor2(obj, prop, message2) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      var value = descriptor.value;
      descriptor.get = function getter() {
        return value;
      };
      if (descriptor.writable) {
        descriptor.set = function setter(val) {
          return value = val;
        };
      }
      delete descriptor.value;
      delete descriptor.writable;
      Object.defineProperty(obj, prop, descriptor);
      return descriptor;
    }
    function createArgumentsString2(arity) {
      var str = "";
      for (var i2 = 0; i2 < arity; i2++) {
        str += ", arg" + i2;
      }
      return str.substr(2);
    }
    function createStackString2(stack2) {
      var str = this.name + ": " + this.namespace;
      if (this.message) {
        str += " deprecated " + this.message;
      }
      for (var i2 = 0; i2 < stack2.length; i2++) {
        str += "\n    at " + stack2[i2].toString();
      }
      return str;
    }
    function depd2(namespace) {
      if (!namespace) {
        throw new TypeError("argument namespace is required");
      }
      var stack2 = getStack2();
      var site2 = callSiteLocation2(stack2[1]);
      var file = site2[0];
      function deprecate2(message2) {
        log2.call(deprecate2, message2);
      }
      deprecate2._file = file;
      deprecate2._ignored = isignored2(namespace);
      deprecate2._namespace = namespace;
      deprecate2._traced = istraced2(namespace);
      deprecate2._warned = Object.create(null);
      deprecate2.function = wrapfunction2;
      deprecate2.property = wrapproperty2;
      return deprecate2;
    }
    function eehaslisteners(emitter, type) {
      var count = typeof emitter.listenerCount !== "function" ? emitter.listeners(type).length : emitter.listenerCount(type);
      return count > 0;
    }
    function isignored2(namespace) {
      if (process.noDeprecation) {
        return true;
      }
      var str = process.env.NO_DEPRECATION || "";
      return containsNamespace2(str, namespace);
    }
    function istraced2(namespace) {
      if (process.traceDeprecation) {
        return true;
      }
      var str = process.env.TRACE_DEPRECATION || "";
      return containsNamespace2(str, namespace);
    }
    function log2(message2, site2) {
      var haslisteners = eehaslisteners(process, "deprecation");
      if (!haslisteners && this._ignored) {
        return;
      }
      var caller;
      var callFile;
      var callSite;
      var depSite;
      var i2 = 0;
      var seen = false;
      var stack2 = getStack2();
      var file = this._file;
      if (site2) {
        depSite = site2;
        callSite = callSiteLocation2(stack2[1]);
        callSite.name = depSite.name;
        file = callSite[0];
      } else {
        i2 = 2;
        depSite = callSiteLocation2(stack2[i2]);
        callSite = depSite;
      }
      for (; i2 < stack2.length; i2++) {
        caller = callSiteLocation2(stack2[i2]);
        callFile = caller[0];
        if (callFile === file) {
          seen = true;
        } else if (callFile === this._file) {
          file = this._file;
        } else if (seen) {
          break;
        }
      }
      var key = caller ? depSite.join(":") + "__" + caller.join(":") : void 0;
      if (key !== void 0 && key in this._warned) {
        return;
      }
      this._warned[key] = true;
      var msg = message2;
      if (!msg) {
        msg = callSite === depSite || !callSite.name ? defaultMessage2(depSite) : defaultMessage2(callSite);
      }
      if (haslisteners) {
        var err = DeprecationError2(this._namespace, msg, stack2.slice(i2));
        process.emit("deprecation", err);
        return;
      }
      var format = process.stderr.isTTY ? formatColor2 : formatPlain2;
      var output = format.call(this, msg, caller, stack2.slice(i2));
      process.stderr.write(output + "\n", "utf8");
    }
    function callSiteLocation2(callSite) {
      var file = callSite.getFileName() || "<anonymous>";
      var line = callSite.getLineNumber();
      var colm = callSite.getColumnNumber();
      if (callSite.isEval()) {
        file = callSite.getEvalOrigin() + ", " + file;
      }
      var site2 = [file, line, colm];
      site2.callSite = callSite;
      site2.name = callSite.getFunctionName();
      return site2;
    }
    function defaultMessage2(site2) {
      var callSite = site2.callSite;
      var funcName = site2.name;
      if (!funcName) {
        funcName = "<anonymous@" + formatLocation2(site2) + ">";
      }
      var context = callSite.getThis();
      var typeName = context && callSite.getTypeName();
      if (typeName === "Object") {
        typeName = void 0;
      }
      if (typeName === "Function") {
        typeName = context.name || typeName;
      }
      return typeName && callSite.getMethodName() ? typeName + "." + funcName : funcName;
    }
    function formatPlain2(msg, caller, stack2) {
      var timestamp = new Date().toUTCString();
      var formatted = timestamp + " " + this._namespace + " deprecated " + msg;
      if (this._traced) {
        for (var i2 = 0; i2 < stack2.length; i2++) {
          formatted += "\n    at " + stack2[i2].toString();
        }
        return formatted;
      }
      if (caller) {
        formatted += " at " + formatLocation2(caller);
      }
      return formatted;
    }
    function formatColor2(msg, caller, stack2) {
      var formatted = "[36;1m" + this._namespace + "[22;39m [33;1mdeprecated[22;39m [0m" + msg + "[39m";
      if (this._traced) {
        for (var i2 = 0; i2 < stack2.length; i2++) {
          formatted += "\n    [36mat " + stack2[i2].toString() + "[39m";
        }
        return formatted;
      }
      if (caller) {
        formatted += " [36m" + formatLocation2(caller) + "[39m";
      }
      return formatted;
    }
    function formatLocation2(callSite) {
      return relative2(basePath2, callSite[0]) + ":" + callSite[1] + ":" + callSite[2];
    }
    function getStack2() {
      var limit = Error.stackTraceLimit;
      var obj = {};
      var prep = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareObjectStackTrace2;
      Error.stackTraceLimit = Math.max(10, limit);
      Error.captureStackTrace(obj);
      var stack2 = obj.stack.slice(1);
      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;
      return stack2;
    }
    function prepareObjectStackTrace2(obj, stack2) {
      return stack2;
    }
    function wrapfunction2(fn3, message2) {
      if (typeof fn3 !== "function") {
        throw new TypeError("argument fn must be a function");
      }
      var args2 = createArgumentsString2(fn3.length);
      var stack2 = getStack2();
      var site2 = callSiteLocation2(stack2[1]);
      site2.name = fn3.name;
      var deprecatedfn2 = new Function("fn", "log", "deprecate", "message", "site", '"use strict"\nreturn function (' + args2 + ") {log.call(deprecate, message, site)\nreturn fn.apply(this, arguments)\n}")(fn3, log2, this, message2, site2);
      return deprecatedfn2;
    }
    function wrapproperty2(obj, prop, message2) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("argument obj must be object");
      }
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      if (!descriptor) {
        throw new TypeError("must call property on owner object");
      }
      if (!descriptor.configurable) {
        throw new TypeError("property must be configurable");
      }
      var deprecate2 = this;
      var stack2 = getStack2();
      var site2 = callSiteLocation2(stack2[1]);
      site2.name = prop;
      if ("value" in descriptor) {
        descriptor = convertDataDescriptorToAccessor2(obj, prop, message2);
      }
      var get = descriptor.get;
      var set = descriptor.set;
      if (typeof get === "function") {
        descriptor.get = function getter() {
          log2.call(deprecate2, message2, site2);
          return get.apply(this, arguments);
        };
      }
      if (typeof set === "function") {
        descriptor.set = function setter() {
          log2.call(deprecate2, message2, site2);
          return set.apply(this, arguments);
        };
      }
      Object.defineProperty(obj, prop, descriptor);
    }
    function DeprecationError2(namespace, message2, stack2) {
      var error = new Error();
      var stackString;
      Object.defineProperty(error, "constructor", {
        value: DeprecationError2
      });
      Object.defineProperty(error, "message", {
        configurable: true,
        enumerable: false,
        value: message2,
        writable: true
      });
      Object.defineProperty(error, "name", {
        enumerable: false,
        configurable: true,
        value: "DeprecationError",
        writable: true
      });
      Object.defineProperty(error, "namespace", {
        configurable: true,
        enumerable: false,
        value: namespace,
        writable: true
      });
      Object.defineProperty(error, "stack", {
        configurable: true,
        enumerable: false,
        get: function() {
          if (stackString !== void 0) {
            return stackString;
          }
          return stackString = createStackString2.call(this, stack2);
        },
        set: function setter(val) {
          stackString = val;
        }
      });
      return error;
    }
  }
});

// node_modules/tsscmp/lib/index.js
var require_lib = __commonJS({
  "node_modules/tsscmp/lib/index.js"(exports2, module2) {
    "use strict";
    var crypto = require("crypto");
    function bufferEqual(a2, b2) {
      if (a2.length !== b2.length) {
        return false;
      }
      if (crypto.timingSafeEqual) {
        return crypto.timingSafeEqual(a2, b2);
      }
      for (var i2 = 0; i2 < a2.length; i2++) {
        if (a2[i2] !== b2[i2]) {
          return false;
        }
      }
      return true;
    }
    function timeSafeCompare(a2, b2) {
      var sa2 = String(a2);
      var sb = String(b2);
      var key = crypto.pseudoRandomBytes(32);
      var ah = crypto.createHmac("sha256", key).update(sa2).digest();
      var bh = crypto.createHmac("sha256", key).update(sb).digest();
      return bufferEqual(ah, bh) && a2 === b2;
    }
    module2.exports = timeSafeCompare;
  }
});

// node_modules/keygrip/index.js
var require_keygrip = __commonJS({
  "node_modules/keygrip/index.js"(exports2, module2) {
    "use strict";
    var compare = require_lib();
    var crypto = require("crypto");
    function Keygrip(keys, algorithm, encoding) {
      if (!algorithm)
        algorithm = "sha1";
      if (!encoding)
        encoding = "base64";
      if (!(this instanceof Keygrip))
        return new Keygrip(keys, algorithm, encoding);
      if (!keys || !(0 in keys)) {
        throw new Error("Keys must be provided.");
      }
      function sign(data, key) {
        return crypto.createHmac(algorithm, key).update(data).digest(encoding).replace(/\/|\+|=/g, function(x2) {
          return { "/": "_", "+": "-", "=": "" }[x2];
        });
      }
      this.sign = function(data) {
        return sign(data, keys[0]);
      };
      this.verify = function(data, digest) {
        return this.index(data, digest) > -1;
      };
      this.index = function(data, digest) {
        for (var i2 = 0, l2 = keys.length; i2 < l2; i2++) {
          if (compare(digest, sign(data, keys[i2]))) {
            return i2;
          }
        }
        return -1;
      };
    }
    Keygrip.sign = Keygrip.verify = Keygrip.index = function() {
      throw new Error("Usage: require('keygrip')(<array-of-keys>)");
    };
    module2.exports = Keygrip;
  }
});

// node_modules/cookies/index.js
var require_cookies = __commonJS({
  "node_modules/cookies/index.js"(exports2, module2) {
    "use strict";
    var deprecate2 = require_depd2()("cookies");
    var Keygrip = require_keygrip();
    var http = require("http");
    var cache = {};
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    var SAME_SITE_REGEXP = /^(?:lax|none|strict)$/i;
    function Cookies(request, response, options) {
      if (!(this instanceof Cookies))
        return new Cookies(request, response, options);
      this.secure = void 0;
      this.request = request;
      this.response = response;
      if (options) {
        if (Array.isArray(options)) {
          deprecate2('"keys" argument; provide using options {"keys": [...]}');
          this.keys = new Keygrip(options);
        } else if (options.constructor && options.constructor.name === "Keygrip") {
          deprecate2('"keys" argument; provide using options {"keys": keygrip}');
          this.keys = options;
        } else {
          this.keys = Array.isArray(options.keys) ? new Keygrip(options.keys) : options.keys;
          this.secure = options.secure;
        }
      }
    }
    Cookies.prototype.get = function(name, opts) {
      var sigName = name + ".sig", header, match, value, remote, data, index, signed = opts && opts.signed !== void 0 ? opts.signed : !!this.keys;
      header = this.request.headers["cookie"];
      if (!header)
        return;
      match = header.match(getPattern(name));
      if (!match)
        return;
      value = match[1];
      if (!opts || !signed)
        return value;
      remote = this.get(sigName);
      if (!remote)
        return;
      data = name + "=" + value;
      if (!this.keys)
        throw new Error(".keys required for signed cookies");
      index = this.keys.index(data, remote);
      if (index < 0) {
        this.set(sigName, null, { path: "/", signed: false });
      } else {
        index && this.set(sigName, this.keys.sign(data), { signed: false });
        return value;
      }
    };
    Cookies.prototype.set = function(name, value, opts) {
      var res = this.response, req = this.request, headers = res.getHeader("Set-Cookie") || [], secure = this.secure !== void 0 ? !!this.secure : req.protocol === "https" || req.connection.encrypted, cookie = new Cookie(name, value, opts), signed = opts && opts.signed !== void 0 ? opts.signed : !!this.keys;
      if (typeof headers == "string")
        headers = [headers];
      if (!secure && opts && opts.secure) {
        throw new Error("Cannot send secure cookie over unencrypted connection");
      }
      cookie.secure = opts && opts.secure !== void 0 ? opts.secure : secure;
      if (opts && "secureProxy" in opts) {
        deprecate2('"secureProxy" option; use "secure" option, provide "secure" to constructor if needed');
        cookie.secure = opts.secureProxy;
      }
      pushCookie(headers, cookie);
      if (opts && signed) {
        if (!this.keys)
          throw new Error(".keys required for signed cookies");
        cookie.value = this.keys.sign(cookie.toString());
        cookie.name += ".sig";
        pushCookie(headers, cookie);
      }
      var setHeader = res.set ? http.OutgoingMessage.prototype.setHeader : res.setHeader;
      setHeader.call(res, "Set-Cookie", headers);
      return this;
    };
    function Cookie(name, value, attrs) {
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument value is invalid");
      }
      this.name = name;
      this.value = value || "";
      for (var name in attrs) {
        this[name] = attrs[name];
      }
      if (!this.value) {
        this.expires = new Date(0);
        this.maxAge = null;
      }
      if (this.path && !fieldContentRegExp.test(this.path)) {
        throw new TypeError("option path is invalid");
      }
      if (this.domain && !fieldContentRegExp.test(this.domain)) {
        throw new TypeError("option domain is invalid");
      }
      if (this.sameSite && this.sameSite !== true && !SAME_SITE_REGEXP.test(this.sameSite)) {
        throw new TypeError("option sameSite is invalid");
      }
    }
    Cookie.prototype.path = "/";
    Cookie.prototype.expires = void 0;
    Cookie.prototype.domain = void 0;
    Cookie.prototype.httpOnly = true;
    Cookie.prototype.sameSite = false;
    Cookie.prototype.secure = false;
    Cookie.prototype.overwrite = false;
    Cookie.prototype.toString = function() {
      return this.name + "=" + this.value;
    };
    Cookie.prototype.toHeader = function() {
      var header = this.toString();
      if (this.maxAge)
        this.expires = new Date(Date.now() + this.maxAge);
      if (this.path)
        header += "; path=" + this.path;
      if (this.expires)
        header += "; expires=" + this.expires.toUTCString();
      if (this.domain)
        header += "; domain=" + this.domain;
      if (this.sameSite)
        header += "; samesite=" + (this.sameSite === true ? "strict" : this.sameSite.toLowerCase());
      if (this.secure)
        header += "; secure";
      if (this.httpOnly)
        header += "; httponly";
      return header;
    };
    Object.defineProperty(Cookie.prototype, "maxage", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.maxAge;
      },
      set: function(val) {
        return this.maxAge = val;
      }
    });
    deprecate2.property(Cookie.prototype, "maxage", '"maxage"; use "maxAge" instead');
    function getPattern(name) {
      if (cache[name])
        return cache[name];
      return cache[name] = new RegExp("(?:^|;) *" + name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)");
    }
    function pushCookie(headers, cookie) {
      if (cookie.overwrite) {
        for (var i2 = headers.length - 1; i2 >= 0; i2--) {
          if (headers[i2].indexOf(cookie.name + "=") === 0) {
            headers.splice(i2, 1);
          }
        }
      }
      headers.push(cookie.toHeader());
    }
    Cookies.connect = Cookies.express = function(keys) {
      return function(req, res, next) {
        req.cookies = res.cookies = new Cookies(req, res, {
          keys
        });
        next();
      };
    };
    Cookies.Cookie = Cookie;
    module2.exports = Cookies;
  }
});

// node_modules/koa/lib/context.js
var require_context = __commonJS({
  "node_modules/koa/lib/context.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var createError = require_http_errors();
    var httpAssert = require_http_assert();
    var delegate = require_delegates();
    var statuses = require_statuses();
    var Cookies = require_cookies();
    var COOKIES = Symbol("context#cookies");
    var proto = module2.exports = {
      inspect() {
        if (this === proto)
          return this;
        return this.toJSON();
      },
      toJSON() {
        return {
          request: this.request.toJSON(),
          response: this.response.toJSON(),
          app: this.app.toJSON(),
          originalUrl: this.originalUrl,
          req: "<original node req>",
          res: "<original node res>",
          socket: "<original node socket>"
        };
      },
      assert: httpAssert,
      throw(...args2) {
        throw createError(...args2);
      },
      onerror(err) {
        if (err == null)
          return;
        const isNativeError = Object.prototype.toString.call(err) === "[object Error]" || err instanceof Error;
        if (!isNativeError)
          err = new Error(util.format("non-error thrown: %j", err));
        let headerSent = false;
        if (this.headerSent || !this.writable) {
          headerSent = err.headerSent = true;
        }
        this.app.emit("error", err, this);
        if (headerSent) {
          return;
        }
        const { res } = this;
        if (typeof res.getHeaderNames === "function") {
          res.getHeaderNames().forEach((name) => res.removeHeader(name));
        } else {
          res._headers = {};
        }
        this.set(err.headers);
        this.type = "text";
        let statusCode = err.status || err.statusCode;
        if (err.code === "ENOENT")
          statusCode = 404;
        if (typeof statusCode !== "number" || !statuses[statusCode])
          statusCode = 500;
        const code = statuses[statusCode];
        const msg = err.expose ? err.message : code;
        this.status = err.status = statusCode;
        this.length = Buffer.byteLength(msg);
        res.end(msg);
      },
      get cookies() {
        if (!this[COOKIES]) {
          this[COOKIES] = new Cookies(this.req, this.res, {
            keys: this.app.keys,
            secure: this.request.secure
          });
        }
        return this[COOKIES];
      },
      set cookies(_cookies) {
        this[COOKIES] = _cookies;
      }
    };
    if (util.inspect.custom) {
      module2.exports[util.inspect.custom] = module2.exports.inspect;
    }
    delegate(proto, "response").method("attachment").method("redirect").method("remove").method("vary").method("has").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag").getter("headerSent").getter("writable");
    delegate(proto, "request").method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept").getter("origin").getter("href").getter("subdomains").getter("protocol").getter("host").getter("hostname").getter("URL").getter("header").getter("headers").getter("secure").getter("stale").getter("fresh").getter("ips").getter("ip");
  }
});

// node_modules/negotiator/lib/charset.js
var require_charset = __commonJS({
  "node_modules/negotiator/lib/charset.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredCharsets;
    module2.exports.preferredCharsets = preferredCharsets;
    var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
    function parseAcceptCharset(accept) {
      var accepts = accept.split(",");
      for (var i2 = 0, j2 = 0; i2 < accepts.length; i2++) {
        var charset = parseCharset(accepts[i2].trim(), i2);
        if (charset) {
          accepts[j2++] = charset;
        }
      }
      accepts.length = j2;
      return accepts;
    }
    function parseCharset(str, i2) {
      var match = simpleCharsetRegExp.exec(str);
      if (!match)
        return null;
      var charset = match[1];
      var q2 = 1;
      if (match[2]) {
        var params = match[2].split(";");
        for (var j2 = 0; j2 < params.length; j2++) {
          var p2 = params[j2].trim().split("=");
          if (p2[0] === "q") {
            q2 = parseFloat(p2[1]);
            break;
          }
        }
      }
      return {
        charset,
        q: q2,
        i: i2
      };
    }
    function getCharsetPriority(charset, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i2 = 0; i2 < accepted.length; i2++) {
        var spec = specify(charset, accepted[i2], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(charset, spec, index) {
      var s2 = 0;
      if (spec.charset.toLowerCase() === charset.toLowerCase()) {
        s2 |= 1;
      } else if (spec.charset !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s2
      };
    }
    function preferredCharsets(accept, provided) {
      var accepts = parseAcceptCharset(accept === void 0 ? "*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getCharsetPriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a2, b2) {
      return b2.q - a2.q || b2.s - a2.s || a2.o - b2.o || a2.i - b2.i || 0;
    }
    function getFullCharset(spec) {
      return spec.charset;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/negotiator/lib/encoding.js
var require_encoding = __commonJS({
  "node_modules/negotiator/lib/encoding.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredEncodings;
    module2.exports.preferredEncodings = preferredEncodings;
    var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
    function parseAcceptEncoding(accept) {
      var accepts = accept.split(",");
      var hasIdentity = false;
      var minQuality = 1;
      for (var i2 = 0, j2 = 0; i2 < accepts.length; i2++) {
        var encoding = parseEncoding(accepts[i2].trim(), i2);
        if (encoding) {
          accepts[j2++] = encoding;
          hasIdentity = hasIdentity || specify("identity", encoding);
          minQuality = Math.min(minQuality, encoding.q || 1);
        }
      }
      if (!hasIdentity) {
        accepts[j2++] = {
          encoding: "identity",
          q: minQuality,
          i: i2
        };
      }
      accepts.length = j2;
      return accepts;
    }
    function parseEncoding(str, i2) {
      var match = simpleEncodingRegExp.exec(str);
      if (!match)
        return null;
      var encoding = match[1];
      var q2 = 1;
      if (match[2]) {
        var params = match[2].split(";");
        for (var j2 = 0; j2 < params.length; j2++) {
          var p2 = params[j2].trim().split("=");
          if (p2[0] === "q") {
            q2 = parseFloat(p2[1]);
            break;
          }
        }
      }
      return {
        encoding,
        q: q2,
        i: i2
      };
    }
    function getEncodingPriority(encoding, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i2 = 0; i2 < accepted.length; i2++) {
        var spec = specify(encoding, accepted[i2], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(encoding, spec, index) {
      var s2 = 0;
      if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
        s2 |= 1;
      } else if (spec.encoding !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s2
      };
    }
    function preferredEncodings(accept, provided) {
      var accepts = parseAcceptEncoding(accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getEncodingPriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a2, b2) {
      return b2.q - a2.q || b2.s - a2.s || a2.o - b2.o || a2.i - b2.i || 0;
    }
    function getFullEncoding(spec) {
      return spec.encoding;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/negotiator/lib/language.js
var require_language = __commonJS({
  "node_modules/negotiator/lib/language.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredLanguages;
    module2.exports.preferredLanguages = preferredLanguages;
    var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
    function parseAcceptLanguage(accept) {
      var accepts = accept.split(",");
      for (var i2 = 0, j2 = 0; i2 < accepts.length; i2++) {
        var language = parseLanguage(accepts[i2].trim(), i2);
        if (language) {
          accepts[j2++] = language;
        }
      }
      accepts.length = j2;
      return accepts;
    }
    function parseLanguage(str, i2) {
      var match = simpleLanguageRegExp.exec(str);
      if (!match)
        return null;
      var prefix = match[1], suffix = match[2], full = prefix;
      if (suffix)
        full += "-" + suffix;
      var q2 = 1;
      if (match[3]) {
        var params = match[3].split(";");
        for (var j2 = 0; j2 < params.length; j2++) {
          var p2 = params[j2].split("=");
          if (p2[0] === "q")
            q2 = parseFloat(p2[1]);
        }
      }
      return {
        prefix,
        suffix,
        q: q2,
        i: i2,
        full
      };
    }
    function getLanguagePriority(language, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i2 = 0; i2 < accepted.length; i2++) {
        var spec = specify(language, accepted[i2], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(language, spec, index) {
      var p2 = parseLanguage(language);
      if (!p2)
        return null;
      var s2 = 0;
      if (spec.full.toLowerCase() === p2.full.toLowerCase()) {
        s2 |= 4;
      } else if (spec.prefix.toLowerCase() === p2.full.toLowerCase()) {
        s2 |= 2;
      } else if (spec.full.toLowerCase() === p2.prefix.toLowerCase()) {
        s2 |= 1;
      } else if (spec.full !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s2
      };
    }
    function preferredLanguages(accept, provided) {
      var accepts = parseAcceptLanguage(accept === void 0 ? "*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getLanguagePriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a2, b2) {
      return b2.q - a2.q || b2.s - a2.s || a2.o - b2.o || a2.i - b2.i || 0;
    }
    function getFullLanguage(spec) {
      return spec.full;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/negotiator/lib/mediaType.js
var require_mediaType = __commonJS({
  "node_modules/negotiator/lib/mediaType.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredMediaTypes;
    module2.exports.preferredMediaTypes = preferredMediaTypes;
    var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
    function parseAccept(accept) {
      var accepts = splitMediaTypes(accept);
      for (var i2 = 0, j2 = 0; i2 < accepts.length; i2++) {
        var mediaType = parseMediaType(accepts[i2].trim(), i2);
        if (mediaType) {
          accepts[j2++] = mediaType;
        }
      }
      accepts.length = j2;
      return accepts;
    }
    function parseMediaType(str, i2) {
      var match = simpleMediaTypeRegExp.exec(str);
      if (!match)
        return null;
      var params = Object.create(null);
      var q2 = 1;
      var subtype = match[2];
      var type = match[1];
      if (match[3]) {
        var kvps = splitParameters(match[3]).map(splitKeyValuePair);
        for (var j2 = 0; j2 < kvps.length; j2++) {
          var pair = kvps[j2];
          var key = pair[0].toLowerCase();
          var val = pair[1];
          var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.substr(1, val.length - 2) : val;
          if (key === "q") {
            q2 = parseFloat(value);
            break;
          }
          params[key] = value;
        }
      }
      return {
        type,
        subtype,
        params,
        q: q2,
        i: i2
      };
    }
    function getMediaTypePriority(type, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i2 = 0; i2 < accepted.length; i2++) {
        var spec = specify(type, accepted[i2], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(type, spec, index) {
      var p2 = parseMediaType(type);
      var s2 = 0;
      if (!p2) {
        return null;
      }
      if (spec.type.toLowerCase() == p2.type.toLowerCase()) {
        s2 |= 4;
      } else if (spec.type != "*") {
        return null;
      }
      if (spec.subtype.toLowerCase() == p2.subtype.toLowerCase()) {
        s2 |= 2;
      } else if (spec.subtype != "*") {
        return null;
      }
      var keys = Object.keys(spec.params);
      if (keys.length > 0) {
        if (keys.every(function(k2) {
          return spec.params[k2] == "*" || (spec.params[k2] || "").toLowerCase() == (p2.params[k2] || "").toLowerCase();
        })) {
          s2 |= 1;
        } else {
          return null;
        }
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s2
      };
    }
    function preferredMediaTypes(accept, provided) {
      var accepts = parseAccept(accept === void 0 ? "*/*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getMediaTypePriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a2, b2) {
      return b2.q - a2.q || b2.s - a2.s || a2.o - b2.o || a2.i - b2.i || 0;
    }
    function getFullType(spec) {
      return spec.type + "/" + spec.subtype;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
    function quoteCount(string) {
      var count = 0;
      var index = 0;
      while ((index = string.indexOf('"', index)) !== -1) {
        count++;
        index++;
      }
      return count;
    }
    function splitKeyValuePair(str) {
      var index = str.indexOf("=");
      var key;
      var val;
      if (index === -1) {
        key = str;
      } else {
        key = str.substr(0, index);
        val = str.substr(index + 1);
      }
      return [key, val];
    }
    function splitMediaTypes(accept) {
      var accepts = accept.split(",");
      for (var i2 = 1, j2 = 0; i2 < accepts.length; i2++) {
        if (quoteCount(accepts[j2]) % 2 == 0) {
          accepts[++j2] = accepts[i2];
        } else {
          accepts[j2] += "," + accepts[i2];
        }
      }
      accepts.length = j2 + 1;
      return accepts;
    }
    function splitParameters(str) {
      var parameters = str.split(";");
      for (var i2 = 1, j2 = 0; i2 < parameters.length; i2++) {
        if (quoteCount(parameters[j2]) % 2 == 0) {
          parameters[++j2] = parameters[i2];
        } else {
          parameters[j2] += ";" + parameters[i2];
        }
      }
      parameters.length = j2 + 1;
      for (var i2 = 0; i2 < parameters.length; i2++) {
        parameters[i2] = parameters[i2].trim();
      }
      return parameters;
    }
  }
});

// node_modules/negotiator/index.js
var require_negotiator = __commonJS({
  "node_modules/negotiator/index.js"(exports2, module2) {
    "use strict";
    var modules = Object.create(null);
    module2.exports = Negotiator;
    module2.exports.Negotiator = Negotiator;
    function Negotiator(request) {
      if (!(this instanceof Negotiator)) {
        return new Negotiator(request);
      }
      this.request = request;
    }
    Negotiator.prototype.charset = function charset(available) {
      var set = this.charsets(available);
      return set && set[0];
    };
    Negotiator.prototype.charsets = function charsets(available) {
      var preferredCharsets = loadModule("charset").preferredCharsets;
      return preferredCharsets(this.request.headers["accept-charset"], available);
    };
    Negotiator.prototype.encoding = function encoding(available) {
      var set = this.encodings(available);
      return set && set[0];
    };
    Negotiator.prototype.encodings = function encodings(available) {
      var preferredEncodings = loadModule("encoding").preferredEncodings;
      return preferredEncodings(this.request.headers["accept-encoding"], available);
    };
    Negotiator.prototype.language = function language(available) {
      var set = this.languages(available);
      return set && set[0];
    };
    Negotiator.prototype.languages = function languages(available) {
      var preferredLanguages = loadModule("language").preferredLanguages;
      return preferredLanguages(this.request.headers["accept-language"], available);
    };
    Negotiator.prototype.mediaType = function mediaType(available) {
      var set = this.mediaTypes(available);
      return set && set[0];
    };
    Negotiator.prototype.mediaTypes = function mediaTypes(available) {
      var preferredMediaTypes = loadModule("mediaType").preferredMediaTypes;
      return preferredMediaTypes(this.request.headers.accept, available);
    };
    Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
    Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
    Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
    Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
    Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
    Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
    Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
    Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
    function loadModule(moduleName) {
      var module3 = modules[moduleName];
      if (module3 !== void 0) {
        return module3;
      }
      switch (moduleName) {
        case "charset":
          module3 = require_charset();
          break;
        case "encoding":
          module3 = require_encoding();
          break;
        case "language":
          module3 = require_language();
          break;
        case "mediaType":
          module3 = require_mediaType();
          break;
        default:
          throw new Error("Cannot find module '" + moduleName + "'");
      }
      modules[moduleName] = module3;
      return module3;
    }
  }
});

// node_modules/accepts/index.js
var require_accepts = __commonJS({
  "node_modules/accepts/index.js"(exports2, module2) {
    "use strict";
    var Negotiator = require_negotiator();
    var mime = require_mime_types();
    module2.exports = Accepts;
    function Accepts(req) {
      if (!(this instanceof Accepts)) {
        return new Accepts(req);
      }
      this.headers = req.headers;
      this.negotiator = new Negotiator(req);
    }
    Accepts.prototype.type = Accepts.prototype.types = function(types_) {
      var types = types_;
      if (types && !Array.isArray(types)) {
        types = new Array(arguments.length);
        for (var i2 = 0; i2 < types.length; i2++) {
          types[i2] = arguments[i2];
        }
      }
      if (!types || types.length === 0) {
        return this.negotiator.mediaTypes();
      }
      if (!this.headers.accept) {
        return types[0];
      }
      var mimes = types.map(extToMime);
      var accepts = this.negotiator.mediaTypes(mimes.filter(validMime));
      var first = accepts[0];
      return first ? types[mimes.indexOf(first)] : false;
    };
    Accepts.prototype.encoding = Accepts.prototype.encodings = function(encodings_) {
      var encodings = encodings_;
      if (encodings && !Array.isArray(encodings)) {
        encodings = new Array(arguments.length);
        for (var i2 = 0; i2 < encodings.length; i2++) {
          encodings[i2] = arguments[i2];
        }
      }
      if (!encodings || encodings.length === 0) {
        return this.negotiator.encodings();
      }
      return this.negotiator.encodings(encodings)[0] || false;
    };
    Accepts.prototype.charset = Accepts.prototype.charsets = function(charsets_) {
      var charsets = charsets_;
      if (charsets && !Array.isArray(charsets)) {
        charsets = new Array(arguments.length);
        for (var i2 = 0; i2 < charsets.length; i2++) {
          charsets[i2] = arguments[i2];
        }
      }
      if (!charsets || charsets.length === 0) {
        return this.negotiator.charsets();
      }
      return this.negotiator.charsets(charsets)[0] || false;
    };
    Accepts.prototype.lang = Accepts.prototype.langs = Accepts.prototype.language = Accepts.prototype.languages = function(languages_) {
      var languages = languages_;
      if (languages && !Array.isArray(languages)) {
        languages = new Array(arguments.length);
        for (var i2 = 0; i2 < languages.length; i2++) {
          languages[i2] = arguments[i2];
        }
      }
      if (!languages || languages.length === 0) {
        return this.negotiator.languages();
      }
      return this.negotiator.languages(languages)[0] || false;
    };
    function extToMime(type) {
      return type.indexOf("/") === -1 ? mime.lookup(type) : type;
    }
    function validMime(type) {
      return typeof type === "string";
    }
  }
});

// node_modules/content-type/index.js
var require_content_type = __commonJS({
  "node_modules/content-type/index.js"(exports2) {
    "use strict";
    var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g;
    var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/;
    var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g;
    var QUOTE_REGEXP = /([\\"])/g;
    var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    exports2.format = format;
    exports2.parse = parse;
    function format(obj) {
      if (!obj || typeof obj !== "object") {
        throw new TypeError("argument obj is required");
      }
      var parameters = obj.parameters;
      var type = obj.type;
      if (!type || !TYPE_REGEXP.test(type)) {
        throw new TypeError("invalid type");
      }
      var string = type;
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i2 = 0; i2 < params.length; i2++) {
          param = params[i2];
          if (!TOKEN_REGEXP.test(param)) {
            throw new TypeError("invalid parameter name");
          }
          string += "; " + param + "=" + qstring(parameters[param]);
        }
      }
      return string;
    }
    function parse(string) {
      if (!string) {
        throw new TypeError("argument string is required");
      }
      var header = typeof string === "object" ? getcontenttype(string) : string;
      if (typeof header !== "string") {
        throw new TypeError("argument string is required to be a string");
      }
      var index = header.indexOf(";");
      var type = index !== -1 ? header.substr(0, index).trim() : header.trim();
      if (!TYPE_REGEXP.test(type)) {
        throw new TypeError("invalid media type");
      }
      var obj = new ContentType(type.toLowerCase());
      if (index !== -1) {
        var key;
        var match;
        var value;
        PARAM_REGEXP.lastIndex = index;
        while (match = PARAM_REGEXP.exec(header)) {
          if (match.index !== index) {
            throw new TypeError("invalid parameter format");
          }
          index += match[0].length;
          key = match[1].toLowerCase();
          value = match[2];
          if (value[0] === '"') {
            value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
          }
          obj.parameters[key] = value;
        }
        if (index !== header.length) {
          throw new TypeError("invalid parameter format");
        }
      }
      return obj;
    }
    function getcontenttype(obj) {
      var header;
      if (typeof obj.getHeader === "function") {
        header = obj.getHeader("content-type");
      } else if (typeof obj.headers === "object") {
        header = obj.headers && obj.headers["content-type"];
      }
      if (typeof header !== "string") {
        throw new TypeError("content-type header is missing from object");
      }
      return header;
    }
    function qstring(val) {
      var str = String(val);
      if (TOKEN_REGEXP.test(str)) {
        return str;
      }
      if (str.length > 0 && !TEXT_REGEXP.test(str)) {
        throw new TypeError("invalid parameter value");
      }
      return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
    }
    function ContentType(type) {
      this.parameters = Object.create(null);
      this.type = type;
    }
  }
});

// node_modules/parseurl/index.js
var require_parseurl = __commonJS({
  "node_modules/parseurl/index.js"(exports2, module2) {
    "use strict";
    var url = require("url");
    var parse = url.parse;
    var Url = url.Url;
    module2.exports = parseurl;
    module2.exports.original = originalurl;
    function parseurl(req) {
      var url2 = req.url;
      if (url2 === void 0) {
        return void 0;
      }
      var parsed = req._parsedUrl;
      if (fresh(url2, parsed)) {
        return parsed;
      }
      parsed = fastparse(url2);
      parsed._raw = url2;
      return req._parsedUrl = parsed;
    }
    function originalurl(req) {
      var url2 = req.originalUrl;
      if (typeof url2 !== "string") {
        return parseurl(req);
      }
      var parsed = req._parsedOriginalUrl;
      if (fresh(url2, parsed)) {
        return parsed;
      }
      parsed = fastparse(url2);
      parsed._raw = url2;
      return req._parsedOriginalUrl = parsed;
    }
    function fastparse(str) {
      if (typeof str !== "string" || str.charCodeAt(0) !== 47) {
        return parse(str);
      }
      var pathname = str;
      var query = null;
      var search = null;
      for (var i2 = 1; i2 < str.length; i2++) {
        switch (str.charCodeAt(i2)) {
          case 63:
            if (search === null) {
              pathname = str.substring(0, i2);
              query = str.substring(i2 + 1);
              search = str.substring(i2);
            }
            break;
          case 9:
          case 10:
          case 12:
          case 13:
          case 32:
          case 35:
          case 160:
          case 65279:
            return parse(str);
        }
      }
      var url2 = Url !== void 0 ? new Url() : {};
      url2.path = str;
      url2.href = str;
      url2.pathname = pathname;
      if (search !== null) {
        url2.query = query;
        url2.search = search;
      }
      return url2;
    }
    function fresh(url2, parsedUrl) {
      return typeof parsedUrl === "object" && parsedUrl !== null && (Url === void 0 || parsedUrl instanceof Url) && parsedUrl._raw === url2;
    }
  }
});

// node_modules/fresh/index.js
var require_fresh = __commonJS({
  "node_modules/fresh/index.js"(exports2, module2) {
    "use strict";
    var CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
    module2.exports = fresh;
    function fresh(reqHeaders, resHeaders) {
      var modifiedSince = reqHeaders["if-modified-since"];
      var noneMatch = reqHeaders["if-none-match"];
      if (!modifiedSince && !noneMatch) {
        return false;
      }
      var cacheControl = reqHeaders["cache-control"];
      if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {
        return false;
      }
      if (noneMatch && noneMatch !== "*") {
        var etag = resHeaders["etag"];
        if (!etag) {
          return false;
        }
        var etagStale = true;
        var matches = parseTokenList(noneMatch);
        for (var i2 = 0; i2 < matches.length; i2++) {
          var match = matches[i2];
          if (match === etag || match === "W/" + etag || "W/" + match === etag) {
            etagStale = false;
            break;
          }
        }
        if (etagStale) {
          return false;
        }
      }
      if (modifiedSince) {
        var lastModified = resHeaders["last-modified"];
        var modifiedStale = !lastModified || !(parseHttpDate(lastModified) <= parseHttpDate(modifiedSince));
        if (modifiedStale) {
          return false;
        }
      }
      return true;
    }
    function parseHttpDate(date) {
      var timestamp = date && Date.parse(date);
      return typeof timestamp === "number" ? timestamp : NaN;
    }
    function parseTokenList(str) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i2 = 0, len = str.length; i2 < len; i2++) {
        switch (str.charCodeAt(i2)) {
          case 32:
            if (start === end) {
              start = end = i2 + 1;
            }
            break;
          case 44:
            list.push(str.substring(start, end));
            start = end = i2 + 1;
            break;
          default:
            end = i2 + 1;
            break;
        }
      }
      list.push(str.substring(start, end));
      return list;
    }
  }
});

// node_modules/koa/lib/request.js
var require_request = __commonJS({
  "node_modules/koa/lib/request.js"(exports2, module2) {
    "use strict";
    var URL = require("url").URL;
    var net = require("net");
    var accepts = require_accepts();
    var contentType = require_content_type();
    var stringify = require("url").format;
    var parse = require_parseurl();
    var qs = require("querystring");
    var typeis = require_type_is();
    var fresh = require_fresh();
    var only = require_only();
    var util = require("util");
    var IP = Symbol("context#ip");
    module2.exports = {
      get header() {
        return this.req.headers;
      },
      set header(val) {
        this.req.headers = val;
      },
      get headers() {
        return this.req.headers;
      },
      set headers(val) {
        this.req.headers = val;
      },
      get url() {
        return this.req.url;
      },
      set url(val) {
        this.req.url = val;
      },
      get origin() {
        return `${this.protocol}://${this.host}`;
      },
      get href() {
        if (/^https?:\/\//i.test(this.originalUrl))
          return this.originalUrl;
        return this.origin + this.originalUrl;
      },
      get method() {
        return this.req.method;
      },
      set method(val) {
        this.req.method = val;
      },
      get path() {
        return parse(this.req).pathname;
      },
      set path(path) {
        const url = parse(this.req);
        if (url.pathname === path)
          return;
        url.pathname = path;
        url.path = null;
        this.url = stringify(url);
      },
      get query() {
        const str = this.querystring;
        const c2 = this._querycache = this._querycache || {};
        return c2[str] || (c2[str] = qs.parse(str));
      },
      set query(obj) {
        this.querystring = qs.stringify(obj);
      },
      get querystring() {
        if (!this.req)
          return "";
        return parse(this.req).query || "";
      },
      set querystring(str) {
        const url = parse(this.req);
        if (url.search === `?${str}`)
          return;
        url.search = str;
        url.path = null;
        this.url = stringify(url);
      },
      get search() {
        if (!this.querystring)
          return "";
        return `?${this.querystring}`;
      },
      set search(str) {
        this.querystring = str;
      },
      get host() {
        const proxy = this.app.proxy;
        let host = proxy && this.get("X-Forwarded-Host");
        if (!host) {
          if (this.req.httpVersionMajor >= 2)
            host = this.get(":authority");
          if (!host)
            host = this.get("Host");
        }
        if (!host)
          return "";
        return host.split(/\s*,\s*/, 1)[0];
      },
      get hostname() {
        const host = this.host;
        if (!host)
          return "";
        if (host[0] === "[")
          return this.URL.hostname || "";
        return host.split(":", 1)[0];
      },
      get URL() {
        if (!this.memoizedURL) {
          const originalUrl = this.originalUrl || "";
          try {
            this.memoizedURL = new URL(`${this.origin}${originalUrl}`);
          } catch (err) {
            this.memoizedURL = Object.create(null);
          }
        }
        return this.memoizedURL;
      },
      get fresh() {
        const method = this.method;
        const s2 = this.ctx.status;
        if (method !== "GET" && method !== "HEAD")
          return false;
        if (s2 >= 200 && s2 < 300 || s2 === 304) {
          return fresh(this.header, this.response.header);
        }
        return false;
      },
      get stale() {
        return !this.fresh;
      },
      get idempotent() {
        const methods = ["GET", "HEAD", "PUT", "DELETE", "OPTIONS", "TRACE"];
        return !!~methods.indexOf(this.method);
      },
      get socket() {
        return this.req.socket;
      },
      get charset() {
        try {
          const { parameters } = contentType.parse(this.req);
          return parameters.charset || "";
        } catch (e3) {
          return "";
        }
      },
      get length() {
        const len = this.get("Content-Length");
        if (len === "")
          return;
        return ~~len;
      },
      get protocol() {
        if (this.socket.encrypted)
          return "https";
        if (!this.app.proxy)
          return "http";
        const proto = this.get("X-Forwarded-Proto");
        return proto ? proto.split(/\s*,\s*/, 1)[0] : "http";
      },
      get secure() {
        return this.protocol === "https";
      },
      get ips() {
        const proxy = this.app.proxy;
        const val = this.get(this.app.proxyIpHeader);
        let ips = proxy && val ? val.split(/\s*,\s*/) : [];
        if (this.app.maxIpsCount > 0) {
          ips = ips.slice(-this.app.maxIpsCount);
        }
        return ips;
      },
      get ip() {
        if (!this[IP]) {
          this[IP] = this.ips[0] || this.socket.remoteAddress || "";
        }
        return this[IP];
      },
      set ip(_ip) {
        this[IP] = _ip;
      },
      get subdomains() {
        const offset = this.app.subdomainOffset;
        const hostname = this.hostname;
        if (net.isIP(hostname))
          return [];
        return hostname.split(".").reverse().slice(offset);
      },
      get accept() {
        return this._accept || (this._accept = accepts(this.req));
      },
      set accept(obj) {
        this._accept = obj;
      },
      accepts(...args2) {
        return this.accept.types(...args2);
      },
      acceptsEncodings(...args2) {
        return this.accept.encodings(...args2);
      },
      acceptsCharsets(...args2) {
        return this.accept.charsets(...args2);
      },
      acceptsLanguages(...args2) {
        return this.accept.languages(...args2);
      },
      is(type, ...types) {
        return typeis(this.req, type, ...types);
      },
      get type() {
        const type = this.get("Content-Type");
        if (!type)
          return "";
        return type.split(";")[0];
      },
      get(field) {
        const req = this.req;
        switch (field = field.toLowerCase()) {
          case "referer":
          case "referrer":
            return req.headers.referrer || req.headers.referer || "";
          default:
            return req.headers[field] || "";
        }
      },
      inspect() {
        if (!this.req)
          return;
        return this.toJSON();
      },
      toJSON() {
        return only(this, [
          "method",
          "url",
          "header"
        ]);
      }
    };
    if (util.inspect.custom) {
      module2.exports[util.inspect.custom] = module2.exports.inspect;
    }
  }
});

// node_modules/co/index.js
var require_co = __commonJS({
  "node_modules/co/index.js"(exports2, module2) {
    var slice = Array.prototype.slice;
    module2.exports = co2["default"] = co2.co = co2;
    co2.wrap = function(fn3) {
      createPromise.__generatorFunction__ = fn3;
      return createPromise;
      function createPromise() {
        return co2.call(this, fn3.apply(this, arguments));
      }
    };
    function co2(gen) {
      var ctx = this;
      var args2 = slice.call(arguments, 1);
      return new Promise(function(resolve, reject) {
        if (typeof gen === "function")
          gen = gen.apply(ctx, args2);
        if (!gen || typeof gen.next !== "function")
          return resolve(gen);
        onFulfilled();
        function onFulfilled(res) {
          var ret;
          try {
            ret = gen.next(res);
          } catch (e3) {
            return reject(e3);
          }
          next(ret);
        }
        function onRejected(err) {
          var ret;
          try {
            ret = gen.throw(err);
          } catch (e3) {
            return reject(e3);
          }
          next(ret);
        }
        function next(ret) {
          if (ret.done)
            return resolve(ret.value);
          var value = toPromise.call(ctx, ret.value);
          if (value && isPromise(value))
            return value.then(onFulfilled, onRejected);
          return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, but the following object was passed: "' + String(ret.value) + '"'));
        }
      });
    }
    function toPromise(obj) {
      if (!obj)
        return obj;
      if (isPromise(obj))
        return obj;
      if (isGeneratorFunction(obj) || isGenerator(obj))
        return co2.call(this, obj);
      if (typeof obj == "function")
        return thunkToPromise.call(this, obj);
      if (Array.isArray(obj))
        return arrayToPromise.call(this, obj);
      if (isObject(obj))
        return objectToPromise.call(this, obj);
      return obj;
    }
    function thunkToPromise(fn3) {
      var ctx = this;
      return new Promise(function(resolve, reject) {
        fn3.call(ctx, function(err, res) {
          if (err)
            return reject(err);
          if (arguments.length > 2)
            res = slice.call(arguments, 1);
          resolve(res);
        });
      });
    }
    function arrayToPromise(obj) {
      return Promise.all(obj.map(toPromise, this));
    }
    function objectToPromise(obj) {
      var results = new obj.constructor();
      var keys = Object.keys(obj);
      var promises = [];
      for (var i2 = 0; i2 < keys.length; i2++) {
        var key = keys[i2];
        var promise = toPromise.call(this, obj[key]);
        if (promise && isPromise(promise))
          defer(promise, key);
        else
          results[key] = obj[key];
      }
      return Promise.all(promises).then(function() {
        return results;
      });
      function defer(promise2, key2) {
        results[key2] = void 0;
        promises.push(promise2.then(function(res) {
          results[key2] = res;
        }));
      }
    }
    function isPromise(obj) {
      return typeof obj.then == "function";
    }
    function isGenerator(obj) {
      return typeof obj.next == "function" && typeof obj.throw == "function";
    }
    function isGeneratorFunction(obj) {
      var constructor = obj.constructor;
      if (!constructor)
        return false;
      if (constructor.name === "GeneratorFunction" || constructor.displayName === "GeneratorFunction")
        return true;
      return isGenerator(constructor.prototype);
    }
    function isObject(val) {
      return Object == val.constructor;
    }
  }
});

// node_modules/koa-convert/index.js
var require_koa_convert = __commonJS({
  "node_modules/koa-convert/index.js"(exports2, module2) {
    "use strict";
    var co2 = require_co();
    var compose = require_koa_compose();
    module2.exports = convert;
    function convert(mw) {
      if (typeof mw !== "function") {
        throw new TypeError("middleware must be a function");
      }
      if (mw.constructor.name !== "GeneratorFunction" && mw.constructor.name !== "AsyncGeneratorFunction") {
        return mw;
      }
      const converted = function(ctx, next) {
        return co2.call(ctx, mw.call(ctx, function* (next2) {
          return yield next2();
        }(next)));
      };
      converted._name = mw._name || mw.name;
      return converted;
    }
    convert.compose = function(arr) {
      if (!Array.isArray(arr)) {
        arr = Array.from(arguments);
      }
      return compose(arr.map(convert));
    };
    convert.back = function(mw) {
      if (typeof mw !== "function") {
        throw new TypeError("middleware must be a function");
      }
      if (mw.constructor.name === "GeneratorFunction" || mw.constructor.name === "AsyncGeneratorFunction") {
        return mw;
      }
      const converted = function* (next) {
        const ctx = this;
        let called = false;
        yield mw(ctx, function() {
          if (called) {
            throw new Error("next() called multiple times");
          }
          called = true;
          return co2.call(ctx, next);
        });
      };
      converted._name = mw._name || mw.name;
      return converted;
    };
  }
});

// node_modules/koa/lib/application.js
var require_application = __commonJS({
  "node_modules/koa/lib/application.js"(exports2, module2) {
    "use strict";
    var isGeneratorFunction = require_is_generator_function();
    var debug = require_src()("koa:application");
    var onFinished = require_on_finished();
    var response = require_response();
    var compose = require_koa_compose();
    var context = require_context();
    var request = require_request();
    var statuses = require_statuses();
    var Emitter = require("events");
    var util = require("util");
    var Stream = require("stream");
    var http = require("http");
    var only = require_only();
    var convert = require_koa_convert();
    var deprecate2 = require_depd2()("koa");
    var { HttpError: HttpError2 } = require_http_errors();
    module2.exports = class Application extends Emitter {
      constructor(options) {
        super();
        options = options || {};
        this.proxy = options.proxy || false;
        this.subdomainOffset = options.subdomainOffset || 2;
        this.proxyIpHeader = options.proxyIpHeader || "X-Forwarded-For";
        this.maxIpsCount = options.maxIpsCount || 0;
        this.env = options.env || process.env.NODE_ENV || "development";
        if (options.keys)
          this.keys = options.keys;
        this.middleware = [];
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        if (util.inspect.custom) {
          this[util.inspect.custom] = this.inspect;
        }
      }
      listen(...args2) {
        debug("listen");
        const server = http.createServer(this.callback());
        return server.listen(...args2);
      }
      toJSON() {
        return only(this, [
          "subdomainOffset",
          "proxy",
          "env"
        ]);
      }
      inspect() {
        return this.toJSON();
      }
      use(fn3) {
        if (typeof fn3 !== "function")
          throw new TypeError("middleware must be a function!");
        if (isGeneratorFunction(fn3)) {
          deprecate2("Support for generators will be removed in v3. See the documentation for examples of how to convert old middleware https://github.com/koajs/koa/blob/master/docs/migration.md");
          fn3 = convert(fn3);
        }
        debug("use %s", fn3._name || fn3.name || "-");
        this.middleware.push(fn3);
        return this;
      }
      callback() {
        const fn3 = compose(this.middleware);
        if (!this.listenerCount("error"))
          this.on("error", this.onerror);
        const handleRequest = (req, res) => {
          const ctx = this.createContext(req, res);
          return this.handleRequest(ctx, fn3);
        };
        return handleRequest;
      }
      handleRequest(ctx, fnMiddleware) {
        const res = ctx.res;
        res.statusCode = 404;
        const onerror = (err) => ctx.onerror(err);
        const handleResponse = () => respond(ctx);
        onFinished(res, onerror);
        return fnMiddleware(ctx).then(handleResponse).catch(onerror);
      }
      createContext(req, res) {
        const context2 = Object.create(this.context);
        const request2 = context2.request = Object.create(this.request);
        const response2 = context2.response = Object.create(this.response);
        context2.app = request2.app = response2.app = this;
        context2.req = request2.req = response2.req = req;
        context2.res = request2.res = response2.res = res;
        request2.ctx = response2.ctx = context2;
        request2.response = response2;
        response2.request = request2;
        context2.originalUrl = request2.originalUrl = req.url;
        context2.state = {};
        return context2;
      }
      onerror(err) {
        const isNativeError = Object.prototype.toString.call(err) === "[object Error]" || err instanceof Error;
        if (!isNativeError)
          throw new TypeError(util.format("non-error thrown: %j", err));
        if (err.status === 404 || err.expose)
          return;
        if (this.silent)
          return;
        const msg = err.stack || err.toString();
        console.error(`
${msg.replace(/^/gm, "  ")}
`);
      }
      static get default() {
        return Application;
      }
    };
    function respond(ctx) {
      if (ctx.respond === false)
        return;
      if (!ctx.writable)
        return;
      const res = ctx.res;
      let body = ctx.body;
      const code = ctx.status;
      if (statuses.empty[code]) {
        ctx.body = null;
        return res.end();
      }
      if (ctx.method === "HEAD") {
        if (!res.headersSent && !ctx.response.has("Content-Length")) {
          const { length } = ctx.response;
          if (Number.isInteger(length))
            ctx.length = length;
        }
        return res.end();
      }
      if (body == null) {
        if (ctx.response._explicitNullBody) {
          ctx.response.remove("Content-Type");
          ctx.response.remove("Transfer-Encoding");
          return res.end();
        }
        if (ctx.req.httpVersionMajor >= 2) {
          body = String(code);
        } else {
          body = ctx.message || String(code);
        }
        if (!res.headersSent) {
          ctx.type = "text";
          ctx.length = Buffer.byteLength(body);
        }
        return res.end(body);
      }
      if (Buffer.isBuffer(body))
        return res.end(body);
      if (typeof body === "string")
        return res.end(body);
      if (body instanceof Stream)
        return body.pipe(res);
      body = JSON.stringify(body);
      if (!res.headersSent) {
        ctx.length = Buffer.byteLength(body);
      }
      res.end(body);
    }
    module2.exports.HttpError = HttpError2;
  }
});

// node_modules/methods/index.js
var require_methods = __commonJS({
  "node_modules/methods/index.js"(exports2, module2) {
    "use strict";
    var http = require("http");
    module2.exports = getCurrentNodeMethods() || getBasicNodeMethods();
    function getCurrentNodeMethods() {
      return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
        return method.toLowerCase();
      });
    }
    function getBasicNodeMethods() {
      return [
        "get",
        "post",
        "put",
        "head",
        "delete",
        "options",
        "trace",
        "copy",
        "lock",
        "mkcol",
        "move",
        "purge",
        "propfind",
        "proppatch",
        "unlock",
        "report",
        "mkactivity",
        "checkout",
        "merge",
        "m-search",
        "notify",
        "subscribe",
        "unsubscribe",
        "patch",
        "search",
        "connect"
      ];
    }
  }
});

// node_modules/path-to-regexp/dist/index.js
var require_dist = __commonJS({
  "node_modules/path-to-regexp/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pathToRegexp = exports2.tokensToRegexp = exports2.regexpToFunction = exports2.match = exports2.tokensToFunction = exports2.compile = exports2.parse = void 0;
    function lexer(str) {
      var tokens = [];
      var i2 = 0;
      while (i2 < str.length) {
        var char = str[i2];
        if (char === "*" || char === "+" || char === "?") {
          tokens.push({ type: "MODIFIER", index: i2, value: str[i2++] });
          continue;
        }
        if (char === "\\") {
          tokens.push({ type: "ESCAPED_CHAR", index: i2++, value: str[i2++] });
          continue;
        }
        if (char === "{") {
          tokens.push({ type: "OPEN", index: i2, value: str[i2++] });
          continue;
        }
        if (char === "}") {
          tokens.push({ type: "CLOSE", index: i2, value: str[i2++] });
          continue;
        }
        if (char === ":") {
          var name = "";
          var j2 = i2 + 1;
          while (j2 < str.length) {
            var code = str.charCodeAt(j2);
            if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
              name += str[j2++];
              continue;
            }
            break;
          }
          if (!name)
            throw new TypeError("Missing parameter name at " + i2);
          tokens.push({ type: "NAME", index: i2, value: name });
          i2 = j2;
          continue;
        }
        if (char === "(") {
          var count = 1;
          var pattern = "";
          var j2 = i2 + 1;
          if (str[j2] === "?") {
            throw new TypeError('Pattern cannot start with "?" at ' + j2);
          }
          while (j2 < str.length) {
            if (str[j2] === "\\") {
              pattern += str[j2++] + str[j2++];
              continue;
            }
            if (str[j2] === ")") {
              count--;
              if (count === 0) {
                j2++;
                break;
              }
            } else if (str[j2] === "(") {
              count++;
              if (str[j2 + 1] !== "?") {
                throw new TypeError("Capturing groups are not allowed at " + j2);
              }
            }
            pattern += str[j2++];
          }
          if (count)
            throw new TypeError("Unbalanced pattern at " + i2);
          if (!pattern)
            throw new TypeError("Missing pattern at " + i2);
          tokens.push({ type: "PATTERN", index: i2, value: pattern });
          i2 = j2;
          continue;
        }
        tokens.push({ type: "CHAR", index: i2, value: str[i2++] });
      }
      tokens.push({ type: "END", index: i2, value: "" });
      return tokens;
    }
    function parse(str, options) {
      if (options === void 0) {
        options = {};
      }
      var tokens = lexer(str);
      var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2;
      var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
      var result = [];
      var key = 0;
      var i2 = 0;
      var path = "";
      var tryConsume = function(type) {
        if (i2 < tokens.length && tokens[i2].type === type)
          return tokens[i2++].value;
      };
      var mustConsume = function(type) {
        var value2 = tryConsume(type);
        if (value2 !== void 0)
          return value2;
        var _a3 = tokens[i2], nextType = _a3.type, index = _a3.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
      };
      var consumeText = function() {
        var result2 = "";
        var value2;
        while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
          result2 += value2;
        }
        return result2;
      };
      while (i2 < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
          var prefix = char || "";
          if (prefixes.indexOf(prefix) === -1) {
            path += prefix;
            prefix = "";
          }
          if (path) {
            result.push(path);
            path = "";
          }
          result.push({
            name: name || key++,
            prefix,
            suffix: "",
            pattern: pattern || defaultPattern,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
          path += value;
          continue;
        }
        if (path) {
          result.push(path);
          path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
          var prefix = consumeText();
          var name_1 = tryConsume("NAME") || "";
          var pattern_1 = tryConsume("PATTERN") || "";
          var suffix = consumeText();
          mustConsume("CLOSE");
          result.push({
            name: name_1 || (pattern_1 ? key++ : ""),
            pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
            prefix,
            suffix,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        mustConsume("END");
      }
      return result;
    }
    exports2.parse = parse;
    function compile(str, options) {
      return tokensToFunction(parse(str, options), options);
    }
    exports2.compile = compile;
    function tokensToFunction(tokens, options) {
      if (options === void 0) {
        options = {};
      }
      var reFlags = flags(options);
      var _a2 = options.encode, encode = _a2 === void 0 ? function(x2) {
        return x2;
      } : _a2, _b = options.validate, validate = _b === void 0 ? true : _b;
      var matches = tokens.map(function(token) {
        if (typeof token === "object") {
          return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
      });
      return function(data) {
        var path = "";
        for (var i2 = 0; i2 < tokens.length; i2++) {
          var token = tokens[i2];
          if (typeof token === "string") {
            path += token;
            continue;
          }
          var value = data ? data[token.name] : void 0;
          var optional = token.modifier === "?" || token.modifier === "*";
          var repeat = token.modifier === "*" || token.modifier === "+";
          if (Array.isArray(value)) {
            if (!repeat) {
              throw new TypeError('Expected "' + token.name + '" to not repeat, but got an array');
            }
            if (value.length === 0) {
              if (optional)
                continue;
              throw new TypeError('Expected "' + token.name + '" to not be empty');
            }
            for (var j2 = 0; j2 < value.length; j2++) {
              var segment = encode(value[j2], token);
              if (validate && !matches[i2].test(segment)) {
                throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
              }
              path += token.prefix + segment + token.suffix;
            }
            continue;
          }
          if (typeof value === "string" || typeof value === "number") {
            var segment = encode(String(value), token);
            if (validate && !matches[i2].test(segment)) {
              throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
            }
            path += token.prefix + segment + token.suffix;
            continue;
          }
          if (optional)
            continue;
          var typeOfMessage = repeat ? "an array" : "a string";
          throw new TypeError('Expected "' + token.name + '" to be ' + typeOfMessage);
        }
        return path;
      };
    }
    exports2.tokensToFunction = tokensToFunction;
    function match(str, options) {
      var keys = [];
      var re2 = pathToRegexp(str, keys, options);
      return regexpToFunction(re2, keys, options);
    }
    exports2.match = match;
    function regexpToFunction(re2, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.decode, decode = _a2 === void 0 ? function(x2) {
        return x2;
      } : _a2;
      return function(pathname) {
        var m2 = re2.exec(pathname);
        if (!m2)
          return false;
        var path = m2[0], index = m2.index;
        var params = Object.create(null);
        var _loop_1 = function(i3) {
          if (m2[i3] === void 0)
            return "continue";
          var key = keys[i3 - 1];
          if (key.modifier === "*" || key.modifier === "+") {
            params[key.name] = m2[i3].split(key.prefix + key.suffix).map(function(value) {
              return decode(value, key);
            });
          } else {
            params[key.name] = decode(m2[i3], key);
          }
        };
        for (var i2 = 1; i2 < m2.length; i2++) {
          _loop_1(i2);
        }
        return { path, index, params };
      };
    }
    exports2.regexpToFunction = regexpToFunction;
    function escapeString(str) {
      return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    function flags(options) {
      return options && options.sensitive ? "" : "i";
    }
    function regexpToRegexp(path, keys) {
      if (!keys)
        return path;
      var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
      var index = 0;
      var execResult = groupsRegex.exec(path.source);
      while (execResult) {
        keys.push({
          name: execResult[1] || index++,
          prefix: "",
          suffix: "",
          modifier: "",
          pattern: ""
        });
        execResult = groupsRegex.exec(path.source);
      }
      return path;
    }
    function arrayToRegexp(paths, keys, options) {
      var parts = paths.map(function(path) {
        return pathToRegexp(path, keys, options).source;
      });
      return new RegExp("(?:" + parts.join("|") + ")", flags(options));
    }
    function stringToRegexp(path, keys, options) {
      return tokensToRegexp(parse(path, options), keys, options);
    }
    function tokensToRegexp(tokens, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.strict, strict = _a2 === void 0 ? false : _a2, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x2) {
        return x2;
      } : _d;
      var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
      var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
      var route = start ? "^" : "";
      for (var _i2 = 0, tokens_1 = tokens; _i2 < tokens_1.length; _i2++) {
        var token = tokens_1[_i2];
        if (typeof token === "string") {
          route += escapeString(encode(token));
        } else {
          var prefix = escapeString(encode(token.prefix));
          var suffix = escapeString(encode(token.suffix));
          if (token.pattern) {
            if (keys)
              keys.push(token);
            if (prefix || suffix) {
              if (token.modifier === "+" || token.modifier === "*") {
                var mod2 = token.modifier === "*" ? "?" : "";
                route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod2;
              } else {
                route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
              }
            } else {
              route += "(" + token.pattern + ")" + token.modifier;
            }
          } else {
            route += "(?:" + prefix + suffix + ")" + token.modifier;
          }
        }
      }
      if (end) {
        if (!strict)
          route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
      } else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
        if (!strict) {
          route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
          route += "(?=" + delimiter + "|" + endsWith + ")";
        }
      }
      return new RegExp(route, flags(options));
    }
    exports2.tokensToRegexp = tokensToRegexp;
    function pathToRegexp(path, keys, options) {
      if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
      if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
      return stringToRegexp(path, keys, options);
    }
    exports2.pathToRegexp = pathToRegexp;
  }
});

// node_modules/koa-router/lib/layer.js
var require_layer = __commonJS({
  "node_modules/koa-router/lib/layer.js"(exports2, module2) {
    var { pathToRegexp, compile, parse } = require_dist();
    var { parse: parseUrl, format: formatUrl } = require("url");
    module2.exports = Layer;
    function Layer(path, methods, middleware, opts) {
      this.opts = opts || {};
      this.name = this.opts.name || null;
      this.methods = [];
      this.paramNames = [];
      this.stack = Array.isArray(middleware) ? middleware : [middleware];
      for (let i2 = 0; i2 < methods.length; i2++) {
        const l2 = this.methods.push(methods[i2].toUpperCase());
        if (this.methods[l2 - 1] === "GET")
          this.methods.unshift("HEAD");
      }
      for (let i2 = 0; i2 < this.stack.length; i2++) {
        const fn3 = this.stack[i2];
        const type = typeof fn3;
        if (type !== "function")
          throw new Error(`${methods.toString()} \`${this.opts.name || path}\`: \`middleware\` must be a function, not \`${type}\``);
      }
      this.path = path;
      this.regexp = pathToRegexp(path, this.paramNames, this.opts);
    }
    Layer.prototype.match = function(path) {
      return this.regexp.test(path);
    };
    Layer.prototype.params = function(path, captures, existingParams) {
      const params = existingParams || {};
      for (let len = captures.length, i2 = 0; i2 < len; i2++) {
        if (this.paramNames[i2]) {
          const c2 = captures[i2];
          if (c2 && c2.length !== 0)
            params[this.paramNames[i2].name] = c2 ? safeDecodeURIComponent(c2) : c2;
        }
      }
      return params;
    };
    Layer.prototype.captures = function(path) {
      return this.opts.ignoreCaptures ? [] : path.match(this.regexp).slice(1);
    };
    Layer.prototype.url = function(params, options) {
      let args2 = params;
      const url = this.path.replace(/\(\.\*\)/g, "");
      if (typeof params != "object") {
        args2 = Array.prototype.slice.call(arguments);
        if (typeof args2[args2.length - 1] == "object") {
          options = args2[args2.length - 1];
          args2 = args2.slice(0, args2.length - 1);
        }
      }
      const toPath = compile(url, options);
      let replaced;
      const tokens = parse(url);
      let replace = {};
      if (args2 instanceof Array) {
        for (let len = tokens.length, i2 = 0, j2 = 0; i2 < len; i2++) {
          if (tokens[i2].name)
            replace[tokens[i2].name] = args2[j2++];
        }
      } else if (tokens.some((token) => token.name)) {
        replace = params;
      } else if (!options) {
        options = params;
      }
      replaced = toPath(replace);
      if (options && options.query) {
        replaced = parseUrl(replaced);
        if (typeof options.query === "string") {
          replaced.search = options.query;
        } else {
          replaced.search = void 0;
          replaced.query = options.query;
        }
        return formatUrl(replaced);
      }
      return replaced;
    };
    Layer.prototype.param = function(param, fn3) {
      const stack2 = this.stack;
      const params = this.paramNames;
      const middleware = function(ctx, next) {
        return fn3.call(this, ctx.params[param], ctx, next);
      };
      middleware.param = param;
      const names = params.map(function(p2) {
        return p2.name;
      });
      const x2 = names.indexOf(param);
      if (x2 > -1) {
        stack2.some(function(fn4, i2) {
          if (!fn4.param || names.indexOf(fn4.param) > x2) {
            stack2.splice(i2, 0, middleware);
            return true;
          }
        });
      }
      return this;
    };
    Layer.prototype.setPrefix = function(prefix) {
      if (this.path) {
        this.path = this.path !== "/" || this.opts.strict === true ? `${prefix}${this.path}` : prefix;
        this.paramNames = [];
        this.regexp = pathToRegexp(this.path, this.paramNames, this.opts);
      }
      return this;
    };
    function safeDecodeURIComponent(text) {
      try {
        return decodeURIComponent(text);
      } catch (e3) {
        return text;
      }
    }
  }
});

// node_modules/koa-router/lib/router.js
var require_router = __commonJS({
  "node_modules/koa-router/lib/router.js"(exports2, module2) {
    var debug = require_src()("koa-router");
    var compose = require_koa_compose();
    var HttpError2 = require_http_errors();
    var methods = require_methods();
    var Layer = require_layer();
    var { pathToRegexp } = require_dist();
    module2.exports = Router;
    function Router(opts) {
      if (!(this instanceof Router))
        return new Router(opts);
      this.opts = opts || {};
      this.methods = this.opts.methods || [
        "HEAD",
        "OPTIONS",
        "GET",
        "PUT",
        "PATCH",
        "POST",
        "DELETE"
      ];
      this.params = {};
      this.stack = [];
    }
    for (let i2 = 0; i2 < methods.length; i2++) {
      let setMethodVerb2 = function(method) {
        Router.prototype[method] = function(name, path, middleware) {
          if (typeof path === "string" || path instanceof RegExp) {
            middleware = Array.prototype.slice.call(arguments, 2);
          } else {
            middleware = Array.prototype.slice.call(arguments, 1);
            path = name;
            name = null;
          }
          this.register(path, [method], middleware, {
            name
          });
          return this;
        };
      };
      setMethodVerb = setMethodVerb2;
      setMethodVerb2(methods[i2]);
    }
    var setMethodVerb;
    Router.prototype.del = Router.prototype["delete"];
    Router.prototype.use = function() {
      const router2 = this;
      const middleware = Array.prototype.slice.call(arguments);
      let path;
      if (Array.isArray(middleware[0]) && typeof middleware[0][0] === "string") {
        let arrPaths = middleware[0];
        for (let i2 = 0; i2 < arrPaths.length; i2++) {
          const p2 = arrPaths[i2];
          router2.use.apply(router2, [p2].concat(middleware.slice(1)));
        }
        return this;
      }
      const hasPath = typeof middleware[0] === "string";
      if (hasPath)
        path = middleware.shift();
      for (let i2 = 0; i2 < middleware.length; i2++) {
        const m2 = middleware[i2];
        if (m2.router) {
          const cloneRouter = Object.assign(Object.create(Router.prototype), m2.router, {
            stack: m2.router.stack.slice(0)
          });
          for (let j2 = 0; j2 < cloneRouter.stack.length; j2++) {
            const nestedLayer = cloneRouter.stack[j2];
            const cloneLayer = Object.assign(Object.create(Layer.prototype), nestedLayer);
            if (path)
              cloneLayer.setPrefix(path);
            if (router2.opts.prefix)
              cloneLayer.setPrefix(router2.opts.prefix);
            router2.stack.push(cloneLayer);
            cloneRouter.stack[j2] = cloneLayer;
          }
          if (router2.params) {
            let setRouterParams2 = function(paramArr) {
              const routerParams = paramArr;
              for (let j2 = 0; j2 < routerParams.length; j2++) {
                const key = routerParams[j2];
                cloneRouter.param(key, router2.params[key]);
              }
            };
            var setRouterParams = setRouterParams2;
            setRouterParams2(Object.keys(router2.params));
          }
        } else {
          const keys = [];
          pathToRegexp(router2.opts.prefix || "", keys);
          const routerPrefixHasParam = router2.opts.prefix && keys.length;
          router2.register(path || "([^/]*)", [], m2, { end: false, ignoreCaptures: !hasPath && !routerPrefixHasParam });
        }
      }
      return this;
    };
    Router.prototype.prefix = function(prefix) {
      prefix = prefix.replace(/\/$/, "");
      this.opts.prefix = prefix;
      for (let i2 = 0; i2 < this.stack.length; i2++) {
        const route = this.stack[i2];
        route.setPrefix(prefix);
      }
      return this;
    };
    Router.prototype.routes = Router.prototype.middleware = function() {
      const router2 = this;
      let dispatch = function dispatch2(ctx, next) {
        debug("%s %s", ctx.method, ctx.path);
        const path = router2.opts.routerPath || ctx.routerPath || ctx.path;
        const matched = router2.match(path, ctx.method);
        let layerChain;
        if (ctx.matched) {
          ctx.matched.push.apply(ctx.matched, matched.path);
        } else {
          ctx.matched = matched.path;
        }
        ctx.router = router2;
        if (!matched.route)
          return next();
        const matchedLayers = matched.pathAndMethod;
        const mostSpecificLayer = matchedLayers[matchedLayers.length - 1];
        ctx._matchedRoute = mostSpecificLayer.path;
        if (mostSpecificLayer.name) {
          ctx._matchedRouteName = mostSpecificLayer.name;
        }
        layerChain = matchedLayers.reduce(function(memo, layer) {
          memo.push(function(ctx2, next2) {
            ctx2.captures = layer.captures(path, ctx2.captures);
            ctx2.params = ctx2.request.params = layer.params(path, ctx2.captures, ctx2.params);
            ctx2.routerPath = layer.path;
            ctx2.routerName = layer.name;
            ctx2._matchedRoute = layer.path;
            if (layer.name) {
              ctx2._matchedRouteName = layer.name;
            }
            return next2();
          });
          return memo.concat(layer.stack);
        }, []);
        return compose(layerChain)(ctx, next);
      };
      dispatch.router = this;
      return dispatch;
    };
    Router.prototype.allowedMethods = function(options) {
      options = options || {};
      const implemented = this.methods;
      return function allowedMethods(ctx, next) {
        return next().then(function() {
          const allowed = {};
          if (!ctx.status || ctx.status === 404) {
            for (let i2 = 0; i2 < ctx.matched.length; i2++) {
              const route = ctx.matched[i2];
              for (let j2 = 0; j2 < route.methods.length; j2++) {
                const method = route.methods[j2];
                allowed[method] = method;
              }
            }
            const allowedArr = Object.keys(allowed);
            if (!~implemented.indexOf(ctx.method)) {
              if (options.throw) {
                let notImplementedThrowable = typeof options.notImplemented === "function" ? options.notImplemented() : new HttpError2.NotImplemented();
                throw notImplementedThrowable;
              } else {
                ctx.status = 501;
                ctx.set("Allow", allowedArr.join(", "));
              }
            } else if (allowedArr.length) {
              if (ctx.method === "OPTIONS") {
                ctx.status = 200;
                ctx.body = "";
                ctx.set("Allow", allowedArr.join(", "));
              } else if (!allowed[ctx.method]) {
                if (options.throw) {
                  let notAllowedThrowable = typeof options.methodNotAllowed === "function" ? options.methodNotAllowed() : new HttpError2.MethodNotAllowed();
                  throw notAllowedThrowable;
                } else {
                  ctx.status = 405;
                  ctx.set("Allow", allowedArr.join(", "));
                }
              }
            }
          }
        });
      };
    };
    Router.prototype.all = function(name, path, middleware) {
      if (typeof path === "string") {
        middleware = Array.prototype.slice.call(arguments, 2);
      } else {
        middleware = Array.prototype.slice.call(arguments, 1);
        path = name;
        name = null;
      }
      this.register(path, methods, middleware, { name });
      return this;
    };
    Router.prototype.redirect = function(source, destination, code) {
      if (source[0] !== "/")
        source = this.url(source);
      if (destination[0] !== "/" && !destination.includes("://"))
        destination = this.url(destination);
      return this.all(source, (ctx) => {
        ctx.redirect(destination);
        ctx.status = code || 301;
      });
    };
    Router.prototype.register = function(path, methods2, middleware, opts) {
      opts = opts || {};
      const router2 = this;
      const stack2 = this.stack;
      if (Array.isArray(path)) {
        for (let i2 = 0; i2 < path.length; i2++) {
          const curPath = path[i2];
          router2.register.call(router2, curPath, methods2, middleware, opts);
        }
        return this;
      }
      const route = new Layer(path, methods2, middleware, {
        end: opts.end === false ? opts.end : true,
        name: opts.name,
        sensitive: opts.sensitive || this.opts.sensitive || false,
        strict: opts.strict || this.opts.strict || false,
        prefix: opts.prefix || this.opts.prefix || "",
        ignoreCaptures: opts.ignoreCaptures
      });
      if (this.opts.prefix) {
        route.setPrefix(this.opts.prefix);
      }
      for (let i2 = 0; i2 < Object.keys(this.params).length; i2++) {
        const param = Object.keys(this.params)[i2];
        route.param(param, this.params[param]);
      }
      stack2.push(route);
      debug("defined route %s %s", route.methods, route.path);
      return route;
    };
    Router.prototype.route = function(name) {
      const routes = this.stack;
      for (let len = routes.length, i2 = 0; i2 < len; i2++) {
        if (routes[i2].name && routes[i2].name === name)
          return routes[i2];
      }
      return false;
    };
    Router.prototype.url = function(name, params) {
      const route = this.route(name);
      if (route) {
        const args2 = Array.prototype.slice.call(arguments, 1);
        return route.url.apply(route, args2);
      }
      return new Error(`No route found for name: ${name}`);
    };
    Router.prototype.match = function(path, method) {
      const layers = this.stack;
      let layer;
      const matched = {
        path: [],
        pathAndMethod: [],
        route: false
      };
      for (let len = layers.length, i2 = 0; i2 < len; i2++) {
        layer = layers[i2];
        debug("test %s %s", layer.path, layer.regexp);
        if (layer.match(path)) {
          matched.path.push(layer);
          if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
            matched.pathAndMethod.push(layer);
            if (layer.methods.length)
              matched.route = true;
          }
        }
      }
      return matched;
    };
    Router.prototype.param = function(param, middleware) {
      this.params[param] = middleware;
      for (let i2 = 0; i2 < this.stack.length; i2++) {
        const route = this.stack[i2];
        route.param(param, middleware);
      }
      return this;
    };
    Router.url = function(path) {
      const args2 = Array.prototype.slice.call(arguments, 1);
      return Layer.prototype.url.apply({ path }, args2);
    };
  }
});

// node_modules/xml2js/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/xml2js/lib/defaults.js"(exports2) {
    (function() {
      exports2.defaults = {
        "0.1": {
          explicitCharkey: false,
          trim: true,
          normalize: true,
          normalizeTags: false,
          attrkey: "@",
          charkey: "#",
          explicitArray: false,
          ignoreAttrs: false,
          mergeAttrs: false,
          explicitRoot: false,
          validator: null,
          xmlns: false,
          explicitChildren: false,
          childkey: "@@",
          charsAsChildren: false,
          includeWhiteChars: false,
          async: false,
          strict: true,
          attrNameProcessors: null,
          attrValueProcessors: null,
          tagNameProcessors: null,
          valueProcessors: null,
          emptyTag: ""
        },
        "0.2": {
          explicitCharkey: false,
          trim: false,
          normalize: false,
          normalizeTags: false,
          attrkey: "$",
          charkey: "_",
          explicitArray: true,
          ignoreAttrs: false,
          mergeAttrs: false,
          explicitRoot: true,
          validator: null,
          xmlns: false,
          explicitChildren: false,
          preserveChildrenOrder: false,
          childkey: "$$",
          charsAsChildren: false,
          includeWhiteChars: false,
          async: false,
          strict: true,
          attrNameProcessors: null,
          attrValueProcessors: null,
          tagNameProcessors: null,
          valueProcessors: null,
          rootName: "root",
          xmldec: {
            "version": "1.0",
            "encoding": "UTF-8",
            "standalone": true
          },
          doctype: null,
          renderOpts: {
            "pretty": true,
            "indent": "  ",
            "newline": "\n"
          },
          headless: false,
          chunkSize: 1e4,
          emptyTag: "",
          cdata: false
        }
      };
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/Utility.js
var require_Utility = __commonJS({
  "node_modules/xmlbuilder/lib/Utility.js"(exports2, module2) {
    (function() {
      var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject, slice = [].slice, hasProp = {}.hasOwnProperty;
      assign = function() {
        var i2, key, len, source, sources, target;
        target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        if (isFunction(Object.assign)) {
          Object.assign.apply(null, arguments);
        } else {
          for (i2 = 0, len = sources.length; i2 < len; i2++) {
            source = sources[i2];
            if (source != null) {
              for (key in source) {
                if (!hasProp.call(source, key))
                  continue;
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
      isFunction = function(val) {
        return !!val && Object.prototype.toString.call(val) === "[object Function]";
      };
      isObject = function(val) {
        var ref;
        return !!val && ((ref = typeof val) === "function" || ref === "object");
      };
      isArray = function(val) {
        if (isFunction(Array.isArray)) {
          return Array.isArray(val);
        } else {
          return Object.prototype.toString.call(val) === "[object Array]";
        }
      };
      isEmpty = function(val) {
        var key;
        if (isArray(val)) {
          return !val.length;
        } else {
          for (key in val) {
            if (!hasProp.call(val, key))
              continue;
            return false;
          }
          return true;
        }
      };
      isPlainObject = function(val) {
        var ctor, proto;
        return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === "function" && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
      };
      getValue = function(obj) {
        if (isFunction(obj.valueOf)) {
          return obj.valueOf();
        } else {
          return obj;
        }
      };
      module2.exports.assign = assign;
      module2.exports.isFunction = isFunction;
      module2.exports.isObject = isObject;
      module2.exports.isArray = isArray;
      module2.exports.isEmpty = isEmpty;
      module2.exports.isPlainObject = isPlainObject;
      module2.exports.getValue = getValue;
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDOMImplementation.js
var require_XMLDOMImplementation = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDOMImplementation.js"(exports2, module2) {
    (function() {
      var XMLDOMImplementation;
      module2.exports = XMLDOMImplementation = function() {
        function XMLDOMImplementation2() {
        }
        XMLDOMImplementation2.prototype.hasFeature = function(feature, version) {
          return true;
        };
        XMLDOMImplementation2.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLDOMImplementation2.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLDOMImplementation2.prototype.createHTMLDocument = function(title) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLDOMImplementation2.prototype.getFeature = function(feature, version) {
          throw new Error("This DOM method is not implemented.");
        };
        return XMLDOMImplementation2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js
var require_XMLDOMErrorHandler = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js"(exports2, module2) {
    (function() {
      var XMLDOMErrorHandler;
      module2.exports = XMLDOMErrorHandler = function() {
        function XMLDOMErrorHandler2() {
        }
        XMLDOMErrorHandler2.prototype.handleError = function(error) {
          throw new Error(error);
        };
        return XMLDOMErrorHandler2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDOMStringList.js
var require_XMLDOMStringList = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDOMStringList.js"(exports2, module2) {
    (function() {
      var XMLDOMStringList;
      module2.exports = XMLDOMStringList = function() {
        function XMLDOMStringList2(arr) {
          this.arr = arr || [];
        }
        Object.defineProperty(XMLDOMStringList2.prototype, "length", {
          get: function() {
            return this.arr.length;
          }
        });
        XMLDOMStringList2.prototype.item = function(index) {
          return this.arr[index] || null;
        };
        XMLDOMStringList2.prototype.contains = function(str) {
          return this.arr.indexOf(str) !== -1;
        };
        return XMLDOMStringList2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDOMConfiguration.js
var require_XMLDOMConfiguration = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDOMConfiguration.js"(exports2, module2) {
    (function() {
      var XMLDOMConfiguration, XMLDOMErrorHandler, XMLDOMStringList;
      XMLDOMErrorHandler = require_XMLDOMErrorHandler();
      XMLDOMStringList = require_XMLDOMStringList();
      module2.exports = XMLDOMConfiguration = function() {
        function XMLDOMConfiguration2() {
          var clonedSelf;
          this.defaultParams = {
            "canonical-form": false,
            "cdata-sections": false,
            "comments": false,
            "datatype-normalization": false,
            "element-content-whitespace": true,
            "entities": true,
            "error-handler": new XMLDOMErrorHandler(),
            "infoset": true,
            "validate-if-schema": false,
            "namespaces": true,
            "namespace-declarations": true,
            "normalize-characters": false,
            "schema-location": "",
            "schema-type": "",
            "split-cdata-sections": true,
            "validate": false,
            "well-formed": true
          };
          this.params = clonedSelf = Object.create(this.defaultParams);
        }
        Object.defineProperty(XMLDOMConfiguration2.prototype, "parameterNames", {
          get: function() {
            return new XMLDOMStringList(Object.keys(this.defaultParams));
          }
        });
        XMLDOMConfiguration2.prototype.getParameter = function(name) {
          if (this.params.hasOwnProperty(name)) {
            return this.params[name];
          } else {
            return null;
          }
        };
        XMLDOMConfiguration2.prototype.canSetParameter = function(name, value) {
          return true;
        };
        XMLDOMConfiguration2.prototype.setParameter = function(name, value) {
          if (value != null) {
            return this.params[name] = value;
          } else {
            return delete this.params[name];
          }
        };
        return XMLDOMConfiguration2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/NodeType.js
var require_NodeType = __commonJS({
  "node_modules/xmlbuilder/lib/NodeType.js"(exports2, module2) {
    (function() {
      module2.exports = {
        Element: 1,
        Attribute: 2,
        Text: 3,
        CData: 4,
        EntityReference: 5,
        EntityDeclaration: 6,
        ProcessingInstruction: 7,
        Comment: 8,
        Document: 9,
        DocType: 10,
        DocumentFragment: 11,
        NotationDeclaration: 12,
        Declaration: 201,
        Raw: 202,
        AttributeDeclaration: 203,
        ElementDeclaration: 204,
        Dummy: 205
      };
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLAttribute.js
var require_XMLAttribute = __commonJS({
  "node_modules/xmlbuilder/lib/XMLAttribute.js"(exports2, module2) {
    (function() {
      var NodeType, XMLAttribute, XMLNode;
      NodeType = require_NodeType();
      XMLNode = require_XMLNode();
      module2.exports = XMLAttribute = function() {
        function XMLAttribute2(parent, name, value) {
          this.parent = parent;
          if (this.parent) {
            this.options = this.parent.options;
            this.stringify = this.parent.stringify;
          }
          if (name == null) {
            throw new Error("Missing attribute name. " + this.debugInfo(name));
          }
          this.name = this.stringify.name(name);
          this.value = this.stringify.attValue(value);
          this.type = NodeType.Attribute;
          this.isId = false;
          this.schemaTypeInfo = null;
        }
        Object.defineProperty(XMLAttribute2.prototype, "nodeType", {
          get: function() {
            return this.type;
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "ownerElement", {
          get: function() {
            return this.parent;
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "textContent", {
          get: function() {
            return this.value;
          },
          set: function(value) {
            return this.value = value || "";
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "namespaceURI", {
          get: function() {
            return "";
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "prefix", {
          get: function() {
            return "";
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "localName", {
          get: function() {
            return this.name;
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "specified", {
          get: function() {
            return true;
          }
        });
        XMLAttribute2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLAttribute2.prototype.toString = function(options) {
          return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
        };
        XMLAttribute2.prototype.debugInfo = function(name) {
          name = name || this.name;
          if (name == null) {
            return "parent: <" + this.parent.name + ">";
          } else {
            return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
          }
        };
        XMLAttribute2.prototype.isEqualNode = function(node) {
          if (node.namespaceURI !== this.namespaceURI) {
            return false;
          }
          if (node.prefix !== this.prefix) {
            return false;
          }
          if (node.localName !== this.localName) {
            return false;
          }
          if (node.value !== this.value) {
            return false;
          }
          return true;
        };
        return XMLAttribute2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLNamedNodeMap.js
var require_XMLNamedNodeMap = __commonJS({
  "node_modules/xmlbuilder/lib/XMLNamedNodeMap.js"(exports2, module2) {
    (function() {
      var XMLNamedNodeMap;
      module2.exports = XMLNamedNodeMap = function() {
        function XMLNamedNodeMap2(nodes) {
          this.nodes = nodes;
        }
        Object.defineProperty(XMLNamedNodeMap2.prototype, "length", {
          get: function() {
            return Object.keys(this.nodes).length || 0;
          }
        });
        XMLNamedNodeMap2.prototype.clone = function() {
          return this.nodes = null;
        };
        XMLNamedNodeMap2.prototype.getNamedItem = function(name) {
          return this.nodes[name];
        };
        XMLNamedNodeMap2.prototype.setNamedItem = function(node) {
          var oldNode;
          oldNode = this.nodes[node.nodeName];
          this.nodes[node.nodeName] = node;
          return oldNode || null;
        };
        XMLNamedNodeMap2.prototype.removeNamedItem = function(name) {
          var oldNode;
          oldNode = this.nodes[name];
          delete this.nodes[name];
          return oldNode || null;
        };
        XMLNamedNodeMap2.prototype.item = function(index) {
          return this.nodes[Object.keys(this.nodes)[index]] || null;
        };
        XMLNamedNodeMap2.prototype.getNamedItemNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLNamedNodeMap2.prototype.setNamedItemNS = function(node) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLNamedNodeMap2.prototype.removeNamedItemNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented.");
        };
        return XMLNamedNodeMap2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLElement.js
var require_XMLElement = __commonJS({
  "node_modules/xmlbuilder/lib/XMLElement.js"(exports2, module2) {
    (function() {
      var NodeType, XMLAttribute, XMLElement, XMLNamedNodeMap, XMLNode, getValue, isFunction, isObject, ref, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      ref = require_Utility(), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      XMLAttribute = require_XMLAttribute();
      XMLNamedNodeMap = require_XMLNamedNodeMap();
      module2.exports = XMLElement = function(superClass) {
        extend(XMLElement2, superClass);
        function XMLElement2(parent, name, attributes) {
          var child, j2, len, ref1;
          XMLElement2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing element name. " + this.debugInfo());
          }
          this.name = this.stringify.name(name);
          this.type = NodeType.Element;
          this.attribs = {};
          this.schemaTypeInfo = null;
          if (attributes != null) {
            this.attribute(attributes);
          }
          if (parent.type === NodeType.Document) {
            this.isRoot = true;
            this.documentObject = parent;
            parent.rootObject = this;
            if (parent.children) {
              ref1 = parent.children;
              for (j2 = 0, len = ref1.length; j2 < len; j2++) {
                child = ref1[j2];
                if (child.type === NodeType.DocType) {
                  child.name = this.name;
                  break;
                }
              }
            }
          }
        }
        Object.defineProperty(XMLElement2.prototype, "tagName", {
          get: function() {
            return this.name;
          }
        });
        Object.defineProperty(XMLElement2.prototype, "namespaceURI", {
          get: function() {
            return "";
          }
        });
        Object.defineProperty(XMLElement2.prototype, "prefix", {
          get: function() {
            return "";
          }
        });
        Object.defineProperty(XMLElement2.prototype, "localName", {
          get: function() {
            return this.name;
          }
        });
        Object.defineProperty(XMLElement2.prototype, "id", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement2.prototype, "className", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement2.prototype, "classList", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement2.prototype, "attributes", {
          get: function() {
            if (!this.attributeMap || !this.attributeMap.nodes) {
              this.attributeMap = new XMLNamedNodeMap(this.attribs);
            }
            return this.attributeMap;
          }
        });
        XMLElement2.prototype.clone = function() {
          var att, attName, clonedSelf, ref1;
          clonedSelf = Object.create(this);
          if (clonedSelf.isRoot) {
            clonedSelf.documentObject = null;
          }
          clonedSelf.attribs = {};
          ref1 = this.attribs;
          for (attName in ref1) {
            if (!hasProp.call(ref1, attName))
              continue;
            att = ref1[attName];
            clonedSelf.attribs[attName] = att.clone();
          }
          clonedSelf.children = [];
          this.children.forEach(function(child) {
            var clonedChild;
            clonedChild = child.clone();
            clonedChild.parent = clonedSelf;
            return clonedSelf.children.push(clonedChild);
          });
          return clonedSelf;
        };
        XMLElement2.prototype.attribute = function(name, value) {
          var attName, attValue;
          if (name != null) {
            name = getValue(name);
          }
          if (isObject(name)) {
            for (attName in name) {
              if (!hasProp.call(name, attName))
                continue;
              attValue = name[attName];
              this.attribute(attName, attValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            if (this.options.keepNullAttributes && value == null) {
              this.attribs[name] = new XMLAttribute(this, name, "");
            } else if (value != null) {
              this.attribs[name] = new XMLAttribute(this, name, value);
            }
          }
          return this;
        };
        XMLElement2.prototype.removeAttribute = function(name) {
          var attName, j2, len;
          if (name == null) {
            throw new Error("Missing attribute name. " + this.debugInfo());
          }
          name = getValue(name);
          if (Array.isArray(name)) {
            for (j2 = 0, len = name.length; j2 < len; j2++) {
              attName = name[j2];
              delete this.attribs[attName];
            }
          } else {
            delete this.attribs[name];
          }
          return this;
        };
        XMLElement2.prototype.toString = function(options) {
          return this.options.writer.element(this, this.options.writer.filterOptions(options));
        };
        XMLElement2.prototype.att = function(name, value) {
          return this.attribute(name, value);
        };
        XMLElement2.prototype.a = function(name, value) {
          return this.attribute(name, value);
        };
        XMLElement2.prototype.getAttribute = function(name) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name].value;
          } else {
            return null;
          }
        };
        XMLElement2.prototype.setAttribute = function(name, value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getAttributeNode = function(name) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name];
          } else {
            return null;
          }
        };
        XMLElement2.prototype.setAttributeNode = function(newAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.removeAttributeNode = function(oldAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByTagName = function(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getAttributeNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.removeAttributeNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.setAttributeNodeNS = function(newAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.hasAttribute = function(name) {
          return this.attribs.hasOwnProperty(name);
        };
        XMLElement2.prototype.hasAttributeNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.setIdAttribute = function(name, isId) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name].isId;
          } else {
            return isId;
          }
        };
        XMLElement2.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.setIdAttributeNode = function(idAttr, isId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByTagName = function(tagname) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByClassName = function(classNames) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.isEqualNode = function(node) {
          var i2, j2, ref1;
          if (!XMLElement2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }
          if (node.namespaceURI !== this.namespaceURI) {
            return false;
          }
          if (node.prefix !== this.prefix) {
            return false;
          }
          if (node.localName !== this.localName) {
            return false;
          }
          if (node.attribs.length !== this.attribs.length) {
            return false;
          }
          for (i2 = j2 = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j2 <= ref1 : j2 >= ref1; i2 = 0 <= ref1 ? ++j2 : --j2) {
            if (!this.attribs[i2].isEqualNode(node.attribs[i2])) {
              return false;
            }
          }
          return true;
        };
        return XMLElement2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLCharacterData.js
var require_XMLCharacterData = __commonJS({
  "node_modules/xmlbuilder/lib/XMLCharacterData.js"(exports2, module2) {
    (function() {
      var XMLCharacterData, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      module2.exports = XMLCharacterData = function(superClass) {
        extend(XMLCharacterData2, superClass);
        function XMLCharacterData2(parent) {
          XMLCharacterData2.__super__.constructor.call(this, parent);
          this.value = "";
        }
        Object.defineProperty(XMLCharacterData2.prototype, "data", {
          get: function() {
            return this.value;
          },
          set: function(value) {
            return this.value = value || "";
          }
        });
        Object.defineProperty(XMLCharacterData2.prototype, "length", {
          get: function() {
            return this.value.length;
          }
        });
        Object.defineProperty(XMLCharacterData2.prototype, "textContent", {
          get: function() {
            return this.value;
          },
          set: function(value) {
            return this.value = value || "";
          }
        });
        XMLCharacterData2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLCharacterData2.prototype.substringData = function(offset, count) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.appendData = function(arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.insertData = function(offset, arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.deleteData = function(offset, count) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.replaceData = function(offset, count, arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.isEqualNode = function(node) {
          if (!XMLCharacterData2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }
          if (node.data !== this.data) {
            return false;
          }
          return true;
        };
        return XMLCharacterData2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLCData.js
var require_XMLCData = __commonJS({
  "node_modules/xmlbuilder/lib/XMLCData.js"(exports2, module2) {
    (function() {
      var NodeType, XMLCData, XMLCharacterData, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLCharacterData = require_XMLCharacterData();
      module2.exports = XMLCData = function(superClass) {
        extend(XMLCData2, superClass);
        function XMLCData2(parent, text) {
          XMLCData2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing CDATA text. " + this.debugInfo());
          }
          this.name = "#cdata-section";
          this.type = NodeType.CData;
          this.value = this.stringify.cdata(text);
        }
        XMLCData2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLCData2.prototype.toString = function(options) {
          return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
        };
        return XMLCData2;
      }(XMLCharacterData);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLComment.js
var require_XMLComment = __commonJS({
  "node_modules/xmlbuilder/lib/XMLComment.js"(exports2, module2) {
    (function() {
      var NodeType, XMLCharacterData, XMLComment, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLCharacterData = require_XMLCharacterData();
      module2.exports = XMLComment = function(superClass) {
        extend(XMLComment2, superClass);
        function XMLComment2(parent, text) {
          XMLComment2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing comment text. " + this.debugInfo());
          }
          this.name = "#comment";
          this.type = NodeType.Comment;
          this.value = this.stringify.comment(text);
        }
        XMLComment2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLComment2.prototype.toString = function(options) {
          return this.options.writer.comment(this, this.options.writer.filterOptions(options));
        };
        return XMLComment2;
      }(XMLCharacterData);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDeclaration.js
var require_XMLDeclaration = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDeclaration.js"(exports2, module2) {
    (function() {
      var NodeType, XMLDeclaration, XMLNode, isObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      isObject = require_Utility().isObject;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module2.exports = XMLDeclaration = function(superClass) {
        extend(XMLDeclaration2, superClass);
        function XMLDeclaration2(parent, version, encoding, standalone) {
          var ref;
          XMLDeclaration2.__super__.constructor.call(this, parent);
          if (isObject(version)) {
            ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
          }
          if (!version) {
            version = "1.0";
          }
          this.type = NodeType.Declaration;
          this.version = this.stringify.xmlVersion(version);
          if (encoding != null) {
            this.encoding = this.stringify.xmlEncoding(encoding);
          }
          if (standalone != null) {
            this.standalone = this.stringify.xmlStandalone(standalone);
          }
        }
        XMLDeclaration2.prototype.toString = function(options) {
          return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
        };
        return XMLDeclaration2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDAttList.js
var require_XMLDTDAttList = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDAttList.js"(exports2, module2) {
    (function() {
      var NodeType, XMLDTDAttList, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module2.exports = XMLDTDAttList = function(superClass) {
        extend(XMLDTDAttList2, superClass);
        function XMLDTDAttList2(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          XMLDTDAttList2.__super__.constructor.call(this, parent);
          if (elementName == null) {
            throw new Error("Missing DTD element name. " + this.debugInfo());
          }
          if (attributeName == null) {
            throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
          }
          if (!attributeType) {
            throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
          }
          if (!defaultValueType) {
            throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
          }
          if (defaultValueType.indexOf("#") !== 0) {
            defaultValueType = "#" + defaultValueType;
          }
          if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
            throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
          }
          if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
            throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
          }
          this.elementName = this.stringify.name(elementName);
          this.type = NodeType.AttributeDeclaration;
          this.attributeName = this.stringify.name(attributeName);
          this.attributeType = this.stringify.dtdAttType(attributeType);
          if (defaultValue) {
            this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
          }
          this.defaultValueType = defaultValueType;
        }
        XMLDTDAttList2.prototype.toString = function(options) {
          return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
        };
        return XMLDTDAttList2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDEntity.js
var require_XMLDTDEntity = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDEntity.js"(exports2, module2) {
    (function() {
      var NodeType, XMLDTDEntity, XMLNode, isObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      isObject = require_Utility().isObject;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module2.exports = XMLDTDEntity = function(superClass) {
        extend(XMLDTDEntity2, superClass);
        function XMLDTDEntity2(parent, pe2, name, value) {
          XMLDTDEntity2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing DTD entity name. " + this.debugInfo(name));
          }
          if (value == null) {
            throw new Error("Missing DTD entity value. " + this.debugInfo(name));
          }
          this.pe = !!pe2;
          this.name = this.stringify.name(name);
          this.type = NodeType.EntityDeclaration;
          if (!isObject(value)) {
            this.value = this.stringify.dtdEntityValue(value);
            this.internal = true;
          } else {
            if (!value.pubID && !value.sysID) {
              throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
            }
            if (value.pubID && !value.sysID) {
              throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
            }
            this.internal = false;
            if (value.pubID != null) {
              this.pubID = this.stringify.dtdPubID(value.pubID);
            }
            if (value.sysID != null) {
              this.sysID = this.stringify.dtdSysID(value.sysID);
            }
            if (value.nData != null) {
              this.nData = this.stringify.dtdNData(value.nData);
            }
            if (this.pe && this.nData) {
              throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
            }
          }
        }
        Object.defineProperty(XMLDTDEntity2.prototype, "publicId", {
          get: function() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "systemId", {
          get: function() {
            return this.sysID;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "notationName", {
          get: function() {
            return this.nData || null;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "inputEncoding", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "xmlEncoding", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "xmlVersion", {
          get: function() {
            return null;
          }
        });
        XMLDTDEntity2.prototype.toString = function(options) {
          return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
        };
        return XMLDTDEntity2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDElement.js
var require_XMLDTDElement = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDElement.js"(exports2, module2) {
    (function() {
      var NodeType, XMLDTDElement, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module2.exports = XMLDTDElement = function(superClass) {
        extend(XMLDTDElement2, superClass);
        function XMLDTDElement2(parent, name, value) {
          XMLDTDElement2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing DTD element name. " + this.debugInfo());
          }
          if (!value) {
            value = "(#PCDATA)";
          }
          if (Array.isArray(value)) {
            value = "(" + value.join(",") + ")";
          }
          this.name = this.stringify.name(name);
          this.type = NodeType.ElementDeclaration;
          this.value = this.stringify.dtdElementValue(value);
        }
        XMLDTDElement2.prototype.toString = function(options) {
          return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
        };
        return XMLDTDElement2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDNotation.js
var require_XMLDTDNotation = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDNotation.js"(exports2, module2) {
    (function() {
      var NodeType, XMLDTDNotation, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module2.exports = XMLDTDNotation = function(superClass) {
        extend(XMLDTDNotation2, superClass);
        function XMLDTDNotation2(parent, name, value) {
          XMLDTDNotation2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing DTD notation name. " + this.debugInfo(name));
          }
          if (!value.pubID && !value.sysID) {
            throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
          }
          this.name = this.stringify.name(name);
          this.type = NodeType.NotationDeclaration;
          if (value.pubID != null) {
            this.pubID = this.stringify.dtdPubID(value.pubID);
          }
          if (value.sysID != null) {
            this.sysID = this.stringify.dtdSysID(value.sysID);
          }
        }
        Object.defineProperty(XMLDTDNotation2.prototype, "publicId", {
          get: function() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDTDNotation2.prototype, "systemId", {
          get: function() {
            return this.sysID;
          }
        });
        XMLDTDNotation2.prototype.toString = function(options) {
          return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
        };
        return XMLDTDNotation2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDocType.js
var require_XMLDocType = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDocType.js"(exports2, module2) {
    (function() {
      var NodeType, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNamedNodeMap, XMLNode, isObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      isObject = require_Utility().isObject;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      XMLDTDAttList = require_XMLDTDAttList();
      XMLDTDEntity = require_XMLDTDEntity();
      XMLDTDElement = require_XMLDTDElement();
      XMLDTDNotation = require_XMLDTDNotation();
      XMLNamedNodeMap = require_XMLNamedNodeMap();
      module2.exports = XMLDocType = function(superClass) {
        extend(XMLDocType2, superClass);
        function XMLDocType2(parent, pubID, sysID) {
          var child, i2, len, ref, ref1, ref2;
          XMLDocType2.__super__.constructor.call(this, parent);
          this.type = NodeType.DocType;
          if (parent.children) {
            ref = parent.children;
            for (i2 = 0, len = ref.length; i2 < len; i2++) {
              child = ref[i2];
              if (child.type === NodeType.Element) {
                this.name = child.name;
                break;
              }
            }
          }
          this.documentObject = parent;
          if (isObject(pubID)) {
            ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
          }
          if (sysID == null) {
            ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
          }
          if (pubID != null) {
            this.pubID = this.stringify.dtdPubID(pubID);
          }
          if (sysID != null) {
            this.sysID = this.stringify.dtdSysID(sysID);
          }
        }
        Object.defineProperty(XMLDocType2.prototype, "entities", {
          get: function() {
            var child, i2, len, nodes, ref;
            nodes = {};
            ref = this.children;
            for (i2 = 0, len = ref.length; i2 < len; i2++) {
              child = ref[i2];
              if (child.type === NodeType.EntityDeclaration && !child.pe) {
                nodes[child.name] = child;
              }
            }
            return new XMLNamedNodeMap(nodes);
          }
        });
        Object.defineProperty(XMLDocType2.prototype, "notations", {
          get: function() {
            var child, i2, len, nodes, ref;
            nodes = {};
            ref = this.children;
            for (i2 = 0, len = ref.length; i2 < len; i2++) {
              child = ref[i2];
              if (child.type === NodeType.NotationDeclaration) {
                nodes[child.name] = child;
              }
            }
            return new XMLNamedNodeMap(nodes);
          }
        });
        Object.defineProperty(XMLDocType2.prototype, "publicId", {
          get: function() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDocType2.prototype, "systemId", {
          get: function() {
            return this.sysID;
          }
        });
        Object.defineProperty(XMLDocType2.prototype, "internalSubset", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        XMLDocType2.prototype.element = function(name, value) {
          var child;
          child = new XMLDTDElement(this, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          var child;
          child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.entity = function(name, value) {
          var child;
          child = new XMLDTDEntity(this, false, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.pEntity = function(name, value) {
          var child;
          child = new XMLDTDEntity(this, true, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.notation = function(name, value) {
          var child;
          child = new XMLDTDNotation(this, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.toString = function(options) {
          return this.options.writer.docType(this, this.options.writer.filterOptions(options));
        };
        XMLDocType2.prototype.ele = function(name, value) {
          return this.element(name, value);
        };
        XMLDocType2.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
        };
        XMLDocType2.prototype.ent = function(name, value) {
          return this.entity(name, value);
        };
        XMLDocType2.prototype.pent = function(name, value) {
          return this.pEntity(name, value);
        };
        XMLDocType2.prototype.not = function(name, value) {
          return this.notation(name, value);
        };
        XMLDocType2.prototype.up = function() {
          return this.root() || this.documentObject;
        };
        XMLDocType2.prototype.isEqualNode = function(node) {
          if (!XMLDocType2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }
          if (node.name !== this.name) {
            return false;
          }
          if (node.publicId !== this.publicId) {
            return false;
          }
          if (node.systemId !== this.systemId) {
            return false;
          }
          return true;
        };
        return XMLDocType2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLRaw.js
var require_XMLRaw = __commonJS({
  "node_modules/xmlbuilder/lib/XMLRaw.js"(exports2, module2) {
    (function() {
      var NodeType, XMLNode, XMLRaw, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLNode = require_XMLNode();
      module2.exports = XMLRaw = function(superClass) {
        extend(XMLRaw2, superClass);
        function XMLRaw2(parent, text) {
          XMLRaw2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing raw text. " + this.debugInfo());
          }
          this.type = NodeType.Raw;
          this.value = this.stringify.raw(text);
        }
        XMLRaw2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLRaw2.prototype.toString = function(options) {
          return this.options.writer.raw(this, this.options.writer.filterOptions(options));
        };
        return XMLRaw2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLText.js
var require_XMLText = __commonJS({
  "node_modules/xmlbuilder/lib/XMLText.js"(exports2, module2) {
    (function() {
      var NodeType, XMLCharacterData, XMLText, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLCharacterData = require_XMLCharacterData();
      module2.exports = XMLText = function(superClass) {
        extend(XMLText2, superClass);
        function XMLText2(parent, text) {
          XMLText2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing element text. " + this.debugInfo());
          }
          this.name = "#text";
          this.type = NodeType.Text;
          this.value = this.stringify.text(text);
        }
        Object.defineProperty(XMLText2.prototype, "isElementContentWhitespace", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLText2.prototype, "wholeText", {
          get: function() {
            var next, prev, str;
            str = "";
            prev = this.previousSibling;
            while (prev) {
              str = prev.data + str;
              prev = prev.previousSibling;
            }
            str += this.data;
            next = this.nextSibling;
            while (next) {
              str = str + next.data;
              next = next.nextSibling;
            }
            return str;
          }
        });
        XMLText2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLText2.prototype.toString = function(options) {
          return this.options.writer.text(this, this.options.writer.filterOptions(options));
        };
        XMLText2.prototype.splitText = function(offset) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLText2.prototype.replaceWholeText = function(content) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        return XMLText2;
      }(XMLCharacterData);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLProcessingInstruction.js
var require_XMLProcessingInstruction = __commonJS({
  "node_modules/xmlbuilder/lib/XMLProcessingInstruction.js"(exports2, module2) {
    (function() {
      var NodeType, XMLCharacterData, XMLProcessingInstruction, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLCharacterData = require_XMLCharacterData();
      module2.exports = XMLProcessingInstruction = function(superClass) {
        extend(XMLProcessingInstruction2, superClass);
        function XMLProcessingInstruction2(parent, target, value) {
          XMLProcessingInstruction2.__super__.constructor.call(this, parent);
          if (target == null) {
            throw new Error("Missing instruction target. " + this.debugInfo());
          }
          this.type = NodeType.ProcessingInstruction;
          this.target = this.stringify.insTarget(target);
          this.name = this.target;
          if (value) {
            this.value = this.stringify.insValue(value);
          }
        }
        XMLProcessingInstruction2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLProcessingInstruction2.prototype.toString = function(options) {
          return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
        };
        XMLProcessingInstruction2.prototype.isEqualNode = function(node) {
          if (!XMLProcessingInstruction2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }
          if (node.target !== this.target) {
            return false;
          }
          return true;
        };
        return XMLProcessingInstruction2;
      }(XMLCharacterData);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDummy.js
var require_XMLDummy = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDummy.js"(exports2, module2) {
    (function() {
      var NodeType, XMLDummy, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module2.exports = XMLDummy = function(superClass) {
        extend(XMLDummy2, superClass);
        function XMLDummy2(parent) {
          XMLDummy2.__super__.constructor.call(this, parent);
          this.type = NodeType.Dummy;
        }
        XMLDummy2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLDummy2.prototype.toString = function(options) {
          return "";
        };
        return XMLDummy2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLNodeList.js
var require_XMLNodeList = __commonJS({
  "node_modules/xmlbuilder/lib/XMLNodeList.js"(exports2, module2) {
    (function() {
      var XMLNodeList;
      module2.exports = XMLNodeList = function() {
        function XMLNodeList2(nodes) {
          this.nodes = nodes;
        }
        Object.defineProperty(XMLNodeList2.prototype, "length", {
          get: function() {
            return this.nodes.length || 0;
          }
        });
        XMLNodeList2.prototype.clone = function() {
          return this.nodes = null;
        };
        XMLNodeList2.prototype.item = function(index) {
          return this.nodes[index] || null;
        };
        return XMLNodeList2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/DocumentPosition.js
var require_DocumentPosition = __commonJS({
  "node_modules/xmlbuilder/lib/DocumentPosition.js"(exports2, module2) {
    (function() {
      module2.exports = {
        Disconnected: 1,
        Preceding: 2,
        Following: 4,
        Contains: 8,
        ContainedBy: 16,
        ImplementationSpecific: 32
      };
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLNode.js
var require_XMLNode = __commonJS({
  "node_modules/xmlbuilder/lib/XMLNode.js"(exports2, module2) {
    (function() {
      var DocumentPosition, NodeType, XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLNamedNodeMap, XMLNode, XMLNodeList, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction, isObject, ref1, hasProp = {}.hasOwnProperty;
      ref1 = require_Utility(), isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;
      XMLElement = null;
      XMLCData = null;
      XMLComment = null;
      XMLDeclaration = null;
      XMLDocType = null;
      XMLRaw = null;
      XMLText = null;
      XMLProcessingInstruction = null;
      XMLDummy = null;
      NodeType = null;
      XMLNodeList = null;
      XMLNamedNodeMap = null;
      DocumentPosition = null;
      module2.exports = XMLNode = function() {
        function XMLNode2(parent1) {
          this.parent = parent1;
          if (this.parent) {
            this.options = this.parent.options;
            this.stringify = this.parent.stringify;
          }
          this.value = null;
          this.children = [];
          this.baseURI = null;
          if (!XMLElement) {
            XMLElement = require_XMLElement();
            XMLCData = require_XMLCData();
            XMLComment = require_XMLComment();
            XMLDeclaration = require_XMLDeclaration();
            XMLDocType = require_XMLDocType();
            XMLRaw = require_XMLRaw();
            XMLText = require_XMLText();
            XMLProcessingInstruction = require_XMLProcessingInstruction();
            XMLDummy = require_XMLDummy();
            NodeType = require_NodeType();
            XMLNodeList = require_XMLNodeList();
            XMLNamedNodeMap = require_XMLNamedNodeMap();
            DocumentPosition = require_DocumentPosition();
          }
        }
        Object.defineProperty(XMLNode2.prototype, "nodeName", {
          get: function() {
            return this.name;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "nodeType", {
          get: function() {
            return this.type;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "nodeValue", {
          get: function() {
            return this.value;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "parentNode", {
          get: function() {
            return this.parent;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "childNodes", {
          get: function() {
            if (!this.childNodeList || !this.childNodeList.nodes) {
              this.childNodeList = new XMLNodeList(this.children);
            }
            return this.childNodeList;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "firstChild", {
          get: function() {
            return this.children[0] || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "lastChild", {
          get: function() {
            return this.children[this.children.length - 1] || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "previousSibling", {
          get: function() {
            var i2;
            i2 = this.parent.children.indexOf(this);
            return this.parent.children[i2 - 1] || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "nextSibling", {
          get: function() {
            var i2;
            i2 = this.parent.children.indexOf(this);
            return this.parent.children[i2 + 1] || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "ownerDocument", {
          get: function() {
            return this.document() || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "textContent", {
          get: function() {
            var child, j2, len, ref2, str;
            if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
              str = "";
              ref2 = this.children;
              for (j2 = 0, len = ref2.length; j2 < len; j2++) {
                child = ref2[j2];
                if (child.textContent) {
                  str += child.textContent;
                }
              }
              return str;
            } else {
              return null;
            }
          },
          set: function(value) {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        XMLNode2.prototype.setParent = function(parent) {
          var child, j2, len, ref2, results;
          this.parent = parent;
          if (parent) {
            this.options = parent.options;
            this.stringify = parent.stringify;
          }
          ref2 = this.children;
          results = [];
          for (j2 = 0, len = ref2.length; j2 < len; j2++) {
            child = ref2[j2];
            results.push(child.setParent(this));
          }
          return results;
        };
        XMLNode2.prototype.element = function(name, attributes, text) {
          var childNode, item, j2, k2, key, lastChild, len, len1, ref2, ref3, val;
          lastChild = null;
          if (attributes === null && text == null) {
            ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
          }
          if (attributes == null) {
            attributes = {};
          }
          attributes = getValue(attributes);
          if (!isObject(attributes)) {
            ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
          }
          if (name != null) {
            name = getValue(name);
          }
          if (Array.isArray(name)) {
            for (j2 = 0, len = name.length; j2 < len; j2++) {
              item = name[j2];
              lastChild = this.element(item);
            }
          } else if (isFunction(name)) {
            lastChild = this.element(name.apply());
          } else if (isObject(name)) {
            for (key in name) {
              if (!hasProp.call(name, key))
                continue;
              val = name[key];
              if (isFunction(val)) {
                val = val.apply();
              }
              if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
                lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
              } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
                lastChild = this.dummy();
              } else if (isObject(val) && isEmpty(val)) {
                lastChild = this.element(key);
              } else if (!this.options.keepNullNodes && val == null) {
                lastChild = this.dummy();
              } else if (!this.options.separateArrayItems && Array.isArray(val)) {
                for (k2 = 0, len1 = val.length; k2 < len1; k2++) {
                  item = val[k2];
                  childNode = {};
                  childNode[key] = item;
                  lastChild = this.element(childNode);
                }
              } else if (isObject(val)) {
                if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
                  lastChild = this.element(val);
                } else {
                  lastChild = this.element(key);
                  lastChild.element(val);
                }
              } else {
                lastChild = this.element(key, val);
              }
            }
          } else if (!this.options.keepNullNodes && text === null) {
            lastChild = this.dummy();
          } else {
            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
              lastChild = this.text(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
              lastChild = this.cdata(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
              lastChild = this.comment(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
              lastChild = this.raw(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
              lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
            } else {
              lastChild = this.node(name, attributes, text);
            }
          }
          if (lastChild == null) {
            throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
          }
          return lastChild;
        };
        XMLNode2.prototype.insertBefore = function(name, attributes, text) {
          var child, i2, newChild, refChild, removed;
          if (name != null ? name.type : void 0) {
            newChild = name;
            refChild = attributes;
            newChild.setParent(this);
            if (refChild) {
              i2 = children.indexOf(refChild);
              removed = children.splice(i2);
              children.push(newChild);
              Array.prototype.push.apply(children, removed);
            } else {
              children.push(newChild);
            }
            return newChild;
          } else {
            if (this.isRoot) {
              throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
            }
            i2 = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i2);
            child = this.parent.element(name, attributes, text);
            Array.prototype.push.apply(this.parent.children, removed);
            return child;
          }
        };
        XMLNode2.prototype.insertAfter = function(name, attributes, text) {
          var child, i2, removed;
          if (this.isRoot) {
            throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
          }
          i2 = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i2 + 1);
          child = this.parent.element(name, attributes, text);
          Array.prototype.push.apply(this.parent.children, removed);
          return child;
        };
        XMLNode2.prototype.remove = function() {
          var i2, ref2;
          if (this.isRoot) {
            throw new Error("Cannot remove the root element. " + this.debugInfo());
          }
          i2 = this.parent.children.indexOf(this);
          [].splice.apply(this.parent.children, [i2, i2 - i2 + 1].concat(ref2 = [])), ref2;
          return this.parent;
        };
        XMLNode2.prototype.node = function(name, attributes, text) {
          var child, ref2;
          if (name != null) {
            name = getValue(name);
          }
          attributes || (attributes = {});
          attributes = getValue(attributes);
          if (!isObject(attributes)) {
            ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
          }
          child = new XMLElement(this, name, attributes);
          if (text != null) {
            child.text(text);
          }
          this.children.push(child);
          return child;
        };
        XMLNode2.prototype.text = function(value) {
          var child;
          if (isObject(value)) {
            this.element(value);
          }
          child = new XMLText(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.cdata = function(value) {
          var child;
          child = new XMLCData(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.comment = function(value) {
          var child;
          child = new XMLComment(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.commentBefore = function(value) {
          var child, i2, removed;
          i2 = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i2);
          child = this.parent.comment(value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };
        XMLNode2.prototype.commentAfter = function(value) {
          var child, i2, removed;
          i2 = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i2 + 1);
          child = this.parent.comment(value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };
        XMLNode2.prototype.raw = function(value) {
          var child;
          child = new XMLRaw(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.dummy = function() {
          var child;
          child = new XMLDummy(this);
          return child;
        };
        XMLNode2.prototype.instruction = function(target, value) {
          var insTarget, insValue, instruction, j2, len;
          if (target != null) {
            target = getValue(target);
          }
          if (value != null) {
            value = getValue(value);
          }
          if (Array.isArray(target)) {
            for (j2 = 0, len = target.length; j2 < len; j2++) {
              insTarget = target[j2];
              this.instruction(insTarget);
            }
          } else if (isObject(target)) {
            for (insTarget in target) {
              if (!hasProp.call(target, insTarget))
                continue;
              insValue = target[insTarget];
              this.instruction(insTarget, insValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            instruction = new XMLProcessingInstruction(this, target, value);
            this.children.push(instruction);
          }
          return this;
        };
        XMLNode2.prototype.instructionBefore = function(target, value) {
          var child, i2, removed;
          i2 = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i2);
          child = this.parent.instruction(target, value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };
        XMLNode2.prototype.instructionAfter = function(target, value) {
          var child, i2, removed;
          i2 = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i2 + 1);
          child = this.parent.instruction(target, value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };
        XMLNode2.prototype.declaration = function(version, encoding, standalone) {
          var doc, xmldec;
          doc = this.document();
          xmldec = new XMLDeclaration(doc, version, encoding, standalone);
          if (doc.children.length === 0) {
            doc.children.unshift(xmldec);
          } else if (doc.children[0].type === NodeType.Declaration) {
            doc.children[0] = xmldec;
          } else {
            doc.children.unshift(xmldec);
          }
          return doc.root() || doc;
        };
        XMLNode2.prototype.dtd = function(pubID, sysID) {
          var child, doc, doctype, i2, j2, k2, len, len1, ref2, ref3;
          doc = this.document();
          doctype = new XMLDocType(doc, pubID, sysID);
          ref2 = doc.children;
          for (i2 = j2 = 0, len = ref2.length; j2 < len; i2 = ++j2) {
            child = ref2[i2];
            if (child.type === NodeType.DocType) {
              doc.children[i2] = doctype;
              return doctype;
            }
          }
          ref3 = doc.children;
          for (i2 = k2 = 0, len1 = ref3.length; k2 < len1; i2 = ++k2) {
            child = ref3[i2];
            if (child.isRoot) {
              doc.children.splice(i2, 0, doctype);
              return doctype;
            }
          }
          doc.children.push(doctype);
          return doctype;
        };
        XMLNode2.prototype.up = function() {
          if (this.isRoot) {
            throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
          }
          return this.parent;
        };
        XMLNode2.prototype.root = function() {
          var node;
          node = this;
          while (node) {
            if (node.type === NodeType.Document) {
              return node.rootObject;
            } else if (node.isRoot) {
              return node;
            } else {
              node = node.parent;
            }
          }
        };
        XMLNode2.prototype.document = function() {
          var node;
          node = this;
          while (node) {
            if (node.type === NodeType.Document) {
              return node;
            } else {
              node = node.parent;
            }
          }
        };
        XMLNode2.prototype.end = function(options) {
          return this.document().end(options);
        };
        XMLNode2.prototype.prev = function() {
          var i2;
          i2 = this.parent.children.indexOf(this);
          if (i2 < 1) {
            throw new Error("Already at the first node. " + this.debugInfo());
          }
          return this.parent.children[i2 - 1];
        };
        XMLNode2.prototype.next = function() {
          var i2;
          i2 = this.parent.children.indexOf(this);
          if (i2 === -1 || i2 === this.parent.children.length - 1) {
            throw new Error("Already at the last node. " + this.debugInfo());
          }
          return this.parent.children[i2 + 1];
        };
        XMLNode2.prototype.importDocument = function(doc) {
          var clonedRoot;
          clonedRoot = doc.root().clone();
          clonedRoot.parent = this;
          clonedRoot.isRoot = false;
          this.children.push(clonedRoot);
          return this;
        };
        XMLNode2.prototype.debugInfo = function(name) {
          var ref2, ref3;
          name = name || this.name;
          if (name == null && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
            return "";
          } else if (name == null) {
            return "parent: <" + this.parent.name + ">";
          } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
            return "node: <" + name + ">";
          } else {
            return "node: <" + name + ">, parent: <" + this.parent.name + ">";
          }
        };
        XMLNode2.prototype.ele = function(name, attributes, text) {
          return this.element(name, attributes, text);
        };
        XMLNode2.prototype.nod = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLNode2.prototype.txt = function(value) {
          return this.text(value);
        };
        XMLNode2.prototype.dat = function(value) {
          return this.cdata(value);
        };
        XMLNode2.prototype.com = function(value) {
          return this.comment(value);
        };
        XMLNode2.prototype.ins = function(target, value) {
          return this.instruction(target, value);
        };
        XMLNode2.prototype.doc = function() {
          return this.document();
        };
        XMLNode2.prototype.dec = function(version, encoding, standalone) {
          return this.declaration(version, encoding, standalone);
        };
        XMLNode2.prototype.e = function(name, attributes, text) {
          return this.element(name, attributes, text);
        };
        XMLNode2.prototype.n = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLNode2.prototype.t = function(value) {
          return this.text(value);
        };
        XMLNode2.prototype.d = function(value) {
          return this.cdata(value);
        };
        XMLNode2.prototype.c = function(value) {
          return this.comment(value);
        };
        XMLNode2.prototype.r = function(value) {
          return this.raw(value);
        };
        XMLNode2.prototype.i = function(target, value) {
          return this.instruction(target, value);
        };
        XMLNode2.prototype.u = function() {
          return this.up();
        };
        XMLNode2.prototype.importXMLBuilder = function(doc) {
          return this.importDocument(doc);
        };
        XMLNode2.prototype.replaceChild = function(newChild, oldChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.removeChild = function(oldChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.appendChild = function(newChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.hasChildNodes = function() {
          return this.children.length !== 0;
        };
        XMLNode2.prototype.cloneNode = function(deep) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.normalize = function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.isSupported = function(feature, version) {
          return true;
        };
        XMLNode2.prototype.hasAttributes = function() {
          return this.attribs.length !== 0;
        };
        XMLNode2.prototype.compareDocumentPosition = function(other) {
          var ref, res;
          ref = this;
          if (ref === other) {
            return 0;
          } else if (this.document() !== other.document()) {
            res = DocumentPosition.Disconnected | DocumentPosition.ImplementationSpecific;
            if (Math.random() < 0.5) {
              res |= DocumentPosition.Preceding;
            } else {
              res |= DocumentPosition.Following;
            }
            return res;
          } else if (ref.isAncestor(other)) {
            return DocumentPosition.Contains | DocumentPosition.Preceding;
          } else if (ref.isDescendant(other)) {
            return DocumentPosition.Contains | DocumentPosition.Following;
          } else if (ref.isPreceding(other)) {
            return DocumentPosition.Preceding;
          } else {
            return DocumentPosition.Following;
          }
        };
        XMLNode2.prototype.isSameNode = function(other) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.lookupPrefix = function(namespaceURI) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.isDefaultNamespace = function(namespaceURI) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.lookupNamespaceURI = function(prefix) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.isEqualNode = function(node) {
          var i2, j2, ref2;
          if (node.nodeType !== this.nodeType) {
            return false;
          }
          if (node.children.length !== this.children.length) {
            return false;
          }
          for (i2 = j2 = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j2 <= ref2 : j2 >= ref2; i2 = 0 <= ref2 ? ++j2 : --j2) {
            if (!this.children[i2].isEqualNode(node.children[i2])) {
              return false;
            }
          }
          return true;
        };
        XMLNode2.prototype.getFeature = function(feature, version) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.setUserData = function(key, data, handler) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.getUserData = function(key) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.contains = function(other) {
          if (!other) {
            return false;
          }
          return other === this || this.isDescendant(other);
        };
        XMLNode2.prototype.isDescendant = function(node) {
          var child, isDescendantChild, j2, len, ref2;
          ref2 = this.children;
          for (j2 = 0, len = ref2.length; j2 < len; j2++) {
            child = ref2[j2];
            if (node === child) {
              return true;
            }
            isDescendantChild = child.isDescendant(node);
            if (isDescendantChild) {
              return true;
            }
          }
          return false;
        };
        XMLNode2.prototype.isAncestor = function(node) {
          return node.isDescendant(this);
        };
        XMLNode2.prototype.isPreceding = function(node) {
          var nodePos, thisPos;
          nodePos = this.treePosition(node);
          thisPos = this.treePosition(this);
          if (nodePos === -1 || thisPos === -1) {
            return false;
          } else {
            return nodePos < thisPos;
          }
        };
        XMLNode2.prototype.isFollowing = function(node) {
          var nodePos, thisPos;
          nodePos = this.treePosition(node);
          thisPos = this.treePosition(this);
          if (nodePos === -1 || thisPos === -1) {
            return false;
          } else {
            return nodePos > thisPos;
          }
        };
        XMLNode2.prototype.treePosition = function(node) {
          var found, pos;
          pos = 0;
          found = false;
          this.foreachTreeNode(this.document(), function(childNode) {
            pos++;
            if (!found && childNode === node) {
              return found = true;
            }
          });
          if (found) {
            return pos;
          } else {
            return -1;
          }
        };
        XMLNode2.prototype.foreachTreeNode = function(node, func) {
          var child, j2, len, ref2, res;
          node || (node = this.document());
          ref2 = node.children;
          for (j2 = 0, len = ref2.length; j2 < len; j2++) {
            child = ref2[j2];
            if (res = func(child)) {
              return res;
            } else {
              res = this.foreachTreeNode(child, func);
              if (res) {
                return res;
              }
            }
          }
        };
        return XMLNode2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLStringifier.js
var require_XMLStringifier = __commonJS({
  "node_modules/xmlbuilder/lib/XMLStringifier.js"(exports2, module2) {
    (function() {
      var XMLStringifier, bind = function(fn3, me2) {
        return function() {
          return fn3.apply(me2, arguments);
        };
      }, hasProp = {}.hasOwnProperty;
      module2.exports = XMLStringifier = function() {
        function XMLStringifier2(options) {
          this.assertLegalName = bind(this.assertLegalName, this);
          this.assertLegalChar = bind(this.assertLegalChar, this);
          var key, ref, value;
          options || (options = {});
          this.options = options;
          if (!this.options.version) {
            this.options.version = "1.0";
          }
          ref = options.stringify || {};
          for (key in ref) {
            if (!hasProp.call(ref, key))
              continue;
            value = ref[key];
            this[key] = value;
          }
        }
        XMLStringifier2.prototype.name = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalName("" + val || "");
        };
        XMLStringifier2.prototype.text = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar(this.textEscape("" + val || ""));
        };
        XMLStringifier2.prototype.cdata = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          val = val.replace("]]>", "]]]]><![CDATA[>");
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.comment = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (val.match(/--/)) {
            throw new Error("Comment text cannot contain double-hypen: " + val);
          }
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.raw = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return "" + val || "";
        };
        XMLStringifier2.prototype.attValue = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar(this.attEscape(val = "" + val || ""));
        };
        XMLStringifier2.prototype.insTarget = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.insValue = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (val.match(/\?>/)) {
            throw new Error("Invalid processing instruction value: " + val);
          }
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.xmlVersion = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (!val.match(/1\.[0-9]+/)) {
            throw new Error("Invalid version number: " + val);
          }
          return val;
        };
        XMLStringifier2.prototype.xmlEncoding = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
            throw new Error("Invalid encoding: " + val);
          }
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.xmlStandalone = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          if (val) {
            return "yes";
          } else {
            return "no";
          }
        };
        XMLStringifier2.prototype.dtdPubID = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdSysID = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdElementValue = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdAttType = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdAttDefault = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdEntityValue = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdNData = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.convertAttKey = "@";
        XMLStringifier2.prototype.convertPIKey = "?";
        XMLStringifier2.prototype.convertTextKey = "#text";
        XMLStringifier2.prototype.convertCDataKey = "#cdata";
        XMLStringifier2.prototype.convertCommentKey = "#comment";
        XMLStringifier2.prototype.convertRawKey = "#raw";
        XMLStringifier2.prototype.assertLegalChar = function(str) {
          var regex, res;
          if (this.options.noValidation) {
            return str;
          }
          regex = "";
          if (this.options.version === "1.0") {
            regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
            if (res = str.match(regex)) {
              throw new Error("Invalid character in string: " + str + " at index " + res.index);
            }
          } else if (this.options.version === "1.1") {
            regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
            if (res = str.match(regex)) {
              throw new Error("Invalid character in string: " + str + " at index " + res.index);
            }
          }
          return str;
        };
        XMLStringifier2.prototype.assertLegalName = function(str) {
          var regex;
          if (this.options.noValidation) {
            return str;
          }
          this.assertLegalChar(str);
          regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
          if (!str.match(regex)) {
            throw new Error("Invalid character in name");
          }
          return str;
        };
        XMLStringifier2.prototype.textEscape = function(str) {
          var ampregex;
          if (this.options.noValidation) {
            return str;
          }
          ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
          return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
        };
        XMLStringifier2.prototype.attEscape = function(str) {
          var ampregex;
          if (this.options.noValidation) {
            return str;
          }
          ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
          return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
        };
        return XMLStringifier2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/WriterState.js
var require_WriterState = __commonJS({
  "node_modules/xmlbuilder/lib/WriterState.js"(exports2, module2) {
    (function() {
      module2.exports = {
        None: 0,
        OpenTag: 1,
        InsideTag: 2,
        CloseTag: 3
      };
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLWriterBase.js
var require_XMLWriterBase = __commonJS({
  "node_modules/xmlbuilder/lib/XMLWriterBase.js"(exports2, module2) {
    (function() {
      var NodeType, WriterState, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLProcessingInstruction, XMLRaw, XMLText, XMLWriterBase, assign, hasProp = {}.hasOwnProperty;
      assign = require_Utility().assign;
      NodeType = require_NodeType();
      XMLDeclaration = require_XMLDeclaration();
      XMLDocType = require_XMLDocType();
      XMLCData = require_XMLCData();
      XMLComment = require_XMLComment();
      XMLElement = require_XMLElement();
      XMLRaw = require_XMLRaw();
      XMLText = require_XMLText();
      XMLProcessingInstruction = require_XMLProcessingInstruction();
      XMLDummy = require_XMLDummy();
      XMLDTDAttList = require_XMLDTDAttList();
      XMLDTDElement = require_XMLDTDElement();
      XMLDTDEntity = require_XMLDTDEntity();
      XMLDTDNotation = require_XMLDTDNotation();
      WriterState = require_WriterState();
      module2.exports = XMLWriterBase = function() {
        function XMLWriterBase2(options) {
          var key, ref, value;
          options || (options = {});
          this.options = options;
          ref = options.writer || {};
          for (key in ref) {
            if (!hasProp.call(ref, key))
              continue;
            value = ref[key];
            this["_" + key] = this[key];
            this[key] = value;
          }
        }
        XMLWriterBase2.prototype.filterOptions = function(options) {
          var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
          options || (options = {});
          options = assign({}, this.options, options);
          filteredOptions = {
            writer: this
          };
          filteredOptions.pretty = options.pretty || false;
          filteredOptions.allowEmpty = options.allowEmpty || false;
          filteredOptions.indent = (ref = options.indent) != null ? ref : "  ";
          filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : "\n";
          filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
          filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
          filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : "";
          if (filteredOptions.spaceBeforeSlash === true) {
            filteredOptions.spaceBeforeSlash = " ";
          }
          filteredOptions.suppressPrettyCount = 0;
          filteredOptions.user = {};
          filteredOptions.state = WriterState.None;
          return filteredOptions;
        };
        XMLWriterBase2.prototype.indent = function(node, options, level) {
          var indentLevel;
          if (!options.pretty || options.suppressPrettyCount) {
            return "";
          } else if (options.pretty) {
            indentLevel = (level || 0) + options.offset + 1;
            if (indentLevel > 0) {
              return new Array(indentLevel).join(options.indent);
            }
          }
          return "";
        };
        XMLWriterBase2.prototype.endline = function(node, options, level) {
          if (!options.pretty || options.suppressPrettyCount) {
            return "";
          } else {
            return options.newline;
          }
        };
        XMLWriterBase2.prototype.attribute = function(att, options, level) {
          var r2;
          this.openAttribute(att, options, level);
          r2 = " " + att.name + '="' + att.value + '"';
          this.closeAttribute(att, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.cdata = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level) + "<![CDATA[";
          options.state = WriterState.InsideTag;
          r2 += node.value;
          options.state = WriterState.CloseTag;
          r2 += "]]>" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.comment = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level) + "<!-- ";
          options.state = WriterState.InsideTag;
          r2 += node.value;
          options.state = WriterState.CloseTag;
          r2 += " -->" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.declaration = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level) + "<?xml";
          options.state = WriterState.InsideTag;
          r2 += ' version="' + node.version + '"';
          if (node.encoding != null) {
            r2 += ' encoding="' + node.encoding + '"';
          }
          if (node.standalone != null) {
            r2 += ' standalone="' + node.standalone + '"';
          }
          options.state = WriterState.CloseTag;
          r2 += options.spaceBeforeSlash + "?>";
          r2 += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.docType = function(node, options, level) {
          var child, i2, len, r2, ref;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level);
          r2 += "<!DOCTYPE " + node.root().name;
          if (node.pubID && node.sysID) {
            r2 += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            r2 += ' SYSTEM "' + node.sysID + '"';
          }
          if (node.children.length > 0) {
            r2 += " [";
            r2 += this.endline(node, options, level);
            options.state = WriterState.InsideTag;
            ref = node.children;
            for (i2 = 0, len = ref.length; i2 < len; i2++) {
              child = ref[i2];
              r2 += this.writeChildNode(child, options, level + 1);
            }
            options.state = WriterState.CloseTag;
            r2 += "]";
          }
          options.state = WriterState.CloseTag;
          r2 += options.spaceBeforeSlash + ">";
          r2 += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.element = function(node, options, level) {
          var att, child, childNodeCount, firstChildNode, i2, j2, len, len1, name, prettySuppressed, r2, ref, ref1, ref2;
          level || (level = 0);
          prettySuppressed = false;
          r2 = "";
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 += this.indent(node, options, level) + "<" + node.name;
          ref = node.attribs;
          for (name in ref) {
            if (!hasProp.call(ref, name))
              continue;
            att = ref[name];
            r2 += this.attribute(att, options, level);
          }
          childNodeCount = node.children.length;
          firstChildNode = childNodeCount === 0 ? null : node.children[0];
          if (childNodeCount === 0 || node.children.every(function(e3) {
            return (e3.type === NodeType.Text || e3.type === NodeType.Raw) && e3.value === "";
          })) {
            if (options.allowEmpty) {
              r2 += ">";
              options.state = WriterState.CloseTag;
              r2 += "</" + node.name + ">" + this.endline(node, options, level);
            } else {
              options.state = WriterState.CloseTag;
              r2 += options.spaceBeforeSlash + "/>" + this.endline(node, options, level);
            }
          } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && firstChildNode.value != null) {
            r2 += ">";
            options.state = WriterState.InsideTag;
            options.suppressPrettyCount++;
            prettySuppressed = true;
            r2 += this.writeChildNode(firstChildNode, options, level + 1);
            options.suppressPrettyCount--;
            prettySuppressed = false;
            options.state = WriterState.CloseTag;
            r2 += "</" + node.name + ">" + this.endline(node, options, level);
          } else {
            if (options.dontPrettyTextNodes) {
              ref1 = node.children;
              for (i2 = 0, len = ref1.length; i2 < len; i2++) {
                child = ref1[i2];
                if ((child.type === NodeType.Text || child.type === NodeType.Raw) && child.value != null) {
                  options.suppressPrettyCount++;
                  prettySuppressed = true;
                  break;
                }
              }
            }
            r2 += ">" + this.endline(node, options, level);
            options.state = WriterState.InsideTag;
            ref2 = node.children;
            for (j2 = 0, len1 = ref2.length; j2 < len1; j2++) {
              child = ref2[j2];
              r2 += this.writeChildNode(child, options, level + 1);
            }
            options.state = WriterState.CloseTag;
            r2 += this.indent(node, options, level) + "</" + node.name + ">";
            if (prettySuppressed) {
              options.suppressPrettyCount--;
            }
            r2 += this.endline(node, options, level);
            options.state = WriterState.None;
          }
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.writeChildNode = function(node, options, level) {
          switch (node.type) {
            case NodeType.CData:
              return this.cdata(node, options, level);
            case NodeType.Comment:
              return this.comment(node, options, level);
            case NodeType.Element:
              return this.element(node, options, level);
            case NodeType.Raw:
              return this.raw(node, options, level);
            case NodeType.Text:
              return this.text(node, options, level);
            case NodeType.ProcessingInstruction:
              return this.processingInstruction(node, options, level);
            case NodeType.Dummy:
              return "";
            case NodeType.Declaration:
              return this.declaration(node, options, level);
            case NodeType.DocType:
              return this.docType(node, options, level);
            case NodeType.AttributeDeclaration:
              return this.dtdAttList(node, options, level);
            case NodeType.ElementDeclaration:
              return this.dtdElement(node, options, level);
            case NodeType.EntityDeclaration:
              return this.dtdEntity(node, options, level);
            case NodeType.NotationDeclaration:
              return this.dtdNotation(node, options, level);
            default:
              throw new Error("Unknown XML node type: " + node.constructor.name);
          }
        };
        XMLWriterBase2.prototype.processingInstruction = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level) + "<?";
          options.state = WriterState.InsideTag;
          r2 += node.target;
          if (node.value) {
            r2 += " " + node.value;
          }
          options.state = WriterState.CloseTag;
          r2 += options.spaceBeforeSlash + "?>";
          r2 += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.raw = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level);
          options.state = WriterState.InsideTag;
          r2 += node.value;
          options.state = WriterState.CloseTag;
          r2 += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.text = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level);
          options.state = WriterState.InsideTag;
          r2 += node.value;
          options.state = WriterState.CloseTag;
          r2 += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.dtdAttList = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level) + "<!ATTLIST";
          options.state = WriterState.InsideTag;
          r2 += " " + node.elementName + " " + node.attributeName + " " + node.attributeType;
          if (node.defaultValueType !== "#DEFAULT") {
            r2 += " " + node.defaultValueType;
          }
          if (node.defaultValue) {
            r2 += ' "' + node.defaultValue + '"';
          }
          options.state = WriterState.CloseTag;
          r2 += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.dtdElement = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level) + "<!ELEMENT";
          options.state = WriterState.InsideTag;
          r2 += " " + node.name + " " + node.value;
          options.state = WriterState.CloseTag;
          r2 += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.dtdEntity = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level) + "<!ENTITY";
          options.state = WriterState.InsideTag;
          if (node.pe) {
            r2 += " %";
          }
          r2 += " " + node.name;
          if (node.value) {
            r2 += ' "' + node.value + '"';
          } else {
            if (node.pubID && node.sysID) {
              r2 += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
            } else if (node.sysID) {
              r2 += ' SYSTEM "' + node.sysID + '"';
            }
            if (node.nData) {
              r2 += " NDATA " + node.nData;
            }
          }
          options.state = WriterState.CloseTag;
          r2 += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.dtdNotation = function(node, options, level) {
          var r2;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r2 = this.indent(node, options, level) + "<!NOTATION";
          options.state = WriterState.InsideTag;
          r2 += " " + node.name;
          if (node.pubID && node.sysID) {
            r2 += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.pubID) {
            r2 += ' PUBLIC "' + node.pubID + '"';
          } else if (node.sysID) {
            r2 += ' SYSTEM "' + node.sysID + '"';
          }
          options.state = WriterState.CloseTag;
          r2 += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r2;
        };
        XMLWriterBase2.prototype.openNode = function(node, options, level) {
        };
        XMLWriterBase2.prototype.closeNode = function(node, options, level) {
        };
        XMLWriterBase2.prototype.openAttribute = function(att, options, level) {
        };
        XMLWriterBase2.prototype.closeAttribute = function(att, options, level) {
        };
        return XMLWriterBase2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLStringWriter.js
var require_XMLStringWriter = __commonJS({
  "node_modules/xmlbuilder/lib/XMLStringWriter.js"(exports2, module2) {
    (function() {
      var XMLStringWriter, XMLWriterBase, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLWriterBase = require_XMLWriterBase();
      module2.exports = XMLStringWriter = function(superClass) {
        extend(XMLStringWriter2, superClass);
        function XMLStringWriter2(options) {
          XMLStringWriter2.__super__.constructor.call(this, options);
        }
        XMLStringWriter2.prototype.document = function(doc, options) {
          var child, i2, len, r2, ref;
          options = this.filterOptions(options);
          r2 = "";
          ref = doc.children;
          for (i2 = 0, len = ref.length; i2 < len; i2++) {
            child = ref[i2];
            r2 += this.writeChildNode(child, options, 0);
          }
          if (options.pretty && r2.slice(-options.newline.length) === options.newline) {
            r2 = r2.slice(0, -options.newline.length);
          }
          return r2;
        };
        return XMLStringWriter2;
      }(XMLWriterBase);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDocument.js
var require_XMLDocument = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDocument.js"(exports2, module2) {
    (function() {
      var NodeType, XMLDOMConfiguration, XMLDOMImplementation, XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      isPlainObject = require_Utility().isPlainObject;
      XMLDOMImplementation = require_XMLDOMImplementation();
      XMLDOMConfiguration = require_XMLDOMConfiguration();
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      XMLStringifier = require_XMLStringifier();
      XMLStringWriter = require_XMLStringWriter();
      module2.exports = XMLDocument = function(superClass) {
        extend(XMLDocument2, superClass);
        function XMLDocument2(options) {
          XMLDocument2.__super__.constructor.call(this, null);
          this.name = "#document";
          this.type = NodeType.Document;
          this.documentURI = null;
          this.domConfig = new XMLDOMConfiguration();
          options || (options = {});
          if (!options.writer) {
            options.writer = new XMLStringWriter();
          }
          this.options = options;
          this.stringify = new XMLStringifier(options);
        }
        Object.defineProperty(XMLDocument2.prototype, "implementation", {
          value: new XMLDOMImplementation()
        });
        Object.defineProperty(XMLDocument2.prototype, "doctype", {
          get: function() {
            var child, i2, len, ref;
            ref = this.children;
            for (i2 = 0, len = ref.length; i2 < len; i2++) {
              child = ref[i2];
              if (child.type === NodeType.DocType) {
                return child;
              }
            }
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "documentElement", {
          get: function() {
            return this.rootObject || null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "inputEncoding", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "strictErrorChecking", {
          get: function() {
            return false;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "xmlEncoding", {
          get: function() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].encoding;
            } else {
              return null;
            }
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "xmlStandalone", {
          get: function() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].standalone === "yes";
            } else {
              return false;
            }
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "xmlVersion", {
          get: function() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].version;
            } else {
              return "1.0";
            }
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "URL", {
          get: function() {
            return this.documentURI;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "origin", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "compatMode", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "characterSet", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "contentType", {
          get: function() {
            return null;
          }
        });
        XMLDocument2.prototype.end = function(writer) {
          var writerOptions;
          writerOptions = {};
          if (!writer) {
            writer = this.options.writer;
          } else if (isPlainObject(writer)) {
            writerOptions = writer;
            writer = this.options.writer;
          }
          return writer.document(this, writer.filterOptions(writerOptions));
        };
        XMLDocument2.prototype.toString = function(options) {
          return this.options.writer.document(this, this.options.writer.filterOptions(options));
        };
        XMLDocument2.prototype.createElement = function(tagName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createDocumentFragment = function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createTextNode = function(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createComment = function(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createCDATASection = function(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createProcessingInstruction = function(target, data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createAttribute = function(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createEntityReference = function(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.getElementsByTagName = function(tagname) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.importNode = function(importedNode, deep) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createElementNS = function(namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.getElementById = function(elementId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.adoptNode = function(source) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.normalizeDocument = function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.getElementsByClassName = function(classNames) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createEvent = function(eventInterface) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createRange = function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createNodeIterator = function(root, whatToShow, filter) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createTreeWalker = function(root, whatToShow, filter) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        return XMLDocument2;
      }(XMLNode);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLDocumentCB.js
var require_XMLDocumentCB = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDocumentCB.js"(exports2, module2) {
    (function() {
      var NodeType, WriterState, XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocument, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction, isObject, isPlainObject, ref, hasProp = {}.hasOwnProperty;
      ref = require_Utility(), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;
      NodeType = require_NodeType();
      XMLDocument = require_XMLDocument();
      XMLElement = require_XMLElement();
      XMLCData = require_XMLCData();
      XMLComment = require_XMLComment();
      XMLRaw = require_XMLRaw();
      XMLText = require_XMLText();
      XMLProcessingInstruction = require_XMLProcessingInstruction();
      XMLDeclaration = require_XMLDeclaration();
      XMLDocType = require_XMLDocType();
      XMLDTDAttList = require_XMLDTDAttList();
      XMLDTDEntity = require_XMLDTDEntity();
      XMLDTDElement = require_XMLDTDElement();
      XMLDTDNotation = require_XMLDTDNotation();
      XMLAttribute = require_XMLAttribute();
      XMLStringifier = require_XMLStringifier();
      XMLStringWriter = require_XMLStringWriter();
      WriterState = require_WriterState();
      module2.exports = XMLDocumentCB = function() {
        function XMLDocumentCB2(options, onData, onEnd) {
          var writerOptions;
          this.name = "?xml";
          this.type = NodeType.Document;
          options || (options = {});
          writerOptions = {};
          if (!options.writer) {
            options.writer = new XMLStringWriter();
          } else if (isPlainObject(options.writer)) {
            writerOptions = options.writer;
            options.writer = new XMLStringWriter();
          }
          this.options = options;
          this.writer = options.writer;
          this.writerOptions = this.writer.filterOptions(writerOptions);
          this.stringify = new XMLStringifier(options);
          this.onDataCallback = onData || function() {
          };
          this.onEndCallback = onEnd || function() {
          };
          this.currentNode = null;
          this.currentLevel = -1;
          this.openTags = {};
          this.documentStarted = false;
          this.documentCompleted = false;
          this.root = null;
        }
        XMLDocumentCB2.prototype.createChildNode = function(node) {
          var att, attName, attributes, child, i2, len, ref1, ref2;
          switch (node.type) {
            case NodeType.CData:
              this.cdata(node.value);
              break;
            case NodeType.Comment:
              this.comment(node.value);
              break;
            case NodeType.Element:
              attributes = {};
              ref1 = node.attribs;
              for (attName in ref1) {
                if (!hasProp.call(ref1, attName))
                  continue;
                att = ref1[attName];
                attributes[attName] = att.value;
              }
              this.node(node.name, attributes);
              break;
            case NodeType.Dummy:
              this.dummy();
              break;
            case NodeType.Raw:
              this.raw(node.value);
              break;
            case NodeType.Text:
              this.text(node.value);
              break;
            case NodeType.ProcessingInstruction:
              this.instruction(node.target, node.value);
              break;
            default:
              throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
          }
          ref2 = node.children;
          for (i2 = 0, len = ref2.length; i2 < len; i2++) {
            child = ref2[i2];
            this.createChildNode(child);
            if (child.type === NodeType.Element) {
              this.up();
            }
          }
          return this;
        };
        XMLDocumentCB2.prototype.dummy = function() {
          return this;
        };
        XMLDocumentCB2.prototype.node = function(name, attributes, text) {
          var ref1;
          if (name == null) {
            throw new Error("Missing node name.");
          }
          if (this.root && this.currentLevel === -1) {
            throw new Error("Document can only have one root node. " + this.debugInfo(name));
          }
          this.openCurrent();
          name = getValue(name);
          if (attributes == null) {
            attributes = {};
          }
          attributes = getValue(attributes);
          if (!isObject(attributes)) {
            ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
          }
          this.currentNode = new XMLElement(this, name, attributes);
          this.currentNode.children = false;
          this.currentLevel++;
          this.openTags[this.currentLevel] = this.currentNode;
          if (text != null) {
            this.text(text);
          }
          return this;
        };
        XMLDocumentCB2.prototype.element = function(name, attributes, text) {
          var child, i2, len, oldValidationFlag, ref1, root;
          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            this.dtdElement.apply(this, arguments);
          } else {
            if (Array.isArray(name) || isObject(name) || isFunction(name)) {
              oldValidationFlag = this.options.noValidation;
              this.options.noValidation = true;
              root = new XMLDocument(this.options).element("TEMP_ROOT");
              root.element(name);
              this.options.noValidation = oldValidationFlag;
              ref1 = root.children;
              for (i2 = 0, len = ref1.length; i2 < len; i2++) {
                child = ref1[i2];
                this.createChildNode(child);
                if (child.type === NodeType.Element) {
                  this.up();
                }
              }
            } else {
              this.node(name, attributes, text);
            }
          }
          return this;
        };
        XMLDocumentCB2.prototype.attribute = function(name, value) {
          var attName, attValue;
          if (!this.currentNode || this.currentNode.children) {
            throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
          }
          if (name != null) {
            name = getValue(name);
          }
          if (isObject(name)) {
            for (attName in name) {
              if (!hasProp.call(name, attName))
                continue;
              attValue = name[attName];
              this.attribute(attName, attValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            if (this.options.keepNullAttributes && value == null) {
              this.currentNode.attribs[name] = new XMLAttribute(this, name, "");
            } else if (value != null) {
              this.currentNode.attribs[name] = new XMLAttribute(this, name, value);
            }
          }
          return this;
        };
        XMLDocumentCB2.prototype.text = function(value) {
          var node;
          this.openCurrent();
          node = new XMLText(this, value);
          this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.cdata = function(value) {
          var node;
          this.openCurrent();
          node = new XMLCData(this, value);
          this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.comment = function(value) {
          var node;
          this.openCurrent();
          node = new XMLComment(this, value);
          this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.raw = function(value) {
          var node;
          this.openCurrent();
          node = new XMLRaw(this, value);
          this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.instruction = function(target, value) {
          var i2, insTarget, insValue, len, node;
          this.openCurrent();
          if (target != null) {
            target = getValue(target);
          }
          if (value != null) {
            value = getValue(value);
          }
          if (Array.isArray(target)) {
            for (i2 = 0, len = target.length; i2 < len; i2++) {
              insTarget = target[i2];
              this.instruction(insTarget);
            }
          } else if (isObject(target)) {
            for (insTarget in target) {
              if (!hasProp.call(target, insTarget))
                continue;
              insValue = target[insTarget];
              this.instruction(insTarget, insValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            node = new XMLProcessingInstruction(this, target, value);
            this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          }
          return this;
        };
        XMLDocumentCB2.prototype.declaration = function(version, encoding, standalone) {
          var node;
          this.openCurrent();
          if (this.documentStarted) {
            throw new Error("declaration() must be the first node.");
          }
          node = new XMLDeclaration(this, version, encoding, standalone);
          this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.doctype = function(root, pubID, sysID) {
          this.openCurrent();
          if (root == null) {
            throw new Error("Missing root node name.");
          }
          if (this.root) {
            throw new Error("dtd() must come before the root node.");
          }
          this.currentNode = new XMLDocType(this, pubID, sysID);
          this.currentNode.rootNodeName = root;
          this.currentNode.children = false;
          this.currentLevel++;
          this.openTags[this.currentLevel] = this.currentNode;
          return this;
        };
        XMLDocumentCB2.prototype.dtdElement = function(name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDElement(this, name, value);
          this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          var node;
          this.openCurrent();
          node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
          this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.entity = function(name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDEntity(this, false, name, value);
          this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.pEntity = function(name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDEntity(this, true, name, value);
          this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.notation = function(name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDNotation(this, name, value);
          this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.up = function() {
          if (this.currentLevel < 0) {
            throw new Error("The document node has no parent.");
          }
          if (this.currentNode) {
            if (this.currentNode.children) {
              this.closeNode(this.currentNode);
            } else {
              this.openNode(this.currentNode);
            }
            this.currentNode = null;
          } else {
            this.closeNode(this.openTags[this.currentLevel]);
          }
          delete this.openTags[this.currentLevel];
          this.currentLevel--;
          return this;
        };
        XMLDocumentCB2.prototype.end = function() {
          while (this.currentLevel >= 0) {
            this.up();
          }
          return this.onEnd();
        };
        XMLDocumentCB2.prototype.openCurrent = function() {
          if (this.currentNode) {
            this.currentNode.children = true;
            return this.openNode(this.currentNode);
          }
        };
        XMLDocumentCB2.prototype.openNode = function(node) {
          var att, chunk, name, ref1;
          if (!node.isOpen) {
            if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) {
              this.root = node;
            }
            chunk = "";
            if (node.type === NodeType.Element) {
              this.writerOptions.state = WriterState.OpenTag;
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<" + node.name;
              ref1 = node.attribs;
              for (name in ref1) {
                if (!hasProp.call(ref1, name))
                  continue;
                att = ref1[name];
                chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
              }
              chunk += (node.children ? ">" : "/>") + this.writer.endline(node, this.writerOptions, this.currentLevel);
              this.writerOptions.state = WriterState.InsideTag;
            } else {
              this.writerOptions.state = WriterState.OpenTag;
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + node.rootNodeName;
              if (node.pubID && node.sysID) {
                chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
              } else if (node.sysID) {
                chunk += ' SYSTEM "' + node.sysID + '"';
              }
              if (node.children) {
                chunk += " [";
                this.writerOptions.state = WriterState.InsideTag;
              } else {
                this.writerOptions.state = WriterState.CloseTag;
                chunk += ">";
              }
              chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
            }
            this.onData(chunk, this.currentLevel);
            return node.isOpen = true;
          }
        };
        XMLDocumentCB2.prototype.closeNode = function(node) {
          var chunk;
          if (!node.isClosed) {
            chunk = "";
            this.writerOptions.state = WriterState.CloseTag;
            if (node.type === NodeType.Element) {
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "</" + node.name + ">" + this.writer.endline(node, this.writerOptions, this.currentLevel);
            } else {
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(node, this.writerOptions, this.currentLevel);
            }
            this.writerOptions.state = WriterState.None;
            this.onData(chunk, this.currentLevel);
            return node.isClosed = true;
          }
        };
        XMLDocumentCB2.prototype.onData = function(chunk, level) {
          this.documentStarted = true;
          return this.onDataCallback(chunk, level + 1);
        };
        XMLDocumentCB2.prototype.onEnd = function() {
          this.documentCompleted = true;
          return this.onEndCallback();
        };
        XMLDocumentCB2.prototype.debugInfo = function(name) {
          if (name == null) {
            return "";
          } else {
            return "node: <" + name + ">";
          }
        };
        XMLDocumentCB2.prototype.ele = function() {
          return this.element.apply(this, arguments);
        };
        XMLDocumentCB2.prototype.nod = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLDocumentCB2.prototype.txt = function(value) {
          return this.text(value);
        };
        XMLDocumentCB2.prototype.dat = function(value) {
          return this.cdata(value);
        };
        XMLDocumentCB2.prototype.com = function(value) {
          return this.comment(value);
        };
        XMLDocumentCB2.prototype.ins = function(target, value) {
          return this.instruction(target, value);
        };
        XMLDocumentCB2.prototype.dec = function(version, encoding, standalone) {
          return this.declaration(version, encoding, standalone);
        };
        XMLDocumentCB2.prototype.dtd = function(root, pubID, sysID) {
          return this.doctype(root, pubID, sysID);
        };
        XMLDocumentCB2.prototype.e = function(name, attributes, text) {
          return this.element(name, attributes, text);
        };
        XMLDocumentCB2.prototype.n = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLDocumentCB2.prototype.t = function(value) {
          return this.text(value);
        };
        XMLDocumentCB2.prototype.d = function(value) {
          return this.cdata(value);
        };
        XMLDocumentCB2.prototype.c = function(value) {
          return this.comment(value);
        };
        XMLDocumentCB2.prototype.r = function(value) {
          return this.raw(value);
        };
        XMLDocumentCB2.prototype.i = function(target, value) {
          return this.instruction(target, value);
        };
        XMLDocumentCB2.prototype.att = function() {
          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            return this.attList.apply(this, arguments);
          } else {
            return this.attribute.apply(this, arguments);
          }
        };
        XMLDocumentCB2.prototype.a = function() {
          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            return this.attList.apply(this, arguments);
          } else {
            return this.attribute.apply(this, arguments);
          }
        };
        XMLDocumentCB2.prototype.ent = function(name, value) {
          return this.entity(name, value);
        };
        XMLDocumentCB2.prototype.pent = function(name, value) {
          return this.pEntity(name, value);
        };
        XMLDocumentCB2.prototype.not = function(name, value) {
          return this.notation(name, value);
        };
        return XMLDocumentCB2;
      }();
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/XMLStreamWriter.js
var require_XMLStreamWriter = __commonJS({
  "node_modules/xmlbuilder/lib/XMLStreamWriter.js"(exports2, module2) {
    (function() {
      var NodeType, WriterState, XMLStreamWriter, XMLWriterBase, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLWriterBase = require_XMLWriterBase();
      WriterState = require_WriterState();
      module2.exports = XMLStreamWriter = function(superClass) {
        extend(XMLStreamWriter2, superClass);
        function XMLStreamWriter2(stream, options) {
          this.stream = stream;
          XMLStreamWriter2.__super__.constructor.call(this, options);
        }
        XMLStreamWriter2.prototype.endline = function(node, options, level) {
          if (node.isLastRootNode && options.state === WriterState.CloseTag) {
            return "";
          } else {
            return XMLStreamWriter2.__super__.endline.call(this, node, options, level);
          }
        };
        XMLStreamWriter2.prototype.document = function(doc, options) {
          var child, i2, j2, k2, len, len1, ref, ref1, results;
          ref = doc.children;
          for (i2 = j2 = 0, len = ref.length; j2 < len; i2 = ++j2) {
            child = ref[i2];
            child.isLastRootNode = i2 === doc.children.length - 1;
          }
          options = this.filterOptions(options);
          ref1 = doc.children;
          results = [];
          for (k2 = 0, len1 = ref1.length; k2 < len1; k2++) {
            child = ref1[k2];
            results.push(this.writeChildNode(child, options, 0));
          }
          return results;
        };
        XMLStreamWriter2.prototype.attribute = function(att, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.attribute.call(this, att, options, level));
        };
        XMLStreamWriter2.prototype.cdata = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.cdata.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.comment = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.comment.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.declaration = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.declaration.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.docType = function(node, options, level) {
          var child, j2, len, ref;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          this.stream.write(this.indent(node, options, level));
          this.stream.write("<!DOCTYPE " + node.root().name);
          if (node.pubID && node.sysID) {
            this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
          } else if (node.sysID) {
            this.stream.write(' SYSTEM "' + node.sysID + '"');
          }
          if (node.children.length > 0) {
            this.stream.write(" [");
            this.stream.write(this.endline(node, options, level));
            options.state = WriterState.InsideTag;
            ref = node.children;
            for (j2 = 0, len = ref.length; j2 < len; j2++) {
              child = ref[j2];
              this.writeChildNode(child, options, level + 1);
            }
            options.state = WriterState.CloseTag;
            this.stream.write("]");
          }
          options.state = WriterState.CloseTag;
          this.stream.write(options.spaceBeforeSlash + ">");
          this.stream.write(this.endline(node, options, level));
          options.state = WriterState.None;
          return this.closeNode(node, options, level);
        };
        XMLStreamWriter2.prototype.element = function(node, options, level) {
          var att, child, childNodeCount, firstChildNode, j2, len, name, prettySuppressed, ref, ref1;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          this.stream.write(this.indent(node, options, level) + "<" + node.name);
          ref = node.attribs;
          for (name in ref) {
            if (!hasProp.call(ref, name))
              continue;
            att = ref[name];
            this.attribute(att, options, level);
          }
          childNodeCount = node.children.length;
          firstChildNode = childNodeCount === 0 ? null : node.children[0];
          if (childNodeCount === 0 || node.children.every(function(e3) {
            return (e3.type === NodeType.Text || e3.type === NodeType.Raw) && e3.value === "";
          })) {
            if (options.allowEmpty) {
              this.stream.write(">");
              options.state = WriterState.CloseTag;
              this.stream.write("</" + node.name + ">");
            } else {
              options.state = WriterState.CloseTag;
              this.stream.write(options.spaceBeforeSlash + "/>");
            }
          } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && firstChildNode.value != null) {
            this.stream.write(">");
            options.state = WriterState.InsideTag;
            options.suppressPrettyCount++;
            prettySuppressed = true;
            this.writeChildNode(firstChildNode, options, level + 1);
            options.suppressPrettyCount--;
            prettySuppressed = false;
            options.state = WriterState.CloseTag;
            this.stream.write("</" + node.name + ">");
          } else {
            this.stream.write(">" + this.endline(node, options, level));
            options.state = WriterState.InsideTag;
            ref1 = node.children;
            for (j2 = 0, len = ref1.length; j2 < len; j2++) {
              child = ref1[j2];
              this.writeChildNode(child, options, level + 1);
            }
            options.state = WriterState.CloseTag;
            this.stream.write(this.indent(node, options, level) + "</" + node.name + ">");
          }
          this.stream.write(this.endline(node, options, level));
          options.state = WriterState.None;
          return this.closeNode(node, options, level);
        };
        XMLStreamWriter2.prototype.processingInstruction = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.processingInstruction.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.raw = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.raw.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.text = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.text.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.dtdAttList = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.dtdAttList.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.dtdElement = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.dtdElement.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.dtdEntity = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.dtdEntity.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.dtdNotation = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.dtdNotation.call(this, node, options, level));
        };
        return XMLStreamWriter2;
      }(XMLWriterBase);
    }).call(exports2);
  }
});

// node_modules/xmlbuilder/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/xmlbuilder/lib/index.js"(exports2, module2) {
    (function() {
      var NodeType, WriterState, XMLDOMImplementation, XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;
      ref = require_Utility(), assign = ref.assign, isFunction = ref.isFunction;
      XMLDOMImplementation = require_XMLDOMImplementation();
      XMLDocument = require_XMLDocument();
      XMLDocumentCB = require_XMLDocumentCB();
      XMLStringWriter = require_XMLStringWriter();
      XMLStreamWriter = require_XMLStreamWriter();
      NodeType = require_NodeType();
      WriterState = require_WriterState();
      module2.exports.create = function(name, xmldec, doctype, options) {
        var doc, root;
        if (name == null) {
          throw new Error("Root element needs a name.");
        }
        options = assign({}, xmldec, doctype, options);
        doc = new XMLDocument(options);
        root = doc.element(name);
        if (!options.headless) {
          doc.declaration(options);
          if (options.pubID != null || options.sysID != null) {
            doc.dtd(options);
          }
        }
        return root;
      };
      module2.exports.begin = function(options, onData, onEnd) {
        var ref1;
        if (isFunction(options)) {
          ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
          options = {};
        }
        if (onData) {
          return new XMLDocumentCB(options, onData, onEnd);
        } else {
          return new XMLDocument(options);
        }
      };
      module2.exports.stringWriter = function(options) {
        return new XMLStringWriter(options);
      };
      module2.exports.streamWriter = function(stream, options) {
        return new XMLStreamWriter(stream, options);
      };
      module2.exports.implementation = new XMLDOMImplementation();
      module2.exports.nodeType = NodeType;
      module2.exports.writerState = WriterState;
    }).call(exports2);
  }
});

// node_modules/xml2js/lib/builder.js
var require_builder = __commonJS({
  "node_modules/xml2js/lib/builder.js"(exports2) {
    (function() {
      "use strict";
      var builder, defaults, escapeCDATA, requiresCDATA, wrapCDATA, hasProp = {}.hasOwnProperty;
      builder = require_lib2();
      defaults = require_defaults().defaults;
      requiresCDATA = function(entry) {
        return typeof entry === "string" && (entry.indexOf("&") >= 0 || entry.indexOf(">") >= 0 || entry.indexOf("<") >= 0);
      };
      wrapCDATA = function(entry) {
        return "<![CDATA[" + escapeCDATA(entry) + "]]>";
      };
      escapeCDATA = function(entry) {
        return entry.replace("]]>", "]]]]><![CDATA[>");
      };
      exports2.Builder = function() {
        function Builder(opts) {
          var key, ref, value;
          this.options = {};
          ref = defaults["0.2"];
          for (key in ref) {
            if (!hasProp.call(ref, key))
              continue;
            value = ref[key];
            this.options[key] = value;
          }
          for (key in opts) {
            if (!hasProp.call(opts, key))
              continue;
            value = opts[key];
            this.options[key] = value;
          }
        }
        Builder.prototype.buildObject = function(rootObj) {
          var attrkey, charkey, render, rootElement, rootName;
          attrkey = this.options.attrkey;
          charkey = this.options.charkey;
          if (Object.keys(rootObj).length === 1 && this.options.rootName === defaults["0.2"].rootName) {
            rootName = Object.keys(rootObj)[0];
            rootObj = rootObj[rootName];
          } else {
            rootName = this.options.rootName;
          }
          render = function(_this) {
            return function(element, obj) {
              var attr, child, entry, index, key, value;
              if (typeof obj !== "object") {
                if (_this.options.cdata && requiresCDATA(obj)) {
                  element.raw(wrapCDATA(obj));
                } else {
                  element.txt(obj);
                }
              } else if (Array.isArray(obj)) {
                for (index in obj) {
                  if (!hasProp.call(obj, index))
                    continue;
                  child = obj[index];
                  for (key in child) {
                    entry = child[key];
                    element = render(element.ele(key), entry).up();
                  }
                }
              } else {
                for (key in obj) {
                  if (!hasProp.call(obj, key))
                    continue;
                  child = obj[key];
                  if (key === attrkey) {
                    if (typeof child === "object") {
                      for (attr in child) {
                        value = child[attr];
                        element = element.att(attr, value);
                      }
                    }
                  } else if (key === charkey) {
                    if (_this.options.cdata && requiresCDATA(child)) {
                      element = element.raw(wrapCDATA(child));
                    } else {
                      element = element.txt(child);
                    }
                  } else if (Array.isArray(child)) {
                    for (index in child) {
                      if (!hasProp.call(child, index))
                        continue;
                      entry = child[index];
                      if (typeof entry === "string") {
                        if (_this.options.cdata && requiresCDATA(entry)) {
                          element = element.ele(key).raw(wrapCDATA(entry)).up();
                        } else {
                          element = element.ele(key, entry).up();
                        }
                      } else {
                        element = render(element.ele(key), entry).up();
                      }
                    }
                  } else if (typeof child === "object") {
                    element = render(element.ele(key), child).up();
                  } else {
                    if (typeof child === "string" && _this.options.cdata && requiresCDATA(child)) {
                      element = element.ele(key).raw(wrapCDATA(child)).up();
                    } else {
                      if (child == null) {
                        child = "";
                      }
                      element = element.ele(key, child.toString()).up();
                    }
                  }
                }
              }
              return element;
            };
          }(this);
          rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
            headless: this.options.headless,
            allowSurrogateChars: this.options.allowSurrogateChars
          });
          return render(rootElement, rootObj).end(this.options.renderOpts);
        };
        return Builder;
      }();
    }).call(exports2);
  }
});

// node_modules/sax/lib/sax.js
var require_sax = __commonJS({
  "node_modules/sax/lib/sax.js"(exports2) {
    (function(sax) {
      sax.parser = function(strict, opt) {
        return new SAXParser(strict, opt);
      };
      sax.SAXParser = SAXParser;
      sax.SAXStream = SAXStream;
      sax.createStream = createStream;
      sax.MAX_BUFFER_LENGTH = 64 * 1024;
      var buffers = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      sax.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
          return new SAXParser(strict, opt);
        }
        var parser = this;
        clearBuffers(parser);
        parser.q = parser.c = "";
        parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
        parser.opt = opt || {};
        parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
        parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
        parser.tags = [];
        parser.closed = parser.closedRoot = parser.sawRoot = false;
        parser.tag = parser.error = null;
        parser.strict = !!strict;
        parser.noscript = !!(strict || parser.opt.noscript);
        parser.state = S2.BEGIN;
        parser.strictEntities = parser.opt.strictEntities;
        parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
        parser.attribList = [];
        if (parser.opt.xmlns) {
          parser.ns = Object.create(rootNS);
        }
        parser.trackPosition = parser.opt.position !== false;
        if (parser.trackPosition) {
          parser.position = parser.line = parser.column = 0;
        }
        emit(parser, "onready");
      }
      if (!Object.create) {
        Object.create = function(o2) {
          function F2() {
          }
          F2.prototype = o2;
          var newf = new F2();
          return newf;
        };
      }
      if (!Object.keys) {
        Object.keys = function(o2) {
          var a2 = [];
          for (var i2 in o2)
            if (o2.hasOwnProperty(i2))
              a2.push(i2);
          return a2;
        };
      }
      function checkBufferLength(parser) {
        var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;
        for (var i2 = 0, l2 = buffers.length; i2 < l2; i2++) {
          var len = parser[buffers[i2]].length;
          if (len > maxAllowed) {
            switch (buffers[i2]) {
              case "textNode":
                closeText(parser);
                break;
              case "cdata":
                emitNode(parser, "oncdata", parser.cdata);
                parser.cdata = "";
                break;
              case "script":
                emitNode(parser, "onscript", parser.script);
                parser.script = "";
                break;
              default:
                error(parser, "Max buffer length exceeded: " + buffers[i2]);
            }
          }
          maxActual = Math.max(maxActual, len);
        }
        var m2 = sax.MAX_BUFFER_LENGTH - maxActual;
        parser.bufferCheckPosition = m2 + parser.position;
      }
      function clearBuffers(parser) {
        for (var i2 = 0, l2 = buffers.length; i2 < l2; i2++) {
          parser[buffers[i2]] = "";
        }
      }
      function flushBuffers(parser) {
        closeText(parser);
        if (parser.cdata !== "") {
          emitNode(parser, "oncdata", parser.cdata);
          parser.cdata = "";
        }
        if (parser.script !== "") {
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
      }
      SAXParser.prototype = {
        end: function() {
          end(this);
        },
        write,
        resume: function() {
          this.error = null;
          return this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          flushBuffers(this);
        }
      };
      var Stream;
      try {
        Stream = require("stream").Stream;
      } catch (ex) {
        Stream = function() {
        };
      }
      var streamWraps = sax.EVENTS.filter(function(ev) {
        return ev !== "error" && ev !== "end";
      });
      function createStream(strict, opt) {
        return new SAXStream(strict, opt);
      }
      function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
          return new SAXStream(strict, opt);
        }
        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me2 = this;
        this._parser.onend = function() {
          me2.emit("end");
        };
        this._parser.onerror = function(er2) {
          me2.emit("error", er2);
          me2._parser.error = null;
        };
        this._decoder = null;
        streamWraps.forEach(function(ev) {
          Object.defineProperty(me2, "on" + ev, {
            get: function() {
              return me2._parser["on" + ev];
            },
            set: function(h2) {
              if (!h2) {
                me2.removeAllListeners(ev);
                me2._parser["on" + ev] = h2;
                return h2;
              }
              me2.on(ev, h2);
            },
            enumerable: true,
            configurable: false
          });
        });
      }
      SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
          value: SAXStream
        }
      });
      SAXStream.prototype.write = function(data) {
        if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
          if (!this._decoder) {
            var SD = require("string_decoder").StringDecoder;
            this._decoder = new SD("utf8");
          }
          data = this._decoder.write(data);
        }
        this._parser.write(data.toString());
        this.emit("data", data);
        return true;
      };
      SAXStream.prototype.end = function(chunk) {
        if (chunk && chunk.length) {
          this.write(chunk);
        }
        this._parser.end();
        return true;
      };
      SAXStream.prototype.on = function(ev, handler) {
        var me2 = this;
        if (!me2._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
          me2._parser["on" + ev] = function() {
            var args2 = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
            args2.splice(0, 0, ev);
            me2.emit.apply(me2, args2);
          };
        }
        return Stream.prototype.on.call(me2, ev, handler);
      };
      var CDATA = "[CDATA[";
      var DOCTYPE = "DOCTYPE";
      var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
      var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
      var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
      var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function isWhitespace(c2) {
        return c2 === " " || c2 === "\n" || c2 === "\r" || c2 === "	";
      }
      function isQuote(c2) {
        return c2 === '"' || c2 === "'";
      }
      function isAttribEnd(c2) {
        return c2 === ">" || isWhitespace(c2);
      }
      function isMatch(regex, c2) {
        return regex.test(c2);
      }
      function notMatch(regex, c2) {
        return !isMatch(regex, c2);
      }
      var S2 = 0;
      sax.STATE = {
        BEGIN: S2++,
        BEGIN_WHITESPACE: S2++,
        TEXT: S2++,
        TEXT_ENTITY: S2++,
        OPEN_WAKA: S2++,
        SGML_DECL: S2++,
        SGML_DECL_QUOTED: S2++,
        DOCTYPE: S2++,
        DOCTYPE_QUOTED: S2++,
        DOCTYPE_DTD: S2++,
        DOCTYPE_DTD_QUOTED: S2++,
        COMMENT_STARTING: S2++,
        COMMENT: S2++,
        COMMENT_ENDING: S2++,
        COMMENT_ENDED: S2++,
        CDATA: S2++,
        CDATA_ENDING: S2++,
        CDATA_ENDING_2: S2++,
        PROC_INST: S2++,
        PROC_INST_BODY: S2++,
        PROC_INST_ENDING: S2++,
        OPEN_TAG: S2++,
        OPEN_TAG_SLASH: S2++,
        ATTRIB: S2++,
        ATTRIB_NAME: S2++,
        ATTRIB_NAME_SAW_WHITE: S2++,
        ATTRIB_VALUE: S2++,
        ATTRIB_VALUE_QUOTED: S2++,
        ATTRIB_VALUE_CLOSED: S2++,
        ATTRIB_VALUE_UNQUOTED: S2++,
        ATTRIB_VALUE_ENTITY_Q: S2++,
        ATTRIB_VALUE_ENTITY_U: S2++,
        CLOSE_TAG: S2++,
        CLOSE_TAG_SAW_WHITE: S2++,
        SCRIPT: S2++,
        SCRIPT_ENDING: S2++
      };
      sax.XML_ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'"
      };
      sax.ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'",
        "AElig": 198,
        "Aacute": 193,
        "Acirc": 194,
        "Agrave": 192,
        "Aring": 197,
        "Atilde": 195,
        "Auml": 196,
        "Ccedil": 199,
        "ETH": 208,
        "Eacute": 201,
        "Ecirc": 202,
        "Egrave": 200,
        "Euml": 203,
        "Iacute": 205,
        "Icirc": 206,
        "Igrave": 204,
        "Iuml": 207,
        "Ntilde": 209,
        "Oacute": 211,
        "Ocirc": 212,
        "Ograve": 210,
        "Oslash": 216,
        "Otilde": 213,
        "Ouml": 214,
        "THORN": 222,
        "Uacute": 218,
        "Ucirc": 219,
        "Ugrave": 217,
        "Uuml": 220,
        "Yacute": 221,
        "aacute": 225,
        "acirc": 226,
        "aelig": 230,
        "agrave": 224,
        "aring": 229,
        "atilde": 227,
        "auml": 228,
        "ccedil": 231,
        "eacute": 233,
        "ecirc": 234,
        "egrave": 232,
        "eth": 240,
        "euml": 235,
        "iacute": 237,
        "icirc": 238,
        "igrave": 236,
        "iuml": 239,
        "ntilde": 241,
        "oacute": 243,
        "ocirc": 244,
        "ograve": 242,
        "oslash": 248,
        "otilde": 245,
        "ouml": 246,
        "szlig": 223,
        "thorn": 254,
        "uacute": 250,
        "ucirc": 251,
        "ugrave": 249,
        "uuml": 252,
        "yacute": 253,
        "yuml": 255,
        "copy": 169,
        "reg": 174,
        "nbsp": 160,
        "iexcl": 161,
        "cent": 162,
        "pound": 163,
        "curren": 164,
        "yen": 165,
        "brvbar": 166,
        "sect": 167,
        "uml": 168,
        "ordf": 170,
        "laquo": 171,
        "not": 172,
        "shy": 173,
        "macr": 175,
        "deg": 176,
        "plusmn": 177,
        "sup1": 185,
        "sup2": 178,
        "sup3": 179,
        "acute": 180,
        "micro": 181,
        "para": 182,
        "middot": 183,
        "cedil": 184,
        "ordm": 186,
        "raquo": 187,
        "frac14": 188,
        "frac12": 189,
        "frac34": 190,
        "iquest": 191,
        "times": 215,
        "divide": 247,
        "OElig": 338,
        "oelig": 339,
        "Scaron": 352,
        "scaron": 353,
        "Yuml": 376,
        "fnof": 402,
        "circ": 710,
        "tilde": 732,
        "Alpha": 913,
        "Beta": 914,
        "Gamma": 915,
        "Delta": 916,
        "Epsilon": 917,
        "Zeta": 918,
        "Eta": 919,
        "Theta": 920,
        "Iota": 921,
        "Kappa": 922,
        "Lambda": 923,
        "Mu": 924,
        "Nu": 925,
        "Xi": 926,
        "Omicron": 927,
        "Pi": 928,
        "Rho": 929,
        "Sigma": 931,
        "Tau": 932,
        "Upsilon": 933,
        "Phi": 934,
        "Chi": 935,
        "Psi": 936,
        "Omega": 937,
        "alpha": 945,
        "beta": 946,
        "gamma": 947,
        "delta": 948,
        "epsilon": 949,
        "zeta": 950,
        "eta": 951,
        "theta": 952,
        "iota": 953,
        "kappa": 954,
        "lambda": 955,
        "mu": 956,
        "nu": 957,
        "xi": 958,
        "omicron": 959,
        "pi": 960,
        "rho": 961,
        "sigmaf": 962,
        "sigma": 963,
        "tau": 964,
        "upsilon": 965,
        "phi": 966,
        "chi": 967,
        "psi": 968,
        "omega": 969,
        "thetasym": 977,
        "upsih": 978,
        "piv": 982,
        "ensp": 8194,
        "emsp": 8195,
        "thinsp": 8201,
        "zwnj": 8204,
        "zwj": 8205,
        "lrm": 8206,
        "rlm": 8207,
        "ndash": 8211,
        "mdash": 8212,
        "lsquo": 8216,
        "rsquo": 8217,
        "sbquo": 8218,
        "ldquo": 8220,
        "rdquo": 8221,
        "bdquo": 8222,
        "dagger": 8224,
        "Dagger": 8225,
        "bull": 8226,
        "hellip": 8230,
        "permil": 8240,
        "prime": 8242,
        "Prime": 8243,
        "lsaquo": 8249,
        "rsaquo": 8250,
        "oline": 8254,
        "frasl": 8260,
        "euro": 8364,
        "image": 8465,
        "weierp": 8472,
        "real": 8476,
        "trade": 8482,
        "alefsym": 8501,
        "larr": 8592,
        "uarr": 8593,
        "rarr": 8594,
        "darr": 8595,
        "harr": 8596,
        "crarr": 8629,
        "lArr": 8656,
        "uArr": 8657,
        "rArr": 8658,
        "dArr": 8659,
        "hArr": 8660,
        "forall": 8704,
        "part": 8706,
        "exist": 8707,
        "empty": 8709,
        "nabla": 8711,
        "isin": 8712,
        "notin": 8713,
        "ni": 8715,
        "prod": 8719,
        "sum": 8721,
        "minus": 8722,
        "lowast": 8727,
        "radic": 8730,
        "prop": 8733,
        "infin": 8734,
        "ang": 8736,
        "and": 8743,
        "or": 8744,
        "cap": 8745,
        "cup": 8746,
        "int": 8747,
        "there4": 8756,
        "sim": 8764,
        "cong": 8773,
        "asymp": 8776,
        "ne": 8800,
        "equiv": 8801,
        "le": 8804,
        "ge": 8805,
        "sub": 8834,
        "sup": 8835,
        "nsub": 8836,
        "sube": 8838,
        "supe": 8839,
        "oplus": 8853,
        "otimes": 8855,
        "perp": 8869,
        "sdot": 8901,
        "lceil": 8968,
        "rceil": 8969,
        "lfloor": 8970,
        "rfloor": 8971,
        "lang": 9001,
        "rang": 9002,
        "loz": 9674,
        "spades": 9824,
        "clubs": 9827,
        "hearts": 9829,
        "diams": 9830
      };
      Object.keys(sax.ENTITIES).forEach(function(key) {
        var e3 = sax.ENTITIES[key];
        var s3 = typeof e3 === "number" ? String.fromCharCode(e3) : e3;
        sax.ENTITIES[key] = s3;
      });
      for (var s2 in sax.STATE) {
        sax.STATE[sax.STATE[s2]] = s2;
      }
      S2 = sax.STATE;
      function emit(parser, event, data) {
        parser[event] && parser[event](data);
      }
      function emitNode(parser, nodeType, data) {
        if (parser.textNode)
          closeText(parser);
        emit(parser, nodeType, data);
      }
      function closeText(parser) {
        parser.textNode = textopts(parser.opt, parser.textNode);
        if (parser.textNode)
          emit(parser, "ontext", parser.textNode);
        parser.textNode = "";
      }
      function textopts(opt, text) {
        if (opt.trim)
          text = text.trim();
        if (opt.normalize)
          text = text.replace(/\s+/g, " ");
        return text;
      }
      function error(parser, er2) {
        closeText(parser);
        if (parser.trackPosition) {
          er2 += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
        }
        er2 = new Error(er2);
        parser.error = er2;
        emit(parser, "onerror", er2);
        return parser;
      }
      function end(parser) {
        if (parser.sawRoot && !parser.closedRoot)
          strictFail(parser, "Unclosed root tag");
        if (parser.state !== S2.BEGIN && parser.state !== S2.BEGIN_WHITESPACE && parser.state !== S2.TEXT) {
          error(parser, "Unexpected end");
        }
        closeText(parser);
        parser.c = "";
        parser.closed = true;
        emit(parser, "onend");
        SAXParser.call(parser, parser.strict, parser.opt);
        return parser;
      }
      function strictFail(parser, message2) {
        if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
          throw new Error("bad call to strictFail");
        }
        if (parser.strict) {
          error(parser, message2);
        }
      }
      function newTag(parser) {
        if (!parser.strict)
          parser.tagName = parser.tagName[parser.looseCase]();
        var parent = parser.tags[parser.tags.length - 1] || parser;
        var tag = parser.tag = { name: parser.tagName, attributes: {} };
        if (parser.opt.xmlns) {
          tag.ns = parent.ns;
        }
        parser.attribList.length = 0;
        emitNode(parser, "onopentagstart", tag);
      }
      function qname(name, attribute) {
        var i2 = name.indexOf(":");
        var qualName = i2 < 0 ? ["", name] : name.split(":");
        var prefix = qualName[0];
        var local = qualName[1];
        if (attribute && name === "xmlns") {
          prefix = "xmlns";
          local = "";
        }
        return { prefix, local };
      }
      function attrib(parser) {
        if (!parser.strict) {
          parser.attribName = parser.attribName[parser.looseCase]();
        }
        if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
          parser.attribName = parser.attribValue = "";
          return;
        }
        if (parser.opt.xmlns) {
          var qn2 = qname(parser.attribName, true);
          var prefix = qn2.prefix;
          var local = qn2.local;
          if (prefix === "xmlns") {
            if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
              strictFail(parser, "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue);
            } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
              strictFail(parser, "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue);
            } else {
              var tag = parser.tag;
              var parent = parser.tags[parser.tags.length - 1] || parser;
              if (tag.ns === parent.ns) {
                tag.ns = Object.create(parent.ns);
              }
              tag.ns[local] = parser.attribValue;
            }
          }
          parser.attribList.push([parser.attribName, parser.attribValue]);
        } else {
          parser.tag.attributes[parser.attribName] = parser.attribValue;
          emitNode(parser, "onattribute", {
            name: parser.attribName,
            value: parser.attribValue
          });
        }
        parser.attribName = parser.attribValue = "";
      }
      function openTag(parser, selfClosing) {
        if (parser.opt.xmlns) {
          var tag = parser.tag;
          var qn2 = qname(parser.tagName);
          tag.prefix = qn2.prefix;
          tag.local = qn2.local;
          tag.uri = tag.ns[qn2.prefix] || "";
          if (tag.prefix && !tag.uri) {
            strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
            tag.uri = qn2.prefix;
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (tag.ns && parent.ns !== tag.ns) {
            Object.keys(tag.ns).forEach(function(p2) {
              emitNode(parser, "onopennamespace", {
                prefix: p2,
                uri: tag.ns[p2]
              });
            });
          }
          for (var i2 = 0, l2 = parser.attribList.length; i2 < l2; i2++) {
            var nv = parser.attribList[i2];
            var name = nv[0];
            var value = nv[1];
            var qualName = qname(name, true);
            var prefix = qualName.prefix;
            var local = qualName.local;
            var uri = prefix === "" ? "" : tag.ns[prefix] || "";
            var a2 = {
              name,
              value,
              prefix,
              local,
              uri
            };
            if (prefix && prefix !== "xmlns" && !uri) {
              strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
              a2.uri = prefix;
            }
            parser.tag.attributes[name] = a2;
            emitNode(parser, "onattribute", a2);
          }
          parser.attribList.length = 0;
        }
        parser.tag.isSelfClosing = !!selfClosing;
        parser.sawRoot = true;
        parser.tags.push(parser.tag);
        emitNode(parser, "onopentag", parser.tag);
        if (!selfClosing) {
          if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
            parser.state = S2.SCRIPT;
          } else {
            parser.state = S2.TEXT;
          }
          parser.tag = null;
          parser.tagName = "";
        }
        parser.attribName = parser.attribValue = "";
        parser.attribList.length = 0;
      }
      function closeTag(parser) {
        if (!parser.tagName) {
          strictFail(parser, "Weird empty close tag.");
          parser.textNode += "</>";
          parser.state = S2.TEXT;
          return;
        }
        if (parser.script) {
          if (parser.tagName !== "script") {
            parser.script += "</" + parser.tagName + ">";
            parser.tagName = "";
            parser.state = S2.SCRIPT;
            return;
          }
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
        var t2 = parser.tags.length;
        var tagName = parser.tagName;
        if (!parser.strict) {
          tagName = tagName[parser.looseCase]();
        }
        var closeTo = tagName;
        while (t2--) {
          var close = parser.tags[t2];
          if (close.name !== closeTo) {
            strictFail(parser, "Unexpected close tag");
          } else {
            break;
          }
        }
        if (t2 < 0) {
          strictFail(parser, "Unmatched closing tag: " + parser.tagName);
          parser.textNode += "</" + parser.tagName + ">";
          parser.state = S2.TEXT;
          return;
        }
        parser.tagName = tagName;
        var s3 = parser.tags.length;
        while (s3-- > t2) {
          var tag = parser.tag = parser.tags.pop();
          parser.tagName = parser.tag.name;
          emitNode(parser, "onclosetag", parser.tagName);
          var x2 = {};
          for (var i2 in tag.ns) {
            x2[i2] = tag.ns[i2];
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (parser.opt.xmlns && tag.ns !== parent.ns) {
            Object.keys(tag.ns).forEach(function(p2) {
              var n2 = tag.ns[p2];
              emitNode(parser, "onclosenamespace", { prefix: p2, uri: n2 });
            });
          }
        }
        if (t2 === 0)
          parser.closedRoot = true;
        parser.tagName = parser.attribValue = parser.attribName = "";
        parser.attribList.length = 0;
        parser.state = S2.TEXT;
      }
      function parseEntity(parser) {
        var entity = parser.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = "";
        if (parser.ENTITIES[entity]) {
          return parser.ENTITIES[entity];
        }
        if (parser.ENTITIES[entityLC]) {
          return parser.ENTITIES[entityLC];
        }
        entity = entityLC;
        if (entity.charAt(0) === "#") {
          if (entity.charAt(1) === "x") {
            entity = entity.slice(2);
            num = parseInt(entity, 16);
            numStr = num.toString(16);
          } else {
            entity = entity.slice(1);
            num = parseInt(entity, 10);
            numStr = num.toString(10);
          }
        }
        entity = entity.replace(/^0+/, "");
        if (isNaN(num) || numStr.toLowerCase() !== entity) {
          strictFail(parser, "Invalid character entity");
          return "&" + parser.entity + ";";
        }
        return String.fromCodePoint(num);
      }
      function beginWhiteSpace(parser, c2) {
        if (c2 === "<") {
          parser.state = S2.OPEN_WAKA;
          parser.startTagPosition = parser.position;
        } else if (!isWhitespace(c2)) {
          strictFail(parser, "Non-whitespace before first tag.");
          parser.textNode = c2;
          parser.state = S2.TEXT;
        }
      }
      function charAt(chunk, i2) {
        var result = "";
        if (i2 < chunk.length) {
          result = chunk.charAt(i2);
        }
        return result;
      }
      function write(chunk) {
        var parser = this;
        if (this.error) {
          throw this.error;
        }
        if (parser.closed) {
          return error(parser, "Cannot write after close. Assign an onready handler.");
        }
        if (chunk === null) {
          return end(parser);
        }
        if (typeof chunk === "object") {
          chunk = chunk.toString();
        }
        var i2 = 0;
        var c2 = "";
        while (true) {
          c2 = charAt(chunk, i2++);
          parser.c = c2;
          if (!c2) {
            break;
          }
          if (parser.trackPosition) {
            parser.position++;
            if (c2 === "\n") {
              parser.line++;
              parser.column = 0;
            } else {
              parser.column++;
            }
          }
          switch (parser.state) {
            case S2.BEGIN:
              parser.state = S2.BEGIN_WHITESPACE;
              if (c2 === "\uFEFF") {
                continue;
              }
              beginWhiteSpace(parser, c2);
              continue;
            case S2.BEGIN_WHITESPACE:
              beginWhiteSpace(parser, c2);
              continue;
            case S2.TEXT:
              if (parser.sawRoot && !parser.closedRoot) {
                var starti = i2 - 1;
                while (c2 && c2 !== "<" && c2 !== "&") {
                  c2 = charAt(chunk, i2++);
                  if (c2 && parser.trackPosition) {
                    parser.position++;
                    if (c2 === "\n") {
                      parser.line++;
                      parser.column = 0;
                    } else {
                      parser.column++;
                    }
                  }
                }
                parser.textNode += chunk.substring(starti, i2 - 1);
              }
              if (c2 === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                parser.state = S2.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else {
                if (!isWhitespace(c2) && (!parser.sawRoot || parser.closedRoot)) {
                  strictFail(parser, "Text data outside of root node.");
                }
                if (c2 === "&") {
                  parser.state = S2.TEXT_ENTITY;
                } else {
                  parser.textNode += c2;
                }
              }
              continue;
            case S2.SCRIPT:
              if (c2 === "<") {
                parser.state = S2.SCRIPT_ENDING;
              } else {
                parser.script += c2;
              }
              continue;
            case S2.SCRIPT_ENDING:
              if (c2 === "/") {
                parser.state = S2.CLOSE_TAG;
              } else {
                parser.script += "<" + c2;
                parser.state = S2.SCRIPT;
              }
              continue;
            case S2.OPEN_WAKA:
              if (c2 === "!") {
                parser.state = S2.SGML_DECL;
                parser.sgmlDecl = "";
              } else if (isWhitespace(c2)) {
              } else if (isMatch(nameStart, c2)) {
                parser.state = S2.OPEN_TAG;
                parser.tagName = c2;
              } else if (c2 === "/") {
                parser.state = S2.CLOSE_TAG;
                parser.tagName = "";
              } else if (c2 === "?") {
                parser.state = S2.PROC_INST;
                parser.procInstName = parser.procInstBody = "";
              } else {
                strictFail(parser, "Unencoded <");
                if (parser.startTagPosition + 1 < parser.position) {
                  var pad = parser.position - parser.startTagPosition;
                  c2 = new Array(pad).join(" ") + c2;
                }
                parser.textNode += "<" + c2;
                parser.state = S2.TEXT;
              }
              continue;
            case S2.SGML_DECL:
              if ((parser.sgmlDecl + c2).toUpperCase() === CDATA) {
                emitNode(parser, "onopencdata");
                parser.state = S2.CDATA;
                parser.sgmlDecl = "";
                parser.cdata = "";
              } else if (parser.sgmlDecl + c2 === "--") {
                parser.state = S2.COMMENT;
                parser.comment = "";
                parser.sgmlDecl = "";
              } else if ((parser.sgmlDecl + c2).toUpperCase() === DOCTYPE) {
                parser.state = S2.DOCTYPE;
                if (parser.doctype || parser.sawRoot) {
                  strictFail(parser, "Inappropriately located doctype declaration");
                }
                parser.doctype = "";
                parser.sgmlDecl = "";
              } else if (c2 === ">") {
                emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                parser.sgmlDecl = "";
                parser.state = S2.TEXT;
              } else if (isQuote(c2)) {
                parser.state = S2.SGML_DECL_QUOTED;
                parser.sgmlDecl += c2;
              } else {
                parser.sgmlDecl += c2;
              }
              continue;
            case S2.SGML_DECL_QUOTED:
              if (c2 === parser.q) {
                parser.state = S2.SGML_DECL;
                parser.q = "";
              }
              parser.sgmlDecl += c2;
              continue;
            case S2.DOCTYPE:
              if (c2 === ">") {
                parser.state = S2.TEXT;
                emitNode(parser, "ondoctype", parser.doctype);
                parser.doctype = true;
              } else {
                parser.doctype += c2;
                if (c2 === "[") {
                  parser.state = S2.DOCTYPE_DTD;
                } else if (isQuote(c2)) {
                  parser.state = S2.DOCTYPE_QUOTED;
                  parser.q = c2;
                }
              }
              continue;
            case S2.DOCTYPE_QUOTED:
              parser.doctype += c2;
              if (c2 === parser.q) {
                parser.q = "";
                parser.state = S2.DOCTYPE;
              }
              continue;
            case S2.DOCTYPE_DTD:
              parser.doctype += c2;
              if (c2 === "]") {
                parser.state = S2.DOCTYPE;
              } else if (isQuote(c2)) {
                parser.state = S2.DOCTYPE_DTD_QUOTED;
                parser.q = c2;
              }
              continue;
            case S2.DOCTYPE_DTD_QUOTED:
              parser.doctype += c2;
              if (c2 === parser.q) {
                parser.state = S2.DOCTYPE_DTD;
                parser.q = "";
              }
              continue;
            case S2.COMMENT:
              if (c2 === "-") {
                parser.state = S2.COMMENT_ENDING;
              } else {
                parser.comment += c2;
              }
              continue;
            case S2.COMMENT_ENDING:
              if (c2 === "-") {
                parser.state = S2.COMMENT_ENDED;
                parser.comment = textopts(parser.opt, parser.comment);
                if (parser.comment) {
                  emitNode(parser, "oncomment", parser.comment);
                }
                parser.comment = "";
              } else {
                parser.comment += "-" + c2;
                parser.state = S2.COMMENT;
              }
              continue;
            case S2.COMMENT_ENDED:
              if (c2 !== ">") {
                strictFail(parser, "Malformed comment");
                parser.comment += "--" + c2;
                parser.state = S2.COMMENT;
              } else {
                parser.state = S2.TEXT;
              }
              continue;
            case S2.CDATA:
              if (c2 === "]") {
                parser.state = S2.CDATA_ENDING;
              } else {
                parser.cdata += c2;
              }
              continue;
            case S2.CDATA_ENDING:
              if (c2 === "]") {
                parser.state = S2.CDATA_ENDING_2;
              } else {
                parser.cdata += "]" + c2;
                parser.state = S2.CDATA;
              }
              continue;
            case S2.CDATA_ENDING_2:
              if (c2 === ">") {
                if (parser.cdata) {
                  emitNode(parser, "oncdata", parser.cdata);
                }
                emitNode(parser, "onclosecdata");
                parser.cdata = "";
                parser.state = S2.TEXT;
              } else if (c2 === "]") {
                parser.cdata += "]";
              } else {
                parser.cdata += "]]" + c2;
                parser.state = S2.CDATA;
              }
              continue;
            case S2.PROC_INST:
              if (c2 === "?") {
                parser.state = S2.PROC_INST_ENDING;
              } else if (isWhitespace(c2)) {
                parser.state = S2.PROC_INST_BODY;
              } else {
                parser.procInstName += c2;
              }
              continue;
            case S2.PROC_INST_BODY:
              if (!parser.procInstBody && isWhitespace(c2)) {
                continue;
              } else if (c2 === "?") {
                parser.state = S2.PROC_INST_ENDING;
              } else {
                parser.procInstBody += c2;
              }
              continue;
            case S2.PROC_INST_ENDING:
              if (c2 === ">") {
                emitNode(parser, "onprocessinginstruction", {
                  name: parser.procInstName,
                  body: parser.procInstBody
                });
                parser.procInstName = parser.procInstBody = "";
                parser.state = S2.TEXT;
              } else {
                parser.procInstBody += "?" + c2;
                parser.state = S2.PROC_INST_BODY;
              }
              continue;
            case S2.OPEN_TAG:
              if (isMatch(nameBody, c2)) {
                parser.tagName += c2;
              } else {
                newTag(parser);
                if (c2 === ">") {
                  openTag(parser);
                } else if (c2 === "/") {
                  parser.state = S2.OPEN_TAG_SLASH;
                } else {
                  if (!isWhitespace(c2)) {
                    strictFail(parser, "Invalid character in tag name");
                  }
                  parser.state = S2.ATTRIB;
                }
              }
              continue;
            case S2.OPEN_TAG_SLASH:
              if (c2 === ">") {
                openTag(parser, true);
                closeTag(parser);
              } else {
                strictFail(parser, "Forward-slash in opening tag not followed by >");
                parser.state = S2.ATTRIB;
              }
              continue;
            case S2.ATTRIB:
              if (isWhitespace(c2)) {
                continue;
              } else if (c2 === ">") {
                openTag(parser);
              } else if (c2 === "/") {
                parser.state = S2.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c2)) {
                parser.attribName = c2;
                parser.attribValue = "";
                parser.state = S2.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S2.ATTRIB_NAME:
              if (c2 === "=") {
                parser.state = S2.ATTRIB_VALUE;
              } else if (c2 === ">") {
                strictFail(parser, "Attribute without value");
                parser.attribValue = parser.attribName;
                attrib(parser);
                openTag(parser);
              } else if (isWhitespace(c2)) {
                parser.state = S2.ATTRIB_NAME_SAW_WHITE;
              } else if (isMatch(nameBody, c2)) {
                parser.attribName += c2;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S2.ATTRIB_NAME_SAW_WHITE:
              if (c2 === "=") {
                parser.state = S2.ATTRIB_VALUE;
              } else if (isWhitespace(c2)) {
                continue;
              } else {
                strictFail(parser, "Attribute without value");
                parser.tag.attributes[parser.attribName] = "";
                parser.attribValue = "";
                emitNode(parser, "onattribute", {
                  name: parser.attribName,
                  value: ""
                });
                parser.attribName = "";
                if (c2 === ">") {
                  openTag(parser);
                } else if (isMatch(nameStart, c2)) {
                  parser.attribName = c2;
                  parser.state = S2.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                  parser.state = S2.ATTRIB;
                }
              }
              continue;
            case S2.ATTRIB_VALUE:
              if (isWhitespace(c2)) {
                continue;
              } else if (isQuote(c2)) {
                parser.q = c2;
                parser.state = S2.ATTRIB_VALUE_QUOTED;
              } else {
                strictFail(parser, "Unquoted attribute value");
                parser.state = S2.ATTRIB_VALUE_UNQUOTED;
                parser.attribValue = c2;
              }
              continue;
            case S2.ATTRIB_VALUE_QUOTED:
              if (c2 !== parser.q) {
                if (c2 === "&") {
                  parser.state = S2.ATTRIB_VALUE_ENTITY_Q;
                } else {
                  parser.attribValue += c2;
                }
                continue;
              }
              attrib(parser);
              parser.q = "";
              parser.state = S2.ATTRIB_VALUE_CLOSED;
              continue;
            case S2.ATTRIB_VALUE_CLOSED:
              if (isWhitespace(c2)) {
                parser.state = S2.ATTRIB;
              } else if (c2 === ">") {
                openTag(parser);
              } else if (c2 === "/") {
                parser.state = S2.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c2)) {
                strictFail(parser, "No whitespace between attributes");
                parser.attribName = c2;
                parser.attribValue = "";
                parser.state = S2.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S2.ATTRIB_VALUE_UNQUOTED:
              if (!isAttribEnd(c2)) {
                if (c2 === "&") {
                  parser.state = S2.ATTRIB_VALUE_ENTITY_U;
                } else {
                  parser.attribValue += c2;
                }
                continue;
              }
              attrib(parser);
              if (c2 === ">") {
                openTag(parser);
              } else {
                parser.state = S2.ATTRIB;
              }
              continue;
            case S2.CLOSE_TAG:
              if (!parser.tagName) {
                if (isWhitespace(c2)) {
                  continue;
                } else if (notMatch(nameStart, c2)) {
                  if (parser.script) {
                    parser.script += "</" + c2;
                    parser.state = S2.SCRIPT;
                  } else {
                    strictFail(parser, "Invalid tagname in closing tag.");
                  }
                } else {
                  parser.tagName = c2;
                }
              } else if (c2 === ">") {
                closeTag(parser);
              } else if (isMatch(nameBody, c2)) {
                parser.tagName += c2;
              } else if (parser.script) {
                parser.script += "</" + parser.tagName;
                parser.tagName = "";
                parser.state = S2.SCRIPT;
              } else {
                if (!isWhitespace(c2)) {
                  strictFail(parser, "Invalid tagname in closing tag");
                }
                parser.state = S2.CLOSE_TAG_SAW_WHITE;
              }
              continue;
            case S2.CLOSE_TAG_SAW_WHITE:
              if (isWhitespace(c2)) {
                continue;
              }
              if (c2 === ">") {
                closeTag(parser);
              } else {
                strictFail(parser, "Invalid characters in closing tag");
              }
              continue;
            case S2.TEXT_ENTITY:
            case S2.ATTRIB_VALUE_ENTITY_Q:
            case S2.ATTRIB_VALUE_ENTITY_U:
              var returnState;
              var buffer;
              switch (parser.state) {
                case S2.TEXT_ENTITY:
                  returnState = S2.TEXT;
                  buffer = "textNode";
                  break;
                case S2.ATTRIB_VALUE_ENTITY_Q:
                  returnState = S2.ATTRIB_VALUE_QUOTED;
                  buffer = "attribValue";
                  break;
                case S2.ATTRIB_VALUE_ENTITY_U:
                  returnState = S2.ATTRIB_VALUE_UNQUOTED;
                  buffer = "attribValue";
                  break;
              }
              if (c2 === ";") {
                parser[buffer] += parseEntity(parser);
                parser.entity = "";
                parser.state = returnState;
              } else if (isMatch(parser.entity.length ? entityBody : entityStart, c2)) {
                parser.entity += c2;
              } else {
                strictFail(parser, "Invalid character in entity name");
                parser[buffer] += "&" + parser.entity + c2;
                parser.entity = "";
                parser.state = returnState;
              }
              continue;
            default:
              throw new Error(parser, "Unknown state: " + parser.state);
          }
        }
        if (parser.position >= parser.bufferCheckPosition) {
          checkBufferLength(parser);
        }
        return parser;
      }
      if (!String.fromCodePoint) {
        (function() {
          var stringFromCharCode = String.fromCharCode;
          var floor = Math.floor;
          var fromCodePoint = function() {
            var MAX_SIZE = 16384;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
              return "";
            }
            var result = "";
            while (++index < length) {
              var codePoint = Number(arguments[index]);
              if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) !== codePoint) {
                throw RangeError("Invalid code point: " + codePoint);
              }
              if (codePoint <= 65535) {
                codeUnits.push(codePoint);
              } else {
                codePoint -= 65536;
                highSurrogate = (codePoint >> 10) + 55296;
                lowSurrogate = codePoint % 1024 + 56320;
                codeUnits.push(highSurrogate, lowSurrogate);
              }
              if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
              }
            }
            return result;
          };
          if (Object.defineProperty) {
            Object.defineProperty(String, "fromCodePoint", {
              value: fromCodePoint,
              configurable: true,
              writable: true
            });
          } else {
            String.fromCodePoint = fromCodePoint;
          }
        })();
      }
    })(typeof exports2 === "undefined" ? exports2.sax = {} : exports2);
  }
});

// node_modules/xml2js/lib/bom.js
var require_bom = __commonJS({
  "node_modules/xml2js/lib/bom.js"(exports2) {
    (function() {
      "use strict";
      exports2.stripBOM = function(str) {
        if (str[0] === "\uFEFF") {
          return str.substring(1);
        } else {
          return str;
        }
      };
    }).call(exports2);
  }
});

// node_modules/xml2js/lib/processors.js
var require_processors = __commonJS({
  "node_modules/xml2js/lib/processors.js"(exports2) {
    (function() {
      "use strict";
      var prefixMatch;
      prefixMatch = new RegExp(/(?!xmlns)^.*:/);
      exports2.normalize = function(str) {
        return str.toLowerCase();
      };
      exports2.firstCharLowerCase = function(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
      };
      exports2.stripPrefix = function(str) {
        return str.replace(prefixMatch, "");
      };
      exports2.parseNumbers = function(str) {
        if (!isNaN(str)) {
          str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
        }
        return str;
      };
      exports2.parseBooleans = function(str) {
        if (/^(?:true|false)$/i.test(str)) {
          str = str.toLowerCase() === "true";
        }
        return str;
      };
    }).call(exports2);
  }
});

// node_modules/xml2js/lib/parser.js
var require_parser = __commonJS({
  "node_modules/xml2js/lib/parser.js"(exports2) {
    (function() {
      "use strict";
      var bom, defaults, events, isEmpty, processItem, processors, sax, setImmediate2, bind = function(fn3, me2) {
        return function() {
          return fn3.apply(me2, arguments);
        };
      }, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      sax = require_sax();
      events = require("events");
      bom = require_bom();
      processors = require_processors();
      setImmediate2 = require("timers").setImmediate;
      defaults = require_defaults().defaults;
      isEmpty = function(thing) {
        return typeof thing === "object" && thing != null && Object.keys(thing).length === 0;
      };
      processItem = function(processors2, item, key) {
        var i2, len, process2;
        for (i2 = 0, len = processors2.length; i2 < len; i2++) {
          process2 = processors2[i2];
          item = process2(item, key);
        }
        return item;
      };
      exports2.Parser = function(superClass) {
        extend(Parser2, superClass);
        function Parser2(opts) {
          this.parseStringPromise = bind(this.parseStringPromise, this);
          this.parseString = bind(this.parseString, this);
          this.reset = bind(this.reset, this);
          this.assignOrPush = bind(this.assignOrPush, this);
          this.processAsync = bind(this.processAsync, this);
          var key, ref, value;
          if (!(this instanceof exports2.Parser)) {
            return new exports2.Parser(opts);
          }
          this.options = {};
          ref = defaults["0.2"];
          for (key in ref) {
            if (!hasProp.call(ref, key))
              continue;
            value = ref[key];
            this.options[key] = value;
          }
          for (key in opts) {
            if (!hasProp.call(opts, key))
              continue;
            value = opts[key];
            this.options[key] = value;
          }
          if (this.options.xmlns) {
            this.options.xmlnskey = this.options.attrkey + "ns";
          }
          if (this.options.normalizeTags) {
            if (!this.options.tagNameProcessors) {
              this.options.tagNameProcessors = [];
            }
            this.options.tagNameProcessors.unshift(processors.normalize);
          }
          this.reset();
        }
        Parser2.prototype.processAsync = function() {
          var chunk, err;
          try {
            if (this.remaining.length <= this.options.chunkSize) {
              chunk = this.remaining;
              this.remaining = "";
              this.saxParser = this.saxParser.write(chunk);
              return this.saxParser.close();
            } else {
              chunk = this.remaining.substr(0, this.options.chunkSize);
              this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
              this.saxParser = this.saxParser.write(chunk);
              return setImmediate2(this.processAsync);
            }
          } catch (error1) {
            err = error1;
            if (!this.saxParser.errThrown) {
              this.saxParser.errThrown = true;
              return this.emit(err);
            }
          }
        };
        Parser2.prototype.assignOrPush = function(obj, key, newValue) {
          if (!(key in obj)) {
            if (!this.options.explicitArray) {
              return obj[key] = newValue;
            } else {
              return obj[key] = [newValue];
            }
          } else {
            if (!(obj[key] instanceof Array)) {
              obj[key] = [obj[key]];
            }
            return obj[key].push(newValue);
          }
        };
        Parser2.prototype.reset = function() {
          var attrkey, charkey, ontext, stack2;
          this.removeAllListeners();
          this.saxParser = sax.parser(this.options.strict, {
            trim: false,
            normalize: false,
            xmlns: this.options.xmlns
          });
          this.saxParser.errThrown = false;
          this.saxParser.onerror = function(_this) {
            return function(error) {
              _this.saxParser.resume();
              if (!_this.saxParser.errThrown) {
                _this.saxParser.errThrown = true;
                return _this.emit("error", error);
              }
            };
          }(this);
          this.saxParser.onend = function(_this) {
            return function() {
              if (!_this.saxParser.ended) {
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);
          this.saxParser.ended = false;
          this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
          this.resultObject = null;
          stack2 = [];
          attrkey = this.options.attrkey;
          charkey = this.options.charkey;
          this.saxParser.onopentag = function(_this) {
            return function(node) {
              var key, newValue, obj, processedKey, ref;
              obj = {};
              obj[charkey] = "";
              if (!_this.options.ignoreAttrs) {
                ref = node.attributes;
                for (key in ref) {
                  if (!hasProp.call(ref, key))
                    continue;
                  if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                    obj[attrkey] = {};
                  }
                  newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
                  processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
                  if (_this.options.mergeAttrs) {
                    _this.assignOrPush(obj, processedKey, newValue);
                  } else {
                    obj[attrkey][processedKey] = newValue;
                  }
                }
              }
              obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
              if (_this.options.xmlns) {
                obj[_this.options.xmlnskey] = {
                  uri: node.uri,
                  local: node.local
                };
              }
              return stack2.push(obj);
            };
          }(this);
          this.saxParser.onclosetag = function(_this) {
            return function() {
              var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s2, xpath;
              obj = stack2.pop();
              nodeName = obj["#name"];
              if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
                delete obj["#name"];
              }
              if (obj.cdata === true) {
                cdata = obj.cdata;
                delete obj.cdata;
              }
              s2 = stack2[stack2.length - 1];
              if (obj[charkey].match(/^\s*$/) && !cdata) {
                emptyStr = obj[charkey];
                delete obj[charkey];
              } else {
                if (_this.options.trim) {
                  obj[charkey] = obj[charkey].trim();
                }
                if (_this.options.normalize) {
                  obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
                }
                obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
                if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                  obj = obj[charkey];
                }
              }
              if (isEmpty(obj)) {
                obj = _this.options.emptyTag !== "" ? _this.options.emptyTag : emptyStr;
              }
              if (_this.options.validator != null) {
                xpath = "/" + function() {
                  var i2, len, results;
                  results = [];
                  for (i2 = 0, len = stack2.length; i2 < len; i2++) {
                    node = stack2[i2];
                    results.push(node["#name"]);
                  }
                  return results;
                }().concat(nodeName).join("/");
                (function() {
                  var err;
                  try {
                    return obj = _this.options.validator(xpath, s2 && s2[nodeName], obj);
                  } catch (error1) {
                    err = error1;
                    return _this.emit("error", err);
                  }
                })();
              }
              if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === "object") {
                if (!_this.options.preserveChildrenOrder) {
                  node = {};
                  if (_this.options.attrkey in obj) {
                    node[_this.options.attrkey] = obj[_this.options.attrkey];
                    delete obj[_this.options.attrkey];
                  }
                  if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                    node[_this.options.charkey] = obj[_this.options.charkey];
                    delete obj[_this.options.charkey];
                  }
                  if (Object.getOwnPropertyNames(obj).length > 0) {
                    node[_this.options.childkey] = obj;
                  }
                  obj = node;
                } else if (s2) {
                  s2[_this.options.childkey] = s2[_this.options.childkey] || [];
                  objClone = {};
                  for (key in obj) {
                    if (!hasProp.call(obj, key))
                      continue;
                    objClone[key] = obj[key];
                  }
                  s2[_this.options.childkey].push(objClone);
                  delete obj["#name"];
                  if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                    obj = obj[charkey];
                  }
                }
              }
              if (stack2.length > 0) {
                return _this.assignOrPush(s2, nodeName, obj);
              } else {
                if (_this.options.explicitRoot) {
                  old = obj;
                  obj = {};
                  obj[nodeName] = old;
                }
                _this.resultObject = obj;
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);
          ontext = function(_this) {
            return function(text) {
              var charChild, s2;
              s2 = stack2[stack2.length - 1];
              if (s2) {
                s2[charkey] += text;
                if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, "").trim() !== "")) {
                  s2[_this.options.childkey] = s2[_this.options.childkey] || [];
                  charChild = {
                    "#name": "__text__"
                  };
                  charChild[charkey] = text;
                  if (_this.options.normalize) {
                    charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
                  }
                  s2[_this.options.childkey].push(charChild);
                }
                return s2;
              }
            };
          }(this);
          this.saxParser.ontext = ontext;
          return this.saxParser.oncdata = function(_this) {
            return function(text) {
              var s2;
              s2 = ontext(text);
              if (s2) {
                return s2.cdata = true;
              }
            };
          }(this);
        };
        Parser2.prototype.parseString = function(str, cb) {
          var err;
          if (cb != null && typeof cb === "function") {
            this.on("end", function(result) {
              this.reset();
              return cb(null, result);
            });
            this.on("error", function(err2) {
              this.reset();
              return cb(err2);
            });
          }
          try {
            str = str.toString();
            if (str.trim() === "") {
              this.emit("end", null);
              return true;
            }
            str = bom.stripBOM(str);
            if (this.options.async) {
              this.remaining = str;
              setImmediate2(this.processAsync);
              return this.saxParser;
            }
            return this.saxParser.write(str).close();
          } catch (error1) {
            err = error1;
            if (!(this.saxParser.errThrown || this.saxParser.ended)) {
              this.emit("error", err);
              return this.saxParser.errThrown = true;
            } else if (this.saxParser.ended) {
              throw err;
            }
          }
        };
        Parser2.prototype.parseStringPromise = function(str) {
          return new Promise(function(_this) {
            return function(resolve, reject) {
              return _this.parseString(str, function(err, value) {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(value);
                }
              });
            };
          }(this));
        };
        return Parser2;
      }(events);
      exports2.parseString = function(str, a2, b2) {
        var cb, options, parser;
        if (b2 != null) {
          if (typeof b2 === "function") {
            cb = b2;
          }
          if (typeof a2 === "object") {
            options = a2;
          }
        } else {
          if (typeof a2 === "function") {
            cb = a2;
          }
          options = {};
        }
        parser = new exports2.Parser(options);
        return parser.parseString(str, cb);
      };
      exports2.parseStringPromise = function(str, a2) {
        var options, parser;
        if (typeof a2 === "object") {
          options = a2;
        }
        parser = new exports2.Parser(options);
        return parser.parseStringPromise(str);
      };
    }).call(exports2);
  }
});

// node_modules/xml2js/lib/xml2js.js
var require_xml2js = __commonJS({
  "node_modules/xml2js/lib/xml2js.js"(exports2) {
    (function() {
      "use strict";
      var builder, defaults, parser, processors, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      defaults = require_defaults();
      builder = require_builder();
      parser = require_parser();
      processors = require_processors();
      exports2.defaults = defaults.defaults;
      exports2.processors = processors;
      exports2.ValidationError = function(superClass) {
        extend(ValidationError, superClass);
        function ValidationError(message2) {
          this.message = message2;
        }
        return ValidationError;
      }(Error);
      exports2.Builder = builder.Builder;
      exports2.Parser = parser.Parser;
      exports2.parseString = parser.parseString;
      exports2.parseStringPromise = parser.parseStringPromise;
    }).call(exports2);
  }
});

// node_modules/compromise-sentences/builds/compromise-sentences.js
var require_compromise_sentences = __commonJS({
  "node_modules/compromise-sentences/builds/compromise-sentences.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.compromiseSentences = factory());
    })(exports2, function() {
      "use strict";
      var tags = {
        NounPhrase: {
          notA: ["VerbPhrase", "AdjectivePhrase"],
          color: "blue"
        },
        VerbPhrase: {
          notA: ["AdjectivePhrase", "NounPhrase"],
          color: "green"
        },
        AdjectivePhrase: {
          notA: ["VerbPhrase", "NounPhrase"],
          color: "magenta"
        },
        Subordinate: {
          notA: []
        }
      };
      const tagger = function(doc) {
        doc.match("#Noun").tag("NounPhrase");
        doc.match("#Verb").tag("VerbPhrase");
        doc.match("(this|that|those|these)").tag("NounPhrase");
        doc.match("#Adjective+ #NounPhrase").tagSafe("NounPhrase");
        doc.match("#NounPhrase #Adjective+").tagSafe("NounPhrase");
        doc.match("#Value #NounPhrase").tag("NounPhrase");
        doc.match("#Determiner #NounPhrase").tag("NounPhrase");
        doc.match("#Determiner #Adverb+? #Adjective+ #NounPhrase").tag("NounPhrase");
        doc.match("(many|most|all|one|some|plenty) of #NounPhrase").tag("NounPhrase");
        doc.match("such a #NounPhrase").tag("NounPhrase");
        doc.match("#VerbPhrase #Adverb+").tagSafe("VerbPhrase");
        doc.match("#Adverb+ #VerbPhrase").tagSafe("VerbPhrase");
        doc.match("#Auxiliary+ #VerbPhrase").tagSafe("VerbPhrase");
        doc.match("#VerbPhrase no").tagSafe("VerbPhrase");
        doc.match("not #VerbPhrase").tagSafe("VerbPhrase");
        doc.match("#VerbPhrase [that]", 0).unTag("NounPhrase");
        doc.match("#VerbPhrase #Conjunction #VerbPhrase").tagSafe("VerbPhrase");
        doc.match("(who|what|which)").tag("NounPhrase");
        doc.match("#Adverb+ #Adjective").tagSafe("AdjectivePhrase");
        doc.match("#Adjective").tagSafe("AdjectivePhrase");
        doc.match("#Value").tagSafe("NounPhrase");
        doc.match("#Date").tagSafe("NounPhrase");
        doc.match("#Date at #Date").tagSafe("NounPhrase");
      };
      var tagger_1 = tagger;
      var prepend = function(str) {
        this.forEach((doc) => {
          let firstTerms = doc.match("^.");
          firstTerms.not("#ProperNoun").toLowerCase();
          firstTerms._prepend(str);
          firstTerms.terms(0).toTitleCase();
        });
        return this;
      };
      var append_1 = function(str) {
        let hasEnd = /[.?!]\s*$/.test(str);
        this.forEach((doc) => {
          let end = doc.match(".$");
          let lastTerm = end.termList(0);
          let punct = lastTerm.post;
          if (hasEnd === true) {
            punct = "";
          }
          end._append(str + punct);
          lastTerm.post = " ";
        });
        return this;
      };
      var append = {
        prepend,
        append: append_1
      };
      const subordinate = `(after|although|as|because|before|if|since|than|that|though|when|whenever|where|whereas|wherever|whether|while|why|unless|until|once)`;
      const relative2 = `(that|which|whichever|who|whoever|whom|whose|whomever)`;
      const mainClause = function(og) {
        let m2 = og.clone(true);
        if (m2.length === 1) {
          return m2;
        }
        m2 = m2.if("#Verb");
        if (m2.length === 1) {
          return m2;
        }
        m2 = m2.ifNo(subordinate);
        m2 = m2.ifNo("^even (if|though)");
        m2 = m2.ifNo("^so that");
        m2 = m2.ifNo("^rather than");
        m2 = m2.ifNo("^provided that");
        if (m2.length === 1) {
          return m2;
        }
        m2 = m2.ifNo(relative2);
        if (m2.length === 1) {
          return m2;
        }
        m2 = m2.ifNo("(despite|during|before|through|throughout)");
        if (m2.length === 1) {
          return m2;
        }
        if (m2.length === 0) {
          m2 = og;
        }
        return m2.eq(0);
      };
      var mainClause_1 = mainClause;
      const parse = function(doc) {
        let clauses = doc.clauses();
        let main = mainClause_1(clauses);
        let nouns = main.match("#Determiner? (#Noun|#Adjective)+").if("#Noun");
        let verb = main.verbs().eq(0);
        return {
          subject: nouns.eq(0),
          verb,
          object: verb.lookAhead(".*")
        };
      };
      var parse_1 = parse;
      var json_1 = function(options) {
        let n2 = null;
        if (typeof options === "number") {
          n2 = options;
          options = null;
        }
        options = options || {
          text: true,
          normal: true,
          trim: true,
          terms: true
        };
        let res = [];
        this.forEach((doc) => {
          let json2 = doc._json(options)[0];
          let obj = parse_1(doc);
          json2.subject = obj.subject.json(options)[0];
          json2.verb = obj.verb.json(options)[0];
          json2.object = obj.object.json(options)[0];
          res.push(json2);
        });
        if (n2 !== null) {
          return res[n2];
        }
        return res;
      };
      var json = {
        json: json_1
      };
      var toNegative = function() {
        this.forEach((doc) => {
          let obj = parse_1(doc);
          let vb = obj.verb.clone();
          vb = vb.verbs().toNegative();
          obj.verb.replaceWith(vb, false);
        });
        return this;
      };
      var toPositive = function() {
        this.forEach((doc) => {
          let obj = parse_1(doc);
          let vb = obj.verb.clone();
          vb = vb.verbs().toPositive();
          obj.verb.replaceWith(vb, false);
        });
        return this;
      };
      var negative = {
        toNegative,
        toPositive
      };
      const isQuestion = function(doc) {
        let endPunct = doc.post();
        let clauses = doc.clauses();
        if (/\?/.test(endPunct) === true) {
          return true;
        }
        if (/\.\.$/.test(doc.out("text"))) {
          return false;
        }
        if (doc.has("^#QuestionWord") && doc.has("#Comma")) {
          return false;
        }
        if (doc.has("^#QuestionWord")) {
          return true;
        }
        if (doc.has("^(do|does|did|is|was|can|could|will|would|may) #Noun")) {
          return true;
        }
        if (doc.has("^(have|must) you")) {
          return true;
        }
        if (clauses.has("^#QuestionWord")) {
          return true;
        }
        if (clauses.has("(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$")) {
          return true;
        }
        return false;
      };
      var isQuestion_1$1 = isQuestion;
      var isQuestion_1 = function() {
        return this.filter((d2) => isQuestion_1$1(d2));
      };
      var isExclamation = function() {
        return this.filter((doc) => {
          let term = doc.lastTerm().termList(0);
          return term.hasPost("!");
        });
      };
      var isStatement = function() {
        return this.filter((doc) => {
          let term = doc.lastTerm().termList(0);
          return !term.hasPost("?") && !term.hasPost("!");
        });
      };
      var toExclamation = function() {
        this.post("!");
        return this;
      };
      var toQuestion = function() {
        this.post("?");
        return this;
      };
      var toStatement = function() {
        this.post(".");
        return this;
      };
      var questions = {
        isQuestion: isQuestion_1,
        isExclamation,
        isStatement,
        toExclamation,
        toQuestion,
        toStatement
      };
      const useParticiple = function(vb) {
        if (vb.has("(could|should|would|may|can|must)")) {
          return true;
        }
        return false;
      };
      var toPastTense = function() {
        this.forEach((doc) => {
          if (doc.has("#PastTense")) {
            return;
          }
          let obj = parse_1(doc);
          let vb = obj.verb.clone();
          if (useParticiple(vb)) {
            vb = vb.verbs().toParticiple();
            obj.verb.replaceWith(vb, false);
          } else {
            vb = vb.verbs().toPastTense();
            obj.verb.replaceWith(vb, false);
          }
          if (obj.object && obj.object.found && obj.object.has("#PresentTense")) {
            let verbs = obj.object.verbs();
            verbs = verbs.filter((v2) => {
              return !v2.lookBehind("to$").found;
            });
            verbs.if("#PresentTense").notIf("#Gerund").verbs().toPastTense();
          }
        });
        return this;
      };
      var toParticiple = function() {
        this.forEach((doc) => {
          if (doc.has("has #Participle")) {
            return;
          }
          let obj = parse_1(doc);
          let vb = obj.verb.clone();
          vb = vb.verbs().toParticiple();
          obj.verb.replaceWith(vb, false);
          if (obj.object && obj.object.found && obj.object.has("#PresentTense")) {
            let verbs = obj.object.verbs();
            verbs.if("#PresentTense").verbs().toParticiple();
          }
        });
        return this;
      };
      var toPresentTense = function() {
        this.forEach((doc) => {
          let obj = parse_1(doc);
          let isPlural = obj.verb.lookBehind("(i|we) (#Adverb|#Verb)?$").found;
          let vb = obj.verb.clone();
          if (isPlural) {
            if (vb.has("(is|was|am|be)")) {
              vb = vb.replace("will? (is|was|am|be)", "am");
            } else {
              vb = vb.verbs().toInfinitive();
            }
          } else {
            vb = vb.verbs().toPresentTense();
          }
          obj.verb.replaceWith(vb, false);
          if (obj.object && obj.object.found && obj.object.has("#PastTense")) {
            let verbs = obj.object.verbs();
            verbs.if("#PastTense").notIf("#Gerund").verbs().toPresentTense();
          }
        });
        return this;
      };
      var toFutureTense = function() {
        this.forEach((doc) => {
          let obj = parse_1(doc);
          let vb = obj.verb.clone();
          vb = vb.verbs().toFutureTense();
          obj.verb.replaceWith(vb, false);
          if (obj.object && obj.object.found && obj.object.has("(#PastTense|#PresentTense)")) {
            let verbs = obj.object.verbs();
            verbs = verbs.if("(#PastTense|#PresentTense)").notIf("#Gerund");
            verbs.forEach((v2) => {
              if (v2.lookBehind("(that|which|who|whom)$").found === true) {
                v2.verbs().toPresentTense();
              } else {
                v2.verbs().toInfinitive();
              }
            });
          }
        });
        return this;
      };
      var subjects = function() {
        return this.map((doc) => {
          let res = parse_1(doc);
          return res.subject;
        });
      };
      var isPassive = function() {
        return this.if("was #Adverb? #PastTense #Adverb? by");
      };
      var tense = {
        toPastTense,
        toParticiple,
        toPresentTense,
        toFutureTense,
        subjects,
        isPassive
      };
      var phrases_1 = function() {
        let arr = [];
        this.forEach((s2) => {
          s2 = s2.splitOn("#VerbPhrase+");
          s2 = s2.splitOn("#NounPhrase+");
          s2 = s2.splitOn("#AdjectivePhrase+");
          arr = arr.concat(s2.list);
        });
        return this.buildFrom(arr);
      };
      var phrases = {
        phrases: phrases_1
      };
      const methods = Object.assign({}, append, json, negative, questions, tense, phrases);
      const plugin = function(Doc, world) {
        world.addTags(tags);
        world.postProcess(tagger_1);
        class Sentences extends Doc {
          constructor(list, from, w2) {
            list = list.map((p2) => p2.clone(true));
            super(list, from, w2);
          }
        }
        methods.questions = methods.isQuestion;
        methods.exclamations = methods.isExclamation;
        methods.statements = methods.isStatement;
        methods._prepend = Sentences.prototype.prepend;
        methods._append = Sentences.prototype.append;
        methods._json = Sentences.prototype.json;
        Object.assign(Sentences.prototype, methods);
        Sentences.prototype.buildFrom = function(list) {
          list = list.map((p2) => p2.clone(true));
          let doc = new Sentences(list, this, this.world);
          return doc;
        };
        Sentences.prototype.toDoc = function() {
          return Doc.prototype.buildFrom(this.list);
        };
        Doc.prototype.sentences = function(n2) {
          let arr = [];
          this.list.forEach((p2) => {
            arr.push(p2.fullSentence());
          });
          let s2 = new Sentences(arr, this, this.world);
          if (typeof n2 === "number") {
            s2 = s2.get(n2);
          }
          return s2;
        };
        return Doc;
      };
      var src = plugin;
      return src;
    });
  }
});

// node_modules/compromise/builds/compromise.mjs
var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
var t = function(t2) {
  let r2 = (t2 = t2 || "_") + "-";
  for (let t3 = 0; t3 < 7; t3++)
    r2 += e[Math.floor(Math.random() * e.length)];
  return r2;
};
var r = { "!": "\xA1", "?": "\xBF\u0241", '"': '\u201C\u201D"\u275D\u275E', "'": "\u2018\u201B\u275B\u275C", "-": "\u2014\u2013", a: "\xAA\xC0\xC1\xC2\xC3\xC4\xC5\xE0\xE1\xE2\xE3\xE4\xE5\u0100\u0101\u0102\u0103\u0104\u0105\u01CD\u01CE\u01DE\u01DF\u01E0\u01E1\u01FA\u01FB\u0200\u0201\u0202\u0203\u0226\u0227\u023A\u0386\u0391\u0394\u039B\u03AC\u03B1\u03BB\u0410\u0430\u0434\u0466\u0467\u04D0\u04D1\u04D2\u04D3\u019B\u0245\xE6", b: "\xDF\xFE\u0180\u0181\u0182\u0183\u0184\u0185\u0243\u0392\u03B2\u03D0\u03E6\u0411\u0412\u042A\u042C\u0432\u044A\u044C\u0462\u0463\u048C\u048D", c: "\xA2\xA9\xC7\xE7\u0106\u0107\u0108\u0109\u010A\u010B\u010C\u010D\u0186\u0187\u0188\u023B\u023C\u037B\u037C\u037D\u03F2\u03F9\u03FD\u03FE\u0421\u0441\u0454\u0480\u0481\u04AA\u04AB", d: "\xD0\u010E\u010F\u0110\u0111\u0189\u018A\u0221\u018B\u018C\u01F7", e: "\xC8\xC9\xCA\xCB\xE8\xE9\xEA\xEB\u0112\u0113\u0114\u0115\u0116\u0117\u0118\u0119\u011A\u011B\u018E\u018F\u0190\u01DD\u0204\u0205\u0206\u0207\u0228\u0229\u0246\u0247\u0388\u0395\u039E\u03A3\u03AD\u03B5\u03BE\u03F1\u03F5\u03F6\u0400\u0401\u0415\u042D\u0435\u0450\u0451\u04BC\u04BD\u04BE\u04BF\u04D6\u04D7\u04D8\u04D9\u04DA\u04DB\u04EC\u04ED", f: "\u0191\u0192\u03DC\u03DD\u04FA\u04FB\u0492\u0493\u017F", g: "\u011C\u011D\u011E\u011F\u0120\u0121\u0122\u0123\u0193\u01E4\u01E5\u01E6\u01E7\u01F4\u01F5", h: "\u0124\u0125\u0126\u0127\u0195\u01F6\u021E\u021F\u0389\u0397\u0402\u040A\u040B\u041D\u043D\u0452\u045B\u04A2\u04A3\u04A4\u04A5\u04BA\u04BB\u04C9\u04CA", I: "\xCC\xCD\xCE\xCF", i: "\xEC\xED\xEE\xEF\u0128\u0129\u012A\u012B\u012C\u012D\u012E\u012F\u0130\u0131\u0196\u0197\u0208\u0209\u020A\u020B\u038A\u0390\u03AA\u03AF\u03B9\u03CA\u0406\u0407\u0456\u0457", j: "\u0134\u0135\u01F0\u0237\u0248\u0249\u03F3\u0408\u0458", k: "\u0136\u0137\u0138\u0198\u0199\u01E8\u01E9\u039A\u03BA\u040C\u0416\u041A\u0436\u043A\u045C\u049A\u049B\u049C\u049D\u049E\u049F\u04A0\u04A1", l: "\u0139\u013A\u013B\u013C\u013D\u013E\u013F\u0140\u0141\u0142\u019A\u01AA\u01C0\u01CF\u01D0\u0234\u023D\u0399\u04C0\u04CF", m: "\u039C\u03FA\u03FB\u041C\u043C\u04CD\u04CE", n: "\xD1\xF1\u0143\u0144\u0145\u0146\u0147\u0148\u0149\u014A\u014B\u019D\u019E\u01F8\u01F9\u0220\u0235\u039D\u03A0\u03AE\u03B7\u03DE\u040D\u0418\u0419\u041B\u041F\u0438\u0439\u043B\u043F\u045D\u048A\u048B\u04C5\u04C6\u04E2\u04E3\u04E4\u04E5\u03C0", o: "\xD2\xD3\xD4\xD5\xD6\xD8\xF0\xF2\xF3\xF4\xF5\xF6\xF8\u014C\u014D\u014E\u014F\u0150\u0151\u019F\u01A0\u01A1\u01D1\u01D2\u01EA\u01EB\u01EC\u01ED\u01FE\u01FF\u020C\u020D\u020E\u020F\u022A\u022B\u022C\u022D\u022E\u022F\u0230\u0231\u038C\u0398\u039F\u03B8\u03BF\u03C3\u03CC\u03D5\u03D8\u03D9\u03EC\u03ED\u03F4\u041E\u0424\u043E\u0472\u0473\u04E6\u04E7\u04E8\u04E9\u04EA\u04EB", p: "\u01A4\u01BF\u03A1\u03C1\u03F7\u03F8\u03FC\u0420\u0440\u048E\u048F\xDE", q: "\u024A\u024B", r: "\u0154\u0155\u0156\u0157\u0158\u0159\u01A6\u0210\u0211\u0212\u0213\u024C\u024D\u0403\u0413\u042F\u0433\u044F\u0453\u0490\u0491", s: "\u015A\u015B\u015C\u015D\u015E\u015F\u0160\u0161\u01A7\u01A8\u0218\u0219\u023F\u0405\u0455", t: "\u0162\u0163\u0164\u0165\u0166\u0167\u01AB\u01AC\u01AD\u01AE\u021A\u021B\u0236\u023E\u0393\u03A4\u03C4\u03EE\u0422\u0442", u: "\xB5\xD9\xDA\xDB\xDC\xF9\xFA\xFB\xFC\u0168\u0169\u016A\u016B\u016C\u016D\u016E\u016F\u0170\u0171\u0172\u0173\u01AF\u01B0\u01B1\u01B2\u01D3\u01D4\u01D5\u01D6\u01D7\u01D8\u01D9\u01DA\u01DB\u01DC\u0214\u0215\u0216\u0217\u0244\u03B0\u03BC\u03C5\u03CB\u03CD", v: "\u03BD\u0474\u0475\u0476\u0477", w: "\u0174\u0175\u019C\u03C9\u03CE\u03D6\u03E2\u03E3\u0428\u0429\u0448\u0449\u0461\u047F", x: "\xD7\u03A7\u03C7\u03D7\u03F0\u0425\u0445\u04B2\u04B3\u04FC\u04FD\u04FE\u04FF", y: "\xDD\xFD\xFF\u0176\u0177\u0178\u01B3\u01B4\u0232\u0233\u024E\u024F\u038E\u03A5\u03AB\u03B3\u03C8\u03D2\u03D3\u03D4\u040E\u0423\u0443\u0447\u045E\u0470\u0471\u04AE\u04AF\u04B0\u04B1\u04EE\u04EF\u04F0\u04F1\u04F2\u04F3", z: "\u0179\u017A\u017B\u017C\u017D\u017E\u01A9\u01B5\u01B6\u0224\u0225\u0240\u0396\u03B6" };
var a = {};
Object.keys(r).forEach(function(e3) {
  r[e3].split("").forEach(function(t2) {
    a[t2] = e3;
  });
});
var n = (e3) => {
  let t2 = e3.split("");
  return t2.forEach((e4, r2) => {
    a[e4] && (t2[r2] = a[e4]);
  }), t2.join("");
};
var i = /([A-Z]\.)+[A-Z]?,?$/;
var o = /^[A-Z]\.,?$/;
var s = /[A-Z]{2,}('s|,)?$/;
var l = /([a-z]\.)+[a-z]\.?$/;
var u = function(e3) {
  return i.test(e3) === true || (l.test(e3) === true || (o.test(e3) === true || s.test(e3) === true));
};
var c = n;
var h = u;
var d = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/;
var g = function(e3) {
  let t2 = e3 = (e3 = (e3 = e3 || "").toLowerCase()).trim();
  return e3 = c(e3), d.test(e3) === true && (e3 = e3.replace(/\/.*/, "")), e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = e3.replace(/^[#@]/, "")).replace(/[,;.!?]+$/, "")).replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g, "'")).replace(/[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g, '"')).replace(/\u2026/g, "...")).replace(/\u2013/g, "-")).replace(/([aeiou][ktrp])in$/, "$1ing"), /^(re|un)-?[^aeiou]./.test(e3) === true && (e3 = e3.replace("-", "")), h(e3) && (e3 = e3.replace(/\./g, "")), /^[:;]/.test(e3) === false && (e3 = (e3 = (e3 = e3.replace(/\.{3,}$/g, "")).replace(/[",\.!:;\?\)]+$/g, "")).replace(/^['"\(]+/g, "")), (e3 = (e3 = e3.replace(/[\u200B-\u200D\uFEFF]/g, "")).trim()) === "" && (e3 = t2), e3 = e3.replace(/([0-9]),([0-9])/g, "$1$2");
};
var p = function(e3) {
  return e3 = (e3 = e3.replace(/['’]s$/, "")).replace(/s['’]$/, "s");
};
var m = /^[ \n\t\.\[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;\/⁄·&*•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~\|‖¦©℗®℠™¤₳฿\u0022\uFF02\u0027\u201C\u201F\u201B\u201E\u2E42\u201A\u2035\u2036\u2037\u301D\u0060\u301F]+/;
var f = /[ \n\t\.'\[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;\/⁄·&*@•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~\|‖¦©℗®℠™¤₳฿\u0022\uFF02\u201D\u00B4\u301E]+$/;
var b = /\//;
var y = /['’]/;
var v = /^[a-z]\.([a-z]\.)+/i;
var w = /^[-+\.][0-9]/;
var k = /^'[0-9]{2}/;
var A = (e3) => {
  let t2 = e3, r2 = "", a2 = "";
  (e3 = (e3 = e3.replace(m, (t3) => (r2 = t3, r2 !== "-" && r2 !== "+" && r2 !== "." || !w.test(e3) ? r2 === "'" && k.test(e3) ? (r2 = "", t3) : "" : (r2 = "", t3)))).replace(f, (n3) => (a2 = n3, y.test(n3) && /[sn]['’]$/.test(t2) && y.test(r2) === false ? (a2 = a2.replace(y, ""), "'") : v.test(e3) === true ? (a2 = a2.replace(/\./, ""), ".") : ""))) === "" && (t2 = t2.replace(/ *$/, (e4) => (a2 = e4 || "", "")), e3 = t2, r2 = "", a2 = a2);
  let n2 = g(e3);
  const i2 = { text: e3, clean: n2, reduced: p(n2), pre: r2, post: a2 };
  return b.test(e3) && e3.split(b).forEach((e4) => {
    i2.alias = i2.alias || {}, i2.alias[e4.trim()] = true;
  }), i2;
};
var D = {};
!function(e3) {
  const t2 = /^[A-Z][a-z'\u00C0-\u00FF]/, r2 = /^[A-Z]+s?$/;
  e3.toUpperCase = function() {
    return this.text = this.text.toUpperCase(), this;
  }, e3.toLowerCase = function() {
    return this.text = this.text.toLowerCase(), this;
  }, e3.toTitleCase = function() {
    return this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, (e4) => e4.toUpperCase()), this;
  }, e3.isUpperCase = function() {
    return r2.test(this.text);
  }, e3.isTitleCase = function() {
    return t2.test(this.text);
  }, e3.titleCase = e3.isTitleCase;
}(D);
var $ = {};
!function(e3) {
  const t2 = /(\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F)/, r2 = /(\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E)/;
  e3.hasPost = function(e4) {
    return this.post.indexOf(e4) !== -1;
  }, e3.hasPre = function(e4) {
    return this.pre.indexOf(e4) !== -1;
  }, e3.hasQuote = function() {
    return t2.test(this.pre) || r2.test(this.post);
  }, e3.hasQuotation = e3.hasQuote, e3.hasComma = function() {
    return this.hasPost(",");
  }, e3.hasPeriod = function() {
    return this.hasPost(".") === true && this.hasPost("...") === false;
  }, e3.hasExclamation = function() {
    return this.hasPost("!");
  }, e3.hasQuestionMark = function() {
    return this.hasPost("?") || this.hasPost("\xBF");
  }, e3.hasEllipses = function() {
    return this.hasPost("..") || this.hasPost("\u2026") || this.hasPre("..") || this.hasPre("\u2026");
  }, e3.hasSemicolon = function() {
    return this.hasPost(";");
  }, e3.hasSlash = function() {
    return /\//.test(this.text);
  }, e3.hasHyphen = function() {
    const e4 = /^(-|–|—)$/;
    return e4.test(this.post) || e4.test(this.pre);
  }, e3.hasDash = function() {
    const e4 = / (-|–|—) /;
    return e4.test(this.post) || e4.test(this.pre);
  }, e3.hasContraction = function() {
    return Boolean(this.implicit);
  }, e3.addPunctuation = function(e4) {
    return e4 !== "," && e4 !== ";" || (this.post = this.post.replace(e4, "")), this.post = e4 + this.post, this;
  };
}($);
var P = {};
var E = function(e3, t2, r2 = 3) {
  if (e3 === t2)
    return 1;
  if (e3.length < r2 || t2.length < r2)
    return 0;
  const a2 = function(e4, t3) {
    let r3 = e4.length, a3 = t3.length;
    if (r3 === 0)
      return a3;
    if (a3 === 0)
      return r3;
    let n3 = (a3 > r3 ? a3 : r3) + 1;
    if (Math.abs(r3 - a3) > (n3 || 100))
      return n3 || 100;
    let i2, o2, s2, l2, u2, c2, h2 = [];
    for (let e5 = 0; e5 < n3; e5++)
      h2[e5] = [e5], h2[e5].length = n3;
    for (let e5 = 0; e5 < n3; e5++)
      h2[0][e5] = e5;
    for (let n4 = 1; n4 <= r3; ++n4)
      for (o2 = e4[n4 - 1], i2 = 1; i2 <= a3; ++i2) {
        if (n4 === i2 && h2[n4][i2] > 4)
          return r3;
        s2 = t3[i2 - 1], l2 = o2 === s2 ? 0 : 1, u2 = h2[n4 - 1][i2] + 1, (c2 = h2[n4][i2 - 1] + 1) < u2 && (u2 = c2), (c2 = h2[n4 - 1][i2 - 1] + l2) < u2 && (u2 = c2);
        let a4 = n4 > 1 && i2 > 1 && o2 === t3[i2 - 2] && e4[n4 - 2] === s2 && (c2 = h2[n4 - 2][i2 - 2] + l2) < u2;
        h2[n4][i2] = a4 ? c2 : u2;
      }
    return h2[r3][a3];
  }(e3, t2);
  let n2 = Math.max(e3.length, t2.length);
  return 1 - (n2 === 0 ? 0 : a2 / n2);
};
var H = function() {
};
H = function(e3, t2, r2, a2) {
  let n2 = function(e4, t3, r3, a3) {
    if (t3.id === e4.id)
      return true;
    if (t3.anything === true)
      return true;
    if (t3.start === true && r3 !== 0)
      return false;
    if (t3.end === true && r3 !== a3 - 1)
      return false;
    if (t3.word !== void 0) {
      if (e4.implicit !== null && e4.implicit === t3.word)
        return true;
      if (e4.alias !== void 0 && e4.alias.hasOwnProperty(t3.word))
        return true;
      if (t3.soft === true && t3.word === e4.root)
        return true;
      if (t3.fuzzy !== void 0) {
        let r4 = E(t3.word, e4.reduced);
        if (r4 > t3.fuzzy)
          return true;
        if (t3.soft === true && (r4 = E(t3.word, e4.root), r4 > t3.fuzzy))
          return true;
      }
      return t3.word === e4.clean || t3.word === e4.text || t3.word === e4.reduced;
    }
    return t3.tag !== void 0 ? e4.tags[t3.tag] === true : t3.method !== void 0 ? typeof e4[t3.method] == "function" && e4[t3.method]() === true : t3.regex !== void 0 ? t3.regex.test(e4.clean) : t3.fastOr !== void 0 ? !(!e4.implicit || t3.fastOr.hasOwnProperty(e4.implicit) !== true) || t3.fastOr.hasOwnProperty(e4.reduced) || t3.fastOr.hasOwnProperty(e4.text) : t3.choices !== void 0 && (t3.operator === "and" ? t3.choices.every((t4) => H(e4, t4, r3, a3)) : t3.choices.some((t4) => H(e4, t4, r3, a3)));
  }(e3, t2, r2, a2);
  return t2.negative === true ? !n2 : n2;
};
var j = H;
var N = u;
var x = {};
P.doesMatch = function(e3, t2, r2) {
  return j(this, e3, t2, r2);
}, P.isAcronym = function() {
  return N(this.text);
}, P.isImplicit = function() {
  return this.text === "" && Boolean(this.implicit);
}, P.isKnown = function() {
  return Object.keys(this.tags).some((e3) => x[e3] !== true);
}, P.setRoot = function(e3) {
  let t2 = e3.transforms, r2 = this.implicit || this.clean;
  if (this.tags.Plural && (r2 = t2.toSingular(r2, e3)), this.tags.Verb && !this.tags.Negative && !this.tags.Infinitive) {
    let a2 = null;
    this.tags.PastTense ? a2 = "PastTense" : this.tags.Gerund ? a2 = "Gerund" : this.tags.PresentTense ? a2 = "PresentTense" : this.tags.Participle ? a2 = "Participle" : this.tags.Actor && (a2 = "Actor"), r2 = t2.toInfinitive(r2, e3, a2);
  }
  this.root = r2;
};
var F = {};
var C = n;
var B = /[\s-]/;
var G = /^[A-Z-]+$/;
F.textOut = function(e3, t2, r2) {
  e3 = e3 || {};
  let a2 = this.text, n2 = this.pre, i2 = this.post;
  return e3.reduced === true && (a2 = this.reduced || ""), e3.root === true && (a2 = this.root || ""), e3.implicit === true && this.implicit && (a2 = this.implicit || ""), e3.normal === true && (a2 = this.clean || this.text || ""), e3.root === true && (a2 = this.root || this.reduced || ""), e3.unicode === true && (a2 = C(a2)), e3.titlecase === true && (this.tags.ProperNoun && !this.titleCase() || (this.tags.Acronym ? a2 = a2.toUpperCase() : G.test(a2) && !this.tags.Acronym && (a2 = a2.toLowerCase()))), e3.lowercase === true && (a2 = a2.toLowerCase()), e3.acronyms === true && this.tags.Acronym && (a2 = a2.replace(/\./g, "")), e3.whitespace !== true && e3.root !== true || (n2 = "", i2 = " ", B.test(this.post) !== false && !e3.last || this.implicit || (i2 = "")), e3.punctuation !== true || e3.root || (this.hasPost(".") === true ? i2 = "." + i2 : this.hasPost("?") === true ? i2 = "?" + i2 : this.hasPost("!") === true ? i2 = "!" + i2 : this.hasPost(",") === true ? i2 = "," + i2 : this.hasEllipses() === true && (i2 = "..." + i2)), t2 !== true && (n2 = ""), r2 !== true && (i2 = ""), e3.abbreviations === true && this.tags.Abbreviation && (i2 = i2.replace(/^\./, "")), n2 + a2 + i2;
};
var z = {};
var I = { Auxiliary: 1, Possessive: 1 };
var O = function(e3, t2) {
  let r2 = Object.keys(e3.tags);
  const a2 = t2.tags;
  return r2 = r2.sort((e4, t3) => I[t3] || !a2[t3] ? -1 : a2[t3] ? a2[e4] ? a2[e4].lineage.length > a2[t3].lineage.length ? 1 : a2[e4].isA.length > a2[t3].isA.length ? -1 : 0 : 0 : 1), r2;
};
var T = { text: true, tags: true, implicit: true, whitespace: true, clean: false, id: false, index: false, offset: false, bestTag: false };
z.json = function(e3, t2) {
  e3 = e3 || {};
  let r2 = {};
  return (e3 = Object.assign({}, T, e3)).text && (r2.text = this.text), e3.normal && (r2.normal = this.clean), e3.tags && (r2.tags = Object.keys(this.tags)), e3.clean && (r2.clean = this.clean), (e3.id || e3.offset) && (r2.id = this.id), e3.implicit && this.implicit !== null && (r2.implicit = this.implicit), e3.whitespace && (r2.pre = this.pre, r2.post = this.post), e3.bestTag && (r2.bestTag = O(this, t2)[0]), r2;
};
var V = Object.assign({}, D, $, P, F, z);
var M = {};
var J = {};
function L() {
  return typeof window != "undefined" && window.document;
}
var S = function(e3, t2) {
  for (e3 = e3.toString(); e3.length < t2; )
    e3 += " ";
  return e3;
};
J.logTag = function(e3, t2, r2) {
  if (L())
    return void console.log("%c" + S(e3.clean, 3) + "  + " + t2 + " ", "color: #6accb2;");
  let a2 = "[33m" + S(e3.clean, 15) + "[0m + [32m" + t2 + "[0m ";
  r2 && (a2 = S(a2, 35) + " " + r2), console.log(a2);
}, J.logUntag = function(e3, t2, r2) {
  if (L())
    return void console.log("%c" + S(e3.clean, 3) + "  - " + t2 + " ", "color: #AB5850;");
  let a2 = "[33m" + S(e3.clean, 3) + " [31m - #" + t2 + "[0m ";
  r2 && (a2 = S(a2, 35) + " " + r2), console.log(a2);
}, J.isArray = function(e3) {
  return Object.prototype.toString.call(e3) === "[object Array]";
}, J.titleCase = (e3) => e3.charAt(0).toUpperCase() + e3.substr(1);
var _ = J;
var K = function(e3, t2, r2, a2) {
  let n2 = a2.tags;
  if (t2 === "" || t2 === "." || t2 === "-")
    return;
  if (t2[0] === "#" && (t2 = t2.replace(/^#/, "")), t2 = _.titleCase(t2), e3.tags[t2] === true)
    return;
  const i2 = a2.isVerbose();
  i2 === true && _.logTag(e3, t2, r2), e3.tags[t2] = true, n2.hasOwnProperty(t2) === true && (n2[t2].isA.forEach((t3) => {
    e3.tags[t3] = true, i2 === true && _.logTag(e3, "\u2192 " + t3);
  }), e3.unTag(n2[t2].notA, "\u2190", a2));
};
var q = J;
var W = /^[a-z]/;
var R = function(e3, t2, r2, a2) {
  const n2 = a2.isVerbose();
  if (t2 === "*")
    return e3.tags = {}, e3;
  var i2;
  t2 = t2.replace(/^#/, ""), W.test(t2) === true && (t2 = (i2 = t2).charAt(0).toUpperCase() + i2.substr(1)), e3.tags[t2] === true && (delete e3.tags[t2], n2 === true && q.logUntag(e3, t2, r2));
  const o2 = a2.tags;
  if (o2[t2]) {
    let r3 = o2[t2].lineage;
    for (let t3 = 0; t3 < r3.length; t3++)
      e3.tags[r3[t3]] === true && (delete e3.tags[r3[t3]], n2 === true && q.logUntag(e3, " - " + r3[t3]));
  }
  return e3;
};
var U = function(e3, t2, r2) {
  const a2 = r2.tags;
  if (t2[0] === "#" && (t2 = t2.replace(/^#/, "")), a2[t2] === void 0)
    return true;
  let n2 = a2[t2].notA || [];
  for (let t3 = 0; t3 < n2.length; t3++)
    if (e3.tags[n2[t3]] === true)
      return false;
  return a2[t2].isA === void 0 || U(e3, a2[t2].isA, r2);
};
var Q = function(e3, t2, r2, a2) {
  if (typeof t2 != "string")
    for (let n2 = 0; n2 < t2.length; n2++)
      K(e3, t2[n2], r2, a2);
  else
    K(e3, t2, r2, a2);
};
var Z = function(e3, t2, r2, a2) {
  if (typeof t2 != "string" && t2)
    for (let n2 = 0; n2 < t2.length; n2++)
      R(e3, t2[n2], r2, a2);
  else
    R(e3, t2, r2, a2);
};
var X = U;
M.tag = function(e3, t2, r2) {
  return Q(this, e3, t2, r2), this;
}, M.tagSafe = function(e3, t2, r2) {
  return X(this, e3, r2) && Q(this, e3, t2, r2), this;
}, M.unTag = function(e3, t2, r2) {
  return Z(this, e3, t2, r2), this;
}, M.canBe = function(e3, t2) {
  return X(this, e3, t2);
};
var Y = t;
var ee = A;
var te = V;
var re = M;
var ae = class {
  constructor(e3 = "") {
    e3 = String(e3);
    let t2 = ee(e3);
    this.text = t2.text || "", this.clean = t2.clean, this.reduced = t2.reduced, this.root = null, this.implicit = null, this.pre = t2.pre || "", this.post = t2.post || "", this.tags = {}, this.prev = null, this.next = null, this.id = Y(t2.clean), this.isA = "Term", t2.alias && (this.alias = t2.alias);
  }
  set(e3) {
    let t2 = ee(e3);
    return this.text = t2.text, this.clean = t2.clean, this.reduced = t2.reduced, this.root = null, this.implicit = null, this;
  }
};
ae.prototype.clone = function() {
  let e3 = new ae(this.text);
  return e3.pre = this.pre, e3.post = this.post, e3.clean = this.clean, e3.reduced = this.reduced, e3.root = this.root, e3.implicit = this.implicit, e3.tags = Object.assign({}, this.tags), e3;
}, Object.assign(ae.prototype, te), Object.assign(ae.prototype, re);
var ne = ae;
var ie = { terms: function(e3) {
  if (this.length === 0)
    return [];
  if (this.cache.terms)
    return e3 !== void 0 ? this.cache.terms[e3] : this.cache.terms;
  let t2 = [this.pool.get(this.start)];
  for (let r2 = 0; r2 < this.length - 1; r2 += 1) {
    let a2 = t2[t2.length - 1].next;
    if (a2 === null) {
      console.error("Compromise error: Linked list broken in phrase '" + this.start + "'");
      break;
    }
    let n2 = this.pool.get(a2);
    if (t2.push(n2), e3 !== void 0 && e3 === r2)
      return t2[e3];
  }
  return e3 === void 0 && (this.cache.terms = t2), e3 !== void 0 ? t2[e3] : t2;
}, clone: function(e3) {
  if (e3) {
    let e4 = this.buildFrom(this.start, this.length);
    return e4.cache = this.cache, e4;
  }
  let t2 = this.terms().map((e4) => e4.clone());
  return t2.forEach((e4, r2) => {
    this.pool.add(e4), t2[r2 + 1] && (e4.next = t2[r2 + 1].id), t2[r2 - 1] && (e4.prev = t2[r2 - 1].id);
  }), this.buildFrom(t2[0].id, t2.length);
}, lastTerm: function() {
  let e3 = this.terms();
  return e3[e3.length - 1];
}, hasId: function(e3) {
  if (this.length === 0 || !e3)
    return false;
  if (this.start === e3)
    return true;
  if (this.cache.terms) {
    let t3 = this.cache.terms;
    for (let r2 = 0; r2 < t3.length; r2++)
      if (t3[r2].id === e3)
        return true;
    return false;
  }
  let t2 = this.start;
  for (let r2 = 0; r2 < this.length - 1; r2 += 1) {
    let r3 = this.pool.get(t2);
    if (r3 === void 0)
      return console.error(`Compromise error: Linked list broken. Missing term '${t2}' in phrase '${this.start}'
`), false;
    if (r3.next === e3)
      return true;
    t2 = r3.next;
  }
  return false;
}, wordCount: function() {
  return this.terms().filter((e3) => e3.text !== "").length;
}, fullSentence: function() {
  let e3 = this.terms(0);
  for (; e3.prev; )
    e3 = this.pool.get(e3.prev);
  let t2 = e3.id, r2 = 1;
  for (; e3.next; )
    e3 = this.pool.get(e3.next), r2 += 1;
  return this.buildFrom(t2, r2);
} };
var oe = {};
oe.text = function(e3 = {}, t2, r2) {
  typeof e3 == "string" && (e3 = e3 === "normal" ? { whitespace: true, unicode: true, lowercase: true, punctuation: true, acronyms: true, abbreviations: true, implicit: true, normal: true } : e3 === "clean" ? { titlecase: false, lowercase: true, punctuation: true, whitespace: true, unicode: true, implicit: true, normal: true } : e3 === "reduced" ? { punctuation: false, titlecase: false, lowercase: true, whitespace: true, unicode: true, implicit: true, reduced: true } : e3 === "implicit" ? { punctuation: true, implicit: true, whitespace: true, trim: true } : e3 === "root" ? { titlecase: false, lowercase: true, punctuation: true, whitespace: true, unicode: true, implicit: true, root: true } : {});
  let a2 = this.terms(), n2 = false;
  a2[0] && a2[0].prev === null && a2[a2.length - 1].next === null && (n2 = true);
  let i2 = a2.reduce((i3, o2, s2) => {
    if (s2 === 0 && o2.text === "" && o2.implicit !== null && !e3.implicit)
      return i3;
    e3.last = r2 && s2 === a2.length - 1;
    let l2 = true, u2 = true;
    return n2 === false && (s2 === 0 && t2 && (l2 = false), s2 === a2.length - 1 && r2 && (u2 = false)), i3 + o2.textOut(e3, l2, u2);
  }, "");
  return n2 === true && r2 && (i2 = i2.replace(/ +$/, "")), e3.trim === true && (i2 = i2.trim()), i2;
};
var se = { trim: function() {
  let e3 = this.terms();
  if (e3.length > 0) {
    e3[0].pre = e3[0].pre.replace(/^\s+/, "");
    let t2 = e3[e3.length - 1];
    t2.post = t2.post.replace(/\s+$/, "");
  }
  return this;
} };
var le = {};
var ue = /[.?!]\s*$/;
var ce = function(e3, t2) {
  t2[0].pre = e3[0].pre;
  let r2 = e3[e3.length - 1], a2 = t2[t2.length - 1];
  a2.post = function(e4, t3) {
    if (ue.test(t3))
      return t3 + e4.match(/\s*$/);
    return e4;
  }(r2.post, a2.post), r2.post = "", r2.post === "" && (r2.post += " ");
};
var he = / /;
var de = function(e3, t2, r2) {
  let a2 = e3.terms(), n2 = t2.terms();
  ce(a2, n2), function(e4, t3, r3) {
    let a3 = e4[e4.length - 1], n3 = t3[t3.length - 1], i3 = a3.next;
    a3.next = t3[0].id, n3.next = i3, i3 && (r3.get(i3).prev = n3.id);
    let o3 = e4[0].id;
    o3 && (t3[0].prev = o3);
  }(a2, n2, e3.pool);
  let i2 = [e3], o2 = e3.start, s2 = [r2];
  return s2 = s2.concat(r2.parents()), s2.forEach((e4) => {
    let t3 = e4.list.filter((e5) => e5.hasId(o2));
    i2 = i2.concat(t3);
  }), i2 = function(e4) {
    return e4.filter((t3, r3) => e4.indexOf(t3) === r3);
  }(i2), i2.forEach((e4) => {
    e4.length += t2.length;
  }), e3.cache = {}, e3;
};
var ge = function(e3, t2, r2) {
  const a2 = e3.start;
  let n2 = t2.terms();
  !function(e4) {
    let t3 = e4[e4.length - 1];
    he.test(t3.post) === false && (t3.post += " ");
  }(n2), function(e4, t3, r3) {
    let a3 = r3[r3.length - 1];
    a3.next = e4.start;
    let n3 = e4.pool, i3 = n3.get(e4.start);
    i3.prev && (n3.get(i3.prev).next = t3.start);
    r3[0].prev = e4.terms(0).prev, e4.terms(0).prev = a3.id;
  }(e3, t2, n2);
  let i2 = [e3], o2 = [r2];
  return o2 = o2.concat(r2.parents()), o2.forEach((e4) => {
    let r3 = e4.list.filter((e5) => e5.hasId(a2) || e5.hasId(t2.start));
    i2 = i2.concat(r3);
  }), i2 = function(e4) {
    return e4.filter((t3, r3) => e4.indexOf(t3) === r3);
  }(i2), i2.forEach((e4) => {
    e4.length += t2.length, e4.start === a2 && (e4.start = t2.start), e4.cache = {};
  }), e3;
};
var pe = function(e3, t2) {
  let r2 = t2.pool(), a2 = e3.terms(), n2 = r2.get(a2[0].prev) || {}, i2 = r2.get(a2[a2.length - 1].next) || {};
  a2[0].implicit && n2.implicit && (n2.set(n2.implicit), n2.post += " "), function(e4, t3, r3, a3) {
    let n3 = e4.parents();
    n3.push(e4), n3.forEach((e5) => {
      let n4 = e5.list.find((e6) => e6.hasId(t3));
      n4 && (n4.length -= r3, n4.start === t3 && (n4.start = a3.id), n4.cache = {});
    }), e4.list = e4.list.filter((e5) => !(!e5.start || !e5.length));
  }(t2, e3.start, e3.length, i2), n2 && (n2.next = i2.id), i2 && (i2.prev = n2.id);
};
le.append = function(e3, t2) {
  return de(this, e3, t2), this;
}, le.prepend = function(e3, t2) {
  return ge(this, e3, t2), this;
}, le.delete = function(e3) {
  return pe(this, e3), this;
}, le.replace = function(e3, t2) {
  let r2 = this.length;
  de(this, e3, t2);
  let a2 = this.buildFrom(this.start, this.length);
  a2.length = r2, pe(a2, t2);
}, le.splitOn = function(e3) {
  let t2 = this.terms(), r2 = { before: null, match: null, after: null }, a2 = t2.findIndex((t3) => t3.id === e3.start);
  if (a2 === -1)
    return r2;
  let n2 = t2.slice(0, a2);
  n2.length > 0 && (r2.before = this.buildFrom(n2[0].id, n2.length));
  let i2 = t2.slice(a2, a2 + e3.length);
  i2.length > 0 && (r2.match = this.buildFrom(i2[0].id, i2.length));
  let o2 = t2.slice(a2 + e3.length, t2.length);
  return o2.length > 0 && (r2.after = this.buildFrom(o2[0].id, o2.length, this.pool)), r2;
};
var me = { json: function(e3 = {}, t2) {
  let r2 = {};
  return e3.text && (r2.text = this.text()), e3.normal && (r2.normal = this.text("normal")), e3.clean && (r2.clean = this.text("clean")), e3.reduced && (r2.reduced = this.text("reduced")), e3.implicit && (r2.implicit = this.text("implicit")), e3.root && (r2.root = this.text("root")), e3.trim && (r2.text && (r2.text = r2.text.trim()), r2.normal && (r2.normal = r2.normal.trim()), r2.reduced && (r2.reduced = r2.reduced.trim())), e3.terms && (e3.terms === true && (e3.terms = {}), r2.terms = this.terms().map((r3) => r3.json(e3.terms, t2))), r2;
} };
var fe = { lookAhead: function(e3) {
  e3 || (e3 = ".*");
  let t2 = this.pool, r2 = [];
  const a2 = function(e4) {
    let n3 = t2.get(e4);
    n3 && (r2.push(n3), n3.prev && a2(n3.next));
  };
  let n2 = this.terms(), i2 = n2[n2.length - 1];
  return a2(i2.next), r2.length === 0 ? [] : this.buildFrom(r2[0].id, r2.length).match(e3);
}, lookBehind: function(e3) {
  e3 || (e3 = ".*");
  let t2 = this.pool, r2 = [];
  const a2 = function(e4) {
    let n3 = t2.get(e4);
    n3 && (r2.push(n3), n3.prev && a2(n3.prev));
  };
  let n2 = t2.get(this.start);
  return a2(n2.prev), r2.length === 0 ? [] : this.buildFrom(r2[r2.length - 1].id, r2.length).match(e3);
} };
var be = Object.assign({}, ie, oe, se, le, me, fe);
var ye = {};
var ve;
var we = function(e3, t2) {
  if (t2.length === 0)
    return true;
  for (let e4 = 0; e4 < t2.length; e4 += 1) {
    let r2 = t2[e4];
    if (r2.optional !== true && r2.negative !== true && r2.start === true && e4 > 0)
      return true;
    if (r2.anything === true && r2.negative === true)
      return true;
  }
  return false;
};
var ke = {};
(ve = ke).getGreedy = function(e3, t2) {
  let r2 = Object.assign({}, e3.regs[e3.r], { start: false, end: false }), a2 = e3.t;
  for (; e3.t < e3.terms.length; e3.t += 1) {
    if (t2 && e3.terms[e3.t].doesMatch(t2, e3.start_i + e3.t, e3.phrase_length))
      return e3.t;
    let n2 = e3.t - a2 + 1;
    if (r2.max !== void 0 && n2 === r2.max)
      return e3.t;
    if (e3.terms[e3.t].doesMatch(r2, e3.start_i + e3.t, e3.phrase_length) === false)
      return r2.min !== void 0 && n2 < r2.min ? null : e3.t;
  }
  return e3.t;
}, ve.greedyTo = function(e3, t2) {
  let r2 = e3.t;
  if (!t2)
    return e3.terms.length;
  for (; r2 < e3.terms.length; r2 += 1)
    if (e3.terms[r2].doesMatch(t2, e3.start_i + r2, e3.phrase_length) === true)
      return r2;
  return null;
}, ve.isEndGreedy = function(e3, t2) {
  if (e3.end === true && e3.greedy === true && t2.start_i + t2.t < t2.phrase_length - 1) {
    let r2 = Object.assign({}, e3, { end: false });
    if (t2.terms[t2.t].doesMatch(r2, t2.start_i + t2.t, t2.phrase_length) === true)
      return true;
  }
  return false;
}, ve.doOrBlock = function(e3, t2 = 0) {
  let r2 = e3.regs[e3.r], a2 = false;
  for (let n2 = 0; n2 < r2.choices.length; n2 += 1) {
    let i2 = r2.choices[n2];
    if (a2 = i2.every((r3, a3) => {
      let n3 = 0, i3 = e3.t + a3 + t2 + n3;
      if (e3.terms[i3] === void 0)
        return false;
      let o2 = e3.terms[i3].doesMatch(r3, i3 + e3.start_i, e3.phrase_length);
      if (o2 === true && r3.greedy === true)
        for (let t3 = 1; t3 < e3.terms.length; t3 += 1) {
          let a4 = e3.terms[i3 + t3];
          if (a4) {
            if (a4.doesMatch(r3, e3.start_i + t3, e3.phrase_length) !== true)
              break;
            n3 += 1;
          }
        }
      return t2 += n3, o2;
    }), a2) {
      t2 += i2.length;
      break;
    }
  }
  return a2 && r2.greedy === true ? ve.doOrBlock(e3, t2) : t2;
}, ve.doAndBlock = function(e3) {
  let t2 = 0;
  return e3.regs[e3.r].choices.every((r2) => {
    let a2 = r2.every((t3, r3) => {
      let a3 = e3.t + r3;
      return e3.terms[a3] !== void 0 && e3.terms[a3].doesMatch(t3, a3, e3.phrase_length);
    });
    return a2 === true && r2.length > t2 && (t2 = r2.length), a2;
  }) === true && t2;
}, ve.getGroup = function(e3, t2, r2) {
  if (e3.groups[e3.groupId])
    return e3.groups[e3.groupId];
  const a2 = e3.terms[t2].id;
  return e3.groups[e3.groupId] = { group: String(r2), start: a2, length: 0 }, e3.groups[e3.groupId];
};
var Ae = t;
var De = ke;
var $e = function(e3, t2, r2, a2) {
  let n2 = { t: 0, terms: e3, r: 0, regs: t2, groups: {}, start_i: r2, phrase_length: a2, hasGroup: false, groupId: null, previousGroup: null };
  for (; n2.r < t2.length; n2.r += 1) {
    let e4 = t2[n2.r];
    if (n2.hasGroup = typeof e4.named == "string" || typeof e4.named == "number", n2.hasGroup === true) {
      const r4 = t2[n2.r - 1];
      r4 && r4.named === e4.named && n2.previousGroup ? n2.groupId = n2.previousGroup : (n2.groupId = Ae(e4.named), n2.previousGroup = n2.groupId);
    }
    if (!n2.terms[n2.t]) {
      if (t2.slice(n2.r).some((e5) => !e5.optional) === false)
        break;
      return null;
    }
    if (e4.anything === true && e4.greedy === true) {
      let r4 = De.greedyTo(n2, t2[n2.r + 1]);
      if (r4 === null || r4 === 0)
        return null;
      if (e4.min !== void 0 && r4 - n2.t < e4.min)
        return null;
      if (e4.max !== void 0 && r4 - n2.t > e4.max) {
        n2.t = n2.t + e4.max;
        continue;
      }
      if (n2.hasGroup === true) {
        De.getGroup(n2, n2.t, e4.named).length = r4 - n2.t;
      }
      n2.t = r4;
      continue;
    }
    if (e4.choices !== void 0 && e4.operator === "or") {
      let t3 = De.doOrBlock(n2);
      if (t3) {
        if (e4.negative === true)
          return null;
        if (n2.hasGroup === true) {
          De.getGroup(n2, n2.t, e4.named).length += t3;
        }
        n2.t += t3;
        continue;
      }
      if (!e4.optional)
        return null;
    }
    if (e4.choices !== void 0 && e4.operator === "and") {
      let t3 = De.doAndBlock(n2);
      if (t3) {
        if (e4.negative === true)
          return null;
        if (n2.hasGroup === true) {
          De.getGroup(n2, n2.t, e4.named).length += t3;
        }
        n2.t += t3;
        continue;
      }
      if (!e4.optional)
        return null;
    }
    let r3 = n2.terms[n2.t], i2 = r3.doesMatch(e4, n2.start_i + n2.t, n2.phrase_length);
    if (e4.anything === true || i2 === true || De.isEndGreedy(e4, n2)) {
      let i3 = n2.t;
      if (e4.optional && t2[n2.r + 1] && e4.negative)
        continue;
      if (e4.optional && t2[n2.r + 1]) {
        let a3 = r3.doesMatch(t2[n2.r + 1], n2.start_i + n2.t, n2.phrase_length);
        if (e4.negative || a3) {
          let e5 = n2.terms[n2.t + 1];
          e5 && e5.doesMatch(t2[n2.r + 1], n2.start_i + n2.t, n2.phrase_length) || (n2.r += 1);
        }
      }
      if (n2.t += 1, e4.end === true && n2.t !== n2.terms.length && e4.greedy !== true)
        return null;
      if (e4.greedy === true) {
        if (n2.t = De.getGreedy(n2, t2[n2.r + 1]), n2.t === null)
          return null;
        if (e4.min && e4.min > n2.t)
          return null;
        if (e4.end === true && n2.start_i + n2.t !== a2)
          return null;
      }
      if (n2.hasGroup === true) {
        const t3 = De.getGroup(n2, i3, e4.named);
        n2.t > 1 && e4.greedy ? t3.length += n2.t - i3 : t3.length++;
      }
    } else {
      if (e4.negative) {
        let t3 = Object.assign({}, e4);
        if (t3.negative = false, n2.terms[n2.t].doesMatch(t3, n2.start_i + n2.t, n2.phrase_length) === true)
          return null;
      }
      if (e4.optional !== true) {
        if (n2.terms[n2.t].isImplicit() && t2[n2.r - 1] && n2.terms[n2.t + 1]) {
          if (n2.terms[n2.t - 1] && n2.terms[n2.t - 1].implicit === t2[n2.r - 1].word)
            return null;
          if (n2.terms[n2.t + 1].doesMatch(e4, n2.start_i + n2.t, n2.phrase_length)) {
            n2.t += 2;
            continue;
          }
        }
        return null;
      }
    }
  }
  return { match: n2.terms.slice(0, n2.t), groups: n2.groups };
};
var Pe = function(e3, t2, r2) {
  if (!r2 || r2.length === 0)
    return r2;
  if (t2.some((e4) => e4.end)) {
    let t3 = e3[e3.length - 1];
    r2 = r2.filter(({ match: e4 }) => e4.indexOf(t3) !== -1);
  }
  return r2;
};
var Ee = /(?:^|\s)([\!\[\^]*(?:<[^<]*>)?\/.*?[^\\\/]\/[\?\]\+\*\$~]*)(?:\s|$)/;
var He = /([\!\[\^]*(?:<[^<]*>)?\([^\)]+[^\\\)]\)[\?\]\+\*\$~]*)(?:\s|$)/;
var je = / /g;
var Ne = (e3) => /^[\!\[\^]*(<[^<]*>)?\//.test(e3) && /\/[\?\]\+\*\$~]*$/.test(e3);
var xe = function(e3) {
  return e3 = (e3 = e3.map((e4) => e4.trim())).filter((e4) => e4);
};
var Fe = function(e3) {
  let t2 = e3.split(Ee), r2 = [];
  t2.forEach((e4) => {
    Ne(e4) ? r2.push(e4) : r2 = r2.concat(e4.split(He));
  }), r2 = xe(r2);
  let a2 = [];
  return r2.forEach((e4) => {
    ((e5) => /^[\!\[\^]*(<[^<]*>)?\(/.test(e5) && /\)[\?\]\+\*\$~]*$/.test(e5))(e4) || Ne(e4) ? a2.push(e4) : a2 = a2.concat(e4.split(je));
  }), a2 = xe(a2), a2;
};
var Ce = /\{([0-9]+,?[0-9]*)\}/;
var Be = /&&/;
var Ge = new RegExp(/^<\s*?(\S+)\s*?>/);
var ze = function(e3) {
  return e3[e3.length - 1];
};
var Ie = function(e3) {
  return e3[0];
};
var Oe = function(e3) {
  return e3.substr(1);
};
var Te = function(e3) {
  return e3.substr(0, e3.length - 1);
};
var Ve = function(e3) {
  return e3 = Oe(e3), e3 = Te(e3);
};
var Me = function(e3) {
  let t2 = {};
  for (let r3 = 0; r3 < 2; r3 += 1) {
    if (ze(e3) === "$" && (t2.end = true, e3 = Te(e3)), Ie(e3) === "^" && (t2.start = true, e3 = Oe(e3)), (Ie(e3) === "[" || ze(e3) === "]") && (t2.named = true, Ie(e3) === "[" ? t2.groupType = ze(e3) === "]" ? "single" : "start" : t2.groupType = "end", e3 = (e3 = e3.replace(/^\[/, "")).replace(/\]$/, ""), Ie(e3) === "<")) {
      const r4 = Ge.exec(e3);
      r4.length >= 2 && (t2.named = r4[1], e3 = e3.replace(r4[0], ""));
    }
    if (ze(e3) === "+" && (t2.greedy = true, e3 = Te(e3)), e3 !== "*" && ze(e3) === "*" && e3 !== "\\*" && (t2.greedy = true, e3 = Te(e3)), ze(e3) === "?" && (t2.optional = true, e3 = Te(e3)), Ie(e3) === "!" && (t2.negative = true, e3 = Oe(e3)), Ie(e3) === "(" && ze(e3) === ")") {
      Be.test(e3) ? (t2.choices = e3.split(Be), t2.operator = "and") : (t2.choices = e3.split("|"), t2.operator = "or"), t2.choices[0] = Oe(t2.choices[0]);
      let r4 = t2.choices.length - 1;
      t2.choices[r4] = Te(t2.choices[r4]), t2.choices = t2.choices.map((e4) => e4.trim()), t2.choices = t2.choices.filter((e4) => e4), t2.choices = t2.choices.map((e4) => e4.split(/ /g).map(Me)), e3 = "";
    }
    if (Ie(e3) === "/" && ze(e3) === "/")
      return e3 = Ve(e3), t2.regex = new RegExp(e3), t2;
    if (Ie(e3) === "~" && ze(e3) === "~")
      return e3 = Ve(e3), t2.soft = true, t2.word = e3, t2;
  }
  return Ce.test(e3) === true && (e3 = e3.replace(Ce, (e4, r3) => {
    let a2 = r3.split(/,/g);
    return a2.length === 1 ? (t2.min = Number(a2[0]), t2.max = Number(a2[0])) : (t2.min = Number(a2[0]), t2.max = Number(a2[1] || 999)), t2.greedy = true, t2.optional = true, "";
  })), Ie(e3) === "#" ? (t2.tag = Oe(e3), t2.tag = (r2 = t2.tag).charAt(0).toUpperCase() + r2.substr(1), t2) : Ie(e3) === "@" ? (t2.method = Oe(e3), t2) : e3 === "." ? (t2.anything = true, t2) : e3 === "*" ? (t2.anything = true, t2.greedy = true, t2.optional = true, t2) : (e3 && (e3 = (e3 = e3.replace("\\*", "*")).replace("\\.", "."), t2.word = e3.toLowerCase()), t2);
  var r2;
};
var Je = Fe;
var Le = Me;
var Se = function(e3, t2 = {}) {
  return e3.filter((e4) => e4.groupType).length > 0 && (e3 = function(e4) {
    let t3, r2 = false, a2 = -1;
    for (let n2 = 0; n2 < e4.length; n2++) {
      const i2 = e4[n2];
      i2.groupType !== "single" || i2.named !== true ? (i2.groupType === "start" && (r2 = true, typeof i2.named == "string" || typeof i2.named == "number" ? t3 = i2.named : (a2 += 1, t3 = a2)), r2 && (i2.named = t3), i2.groupType === "end" && (r2 = false)) : (a2 += 1, i2.named = a2);
    }
    return e4;
  }(e3)), t2.fuzzy || (e3 = function(e4) {
    return e4.map((e5) => {
      if (e5.choices !== void 0 && e5.choices.every((e6) => {
        if (e6.length !== 1)
          return false;
        let t3 = e6[0];
        return t3.word !== void 0 && t3.negative !== true && t3.optional !== true && t3.method !== true;
      }) === true) {
        let t3 = {};
        e5.choices.forEach((e6) => {
          t3[e6[0].word] = true;
        }), e5.fastOr = t3, delete e5.choices;
      }
      return e5;
    });
  }(e3)), e3;
};
var _e = function(e3, t2 = {}) {
  if (e3 == null || e3 === "")
    return [];
  if (typeof e3 == "object") {
    if (function(e4) {
      return Object.prototype.toString.call(e4) === "[object Array]";
    }(e3)) {
      if (e3.length === 0 || !e3[0])
        return [];
      if (typeof e3[0] == "object")
        return e3;
      if (typeof e3[0] == "string")
        return function(e4) {
          return [{ choices: e4.map((e5) => [{ word: e5 }]), operator: "or" }];
        }(e3);
    }
    return e3 && e3.isA === "Doc" ? function(e4) {
      if (!e4 || !e4.list || !e4.list[0])
        return [];
      let t3 = [];
      return e4.list.forEach((e5) => {
        let r3 = [];
        e5.terms().forEach((e6) => {
          r3.push(e6.id);
        }), t3.push(r3);
      }), [{ idBlocks: t3 }];
    }(e3) : [];
  }
  typeof e3 == "number" && (e3 = String(e3));
  let r2 = Je(e3);
  return r2 = r2.map((e4) => Le(e4)), r2 = Se(r2, t2), r2 = function(e4, t3) {
    return t3.fuzzy === true && (t3.fuzzy = 0.85), typeof t3.fuzzy == "number" && (e4 = e4.map((e5) => (t3.fuzzy > 0 && e5.word && (e5.fuzzy = t3.fuzzy), e5.choices && e5.choices.forEach((e6) => {
      e6.forEach((e7) => {
        e7.fuzzy = t3.fuzzy;
      });
    }), e5))), e4;
  }(r2, t2), r2;
};
var Ke = we;
var qe = $e;
var We = Pe;
var Re = _e;
var Ue = function(e3, t2) {
  let r2 = [], a2 = t2[0].idBlocks;
  for (let t3 = 0; t3 < e3.length; t3 += 1)
    a2.forEach((a3) => {
      if (a3.length === 0)
        return;
      a3.every((r3, a4) => e3[t3 + a4].id === r3) && (r2.push({ match: e3.slice(t3, t3 + a3.length) }), t3 += a3.length - 1);
    });
  return r2;
};
var Qe = function(e3, t2, r2 = false) {
  if (typeof t2 == "string" && (t2 = Re(t2)), Ke(e3, t2) === true)
    return [];
  const a2 = t2.filter((e4) => e4.optional !== true && e4.negative !== true).length;
  let n2 = e3.terms(), i2 = [];
  if (t2[0].idBlocks) {
    let e4 = Ue(n2, t2);
    if (e4 && e4.length > 0)
      return We(n2, t2, e4);
  }
  if (t2[0].start === true) {
    let e4 = qe(n2, t2, 0, n2.length);
    return e4 && e4.match && e4.match.length > 0 && (e4.match = e4.match.filter((e5) => e5), i2.push(e4)), We(n2, t2, i2);
  }
  for (let e4 = 0; e4 < n2.length && !(e4 + a2 > n2.length); e4 += 1) {
    let a3 = qe(n2.slice(e4), t2, e4, n2.length);
    if (a3 && a3.match && a3.match.length > 0 && (e4 += a3.match.length - 1, a3.match = a3.match.filter((e5) => e5), i2.push(a3), r2 === true))
      return We(n2, t2, i2);
  }
  return We(n2, t2, i2);
};
var Ze = Qe;
var Xe = Qe;
var Ye = function(e3, t2) {
  let r2 = {};
  Ze(e3, t2).forEach(({ match: e4 }) => {
    e4.forEach((e5) => {
      r2[e5.id] = true;
    });
  });
  let a2 = e3.terms(), n2 = [], i2 = [];
  return a2.forEach((e4) => {
    r2[e4.id] !== true ? i2.push(e4) : i2.length > 0 && (n2.push(i2), i2 = []);
  }), i2.length > 0 && n2.push(i2), n2;
};
ye.match = function(e3, t2 = false) {
  let r2 = Xe(this, e3, t2);
  return r2 = r2.map(({ match: e4, groups: t3 }) => {
    let r3 = this.buildFrom(e4[0].id, e4.length, t3);
    return r3.cache.terms = e4, r3;
  }), r2;
}, ye.has = function(e3) {
  return Xe(this, e3, true).length > 0;
}, ye.not = function(e3) {
  let t2 = Ye(this, e3);
  return t2 = t2.map((e4) => this.buildFrom(e4[0].id, e4.length)), t2;
}, ye.canBe = function(e3, t2) {
  let r2 = [], a2 = this.terms(), n2 = false;
  for (let i2 = 0; i2 < a2.length; i2 += 1) {
    let o2 = a2[i2].canBe(e3, t2);
    o2 === true && (n2 === true ? r2[r2.length - 1].push(a2[i2]) : r2.push([a2[i2]]), n2 = o2);
  }
  return r2 = r2.filter((e4) => e4.length > 0).map((e4) => this.buildFrom(e4[0].id, e4.length)), r2;
};
var et = be;
var tt = ye;
var rt = class {
  constructor(e3, t2, r2) {
    this.start = e3, this.length = t2, this.isA = "Phrase", Object.defineProperty(this, "pool", { enumerable: false, writable: true, value: r2 }), Object.defineProperty(this, "cache", { enumerable: false, writable: true, value: {} }), Object.defineProperty(this, "groups", { enumerable: false, writable: true, value: {} });
  }
};
rt.prototype.buildFrom = function(e3, t2, r2) {
  let a2 = new rt(e3, t2, this.pool);
  return r2 && Object.keys(r2).length > 0 ? a2.groups = r2 : a2.groups = this.groups, a2;
}, Object.assign(rt.prototype, tt), Object.assign(rt.prototype, et);
var at = { term: "terms" };
Object.keys(at).forEach((e3) => rt.prototype[e3] = rt.prototype[at[e3]]);
var nt = rt;
var it = class {
  constructor(e3 = {}) {
    Object.defineProperty(this, "words", { enumerable: false, value: e3 });
  }
  add(e3) {
    return this.words[e3.id] = e3, this;
  }
  get(e3) {
    return this.words[e3];
  }
  remove(e3) {
    delete this.words[e3];
  }
  merge(e3) {
    return Object.assign(this.words, e3.words), this;
  }
  stats() {
    return { words: Object.keys(this.words).length };
  }
};
it.prototype.clone = function() {
  let e3 = Object.keys(this.words).reduce((e4, t2) => {
    let r2 = this.words[t2].clone();
    return e4[r2.id] = r2, e4;
  }, {});
  return new it(e3);
};
var ot = it;
var st = (e3) => {
  e3.forEach((t2, r2) => {
    r2 > 0 && (t2.prev = e3[r2 - 1].id), e3[r2 + 1] && (t2.next = e3[r2 + 1].id);
  });
};
var lt = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g;
var ut = /\S/;
var ct = /[ .][A-Z]\.? *$/i;
var ht = /(?:\u2026|\.{2,}) *$/;
var dt = /((?:\r?\n|\r)+)/;
var gt = /[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i;
var pt = /^\s+/;
var mt = function(e3, t2, r2, a2) {
  if (a2.hasLetter = function(e4, t3) {
    return t3 || gt.test(e4);
  }(t2, a2.hasLetter), !a2.hasLetter)
    return false;
  if (function(e4, t3) {
    return t3.indexOf(".") !== -1 && ct.test(e4);
  }(e3, t2))
    return false;
  if (function(e4, t3) {
    return t3.indexOf(".") !== -1 && ht.test(e4);
  }(e3, t2))
    return false;
  let n2 = e3.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, "").split(" "), i2 = n2[n2.length - 1].toLowerCase();
  return !r2.hasOwnProperty(i2);
};
var ft = function(e3, t2) {
  let r2 = t2.cache.abbreviations;
  e3 = e3 || "";
  let a2 = [], n2 = [];
  if (!(e3 = String(e3)) || typeof e3 != "string" || ut.test(e3) === false)
    return a2;
  let i2 = function(e4) {
    let t3 = [], r3 = e4.split(dt);
    for (let e5 = 0; e5 < r3.length; e5++) {
      let a3 = r3[e5].split(lt);
      for (let e6 = 0; e6 < a3.length; e6++)
        t3.push(a3[e6]);
    }
    return t3;
  }(e3 = e3.replace("\xA0", " "));
  for (let e4 = 0; e4 < i2.length; e4++) {
    let t3 = i2[e4];
    if (t3 !== void 0 && t3 !== "") {
      if (ut.test(t3) === false) {
        if (n2[n2.length - 1]) {
          n2[n2.length - 1] += t3;
          continue;
        }
        if (i2[e4 + 1]) {
          i2[e4 + 1] = t3 + i2[e4 + 1];
          continue;
        }
      }
      n2.push(t3);
    }
  }
  let o2 = n2[0] || "";
  const s2 = { hasLetter: false };
  for (let e4 = 0; e4 < n2.length; e4++) {
    let t3 = n2[e4];
    n2[e4 + 1] && mt(t3, o2, r2, s2) === false ? (o2 = n2[e4 + 1] || "", n2[e4 + 1] = t3 + o2) : t3 && t3.length > 0 && (a2.push(t3), o2 = n2[e4 + 1] || "", s2.hasLetter = false), n2[e4] = "";
  }
  if (a2.length === 0)
    return [e3];
  for (let e4 = 1; e4 < a2.length; e4 += 1) {
    let t3 = a2[e4].match(pt);
    t3 !== null && (a2[e4 - 1] += t3[0], a2[e4] = a2[e4].replace(pt, ""));
  }
  return a2;
};
var bt = /\S/;
var yt = /^[!?.]+$/;
var vt = /(\S+)/;
var wt = /[a-z] ?\/ ?[a-z]*$/;
var kt = [".", "?", "!", ":", ";", "-", "\u2013", "\u2014", "--", "...", "(", ")", "[", "]", '"', "'", "`"];
kt = kt.reduce((e3, t2) => (e3[t2] = true, e3), {});
var At = function(e3) {
  if (/^(re|un|micro|macro|trans|bi|mono|over)-?[^aeiou]./.test(e3) === true)
    return false;
  if (/^([a-z\u00C0-\u00FF/]+)(-|–|—)(like|ish|less|able)/i.test(e3) === true)
    return false;
  if (/^([a-z\u00C0-\u00FF`"'/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i.test(e3) === true)
    return true;
  return /^([0-9]{1,4})(-|–|—)([a-z\u00C0-\u00FF`"'/-]+$)/i.test(e3) === true;
};
var Dt = function(e3) {
  let t2 = [];
  const r2 = e3.split(/[-–—]/);
  let a2 = "-", n2 = e3.match(/[-–—]/);
  n2 && n2[0] && (a2 = n2);
  for (let e4 = 0; e4 < r2.length; e4++)
    e4 === r2.length - 1 ? t2.push(r2[e4]) : t2.push(r2[e4] + a2);
  return t2;
};
var $t = ne;
var Pt = nt;
var Et = ot;
var Ht = st;
var jt = ft;
var Nt = function(e3) {
  let t2 = [], r2 = [];
  if (typeof (e3 = e3 || "") == "number" && (e3 = String(e3)), function(e4) {
    return Object.prototype.toString.call(e4) === "[object Array]";
  }(e3))
    return e3;
  const a2 = e3.split(vt);
  for (let e4 = 0; e4 < a2.length; e4++)
    At(a2[e4]) !== true ? r2.push(a2[e4]) : r2 = r2.concat(Dt(a2[e4]));
  let n2 = "";
  for (let e4 = 0; e4 < r2.length; e4++) {
    let a3 = r2[e4];
    bt.test(a3) === true && kt.hasOwnProperty(a3) === false && yt.test(a3) === false ? (t2.length > 0 ? (t2[t2.length - 1] += n2, t2.push(a3)) : t2.push(n2 + a3), n2 = "") : n2 += a3;
  }
  return n2 && (t2.length === 0 && (t2[0] = ""), t2[t2.length - 1] += n2), t2 = function(e4) {
    for (let t3 = 1; t3 < e4.length - 1; t3++)
      wt.test(e4[t3]) && (e4[t3 - 1] += e4[t3] + e4[t3 + 1], e4[t3] = null, e4[t3 + 1] = null);
    return e4;
  }(t2), t2 = function(e4) {
    const t3 = /^[0-9]{1,4}(:[0-9][0-9])?([a-z]{1,2})? ?(-|–|—) ?$/, r3 = /^[0-9]{1,4}([a-z]{1,2})? ?$/;
    for (let a3 = 0; a3 < e4.length - 1; a3 += 1)
      e4[a3 + 1] && t3.test(e4[a3]) && r3.test(e4[a3 + 1]) && (e4[a3] = e4[a3] + e4[a3 + 1], e4[a3 + 1] = null);
    return e4;
  }(t2), t2 = t2.filter((e4) => e4), t2;
};
var xt = function(e3 = "", t2, r2) {
  let a2 = null;
  return typeof e3 != "string" && (typeof e3 == "number" ? e3 = String(e3) : function(e4) {
    return Object.prototype.toString.call(e4) === "[object Array]";
  }(e3) && (a2 = e3)), a2 = a2 || jt(e3, t2), a2 = a2.map((e4) => Nt(e4)), r2 = r2 || new Et(), a2.map((e4) => {
    e4 = e4.map((e5) => {
      let t4 = new $t(e5);
      return r2.add(t4), t4;
    }), Ht(e4);
    let t3 = new Pt(e4[0].id, e4.length, r2);
    return t3.cache.terms = e4, t3;
  });
};
var Ft = ne;
var Ct = nt;
var Bt = ot;
var Gt = st;
var zt = function(e3, t2) {
  let r2 = new Bt();
  return e3.map((e4, a2) => {
    let n2 = e4.terms.map((n3, i2) => {
      let o2 = new Ft(n3.text);
      return o2.pre = n3.pre !== void 0 ? n3.pre : "", n3.post === void 0 && (n3.post = " ", i2 >= e4.terms.length - 1 && (n3.post = ". ", a2 >= e4.terms.length - 1 && (n3.post = "."))), o2.post = n3.post !== void 0 ? n3.post : " ", n3.tags && n3.tags.forEach((e5) => o2.tag(e5, "", t2)), r2.add(o2), o2;
    });
    return Gt(n2), new Ct(n2[0].id, n2.length, r2);
  });
};
var It = ["Person", "Place", "Organization"];
var Ot = ["Noun", "Verb", "Adjective", "Adverb", "Value", "QuestionWord"];
var Tt = { Noun: "blue", Verb: "green", Negative: "green", Date: "red", Value: "red", Adjective: "magenta", Preposition: "cyan", Conjunction: "cyan", Determiner: "cyan", Adverb: "cyan" };
var Vt = function(e3) {
  return Object.keys(e3).forEach((t2) => {
    e3[t2].color ? e3[t2].color = e3[t2].color : Tt[t2] ? e3[t2].color = Tt[t2] : e3[t2].isA.some((r2) => !!Tt[r2] && (e3[t2].color = Tt[r2], true));
  }), e3;
};
var Mt = function(e3) {
  return Object.keys(e3).forEach((t2) => {
    let r2 = e3[t2], a2 = r2.isA.length;
    for (let t3 = 0; t3 < a2; t3++) {
      let a3 = r2.isA[t3];
      e3[a3] && (r2.isA = r2.isA.concat(e3[a3].isA));
    }
    r2.isA = function(e4) {
      return e4.filter((e5, t3, r3) => r3.indexOf(e5) === t3);
    }(r2.isA);
  }), e3;
};
var Jt = function(e3) {
  let t2 = Object.keys(e3);
  return t2.forEach((r2) => {
    let a2 = e3[r2];
    a2.notA = a2.notA || [], a2.isA.forEach((t3) => {
      if (e3[t3] && e3[t3].notA) {
        let r3 = typeof e3[t3].notA == "string" ? [e3[t3].isA] : e3[t3].notA || [];
        a2.notA = a2.notA.concat(r3);
      }
    });
    for (let n2 = 0; n2 < t2.length; n2++) {
      const i2 = t2[n2];
      e3[i2].notA.indexOf(r2) !== -1 && a2.notA.push(i2);
    }
    a2.notA = function(e4) {
      return e4.filter((e5, t3, r3) => r3.indexOf(e5) === t3);
    }(a2.notA);
  }), e3;
};
var Lt = function(e3) {
  let t2 = Object.keys(e3);
  return t2.forEach((r2) => {
    let a2 = e3[r2];
    a2.lineage = [];
    for (let n2 = 0; n2 < t2.length; n2++)
      e3[t2[n2]].isA.indexOf(r2) !== -1 && a2.lineage.push(t2[n2]);
  }), e3;
};
var St = function(e3) {
  return e3 = function(e4) {
    return Object.keys(e4).forEach((t2) => {
      let r2 = e4[t2];
      r2.isA = r2.isA || [], typeof r2.isA == "string" && (r2.isA = [r2.isA]), r2.notA = r2.notA || [], typeof r2.notA == "string" && (r2.notA = [r2.notA]);
    }), e4;
  }(e3), e3 = Mt(e3), e3 = Jt(e3), e3 = Vt(e3), e3 = Lt(e3);
};
var _t = { Noun: { notA: ["Verb", "Adjective", "Adverb"] }, Singular: { isA: "Noun", notA: "Plural" }, ProperNoun: { isA: "Noun" }, Person: { isA: ["ProperNoun", "Singular"], notA: ["Place", "Organization", "Date"] }, FirstName: { isA: "Person" }, MaleName: { isA: "FirstName", notA: ["FemaleName", "LastName"] }, FemaleName: { isA: "FirstName", notA: ["MaleName", "LastName"] }, LastName: { isA: "Person", notA: ["FirstName"] }, NickName: { isA: "Person", notA: ["FirstName", "LastName"] }, Honorific: { isA: "Noun", notA: ["FirstName", "LastName", "Value"] }, Place: { isA: "Singular", notA: ["Person", "Organization"] }, Country: { isA: ["Place", "ProperNoun"], notA: ["City"] }, City: { isA: ["Place", "ProperNoun"], notA: ["Country"] }, Region: { isA: ["Place", "ProperNoun"] }, Address: { isA: "Place" }, Organization: { isA: ["Singular", "ProperNoun"], notA: ["Person", "Place"] }, SportsTeam: { isA: "Organization" }, School: { isA: "Organization" }, Company: { isA: "Organization" }, Plural: { isA: "Noun", notA: ["Singular"] }, Uncountable: { isA: "Noun" }, Pronoun: { isA: "Noun", notA: It }, Actor: { isA: "Noun", notA: It }, Activity: { isA: "Noun", notA: ["Person", "Place"] }, Unit: { isA: "Noun", notA: It }, Demonym: { isA: ["Noun", "ProperNoun"], notA: It }, Possessive: { isA: "Noun" } };
var Kt = { Verb: { notA: ["Noun", "Adjective", "Adverb", "Value", "Expression"] }, PresentTense: { isA: "Verb", notA: ["PastTense", "FutureTense"] }, Infinitive: { isA: "PresentTense", notA: ["PastTense", "Gerund"] }, Imperative: { isA: "Infinitive" }, Gerund: { isA: "PresentTense", notA: ["PastTense", "Copula", "FutureTense"] }, PastTense: { isA: "Verb", notA: ["FutureTense"] }, FutureTense: { isA: "Verb" }, Copula: { isA: "Verb" }, Modal: { isA: "Verb", notA: ["Infinitive"] }, PerfectTense: { isA: "Verb", notA: "Gerund" }, Pluperfect: { isA: "Verb" }, Participle: { isA: "PastTense" }, PhrasalVerb: { isA: "Verb" }, Particle: { isA: "PhrasalVerb" }, Auxiliary: { notA: ["Noun", "Adjective", "Value"] } };
var qt = { Value: { notA: ["Verb", "Adjective", "Adverb"] }, Ordinal: { isA: "Value", notA: ["Cardinal"] }, Cardinal: { isA: "Value", notA: ["Ordinal"] }, Fraction: { isA: "Value", notA: ["Noun"] }, RomanNumeral: { isA: "Cardinal", notA: ["Ordinal", "TextValue"] }, TextValue: { isA: "Value", notA: ["NumericValue"] }, NumericValue: { isA: "Value", notA: ["TextValue"] }, Money: { isA: "Cardinal" }, Percent: { isA: "Value" } };
var Wt = { Adjective: { notA: ["Noun", "Verb", "Adverb", "Value"] }, Comparable: { isA: ["Adjective"] }, Comparative: { isA: ["Adjective"] }, Superlative: { isA: ["Adjective"], notA: ["Comparative"] }, NumberRange: {}, Adverb: { notA: ["Noun", "Verb", "Adjective", "Value"] }, Date: { notA: ["Verb", "Adverb", "Preposition", "Adjective"] }, Month: { isA: ["Date", "Singular"], notA: ["Year", "WeekDay", "Time"] }, WeekDay: { isA: ["Date", "Noun"] }, Timezone: { isA: ["Date", "Noun"], notA: ["Adjective", "ProperNoun"] }, Time: { isA: ["Date"], notA: ["AtMention"] }, Determiner: { notA: Ot }, Conjunction: { notA: Ot }, Preposition: { notA: Ot }, QuestionWord: { notA: ["Determiner"] }, Currency: { isA: ["Noun"] }, Expression: { notA: ["Noun", "Adjective", "Verb", "Adverb"] }, Abbreviation: {}, Url: { notA: ["HashTag", "PhoneNumber", "Verb", "Adjective", "Value", "AtMention", "Email"] }, PhoneNumber: { notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention", "Email"] }, HashTag: {}, AtMention: { isA: ["Noun"], notA: ["HashTag", "Verb", "Adjective", "Value", "Email"] }, Emoji: { notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"] }, Emoticon: { notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"] }, Email: { notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"] }, Acronym: { notA: ["Plural", "RomanNumeral"] }, Negative: { notA: ["Noun", "Adjective", "Value"] }, Condition: { notA: ["Verb", "Adjective", "Noun", "Value"] } };
var Rt = St;
var Ut = function(e3, t2) {
  Object.keys(e3).forEach((r2) => {
    t2[r2] = e3[r2];
  });
};
var Qt = (() => {
  let e3 = {};
  return Ut(_t, e3), Ut(Kt, e3), Ut(qt, e3), Ut(Wt, e3), e3 = Rt(e3), e3;
})();
var Zt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var Xt = Zt.split("").reduce(function(e3, t2, r2) {
  return e3[t2] = r2, e3;
}, {});
var Yt = function(e3) {
  if (Xt[e3] !== void 0)
    return Xt[e3];
  let t2 = 0, r2 = 1, a2 = 36, n2 = 1;
  for (; r2 < e3.length; t2 += a2, r2++, a2 *= 36)
    ;
  for (let r3 = e3.length - 1; r3 >= 0; r3--, n2 *= 36) {
    let a3 = e3.charCodeAt(r3) - 48;
    a3 > 10 && (a3 -= 7), t2 += a3 * n2;
  }
  return t2;
};
var er = function(e3, t2, r2) {
  const a2 = Yt(t2);
  return a2 < e3.symCount ? e3.syms[a2] : r2 + a2 + 1 - e3.symCount;
};
var tr = function(e3) {
  const t2 = { nodes: e3.split(";"), syms: [], symCount: 0 };
  return e3.match(":") && function(e4) {
    const t3 = new RegExp("([0-9A-Z]+):([0-9A-Z]+)");
    for (let r2 = 0; r2 < e4.nodes.length; r2++) {
      const a2 = t3.exec(e4.nodes[r2]);
      if (!a2) {
        e4.symCount = r2;
        break;
      }
      e4.syms[Yt(a2[1])] = Yt(a2[2]);
    }
    e4.nodes = e4.nodes.slice(e4.symCount, e4.nodes.length);
  }(t2), function(e4) {
    const t3 = [], r2 = (a2, n2) => {
      let i2 = e4.nodes[a2];
      i2[0] === "!" && (t3.push(n2), i2 = i2.slice(1));
      const o2 = i2.split(/([A-Z0-9,]+)/g);
      for (let i3 = 0; i3 < o2.length; i3 += 2) {
        const s2 = o2[i3], l2 = o2[i3 + 1];
        if (!s2)
          continue;
        const u2 = n2 + s2;
        if (l2 === "," || l2 === void 0) {
          t3.push(u2);
          continue;
        }
        const c2 = er(e4, l2, a2);
        r2(c2, u2);
      }
    };
    return r2(0, ""), t3;
  }(t2);
};
var rr = { Comparative: "true\xA6better", Superlative: "true\xA6earlier", PresentTense: "true\xA6is,sounds", Value: "true\xA6a few", Noun: "true\xA6a5b4c2f1here,ie,lit,m0no doubt,pd,tce;a,d;t,y;a,ca,o0;l,rp;a,l;d,l,rc", Copula: "true\xA6a1is,w0;as,ere;m,re", PastTense: "true\xA6be3came,d2had,lied,meant,sa2taken,w0;as,e0;nt,re;id;en,gan", Condition: "true\xA6if,lest,unless", Preposition: "true\xA6'o,-,aLbIcHdGexcept,fFiDmidQnotwithstandiRoBpSqua,sAt6u3vi2w0;/o,hereNith0;!in,oR;a,s-a-vis;n1p0;!on;like,til;h0ill,owards;an,r0;ough0u;!oJ;ans,ince,o that;',f0n2ut;!f;f,n0;!to;or,rom;espite,own,u3;hez,irca;ar1e0oAy;sides,tween;ri6;',bo7cross,ft6lo5m3propos,round,s1t0;!op;! long 0;as;id0ong0;!st;ng;er;ut", Gerund: "true\xA6accord0be0develop0go0result0stain0;ing", Negative: "true\xA6n0;ever,o0;!n,t", QuestionWord: "true\xA6how3wh0;at,e1ich,o0y;!m,se;n,re; come,'s", Plural: "true\xA6records", Conjunction: "true\xA6&,aFbBcuz,how9in caEno8o7p5supposing,t2v1wh0yet;eth9ile;ers4s;h0o;eref9o0;!uC;l0rovided that;us;r,therwi6; matt1r;!ev0;er;e0ut;cau1f0;ore;se;lthou1nd,s 0;far as,if;gh", Abbreviation: "true\xA6a0Jb0Gc0Ad08e05f02g01h00iYjWkanVlTmNnKoJpFque,rDs8t6u5v2w0;is0r,y0B;!c;a,b,e1i0ol,s,t;tro,vo;r,t;niv,safa,t;ce,e0;l,mp,nn,x;ask,e2fc,gt,i1q,r,s,t,u0;pt,rg;r,tu;c,nJp0;!t;b,d,e0;pGs,v;a,d,ennNhd,l,p,r1s0vt;!eud;ef,o0;b,f,n;ct,kla,nt;e0ov;b0e;!r;a4d,essrs,i1lle,me,r7s0t;!tr;n1s0;c,ter;!n;!j,r,sc;at,it,lb,ng,t0;!d;!s;an,d,r,u0;l,n;a,da,e,n0;c,f;on,wy;a,en,ov;e1ig,l0m,r,t,y;!a;b,m;a,g,ng,s1tc,x0;!p;p,q,t;ak,e0ist,r;c,f,pt,t;a3ca,l,m2o0pl,res,yn;!l0m1nn,rp;!o;dr;!l0pt;!if;a,c,l1r0;ig,os;!dg,vd;d4l3p2r1ss0tty,ug,ve;n,t;c,iz;prox,r,t;!ta;!j,m,v", Pronoun: "true\xA6'em,elle,h4i3me,ourselves,she5th1us,we,you0;!rself;e0ou;m,y;!l,t;e0im;!'s", Singular: "true\xA60:16;1:13;2:19;a16b0Tc0Kd0De0Af05g00hWiVjel0kitty,lTmPnOoNpHquestionGrEs9t6u4w3;ay,om03;nc10s 3;doll0Lst0N; rex,a4h3ic,ragedy,v show;ere,i2;l0x return;i6ky,omeoNt3uper bowl,yst15;ep4ri2u3;de0Yff;faTmoT;st1ze;al0i2o3;om,se;! mark;a7i1la6r4u3;dQrpoI;e3ie0Hobl0V;roga00ss releaG;te,y1;rt,te0N;bjWceJthers,verview;othi2umb1;a5ee08o3;del,m3nopo0rni2th1;!my;n,yf0;i3unch;ne;ci2nsect;ead start,o3uman right;l0me4u3;se;! run;adf0entlem6irl02laci1od,rand4u3;l0y; slam,fa3mo3;th1;an;a6ella,ly,ol0r4un3;di2;ee market,iWo3;nti1sP;mi0th1;conomy,gg,ner7ven4x3;ampTecu9;i2t;ad8e5inn1o3ragonf0ude;cumentGg3i0l0or;gy;ath,t3;ec3;tive;!dy;a9eili2h7i5o3redit card;ttage,u3;ri1sin;ty,vil w3;ar;andeli1ocol3;ate;n3rF;ary;aCel0lesJo8r5u3;n3tterf0;ti2;eakfa4o3;!th1;st;dy,tt5y3;!fri3;end;le;nki2r3;ri1;er;d5l0noma0u3;nt;ly; homin5verti3;si2;ng;em", FemaleName: "true\xA60:J3;1:J7;2:IG;3:IF;4:IX;5:IK;6:JO;7:H0;8:JG;9:JK;A:HN;B:HY;C:IT;D:IP;E:JD;F:HC;G:I0;aGRbFLcDPdCYeBOfB4gADh9Ti9Gj8Gk7Gl60m49n3No3Jp37qu36r2Ds16t0Eu0Cv02wVxiTyOzH;aLeIineb,oHsof2;e3Uf2la,ra;h3iKlIna,ynH;ab,ep;da,ma;da,h3iHra;nab;aKeJi0Fol5BuIvH;etAonDO;i0na;le0sen2;el,gm3Jn,rGJs8W;aoHme0nyi;m62yAE;aMendDYhiDFiH;dele8lJnH;if48niHo0;e,f47;a,helmi0lHma;a,ow;ka0nB;aNeKiHusa5;cIktoriBMlAole7viH;anC3enJ0;kF9tor2;da,lA9nus,rHs0;a,nHoniH4;a,iFQ;leHnesH4;nIHrH;i1y;g8rHxH5;su5te;aYeUhRiNoLrIuHy3;i,la;acIZiHu0L;c2na,sH;hBPta;nHr0H;iBNya;aJffaEOnHs6;a,gtiH;ng;!nFQra;aIeHomasi0;a,l9Po8Ares1;l2ndolwethu;g9Go88rIssH;!a,ie;eHi,ri9;sa,za;bPlNmLnJrIs6tHwa0;ia0um;a63yn;iHya;a,ka,s6;arB6e3iHmEDra;!ka;a,iH;a,t6;at6it6;a0Fcarlet3We0BhXiTkye,neza0oRtNuIyH;bIBlvi1;e,ha,mayIEni7sIzH;an3MetAie,y;anHi9;!a,e,nH;aDe;aJeH;fHl5GphH;an4;cHZr5;b2fiA8m0OnHphi1;d3ia,ja,ya;er3lJmon1nIobh8PtH;a,i;dy;lEPv2;aMeIirHo0risF7y5;a,lDK;ba,e0i5lJrH;iHrDOyl;!d8Hfa;ia,lDX;hd,iMki3nJrIu0w0yH;la,ma,na;i,le8on,ron;aIda,ia,nHon;a,on;!ya;k6mH;!aa;lJrItaye81vH;da,inj;e0ife;en1i0ma;anA5bNd3Nh1RiBkMlLmJndIrHs6vannaD;aDi0;ra,y;aHi3;nt6ra;lDKma,ome;ee0in8Ru3;in1ri0;a05e00hYiVoIuH;by,thDH;bScRghQl2KnPsJwIxH;anAXie,y;an,e0;aIeHie,lE; merBLann9ll1marDBt7;!lHnn1;iHyn;e,nH;a,d9K;da,i,na;ayy8D;hel62io;bDKer7yn;a,cIkHmas,n9Fta,ya;ki,o;helGki;ea,iannGDoH;da,n1K;an0bJem9Agi0iInHta,y0;a88ee;han83na;a,eH;cEAkaD;bi0chIe,i0mo0nHquEKvCy0;di,ia;aEIelHiB;!e,le;een4ia0;aNeMhKipaluk,oJrHute66;iHudenCQ;scil3LyamvaB;lly,rt2;ilome0oebe,ylH;is,lis;arl,ggy,nelope,r5t3;ige,m0TnKo5rvaDGtIulH;a,etAin1;ricHsy,tBY;a,e,ia;do3i06;ctav2dIfCZis6lHphCZumC3yunbileg;a,ga,iv2;eHvAC;l2tA;aWeUiMoIurHy5;!ay,ul;a,eJor,rIuH;f,r;aDeCma;ll1mi;aNcLhariBOkKlaJna,sHta,vi;anHha;ur;!y;a,iDTki;hoGk9VolH;a,eDJ;!mh;hir,lHna,risFsreC;!a,lBT;asuLdKh2i6CnJomi9rgEPtHzanin zah3;aHhal4;li1s6;cy,etA;a,e8iEV;nngu30;a09ckenz4e01iMoJrignayani,uriDDyH;a,rH;a,lNna,tG;bi0i3llBInH;a,iH;ca,ka,qD3;a,cTkaSlNmi,nLrItzi,yH;ar;aIiam,lH;anEO;!l,nB;dy,eHh,n4;nhGrva;aKdJiCPlH;iHy;cent,e;red;!gros;!e5;ae5hH;ae5el3Z;ag5EgNi,lKrH;edi79iIjem,on,yH;em,l;em,sF;an4iHliF;nHsCE;a,da;!an,han;b0DcASd0Be,g09ha,i08ja,l06n04rLsoum60tKuIv82x9IyHz4;a,bell,ra,soB9;de,rH;a,eC;h8Fild1t4;a,cYgUiKjor4l7Sn4s6tJwa,yH;!aHbe6Wja8lAE;m,nBH;a,ha,in1;!aJbCBeIja,lEna,sHt64;!a,ol,sa;!l1H;! Jh,mInH;!a,e,n1;!awit,i;aliAHcJeduarBfernIjHlui5Y;o6Ful2;anB;ecil2la3;arJeIie,oHr44ueriA;!t;!ry;et42i37;el4Ui76y;dHon,ue5;akran7y;ak,en,iHk,lo3O;a,ka,nB;a,re,s4te;daHg4;!l3A;alEd4elHge,isDBon0;ei8in1yn;el,le;a0Ne0CiYoQuLyH;d2la,nH;!a,dIeBGnHsCL;!a,eBF;a,sCJ;aCWcJel0PiFlIna,pHz;e,i7;a,u,wa;iHy;a0Se,ja,l2JnB;is,l1SrJttIuHvel4;el5is1;e,ie;aKeIi9na,rH;a86i9;lHn1t7;ei;!in1;aSbb9CdRepa,lMnJsIv2zH;!a,be5LetAz4;a,etA;!a,dH;a,sHy;ay,ey,i,y;a,iJja,lHy;iHy;aA0e;!aH;!n5F;ia,ya;!nH;!a,ne;aPda,e0iNjYla,nMoKsJtHx4y5;iHt4;c2t2;e2LlCG;la,nHra;a,ie,o3;a,or1;a,gh,laH;!ni;!h,nH;a,d3e,n5P;cOdon97iNkes6mi9Ana,rMtJurIvHxmi,y5;ern1in2;a,e54ie,yn;as6iIoH;nya,ya;fa,s6;a,isF;a,la;ey,ie,y;a04eZhXiOlAKoNrJyH;lHra;a,ee,ie;istHy6D;a,en,iIyH;!na;!e,n59;nul,ri,urtnB0;aOerNlAZmJrHzzy;a,stH;en,in;!berlImernH;aq;eHi,y;e,y;a,stC;!na,ra;aHei3ongordzol;dij1w5;el7QiKjsi,lJnIrH;a,i,ri;d3na,za;ey,i,lBDs4y;ra,s6;bi7cAJdiat7IeB2iRlQmPnyakuma19rNss6KtKvi7yH;!e,lH;a,eH;e,i8L;a6DeIhHi4NlEri0y;ar6Ber6Bie,leCrB2y;!lyn8Gri0;a,en,iHl5Soli0yn;!ma,n3VsF;a5il1;ei8Ei,l4;a,tl6L;a07eYiVoNuH;anLdKliHst63;a8HeHsF;!n8tH;!a,te;e5Ji3Jy;a,i7;!anNcelEd6RelGhan7RlLni,sIva0yH;a,ce;eHie;fHlEph5U;a,in1;eHie;en,n1;!a,e,n41;lHng;!i1ClH;!i1B;anMle0nJrIsH;i8Csi8C;i,ri;!a,elGif2CnH;a,etAiHy;!e,f2A;a,e8EiInH;a,e8DiH;e,n1;cMd1mi,nIque4Xsmin3Ovie3y8zH;min9;a9eIiH;ce,e,n1s;!lHsFt0F;e,le;inIk4lEquelH;in1yn;da,ta;lRmPnOo0rNsIvaHzaro;!a0lu,na;aJiIlaHob84;!n9N;do3;!belHdo3;!a,e,l39;a77en1i0ma;a,di3es,gr6Yji;a8elBogH;en1;a,e8iHo0se;a0na;aSeOiJoHusFyacin2B;da,ll4rten23snH;a,i9Q;lImaH;ri;aIdHlaI;a,egard;ry;ath1CiJlInriet7rmi8sH;sa,t1B;en2Sga,mi;di;bi2Dil8IlNnMrJsItHwa,yl8Iz7H;i5St4;n5Yti;iHmo51ri52;etH;!te;aDnaD;a,ey,l4;a03eXiSlQoOrKunJwH;enHyne1Q;!dolE;ay,el;acIetHiselB;a,chC;e,ieH;!la;ld1AogooH;sh;adys,enHor2yn2H;a,da,na;aKgi,lIna,ov89selHta;a,e,le;da,liH;an;!n0;mLnJorgIrH;ald3Pi,m3Ctru8B;etAi4W;a,eHna;s26vieve;ma;bIil,le,mHrnet,yG;al5Ni5;i5FrielH;a,l1;aVeSiRloOoz2rH;anJeIiH;da,eB;da,ja;!cH;esIiHoi0O;n1s61;!ca;!rH;a,encH;e,ia;en,o0;lIn0rnH;!anB;ec2ic2;jr,n7rKtHy9;emIiHma,ouma7;ha,ma,n;eh;ah,iBrah,za0;cr4Nd0Ne0Mi0Lk7l04mWn4YrTsNtMuLvH;aJelIiH;!e,ta;in0Gyn;!ngel2S;geni1la,ni45;h5Sta;mLperanKtH;eIhHrel5;er;l30r9;za;a,eralB;iHma,nest2Jyn;cHka,n;a,ka;a,eMiJmH;aHie,y;!li8;lHn1;ee,iHy;a,e,ja;lHrald;da,y;aWeUiNlMma,no3oKsJvH;a,iH;na,ra;a,ie;iHuiH;se;a,en,ie,y;a0c2da,f,nMsJzaH;!betHve7;e,h;aHe,ka;!beH;th;!a,or;anor,nH;!a;!in1na;leCs6;vi;eIiHna,wi0;e,th;l,n;aYeMh2iLjeneKoHul30;lor5Tminiq4In3FrHtt4;a,eCis,la,othHthy;ea,y;ba;an0AnaDon8x4ya;anQbPde,eOiMja,lJmetr2nHsir5K;a,iH;ce,se;a,iIla,orHphi8;es,is;a,l6D;dHrdH;re;!d5Cna;!b2HoraDra;a,d3nH;!a,e;hl2i0l0HmNnLphn1rIvi1XyH;le,na;a,by,cIia,lH;a,en1;ey,ie;a,etAiH;!ca,el1Cka,z;arHia;is;a0Se0Oh05i03lVoKrIynH;di,th2;istHy05;al,i0;lPnMrIurH;tn1E;aJd2NiHn2Nri8;!nH;a,e,n1;!l1X;cepci59n4sH;tanHuelo;ce,za;eHleC;en,tA;aJeoIotH;il51;!pat3;ir9rJudH;etAiH;a,ne;a,e,iH;ce,sZ;a3er3ndH;i,y;aReNloe,rH;isJyH;stH;al;sy,tH;a1Ren,iHy;!an1e,n1;deJlseIrH;!i9yl;a,y;li8;nMrH;isKlImH;ai8;a,eHotA;n1tA;!sa;d3elGtH;al,elG;cIlH;esAi44;el2ilH;e,ia,y;itlZlYmilXndWrOsMtHy5;aKeJhHri0;erHleCrEy;in1;ri0;li0ri0;a33sH;a32ie;a,iNlLmeJolIrH;ie,ol;!e,in1yn;lHn;!a,la;a,eHie,o7y;ne,y;na,sF;a0Hi0H;a,e,l1;is7l4;in,yn;a0Ie02iZlXoUrH;andSeQiJoIyH;an0nn;nwEok9;an3DdgLg0XtH;n2XtH;!aInH;ey,i,y;ny;etH;!t9;an0e,nH;da,na;i9y;bbi9glarIlo05nH;i7n4;ka;ancHossom,ythe;a,he;an17lja0nHsm3I;i7tH;ou;aUcky,linTni7rPssOtJulaDvH;!erlH;ey,y;hJsy,tH;e,iHy9;e,na;!anH;ie,y;!ie;nHt6yl;adIiH;ce;etAi8;ay,da;!triH;ce,z;rbJyaH;rmH;aa;a3ie,o3ra;a2Sb2Md23g1Zi1Qj5l16m0Xn09oi,r04sUtTuPvOwa,yIzH;ra,u0;aKes6gJlIseH;!l;in;un;!nH;a,na;a,i2Ir2J;drJgus1RrIsteH;ja;el2;a,ey,i,y;aahua,he0;hIi2Gja,mi7s2DtrH;id;aMlIraqHt21;at;eIi9yH;!n;e,iHy;gh;!nH;ti;iJleIo6pi7;ta;en,n1tA;aHelG;!n1J;a00dje5eYgUiSjQnJohito,toHya;inetAnH;el5ia;!aKeIiHmJ;e,ka;!mHtA;ar4;!belIliFmU;sa;!le;a,eliH;ca;ka,sHta;a,sa;elHie;a,iH;a,ca,n1qH;ue;!tA;te;! JbImHstasiNya;ar2;el;cla3jul2pau5;aLberKeliJiHy;e,l2naH;!ta;a,ja;!ly;hGiIl2nB;da;a,ra;le;aWba,ePiMlKma,thJyH;a,c2sH;a,on,sa;ea;iHys0N;e,s0M;a,cIn1sHza;a,e,ha,on,sa;e,ia,ja;c2is6jaKksaKna,sJxH;aHia;!nd3;ia,saH;nd3;ra;ia;i0nIyH;ah,na;a,is,naDoud;la;c6da,leCmNnLsH;haDlH;inHyY;g,n;!h;a,o,slH;ey;ee;en;at6g4nIusH;ti0;es;ie;aWdiTelMrH;eJiH;anMenH;a,e,ne;an0;na;!aLeKiIyH;nn;a,n1;a,e;!ne;!iH;de;e,lEsH;on;yn;!lH;i8yn;ne;aKbIiHrL;!gaK;ey,i9y;!e;gaH;il;dKliyJradhIs6;ha;ya;ah;a,ya", Actor: "true\xA6aJbGcFdCengineIfAgardenIh9instructPjournalLlawyIm8nurse,opeOp5r3s1t0;echnCherapK;ailNcientJecretary,oldiGu0;pervKrgeon;e0oofE;ceptionGsearC;hotographClumbColi1r0sychologF;actitionBogrammB;cem6t5;echanic,inist9us4;airdress8ousekeep8;arm7ire0;fight6m2;eputy,iet0;ici0;an;arpent2lerk;ricklay1ut0;ch0;er;ccoun6d2ge7r0ssis6ttenda7;chitect,t0;ist;minist1v0;is1;rat0;or;ta0;nt", Honorific: "true\xA6a01bYcQdPeOfiJgIhon,jr,king,lHmCoffic00p7queen,r3s0taoiseach,vice6;e1fc,gt,ir,r,u0;ltRpt,rg;cond liInBrgeaJ;abbi,e0;ar1p9s,v0;!erend; admirX;astOhd,r0vt;esideDi1of0;!essM;me mini4nce0;!ss;a3essrs,i2lle,me,r1s0;!tr;!s;stK;gistrate,j,r6yF;i3lb,t;en,ov;eld mar3rst l0;ady,i0;eutena0;nt;shG;sq,xcellency;et,oct6r,utchess;apt6hance4mdr,o0pl;lonel,m2ngress0unci3;m0wom0;an;dr,mand5;ll0;or;!ain;ldg,rig0;!adi0;er;d0sst,tty,yatullah;j,m0v;!ir0;al", SportsTeam: "true\xA60:1A;1:1H;2:1G;a1Eb16c0Td0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Bm01newToQpJqueens parkIreal salt lake,sAt5utah jazz,vancouver whitecaps,w3yW;ashington 3est ham0Rh10;natio1Oredski2wizar0W;ampa bay 6e5o3;ronto 3ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasC;buccanee0ra0K;a7eattle 5heffield0Kporting kansas0Wt3;. louis 3oke0V;c1Frams;marine0s3;eah15ounG;cramento Rn 3;antonio spu0diego 3francisco gJjose earthquak1;char08paA; ran07;a8h5ittsburgh 4ortland t3;imbe0rail blaze0;pirat1steele0;il3oenix su2;adelphia 3li1;eagl1philNunE;dr1;akland 3klahoma city thunder,rlando magic;athle0Mrai3;de0; 3castle01;england 7orleans 6york 3;city fc,g4je0FknXme0Fred bul0Yy3;anke1;ian0D;pelica2sain0C;patrio0Brevolut3;ion;anchester Be9i3ontreal impact;ami 7lwaukee b6nnesota 3;t4u0Fvi3;kings;imberwolv1wi2;rewe0uc0K;dolphi2heat,marli2;mphis grizz3ts;li1;cXu08;a4eicesterVos angeles 3;clippe0dodDla9; galaxy,ke0;ansas city 3nE;chiefs,roya0E; pace0polis colU;astr06dynamo,rockeTtexa2;olden state warrio0reen bay pac3;ke0;.c.Aallas 7e3i05od5;nver 5troit 3;lio2pisto2ti3;ge0;broncZnuggeM;cowbo4maver3;ic00;ys; uQ;arCelKh8incinnati 6leveland 5ol3;orado r3umbus crew sc;api5ocki1;brow2cavalie0india2;bengaWre3;ds;arlotte horAicago 3;b4cubs,fire,wh3;iteB;ea0ulR;diff3olina panthe0; c3;ity;altimore 9lackburn rove0oston 5rooklyn 3uffalo bilN;ne3;ts;cel4red3; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 3;brav1falco2h4u3;nited;aw9;ns;es;on villa,r3;os;c5di3;amondbac3;ks;ardi3;na3;ls", Uncountable: "true\xA60:1J;a1Qb1Ic19d16e0Zf0Tg0Mh0Hi0Dj0Cknowled1Pl07mXnWoVpRrMsBt6vi5w1;a3ea0Ai2oo1;d,l;ldlife,ne;rmth,t0;neg16ol0Btae;e4h3oothpaste,r1una;affSou1;ble,sers,t;ermod1Lund0;a,nnis;a9cene09eri0Wh8il7kittl0Wnow,o6p4t2u1;g0Znshi0P;ati1Ke1;am,el;ace1De1;ci0Red;ap,cc0;k,v0;eep,ingl0O;d0Cfe17l1nd,tish;m10t;a4e2ic1;e,ke0L;c1laxa0Hsearch;ogni0Grea0G;bi0Hin;aOe3hys17last8o1ress03;l1rk,w0;it15y9;a11trY;bstetr13il,xygen;ational securi0Vews;a8e6ilk,o3u1;mps,s1;ic;n1o0G;ey,o1;gamy;a1chan0V;sl03t;chine1il,themat0T; learn09ry;aught0e3i2ogi0Qu1;ck,g0G;ce,ghtn06ngui0OteratL;a1isK;th0;ewel8usti0J;ce,mp1nformaStself;a1ortan0H;ti1;en0F;a4isto3o1;ck1mework,n1spitali09;ey;ry;ir,libut,ppiB;ene4o2r1um,ymna0B;aAound;l1ssip;d,f; 1t08;editOpo1;ol;i5lour,o2urnit1;ure;od,rgive1uri0wl;ne1;ss;c7sh;conomZduca6lectr5n3quip4thZvery1;body,o1thF;ne;joy1tertain1;ment;iciNonU;tiG;ar2iabet1raugh2;es;ts;a8elcius,h4ivPl3o1urrency;al,ld w1nfusiBttB;ar;assMoth3;aos,e1;e2w1;ing;se;r5sh;a5eef,i2lood,owls,read,utt0;er;lliar2s1;on;ds;g1ss;ga1;ge;c6dvi5ero3ir2mnes1rt,thlet8;ty;craft;b5d1naut5;ynam4;ce;id,ou1;st1;ics", Infinitive: "true\xA60:6S;1:76;2:5C;3:74;4:73;5:67;6:6F;7:6Y;8:6Q;9:72;A:70;B:5X;C:6X;D:6L;E:77;F:5B;a6Kb66c57d4De3Xf3Jg3Dh37i2Uj2Sk2Ql2Hm26n23o1Yp1Jr0Rs06tYuTvOwHyG;awn,e31ield;aJe1Zhist6iIoGre6D;nd0rG;k,ry;pe,sh,th0;lk,nHrGsh,tDve;n,raE;d0t;aJiHoG;te,w;eGsC;!w;l6Jry;nHpGr4se;gra4Pli41;dGi9lo5Zpub3Q;erGo;mi5Cw1I;aMeLhKig5SoJrHuGwi7;ne,rn;aGe0Mi5Uu7y;de,in,nsf0p,v5J;r2ZuD;ank,reatB;nd,st;ke pa53lk,rg1Qs9;aZcWeVhTi4Dkip,lSmRnee3Lo52pQtJuGwitD;bmCck,ff0gge7ppHrGspe5;ge,pri1rou4Zvi3;ly,o36;aLeKoJrHuG;dy,mb6;aFeGi3;ngthBss,tD;p,re;m,p;in,ke,r0Qy;la58oil,rink6;e1Zi6o3J;am,ip;a2iv0oG;ck,rtBut;arDem,le5n1r3tt6;aHo2rG;atDew;le,re;il,ve;a05eIisk,oHuG;in,le,sh;am,ll;a01cZdu8fYgXje5lUmTnt,pQquPsKtJvGwa5V;eGiew,o36;al,l,rG;se,t;aFi2u44;eJi7oItG;!o2rG;i5uc20;l3rt;mb6nt,r3;e7i2;air,eHlGo43r0K;a8y;at;aFemb0i3Zo3;aHeGi3y;a1nt;te,x;a5Dr0J;act1Yer,le5u1;a13ei3k5PoGyc6;gni2Cnci6rd;ch,li2Bs5N;i1nG;ge,k;aTerSiRlOoMrIuG;b21ll,mp,rGsh;cha1s4Q;ai1eIiEoG;cGdu8greAhibCmi1te7vi2W;eAlaim;di5pa2ss,veE;iEp,rtr46sGur;e,t;aHead,uG;g,n4;n,y;ck,le;fo34mCsi7;ck,iErt4Mss,u1;bJccur,ff0pera9utweIverGwe;co47lap,ta22u1wG;helm;igh;ser3taF;eHotG;e,i8;ed,gle5;aMeLiIoHuG;ltip3Grd0;nit13ve;nHrr12sreprG;eseE;d,g6us;asu2lt,n0Nr4;intaFna4rHtG;ch,t0;ch,kGry;et;aMeLiJoGu1C;aHck,oGve;k,sB;d,n;ft,g35ke,mCnk,st2YveG;!n;a2Fc0Et;b0Nck,uG;gh,nD;iGno34;ck,ll,ss;am,oFuG;d4mp;gno2mQnGss3H;cOdica9flu0MhNsKtIvG;eGol3;nt,st;erGrodu8;a5fe2;i7tG;aGru5;ll;abCibC;lu1Fr1D;agi24pG;lemeEo22ro3;aKeIi2oHuG;nt,rry;n02pe,st;aGlp;d,t;nd6ppBrm,te;aKloAove1PrIuG;arGeAi15;ant39d;aGip,ow,umb6;b,sp;in,th0ze;aReaQiOlMoJrHuncG;ti3J;acGeshB;tu2;cus,lHrG;ce,eca7m,s30;d,l24;a1ZoG;at,od,w;gu2lGni1Xt,x;e,l;r,tu2;il,stBvG;or;a15cho,le5mSnPstNvalua9xG;a0AcLerKi7pGte19;a18eHi2laFoGreA;rt,se;ct,riG;en8;ci1t;el,han4;abGima9;li1J;ab6couXdHfor8ga4han8j03riDsu2t0vG;isi2Vy;!u2;body,er4pG;hasiGow0;ze;a07eUiLoKrHuG;mp;aHeAiG;ft;g,in;d4ubt;ff0p,re5sHvG;iZor8;aKcHliGmiApl1Btingui14;ke;oGuA;uGv0;ra4;gr1YppG;ear,ro3;cOeNfLliv0ma0Fny,pKsHterG;mi0G;cribe,er3iHtrG;oy;gn,re;a0Be0Ai5osC;eGi0By;at,ct;m,pB;iIlHrG;ea1;a2i06;de;ma4n8rGte;e,kB;a0Ae09h06i9l04oJrG;aHeGoAu0Hy;a9dC;ck,ve;llZmSnHok,py,uGv0;gh,nt;cePdu5fMsKtIvG;eGin8;rt,y;aFin0VrG;a7ibu9ol;iGtitu9;d0st;iHoGroE;rm;gu2rm;rn;biLfoKmaJpG;a2laF;in;re;nd;rt;ne;ap1e5;aGip,o1;im,w;aHeG;at,ck,w;llen4n4r4se;a1nt0;ll,ncIrGt0u1;eGry;!en;el;aSePloOoMrIuG;lGry;ly;igHuG;sh;htB;en;a7mb,o7rrGth0un8;ow;ck;ar,lHnefCtrG;ay;ie3ong;ng,se;band0Jc0Bd06ffo05gr04id,l01mu1nYppTrQsKttGvoid,waC;acIeHra5;ct;m0Fnd;h,k;k,sG;eIiHocia9uG;me;gn,st;mb6rt;le;chHgGri3;ue;!i3;eaJlIroG;aDve;ch;aud,y;l,r;noun8sw0tG;icipa9;ce;lHt0;er;e4ow;ee;rd;aRdIju7mCoR;it;st;!reA;ss;cJhie3knowled4tiva9;te;ge;ve;eIouEu1;se;nt;pt;on", Unit: "true\xA60:19;a14b12c0Od0Ne0Lf0Gg0Ch09in0Hjoule0k02l00mNnMoLpIqHsqCt7volts,w6y4z3\xB02\xB51;g,s;c,f,n;b,e2;a0Nb,d0Dears old,o1;tt0H;att0b;able4b3d,e2on1sp;!ne0;a2r0D;!l,sp;spo04; ft,uare 1;c0Id0Hf3i0Fkilo0Jm1ya0E;e0Mil1;e0li0H;eet0o0D;t,uart0;ascals,e2i1ou0Pt;c0Mnt0;rcent,t02;hms,uYz;an0JewtT;/s,b,e9g,i3l,m2p1\xB2,\xB3;h,s;!\xB2;!/h,cro5l1;e1li08;! pFs1\xB2;! 1;anEpD;g06s0B;gQter1;! 2s1;! 1;per second;b,i00m,u1x;men0x0;b,elvin0g,ilo2m1nR;!/h,ph,\xB2;byZgXmeter1;! p2s1;! p1;er1; hour;e1g,r0z;ct1rtz0;aXogQ;al2b,igAra1;in0m0;!l1;on0;a4emtPl2t1;\xB2,\xB3; oz,uid ou1;nce0;hrenheit0rad0;b,x1;abyH;eciCg,l,mA;arat0eAg,m9oulomb0u1;bic 1p0;c5d4fo3i2meAya1;rd0;nch0;ot0;eci2;enti1;me4;!\xB2,\xB3;lsius0nti1;g2li1me1;ter0;ram0;bl,y1;te0;c4tt1;os1;eco1;nd0;re0;!s", Organization: "true\xA60:46;a3Ab2Qc2Ad21e1Xf1Tg1Lh1Gi1Dj19k17l13m0Sn0Go0Dp07qu06rZsStFuBv8w3y1;amaha,m0Xou1w0X;gov,tu2S;a3e1orld trade organizati41;lls fargo,st1;fie22inghou16;l1rner br3D;-m11gree31l street journ25m11;an halNeriz3Wisa,o1;dafo2Gl1;kswagLvo;bs,kip,n2ps,s1;a tod2Rps;es35i1;lev2Xted natio2Uv; mobi2Kaco bePd bMeAgi frida9h3im horto2Tmz,o1witt2W;shiba,y1;ota,s r Y;e 1in lizzy;b3carpen33daily ma2Xguess w2holli0rolling st1Ms1w2;mashing pumpki2Ouprem0;ho;ea1lack eyed pe3Fyrds;ch bo1tl0;ys;l2s1;co,la m12;efoni07us;a6e4ieme2Gnp,o2pice gir5ta1ubaru;rbucks,to2N;ny,undgard1;en;a2Rx pisto1;ls;few25insbu26msu1X;.e.m.,adiohead,b6e3oyal 1yan2X;b1dutch she4;ank;/max,aders dige1Ed 1vl32;bu1c1Uhot chili peppe2Klobst28;ll;c,s;ant2Vizno2F;an5bs,e3fiz24hilip morrBi2r1;emier27octer & gamb1Rudenti14;nk floyd,zza hut;psi28tro1uge08;br2Qchina,n2Q; 2ason1Xda2G;ld navy,pec,range juli2xf1;am;us;a9b8e5fl,h4i3o1sa,wa;kia,tre dame,vart1;is;ke,ntendo,ss0K;l,s;c,st1Etflix,w1; 1sweek;kids on the block,york08;a,c;nd1Us2t1;ional aca2Fo,we0Q;a,cYd0O;aAcdonald9e5i3lb,o1tv,yspace;b1Nnsanto,ody blu0t1;ley crue,or0O;crosoft,t1;as,subisO;dica3rcedes2talli1;ca;!-benz;id,re;'s,s;c's milk,tt13z1Y;'ore09a3e1g,ittle caesa1Ktd;novo,x1;is,mark; pres5-z-boy,bour party;atv,fc,kk,m1od1K;art;iffy lu0Lo3pmorgan1sa;! cha1;se;hnson & johns1Sy d1R;bm,hop,n1tv;c,g,te1;l,rpol; & m,asbro,ewlett-packaTi3o1sbc,yundai;me dep1n1J;ot;tac1zbollah;hi;eneral 6hq,l5mb,o2reen d0Iu1;cci,ns n ros0;ldman sachs,o1;dye1g0B;ar;axo smith kliZencore;electr0Im1;oto0V;a3bi,da,edex,i1leetwood mac,oGrito-l0A;at,nancial1restoV; tim0;cebook,nnie mae;b06sa,u3xxon1; m1m1;ob0H;!rosceptics;aiml0Ae5isney,o3u1;nkin donuts,po0Wran dur1;an;j,w j1;on0;a,f leppa3ll,p2r spiegZstiny's chi1;ld;eche mode,t;rd;aEbc,hBi9nn,o3r1;aigsli5eedence clearwater reviv1ossra05;al;!ca c5l4m1o0Ast05;ca2p1;aq;st;dplMgate;ola;a,sco1tigroup;! systems;ev2i1;ck fil-a,na daily;r0Hy;dbury,pital o1rl's jr;ne;aGbc,eCfAl6mw,ni,o2p,r1;exiteeWos;ei3mbardiJston 1;glo1pizza;be;ng;ack & deckFo2ue c1;roX;ckbuster video,omingda1;le; g1g1;oodriN;cht3e ge0n & jer2rkshire hathaw1;ay;ryH;el;nana republ3s1xt5y5;f,kin robbi1;ns;ic;bXcSdidRerosmith,ig,lLmFnheuser-busEol,ppleAr7s3t&t,v2y1;er;is,on;hland2s1;n,ociated F; o1;il;by4g2m1;co;os; compu2bee1;'s;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 4catel2t1;air;!-luce1;nt;jazeera,qae1;da;as;/dc,a3er,t1;ivisi1;on;demy of scienc0;es;ba,c", Demonym: "true\xA60:16;1:13;a0Wb0Nc0Cd0Ae09f07g04h02iYjVkTlPmLnIomHpDqatari,rBs7t5u4v3wel0Rz2;am0Fimbabwe0;enezuel0ietnam0H;g9krai1;aiwThai,rinida0Iu2;ni0Qrkmen;a4cot0Ke3ingapoOlovak,oma0Tpa05udRw2y0X;edi0Kiss;negal0Br08;mo0uU;o6us0Lw2;and0;a3eru0Hhilipp0Po2;li0Ertugu06;kist3lesti1na2raguay0;ma1;ani;amiZi2orweP;caragu0geri2;an,en;a3ex0Mo2;ngo0Erocc0;cedo1la2;gasy,y08;a4eb9i2;b2thua1;e0Dy0;o,t02;azakh,eny0o2uwaiti;re0;a2orda1;ma0Bp2;anN;celandic,nd4r2sraeli,ta02vo06;a2iT;ni0qi;i0oneV;aiDin2ondur0unN;di;amDe2hanai0reek,uatemal0;or2rm0;gi0;i2ren7;lipino,n4;cuadoVgyp6ngliJsto1thiopi0urope0;a2ominXut4;niH;a9h6o4roa3ub0ze2;ch;ti0;lom2ngol5;bi0;a6i2;le0n2;ese;lifor1m2na3;bo2eroo1;di0;angladeshi,el8o6r3ul2;gaG;aziBi2;ti2;sh;li2s1;vi0;aru2gi0;si0;fAl7merBngol0r5si0us2;sie,tr2;a2i0;li0;gent2me1;ine;ba1ge2;ri0;ni0;gh0r2;ic0;an", Possessive: "true\xA6anyAh5its,m3noCo1sometBthe0yo1;ir1mselves;ur0;!s;i8y0;!se4;er1i0;mse2s;!s0;!e0;lf;o1t0;hing;ne", Currency: "true\xA6$,aud,bScQdLeurKfJgbp,hkd,iIjpy,kGlEp8r7s3usd,x2y1z0\xA2,\xA3,\xA5,\u0434\u0435\u043D,\u043B\u0432,\u0440\u0443\u0431,\u0E3F,\u20A1,\u20A8,\u20AC,\u20AD,\uFDFC;lotyS\u0142;en,uanR;af,of;h0t5;e0il5;k0q0;elM;iel,oubleLp,upeeL;e2ound st0;er0;lingI;n0soH;ceGn0;ies,y;e0i8;i,mpi7;n,r0wanzaCyatC;!onaBw;ls,nr;ori7ranc9;!o8;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;ad,e0ny;nt1;aht,itcoin0;!s", City: "true\xA60:73;1:61;2:6G;3:5U;4:5R;a68b54c4Id4Ae46f3Yg3Jh38i2Zj2Uk2Dl22m1Kn19o16p0Uq0Sr0Ls01tPuOvLwDxiBy9z5;a7h5i4Muri4O;a5e5ongsh0;ng3J;greb,nzib5G;ang2e5okoha3Uunfu;katerin3Jrev0;a5n0O;m5Hn;arsBeAi6roclBu5;h0xi,zh5P;c7n5;d5nipeg,terth4;hoek,s1K;hi5Zkl3C;l63xford;aw;a6ern2i5ladivost5Molgogr6K;en3lni6R;lenc6Dncouv2Yr3ughn;lan bat1Drumqi,trecht;aDbilisi,eCheBi9o8r7u5;l21n63r5;in,ku;ipoli,ondh62;kyo,m34ron1QulouS;an5jua3l2Zmisoa6Era3;j4Xshui; hag65ssaloni2L;gucigal28hr0l av1W;briz,i6llinn,mpe5Ang5rtu,shk2X;i2Msh0;an,chu1n0p2Iyu0;aEeDh8kopje,owe1It7u5ydney;ra5zh51;ba0Jt;aten is59ockholm,rasbou6Auttga31;an8e6i5;jiazhua1llo1m60y0;f54n5;ya1zh4L;gh3Ot4U;att4Ao1Yv49;cramen18int DlBn5o paulo,ppo3Wrajevo; 7aa,t5;a 5ia3Io domin3I;a3fe,m1O;antonCdie3Gfrancisco,j5ped3Ssalv8;o5u0;se;em,v5z2B;ad0I;lou59peters29;aAe9i7o5;me,sar5t5A;io;ga,o5yadh;! de janei3I;cife,ykjavik;b4Uip4lei2Mnc2Swalpindi;ingdao,u5;ez2i0Q;aEeDhCiBo8r7u6yong5;ya1;eb5Aya1;ag54etor53;rt5zn0; 5la4Fo;au prin0Nelizabe29sa05;ls3Srae5Ctts2B;iladelph4Ynom pe1Doenix;r26tah tik3I;ler00naji,r4Pt5;na,r36;ak47des0Lm1Rr6s5ttawa;a3Ylo;an,d07;a8ew6i5ovosibir1Oyc;ng2Hs; 5cast39;del27orlea46taip16york;g8iro4Xn5pl2Zshv36v0;ch6ji1t5;es,o1;a1o1;a6o5p4;ya;no,sa0Y;aFeCi9o6u5;mb2Cni28sc40;gadishu,nt6s5;c17ul;evideo,re31;ami,l6n18s5;kolc,sissauga;an,waukee;cca,d5lbour2Pmph41;an,ell5i3;in,\xEDn;cau,drAkass2Tl9n8r5shh4A;aca6ib5rakesh,se2N;or;i1Ty;a4EchEdal12i47;mo;id;aCeiAi8o6u5vRy2;anLckn0Rdhia3;n5s angel28;d2g bea1O;brev2De3Kma5nz,sb2verpo2A;!ss29;c5pzig;est0C; p6g5ho2Yn0Gusan27;os;az,la35;aHharFiClaipeBo9rak0Hu7y5;iv,o5;to;ala lump4n5;mi1sh0;be,hi0Llka2Zpavog4si5wlo2;ce;da;ev,n5rkuk;gSsha5;sa;k5toum;iv;bIdu3llakuric0Tmpa3Gn6ohsiu1ra5un1Lwaguc0T;c0Sj;d5o,p4;ah1Vy;a7e6i5ohannesZ;l1Xn0;dd37rusalem;ip4k5;ar2J;bad0mph1QnBrkutYs8ta01z5\u0307zm7;m6tapala5;pa;ir;fah0l6tanb5;ul;am2Zi2I;che2d5;ianap2Lo21;aBe8o5yder2W; chi mi6ms,nolulu,u5;st2;nh;f6lsin5rakli2;ki;ei;ifa,lifax,m7n5rb1Dva3;gAnov5oi;er;bu2Wilt2;aFdanEenDhCiPlasgBo9raz,u5;a5jr21;dal6ng5yaquil;zh1H;aja2Lupe;ld coa18then5;bu2P;ow;ent;e0Toa;sk;lw7n5za;dhi5gt1C;nag0S;ay;aisal26es,o8r6ukuya5;ma;ankfu5esno;rt;rt5sh0; wor6ale5;za;th;d5indhov0Nl paso;in5mont2;bur5;gh;aAe8ha0Visp4o7resd0Ju5;b5esseldorf,rb0shanbe;ai,l0G;ha,nggu0rtmu11;hradRl5troit;hi;donghHe5k08li0masc1Xr es sala1HugavpiY;gu,je2;aKebu,hAo5raio03uriti1P;lo7n6penhag0Ar5;do1Nk;akLst0V;gVm5;bo;aBen8i6ongqi1ristchur5;ch;ang m7ca5ttago1;go;g6n5;ai;du,zho1;n5ttogr12;digarh,g5;ch8sha,zh06;i9lga8mayenJn6pe town,r5;acCdiff;ber18c5;un;ry;ro;aUeMhJirmingh0ToIr9u5;chareRdapeRenos air7r5s0tu0;g5sa;as;es;a9is6usse5;ls;ba6t5;ol;ne;sil0Mtisla7zzav5;il5;le;va;goZst2;op6ubaneshw5;ar;al;iBl9ng8r5;g6l5n;in;en;aluru,hazi;fa5grade,o horizonte;st;ji1rut;ghd0BkGnAot9r7s6yan n4;ur;el,r07;celo3ranquil09;na;ou;du1g6ja lu5;ka;alo6k5;ok;re;ng;ers5u;field;a04b01cc00ddis abaZgartaYhmedWizawl,lQmNnHqaZrEsBt7uck5;la5;nd;he7l5;an5;ta;ns;h5unci2;dod,gab5;at;li5;ngt2;on;a6chora5kaNtwerp;ge;h7p5;ol5;is;eim;aravati,m0s5;terd5;am; 8buquerq7e5giers,maty;ppo,xandr5;ia;ue;basrah al qadim5mawsil al jadid5;ah;ab5;ad;la;ba;ra;idj0u dha5;bi;an;lbo6rh5;us;rg", Country: "true\xA60:39;1:2M;a2Xb2Ec22d1Ye1Sf1Mg1Ch1Ai14j12k0Zl0Um0Gn05om3DpZqat1KrXsKtCu6v4wal3yemTz2;a25imbabwe;es,lis and futu2Y;a2enezue32ietnam;nuatu,tican city;.5gTkraiZnited 3ruXs2zbeE;a,sr;arab emirat0Kkingdom,states2;! of am2Y;k.,s.2; 28a.;a7haBimor-les0Bo6rinidad4u2;nis0rk2valu;ey,me2Ys and caic1U; and 2-2;toba1K;go,kel0Znga;iw2Wji2nz2S;ki2U;aCcotl1eBi8lov7o5pa2Cri lanka,u4w2yr0;az2ed9itzerl1;il1;d2Rriname;lomon1Wmal0uth 2;afr2JkLsud2P;ak0en0;erra leoEn2;gapo1Xt maart2;en;negKrb0ychellY;int 2moa,n marino,udi arab0;hele25luc0mart20;epublic of ir0Dom2Duss0w2;an26;a3eHhilippinTitcairn1Lo2uerto riM;l1rtugE;ki2Cl3nama,pua new0Ura2;gu6;au,esti2;ne;aAe8i6or2;folk1Hth3w2;ay; k2ern mariana1C;or0N;caragua,ger2ue;!ia;p2ther19w zeal1;al;mib0u2;ru;a6exi5icro0Ao2yanm05;ldova,n2roc4zamb9;a3gol0t2;enegro,serrat;co;c9dagasc00l6r4urit3yot2;te;an0i15;shall0Wtin2;ique;a3div2i,ta;es;wi,ys0;ao,ed01;a5e4i2uxembourg;b2echtenste11thu1F;er0ya;ban0Hsotho;os,tv0;azakh1Ee3iriba03o2uwait,yrgyz1E;rWsovo;eling0Jnya;a2erF;ma15p1B;c6nd5r3s2taly,vory coast;le of m19rael;a2el1;n,q;ia,oI;el1;aiSon2ungary;dur0Mg kong;aAermany,ha0Pibralt9re7u2;a5ern4inea2ya0O;!-biss2;au;sey;deloupe,m,tema0P;e2na0M;ce,nl1;ar;bTmb0;a6i5r2;ance,ench 2;guia0Dpoly2;nes0;ji,nl1;lklandTroeT;ast tim6cu5gypt,l salv5ngl1quatorial3ritr4st2thiop0;on0; guin2;ea;ad2;or;enmark,jibou4ominica3r con2;go;!n B;ti;aAentral african 9h7o4roat0u3yprQzech2; 8ia;ba,racao;c3lo2morPngo-brazzaville,okFsta r03te d'ivoiK;mb0;osD;i2ristmasF;le,na;republic;m2naTpe verde,yman9;bod0ero2;on;aFeChut00o8r4u2;lgar0r2;kina faso,ma,undi;azil,itish 2unei;virgin2; is2;lands;liv0nai4snia and herzegoviGtswaGuvet2; isl1;and;re;l2n7rmuF;ar2gium,ize;us;h3ngladesh,rbad2;os;am3ra2;in;as;fghaFlCmAn5r3ustr2zerbaijH;al0ia;genti2men0uba;na;dorra,g4t2;arct6igua and barbu2;da;o2uil2;la;er2;ica;b2ger0;an0;ia;ni2;st2;an", Region: "true\xA60:2M;1:2S;2:2J;a2Pb2Cc1Yd1Tes1Sf1Qg1Kh1Gi1Bj17k12l0Zm0On07o05pZqWrTsKtFuCv9w5y3zacatec2T;akut0o0Du3;cat2k07;a4est 3isconsin,yomi1L;bengal,vi6;rwick2Ashington3;! dc;er4i3;rgin0;acruz,mont;dmurt0t3;ah,tar3; 2Ka0W;a5e4laxca1Qripu1Wu3;scaDva;langa1nnessee,x2E;bas0Um3smNtar24;aulip2Cil nadu;a8i6o4taf10u3ylh1E;ffYrr03s19;me1Bno1Puth 3;cVdU;ber0c3kkim,naloa;hu2ily;n4skatchew2xo3;ny; luis potosi,ta catari1;a3hode9;j3ngp06;asth2shahi;ingh24u3;e3intana roo;bec,en5reta0Q;ara7e5rince edward3unjab; i3;sl0A;i,nnsylv3rnambu0A;an0;!na;axa0Xdisha,h3klaho1Zntar3reg6ss0Ax0F;io;aIeDo5u3;evo le3nav0V;on;r3tt16va scot0;f8mandy,th3; 3ampton15;c5d4yo3;rk13;ako1M;aroli1;olk;bras1Lva0Bw3; 4foundland3;! and labrador;brunswick,hamp0Wjers3mexiRyork state;ey;galOyarit;a9eghala0Mi5o3;nta1r3;dov0elos;ch5dlanCn4ss3zor11;issippi,ouri;as geraOneso18;ig2oac2;dhy12harasht0Gine,ni4r3ssachusetts;anhao,i el,ylF;p3toba;ur;anca0Ie3incoln0IouisH;e3iR;ds;a5e4h3omi;aka06ul1;ntucky,ra01;bardino,lmyk0ns0Qr3;achay,el0nata0X;alis5har3iangxi;kh3;and;co;daho,llino6n3owa;d4gush3;et0;ia1;is;a5ert4i3un2;dalFm0D;fordZ;mpYrya1waii;ansu,eorg0lou7oa,u3;an4erre3izhou,jarat;ro;ajuato,gdo3;ng;cesterS;lori3uji2;da;sex;ageTe6o4uran3;go;rs3;et;lawaLrbyK;aEeaDh8o3rimea ,umbr0;ahui6l5nnectic4rsi3ventry;ca;ut;i02orado;la;e4hattisgarh,i3uvash0;apQhuahua;chn4rke3;ss0;ya;ra;lFm3;bridge6peche;a8ihar,r7u3;ck3ryat0;ingham3;shi3;re;emen,itish columb0;h0ja cal7lk6s3v6;hkorto3que;st2;an;ar0;iforn0;ia;dygea,guascalientes,lAndhr8r4ss3;am;izo1kans4un3;achal 6;as;na;a 3;pradesh;a5ber4t3;ai;ta;ba4s3;ka;ma", Place: "true\xA6a0Eb0Bc04d03e02f00gVhUiRjfk,kOlMmJneGoFpBque,rd,s9t6u5v4w1y0;akutOyz;ake isFis1y0;!o;!c;a,ostok,t;laanbaatar,p02safa,t;ahiti,e1he 0;bronx,hamptons;nn,x;a0fo,oho,t,under7yd;khalNsk;a2e1h0itcairn;l,x;k,nnN;!cif04;kla,nt,rd;b1w eng0;land;!r;a1co,i0t,uc;dNnn;gadZlibu,nhattZ;a0gw,hr;s,x;an1osrae,rasnoyar0ul;sk;!s;a1cn,da,nd0st;ianRochina;!x;arlem,kg,nd,oHwy;a3re0;at 0enwich;brita0lakH;in;!y village;co,l0ra;!a;urope,vergladC;ak,en,fw,ist,own4xb;al5dg,gk,h2l1o0rA;lo,nn;!t;a1ina0uuk;town;morro,tham;!if;cn,e1kk,l0rooklyn;vd;l air,verly hills;frica,lta,m7n3r2sia,tl1ve,zor0;es;!ant2;ct1iz;adyr,tarct0;ic0; oce0;an;ericas,s", MaleName: "true\xA60:E4;1:D5;2:DN;3:AX;4:D1;5:CF;6:B5;7:CV;8:C7;9:DJ;A:DK;B:A5;C:C1;aCNbBKcAId9Ge8Mf84g7Hh6Ti6Dj5Dk51l4Cm34n2So2Mp2Equ2Cr1Ls11t0Eu0Dv07wTxSyIzD;aDor0;cDh9Skaria,n5V;hEkD;!aCL;ar5VeCK;aLoFuD;sDu2JvBX;if,uf;nFsEusD;ouf,sD;ef;aDg;s,tD;an,h0;hli,nBLssX;avi3ho4;aMeKiFoDyaC1;jcie8Blfgang,odrow,utD;!er;lDnst1;bFey,frD0lD;aBCiD;am,e,s;e9Eur;i,nde6sD;!l8t1;de,lErrAyD;l1ne;lDt3;aA9y;aGiDladimir,ojte7Y;cEha0kt68nceDrgAIva0;!nt;e3Ut66;lentDnA4;in4X;ghBUlyss5Bnax,sm0;aXeShOiMoHrFuEyD;!l3ro7s1;n9r5B;avAVeDist0oy,um0;ntANv5Yy;bGdFmDny;!as,mDoharu;aCSie,y;!d;iBy;mDt5;!my,othy;adFeoEia8FomD;!as;!do8O;!de5;dGrD;en9KrD;an9JeDy;ll,n9I;!dy;dgh,ha,iDnn3req,tsu4S;cB4ka;aTcotRePhLiJoHpenc3tDur1Uylve9Jzym1;anFeDua8C;f0phBSvDwa8B;e61ie;!islaw,l8;lom1nBEuD;leyma7ta;dDlBm1yabonga;!dhart7An8;aFeD;lDrm0;d1t1;h7Tne,qu0Zun,wn,y7;aDbasti0k29l4Qrg4Nth,ymoAT;m5n;!tD;!ie,y;lEmDnti2Dq5Aul;!ke5LmCu4;ik,vato7W;aXeTheA9iPoHuEyD;an,ou;b7MdEf5pe7RssD;!elBY;ol3Ey;an,bJc66dIel,geHh0landBPmGnFry,sEyD;!ce;coe,s;!aAGnC;an,eo;l46r;e5Ng3n8olfo,ri79;bCeB7;cDl8;ar6Pc6OhEkDo;!ey,ie,y;a99ie;gEid,ubAx,yDza;an1InY;gA8iD;naA4s;ch70fa4lHmGndFpha4sEul,wi2HyD;an,mo82;h7Vm5;alBDol2Uy;iATon;f,ph;ent2inD;cy,t1;aIeGhilFier72ol,rD;aka16eD;m,st1;!ip,lip;dALrcy,tD;ar,e3Gr1X;b4Kdra7Ft4ZulD;!o17;ctav3Fi3liv3mAFndrej,rHsEtDum9wA;is,to;aEc9k9m0vD;al5Z;ma;i,l53vL;aLeJiFoDu3A;aDel,j5l0ma0r3K;h,m;cEg4i49kD;!au,h7Uola;holBkDolB;!olB;al,d,il,ls1vD;il8Y;hom,thD;anDy;!a4i4;aZeWiMoHuEyD;l2Jr1;hamEr6XstaD;fa,p5C;ed,mH;di0We,hamFis2FntEsDussa;es,he;e,y;ad,ed,mD;ad,ed;cIgu4hai,kGlFnEtchD;!e6;a8Aik;house,o0Bt1;ae5YeA4olD;aj;ah,hDk8;aEeD;al,l;el,l;hElv2rD;le,ri6v2;di,met;ay0ck,hTjd,ks2DlRmadWnQrKs1tFuricExD;!imilian9Nwe6;e,io;eGhEiBtDus,yB;!eo,hew,ia;eDis;us,w;j,o;cHio,kGlFqu7Dsha6tDv2;iDy;!m,n;in,on;!el,oPus;!el9IoOus;iGu4;achDcolm,ik;ai,y;amEdi,eDmoud;sh;adDm5T;ou;aXeQiOlo3EoKuEyD;le,nd1;cGiFkDth3uk;aDe;!s;gi,s,z;as,iaD;no;g0nn7SrenFuDv8Jwe6;!iD;e,s;!zo;am,oD;n4r;a8Cevi,la5JnIoGst3thaFvD;eDi;nte;bo;!nD;!a6Sel;!ny;mFnErDur5Hwr5H;ry,s;ce,d1;ar,o5A;aLeGhaled,iDrist5Iu4Vy6X;er0p,rD;by,k,ollD;os;en0iGnDrmit,v44;!dEnDt5Z;e1Ay;a6ri59;r,th;cp3j5m66na73rEsp9them,uD;ri;im,l;a02eUiSoGuD;an,lDst2;en,iD;an,en,o,us;aNeLhnKkubBnIrGsD;eEhDi8Bue;!ua;!ph;dDge;an,i,on;!aDny;h,s,th5I;!ath5Hie,nC;!l,sDy;ph;o,qu2;an,mD;!mC;d,ffIrFsD;sDus;!e;a6BemEmai7oDry;me,ni0Y;i7Ty;!e60rD;ey,y;cKdAkImHrFsEvi3yD;!dAs1;on,p3;ed,od,rDv56;e5Nod;al,es4Xis1;a,e,oDub;b,v;k,ob,quD;es;aWbQchiPgNkeMlija,nuLonut,rJsFtDv0;ai,suD;ki;aEha0i7DmaDsac;el,il;ac,iaD;h,s;a,vinDw2;!g;k,nngu5S;!r;nacDor;io;ka;ai,rahD;im;aPeJoIuDyd9;be2KgGmber4WsD;eyEsD;a2e2;in,n;h,o;m3ra3Gsse2wa4B;aHctGitGnrErD;be2Dm0;iDy;!q11;or;th;bMlLmza,nKo,rFsEyD;a4JdA;an,s0;lGo50rFuDv8;hi4Gki,tD;a,o;is1y;an,ey;k,s;!im;ib;aVeRiPlenOoLrHuD;ilEsD;!tavo;herme,lerD;mo;aFegDov3;!g,orD;io,y;dy,h5Wnt;nzaErD;an,d1;lo;!n;lbe5Ano,oD;rg3Hvan5A;ne,oFrD;aDry;ld,rd5H;ffr8rge;brElArDv2;la28r3Sth,y;e3EielD;!i5;aTePiNlLorr0NrD;anFedDitz;!dCeDri2B;ri2A;cFkD;!ie,lD;in,yn;esLisD;!co,z36;etch3oD;yd;d4lDnn,onn;ip;deriFliEng,rnD;an06;pe,x;co;bi0di,hd;ar04dZfrYit0lSmKnHo2rFsteb0th0uge7vDymAzra;an,eD;ns,re36;gi,i0DnDrol,v2w2;est4Pie;oEriqDzo;ue;ch;aJerIiEmD;aIe2Z;lErD;!h0;!iD;o,s;s1y;nu4;be0Cd1iGliFmEt1viDwood;n,s;er,o;ot1Ys;!as,j4NsD;ha;a2en;!dCg9mGoEuEwD;a2Din;arD;do;o0Wu0W;l,nD;est;a01eRiOoHrGuFwEylD;an,l0;ay7ight;a7dl8nc0st2;ag0ew;minGnEri0ugDvydBy2D;!lB;!a2MnDov0;e6ie,y;go,iDykB;cDk;!k;armuEeDll1on,rk;go;id;anKj0lbeJmetri5nHon,rGsFvEwDxt3;ay7ey;en,in;hawn,mo0B;ek,ri0I;is,nDv3;is,y;rt;!dD;re;an,lNmLnKrGvD;e,iD;! lucDd;as,ca;en,iFne6rDyl;eDin,yl;l3Bn;n,o,us;!e,i4ny;iDon;an,en,on;e,lB;as;a09e07hYiar0lNoIrGuEyrD;il,us;rtD;!is;aDistob0U;ig;dy,lGnErD;ey,neli5y;or,rD;ad;by,e,in,l2t1;aIeFiDyK;fDnt;fo0Ft1;meEt5velaD;nd;nt;rFuEyD;!t1;de;enD;ce;aIeGrisEuD;ck;!tD;i0oph3;st3;er;d,rDs;b4leD;s,y;cDdric,s9;il;lGmer1rD;ey,lEro6y;ll;!os,t1;eb,v2;a07eZiVlaUoRrEuDyr1;ddy,rtK;aLeGiFuEyD;an,ce,on;ce,no;an,ce;nEtD;!t;dEtD;!on;an,on;dEndD;en,on;!foDl8y;rd;bErDyd;is;!by;i7ke;bFlEshD;al;al,lC;ek;nHrDshoi;at,nEtD;!r1C;aDie;rd14;!edict,iEjam2nC;ie,y;to;kaMlazs,nHrD;n8rDt;eDy;tt;ey;dDeE;ar,iD;le;ar17b0Vd0Rf0Pgust2hm0Mi0Jja0Il04m00nSputsiRrIsaHuFveEyDziz;a0kh0;ry;gust5st2;us;hi;aKchJiIjun,maHnFon,tDy0;hDu09;ur;av,oD;ld;an,nd0H;!el,ki;ie;ta;aq;as,dIgel0CtD;hoGoD;i7nD;!i09y;ne;ny;er,reDy;!as,i,s,w;iFmaDos;nu4r;el;ne,r,t;an,bePdAeJfHi,lGonFphXt1vD;aNin;on;so,zo;an,en;onTrD;edU;c,jaGksandFssaGxD;!andD;er,ru;ar,er;ndD;ro;rtN;ni;dAm9;ar;en;ad,eD;d,t;in;onD;so;aEi,olfDri0vik;!o;mDn;!a;dHeGraEuD;!bakr,lfazl;hDm;am;!l;allIelFoulaye,ulD;!lDrF;ah,o;! rD;ahm0;an;ah;av,on", LastName: "true\xA60:9F;1:9V;2:9H;3:9X;4:9N;5:8J;6:9K;7:A0;8:9E;9:88;A:6E;B:77;C:6J;a9Ub8Lc7Kd6Xe6Rf6Dg5Vh58i54j4Pk45l3Nm2Rn2Eo26p1Nquispe,r17s0Ft05vVwOxNyGzD;aytsADhD;aDou,u;ng,o;aGeun7ZiDoshiA9un;!lD;diDmaz;rim,z;maDng;da,guc97mo6UsDzaB;aBhiA7;iao,u;aHeGiEoDright,u;jc8Sng;lDmm0nkl0sniewsB;liA1s3;b0iss,lt0;a5Rgn0lDng,tanabe;k0sh;aHeGiEoDukA;lk5roby5;dAllalDnogr2Zr0Zss0val37;ba,obos;lasEsel7N;lGn dFrg8EsEzD;qu7;ily9Oqu7silj9O;en b35ijk,yk;enzue95verde;aLeix1JhHi4j6ka3IoGrFsui,uD;om4ZrD;c4n0un1;an,embl8TynisB;dor95lst31m2rr9th;at5Mi7LoD;mErD;are6Ylaci64;ps3s0Y;hirAkah8Dnaka;a00chWeThPiNmKoItFuEvDzabo;en8Aobod34;ar7bot2lliv4zuB;aEein0oD;i67j3Lyan8V;l6rm0;kol5lovy5re6Psa,to,uD;ng,sa;iDy5Z;rn5tD;!h;l5YmDngh,rbu;mo6Do6J;aFeDimizu;hu,vchD;en7Cuk;la,r17;gu8mDoh,pulve8Trra4R;jDyD;on5;evi6Filtz,miDneid0roed0ulz,warz;dEtD;!z;!t;ar42h6ito,lFnDr2saBto,v2;ch7d0AtDz;a4Pe,os;as,ihAm3Zo0Q;aOeNiKoGuEyD;a66oo,u;bio,iz,sD;so,u;bEc7Bdrigue57g03j73mDosevelt,ssi,ta7Nux,w3Z;a4Be0O;ertsDins3;!on;bei0LcEes,vDzzo;as,e8;ci,hards3;ag4es,it0ut0y9;dFmEnDsmu7Zv5F;tan1;ir7os;ic,u;aSeLhJiGoErDut6;asad,if5Zochazk1W;lishc24pDrti62u55we66;e2Tov48;cEe09nD;as,to;as60hl0;aDillips;k,m,n5K;de3AetIna,rGtD;ersErovDtersC;!a,ic;en,on;eDic,ry,ss3;i8ra,tz,z;ers;h71k,rk0tEvD;ic,l3T;el,t2O;bJconnor,g2ClGnei5PrEzD;demir,turk;ella3MtDwe5N;ega,iz;iDof6GsC;vDyn1F;ei8;aPri1;aLeJguy1iFoDune44ym4;rodahl,vDwak;ak3Uik5otn56;eEkolDlsCx3;ic,ov6X;ls1miD;!n1;ils3mD;co42ec;gy,kaEray4varD;ro;jiDmu8shiD;ma;aXcVeQiPoIuD;lGnFrDssoli5T;atDpUr68;i,ov2;oz,te4B;d0l0;h4lIo0HrEsDza0Z;er,s;aFeEiDoz5r3Ete4B;!n6F;au,i8no,t4M;!l9;i2Rl0;crac5Ohhail5kke3Qll0;hmeGij0j2ElFndErci0ssiDyer19;!er;e3Bo2Z;n0Io;dAti;cartDlaughl6;hy;dMe6Dgnu5Ei0jer34kLmJnci59rFtEyD;er,r;ei,ic,su1N;iEkAqu9roqu6tinD;ez,s;a54c,nD;!o;a52mD;ad5;e5Oin1;rig4Ns1;aSeMiIoGuEyD;!nch;k2nDo;d,gu;mbarDpe2Rvr2;di;!nDu,yana1R;coln,dD;bDholm;erg;bed5TfeGhtFitn0kaEn6rDw2G;oy;!j;in1on1;bvDvD;re;iDmmy,rsCu,voie;ne,t11;aTennedy,h4iSlQnez46oJrGuEvar4woD;k,n;cerDmar58znets5;a,o2G;aDem0i2Zyeziu;sni3PvD;ch3U;bay4Frh0Jsk0TvaFwalDzl5;czDsB;yk;cFlD;!cDen3Q;huk;!ev2ic,s;e6uiveD;rt;eff0l2mu8nnun1;hn,lloe,minsBrEstra31to,ur,yDzl5;a,s0;j0GlsC;aMenLha2Pim0QoEuD;ng,r2;e2JhFnErge2Ju2NvD;anA;es,ss3;anEnsD;en,on,t3;nesDsC;en,s1;ki26s1;cGkob3RnsDrv06;en,sD;enDon;!s;ks3obs1;brahimAglesi3Ake4Ll0CnoZoneFshikEto,vanoD;u,v4A;awa;scu;aPeIitchcock,jaltal6oFrist46uD;!aDb0gh9ynh;m4ng;a23dz2fEjga2Sk,rDx3B;ak0Yvat;er,fm3B;iGmingw3NnErD;nand7re8;dDriks1;ers3;kkiEnD;on1;la,n1;dz2g1lvoLmJnsCqIrr0SsFuEyD;as36es;g1ng;anEhiD;mo0Q;i,ov08;ue;alaD;in1;rs1;aMeorgLheorghe,iJjonIoGrEuDw3;o,staf2Utierr7zm4;ayDg2iffitUub0;li1G;lub3Rme0JnD;calv9zale0I;aj,i;l,mDordaL;en7;iev3B;gnJlGmaFnd2No,rDs2Nuthi0;cDza;ia;ge;eaElD;agh0i,o;no;e,on;ab0erMiIjeldsted,lor9oGrFuD;cDent9ji3F;hs;an1Wiedm4;ntaDrt6st0urni0;na;lipEsD;ch0;ovD;!ic;hatAnandeVrD;arDei8;a,i;ov2;dHinste6riksCsDva0D;cob2ZpDtra2X;inoDosiM;za;en,s3;er,is3wards;aUeMiKjurhuJoHrisco0YuEvorakD;!oQ;arte,boEmitru,rDt2U;and,ic;is;g4he0Hmingu7n2Ord19tD;to;us;aDmitr29ssanayake;s,z; GbnaFlEmirDrvis1Lvi,w4;!ov2;gado,ic;th;bo0groot,jo03lEsilDvri9;va;a cruz,e3uD;ca;hl,mcevsBnErw6t2EviD;d5es,s;ieDku1S;ls1;ki;a05e00hNiobMlarkLoFrD;ivDuz;elli;h1lGntFop0rDs26x;byn,reD;a,ia;i,rer0O;em4liD;ns;!e;anu;aLeIiu,oGriDuJwe;stD;eDiaD;ns1;i,ng,uFwDy;!dhury;!n,onEuD;ng;!g;kEnDtterjee,v7;!d,g;ma,raboD;rty;bGl09ng2rD;eghetEnD;a,y;ti;an,ota0M;cer9lder3mpbeIrFstDvadi08;iDro;llo;doEt0uDvalho;so;so,zo;ll;es;a09eXhUiSlNoGrFyD;rne,tyD;qi;ank5iem,ooks,yant;gdan5nFruya,su,uchEyHziD;c,n5;ard;darDik;enD;ko;ov;aEondD;al;nEzD;ev2;co;ancRshwD;as;a01oDuiy4;umDwmD;ik;ckNethov1gu,ktLnJrD;gGisFnD;ascoDds1;ni;ha;er,mD;ann;gtDit7nett;ss3;asD;hi;er,ham;b2ch,ez,hMiley,kk0nHrDu0;bEnDua;es,i0;ieDosa;ri;dDik;a8yopadhyD;ay;ra;er;k,ng;ic;cosZdYguilXkhtXlSnJrGsl4yD;aEd6;in;la;aEsl4;an;ujo,ya;dFgelD;ovD;!a;ersGov,reD;aDjL;ss1;en;en,on,s3;on;eksejGiyGmeiFvD;ar7es;ez;da;ev;ar;ams;ta", WeekDay: "true\xA6fri2mon2s1t0wednesd3;hurs1ues1;aturd1und1;!d0;ay0;!s", Month: "true\xA6aBdec9feb7j2mar,nov9oct1sep0;!t8;!o8;an3u0;l1n0;!e;!y;!u1;!ru0;ary;!em0;ber;pr1ug0;!ust;!il", Date: "true\xA6ago,t2week0yesterd4; e0e0;nd;mr2o0;d0morrow;ay;!w", FirstName: "true\xA6aLblair,cHdevGgabrieFhinaEjCk9l8m4nelly,quinn,re3s0;h0umit;ay,e0iloh;a,lby;g6ne;a1el0ina,org5;!okuh9;naia,r0;ion,lo;ashawn,uca;asCe1ir0rE;an;lsAnyat2rry;am0ess6ie,ude;ie,m5;ta;le;an,on;as2h0;arl0eyenne;ie;ey,sidy;lex2ndr1ubr0;ey;a,ea;is", Person: "true\xA6ashton kutchTbScNdLeJgastOhHinez,jFkEleDmCnettKoBp9r4s3t2v0;a0irgin maH;lentino rossi,n go3;aylor,heresa may,iger woods,yra banks;addam hussain,carlett johanssKlobodan milosevic,uC;ay romano,e3o1ush limbau0;gh;d stewart,nald0;inho,o;ese witherspoFilly;a0ipJ;lmIris hiltD;prah winfrFra;essiaen,itt romnEubarek;bron james,e;anye west,iefer sutherland,obe bryant;aime,effers8k rowli0;ng;alle ber0itlBulk hogan;ry;ff0meril lagasse,zekiel;ie;a0enzel washingt2ick wolf;lt1nte;ar1lint0;on;dinal wols1son0;! palm2;ey;arack obama,rock;er", Verb: "true\xA6awak9born,cannot,fr8g7h5k3le2m1s0wors9;e8h3;ake sure,sg;ngth6ss6;eep tabs,n0;own;as0e2;!t2;iv1onna;ight0;en", PhrasalVerb: "true\xA60:7L;1:79;2:7X;3:7N;4:72;5:80;6:7P;7:6V;8:78;9:7J;A:6W;B:5Z;C:7S;D:7K;a81b6Lc5Rd5Me5Lf4Kg41h3Kiron0j3Gk3Bl2Vm2Jn2Ho2Fp1Wquiet7Ar1Js0CtSuQvacuum 1wHyammer9zE;eroBip FonE;e0k0;by,up;aLeHhGiForErit5G;d 1k33;mp0n2Vpe0r7s7;eel Dip 85;aFiEn2J;gh 09rd0;n Dr E;d2in,o5J;it 61k7lk6rm 6Csh 7Nt6Qv51;rge9sE;e AherB;aTeRhPiLoJrGuEype 69;ckBrn E;d2in,o3Sup;aFiEot0y 2I;ckle6Rp 7T;ck6Qde Y;ne6Pp Es4O;d2o73up;ck GdFe Egh6Bme0p o0Gre0;aw3ba4d2in,up;e 61y 1;by,o7D;ink Erow 6D;ba4ov8up;aEe 5Zll53;m 1r X;ck9ke Flk E;ov8u54;aEba4d2in,o3Cup;ba4ft8p59w3;a0Jc0Ie0Ch08i05l01m00nZoYpTquare StKuIwE;earGiE;ngFtch E;aw3ba4o77; by;ck Eit 1m 1ss0;in,up;aJe0WiIoGrEuc3G;aigh1WiE;ke 6Gn3A;p Erm1Z;by,in,o6T;n3Br 1tc3T;c3Amp0nd Er6Zve6y 1;ba4d2up;d2o6Pup;ar37eHiGlFrEur9;ing9uc7;a3Fit 5B;l13n 1;e5Sll0;be2Wrt0;ap 4Sow D;ash 5Foke0;eep FiEow A;c3Wp 1;in,oE;ff,v8;gn 4XngFt Ez7;d2o5up; al54le0;aGoEu4T;ot Eut0w 6D;aw3ba4f3Go67;c2PdeBk58ve6;e Ill1And HtE; Etl4H;d2in,o5upE;!on;aw3ba4d2in,o27up;o5Mto;al51out0rap51;il6v7;aPeMiLoHuE;b 4Ule0n Estl7;aEba4d2in5Jo3Ut39u3S;c26w3;ll Got FuE;g2Tnd6;a27f30o5;arCin,o5;ng 53p6;aEel6inBnt0;c5Dd E;o31u0I;c24t0;aSeRiPlNoLrIsyc2HuE;ll Gt E;aEba4d2in,o1Ot3Gup;p3Lw3;ap3Kd2in,o5t3Eup;attle9ess FiHoE;p 1;ah1Oon;iEp 5Hr3Yur4Jwer 5H;nt0;ay4DuE;gBmp A;ck Eg0le9n Ap4A;o2Yup;el 4KncilB;c42ir 3Un0ss GtFy E;ba4o54; d2c24;aw3ba4o18;pEw3X;e3Wt D;arrow46erd0oE;d6te45;aMeJiIoGuE;ddl7lE;l 3I;c1Dp 1uth6ve E;al3Nd2in,o5up;ss0x 1;asur7lFss E;a1Gup;t A;ke Fn ArEs1Px0;k Ary6;do,o48up;aRePiKoEuck0;aIc3Hg HoEse0;k Ese3F;aft8ba4d2forw2Jin46ov8uE;nd8p;in,o0M;d A;e HghtGnFsEv1V;ten 4M;e 1k 1; 1e37;arCd2;av1Jt 37velE; o3U;c7p 1sh Etch9ugh6y20;in3Uo5;eFick6nock E;d2o3Q;eEyB;l 2Pp E;aw3ba4d2fTin,o07to,up;aGoFuE;ic7mpB;ke31t35;c3Azz 1;aQeLiIoFuE;nker32rry 1s0W;lEneBrse2X;d Ee 1;ba4d2fast,o01up;de Ft E;ba4on,up;aw3o5;aElp0;d Gl 2Ar Et 1;fEof;rom;in,oTu1H;c02m 1nFve Ez25;it,to;d Eg 2FkerG;d2in,o5;aTeMive Kloss 22oGrFunE; f0N;in3How 2B; Eof 21;aFb1Dit,oErCt0Pu18;ff,n,v8;bo5ft8hKw3;aw3ba4d2in,oEup,w3;ff,n,ut;aJek0t E;aFb17d2oErCup;ff,n,ut,v8;cFhEl1XrCt,w3;ead;ross;r 1;d aFnE;g 1;bo5;a08e01iSlOoKrGuE;cEel 1;k 1;eFighten Eown9y 1;aw3o2S;eEshe1N; 1z7;lGol E;aEwi1G;bo5rC;d Alow 1;aFeEip0;sh0;g Ake0mErE;e 2R;gLlJnHrFsEzzle0;h 2P;e Em 1;aw3ba4up;d0isE;h 1;e El 19;aw3fJ;ht ba4ure0;eJnFsE;s 1;cGd E;fEo25;or;e D;dVl 1;cIll Erm0t0W;ap04bGd2in,oFtE;hrough;ff,ut,v8;a4ehi20;e 0L;at0dge0nd 0Ky7;oHrE;aFess Aop E;aw3bUin,o1E;g9w9; 0Dubl7;aXhUlean AoHrEut 10;ack9eep Eoss D;by,d2oEup;n,ut;me HoFuntE; o1Q;k 1l E;d2o1I;aKbJforHin,oGtFuE;nd8;ogeth8;ut,v8;th,wE;ard;a4y;pErCw3;art;eEipB;ck Der E;on,up;lKncel0rHsGtch FveB; in;o19up;h Dt6;ry FvE;e Y;aw3o15;l Em05;aEba4d2o13up;rCw3;a0Ke0Bl04oVrJuE;bblGcklWil02lk AndlWrn 08st FtEy 13zz6;t D;in,o5up;e E;ov8;anOeaMiFush E;o0Oup;ghIng E;aFba4d2forEin,o5up;th;bo5lErCw3;ong;teE;n 1;k E;d2in,o5up;ch0;arLgKil An7oHssGttlFunce Ex D;aw3ba4;e A; arC;k Dt 1;e 1;d2up; d2;d 1;aJeed0oEurt0;cGw E;aw3ba4d2o5up;ck;k E;in,oL;ck0nk0st6; oKaHef 1nd E;d2ov8up;er;up;r0t E;d2in,oEup;ff,ut;ff,nE;to;ck Kil0nGrgFsE;h D;ain9e D;g Dk9; on;in,o5; o5;aw3d2o5up;ay;cNdJsk Guction6; oE;ff;arCo5;ouE;nd;d E;d2oEup;ff,n;own;t E;o5up;ut", Modal: "true\xA6c5lets,m4ought3sh1w0;ill,o5;a0o4;ll,nt;! to,a;ay,ight,ust;an,o0;uld", Adjective: "true\xA60:7P;1:84;2:83;3:8A;4:7W;5:5S;6:4N;7:4O;8:58;9:6I;A:81;a6Wb6Gc63d5Je54f4Hg49h3Wi39j37k36l2Vm2Ln2Bo1Wp1Dquack,r12s0Ft07uMvJwByear5;arp0eFholeEiDoB;man5oBu6P;d6Rzy;despr7Ls5S;!sa7;eClBste2A;co1Nl o4W;!k5;aCiBola4M;b89ce versa,ol5H;ca3gabo6Gnilla;ltUnHpCrb5Msu4tterB;!mo7G; Eb1SpDsBti1M;ca7etBide dKtairs;!ti2;er,i3U;f36to da1;aLbeco75convin29deIeHfair,ivers4knGprecedVrEsCwB;iel3Nritt6A;i1XuB;pervis0spec3Y;eBu5;cognHgul6Tl6T;own;ndi2v64xpect0;cid0rB;!grou5ZsB;iz0tood;b7pp0Dssu6UuthorB;iz0;i26ra;aGeEhDi6AoCrB;i1oubl0us3M;geth8p,rp6Vuc67;ough4Wril33;en60l32mpBrr2X;o6Ati2;boo,lBn;ent0;aWcVeThSiQmug,nobbi3LoOpNqueami3LtFuBymb6H;bDi gener5DpBrpri6D;erBre0N;! dup8b,i2C;du0seq52;anda77eGiFrBunni2y3F;aightCiB;ki2p0; fBfB;or5K;ll,r5S;aBreotyp0;dfa6Cmi2;a55ec2Gir1Hlend6Cot on; call0le,mb8phist1XrBu0Vvi48;d6Ary;gnifica3nB;ce51g7;am2Re8ocki2ut;cBda1em5lfi32ni1Wpa6Jre6;o1Er42;at5Gient28reec5G;cr0me;aJeEiCoB;bu60tt51uQy4;ghtBv4;!-2Bf9;ar,bel,condi1du6Dfres5AlEpublic42sCtard0vB;ea26;is4CoB;lu1na3;aQe1Cuc4A;b5TciBllyi2;al,st;aOeLicayu6lac5Ropuli5QrCuB;bl5Jmp0n51;eGiDoB;!b07fu5RmiBp8;ne3si2;mCor,sBva1;ti6;a53e;ci5MmB;a0EiB;er,um;ac20rBti1;feAma2XpleBv38;xi2;rBst;allelDtB;-tiBi4;me;!ed;bLffJkIld fashion0nHpGrg1Eth8utFvB;al,erB;!all,niCt,wB;eiBrouB;ght;do0Ter,g2Qsi4B;en,posi1; boa5Og2Oli6;!ay; gua5MbBli6;eat;eDsB;cBer0Eole1;e6u3O;d2Xse;aJeIiHoBua4X;nFrCtB;ab7;thB;!eB;rn;chala3descri58stop;ght5;arby,cessa44ighbor5xt;k0usia1A;aIeGiDoBultip7;bi7derBl0Vnth5ot,st;a1n;nBx0;dblo0RiaBor;tu37;ande3Qdi4NnaBre;ci2;cBgenta,in,j01keshift,le,mmoth,ny,sculi6;ab33ho;aKeFiCoBu15;uti14vi2;mCteraB;l,te;it0;ftEgBth4;al,eCitiB;ma1;nda3K;!-0C;ngu3Zst,tt8;ap1Xind5no0A;agg0uB;niMstifi0veni7;de4gno4Klleg4mQnEpso 20rB;a1rB;eleBita0J;va3; KaJbr0corIdGfluenQiQnFsEtCviB;go0Fti2;aAen3SoxB;ic3B;a6i2Vul0D;a1er,oce3;iCoB;or;reA;deq3Qppr33;fBsitu,vitro;ro3;mFpB;arDerfeAoBrop8;li1rtB;a3ed;ti4;eBi0S;d2Vn3C;aIeFiDoBumdr3I;ne36ok0rrBs08ur5;if2Z;ghfalut1QspB;an2X;aClB;liYpf9;li2;lEnDrB;d04roB;wi2;dy;f,low0;ainf9ener2Oiga24lHoGraDuB;ilBng ho;ty;cCtB;ef9is;ef9;ne,od;ea2Iob4;aTeNinMlKoFrB;a1VeDoz1MustB;raB;ti2;e2Gq10tf9;oDrB; keeps,eBm8tuna1;g03ign;liB;sh;aBue3;g31tte1P;al,i1;dFmCrB;ti7;a7ini6;ne;le; up;bl0i3l27r Cux,voB;ri1uri1;oBreac1E;ff;aLfficie3lKmHnFreAthere4veExB;aAcess,pe1QtraCuB;be2Nl0E;!va1E;n,ryday; BcouraEti0O;rou1sui1;erCiB;ne3;gi2;abo23dMe17i1;g8sB;t,ygB;oi2;er;aReJiDoBrea14ue;mina3ne,ubB;le,tf9;dact1Bfficu1OsCvB;er1K;creDeas0gruntl0hone1FordCtB;a3ressM;er5;et; HadpGfFgene1PliDrang0spe1PtCvoB;ut;ail0ermin0;be1Mca1ghB;tf9;ia3;an;facto;i5magBngeroUs0G;ed,i2;ly;ertaMhief,ivil,oDrB;aBowd0u0G;mp0vZz0;loImGnCrrBve0P;eAu1I;cre1fu0LgrDsCtB;empo0Dra0E;ta3;ue3;mer08pleB;te,x;ni4ss4;in;aNeIizarHlFoCrB;and new,isk,okN;gCna fiUttom,urgeoB;is;us;ank,indB;!i2;re;autif9hiDloCnBst,yoD;eUt;v0w;nd;ul;ckCnkru0WrrB;en;!wards; priori,b0Mc0Jd09fra08g04h03lYmWntiquVppSrMsIttracti06utheHvEwB;aCkB;wa0T;ke,re;ant garCerB;age;de;ntU;leep,piDsuDtonB;isB;hi2;ri2;ab,bitEroDtiB;fiB;ci4;ga3;raB;ry;are3etiNrB;oprB;ia1;at0;aJuB;si2;arEcohCeBiIl,oof;rt;olB;ic;mi2;ead;ainDgressiConiB;zi2;ve;st;id; IeGuFvB;aCerB;se;nc0;ed;lt;pt,qB;ua1;hoc,infinitB;um;cuCtu4u1;al;ra1;erLlKoIruHsCuB;nda3;e3oCtraA;ct;lu1rbi2;ng;te;pt;aBve;rd;aze,e;ra3;nt", Comparable: "true\xA60:41;1:4I;2:45;3:2Y;4:4B;5:3X;a4Ob44c3Od3De35f2Rg2Fh24i1Vj1Uk1Rl1Jm1Dn17o15p0Vqu0Tr0KsTtMuIvFw7y6za13;ell27ou4;aBe9hi1Yi7r6;o4y;ck0Ode,l6n1ry,se;d,y;a6i4Mt;k,ry;n1Tr6sK;m,y;a7e6ulgar;nge5rda2xi4;g9in,st;g0n6pco3Mse5;like0t6;i1r6;ue;aAen9hi8i7ough,r6;anqu2Oen1ue;dy,g3Sme0ny,r09;ck,n,rs2P;d40se;ll,me,rt,s6wd45;te5;aVcarUeThRiQkin0FlMmKoHpGqua1FtAu7w6;eet,ift;b7dd13per0Gr6;e,re2H;sta2Ft3;aAe9iff,r7u6;pXr1;a6ict,o4;ig3Fn0U;a1ep,rn;le,rk;e22i3Fright0;ci28ft,l7o6re,ur;n,thi4;emn,id;a6el0ooth;ll,rt;e8i6ow,y;ck,g35m6;!y;ek,nd3D;ck,l0mp3;a6iTort,rill,y;dy,ll0Xrp;cu0Rve0Rxy;ce,ed,y;d,fe,int0l1Vv14;aBe9i8o6ude;mantic,o1Isy,u6;gh,nd;ch,pe,tzy;a6d,mo0H;dy,l;gg7ndom,p6re,w;id;ed;ai2i6;ck,et;aEhoDi1QlCoBr8u6;ny,r6;e,p3;egna2ic7o6;fouYud;ey,k0;li04or,te1B;ain,easa2;ny;in5le;dd,f6i0ld,ranQ;fi10;aAe8i7o6;b3isy,rm15sy;ce,mb3;a6w;r,t;ive,rr01;aAe8ild,o7u6;nda19te;ist,o1;a6ek,llX;n,s0ty;d,tuQ;aBeAi9o6ucky;f0Un7o1Du6ve0w17y0T;d,sy;e0g;g1Tke0tt3ve0;an,wd;me,r6te;ge;e7i6;nd;en;ol0ui1P;cy,ll,n6;sBt6;e6ima8;llege2r6;es7media6;te;ti4;ecu6ta2;re;aEeBiAo8u6;ge,m6ng1R;b3id;ll6me0t;ow;gh,l0;a6f04sita2;dy,v6;en0y;nd1Hppy,r6te5;d,sh;aGenFhDiClBoofy,r6;a9e8is0o6ue1E;o6ss;vy;at,en,y;nd,y;ad,ib,ooI;a2d1;a6o6;st0;t3uiY;u1y;aIeeb3iDlat,oAr8u6;ll,n6r14;!ny;aHe6iend0;e,sh;a7r6ul;get5mG;my;erce8n6rm;an6e;ciC;! ;le;ir,ke,n0Fr,st,t,ulA;aAerie,mp9sse7v6xtre0Q;il;nti6;al;ty;r7s6;tern,y;ly,th0;aFeCi9r7u6;ll,mb;u6y;nk;r7vi6;ne;e,ty;a6ep,nD;d6f,r;!ly;mp,pp03rk;aHhDlAo8r7u6;dd0r0te;isp,uel;ar6ld,mmon,ol,st0ward0zy;se;e6ou1;a6vW;n,r;ar8e6il0;ap,e6;sy;mi4;gey,lm8r6;e5i4;ful;!i4;aNiLlIoEr8u6;r0sy;ly;aAi7o6;ad,wn;ef,g7llia2;nt;ht;sh,ve;ld,r7un6;cy;ed,i4;ng;a7o6ue;nd,o1;ck,nd;g,tt6;er;d,ld,w1;dy;bsu9ng8we6;so6;me;ry;rd", TextOrdinal: "true\xA6bGeDf9hundredHmGnin7qu6s4t0zeroH;enGh1rFwe0;lfFn9;ir0ousandE;d,t4;e0ixt9;cond,ptAvent8xtA;adr9int9;et0th;e6ie8;i2o0;r0urt3;tie5;ft1rst;ight0lev1;e0h,ie2;en1;illion0;th", Cardinal: "true\xA6bHeEf8hundred,mHnineAone,qu6s4t0zero;en,h2rGw0;e0o;lve,n8;irt9ousandEree;e0ix5;pt1ven4xt1;adr0int0;illion;i3o0;r1ur0;!t2;ty;ft0ve;e2y;ight0lev1;!e0y;en;illion0;!s", Expression: "true\xA6a02b01dXeVfuck,gShLlImHnGoDpBshAtsk,u7voi04w3y0;a1eLu0;ck,p;!a,hoo,y;h1ow,t0;af,f;e0oa;e,w;gh,h0;! 0h,m;huh,oh;eesh,hh,it;ff,hew,l0sst;ease,z;h1o0w,y;h,o,ps;!h;ah,ope;eh,mm;m1ol0;!s;ao,fao;a4e2i,mm,oly1urr0;ah;! mo6;e,ll0y;!o;ha0i;!ha;ah,ee,o0rr;l0odbye;ly;e0h,t cetera,ww;k,p;'oh,a0uh;m0ng;mit,n0;!it;ah,oo,ye; 1h0rgh;!em;la", Adverb: "true\xA6a08by 06d02eYfShQinPjustOkinda,mMnJoEpCquite,r9s5t2up1very,well,ye0;p,s; to,wards5;h1iny bit,o0wiO;o,t6ward;en,us;eldom,o0uch;!me1rt0; of;hYtimes,w09;a1e0;alT;ndomSthN;ar excellDer0oint blank; Nhaps;f3n0;ce0ly;! 0;ag02moW; courIten;ewKo0; longEt 0;onIwithstanding;aybe,eanwhiAore0;!ovB;! aboU;deed,steV;en0;ce;or2u0;lArther0;!moJ; 0ev3;examp0good,suH;le;n1v0;er; mas0ough;se;e0irect1; 1finite0;ly;ju8trop;far,n0;ow; DbroCd nauseam,gBl6ny3part,s2t 0w4;be6l0mo6wor6;arge,ea5; soon,ide;mo1w0;ay;re;l 1mo0one,ready,so,ways;st;b1t0;hat;ut;ain;ad;lot,posteriori", Determiner: "true\xA6aBboth,d9e6few,l4mu8neiDown,plenty,s3th2various,wh0;at0ich0;evC;at,e4is,ose;everal,ome;a,e0;!ast,s;a1i6l0very;!se;ch;e0u;!s;!n0;!o0y;th0;er" };
var ar = function(e3) {
  const t2 = e3.split("|").reduce((e4, t3) => {
    const r3 = t3.split("\xA6");
    return e4[r3[0]] = r3[1], e4;
  }, {}), r2 = {};
  return Object.keys(t2).forEach(function(e4) {
    const a2 = tr(t2[e4]);
    e4 === "true" && (e4 = true);
    for (let t3 = 0; t3 < a2.length; t3++) {
      const n2 = a2[t3];
      r2.hasOwnProperty(n2) === true ? Array.isArray(r2[n2]) === false ? r2[n2] = [r2[n2], e4] : r2[n2].push(e4) : r2[n2] = e4;
    }
  }), r2;
};
var nr = { "20th century fox": "Organization", "7 eleven": "Organization", "motel 6": "Organization", g8: "Organization", vh1: "Organization", q1: "Date", q2: "Date", q3: "Date", q4: "Date", her: ["Possessive", "Pronoun"], his: ["Possessive", "Pronoun"], their: ["Possessive", "Pronoun"], themselves: ["Possessive", "Pronoun"], your: ["Possessive", "Pronoun"], our: ["Possessive", "Pronoun"], my: ["Possessive", "Pronoun"], its: ["Possessive", "Pronoun"] };
var ir = { Unit: (e3, t2) => {
  e3[t2] = ["Abbreviation", "Unit"];
}, Cardinal: (e3, t2) => {
  e3[t2] = ["TextValue", "Cardinal"];
}, TextOrdinal: (e3, t2) => {
  e3[t2] = ["Ordinal", "TextValue"], e3[t2 + "s"] = ["TextValue", "Fraction"];
}, Singular: (e3, t2, r2) => {
  e3[t2] = "Singular";
  let a2 = r2.transforms.toPlural(t2, r2);
  e3[a2] = e3[a2] || "Plural";
}, Infinitive: (e3, t2, r2) => {
  e3[t2] = "Infinitive";
  let a2 = r2.transforms.conjugate(t2, r2), n2 = Object.keys(a2);
  for (let t3 = 0; t3 < n2.length; t3++) {
    let r3 = a2[n2[t3]];
    e3[r3] = e3[r3] || n2[t3];
  }
}, Comparable: (e3, t2, r2) => {
  e3[t2] = "Comparable";
  let a2 = r2.transforms.adjectives(t2), n2 = Object.keys(a2);
  for (let t3 = 0; t3 < n2.length; t3++) {
    let r3 = a2[n2[t3]];
    e3[r3] = e3[r3] || n2[t3];
  }
}, PhrasalVerb: (e3, t2, r2) => {
  e3[t2] = ["PhrasalVerb", "Infinitive"];
  let a2 = t2.split(" "), n2 = r2.transforms.conjugate(a2[0], r2), i2 = Object.keys(n2);
  for (let t3 = 0; t3 < i2.length; t3++) {
    let o2 = n2[i2[t3]] + " " + a2[1];
    e3[o2] = e3[o2] || ["PhrasalVerb", i2[t3]], r2.hasCompound[n2[i2[t3]]] = true;
  }
}, Demonym: (e3, t2, r2) => {
  e3[t2] = "Demonym";
  let a2 = r2.transforms.toPlural(t2, r2);
  e3[a2] = e3[a2] || ["Demonym", "Plural"];
} };
var or = function(e3, t2, r2) {
  Object.keys(e3).forEach((a2) => {
    let n2 = e3[a2];
    n2 !== "Abbreviation" && n2 !== "Unit" || (r2.cache.abbreviations[a2] = true);
    let i2 = a2.split(" ");
    i2.length > 1 && (r2.hasCompound[i2[0]] = true), ir[n2] === void 0 ? t2[a2] !== void 0 ? (typeof t2[a2] == "string" && (t2[a2] = [t2[a2]]), typeof n2 == "string" ? t2[a2].push(n2) : t2[a2] = t2[a2].concat(n2)) : t2[a2] = n2 : ir[n2](t2, a2, r2);
  });
};
var sr = { buildOut: function(e3) {
  let t2 = Object.assign({}, nr);
  return Object.keys(rr).forEach((r2) => {
    let a2 = ar(rr[r2]);
    Object.keys(a2).forEach((e4) => {
      a2[e4] = r2;
    }), or(a2, t2, e3);
  }), t2;
}, addWords: or };
var lr = function(e3) {
  let t2 = e3.irregulars.nouns, r2 = Object.keys(t2);
  for (let a3 = 0; a3 < r2.length; a3++) {
    const n3 = r2[a3];
    e3.words[n3] = "Singular", e3.words[t2[n3]] = "Plural";
  }
  let a2 = e3.irregulars.verbs, n2 = Object.keys(a2);
  for (let t3 = 0; t3 < n2.length; t3++) {
    const r3 = n2[t3];
    e3.words[r3] = e3.words[r3] || "Infinitive";
    let i2 = e3.transforms.conjugate(r3, e3);
    i2 = Object.assign(i2, a2[r3]), Object.keys(i2).forEach((t4) => {
      e3.words[i2[t4]] = e3.words[i2[t4]] || t4, e3.words[i2[t4]] === "Participle" && (e3.words[i2[t4]] = t4);
    });
  }
};
var ur = { g: "Gerund", prt: "Participle", perf: "PerfectTense", pst: "PastTense", fut: "FuturePerfect", pres: "PresentTense", pluperf: "Pluperfect", a: "Actor" };
var cr = { act: { a: "_or" }, ache: { pst: "ached", g: "aching" }, age: { g: "ageing", pst: "aged", pres: "ages" }, aim: { a: "_er", g: "_ing", pst: "_ed" }, arise: { prt: "_n", pst: "arose" }, babysit: { a: "_ter", pst: "babysat" }, ban: { a: "", g: "_ning", pst: "_ned" }, be: { a: "", g: "am", prt: "been", pst: "was", pres: "is" }, beat: { a: "_er", g: "_ing", prt: "_en" }, become: { prt: "_" }, begin: { g: "_ning", prt: "begun", pst: "began" }, being: { g: "are", pst: "were", pres: "are" }, bend: { prt: "bent" }, bet: { a: "_ter", prt: "_" }, bind: { pst: "bound" }, bite: { g: "biting", prt: "bitten", pst: "bit" }, bleed: { pst: "bled", prt: "bled" }, blow: { prt: "_n", pst: "blew" }, boil: { a: "_er" }, brake: { prt: "broken" }, break: { pst: "broke" }, breed: { pst: "bred" }, bring: { pst: "brought", prt: "brought" }, broadcast: { pst: "_" }, budget: { pst: "_ed" }, build: { pst: "built", prt: "built" }, burn: { prt: "_ed" }, burst: { prt: "_" }, buy: { pst: "bought", prt: "bought" }, can: { a: "", fut: "_", g: "", pst: "could", perf: "could", pluperf: "could", pres: "_" }, catch: { pst: "caught" }, choose: { g: "choosing", prt: "chosen", pst: "chose" }, cling: { prt: "clung" }, come: { prt: "_", pst: "came", g: "coming" }, compete: { a: "competitor", g: "competing", pst: "_d" }, cost: { pst: "_" }, creep: { prt: "crept" }, cut: { prt: "_" }, deal: { pst: "_t", prt: "_t" }, develop: { a: "_er", g: "_ing", pst: "_ed" }, die: { g: "dying", pst: "_d" }, dig: { g: "_ging", pst: "dug", prt: "dug" }, dive: { prt: "_d" }, do: { pst: "did", pres: "_es" }, draw: { prt: "_n", pst: "drew" }, dream: { prt: "_t" }, drink: { prt: "drunk", pst: "drank" }, drive: { g: "driving", prt: "_n", pst: "drove" }, drop: { g: "_ping", pst: "_ped" }, eat: { a: "_er", g: "_ing", prt: "_en", pst: "ate" }, edit: { pst: "_ed", g: "_ing" }, egg: { pst: "_ed" }, fall: { prt: "_en", pst: "fell" }, feed: { prt: "fed", pst: "fed" }, feel: { a: "_er", pst: "felt" }, fight: { pst: "fought", prt: "fought" }, find: { pst: "found" }, flee: { g: "_ing", prt: "fled" }, fling: { prt: "flung" }, fly: { prt: "flown", pst: "flew" }, forbid: { pst: "forbade" }, forget: { g: "_ing", prt: "forgotten", pst: "forgot" }, forgive: { g: "forgiving", prt: "_n", pst: "forgave" }, free: { a: "", g: "_ing" }, freeze: { g: "freezing", prt: "frozen", pst: "froze" }, get: { pst: "got", prt: "gotten" }, give: { g: "giving", prt: "_n", pst: "gave" }, go: { prt: "_ne", pst: "went", pres: "goes" }, grow: { prt: "_n" }, guide: { pst: "_d" }, hang: { pst: "hung", prt: "hung" }, have: { g: "having", pst: "had", prt: "had", pres: "has" }, hear: { pst: "_d", prt: "_d" }, hide: { prt: "hidden", pst: "hid" }, hit: { prt: "_" }, hold: { pst: "held", prt: "held" }, hurt: { pst: "_", prt: "_" }, ice: { g: "icing", pst: "_d" }, imply: { pst: "implied", pres: "implies" }, is: { a: "", g: "being", pst: "was", pres: "_" }, keep: { prt: "kept" }, kneel: { prt: "knelt" }, know: { prt: "_n" }, lay: { pst: "laid", prt: "laid" }, lead: { pst: "led", prt: "led" }, leap: { prt: "_t" }, leave: { pst: "left", prt: "left" }, lend: { prt: "lent" }, lie: { g: "lying", pst: "lay" }, light: { pst: "lit", prt: "lit" }, log: { g: "_ging", pst: "_ged" }, loose: { prt: "lost" }, lose: { g: "losing", pst: "lost" }, make: { pst: "made", prt: "made" }, mean: { pst: "_t", prt: "_t" }, meet: { a: "_er", g: "_ing", pst: "met", prt: "met" }, miss: { pres: "_" }, name: { g: "naming" }, patrol: { g: "_ling", pst: "_led" }, pay: { pst: "paid", prt: "paid" }, prove: { prt: "_n" }, puke: { g: "puking" }, put: { prt: "_" }, quit: { prt: "_" }, read: { pst: "_", prt: "_" }, ride: { prt: "ridden" }, reside: { pst: "_d" }, ring: { pst: "rang", prt: "rung" }, rise: { fut: "will have _n", g: "rising", prt: "_n", pst: "rose", pluperf: "had _n" }, rub: { g: "_bing", pst: "_bed" }, run: { g: "_ning", prt: "_", pst: "ran" }, say: { pst: "said", prt: "said", pres: "_s" }, seat: { pst: "sat", prt: "sat" }, see: { g: "_ing", prt: "_n", pst: "saw" }, seek: { prt: "sought" }, sell: { pst: "sold", prt: "sold" }, send: { prt: "sent" }, set: { prt: "_" }, sew: { prt: "_n" }, shake: { prt: "_n" }, shave: { prt: "_d" }, shed: { g: "_ding", pst: "_", pres: "_s" }, shine: { pst: "shone", prt: "shone" }, shoot: { pst: "shot", prt: "shot" }, show: { pst: "_ed" }, shut: { prt: "_" }, sing: { prt: "sung", pst: "sang" }, sink: { pst: "sank", pluperf: "had sunk" }, sit: { pst: "sat" }, ski: { pst: "_ied" }, slay: { prt: "slain" }, sleep: { prt: "slept" }, slide: { pst: "slid", prt: "slid" }, smash: { pres: "_es" }, sneak: { prt: "snuck" }, speak: { fut: "will have spoken", prt: "spoken", pst: "spoke", perf: "have spoken", pluperf: "had spoken" }, speed: { prt: "sped" }, spend: { prt: "spent" }, spill: { prt: "_ed", pst: "spilt" }, spin: { g: "_ning", pst: "spun", prt: "spun" }, spit: { prt: "spat" }, split: { prt: "_" }, spread: { pst: "_" }, spring: { prt: "sprung" }, stand: { pst: "stood" }, steal: { a: "_er", pst: "stole" }, stick: { pst: "stuck" }, sting: { pst: "stung" }, stink: { pst: "stunk", prt: "stunk" }, stream: { a: "_er" }, strew: { prt: "_n" }, strike: { g: "striking", pst: "struck" }, suit: { a: "_er", g: "_ing", pst: "_ed" }, sware: { prt: "sworn" }, swear: { pst: "swore" }, sweep: { prt: "swept" }, swim: { g: "_ming", pst: "swam" }, swing: { pst: "swung" }, take: { fut: "will have _n", pst: "took", perf: "have _n", pluperf: "had _n" }, teach: { pst: "taught", pres: "_es" }, tear: { pst: "tore" }, tell: { pst: "told" }, think: { pst: "thought" }, thrive: { prt: "_d" }, tie: { g: "tying", pst: "_d" }, undergo: { prt: "_ne" }, understand: { pst: "understood" }, upset: { prt: "_" }, wait: { a: "_er", g: "_ing", pst: "_ed" }, wake: { pst: "woke" }, wear: { pst: "wore" }, weave: { prt: "woven" }, wed: { pst: "wed" }, weep: { prt: "wept" }, win: { g: "_ning", pst: "won" }, wind: { prt: "wound" }, withdraw: { pst: "withdrew" }, wring: { prt: "wrung" }, write: { g: "writing", prt: "written", pst: "wrote" } };
var hr = Object.keys(cr);
for (let e3 = 0; e3 < hr.length; e3++) {
  const t2 = hr[e3];
  let r2 = {};
  Object.keys(cr[t2]).forEach((e4) => {
    let a2 = cr[t2][e4];
    a2 = a2.replace("_", t2), r2[ur[e4]] = a2;
  }), cr[t2] = r2;
}
var dr = cr;
var gr = { b: [{ reg: /([^aeiou][aeiou])b$/i, repl: { pr: "$1bs", pa: "$1bbed", gr: "$1bbing" } }], d: [{ reg: /(end)$/i, repl: { pr: "$1s", pa: "ent", gr: "$1ing", ar: "$1er" } }, { reg: /(eed)$/i, repl: { pr: "$1s", pa: "$1ed", gr: "$1ing", ar: "$1er" } }, { reg: /(ed)$/i, repl: { pr: "$1s", pa: "$1ded", ar: "$1der", gr: "$1ding" } }, { reg: /([^aeiou][ou])d$/i, repl: { pr: "$1ds", pa: "$1dded", gr: "$1dding" } }], e: [{ reg: /(eave)$/i, repl: { pr: "$1s", pa: "$1d", gr: "eaving", ar: "$1r" } }, { reg: /(ide)$/i, repl: { pr: "$1s", pa: "ode", gr: "iding", ar: "ider" } }, { reg: /(t|sh?)(ake)$/i, repl: { pr: "$1$2s", pa: "$1ook", gr: "$1aking", ar: "$1$2r" } }, { reg: /w(ake)$/i, repl: { pr: "w$1s", pa: "woke", gr: "waking", ar: "w$1r" } }, { reg: /m(ake)$/i, repl: { pr: "m$1s", pa: "made", gr: "making", ar: "m$1r" } }, { reg: /(a[tg]|i[zn]|ur|nc|gl|is)e$/i, repl: { pr: "$1es", pa: "$1ed", gr: "$1ing" } }, { reg: /([bd]l)e$/i, repl: { pr: "$1es", pa: "$1ed", gr: "$1ing" } }, { reg: /(om)e$/i, repl: { pr: "$1es", pa: "ame", gr: "$1ing" } }], g: [{ reg: /([^aeiou][aou])g$/i, repl: { pr: "$1gs", pa: "$1gged", gr: "$1gging" } }], h: [{ reg: /(..)([cs]h)$/i, repl: { pr: "$1$2es", pa: "$1$2ed", gr: "$1$2ing" } }], k: [{ reg: /(ink)$/i, repl: { pr: "$1s", pa: "unk", gr: "$1ing", ar: "$1er" } }], m: [{ reg: /([^aeiou][aeiou])m$/i, repl: { pr: "$1ms", pa: "$1mmed", gr: "$1mming" } }], n: [{ reg: /(en)$/i, repl: { pr: "$1s", pa: "$1ed", gr: "$1ing" } }], p: [{ reg: /(e)(ep)$/i, repl: { pr: "$1$2s", pa: "$1pt", gr: "$1$2ing", ar: "$1$2er" } }, { reg: /([^aeiou][aeiou])p$/i, repl: { pr: "$1ps", pa: "$1pped", gr: "$1pping" } }, { reg: /([aeiu])p$/i, repl: { pr: "$1ps", pa: "$1p", gr: "$1pping" } }], r: [{ reg: /([td]er)$/i, repl: { pr: "$1s", pa: "$1ed", gr: "$1ing" } }, { reg: /(er)$/i, repl: { pr: "$1s", pa: "$1ed", gr: "$1ing" } }], s: [{ reg: /(ish|tch|ess)$/i, repl: { pr: "$1es", pa: "$1ed", gr: "$1ing" } }], t: [{ reg: /(ion|end|e[nc]t)$/i, repl: { pr: "$1s", pa: "$1ed", gr: "$1ing" } }, { reg: /(.eat)$/i, repl: { pr: "$1s", pa: "$1ed", gr: "$1ing" } }, { reg: /([aeiu])t$/i, repl: { pr: "$1ts", pa: "$1t", gr: "$1tting" } }, { reg: /([^aeiou][aeiou])t$/i, repl: { pr: "$1ts", pa: "$1tted", gr: "$1tting" } }], w: [{ reg: /(.llow)$/i, repl: { pr: "$1s", pa: "$1ed" } }, { reg: /(..)(ow)$/i, repl: { pr: "$1$2s", pa: "$1ew", gr: "$1$2ing", prt: "$1$2n" } }], y: [{ reg: /(i|f|rr)y$/i, repl: { pr: "$1ies", pa: "$1ied", gr: "$1ying" } }], z: [{ reg: /([aeiou]zz)$/i, repl: { pr: "$1es", pa: "$1ed", gr: "$1ing" } }] };
var pr = { pr: "PresentTense", pa: "PastTense", gr: "Gerund", prt: "Participle", ar: "Actor" };
var mr = function(e3, t2) {
  let r2 = {}, a2 = Object.keys(t2.repl);
  for (let n2 = 0; n2 < a2.length; n2 += 1) {
    let i2 = a2[n2];
    r2[pr[i2]] = e3.replace(t2.reg, t2.repl[i2]);
  }
  return r2;
};
var fr = /[bcdfghjklmnpqrstvwxz]y$/;
var br = function(e3 = "") {
  let t2 = e3[e3.length - 1];
  if (gr.hasOwnProperty(t2) === true)
    for (let r2 = 0; r2 < gr[t2].length; r2 += 1) {
      if (gr[t2][r2].reg.test(e3) === true)
        return mr(e3, gr[t2][r2]);
    }
  return {};
};
var yr = { Gerund: (e3) => e3.charAt(e3.length - 1) === "e" ? e3.replace(/e$/, "ing") : e3 + "ing", PresentTense: (e3) => e3.charAt(e3.length - 1) === "s" ? e3 + "es" : fr.test(e3) === true ? e3.slice(0, -1) + "ies" : e3 + "s", PastTense: (e3) => e3.charAt(e3.length - 1) === "e" ? e3 + "d" : e3.substr(-2) === "ed" ? e3 : fr.test(e3) === true ? e3.slice(0, -1) + "ied" : e3 + "ed" };
var vr = function(e3 = "", t2) {
  let r2 = {};
  return t2 && t2.irregulars && t2.irregulars.verbs.hasOwnProperty(e3) === true && (r2 = Object.assign({}, t2.irregulars.verbs[e3])), r2 = Object.assign({}, br(e3), r2), r2.Gerund === void 0 && (r2.Gerund = yr.Gerund(e3)), r2.PastTense === void 0 && (r2.PastTense = yr.PastTense(e3)), r2.PresentTense === void 0 && (r2.PresentTense = yr.PresentTense(e3)), r2;
};
var wr = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];
var kr = [/ary$/];
var Ar = { nice: "nicest", late: "latest", hard: "hardest", inner: "innermost", outer: "outermost", far: "furthest", worse: "worst", bad: "worst", good: "best", big: "biggest", large: "largest" };
var Dr = [{ reg: /y$/i, repl: "iest" }, { reg: /([aeiou])t$/i, repl: "$1ttest" }, { reg: /([aeou])de$/i, repl: "$1dest" }, { reg: /nge$/i, repl: "ngest" }, { reg: /([aeiou])te$/i, repl: "$1test" }];
var $r = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/];
var Pr = [/ary$/, /ous$/];
var Er = { grey: "greyer", gray: "grayer", green: "greener", yellow: "yellower", red: "redder", good: "better", well: "better", bad: "worse", sad: "sadder", big: "bigger" };
var Hr = [{ reg: /y$/i, repl: "ier" }, { reg: /([aeiou])t$/i, repl: "$1tter" }, { reg: /([aeou])de$/i, repl: "$1der" }, { reg: /nge$/i, repl: "nger" }];
var jr = { toSuperlative: function(e3) {
  if (Ar.hasOwnProperty(e3))
    return Ar[e3];
  for (let t2 = 0; t2 < Dr.length; t2++)
    if (Dr[t2].reg.test(e3))
      return e3.replace(Dr[t2].reg, Dr[t2].repl);
  for (let t2 = 0; t2 < kr.length; t2++)
    if (kr[t2].test(e3) === true)
      return null;
  for (let t2 = 0; t2 < wr.length; t2++)
    if (wr[t2].test(e3) === true)
      return e3.charAt(e3.length - 1) === "e" ? e3 + "st" : e3 + "est";
  return e3 + "est";
}, toComparative: function(e3) {
  if (Er.hasOwnProperty(e3))
    return Er[e3];
  for (let t2 = 0; t2 < Hr.length; t2++)
    if (Hr[t2].reg.test(e3) === true)
      return e3.replace(Hr[t2].reg, Hr[t2].repl);
  for (let t2 = 0; t2 < Pr.length; t2++)
    if (Pr[t2].test(e3) === true)
      return null;
  for (let t2 = 0; t2 < $r.length; t2++)
    if ($r[t2].test(e3) === true)
      return e3 + "er";
  return /e$/.test(e3) === true ? e3 + "r" : e3 + "er";
} };
var Nr = function(e3) {
  let t2 = {}, r2 = jr.toSuperlative(e3);
  r2 && (t2.Superlative = r2);
  let a2 = jr.toComparative(e3);
  return a2 && (t2.Comparative = a2), t2;
};
var xr = { a: [[/(antenn|formul|nebul|vertebr|vit)a$/i, "$1ae"], [/([ti])a$/i, "$1a"]], e: [[/(kn|l|w)ife$/i, "$1ives"], [/(hive)$/i, "$1s"], [/([m|l])ouse$/i, "$1ice"], [/([m|l])ice$/i, "$1ice"]], f: [[/^(dwar|handkerchie|hoo|scar|whar)f$/i, "$1ves"], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, "$1ves"]], i: [[/(octop|vir)i$/i, "$1i"]], m: [[/([ti])um$/i, "$1a"]], n: [[/^(oxen)$/i, "$1"]], o: [[/(al|ad|at|er|et|ed|ad)o$/i, "$1oes"]], s: [[/(ax|test)is$/i, "$1es"], [/(alias|status)$/i, "$1es"], [/sis$/i, "ses"], [/(bu)s$/i, "$1ses"], [/(sis)$/i, "ses"], [/^(?!talis|.*hu)(.*)man$/i, "$1men"], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, "$1i"]], x: [[/(matr|vert|ind|cort)(ix|ex)$/i, "$1ices"], [/^(ox)$/i, "$1en"]], y: [[/([^aeiouy]|qu)y$/i, "$1ies"]], z: [[/(quiz)$/i, "$1zes"]] };
var Fr = /(x|ch|sh|s|z)$/;
var Cr = function(e3 = "", t2) {
  let r2 = t2.irregulars.nouns;
  if (r2.hasOwnProperty(e3))
    return r2[e3];
  let a2 = function(e4) {
    let t3 = e4[e4.length - 1];
    if (xr.hasOwnProperty(t3) === true)
      for (let r3 = 0; r3 < xr[t3].length; r3 += 1) {
        let a3 = xr[t3][r3][0];
        if (a3.test(e4) === true)
          return e4.replace(a3, xr[t3][r3][1]);
      }
    return null;
  }(e3);
  return a2 !== null ? a2 : Fr.test(e3) ? e3 + "es" : e3 + "s";
};
var Br = [[/([^v])ies$/i, "$1y"], [/ises$/i, "isis"], [/(kn|[^o]l|w)ives$/i, "$1ife"], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, "$1f"], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, "$1f"], [/(antenn|formul|nebul|vertebr|vit)ae$/i, "$1a"], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, "$1us"], [/(buffal|tomat|tornad)(oes)$/i, "$1o"], [/(eas)es$/i, "$1e"], [/(..[aeiou]s)es$/i, "$1"], [/(vert|ind|cort)(ices)$/i, "$1ex"], [/(matr|append)(ices)$/i, "$1ix"], [/(x|ch|ss|sh|z|o)es$/i, "$1"], [/men$/i, "man"], [/(n)ews$/i, "$1ews"], [/([ti])a$/i, "$1um"], [/([^aeiouy]|qu)ies$/i, "$1y"], [/(s)eries$/i, "$1eries"], [/(m)ovies$/i, "$1ovie"], [/([m|l])ice$/i, "$1ouse"], [/(cris|ax|test)es$/i, "$1is"], [/(alias|status)es$/i, "$1"], [/(ss)$/i, "$1"], [/(ics)$/i, "$1"], [/s$/i, ""]];
var Gr = function(e3, t2) {
  let r2 = t2.irregulars.nouns, a2 = (n2 = r2, Object.keys(n2).reduce((e4, t3) => (e4[n2[t3]] = t3, e4), {}));
  var n2;
  if (a2.hasOwnProperty(e3))
    return a2[e3];
  for (let t3 = 0; t3 < Br.length; t3++)
    if (Br[t3][0].test(e3) === true)
      return e3 = e3.replace(Br[t3][0], Br[t3][1]);
  return e3;
};
var zr = { Participle: [{ reg: /own$/i, to: "ow" }, { reg: /(.)un([g|k])$/i, to: "$1in$2" }], Actor: [{ reg: /(er)er$/i, to: "$1" }], PresentTense: [{ reg: /(..)(ies)$/i, to: "$1y" }, { reg: /(tch|sh)es$/i, to: "$1" }, { reg: /(ss|zz)es$/i, to: "$1" }, { reg: /([tzlshicgrvdnkmu])es$/i, to: "$1e" }, { reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i, to: "$1" }, { reg: /(ow)s$/i, to: "$1" }, { reg: /(op)s$/i, to: "$1" }, { reg: /([eirs])ts$/i, to: "$1t" }, { reg: /(ll)s$/i, to: "$1" }, { reg: /(el)s$/i, to: "$1" }, { reg: /(ip)es$/i, to: "$1e" }, { reg: /ss$/i, to: "ss" }, { reg: /s$/i, to: "" }], Gerund: [{ reg: /(..)(p|d|t|g){2}ing$/i, to: "$1$2" }, { reg: /(ll|ss|zz)ing$/i, to: "$1" }, { reg: /([^aeiou])ying$/i, to: "$1y" }, { reg: /([^ae]i.)ing$/i, to: "$1e" }, { reg: /(ea[dklnrtv])ing$/i, to: "$1" }, { reg: /(ch|sh)ing$/i, to: "$1" }, { reg: /(z)ing$/i, to: "$1e" }, { reg: /(a[gdkvtc])ing$/i, to: "$1e" }, { reg: /(u[rtcbn])ing$/i, to: "$1e" }, { reg: /([^o]o[bdknprv])ing$/i, to: "$1e" }, { reg: /([tbckg]l)ing$/i, to: "$1e" }, { reg: /(c|s)ing$/i, to: "$1e" }, { reg: /(..)ing$/i, to: "$1" }], PastTense: [{ reg: /(ued)$/i, to: "ue" }, { reg: /ea(rn|l|m)ed$/i, to: "ea$1" }, { reg: /a([^aeiouy])ed$/i, to: "a$1e" }, { reg: /([aeiou]zz)ed$/i, to: "$1" }, { reg: /(e|i)lled$/i, to: "$1ll" }, { reg: /(.)(sh|ch)ed$/i, to: "$1$2" }, { reg: /(tl|gl)ed$/i, to: "$1e" }, { reg: /(um?pt?)ed$/i, to: "$1" }, { reg: /(ss)ed$/i, to: "$1" }, { reg: /pped$/i, to: "p" }, { reg: /tted$/i, to: "t" }, { reg: /(..)gged$/i, to: "$1g" }, { reg: /(..)lked$/i, to: "$1lk" }, { reg: /([^aeiouy][aeiou])ked$/i, to: "$1ke" }, { reg: /(.[aeiou])led$/i, to: "$1l" }, { reg: /(..)(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i, to: "$1$2" }, { reg: /(.ut)ed$/i, to: "$1e" }, { reg: /(.pt)ed$/i, to: "$1" }, { reg: /(us)ed$/i, to: "$1e" }, { reg: /(dd)ed$/i, to: "$1" }, { reg: /(..[^aeiouy])ed$/i, to: "$1e" }, { reg: /(..)ied$/i, to: "$1y" }, { reg: /(.o)ed$/i, to: "$1o" }, { reg: /(..i)ed$/i, to: "$1" }, { reg: /(.a[^aeiou])ed$/i, to: "$1" }, { reg: /([aeiou][^aeiou])ed$/i, to: "$1e" }, { reg: /([rl])ew$/i, to: "$1ow" }, { reg: /([pl])t$/i, to: "$1t" }] };
var Ir = { Gerund: ["ing"], Actor: ["erer"], Infinitive: ["ate", "ize", "tion", "rify", "then", "ress", "ify", "age", "nce", "ect", "ise", "ine", "ish", "ace", "ash", "ure", "tch", "end", "ack", "and", "ute", "ade", "ock", "ite", "ase", "ose", "use", "ive", "int", "nge", "lay", "est", "ain", "ant", "ent", "eed", "er", "le", "own", "unk", "ung", "en"], PastTense: ["ed", "lt", "nt", "pt", "ew", "ld"], PresentTense: ["rks", "cks", "nks", "ngs", "mps", "tes", "zes", "ers", "les", "acks", "ends", "ands", "ocks", "lays", "eads", "lls", "els", "ils", "ows", "nds", "ays", "ams", "ars", "ops", "ffs", "als", "urs", "lds", "ews", "ips", "es", "ts", "ns"] };
Ir = Object.keys(Ir).reduce((e3, t2) => (Ir[t2].forEach((r2) => e3[r2] = t2), e3), {});
var Or = zr;
var Tr = Ir;
var Vr = Qt;
var Mr = sr;
var Jr = lr;
var Lr = St;
var Sr = { nouns: { addendum: "addenda", alga: "algae", alumna: "alumnae", alumnus: "alumni", analysis: "analyses", antenna: "antennae", appendix: "appendices", avocado: "avocados", axis: "axes", bacillus: "bacilli", barracks: "barracks", beau: "beaux", bus: "buses", cactus: "cacti", chateau: "chateaux", child: "children", circus: "circuses", clothes: "clothes", corpus: "corpora", criterion: "criteria", curriculum: "curricula", database: "databases", deer: "deer", diagnosis: "diagnoses", echo: "echoes", embargo: "embargoes", epoch: "epochs", foot: "feet", formula: "formulae", fungus: "fungi", genus: "genera", goose: "geese", halo: "halos", hippopotamus: "hippopotami", index: "indices", larva: "larvae", leaf: "leaves", libretto: "libretti", loaf: "loaves", man: "men", matrix: "matrices", memorandum: "memoranda", modulus: "moduli", mosquito: "mosquitoes", mouse: "mice", nebula: "nebulae", nucleus: "nuclei", octopus: "octopi", opus: "opera", ovum: "ova", ox: "oxen", parenthesis: "parentheses", person: "people", phenomenon: "phenomena", prognosis: "prognoses", quiz: "quizzes", radius: "radii", referendum: "referenda", rodeo: "rodeos", sex: "sexes", shoe: "shoes", sombrero: "sombreros", stimulus: "stimuli", stomach: "stomachs", syllabus: "syllabi", synopsis: "synopses", tableau: "tableaux", thesis: "theses", thief: "thieves", tooth: "teeth", tornado: "tornados", tuxedo: "tuxedos", vertebra: "vertebrae" }, verbs: dr };
var _r = { conjugate: vr, adjectives: Nr, toPlural: Cr, toSingular: Gr, toInfinitive: function(e3, t2, r2) {
  if (!e3)
    return "";
  if (t2.words.hasOwnProperty(e3) === true) {
    let r3 = t2.irregulars.verbs, a2 = Object.keys(r3);
    for (let t3 = 0; t3 < a2.length; t3++) {
      let n2 = Object.keys(r3[a2[t3]]);
      for (let i2 = 0; i2 < n2.length; i2++)
        if (e3 === r3[a2[t3]][n2[i2]])
          return a2[t3];
    }
  }
  if ((r2 = r2 || function(e4) {
    let t3 = e4.substr(e4.length - 3);
    if (Tr.hasOwnProperty(t3) === true)
      return Tr[t3];
    let r3 = e4.substr(e4.length - 2);
    return Tr.hasOwnProperty(r3) === true ? Tr[r3] : e4.substr(e4.length - 1) === "s" ? "PresentTense" : null;
  }(e3)) && Or[r2])
    for (let t3 = 0; t3 < Or[r2].length; t3++) {
      const a2 = Or[r2][t3];
      if (a2.reg.test(e3) === true)
        return e3.replace(a2.reg, a2.to);
    }
  return e3;
} };
var Kr = false;
var qr = class {
  constructor() {
    Object.defineProperty(this, "words", { enumerable: false, value: {}, writable: true }), Object.defineProperty(this, "hasCompound", { enumerable: false, value: {}, writable: true }), Object.defineProperty(this, "irregulars", { enumerable: false, value: Sr, writable: true }), Object.defineProperty(this, "tags", { enumerable: false, value: Object.assign({}, Vr), writable: true }), Object.defineProperty(this, "transforms", { enumerable: false, value: _r, writable: true }), Object.defineProperty(this, "taggers", { enumerable: false, value: [], writable: true }), Object.defineProperty(this, "cache", { enumerable: false, value: { abbreviations: {} } }), this.words = Mr.buildOut(this), Jr(this);
  }
  verbose(e3) {
    return Kr = e3, this;
  }
  isVerbose() {
    return Kr;
  }
  addWords(e3) {
    let t2 = {};
    Object.keys(e3).forEach((r2) => {
      let a2 = e3[r2];
      r2 = r2.toLowerCase().trim(), t2[r2] = a2;
    }), Mr.addWords(t2, this.words, this);
  }
  addConjugations(e3) {
    return Object.assign(this.irregulars.verbs, e3), this;
  }
  addPlurals(e3) {
    return Object.assign(this.irregulars.nouns, e3), this;
  }
  addTags(e3) {
    return e3 = Object.assign({}, e3), this.tags = Object.assign(this.tags, e3), this.tags = Lr(this.tags), this;
  }
  postProcess(e3) {
    return this.taggers.push(e3), this;
  }
  stats() {
    return { words: Object.keys(this.words).length, plurals: Object.keys(this.irregulars.nouns).length, conjugations: Object.keys(this.irregulars.verbs).length, compounds: Object.keys(this.hasCompound).length, postProcessors: this.taggers.length };
  }
};
var Wr = function(e3) {
  return JSON.parse(JSON.stringify(e3));
};
qr.prototype.clone = function() {
  let e3 = new qr();
  return e3.words = Object.assign({}, this.words), e3.hasCompound = Object.assign({}, this.hasCompound), e3.irregulars = Wr(this.irregulars), e3.tags = Wr(this.tags), e3.transforms = this.transforms, e3.taggers = this.taggers, e3;
};
var Rr = qr;
var Ur = {};
!function(e3) {
  e3.all = function() {
    return this.parents()[0] || this;
  }, e3.parent = function() {
    return this.from ? this.from : this;
  }, e3.parents = function(e4) {
    let t2 = [];
    const r2 = function(e5) {
      e5.from && (t2.push(e5.from), r2(e5.from));
    };
    return r2(this), t2 = t2.reverse(), typeof e4 == "number" ? t2[e4] : t2;
  }, e3.clone = function(e4) {
    let t2 = this.list.map((t3) => t3.clone(e4));
    return this.buildFrom(t2);
  }, e3.wordCount = function() {
    return this.list.reduce((e4, t2) => e4 += t2.wordCount(), 0);
  }, e3.wordcount = e3.wordCount;
}(Ur);
var Qr = {};
!function(e3) {
  e3.first = function(e4) {
    return e4 === void 0 ? this.get(0) : this.slice(0, e4);
  }, e3.last = function(e4) {
    if (e4 === void 0)
      return this.get(this.list.length - 1);
    let t2 = this.list.length;
    return this.slice(t2 - e4, t2);
  }, e3.slice = function(e4, t2) {
    let r2 = this.list.slice(e4, t2);
    return this.buildFrom(r2);
  }, e3.eq = function(e4) {
    let t2 = this.list[e4];
    return t2 === void 0 ? this.buildFrom([]) : this.buildFrom([t2]);
  }, e3.get = e3.eq, e3.firstTerms = function() {
    return this.match("^.");
  }, e3.firstTerm = e3.firstTerms, e3.lastTerms = function() {
    return this.match(".$");
  }, e3.lastTerm = e3.lastTerms, e3.termList = function(e4) {
    let t2 = [];
    for (let r2 = 0; r2 < this.list.length; r2++) {
      let a2 = this.list[r2].terms();
      for (let r3 = 0; r3 < a2.length; r3++)
        if (t2.push(a2[r3]), e4 !== void 0 && t2[e4] !== void 0)
          return t2[e4];
    }
    return t2;
  };
  e3.groups = function(e4) {
    return e4 === void 0 ? function(e5) {
      let t2 = {};
      const r2 = {};
      for (let t3 = 0; t3 < e5.list.length; t3++) {
        const a3 = e5.list[t3], n2 = Object.keys(a3.groups).map((e6) => a3.groups[e6]);
        for (let e6 = 0; e6 < n2.length; e6++) {
          const { group: t4, start: i2, length: o2 } = n2[e6];
          r2[t4] || (r2[t4] = []), r2[t4].push(a3.buildFrom(i2, o2));
        }
      }
      const a2 = Object.keys(r2);
      for (let n2 = 0; n2 < a2.length; n2++) {
        const i2 = a2[n2];
        t2[i2] = e5.buildFrom(r2[i2]);
      }
      return t2;
    }(this) : (typeof e4 == "number" && (e4 = String(e4)), function(e5, t2) {
      const r2 = [];
      for (let a2 = 0; a2 < e5.list.length; a2++) {
        const n2 = e5.list[a2];
        let i2 = Object.keys(n2.groups);
        i2 = i2.filter((e6) => n2.groups[e6].group === t2), i2.forEach((e6) => {
          r2.push(n2.buildFrom(n2.groups[e6].start, n2.groups[e6].length));
        });
      }
      return e5.buildFrom(r2);
    }(this, e4) || this.buildFrom([]));
  }, e3.group = e3.groups, e3.sentences = function(e4) {
    let t2 = [];
    return this.list.forEach((e5) => {
      t2.push(e5.fullSentence());
    }), typeof e4 == "number" ? this.buildFrom([t2[e4]]) : this.buildFrom(t2);
  }, e3.sentence = e3.sentences;
}(Qr);
var Zr = {};
var Xr = function(e3, t2) {
  if (e3._cache && e3._cache.set === true) {
    let { words: r2, tags: a2 } = function(e4) {
      let t3 = [], r3 = [];
      return e4.forEach((e5) => {
        e5.optional !== true && e5.negative !== true && (e5.tag !== void 0 && t3.push(e5.tag), e5.word !== void 0 && r3.push(e5.word));
      }), { tags: t3, words: r3 };
    }(t2);
    for (let t3 = 0; t3 < r2.length; t3++)
      if (e3._cache.words[r2[t3]] === void 0)
        return false;
    for (let t3 = 0; t3 < a2.length; t3++)
      if (e3._cache.tags[a2[t3]] === void 0)
        return false;
  }
  return true;
};
!function(e3) {
  const t2 = _e, r2 = Xr;
  e3.match = function(e4, a2 = {}) {
    typeof a2 != "string" && typeof a2 != "number" && a2 !== null || (a2 = { group: a2 });
    let n2 = t2(e4, a2);
    if (n2.length === 0)
      return this.buildFrom([]);
    if (r2(this, n2) === false)
      return this.buildFrom([]);
    let i2 = this.list.reduce((e5, t3) => e5.concat(t3.match(n2)), []);
    return a2.group !== void 0 && a2.group !== null && a2.group !== "" ? this.buildFrom(i2).groups(a2.group) : this.buildFrom(i2);
  }, e3.not = function(e4, a2 = {}) {
    let n2 = t2(e4, a2);
    if (n2.length === 0 || r2(this, n2) === false)
      return this;
    let i2 = this.list.reduce((e5, t3) => e5.concat(t3.not(n2)), []);
    return this.buildFrom(i2);
  }, e3.matchOne = function(e4, a2 = {}) {
    let n2 = t2(e4, a2);
    if (r2(this, n2) === false)
      return this.buildFrom([]);
    for (let e5 = 0; e5 < this.list.length; e5++) {
      let t3 = this.list[e5].match(n2, true);
      return this.buildFrom(t3);
    }
    return this.buildFrom([]);
  }, e3.if = function(e4, a2 = {}) {
    let n2 = t2(e4, a2);
    if (r2(this, n2) === false)
      return this.buildFrom([]);
    let i2 = this.list.filter((e5) => e5.has(n2) === true);
    return this.buildFrom(i2);
  }, e3.ifNo = function(e4, r3 = {}) {
    let a2 = t2(e4, r3), n2 = this.list.filter((e5) => e5.has(a2) === false);
    return this.buildFrom(n2);
  }, e3.has = function(e4, a2 = {}) {
    let n2 = t2(e4, a2);
    return r2(this, n2) !== false && this.list.some((e5) => e5.has(n2) === true);
  }, e3.lookAhead = function(e4, r3 = {}) {
    e4 || (e4 = ".*");
    let a2 = t2(e4, r3), n2 = [];
    return this.list.forEach((e5) => {
      n2 = n2.concat(e5.lookAhead(a2));
    }), n2 = n2.filter((e5) => e5), this.buildFrom(n2);
  }, e3.lookAfter = e3.lookAhead, e3.lookBehind = function(e4, r3 = {}) {
    e4 || (e4 = ".*");
    let a2 = t2(e4, r3), n2 = [];
    return this.list.forEach((e5) => {
      n2 = n2.concat(e5.lookBehind(a2));
    }), n2 = n2.filter((e5) => e5), this.buildFrom(n2);
  }, e3.lookBefore = e3.lookBehind, e3.before = function(e4, r3 = {}) {
    let a2 = t2(e4, r3), n2 = this.if(a2).list.map((e5) => {
      let t3 = e5.terms().map((e6) => e6.id), r4 = e5.match(a2)[0], n3 = t3.indexOf(r4.start);
      return n3 === 0 || n3 === -1 ? null : e5.buildFrom(e5.start, n3);
    });
    return n2 = n2.filter((e5) => e5 !== null), this.buildFrom(n2);
  }, e3.after = function(e4, r3 = {}) {
    let a2 = t2(e4, r3), n2 = this.if(a2).list.map((e5) => {
      let t3 = e5.terms(), r4 = t3.map((e6) => e6.id), n3 = e5.match(a2)[0], i2 = r4.indexOf(n3.start);
      if (i2 === -1 || !t3[i2 + n3.length])
        return null;
      let o2 = t3[i2 + n3.length].id, s2 = e5.length - i2 - n3.length;
      return e5.buildFrom(o2, s2);
    });
    return n2 = n2.filter((e5) => e5 !== null), this.buildFrom(n2);
  }, e3.hasAfter = function(e4, t3 = {}) {
    return this.filter((r3) => r3.lookAfter(e4, t3).found);
  }, e3.hasBefore = function(e4, t3 = {}) {
    return this.filter((r3) => r3.lookBefore(e4, t3).found);
  };
}(Zr);
var Yr = {};
var ea = function(e3, t2, r2, a2) {
  let n2 = [];
  typeof e3 == "string" && (n2 = e3.split(" ")), t2.list.forEach((i2) => {
    let o2 = i2.terms();
    r2 === true && (o2 = o2.filter((r3) => r3.canBe(e3, t2.world))), o2.forEach((r3, i3) => {
      n2.length > 1 ? n2[i3] && n2[i3] !== "." && r3.tag(n2[i3], a2, t2.world) : r3.tag(e3, a2, t2.world);
    });
  });
};
Yr.tag = function(e3, t2) {
  return e3 ? (ea(e3, this, false, t2), this) : this;
}, Yr.tagSafe = function(e3, t2) {
  return e3 ? (ea(e3, this, true, t2), this) : this;
}, Yr.unTag = function(e3, t2) {
  return this.list.forEach((r2) => {
    r2.terms().forEach((r3) => r3.unTag(e3, t2, this.world));
  }), this;
}, Yr.canBe = function(e3) {
  if (!e3)
    return this;
  let t2 = this.world, r2 = this.list.reduce((r3, a2) => r3.concat(a2.canBe(e3, t2)), []);
  return this.buildFrom(r2);
};
var ta = { map: function(e3) {
  if (!e3)
    return this;
  let t2 = this.list.map((t3, r2) => {
    let a2 = this.buildFrom([t3]);
    a2.from = null;
    let n2 = e3(a2, r2);
    return n2 && n2.list && n2.list[0] ? n2.list[0] : n2;
  });
  return t2 = t2.filter((e4) => e4), t2.length === 0 ? this.buildFrom(t2) : typeof t2[0] != "object" || t2[0].isA !== "Phrase" ? t2 : this.buildFrom(t2);
}, forEach: function(e3, t2) {
  return e3 ? (this.list.forEach((r2, a2) => {
    let n2 = this.buildFrom([r2]);
    t2 === true && (n2.from = null), e3(n2, a2);
  }), this) : this;
}, filter: function(e3) {
  if (!e3)
    return this;
  let t2 = this.list.filter((t3, r2) => {
    let a2 = this.buildFrom([t3]);
    return a2.from = null, e3(a2, r2);
  });
  return this.buildFrom(t2);
}, find: function(e3) {
  if (!e3)
    return this;
  let t2 = this.list.find((t3, r2) => {
    let a2 = this.buildFrom([t3]);
    return a2.from = null, e3(a2, r2);
  });
  return t2 ? this.buildFrom([t2]) : void 0;
}, some: function(e3) {
  return e3 ? this.list.some((t2, r2) => {
    let a2 = this.buildFrom([t2]);
    return a2.from = null, e3(a2, r2);
  }) : this;
}, random: function(e3) {
  if (!this.found)
    return this;
  let t2 = Math.floor(Math.random() * this.list.length);
  if (e3 === void 0) {
    let e4 = [this.list[t2]];
    return this.buildFrom(e4);
  }
  return t2 + e3 > this.length && (t2 = this.length - e3, t2 = t2 < 0 ? 0 : t2), this.slice(t2, t2 + e3);
} };
var ra = {};
var aa = function(e3, t2, r2) {
  let a2 = function(e4, t3 = []) {
    let r3 = {};
    return e4.forEach((e5, a3) => {
      let n3 = true;
      t3[a3] !== void 0 && (n3 = t3[a3]);
      let i2 = function(e6) {
        return e6.split(/[ -]/g);
      }(e5 = (e5 = (e5 || "").toLowerCase()).replace(/[,;.!?]+$/, "")).map((e6) => e6.trim());
      r3[i2[0]] = r3[i2[0]] || {}, i2.length === 1 ? r3[i2[0]].value = n3 : (r3[i2[0]].more = r3[i2[0]].more || [], r3[i2[0]].more.push({ rest: i2.slice(1), value: n3 }));
    }), r3;
  }(e3, t2), n2 = [];
  for (let e4 = 0; e4 < r2.list.length; e4++) {
    const t3 = r2.list[e4];
    let i2 = t3.terms().map((e5) => e5.reduced);
    for (let e5 = 0; e5 < i2.length; e5++)
      a2[i2[e5]] !== void 0 && (a2[i2[e5]].more !== void 0 && a2[i2[e5]].more.forEach((r3) => {
        if (i2[e5 + r3.rest.length] === void 0)
          return;
        r3.rest.every((t4, r4) => t4 === i2[e5 + r4 + 1]) === true && n2.push({ id: t3.terms()[e5].id, value: r3.value, length: r3.rest.length + 1 });
      }), a2[i2[e5]].value !== void 0 && n2.push({ id: t3.terms()[e5].id, value: a2[i2[e5]].value, length: 1 }));
  }
  return n2;
};
!function(e3) {
  const t2 = aa;
  e3.lookup = function(e4) {
    let r2 = [], a2 = (n2 = e4) && Object.prototype.toString.call(n2) === "[object Object]";
    var n2;
    a2 === true && (e4 = Object.keys(e4).map((t3) => (r2.push(e4[t3]), t3))), typeof e4 == "string" && (e4 = [e4]), this._cache.set !== true && this.cache();
    let i2 = t2(e4, r2, this), o2 = this.list[0];
    if (a2 === true) {
      let e5 = {};
      return i2.forEach((t3) => {
        e5[t3.value] = e5[t3.value] || [], e5[t3.value].push(o2.buildFrom(t3.id, t3.length));
      }), Object.keys(e5).forEach((t3) => {
        e5[t3] = this.buildFrom(e5[t3]);
      }), e5;
    }
    return i2 = i2.map((e5) => o2.buildFrom(e5.id, e5.length)), this.buildFrom(i2);
  }, e3.lookUp = e3.lookup;
}(ra);
var na = { cache: function(e3) {
  e3 = e3 || {};
  let t2 = {}, r2 = {};
  return this._cache.words = t2, this._cache.tags = r2, this._cache.set = true, this.list.forEach((a2, n2) => {
    a2.cache = a2.cache || {}, a2.terms().forEach((a3) => {
      t2[a3.reduced] && !t2.hasOwnProperty(a3.reduced) || (t2[a3.reduced] = t2[a3.reduced] || [], t2[a3.reduced].push(n2), Object.keys(a3.tags).forEach((e4) => {
        r2[e4] = r2[e4] || [], r2[e4].push(n2);
      }), e3.root && (a3.setRoot(this.world), t2[a3.root] = [n2]));
    });
  }), this;
}, uncache: function() {
  return this._cache = {}, this.list.forEach((e3) => {
    e3.cache = {};
  }), this.parents().forEach((e3) => {
    e3._cache = {}, e3.list.forEach((e4) => {
      e4.cache = {};
    });
  }), this;
} };
var ia = {};
var oa = xt;
ia.replaceWith = function(e3, t2 = {}) {
  return e3 ? (t2 === true && (t2 = { keepTags: true }), t2 === false && (t2 = { keepTags: false }), t2 = t2 || {}, this.uncache(), this.list.forEach((r2) => {
    let a2, n2 = e3;
    if (typeof e3 == "function" && (n2 = e3(r2)), n2 && typeof n2 == "object" && n2.isA === "Doc")
      a2 = n2.list, this.pool().merge(n2.pool());
    else {
      if (typeof n2 != "string")
        return;
      {
        t2.keepCase !== false && r2.terms(0).isTitleCase() && (n2 = (i2 = n2).charAt(0).toUpperCase() + i2.substr(1)), a2 = oa(n2, this.world, this.pool());
        let e4 = this.buildFrom(a2);
        e4.tagger(), a2 = e4.list;
      }
    }
    var i2;
    if (t2.keepTags === true) {
      let e4 = r2.json({ terms: { tags: true } }).terms;
      a2[0].terms().forEach((t3, r3) => {
        e4[r3] && t3.tagSafe(e4[r3].tags, "keptTag", this.world);
      });
    }
    r2.replace(a2[0], this);
  }), this) : this.delete();
}, ia.replace = function(e3, t2, r2) {
  return t2 === void 0 ? this.replaceWith(e3, r2) : (this.match(e3).replaceWith(t2, r2), this);
};
var sa = {};
!function(e3) {
  const t2 = xt, r2 = function(e4) {
    return e4 && Object.prototype.toString.call(e4) === "[object Object]";
  }, a2 = function(e4, r3) {
    let a3 = t2(e4, r3.world)[0], n2 = r3.buildFrom([a3]);
    return n2.tagger(), r3.list = n2.list, r3;
  };
  e3.append = function(e4 = "") {
    return e4 ? this.found ? (this.uncache(), this.list.forEach((a3) => {
      let n2;
      r2(e4) && e4.isA === "Doc" ? n2 = e4.list[0].clone() : typeof e4 == "string" && (n2 = t2(e4, this.world, this.pool())[0]), this.buildFrom([n2]).tagger(), a3.append(n2, this);
    }), this) : a2(e4, this) : this;
  }, e3.insertAfter = e3.append, e3.insertAt = e3.append, e3.prepend = function(e4) {
    return e4 ? this.found ? (this.uncache(), this.list.forEach((a3) => {
      let n2;
      r2(e4) && e4.isA === "Doc" ? n2 = e4.list[0].clone() : typeof e4 == "string" && (n2 = t2(e4, this.world, this.pool())[0]), this.buildFrom([n2]).tagger(), a3.prepend(n2, this);
    }), this) : a2(e4, this) : this;
  }, e3.insertBefore = e3.prepend, e3.concat = function() {
    this.uncache();
    let e4 = this.list.slice(0);
    for (let r3 = 0; r3 < arguments.length; r3++) {
      let a3 = arguments[r3];
      if (typeof a3 == "string") {
        let r4 = t2(a3, this.world);
        e4 = e4.concat(r4);
      } else
        a3.isA === "Doc" ? e4 = e4.concat(a3.list) : a3.isA === "Phrase" && e4.push(a3);
    }
    return this.buildFrom(e4);
  }, e3.delete = function(e4) {
    this.uncache();
    let t3 = this;
    return e4 && (t3 = this.match(e4)), t3.list.forEach((e5) => e5.delete(this)), this;
  }, e3.remove = e3.delete;
}(sa);
var la = {};
var ua = { clean: true, reduced: true, root: true };
la.text = function(e3) {
  e3 = e3 || {};
  let t2 = false;
  this.parents().length === 0 && (t2 = true), (e3 === "root" || typeof e3 == "object" && e3.root) && this.list.forEach((e4) => {
    e4.terms().forEach((e5) => {
      e5.root === null && e5.setRoot(this.world);
    });
  });
  let r2 = this.list.reduce((r3, a2, n2) => {
    const i2 = !t2 && n2 === 0, o2 = !t2 && n2 === this.list.length - 1;
    return r3 + a2.text(e3, i2, o2);
  }, "");
  return ua[e3] !== true && e3.reduced !== true && e3.clean !== true && e3.root !== true || (r2 = r2.trim()), r2;
};
var ca = {};
var ha = function(e3, t2, r2) {
  let a2 = function(e4) {
    let t3 = 0, r3 = 0, a3 = {};
    return e4.termList().forEach((e5) => {
      a3[e5.id] = { index: r3, start: t3 + e5.pre.length, length: e5.text.length }, t3 += e5.pre.length + e5.text.length + e5.post.length, r3 += 1;
    }), a3;
  }(e3.all());
  (r2.terms.index || r2.index) && t2.forEach((e4) => {
    e4.terms.forEach((e5) => {
      e5.index = a2[e5.id].index;
    }), e4.index = e4.terms[0].index;
  }), (r2.terms.offset || r2.offset) && t2.forEach((e4) => {
    e4.terms.forEach((e5) => {
      e5.offset = a2[e5.id] || {};
    }), e4.offset = { index: e4.terms[0].offset.index, start: e4.terms[0].offset.start - e4.text.indexOf(e4.terms[0].text), length: e4.text.length };
  });
};
!function(e3) {
  const t2 = ha, r2 = { text: true, terms: true, trim: true };
  e3.json = function(e4 = {}) {
    if (typeof e4 == "number" && this.list[e4])
      return this.list[e4].json(r2);
    (e4 = function(e5) {
      return (e5 = Object.assign({}, r2, e5)).unique && (e5.reduced = true), e5.offset && (e5.text = true, e5.terms && e5.terms !== true || (e5.terms = {}), e5.terms.offset = true), (e5.index || e5.terms.index) && (e5.terms = e5.terms === true ? {} : e5.terms, e5.terms.id = true), e5;
    }(e4)).root === true && this.list.forEach((e5) => {
      e5.terms().forEach((e6) => {
        e6.root === null && e6.setRoot(this.world);
      });
    });
    let a2 = this.list.map((t3) => t3.json(e4, this.world));
    if ((e4.terms.offset || e4.offset || e4.terms.index || e4.index) && t2(this, a2, e4), e4.frequency || e4.freq || e4.count) {
      let e5 = {};
      this.list.forEach((t3) => {
        let r3 = t3.text("reduced");
        e5[r3] = e5[r3] || 0, e5[r3] += 1;
      }), this.list.forEach((t3, r3) => {
        a2[r3].count = e5[t3.text("reduced")];
      });
    }
    if (e4.unique) {
      let e5 = {};
      a2 = a2.filter((t3) => e5[t3.reduced] !== true && (e5[t3.reduced] = true, true));
    }
    return a2;
  }, e3.data = e3.json;
}(ca);
var da = {};
var ga = { exports: {} };
!function(e3) {
  const t2 = "[0m", r2 = function(e4, t3) {
    for (e4 = e4.toString(); e4.length < t3; )
      e4 += " ";
    return e4;
  };
  const a2 = { green: "#7f9c6c", red: "#914045", blue: "#6699cc", magenta: "#6D5685", cyan: "#2D85A8", yellow: "#e6d7b3", black: "#303b50" }, n2 = { green: function(e4) {
    return "[32m" + e4 + t2;
  }, red: function(e4) {
    return "[31m" + e4 + t2;
  }, blue: function(e4) {
    return "[34m" + e4 + t2;
  }, magenta: function(e4) {
    return "[35m" + e4 + t2;
  }, cyan: function(e4) {
    return "[36m" + e4 + t2;
  }, yellow: function(e4) {
    return "[33m" + e4 + t2;
  }, black: function(e4) {
    return "[30m" + e4 + t2;
  } };
  ga.exports = function(e4) {
    return typeof window != "undefined" && window.document ? (function(e5) {
      let t3 = e5.world.tags;
      e5.list.forEach((e6) => {
        console.log('\n%c"' + e6.text() + '"', "color: #e6d7b3;"), e6.terms().forEach((e7) => {
          let n3 = Object.keys(e7.tags), i2 = e7.text || "-";
          e7.implicit && (i2 = "[" + e7.implicit + "]");
          let o2 = "'" + i2 + "'";
          o2 = r2(o2, 8);
          let s2 = n3.find((e8) => t3[e8] && t3[e8].color), l2 = "steelblue";
          t3[s2] && (l2 = t3[s2].color, l2 = a2[l2]), console.log(`   ${o2}  -  %c${n3.join(", ")}`, `color: ${l2 || "steelblue"};`);
        });
      });
    }(e4), e4) : (console.log(n2.blue("=====")), e4.list.forEach((t3) => {
      console.log(n2.blue("  -----")), t3.terms().forEach((t4) => {
        let a3 = Object.keys(t4.tags), i2 = t4.text || "-";
        t4.implicit && (i2 = "[" + t4.implicit + "]"), i2 = n2.yellow(i2);
        let o2 = "'" + i2 + "'";
        o2 = r2(o2, 18);
        let s2 = n2.blue("  \uFF5C ") + o2 + "  - " + function(e5, t5) {
          return (e5 = e5.map((e6) => {
            if (!t5.tags.hasOwnProperty(e6))
              return e6;
            const r3 = t5.tags[e6].color || "blue";
            return n2[r3](e6);
          })).join(", ");
        }(a3, e4.world);
        console.log(s2);
      });
    }), console.log(""), e4);
  };
}();
var pa = ga.exports;
var ma = function(e3) {
  let t2 = e3.json({ text: false, terms: false, reduced: true }), r2 = {};
  t2.forEach((e4) => {
    r2[e4.reduced] || (e4.count = 0, r2[e4.reduced] = e4), r2[e4.reduced].count += 1;
  });
  let a2 = Object.keys(r2).map((e4) => r2[e4]);
  return a2.sort((e4, t3) => e4.count > t3.count ? -1 : e4.count < t3.count ? 1 : 0), a2;
};
da.debug = function() {
  return pa(this), this;
}, da.out = function(e3) {
  if (e3 === "text")
    return this.text();
  if (e3 === "normal")
    return this.text("normal");
  if (e3 === "json")
    return this.json();
  if (e3 === "offset" || e3 === "offsets")
    return this.json({ offset: true });
  if (e3 === "array")
    return this.json({ terms: false }).map((e4) => e4.text).filter((e4) => e4);
  if (e3 === "freq" || e3 === "frequency")
    return ma(this);
  if (e3 === "terms") {
    let e4 = [];
    return this.json({ text: false, terms: { text: true } }).forEach((t2) => {
      let r2 = t2.terms.map((e5) => e5.text);
      r2 = r2.filter((e5) => e5), e4 = e4.concat(r2);
    }), e4;
  }
  return e3 === "tags" ? this.list.map((e4) => e4.terms().reduce((e5, t2) => (e5[t2.clean || t2.implicit] = Object.keys(t2.tags), e5), {})) : e3 === "debug" ? (pa(this), this) : this.text();
};
var fa = {};
var ba = { alpha: (e3, t2) => {
  let r2 = e3.text("clean"), a2 = t2.text("clean");
  return r2 < a2 ? -1 : r2 > a2 ? 1 : 0;
}, length: (e3, t2) => {
  let r2 = e3.text().trim().length, a2 = t2.text().trim().length;
  return r2 < a2 ? 1 : r2 > a2 ? -1 : 0;
}, wordCount: (e3, t2) => {
  let r2 = e3.wordCount(), a2 = t2.wordCount();
  return r2 < a2 ? 1 : r2 > a2 ? -1 : 0;
} };
ba.alphabetical = ba.alpha, ba.wordcount = ba.wordCount;
var ya = { index: true, sequence: true, seq: true, sequential: true, chron: true, chronological: true };
fa.sort = function(e3) {
  return (e3 = e3 || "alpha") === "freq" || e3 === "frequency" || e3 === "topk" ? function(e4) {
    let t2 = {};
    const r2 = { case: true, punctuation: false, whitespace: true, unicode: true };
    return e4.list.forEach((e5) => {
      let a2 = e5.text(r2);
      t2[a2] = t2[a2] || 0, t2[a2] += 1;
    }), e4.list.sort((e5, a2) => {
      let n2 = t2[e5.text(r2)], i2 = t2[a2.text(r2)];
      return n2 < i2 ? 1 : n2 > i2 ? -1 : 0;
    }), e4;
  }(this) : ya.hasOwnProperty(e3) ? function(e4) {
    let t2 = {};
    return e4.json({ terms: { offset: true } }).forEach((e5) => {
      t2[e5.terms[0].id] = e5.terms[0].offset.start;
    }), e4.list = e4.list.sort((e5, r2) => t2[e5.start] > t2[r2.start] ? 1 : t2[e5.start] < t2[r2.start] ? -1 : 0), e4;
  }(this) : typeof (e3 = ba[e3] || e3) == "function" ? (this.list = this.list.sort(e3), this) : this;
}, fa.reverse = function() {
  let e3 = [].concat(this.list);
  return e3 = e3.reverse(), this.buildFrom(e3);
}, fa.unique = function() {
  let e3 = [].concat(this.list), t2 = {};
  return e3 = e3.filter((e4) => {
    let r2 = e4.text("reduced").trim() || e4.text("implicit").trim();
    return t2.hasOwnProperty(r2) !== true && (t2[r2] = true, true);
  }), this.buildFrom(e3);
};
var va = {};
var wa = n;
var ka = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g;
var Aa = /['‘’“”"′″‴]+/g;
var Da = { whitespace: function(e3) {
  let t2 = e3.list.map((e4) => e4.terms());
  t2.forEach((e4, r2) => {
    e4.forEach((a2, n2) => {
      a2.hasDash() !== true ? (a2.pre = a2.pre.replace(/\s/g, ""), a2.post = a2.post.replace(/\s/g, ""), (e4.length - 1 !== n2 || t2[r2 + 1]) && (a2.implicit && Boolean(a2.text) === true || a2.hasHyphen() !== true && (a2.post += " "))) : a2.post = " - ";
    });
  });
}, punctuation: function(e3) {
  e3.forEach((e4) => {
    e4.hasHyphen() === true && (e4.post = " "), e4.pre = e4.pre.replace(ka, ""), e4.post = e4.post.replace(ka, ""), e4.post = e4.post.replace(/\.\.\./, ""), /!/.test(e4.post) === true && (e4.post = e4.post.replace(/!/g, ""), e4.post = "!" + e4.post), /\?/.test(e4.post) === true && (e4.post = e4.post.replace(/[\?!]*/, ""), e4.post = "?" + e4.post);
  });
}, unicode: function(e3) {
  e3.forEach((e4) => {
    e4.isImplicit() !== true && (e4.text = wa(e4.text));
  });
}, quotations: function(e3) {
  e3.forEach((e4) => {
    e4.post = e4.post.replace(Aa, ""), e4.pre = e4.pre.replace(Aa, "");
  });
}, adverbs: function(e3) {
  e3.match("#Adverb").not("(not|nary|seldom|never|barely|almost|basically|so)").remove();
}, abbreviations: function(e3) {
  e3.list.forEach((e4) => {
    let t2 = e4.terms();
    t2.forEach((e5, r2) => {
      e5.tags.Abbreviation === true && t2[r2 + 1] && (e5.post = e5.post.replace(/^\./, ""));
    });
  });
} };
var $a = { whitespace: true, unicode: true, punctuation: true, emoji: true, acronyms: true, abbreviations: true, case: false, contractions: false, parentheses: false, quotations: false, adverbs: false, possessives: false, verbs: false, nouns: false, honorifics: false };
var Pa = { light: {}, medium: { case: true, contractions: true, parentheses: true, quotations: true, adverbs: true } };
Pa.heavy = Object.assign({}, Pa.medium, { possessives: true, verbs: true, nouns: true, honorifics: true }), va.normalize = function(e3) {
  typeof (e3 = e3 || {}) == "string" && (e3 = Pa[e3] || {}), e3 = Object.assign({}, $a, e3), this.uncache();
  let t2 = this.termList();
  return e3.case && this.toLowerCase(), e3.whitespace && Da.whitespace(this), e3.unicode && Da.unicode(t2), e3.punctuation && Da.punctuation(t2), e3.emoji && this.remove("(#Emoji|#Emoticon)"), e3.acronyms && this.acronyms().strip(), e3.abbreviations && Da.abbreviations(this), (e3.contraction || e3.contractions) && this.contractions().expand(), e3.parentheses && this.parentheses().unwrap(), (e3.quotations || e3.quotes) && Da.quotations(t2), e3.adverbs && Da.adverbs(this), (e3.possessive || e3.possessives) && this.possessives().strip(), e3.verbs && this.verbs().toInfinitive(), (e3.nouns || e3.plurals) && this.nouns().toSingular(), e3.honorifics && this.remove("#Honorific"), this;
};
var Ea = {};
!function(e3) {
  const t2 = _e;
  e3.splitOn = function(e4) {
    if (!e4) {
      return this.parent().splitOn(this);
    }
    let r2 = t2(e4), a2 = [];
    return this.list.forEach((e5) => {
      let t3 = e5.match(r2);
      if (t3.length === 0)
        return void a2.push(e5);
      let n2 = e5;
      t3.forEach((e6) => {
        let t4 = n2.splitOn(e6);
        t4.before && a2.push(t4.before), t4.match && a2.push(t4.match), n2 = t4.after;
      }), n2 && a2.push(n2);
    }), this.buildFrom(a2);
  }, e3.splitAfter = function(e4) {
    if (!e4) {
      return this.parent().splitAfter(this);
    }
    let r2 = t2(e4), a2 = [];
    return this.list.forEach((e5) => {
      let t3 = e5.match(r2);
      if (t3.length === 0)
        return void a2.push(e5);
      let n2 = e5;
      t3.forEach((e6) => {
        let t4 = n2.splitOn(e6);
        t4.before && t4.match ? (t4.before.length += t4.match.length, a2.push(t4.before)) : t4.match && a2.push(t4.match), n2 = t4.after;
      }), n2 && a2.push(n2);
    }), this.buildFrom(a2);
  }, e3.split = e3.splitAfter, e3.splitBefore = function(e4) {
    if (!e4) {
      return this.parent().splitBefore(this);
    }
    let r2 = t2(e4), a2 = [];
    return this.list.forEach((e5) => {
      let t3 = e5.match(r2);
      if (t3.length === 0)
        return void a2.push(e5);
      let n2 = e5;
      t3.forEach((e6) => {
        let t4 = n2.splitOn(e6);
        t4.before && a2.push(t4.before), t4.match && t4.after && (t4.match.length += t4.after.length), n2 = t4.match;
      }), n2 && a2.push(n2);
    }), this.buildFrom(a2);
  }, e3.segment = function(e4, t3) {
    e4 = e4 || {}, t3 = t3 || { text: true };
    let r2 = this, a2 = Object.keys(e4);
    return a2.forEach((e5) => {
      r2 = r2.splitOn(e5);
    }), r2.list.forEach((t4) => {
      for (let r3 = 0; r3 < a2.length; r3 += 1)
        if (t4.has(a2[r3]))
          return void (t4.segment = e4[a2[r3]]);
    }), r2.list.map((e5) => {
      let r3 = e5.json(t3);
      return r3.segment = e5.segment || null, r3;
    });
  };
}(Ea);
var Ha = {};
var ja = function(e3, t2) {
  let r2 = e3.world;
  return e3.list.forEach((e4) => {
    e4.terms().forEach((e5) => e5[t2](r2));
  }), e3;
};
Ha.toLowerCase = function() {
  return ja(this, "toLowerCase");
}, Ha.toUpperCase = function() {
  return ja(this, "toUpperCase");
}, Ha.toTitleCase = function() {
  return ja(this, "toTitleCase");
}, Ha.toCamelCase = function() {
  return this.list.forEach((e3) => {
    let t2 = e3.terms();
    t2.forEach((e4, r2) => {
      r2 !== 0 && e4.toTitleCase(), r2 !== t2.length - 1 && (e4.post = "");
    });
  }), this;
};
var Na = {};
!function(e3) {
  e3.pre = function(e4, t2) {
    return e4 === void 0 ? this.list[0].terms(0).pre : (this.list.forEach((r2) => {
      let a2 = r2.terms(0);
      t2 === true ? a2.pre += e4 : a2.pre = e4;
    }), this);
  }, e3.post = function(e4, t2) {
    return e4 === void 0 ? this.list.map((e5) => {
      let t3 = e5.terms();
      return t3[t3.length - 1].post;
    }) : (this.list.forEach((r2) => {
      let a2 = r2.terms(), n2 = a2[a2.length - 1];
      t2 === true ? n2.post += e4 : n2.post = e4;
    }), this);
  }, e3.trim = function() {
    return this.list = this.list.map((e4) => e4.trim()), this;
  }, e3.hyphenate = function() {
    return this.list.forEach((e4) => {
      let t2 = e4.terms();
      t2.forEach((e5, r2) => {
        r2 !== 0 && (e5.pre = ""), t2[r2 + 1] && (e5.post = "-");
      });
    }), this;
  }, e3.dehyphenate = function() {
    const e4 = /(-|–|—)/;
    return this.list.forEach((t2) => {
      t2.terms().forEach((t3) => {
        e4.test(t3.post) && (t3.post = " ");
      });
    }), this;
  }, e3.deHyphenate = e3.dehyphenate, e3.toQuotations = function(e4, t2) {
    return e4 = e4 || '"', t2 = t2 || '"', this.list.forEach((r2) => {
      let a2 = r2.terms();
      a2[0].pre = e4 + a2[0].pre;
      let n2 = a2[a2.length - 1];
      n2.post = t2 + n2.post;
    }), this;
  }, e3.toQuotation = e3.toQuotations, e3.toParentheses = function(e4, t2) {
    return e4 = e4 || "(", t2 = t2 || ")", this.list.forEach((r2) => {
      let a2 = r2.terms();
      a2[0].pre = e4 + a2[0].pre;
      let n2 = a2[a2.length - 1];
      n2.post = t2 + n2.post;
    }), this;
  };
}(Na);
var xa = { join: function(e3) {
  this.uncache();
  let t2 = this.list[0], r2 = t2.length, a2 = {};
  for (let r3 = 1; r3 < this.list.length; r3++) {
    const n3 = this.list[r3];
    a2[n3.start] = true;
    let i2 = t2.lastTerm();
    e3 && (i2.post += e3), i2.next = n3.start, n3.terms(0).prev = i2.id, t2.length += n3.length, t2.cache = {};
  }
  let n2 = t2.length - r2;
  return this.parents().forEach((e4) => {
    e4.list.forEach((e5) => {
      let r3 = e5.terms();
      for (let a3 = 0; a3 < r3.length; a3++)
        if (r3[a3].id === t2.start) {
          e5.length += n2;
          break;
        }
      e5.cache = {};
    }), e4.list = e4.list.filter((e5) => a2[e5.start] !== true);
  }), this.buildFrom([t2]);
} };
var Fa = {};
var Ca = /[,\)"';:\-–—\.…]/;
var Ba = function(e3, t2) {
  if (!e3.found)
    return;
  let r2 = e3.termList();
  for (let e4 = 0; e4 < r2.length - 1; e4++) {
    const t3 = r2[e4];
    if (Ca.test(t3.post))
      return;
  }
  r2.forEach((e4) => {
    e4.implicit = e4.clean;
  }), r2[0].text += t2, r2.slice(1).forEach((e4) => {
    e4.text = "";
  });
  for (let e4 = 0; e4 < r2.length - 1; e4++) {
    const t3 = r2[e4];
    t3.post = t3.post.replace(/ /, "");
  }
};
Fa.contract = function() {
  let e3 = this.not("@hasContraction"), t2 = e3.match("(we|they|you) are");
  return Ba(t2, "'re"), t2 = e3.match("(he|she|they|it|we|you) will"), Ba(t2, "'ll"), t2 = e3.match("(he|she|they|it|we) is"), Ba(t2, "'s"), t2 = e3.match("#Person is"), Ba(t2, "'s"), t2 = e3.match("#Person would"), Ba(t2, "'d"), t2 = e3.match("(is|was|had|would|should|could|do|does|have|has|can) not"), Ba(t2, "n't"), t2 = e3.match("(i|we|they) have"), Ba(t2, "'ve"), t2 = e3.match("(would|should|could) have"), Ba(t2, "'ve"), t2 = e3.match("i am"), Ba(t2, "'m"), t2 = e3.match("going to"), this;
};
var Ga = Object.assign({}, Ur, Qr, Zr, Yr, ta, ra, na, ia, sa, la, ca, da, fa, va, Ea, Ha, Na, xa, Fa);
var za = {};
[["terms", "."], ["hyphenated", "@hasHyphen ."], ["adjectives", "#Adjective"], ["hashTags", "#HashTag"], ["emails", "#Email"], ["emoji", "#Emoji"], ["emoticons", "#Emoticon"], ["atMentions", "#AtMention"], ["urls", "#Url"], ["adverbs", "#Adverb"], ["pronouns", "#Pronoun"], ["conjunctions", "#Conjunction"], ["prepositions", "#Preposition"]].forEach((e3) => {
  za[e3[0]] = function(t2) {
    let r2 = this.match(e3[1]);
    return typeof t2 == "number" && (r2 = r2.get(t2)), r2;
  };
}), za.emojis = za.emoji, za.atmentions = za.atMentions, za.words = za.terms, za.phoneNumbers = function(e3) {
  let t2 = this.splitAfter("@hasComma");
  return t2 = t2.match("#PhoneNumber+"), typeof e3 == "number" && (t2 = t2.get(e3)), t2;
}, za.money = function(e3) {
  let t2 = this.match("#Money #Currency?");
  return typeof e3 == "number" && (t2 = t2.get(e3)), t2;
}, za.places = function(e3) {
  let t2 = this.match("(#City && @hasComma) (#Region|#Country)"), r2 = this.not(t2).splitAfter("@hasComma");
  return r2 = r2.concat(t2), r2.sort("index"), r2 = r2.match("#Place+"), typeof e3 == "number" && (r2 = r2.get(e3)), r2;
}, za.organizations = function(e3) {
  let t2 = this.clauses();
  return t2 = t2.match("#Organization+"), typeof e3 == "number" && (t2 = t2.get(e3)), t2;
}, za.entities = function(e3) {
  let t2 = this.clauses(), r2 = t2.people();
  r2 = r2.concat(t2.places()), r2 = r2.concat(t2.organizations());
  return r2 = r2.not(["someone", "man", "woman", "mother", "brother", "sister", "father"]), r2.sort("sequence"), typeof e3 == "number" && (r2 = r2.get(e3)), r2;
}, za.things = za.entities, za.topics = za.entities;
var Ia = za;
var Oa = /^(under|over)-?.{3}/;
var Ta = function(e3, t2, r2) {
  let a2 = r2.words, n2 = e3[t2].reduced + " " + e3[t2 + 1].reduced;
  return a2[n2] !== void 0 && a2.hasOwnProperty(n2) === true ? (e3[t2].tag(a2[n2], "lexicon-two", r2), e3[t2 + 1].tag(a2[n2], "lexicon-two", r2), 1) : t2 + 2 < e3.length && (n2 += " " + e3[t2 + 2].reduced, a2[n2] !== void 0 && a2.hasOwnProperty(n2) === true) ? (e3[t2].tag(a2[n2], "lexicon-three", r2), e3[t2 + 1].tag(a2[n2], "lexicon-three", r2), e3[t2 + 2].tag(a2[n2], "lexicon-three", r2), 2) : t2 + 3 < e3.length && (n2 += " " + e3[t2 + 3].reduced, a2[n2] !== void 0 && a2.hasOwnProperty(n2) === true) ? (e3[t2].tag(a2[n2], "lexicon-four", r2), e3[t2 + 1].tag(a2[n2], "lexicon-four", r2), e3[t2 + 2].tag(a2[n2], "lexicon-four", r2), e3[t2 + 3].tag(a2[n2], "lexicon-four", r2), 3) : 0;
};
var Va = function(e3, t2) {
  let r2 = t2.words, a2 = t2.hasCompound;
  for (let n2 = 0; n2 < e3.length; n2 += 1) {
    let i2 = e3[n2].clean;
    if (a2[i2] === true && n2 + 1 < e3.length) {
      let r3 = Ta(e3, n2, t2);
      if (r3 > 0) {
        n2 += r3;
        continue;
      }
    }
    if (r2[i2] === void 0 || r2.hasOwnProperty(i2) !== true)
      if (i2 === e3[n2].reduced || r2.hasOwnProperty(e3[n2].reduced) !== true) {
        if (Oa.test(i2) === true) {
          let a3 = i2.replace(/^(under|over)-?/, "");
          r2.hasOwnProperty(a3) === true && e3[n2].tag(r2[a3], "noprefix-lexicon", t2);
        }
      } else
        e3[n2].tag(r2[e3[n2].reduced], "lexicon", t2);
    else
      e3[n2].tag(r2[i2], "lexicon", t2);
  }
  return e3;
};
var Ma = /[\'‘’‛‵′`´]$/;
var Ja = /^(m|k|cm|km|m)\/(s|h|hr)$/;
var La = [[/^[\w\.]+@[\w\.]+\.[a-z]{2,3}$/, "Email"], [/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, "HashTag"], [/^@1?[0-9](am|pm)$/i, "Time"], [/^@1?[0-9]:[0-9]{2}(am|pm)?$/i, "Time"], [/^@\w{2,}$/, "AtMention"], [/^(https?:\/\/|www\.)+\w+\.[a-z]{2,3}/, "Url"], [/^[a-z0-9./].+\.(com|net|gov|org|ly|edu|info|biz|dev|ru|jp|de|in|uk|br|io|ai)/, "Url"], [/^'[0-9]{2}$/, "Year"], [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, "Time"], [/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/i, "Time"], [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/i, "Time"], [/^[PMCE]ST$/, "Time"], [/^utc ?[+-]?[0-9]+?$/, "Time"], [/^[a-z0-9]*? o\'?clock$/, "Time"], [/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/i, "Date"], [/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, "Date"], [/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/, "Date"], [/^[0-9]{1,4}-[a-z]{2,9}-[0-9]{1,4}$/i, "Date"], [/^gmt[+-][0-9][0-9]?$/i, "Timezone"], [/^utc[+-][0-9][0-9]?$/i, "Timezone"], [/^ma?c\'.*/, "LastName"], [/^o\'[drlkn].*/, "LastName"], [/^ma?cd[aeiou]/, "LastName"], [/^(lol)+[sz]$/, "Expression"], [/^woo+a*?h?$/, "Expression"], [/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, "Verb"], [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, "Date"], [/^[0-9]{3}-[0-9]{4}$/, "PhoneNumber"], [/^(\+?[0-9][ -])?[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, "PhoneNumber"], [/^[-+]?[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6][-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(k|m|b|bn)?\+?$/, ["Money", "Value"]], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]\+?$/, ["Money", "Value"]], [/^[-+]?[\$£]?[0-9]([0-9,.])+?(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i, ["Money", "Value"]], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\+?$/, ["Cardinal", "NumericValue"]], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(st|nd|rd|r?th)$/, ["Ordinal", "NumericValue"]], [/^\.[0-9]+\+?$/, ["Cardinal", "NumericValue"]], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?%\+?$/, ["Percent", "Cardinal", "NumericValue"]], [/^\.[0-9]+%$/, ["Percent", "Cardinal", "NumericValue"]], [/^[0-9]{1,4}\/[0-9]{1,4}(st|nd|rd|th)?s?$/, ["Fraction", "NumericValue"]], [/^[0-9.]{1,3}[a-z]{0,2}[-–—][0-9]{1,3}[a-z]{0,2}$/, ["Value", "NumberRange"]], [/^[0-9][0-9]?(:[0-9][0-9])?(am|pm)? ?[-–—] ?[0-9][0-9]?(:[0-9][0-9])?(am|pm)?$/, ["Time", "NumberRange"]], [/^[0-9.]+([a-z]{1,4})$/, "Value"]];
var Sa = /^[IVXLCDM]{2,}$/;
var _a = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
var Ka = "Adjective";
var qa = "Infinitive";
var Wa = "PresentTense";
var Ra = "Singular";
var Ua = "PastTense";
var Qa = "Expression";
var Za = "Adjective";
var Xa = "Infinitive";
var Ya = "PresentTense";
var en = "Singular";
var tn = "PastTense";
var rn = "Adverb";
var an = "Plural";
var nn = "Verb";
var on = "LastName";
var sn = { a: [[/.[aeiou]na$/, "Noun"], [/.[oau][wvl]ska$/, "LastName"], [/.[^aeiou]ica$/, Ra], [/^([hyj]a)+$/, Qa]], c: [[/.[^aeiou]ic$/, Ka]], d: [[/[aeiou](pp|ll|ss|ff|gg|tt|rr|bb|nn|mm)ed$/, Ua], [/.[aeo]{2}[bdgmnprvz]ed$/, Ua], [/.[aeiou][sg]hed$/, Ua], [/.[aeiou]red$/, Ua], [/.[aeiou]r?ried$/, Ua], [/.[bcdgtr]led$/, Ua], [/.[aoui]f?led$/, Ua], [/.[iao]sed$/, Ua], [/[aeiou]n?[cs]ed$/, Ua], [/[aeiou][rl]?[mnf]ed$/, Ua], [/[aeiou][ns]?c?ked$/, Ua], [/[aeiou][nl]?ged$/, Ua], [/.[tdbwxz]ed$/, Ua], [/[^aeiou][aeiou][tvx]ed$/, Ua], [/.[cdlmnprstv]ied$/, Ua], [/[^aeiou]ard$/, Ra], [/[aeiou][^aeiou]id$/, Ka], [/.[vrl]id$/, Ka]], e: [[/.[lnr]ize$/, qa], [/.[^aeiou]ise$/, qa], [/.[aeiou]te$/, qa], [/.[^aeiou][ai]ble$/, Ka], [/.[^aeiou]eable$/, Ka], [/.[ts]ive$/, Ka], [/[a-z]-like$/, Ka]], h: [[/.[^aeiouf]ish$/, Ka], [/.v[iy]ch$/, "LastName"], [/^ug?h+$/, Qa], [/^uh[ -]?oh$/, Qa], [/[a-z]-ish$/, Ka]], i: [[/.[oau][wvl]ski$/, "LastName"]], k: [[/^(k){2}$/, Qa]], l: [[/.[gl]ial$/, Ka], [/.[^aeiou]ful$/, Ka], [/.[nrtumcd]al$/, Ka], [/.[^aeiou][ei]al$/, Ka]], m: [[/.[^aeiou]ium$/, Ra], [/[^aeiou]ism$/, Ra], [/^h*u*m+$/, Qa], [/^\d+ ?[ap]m$/, "Date"]], n: [[/.[lsrnpb]ian$/, Ka], [/[^aeiou]ician$/, "Actor"], [/[aeiou][ktrp]in$/, "Gerund"]], o: [[/^no+$/, Qa], [/^(yo)+$/, Qa], [/^woo+[pt]?$/, Qa]], r: [[/.[bdfklmst]ler$/, "Noun"], [/[aeiou][pns]er$/, Ra], [/[^i]fer$/, qa], [/.[^aeiou][ao]pher$/, "Actor"], [/.[lk]er$/, "Noun"], [/.ier$/, "Comparative"]], t: [[/.[di]est$/, "Superlative"], [/.[icldtgrv]ent$/, Ka], [/[aeiou].*ist$/, Ka], [/^[a-z]et$/, "Verb"]], s: [[/.[^aeiou]ises$/, Wa], [/.[rln]ates$/, Wa], [/.[^z]ens$/, "Verb"], [/.[lstrn]us$/, Ra], [/.[aeiou]sks$/, Wa], [/.[aeiou]kes$/, Wa], [/[aeiou][^aeiou]is$/, Ra], [/[a-z]\'s$/, "Noun"], [/^yes+$/, Qa]], v: [[/.[^aeiou][ai][kln]ov$/, "LastName"]], y: [[/.[cts]hy$/, Ka], [/.[st]ty$/, Ka], [/.[gk]y$/, Ka], [/.[tnl]ary$/, Ka], [/.[oe]ry$/, Ra], [/[rdntkbhs]ly$/, "Adverb"], [/...lly$/, "Adverb"], [/[bszmp]{2}y$/, Ka], [/.(gg|bb|zz)ly$/, Ka], [/.[ai]my$/, Ka], [/[ea]{2}zy$/, Ka], [/.[^aeiou]ity$/, Ra]] };
var ln = [null, null, { ea: en, ia: "Noun", ic: Za, ly: rn, "'n": nn, "'t": nn }, { oed: tn, ued: tn, xed: tn, " so": rn, "'ll": "Modal", "'re": "Copula", azy: Za, eer: "Noun", end: nn, ped: tn, ffy: Za, ify: Xa, ing: "Gerund", ize: Xa, lar: Za, mum: Za, nes: Ya, nny: Za, oid: Za, ous: Za, que: Za, rol: en, sis: en, zes: Ya }, { amed: tn, aped: tn, ched: tn, lked: tn, nded: tn, cted: tn, dged: tn, akis: on, cede: Xa, chuk: on, czyk: on, ects: Ya, ends: nn, enko: on, ette: en, fies: Ya, fore: rn, gate: Xa, gone: Za, ices: an, ints: an, ines: an, ions: an, less: rn, llen: Za, made: Za, nsen: on, oses: Ya, ould: "Modal", some: Za, sson: on, tage: Xa, teen: "Value", tion: en, tive: Za, tors: "Noun", vice: en }, { tized: tn, urned: tn, eased: tn, ances: an, bound: Za, ettes: an, fully: rn, ishes: Ya, ities: an, marek: on, nssen: on, ology: "Noun", ports: an, rough: Za, tches: Ya, tieth: "Ordinal", tures: an, wards: rn, where: rn }, { auskas: on, keeper: "Actor", logist: "Actor", teenth: "Value" }, { opoulos: on, borough: "Place", sdottir: on }];
var un = /^(\u00a9|\u00ae|[\u2319-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
var cn = { ":(": true, ":)": true, ":P": true, ":p": true, ":O": true, ":3": true, ":|": true, ":/": true, ":\\": true, ":$": true, ":*": true, ":@": true, ":-(": true, ":-)": true, ":-P": true, ":-p": true, ":-O": true, ":-3": true, ":-|": true, ":-/": true, ":-\\": true, ":-$": true, ":-*": true, ":-@": true, ":^(": true, ":^)": true, ":^P": true, ":^p": true, ":^O": true, ":^3": true, ":^|": true, ":^/": true, ":^\\": true, ":^$": true, ":^*": true, ":^@": true, "):": true, "(:": true, "$:": true, "*:": true, ")-:": true, "(-:": true, "$-:": true, "*-:": true, ")^:": true, "(^:": true, "$^:": true, "*^:": true, "<3": true, "</3": true, "<\\3": true };
var hn = { lexicon: Va, punctuation: function(e3, t2, r2) {
  let a2 = e3[t2];
  if (Ma.test(a2.text) && !Ma.test(a2.pre) && !Ma.test(a2.post) && a2.clean.length > 2) {
    let e4 = a2.clean[a2.clean.length - 2];
    if (e4 === "s")
      return void a2.tag(["Possessive", "Noun"], "end-tick", r2);
    e4 === "n" && a2.tag(["Gerund"], "chillin", r2);
  }
  Ja.test(a2.text) && a2.tag("Unit", "per-sec", r2);
}, regex: function(e3, t2) {
  let r2 = e3.text;
  for (let a2 = 0; a2 < La.length; a2 += 1)
    if (La[a2][0].test(r2) === true) {
      e3.tagSafe(La[a2][1], "prefix #" + a2, t2);
      break;
    }
  e3.text.length >= 2 && Sa.test(r2) && _a.test(r2) && e3.tag("RomanNumeral", "xvii", t2);
}, suffix: function(e3, t2) {
  !function(e4, t3) {
    const r2 = e4.clean.length;
    let a2 = 7;
    r2 <= a2 && (a2 = r2 - 1);
    for (let n2 = a2; n2 > 1; n2 -= 1) {
      let a3 = e4.clean.substr(r2 - n2, r2);
      if (ln[a3.length].hasOwnProperty(a3) === true) {
        let r3 = ln[a3.length][a3];
        e4.tagSafe(r3, "suffix -" + a3, t3);
        break;
      }
    }
  }(e3, t2), function(e4, t3) {
    let r2 = e4.clean, a2 = r2[r2.length - 1];
    if (sn.hasOwnProperty(a2) === true) {
      let n2 = sn[a2];
      for (let i2 = 0; i2 < n2.length; i2 += 1)
        if (n2[i2][0].test(r2) === true) {
          e4.tagSafe(n2[i2][1], `endReg ${a2} #${i2}`, t3);
          break;
        }
    }
  }(e3, t2);
}, emoji: (e3, t2) => {
  let r2 = e3.pre + e3.text + e3.post;
  var a2;
  r2 = r2.trim(), r2 = r2.replace(/[.!?,]$/, ""), ((e4) => !(e4.charAt(0) !== ":" || e4.match(/:.?$/) === null || e4.match(" ") || e4.length > 35))(r2) === true && (e3.tag("Emoji", "comma-emoji", t2), e3.text = r2, e3.pre = e3.pre.replace(":", ""), e3.post = e3.post.replace(":", "")), e3.text.match(un) && (e3.tag("Emoji", "unicode-emoji", t2), e3.text = r2), (a2 = (a2 = r2).replace(/^[:;]/, ":"), cn.hasOwnProperty(a2)) === true && (e3.tag("Emoticon", "emoticon-emoji", t2), e3.text = r2);
} };
var dn = function(e3, t2) {
  let r2 = e3.world;
  hn.lexicon(t2, r2);
  for (let e4 = 0; e4 < t2.length; e4 += 1) {
    let a2 = t2[e4];
    hn.punctuation(t2, e4, r2), hn.regex(a2, r2), hn.suffix(a2, r2), hn.emoji(a2, r2);
  }
  return e3;
};
var gn = { beforeThisWord: { there: "Verb", me: "Verb", man: "Adjective", only: "Verb", him: "Verb", were: "Noun", took: "Noun", himself: "Verb", went: "Noun", who: "Noun", jr: "Person" }, afterThisWord: { i: "Verb", first: "Noun", it: "Verb", there: "Verb", not: "Verb", because: "Noun", if: "Noun", but: "Noun", who: "Verb", this: "Noun", his: "Noun", when: "Noun", you: "Verb", very: "Adjective", old: "Noun", never: "Verb", before: "Noun" }, beforeThisPos: { Copula: "Noun", PastTense: "Noun", Conjunction: "Noun", Modal: "Noun", Pluperfect: "Noun", PerfectTense: "Verb" }, afterThisPos: { Adjective: "Noun", Possessive: "Noun", Determiner: "Noun", Adverb: "Verb", Pronoun: "Verb", Value: "Noun", Ordinal: "Noun", Modal: "Verb", Superlative: "Noun", Demonym: "Noun", Honorific: "Person" } };
var pn = Object.keys(gn.afterThisPos);
var mn = Object.keys(gn.beforeThisPos);
var fn2 = function(e3, t2) {
  for (let r2 = 0; r2 < e3.length; r2 += 1) {
    let a2 = e3[r2];
    if (a2.isKnown() === true)
      continue;
    let n2 = e3[r2 - 1];
    if (n2) {
      if (gn.afterThisWord.hasOwnProperty(n2.clean) === true) {
        let e5 = gn.afterThisWord[n2.clean];
        a2.tag(e5, "after-" + n2.clean, t2);
        continue;
      }
      let e4 = pn.find((e5) => n2.tags[e5]);
      if (e4 !== void 0) {
        let r3 = gn.afterThisPos[e4];
        a2.tag(r3, "after-" + e4, t2);
        continue;
      }
    }
    let i2 = e3[r2 + 1];
    if (i2) {
      if (gn.beforeThisWord.hasOwnProperty(i2.clean) === true) {
        let e5 = gn.beforeThisWord[i2.clean];
        a2.tag(e5, "before-" + i2.clean, t2);
        continue;
      }
      let e4 = mn.find((e5) => i2.tags[e5]);
      if (e4 !== void 0) {
        let r3 = gn.beforeThisPos[e4];
        a2.tag(r3, "before-" + e4, t2);
        continue;
      }
    }
  }
};
var bn = /^[A-Z][a-z'\u00C0-\u00FF]/;
var yn = /[0-9]/;
var vn = function(e3) {
  let t2 = e3.world;
  e3.list.forEach((e4) => {
    let r2 = e4.terms();
    for (let e5 = 1; e5 < r2.length; e5++) {
      const a2 = r2[e5];
      bn.test(a2.text) === true && yn.test(a2.text) === false && a2.tags.Date === void 0 && a2.tag("ProperNoun", "titlecase-noun", t2);
    }
  });
};
var wn = /^(re|un)-?[a-z\u00C0-\u00FF]/;
var kn = /^(re|un)-?/;
var An = function(e3, t2) {
  let r2 = t2.words;
  e3.forEach((e4) => {
    if (e4.isKnown() !== true && wn.test(e4.clean) === true) {
      let a2 = e4.clean.replace(kn, "");
      a2 && a2.length > 3 && r2[a2] !== void 0 && r2.hasOwnProperty(a2) === true && e4.tag(r2[a2], "stem-" + a2, t2);
    }
  });
};
var Dn = ["Uncountable", "Pronoun", "Place", "Value", "Person", "Month", "WeekDay", "Holiday"];
var $n = { isSingular: [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /s[aeiou]+ns$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i], isPlural: [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /is$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i] };
var Pn = [/ss$/, /sis$/, /[^aeiou][uo]s$/, /'s$/];
var En = [/i$/, /ae$/];
var Hn = function(e3, t2) {
  if (e3.tags.Noun && !e3.tags.Acronym) {
    let r2 = e3.clean;
    if (e3.tags.Singular || e3.tags.Plural)
      return;
    if (r2.length <= 3)
      return void e3.tag("Singular", "short-singular", t2);
    if (Dn.find((t3) => e3.tags[t3]))
      return;
    if ($n.isPlural.find((e4) => e4.test(r2)))
      return void e3.tag("Plural", "plural-rules", t2);
    if ($n.isSingular.find((e4) => e4.test(r2)))
      return void e3.tag("Singular", "singular-rules", t2);
    if (/s$/.test(r2) === true) {
      if (Pn.find((e4) => e4.test(r2)))
        return;
      return void e3.tag("Plural", "plural-fallback", t2);
    }
    if (En.find((e4) => e4.test(r2)))
      return;
    e3.tag("Singular", "singular-fallback", t2);
  }
};
var jn = ["academy", "administration", "agence", "agences", "agencies", "agency", "airlines", "airways", "army", "assoc", "associates", "association", "assurance", "authority", "autorite", "aviation", "bank", "banque", "board", "boys", "brands", "brewery", "brotherhood", "brothers", "building society", "bureau", "cafe", "caisse", "capital", "care", "cathedral", "center", "central bank", "centre", "chemicals", "choir", "chronicle", "church", "circus", "clinic", "clinique", "club", "co", "coalition", "coffee", "collective", "college", "commission", "committee", "communications", "community", "company", "comprehensive", "computers", "confederation", "conference", "conseil", "consulting", "containers", "corporation", "corps", "corp", "council", "crew", "daily news", "data", "departement", "department", "department store", "departments", "design", "development", "directorate", "division", "drilling", "education", "eglise", "electric", "electricity", "energy", "ensemble", "enterprise", "enterprises", "entertainment", "estate", "etat", "evening news", "faculty", "federation", "financial", "fm", "foundation", "fund", "gas", "gazette", "girls", "government", "group", "guild", "health authority", "herald", "holdings", "hospital", "hotel", "hotels", "inc", "industries", "institut", "institute", "institute of technology", "institutes", "insurance", "international", "interstate", "investment", "investments", "investors", "journal", "laboratory", "labs", "liberation army", "limited", "local authority", "local health authority", "machines", "magazine", "management", "marine", "marketing", "markets", "media", "memorial", "mercantile exchange", "ministere", "ministry", "military", "mobile", "motor", "motors", "musee", "museum", "news", "news service", "observatory", "office", "oil", "optical", "orchestra", "organization", "partners", "partnership", "people's party", "petrol", "petroleum", "pharmacare", "pharmaceutical", "pharmaceuticals", "pizza", "plc", "police", "polytechnic", "post", "power", "press", "productions", "quartet", "radio", "regional authority", "regional health authority", "reserve", "resources", "restaurant", "restaurants", "savings", "school", "securities", "service", "services", "social club", "societe", "society", "sons", "standard", "state police", "state university", "stock exchange", "subcommittee", "syndicat", "systems", "telecommunications", "telegraph", "television", "times", "tribunal", "tv", "union", "university", "utilities", "workers"].reduce(function(e3, t2) {
  return e3[t2] = "Noun", e3;
}, {});
var Nn = function(e3) {
  return !!e3.tags.Noun && (!(e3.tags.Pronoun || e3.tags.Comma || e3.tags.Possessive) && !!(e3.tags.Organization || e3.tags.Acronym || e3.tags.Place || e3.titleCase()));
};
var xn = /^[A-Z]('s|,)?$/;
var Fn = /([A-Z]\.){2}[A-Z]?/i;
var Cn = { I: true, A: true };
var Bn = { neighbours: fn2, case: vn, stem: An, plural: Hn, organizations: function(e3, t2) {
  for (let r2 = 0; r2 < e3.length; r2 += 1) {
    let a2 = e3[r2];
    if (jn[a2.clean] !== void 0 && jn.hasOwnProperty(a2.clean) === true) {
      let n2 = e3[r2 - 1];
      if (n2 !== void 0 && Nn(n2) === true) {
        n2.tagSafe("Organization", "org-word-1", t2), a2.tagSafe("Organization", "org-word-2", t2);
        continue;
      }
      let i2 = e3[r2 + 1];
      if (i2 !== void 0 && i2.clean === "of" && e3[r2 + 2] && Nn(e3[r2 + 2])) {
        a2.tagSafe("Organization", "org-of-word-1", t2), i2.tagSafe("Organization", "org-of-word-2", t2), e3[r2 + 2].tagSafe("Organization", "org-of-word-3", t2);
        continue;
      }
    }
  }
}, acronyms: function(e3, t2) {
  e3.forEach((e4) => {
    e4.tags.RomanNumeral !== true && (Fn.test(e4.text) === true && e4.tag("Acronym", "period-acronym", t2), e4.isUpperCase() && function(e5, t3) {
      let r2 = e5.reduced;
      return !!e5.tags.Acronym || !t3.words[r2] && !(r2.length > 5) && e5.isAcronym();
    }(e4, t2) ? (e4.tag("Acronym", "acronym-step", t2), e4.tag("Noun", "acronym-infer", t2)) : !Cn.hasOwnProperty(e4.text) && xn.test(e4.text) && (e4.tag("Acronym", "one-letter-acronym", t2), e4.tag("Noun", "one-letter-infer", t2)), e4.tags.Organization && e4.text.length <= 3 && e4.tag("Acronym", "acronym-org", t2), e4.tags.Organization && e4.isUpperCase() && e4.text.length <= 6 && e4.tag("Acronym", "acronym-org-case", t2));
  });
} };
var Gn = function(e3, t2) {
  let r2 = e3.world;
  return Bn.neighbours(t2, r2), Bn.case(e3), Bn.stem(t2, r2), t2.forEach((t3) => {
    t3.isKnown() === false && t3.tag("Noun", "noun-fallback", e3.world);
  }), Bn.organizations(t2, r2), Bn.acronyms(t2, r2), t2.forEach((t3) => {
    Bn.plural(t3, e3.world);
  }), e3;
};
var zn = /n't$/;
var In = { "won't": ["will", "not"], wont: ["will", "not"], "can't": ["can", "not"], cant: ["can", "not"], cannot: ["can", "not"], "shan't": ["should", "not"], dont: ["do", "not"], dun: ["do", "not"] };
var On = /([a-z\u00C0-\u00FF]+)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]([a-z]{1,2})$/i;
var Tn = { ll: "will", ve: "have", re: "are", m: "am", "n't": "not" };
var Vn = { wanna: ["want", "to"], gonna: ["going", "to"], im: ["i", "am"], alot: ["a", "lot"], ive: ["i", "have"], imma: ["I", "will"], "where'd": ["where", "did"], whered: ["where", "did"], "when'd": ["when", "did"], whend: ["when", "did"], howd: ["how", "did"], whatd: ["what", "did"], dunno: ["do", "not", "know"], brb: ["be", "right", "back"], gtg: ["got", "to", "go"], irl: ["in", "real", "life"], tbh: ["to", "be", "honest"], imo: ["in", "my", "opinion"], til: ["today", "i", "learned"], rn: ["right", "now"], twas: ["it", "was"], "@": ["at"] };
var Mn = /([a-z\u00C0-\u00FF]+)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]s$/i;
var Jn = { that: true, there: true };
var Ln = { here: true, there: true, everywhere: true };
var Sn = /[a-z\u00C0-\u00FF]'d$/;
var _n = { how: true, what: true };
var Kn = /^([0-9.]{1,3}[a-z]{0,2}) ?[-–—] ?([0-9]{1,3}[a-z]{0,2})$/i;
var qn = /^([0-9][0-9]?(:[0-9][0-9])?(am|pm)?) ?[-–—] ?([0-9][0-9]?(:[0-9][0-9])?(am|pm)?)$/i;
var Wn = /^(l|c|d|j|m|n|qu|s|t)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]([a-z\u00C0-\u00FF]+)$/i;
var Rn = { l: "le", c: "ce", d: "de", j: "je", m: "me", n: "ne", qu: "que", s: "se", t: "tu" };
var Un = Va;
var Qn = xt;
var Zn = function(e3, t2) {
  if (In.hasOwnProperty(e3.clean) === true)
    return In[e3.clean];
  if (e3.clean === "ain't" || e3.clean === "aint")
    return function(e4, t3) {
      let r2 = t3.terms(), a2 = r2.indexOf(e4), n2 = r2.slice(0, a2).find((e5) => e5.tags.Noun);
      return n2 && n2.tags.Plural ? ["are", "not"] : ["is", "not"];
    }(e3, t2);
  if (zn.test(e3.clean) === true) {
    return [e3.clean.replace(zn, ""), "not"];
  }
  return null;
};
var Xn = function(e3) {
  let t2 = e3.text.match(On);
  return t2 === null ? null : Tn.hasOwnProperty(t2[2]) ? [t2[1], Tn[t2[2]]] : null;
};
var Yn = function(e3) {
  return Vn.hasOwnProperty(e3.clean) ? Vn[e3.clean] : null;
};
var ei = function(e3, t2, r2) {
  let a2 = e3.text.match(Mn);
  if (a2 !== null) {
    if (((e4, t3) => {
      if (e4.tags.Possessive)
        return true;
      if (e4.tags.Pronoun || e4.tags.QuestionWord)
        return false;
      if (Jn.hasOwnProperty(e4.reduced))
        return false;
      let r3 = t3.get(e4.next);
      if (!r3)
        return true;
      if (r3.tags.Verb)
        return !!r3.tags.Infinitive || !!r3.tags.PresentTense;
      if (r3.tags.Noun)
        return Ln.hasOwnProperty(r3.reduced) !== true;
      let a3 = t3.get(r3.next);
      return !(!a3 || !a3.tags.Noun || a3.tags.Pronoun) || (r3.tags.Adjective || r3.tags.Adverb || r3.tags.Verb, false);
    })(e3, t2.pool) === true)
      return e3.tag("#Possessive", "isPossessive", r2), null;
    if (a2 !== null)
      return ((e4, t3) => {
        let r3 = t3.terms(), a3 = r3.indexOf(e4);
        return r3.slice(a3 + 1, a3 + 3).find((e5) => e5.tags.PastTense);
      })(e3, t2) ? [a2[1], "has"] : [a2[1], "is"];
  }
  return null;
};
var ti = function(e3, t2) {
  if (Sn.test(e3.clean)) {
    let r2 = e3.clean.replace(/'d$/, ""), a2 = t2.terms(), n2 = a2.indexOf(e3), i2 = a2.slice(n2 + 1, n2 + 4);
    for (let e4 = 0; e4 < i2.length; e4++) {
      let t3 = i2[e4];
      if (t3.tags.Verb)
        return t3.tags.PastTense ? [r2, "had"] : _n[r2] === true ? [r2, "did"] : [r2, "would"];
    }
    return [r2, "would"];
  }
  return null;
};
var ri = function(e3) {
  if (e3.tags.PhoneNumber === true)
    return null;
  let t2 = e3.text.match(Kn);
  return t2 !== null ? [t2[1], "to", t2[2]] : (t2 = e3.text.match(qn), t2 !== null ? [t2[1], "to", t2[4]] : null);
};
var ai = function(e3) {
  let t2 = e3.text.match(Wn);
  if (t2 === null || Rn.hasOwnProperty(t2[1]) === false)
    return null;
  let r2 = [Rn[t2[1]], t2[2]];
  return r2[0] && r2[1] ? r2 : null;
};
var ni = /^[0-9]+$/;
var ii = /^[0-9]+(st|nd|rd|th)$/;
var oi = /^[0-9:]+(am|pm)?$/;
var si = function(e3, t2) {
  let r2 = Qn(e3.join(" "), t2.world, t2.pool())[0], a2 = r2.terms();
  Un(a2, t2.world);
  let n2 = a2[0];
  return ii.test(n2.text) && a2[2] ? (a2[0].tag("Ordinal", "ord-range", t2.world), a2[2].tag("Ordinal", "ord-range", t2.world)) : ni.test(n2.text) && a2[2] ? (a2[0].tag("Cardinal", "num-range", t2.world), a2[2].tag("Cardinal", "num-range", t2.world)) : oi.test(n2.text) && a2[1] && a2[2] && (a2[0].tag("Time", "time-range", t2.world), a2[1].tag("Date", "time-range", t2.world), a2[2].tag("Time", "time-range", t2.world)), a2.forEach((e4) => {
    e4.implicit = e4.text, e4.text = "", e4.clean = "", e4.pre = "", e4.post = "", Object.keys(e4.tags).length === 0 && (e4.tags.Noun = true);
  }), r2;
};
var li = function(e3) {
  let t2 = e3.world;
  return e3.list.forEach((r2) => {
    let a2 = r2.terms();
    for (let n2 = 0; n2 < a2.length; n2 += 1) {
      let i2 = a2[n2], o2 = Zn(i2, r2);
      if (o2 = o2 || Xn(i2), o2 = o2 || Yn(i2), o2 = o2 || ei(i2, r2, t2), o2 = o2 || ti(i2, r2), o2 = o2 || ri(i2), o2 = o2 || ai(i2), o2 !== null) {
        let t3 = si(o2, e3);
        r2.has("#NumberRange") === true && e3.buildFrom([t3]).tag("NumberRange"), t3.terms(0).text = i2.text, r2.buildFrom(i2.id, 1, e3.pool()).replace(t3, e3, true);
      }
    }
  }), e3;
};
var ui = function(e3, t2) {
  let r2 = e3._cache.tags[t2] || [];
  return r2 = r2.map((t3) => e3.list[t3]), e3.buildFrom(r2);
};
var ci = function(e3) {
  let t2 = ui(e3, "Infinitive");
  return t2.found && (t2 = t2.ifNo("@hasQuestionMark"), t2 = t2.ifNo("(i|we|they)"), t2.not("will be").match("[#Infinitive] (#Determiner|#Possessive) #Noun").notIf("(our|their)").match("#Infinitive").tag("Imperative", "shut-the"), t2.match("^[#Infinitive] #Adverb?$", 0).tag("Imperative", "go-fast"), t2.match("[(do && #Infinitive)] not? #Verb", 0).tag("Imperative", "do-not"), t2.match("[#Infinitive] (it|some) (#Comparative|#Preposition|please|now|again)", 0).tag("Imperative", "do-it")), t2 = function(e4, t3) {
    let r2 = e4._cache.words[t3] || [];
    return r2 = r2.map((t4) => e4.list[t4]), e4.buildFrom(r2);
  }(e3, "like"), t2.match("#Adverb like").notIf("(really|generally|typically|usually|sometimes|often|just) [like]").tag("Adverb", "adverb-like"), t2 = ui(e3, "Adjective"), t2.match("#Determiner #Adjective$").notIf("(#Comparative|#Superlative)").terms(1).tag("Noun", "the-adj-1"), t2 = ui(e3, "FirstName"), t2.match("#FirstName (#Noun|@titleCase)").ifNo("^#Possessive").ifNo("(#Pronoun|#Plural)").ifNo("@hasComma .").lastTerm().tag("#LastName", "firstname-noun"), t2 = ui(e3, "Value"), t2 = t2.match("#Value #PresentTense").ifNo("#Copula"), t2.found && (t2.has("(one|1)") === true ? t2.terms(1).tag("Singular", "one-presentTense") : t2.terms(1).tag("Plural", "value-presentTense")), e3.match("^(well|so|okay)").tag("Expression", "well-"), e3.match("#Value [of a second]", 0).unTag("Value", "of-a-second"), e3.match("#Value [seconds]", 0).unTag("Value", "30-seconds").tag(["Unit", "Plural"]), t2 = ui(e3, "Gerund"), t2.match("(be|been) (#Adverb|not)+? #Gerund").not("#Verb$").tag("Auxiliary", "be-walking"), e3.match("(try|use|attempt|build|make) #Verb").ifNo("(@hasComma|#Negative|#PhrasalVerb|#Copula|will|be)").lastTerm().tag("#Noun", "do-verb"), t2 = ui(e3, "Possessive"), t2 = t2.match("#Possessive [#Infinitive]", 0), t2.lookBehind("(let|made|make|force|ask)").found || t2.tag("Noun", "her-match"), e3;
};
var hi = function(e3) {
  let t2 = {};
  for (let r2 = 0; r2 < e3.length; r2++)
    t2[e3[r2]] = true;
  return Object.keys(t2);
};
var di = [{ match: "too much", tag: "Adverb Adjective", reason: "bit-4" }, { match: "u r", tag: "Pronoun Copula", reason: "u r" }, { match: "#Copula (pretty|dead|full|well|sure) (#Adjective|#Noun)", tag: "#Copula #Adverb #Adjective", reason: "sometimes-adverb" }, { match: "(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense", group: 0, tag: "Modal", reason: "i-better" }, { match: "[#Gerund] #Adverb? not? #Copula", group: 0, tag: "Activity", reason: "gerund-copula" }, { match: "[#Gerund] #Modal", group: 0, tag: "Activity", reason: "gerund-modal" }, { match: "holy (shit|fuck|hell)", tag: "Expression", reason: "swears-expression" }, { match: "#Noun #Actor", tag: "Actor", reason: "thing-doer" }, { match: "#Conjunction [u]", group: 0, tag: "Pronoun", reason: "u-pronoun-2" }, { match: "[u] #Verb", group: 0, tag: "Pronoun", reason: "u-pronoun-1" }, { match: "#Noun [(who|whom)]", group: 0, tag: "Determiner", reason: "captain-who" }, { match: "a bit much", tag: "Determiner Adverb Adjective", reason: "bit-3" }, { match: "#Verb #Adverb? #Noun [(that|which)]", group: 0, tag: "Preposition", reason: "that-prep" }, { match: "@hasComma [which] (#Pronoun|#Verb)", group: 0, tag: "Preposition", reason: "which-copula" }, { match: "#Copula just [like]", group: 0, tag: "Preposition", reason: "like-preposition" }, { match: "#Noun [like] #Noun", group: 0, tag: "Preposition", reason: "noun-like" }, { match: "[had] #Noun+ #PastTense", group: 0, tag: "Condition", reason: "had-he" }, { match: "[were] #Noun+ to #Infinitive", group: 0, tag: "Condition", reason: "were-he" }, { match: "^how", tag: "QuestionWord", reason: "how-question" }, { match: "[how] (#Determiner|#Copula|#Modal|#PastTense)", group: 0, tag: "QuestionWord", reason: "how-is" }, { match: "^which", tag: "QuestionWord", reason: "which-question" }, { match: "[so] #Noun", group: 0, tag: "Conjunction", reason: "so-conj" }, { match: "[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)", group: 0, tag: "Conjunction", reason: "how-he-is-x" }];
var gi = { adverbAdjective: ["dark", "bright", "flat", "light", "soft", "pale", "dead", "dim", "faux", "little", "wee", "sheer", "most", "near", "good", "extra", "all"], personDate: ["april", "june", "may", "jan", "august", "eve"], personMonth: ["january", "april", "may", "june", "jan", "sep"], personAdjective: ["misty", "rusty", "dusty", "rich", "randy", "young"], personVerb: ["pat", "wade", "ollie", "will", "rob", "buck", "bob", "mark", "jack"], personPlace: ["darwin", "hamilton", "paris", "alexandria", "houston", "kobe", "santiago", "salvador", "sydney", "victoria"], personNoun: ["art", "baker", "berg", "bill", "brown", "charity", "chin", "christian", "cliff", "daisy", "dawn", "dick", "dolly", "faith", "franco", "gene", "green", "hall", "hill", "holly", "hope", "jean", "jewel", "joy", "kelvin", "king", "kitty", "lane", "lily", "melody", "mercedes", "miles", "olive", "penny", "ray", "reed", "robin", "rod", "rose", "sky", "summer", "trinity", "van", "viola", "violet", "wang", "white"] };
var pi = `(${gi.personDate.join("|")})`;
var mi = [{ match: "#Holiday (day|eve)", tag: "Holiday", reason: "holiday-day" }, { match: "[sun] the #Ordinal", tag: "WeekDay", reason: "sun-the-5th" }, { match: "[sun] #Date", group: 0, tag: "WeekDay", reason: "sun-feb" }, { match: "#Date (on|this|next|last|during)? [sun]", group: 0, tag: "WeekDay", reason: "1pm-sun" }, { match: "(in|by|before|during|on|until|after|of|within|all) [sat]", group: 0, tag: "WeekDay", reason: "sat" }, { match: "(in|by|before|during|on|until|after|of|within|all) [wed]", group: 0, tag: "WeekDay", reason: "wed" }, { match: "(in|by|before|during|on|until|after|of|within|all) [march]", group: 0, tag: "Month", reason: "march" }, { match: "[sat] #Date", group: 0, tag: "WeekDay", reason: "sat-feb" }, { match: "#Preposition [(march|may)]", group: 0, tag: "Month", reason: "in-month" }, { match: "this [(march|may)]", group: 0, tag: "Month", reason: "this-month" }, { match: "next [(march|may)]", group: 0, tag: "Month", reason: "this-month" }, { match: "last [(march|may)]", group: 0, tag: "Month", reason: "this-month" }, { match: "[(march|may)] the? #Value", group: 0, tag: "Month", reason: "march-5th" }, { match: "#Value of? [(march|may)]", group: 0, tag: "Month", reason: "5th-of-march" }, { match: "[(march|may)] .? #Date", group: 0, tag: "Month", reason: "march-and-feb" }, { match: "#Date .? [(march|may)]", group: 0, tag: "Month", reason: "feb-and-march" }, { match: "#Adverb [(march|may)]", group: 0, tag: "Verb", reason: "quickly-march" }, { match: "[(march|may)] #Adverb", group: 0, tag: "Verb", reason: "march-quickly" }, { match: "#Value of #Month", tag: "Date", reason: "value-of-month" }, { match: "#Cardinal #Month", tag: "Date", reason: "cardinal-month" }, { match: "#Month #Value to #Value", tag: "Date", reason: "value-to-value" }, { match: "#Month the #Value", tag: "Date", reason: "month-the-value" }, { match: "(#WeekDay|#Month) #Value", tag: "Date", reason: "date-value" }, { match: "#Value (#WeekDay|#Month)", tag: "Date", reason: "value-date" }, { match: "(#TextValue && #Date) #TextValue", tag: "Date", reason: "textvalue-date" }, { match: `in [${pi}]`, group: 0, tag: "Date", reason: "in-june" }, { match: `during [${pi}]`, group: 0, tag: "Date", reason: "in-june" }, { match: `on [${pi}]`, group: 0, tag: "Date", reason: "in-june" }, { match: `by [${pi}]`, group: 0, tag: "Date", reason: "by-june" }, { match: `after [${pi}]`, group: 0, tag: "Date", reason: "after-june" }, { match: `#Date [${pi}]`, group: 0, tag: "Date", reason: "in-june" }, { match: pi + " #Value", tag: "Date", reason: "june-5th" }, { match: pi + " #Date", tag: "Date", reason: "june-5th" }, { match: pi + " #ProperNoun", tag: "Person", reason: "june-smith", safe: true }, { match: pi + " #Acronym? (#ProperNoun && !#Month)", tag: "Person", reason: "june-smith-jr" }, { match: "#Cardinal [second]", tag: "Unit", reason: "one-second" }, { match: "#Month #NumberRange", tag: "Date", reason: "aug 20-21" }, { match: "(#Place|#Demonmym|#Time) (standard|daylight|central|mountain)? time", tag: "Timezone", reason: "std-time" }, { match: "(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time", tag: "Timezone", reason: "eastern-time" }, { match: "#Time [(eastern|mountain|pacific|central|est|pst|gmt)]", group: 0, tag: "Timezone", reason: "5pm-central" }, { match: "(central|western|eastern) european time", tag: "Timezone", reason: "cet" }];
var fi = `(${gi.personAdjective.join("|")})`;
var bi = [{ match: "[all] #Determiner? #Noun", group: 0, tag: "Adjective", reason: "all-noun" }, { match: `#Adverb [${fi}]`, group: 0, tag: "Adjective", reason: "really-rich" }, { match: fi + " #Person", tag: "Person", reason: "randy-smith" }, { match: fi + " #Acronym? #ProperNoun", tag: "Person", reason: "rusty-smith" }, { match: "#Copula [(just|alone)]$", group: 0, tag: "Adjective", reason: "not-adverb" }, { match: "#Singular is #Adverb? [#PastTense$]", group: 0, tag: "Adjective", reason: "is-filled" }, { match: "[#PastTense] #Singular is", group: 0, tag: "Adjective", reason: "smoked-poutine" }, { match: "[#PastTense] #Plural are", group: 0, tag: "Adjective", reason: "baked-onions" }, { match: "well [#PastTense]", group: 0, tag: "Adjective", reason: "well-made" }, { match: "#Copula [fucked up?]", tag: "Adjective", reason: "swears-adjective" }, { match: "#Singular (seems|appears) #Adverb? [#PastTense$]", group: 0, tag: "Adjective", reason: "seems-filled" }, { match: "(a|an) [#Gerund]", group: 0, tag: "Adjective", reason: "a|an" }, { match: "as [#Gerund] as", group: 0, tag: "Adjective", reason: "as-gerund-as" }, { match: "more [#Gerund] than", group: 0, tag: "Adjective", reason: "more-gerund-than" }, { match: "(so|very|extremely) [#Gerund]", group: 0, tag: "Adjective", reason: "so-gerund" }, { match: "(it|he|she|everything|something) #Adverb? was #Adverb? [#Gerund]", group: 0, tag: "Adjective", reason: "it-was-gerund" }, { match: "(found|found) it #Adverb? [#Gerund]", group: 0, tag: "Adjective", reason: "found-it-gerund" }, { match: "a (little|bit|wee) bit? [#Gerund]", group: 0, tag: "Adjective", reason: "a-bit-gerund" }, { match: "#Copula #Adjective? [(out|in|through)]$", group: 0, tag: "Adjective", reason: "still-out" }, { match: "^[#Adjective] (the|your) #Noun", group: 0, tag: "Infinitive", reason: "shut-the" }, { match: "the [said] #Noun", group: 0, tag: "Adjective", reason: "the-said-card" }, { match: "#Noun (that|which|whose) [#PastTense && !#Copula] #Noun", group: 0, tag: "Adjective", reason: "that-past-noun" }];
var yi = [{ match: "there (are|were) #Adjective? [#PresentTense]", group: 0, tag: "Plural", reason: "there-are" }, { match: "#Determiner [sun]", group: 0, tag: "Singular", reason: "the-sun" }, { match: "#Verb (a|an) [#Value]", group: 0, tag: "Singular", reason: "did-a-value" }, { match: "the [(can|will|may)]", group: 0, tag: "Singular", reason: "the can" }, { match: "#FirstName #Acronym? (#Possessive && #LastName)", tag: "Possessive", reason: "name-poss" }, { match: "#Organization+ #Possessive", tag: "Possessive", reason: "org-possessive" }, { match: "#Place+ #Possessive", tag: "Possessive", reason: "place-possessive" }, { match: "(#Verb && !#Modal) (all|every|each|most|some|no) [#PresentTense]", group: 0, tag: "Noun", reason: "all-presentTense" }, { match: "#Determiner [#Adjective] #Copula", group: 0, tag: "Noun", reason: "the-adj-is" }, { match: "#Adjective [#Adjective] #Copula", group: 0, tag: "Noun", reason: "adj-adj-is" }, { match: "(had|have|#PastTense) #Adjective [#PresentTense]", group: 0, tag: "Noun", reason: "adj-presentTense" }, { match: "^#Adjective [#PresentTense]", group: 0, tag: "Noun", reason: "start adj-presentTense" }, { match: "#Value #Adjective [#PresentTense]", group: 0, tag: "Noun", reason: "one-big-reason" }, { match: "#PastTense #Adjective+ [#PresentTense]", group: 0, tag: "Noun", reason: "won-wide-support" }, { match: "(many|few|several|couple) [#PresentTense]", group: 0, tag: "Noun", reason: "many-poses" }, { match: "#Adverb #Adjective [#PresentTense]", group: 0, tag: "Noun", reason: "very-big-dream" }, { match: "#Adjective [#Infinitive] #Noun", group: 0, tag: "Noun", reason: "good-wait-staff" }, { match: "#Adjective #Adjective [#PresentTense]", group: 0, tag: "Noun", reason: "adorable-little-store" }, { match: "#Preposition #Adjective [#PresentTense]", group: 0, tag: "Noun", reason: "of-basic-training" }, { match: "#Adjective [#Gerund]", group: 0, tag: "Noun", reason: "early-warning" }, { match: "#Gerund #Adverb? #Comparative [#PresentTense]", group: 0, tag: "Noun", reason: "higher-costs" }, { match: "#Infinitive (this|that|the) [#Infinitive]", group: 0, tag: "Noun", reason: "do-this-dance" }, { match: "(his|her|its) [#Adjective]", group: 0, tag: "Noun", reason: "his-fine" }, { match: "some [#Verb] #Plural", group: 0, tag: "Noun", reason: "determiner6" }, { match: "more #Noun", tag: "Noun", reason: "more-noun" }, { match: "(#Noun && @hasComma) #Noun (and|or) [#PresentTense]", group: 0, tag: "Noun", reason: "noun-list" }, { match: "(right|rights) of .", tag: "Noun", reason: "right-of" }, { match: "a [bit]", group: 0, tag: "Noun", reason: "bit-2" }, { match: "#Possessive #Ordinal [#PastTense]", group: 0, tag: "Noun", reason: "first-thought" }, { match: "#Gerund #Determiner [#Infinitive]", group: 0, tag: "Noun", reason: "running-a-show" }, { match: "#Determiner #Adverb [#Infinitive]", group: 0, tag: "Noun", reason: "the-reason" }, { match: "(the|this|those|these) #Adjective [#Verb]", group: 0, tag: "Noun", reason: "the-adj-verb" }, { match: "(the|this|those|these) #Adverb #Adjective [#Verb]", group: 0, tag: "Noun", reason: "determiner4" }, { match: "#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)", group: 0, tag: "Noun", reason: "the-adj-2" }, { match: "(the|this|a|an) [#Infinitive] #Adverb? #Verb", group: 0, tag: "Noun", reason: "determiner5" }, { match: "#Determiner [#Infinitive] #Noun", group: 0, tag: "Noun", reason: "determiner7" }, { match: "#Determiner #Adjective #Adjective? [#Infinitive]", group: 0, tag: "Noun", reason: "a-nice-inf" }, { match: "the [#Verb] #Preposition .", group: 0, tag: "Noun", reason: "determiner1" }, { match: "#Determiner [#Verb] of", group: 0, tag: "Noun", reason: "the-verb-of" }, { match: "#Adjective #Noun+ [#Infinitive] #Copula", group: 0, tag: "Noun", reason: "career-move" }, { match: "#Determiner #Noun of [#Verb]", group: 0, tag: "Noun", reason: "noun-of-noun" }, { match: "#Determiner [(western|eastern|northern|southern|central)] #Noun", group: 0, tag: "Noun", reason: "western-line" }, { match: "#Possessive [#Gerund]", group: 0, tag: "Noun", reason: "her-polling" }, { match: "(his|her|its) [#PresentTense]", group: 0, tag: "Noun", reason: "its-polling" }, { match: "(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun", group: 0, tag: "Noun", reason: "technical-noun" }, { match: "(the|those|these|a|an) [#Participle] #Noun", group: 0, tag: "Adjective", reason: "blown-motor" }, { match: "(the|those|these|a|an) #Adjective? [#Infinitive]", group: 0, tag: "Noun", reason: "det-inf" }, { match: "(the|those|these|a|an) #Adjective? [#PresentTense]", group: 0, tag: "Noun", reason: "det-pres" }, { match: "(the|those|these|a|an) #Adjective? [#PastTense]", group: 0, tag: "Noun", reason: "det-past" }, { match: "(this|that) [#Gerund]", group: 0, tag: "Noun", reason: "this-gerund" }, { match: "at some [#Infinitive]", group: 0, tag: "Noun", reason: "at-some-inf" }, { match: "(#Noun && @hasHyphen) #Verb", tag: "Noun", reason: "hyphen-verb" }, { match: "is no [#Verb]", group: 0, tag: "Noun", reason: "is-no-verb" }, { match: "[#Verb] than", group: 0, tag: "Noun", reason: "correction" }, { match: "(go|goes|went) to [#Infinitive]", group: 0, tag: "Noun", reason: "goes-to-verb" }, { match: "(a|an) #Noun [#Infinitive] (#Preposition|#Noun)", group: 0, tag: "Noun", reason: "a-noun-inf" }, { match: "(a|an) #Noun [#Infinitive]$", group: 0, tag: "Noun", reason: "a-noun-inf2" }, { match: "do [so]", group: 0, tag: "Noun", reason: "so-noun" }, { match: "#Copula [#Infinitive] #Noun", group: 0, tag: "Noun", reason: "is-pres-noun" }, { match: "#Determiner #Adverb? [close]", group: 0, tag: "Adjective", reason: "a-close" }, { match: "#Determiner [(shit|damn|hell)]", group: 0, tag: "Noun", reason: "swears-noun" }, { match: "(the|these) [#Singular] (were|are)", group: 0, tag: "Plural", reason: "singular-were" }, { match: "#Gerund #Adjective? for [#Infinitive]", group: 0, tag: "Noun", reason: "running-for" }, { match: "#Gerund #Adjective to [#Infinitive]", group: 0, tag: "Noun", reason: "running-to" }, { match: "(many|any|some|several) [#PresentTense] for", group: 0, tag: "Noun", reason: "any-verbs-for" }, { match: "(have|had) [#Adjective] #Preposition .", group: 0, tag: "Noun", reason: "have-fun" }, { match: "co #Noun", tag: "Actor", reason: "co-noun" }, { match: "to #PresentTense #Noun [#PresentTense] #Preposition", group: 0, tag: "Noun", reason: "gas-exchange" }, { match: "a #Noun+ or #Adverb+? [#Verb]", group: 0, tag: "Noun", reason: "noun-or-noun" }, { match: "[#Gerund] system", group: 0, tag: "Noun", reason: "operating-system" }, { match: "#PastTense (until|as|through|without) [#PresentTense]", group: 0, tag: "Noun", reason: "waited-until-release" }, { match: "#Gerund like #Adjective? [#PresentTense]", group: 0, tag: "Plural", reason: "like-hot-cakes" }, { match: "some #Adjective [#PresentTense]", group: 0, tag: "Noun", reason: "some-reason" }, { match: "for some [#PresentTense]", group: 0, tag: "Noun", reason: "for-some-reason" }, { match: "(same|some|the|that|a) kind of [#PresentTense]", group: 0, tag: "Noun", reason: "some-kind-of" }, { match: "(same|some|the|that|a) type of [#PresentTense]", group: 0, tag: "Noun", reason: "some-type-of" }, { match: "#Gerund #Adjective #Preposition [#PresentTense]", group: 0, tag: "Noun", reason: "doing-better-for-x" }, { match: "(get|got|have|had) #Comparative [#PresentTense]", group: 0, tag: "Noun", reason: "got-better-aim" }, { match: "#Pronoun #Infinitive [#Gerund] #PresentTense", group: 0, tag: "Noun", reason: "tipping-sucks" }];
var vi = [{ match: "[still] #Adjective", group: 0, tag: "Adverb", reason: "still-advb" }, { match: "[still] #Verb", group: 0, tag: "Adverb", reason: "still-verb" }, { match: "[so] #Adjective", group: 0, tag: "Adverb", reason: "so-adv" }, { match: "[way] #Comparative", group: 0, tag: "Adverb", reason: "way-adj" }, { match: "[way] #Adverb #Adjective", group: 0, tag: "Adverb", reason: "way-too-adj" }, { match: "[all] #Verb", group: 0, tag: "Adverb", reason: "all-verb" }, { match: "(#Verb && !#Modal) [like]", group: 0, tag: "Adverb", reason: "verb-like" }, { match: "(barely|hardly) even", tag: "Adverb", reason: "barely-even" }, { match: "[even] #Verb", group: 0, tag: "Adverb", reason: "even-walk" }, { match: "even left", tag: "#Adverb #Verb", reason: "even-left" }, { match: "(#PresentTense && !#Copula) [(hard|quick|long|bright|slow|fast|backwards|forwards)]", group: 0, tag: "Adverb", reason: "lazy-ly" }, { match: "[much] #Adjective", group: 0, tag: "Adverb", reason: "bit-1" }, { match: "#Copula [#Adverb]$", group: 0, tag: "Adjective", reason: "is-well" }, { match: "a [(little|bit|wee) bit?] #Adjective", group: 0, tag: "Adverb", reason: "a-bit-cold" }, { match: `[${`(${gi.adverbAdjective.join("|")})`}] #Adjective`, group: 0, tag: "Adverb", reason: "dark-green" }, { match: "#Adverb [#Adverb]$", group: 0, tag: "Adjective", reason: "kinda-sparkly" }, { match: "#Adverb [#Adverb] (and|or|then)", group: 0, tag: "Adjective", reason: "kinda-sparkly-and" }, { match: "[super] #Adjective #Noun", group: 0, tag: "Adverb", reason: "super-strong" }];
var wi = [{ match: "1 #Value #PhoneNumber", tag: "PhoneNumber", reason: "1-800-Value" }, { match: "#NumericValue #PhoneNumber", tag: "PhoneNumber", reason: "(800) PhoneNumber" }, { match: "#Demonym #Currency", tag: "Currency", reason: "demonym-currency" }, { match: "[second] #Noun", group: 0, tag: "Ordinal", reason: "second-noun" }, { match: "#Value+ [#Currency]", group: 0, tag: "Unit", reason: "5-yan" }, { match: "#Value [(foot|feet)]", group: 0, tag: "Unit", reason: "foot-unit" }, { match: "(minus|negative) #Value", tag: "Value", reason: "minus-value" }, { match: "#Value [#Abbreviation]", group: 0, tag: "Unit", reason: "value-abbr" }, { match: "#Value [k]", group: 0, tag: "Unit", reason: "value-k" }, { match: "#Unit an hour", tag: "Unit", reason: "unit-an-hour" }, { match: "#Value (point|decimal) #Value", tag: "Value", reason: "value-point-value" }, { match: "(#Value|a) [(buck|bucks|grand)]", group: 0, tag: "Currency", reason: "value-bucks" }, { match: "#Determiner [(half|quarter)] #Ordinal", group: 0, tag: "Value", reason: "half-ordinal" }, { match: "a #Value", tag: "Value", reason: "a-value" }, { match: "[#Value+] #Currency", group: 0, tag: "Money", reason: "15 usd" }, { match: "(hundred|thousand|million|billion|trillion|quadrillion)+ and #Value", tag: "Value", reason: "magnitude-and-value" }, { match: "!once [(a|an)] (#Duration|hundred|thousand|million|billion|trillion)", group: 0, tag: "Value", reason: "a-is-one" }];
var ki = `(${gi.personVerb.join("|")})`;
var Ai = [{ match: "[#Adjective] #Possessive #Noun", group: 0, tag: "Verb", reason: "gerund-his-noun" }, { match: "[#Adjective] (us|you)", group: 0, tag: "Gerund", reason: "loving-you" }, { match: "(slowly|quickly) [#Adjective]", group: 0, tag: "Gerund", reason: "slowly-adj" }, { match: "(#Modal|i|they|we|do) not? [like]", group: 0, tag: "PresentTense", reason: "modal-like" }, { match: "do (simply|just|really|not)+ [(#Adjective|like)]", group: 0, tag: "Verb", reason: "do-simply-like" }, { match: "does (#Adverb|not)? [#Adjective]", group: 0, tag: "PresentTense", reason: "does-mean" }, { match: "i (#Adverb|do)? not? [mean]", group: 0, tag: "PresentTense", reason: "i-mean" }, { match: "#Noun #Adverb? [left]", group: 0, tag: "PastTense", reason: "left-verb" }, { match: "(this|that) [#Plural]", group: 0, tag: "PresentTense", reason: "this-verbs" }, { match: "[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)", group: 0, tag: "Auxiliary", reason: "copula-walking" }, { match: "[(has|had) (#Adverb|not)+?] #PastTense", group: 0, tag: "Auxiliary", reason: "had-walked" }, { match: "#Adverb+? [(#Modal|did)+ (#Adverb|not)+?] #Verb", group: 0, tag: "Auxiliary", reason: "modal-verb" }, { match: "[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb", group: 0, tag: "Auxiliary", reason: "would-have" }, { match: "[(has|had) (#Adverb|not)+?] #PastTense", group: 0, tag: "Auxiliary", reason: "had-walked" }, { match: "[(do|does|will|have|had)] (not|#Adverb)+? #Verb", group: 0, tag: "Auxiliary", reason: "have-had" }, { match: "[about to] #Adverb? #Verb", group: 0, tag: ["Auxiliary", "Verb"], reason: "about-to" }, { match: "#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb", group: 0, tag: "Auxiliary", reason: "would-be" }, { match: "(were|was) being [#PresentTense]", group: 0, tag: "PastTense", reason: "was-being" }, { match: "[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb", group: 0, tag: "Auxiliary", reason: "would-have" }, { match: "(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb", group: 0, tag: "Auxiliary", reason: "had-been" }, { match: "[(be|being|been)] #Participle", group: 0, tag: "Auxiliary", reason: "being-foo" }, { match: "(#Verb && @hasHyphen) up", tag: "PhrasalVerb", reason: "foo-up" }, { match: "(#Verb && @hasHyphen) off", tag: "PhrasalVerb", reason: "foo-off" }, { match: "(#Verb && @hasHyphen) over", tag: "PhrasalVerb", reason: "foo-over" }, { match: "(#Verb && @hasHyphen) out", tag: "PhrasalVerb", reason: "foo-out" }, { match: "#PhrasalVerb [#PhrasalVerb]", group: 0, tag: "Particle", reason: "phrasal-particle" }, { match: "(lived|went|crept|go) [on] for", group: 0, tag: "PhrasalVerb", reason: "went-on" }, { match: "#Verb (him|her|it|us|himself|herself|itself|everything|something) [(up|down)]", group: 0, tag: "Adverb", reason: "phrasal-pronoun-advb" }, { match: "[will #Adverb? not? #Adverb? be] #Gerund", group: 0, tag: "Copula", reason: "will-be-copula" }, { match: "will #Adverb? not? #Adverb? [be] #Adjective", group: 0, tag: "Copula", reason: "be-copula" }, { match: "[march] (up|down|back|to|toward)", group: 0, tag: "Infinitive", reason: "march-to" }, { match: "#Modal [march]", group: 0, tag: "Infinitive", reason: "must-march" }, { match: "(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)", group: 0, tag: "Infinitive", reason: "let-him-glue" }, { match: "will [#Adjective]", group: 0, tag: "Verb", reason: "will-adj" }, { match: "#Pronoun [#Adjective] #Determiner #Adjective? #Noun", group: 0, tag: "Verb", reason: "he-adj-the" }, { match: "#Copula [#Adjective] to #Verb", group: 0, tag: "Verb", reason: "adj-to" }, { match: "[open] #Determiner", group: 0, tag: "Infinitive", reason: "open-the" }, { match: "[#PresentTense] (are|were|was) #Adjective", group: 0, tag: "Plural", reason: "compromises-are-possible" }, { match: `#Modal [${ki}]`, group: 0, tag: "Verb", reason: "would-mark" }, { match: `#Adverb [${ki}]`, group: 0, tag: "Verb", reason: "really-mark" }, { match: "(to|#Modal) [mark]", group: 0, tag: "PresentTense", reason: "to-mark" }, { match: "^[#Infinitive] (is|was)", group: 0, tag: "Noun", reason: "checkmate-is" }, { match: ki + " #Person", tag: "Person", reason: "rob-smith" }, { match: ki + " #Acronym #ProperNoun", tag: "Person", reason: "rob-a-smith" }, { match: "[shit] (#Determiner|#Possessive|them)", group: 0, tag: "Verb", reason: "swear1-verb" }, { match: "[damn] (#Determiner|#Possessive|them)", group: 0, tag: "Verb", reason: "swear2-verb" }, { match: "[fuck] (#Determiner|#Possessive|them)", group: 0, tag: "Verb", reason: "swear3-verb" }, { match: "(become|fall|grow) #Adverb? [#PastTense]", group: 0, tag: "Adjective", reason: "overly-weakened" }, { match: "(a|an) #Adverb [#Participle] #Noun", group: 0, tag: "Adjective", reason: "completely-beaten" }, { match: "whose [#PresentTense] #Copula", group: 0, tag: "Noun", reason: "whos-name-was" }, { match: "#PhrasalVerb #PhrasalVerb #Preposition [#PresentTense]", group: 0, tag: "Noun", reason: "given-up-on-x" }];
var Di = [{ match: "(west|north|south|east|western|northern|southern|eastern)+ #Place", tag: "Region", reason: "west-norfolk" }, { match: "#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]", group: 0, tag: "Region", reason: "us-state" }, { match: "portland [or]", group: 0, tag: "Region", reason: "portland-or" }, { match: "#ProperNoun+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)", tag: "Region", reason: "foo-district" }, { match: "(district|region|province|municipality|territory|burough|state) of #ProperNoun", tag: "Region", reason: "district-of-Foo" }, { match: "in [#ProperNoun] #Place", group: 0, tag: "Place", reason: "propernoun-place" }, { match: "#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)", tag: "Address", reason: "address-st" }];
var $i = gi;
var Pi = `(${$i.personNoun.join("|")})`;
var Ei = `(${$i.personMonth.join("|")})`;
var Hi = [{ match: "[(1st|2nd|first|second)] #Honorific", group: 0, tag: "Honorific", reason: "ordinal-honorific" }, { match: "[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person", group: 0, tag: "Honorific", reason: "ambg-honorifics" }, { match: "#Copula [(#Noun|#PresentTense)] #LastName", group: 0, tag: "FirstName", reason: "copula-noun-lastname" }, { match: "(lady|queen|sister) #ProperNoun", tag: "FemaleName", reason: "lady-titlecase", safe: true }, { match: "(king|pope|father) #ProperNoun", tag: "MaleName", reason: "pope-titlecase", safe: true }, { match: "[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName", group: 0, tag: "FirstName", reason: "maybe-lastname" }, { match: "#FirstName [#Determiner #Noun] #LastName", group: 0, tag: "NickName", reason: "first-noun-last" }, { match: "#Possessive [#FirstName]", group: 0, tag: "Person", reason: "possessive-name" }, { match: "#ProperNoun (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #ProperNoun", tag: "Person", reason: "titlecase-acronym-titlecase", safe: true }, { match: "#Acronym #LastName", tag: "Person", reason: "acronym-latname", safe: true }, { match: "#Person (jr|sr|md)", tag: "Person", reason: "person-honorific" }, { match: "#Person #Person the? #RomanNumeral", tag: "Person", reason: "roman-numeral" }, { match: "#FirstName [/^[^aiurck]$/]", group: 0, tag: ["Acronym", "Person"], reason: "john-e" }, { match: "#Honorific #Person", tag: "Person", reason: "honorific-person" }, { match: "#Honorific #Acronym", tag: "Person", reason: "Honorific-TitleCase" }, { match: "#Noun van der? #Noun", tag: "Person", reason: "van der noun", safe: true }, { match: "(king|queen|prince|saint|lady) of #Noun", tag: "Person", reason: "king-of-noun", safe: true }, { match: "(prince|lady) #Place", tag: "Person", reason: "lady-place" }, { match: "(king|queen|prince|saint) #ProperNoun", tag: "Person", reason: "saint-foo" }, { match: "[#ProperNoun] #Person", group: 0, tag: "Person", reason: "proper-person", safe: true }, { match: "al (#Person|#ProperNoun)", tag: "Person", reason: "al-borlen", safe: true }, { match: "#FirstName de #Noun", tag: "Person", reason: "bill-de-noun" }, { match: "#FirstName (bin|al) #Noun", tag: "Person", reason: "bill-al-noun" }, { match: "#FirstName #Acronym #ProperNoun", tag: "Person", reason: "bill-acronym-title" }, { match: "#FirstName #FirstName #ProperNoun", tag: "Person", reason: "bill-firstname-title" }, { match: "#Honorific #FirstName? #ProperNoun", tag: "Person", reason: "dr-john-Title" }, { match: "#FirstName the #Adjective", tag: "Person", reason: "name-the-great" }, { match: "#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)", tag: "Person", reason: "bill-green" }, { match: Pi + " #Person", tag: "Person", reason: "ray-smith", safe: true }, { match: Pi + " #Acronym? #ProperNoun", tag: "Person", reason: "ray-a-smith", safe: true }, { match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${Ei}]`, group: 0, tag: "Person", reason: "ambig-person" }, { match: `#Infinitive [${Ei}]`, group: 0, tag: "Person", reason: "infinitive-person" }, { match: `[${Ei}] #Modal`, group: 0, tag: "Person", reason: "ambig-modal" }, { match: "[may] be", group: 0, tag: "Verb", reason: "may-be" }, { match: `#Modal [${Ei}]`, group: 0, tag: "Person", reason: "modal-ambig" }, { match: `#Copula [${Ei}]`, group: 0, tag: "Person", reason: "is-may" }, { match: `[${Ei}] #Copula`, group: 0, tag: "Person", reason: "may-is" }, { match: `that [${Ei}]`, group: 0, tag: "Person", reason: "that-month" }, { match: `with [${Ei}]`, group: 0, tag: "Person", reason: "with-month" }, { match: `for [${Ei}]`, group: 0, tag: "Person", reason: "for-month" }, { match: `this [${Ei}]`, group: 0, tag: "Month", reason: "this-may" }, { match: `next [${Ei}]`, group: 0, tag: "Month", reason: "next-may" }, { match: `last [${Ei}]`, group: 0, tag: "Month", reason: "last-may" }, { match: `#Date [${Ei}]`, group: 0, tag: "Month", reason: "date-may" }, { match: `[${Ei}] the? #Value`, group: 0, tag: "Month", reason: "may-5th" }, { match: `#Value of [${Ei}]`, group: 0, tag: "Month", reason: "5th-of-may" }, { match: "#ProperNoun (van|al|bin) #ProperNoun", tag: "Person", reason: "title-van-title", safe: true }, { match: "#ProperNoun (de|du) la? #ProperNoun", tag: "Person", reason: "title-de-title", safe: true }, { match: "#Singular #Acronym #LastName", tag: "#Person", reason: "title-acro-noun", safe: true }, { match: "#FirstName (#Noun && #ProperNoun) #ProperNoun?", tag: "Person", reason: "firstname-titlecase" }, { match: "#FirstName #Acronym #Noun", tag: "Person", reason: "n-acro-noun", safe: true }, { match: "#FirstName [(de|di|du|van|von) #Person]", group: 0, tag: "LastName", reason: "de-firstname" }, { match: `[${`(${$i.personPlace.join("|")})`}] (#ProperNoun && !#Place)`, group: 0, tag: "FirstName", reason: "place-firstname" }];
var ji = _e;
var Ni = hi;
var xi = [];
xi = xi.concat(di), xi = xi.concat(mi), xi = xi.concat(bi), xi = xi.concat(yi), xi = xi.concat(vi), xi = xi.concat(wi), xi = xi.concat(Ai), xi = xi.concat(Di), xi = xi.concat([{ match: "#Noun (&|n) #Noun", tag: "Organization", reason: "Noun-&-Noun" }, { match: "#Organization of the? #ProperNoun", tag: "Organization", reason: "org-of-place", safe: true }, { match: "#Organization #Country", tag: "Organization", reason: "org-country" }, { match: "#ProperNoun #Organization", tag: "Organization", reason: "titlecase-org" }, { match: "#ProperNoun (ltd|co|inc|dept|assn|bros)", tag: "Organization", reason: "org-abbrv" }, { match: "the [#Acronym]", group: 0, tag: "Organization", reason: "the-acronym", safe: true }, { match: "(world|global|international|national|#Demonym) #Organization", tag: "Organization", reason: "global-org" }, { match: "#Noun+ (public|private) school", tag: "School", reason: "noun-public-school" }]), xi = xi.concat(Hi);
var Fi = [];
xi.forEach((e3) => {
  e3.reg = ji(e3.match);
  let t2 = function(e4) {
    let t3 = [];
    if (e4.reg.filter((e5) => e5.fastOr !== void 0).length === 1) {
      let r2 = e4.reg.findIndex((e5) => e5.fastOr !== void 0);
      Object.keys(e4.reg[r2].fastOr).forEach((a2) => {
        let n2 = Object.assign({}, e4);
        n2.reg = n2.reg.slice(0), n2.reg[r2] = Object.assign({}, n2.reg[r2]), n2.reg[r2].word = a2, delete n2.reg[r2].operator, delete n2.reg[r2].fastOr, t3.push(n2);
      });
    }
    return t3;
  }(e3);
  t2.length > 0 ? Fi = Fi.concat(t2) : Fi.push(e3);
}), Fi.forEach((e3) => (e3.required = function(e4) {
  let t2 = [], r2 = [];
  return e4.forEach((e5) => {
    e5.optional !== true && e5.negative !== true && (e5.tag !== void 0 && t2.push(e5.tag), e5.word !== void 0 && r2.push(e5.word));
  }), { tags: Ni(t2), words: Ni(r2) };
}(e3.reg), e3));
var Ci = Fi;
var Bi = hi;
var Gi = ci;
var zi = function(e3) {
  Ci.forEach((t2) => {
    let r2 = [];
    t2.required.words.forEach((t3) => {
      r2.push(e3._cache.words[t3] || []);
    }), t2.required.tags.forEach((t3) => {
      r2.push(e3._cache.tags[t3] || []);
    });
    let a2 = function(e4) {
      if (e4.length === 0)
        return [];
      let t3 = {};
      e4.forEach((e5) => {
        e5 = Bi(e5);
        for (let r4 = 0; r4 < e5.length; r4++)
          t3[e5[r4]] = t3[e5[r4]] || 0, t3[e5[r4]] += 1;
      });
      let r3 = Object.keys(t3);
      return r3 = r3.filter((r4) => t3[r4] === e4.length), r3 = r3.map((e5) => Number(e5)), r3;
    }(r2);
    if (a2.length === 0)
      return;
    let n2 = a2.map((t3) => e3.list[t3]), i2 = e3.buildFrom(n2).match(t2.reg, t2.group);
    i2.found && (t2.safe === true ? i2.tagSafe(t2.tag, t2.reason) : i2.tag(t2.tag, t2.reason));
  });
};
var Ii = dn;
var Oi = Gn;
var Ti = li;
var Vi = function(e3) {
  return zi(e3), Gi(e3), e3;
};
var Mi = function(e3) {
  let t2 = e3.termList();
  return e3 = Ii(e3, t2), e3 = Oi(e3, t2), (e3 = Ti(e3)).cache(), (e3 = Vi(e3)).uncache(), e3.world.taggers.forEach((t3) => {
    t3(e3);
  }), e3;
};
var Ji = function(e3) {
  class t2 extends e3 {
    stripPeriods() {
      return this.termList().forEach((e4) => {
        e4.tags.Abbreviation === true && e4.next && (e4.post = e4.post.replace(/^\./, ""));
        let t3 = e4.text.replace(/\./, "");
        e4.set(t3);
      }), this;
    }
    addPeriods() {
      return this.termList().forEach((e4) => {
        e4.post = e4.post.replace(/^\./, ""), e4.post = "." + e4.post;
      }), this;
    }
  }
  return t2.prototype.unwrap = t2.prototype.stripPeriods, e3.prototype.abbreviations = function(e4) {
    let r2 = this.match("#Abbreviation");
    return typeof e4 == "number" && (r2 = r2.get(e4)), new t2(r2.list, this, this.world);
  }, e3;
};
var Li = /\./;
var Si = function(e3) {
  class t2 extends e3 {
    stripPeriods() {
      return this.termList().forEach((e4) => {
        let t3 = e4.text.replace(/\./g, "");
        e4.set(t3);
      }), this;
    }
    addPeriods() {
      return this.termList().forEach((e4) => {
        let t3 = e4.text.replace(/\./g, "");
        t3 = t3.split("").join("."), Li.test(e4.post) === false && (t3 += "."), e4.set(t3);
      }), this;
    }
  }
  return t2.prototype.unwrap = t2.prototype.stripPeriods, t2.prototype.strip = t2.prototype.stripPeriods, e3.prototype.acronyms = function(e4) {
    let r2 = this.match("#Acronym");
    return typeof e4 == "number" && (r2 = r2.get(e4)), new t2(r2.list, this, this.world);
  }, e3;
};
var _i = function(e3) {
  return e3.prototype.clauses = function(t2) {
    let r2 = this.if("@hasComma").notIf("@hasComma @hasComma").notIf("@hasComma . .? (and|or) .").notIf("(#City && @hasComma) #Country").notIf("(#WeekDay && @hasComma) #Date").notIf("(#Date && @hasComma) #Year").notIf("@hasComma (too|also)$").match("@hasComma"), a2 = this.splitAfter(r2), n2 = a2.quotations();
    a2 = a2.splitOn(n2);
    let i2 = a2.parentheses();
    a2 = a2.splitOn(i2);
    let o2 = a2.if("#Copula #Adjective #Conjunction (#Pronoun|#Determiner) #Verb").match("#Conjunction");
    a2 = a2.splitBefore(o2);
    let s2 = a2.if("if .{2,9} then .").match("then");
    a2 = a2.splitBefore(s2), a2 = a2.splitBefore("as well as ."), a2 = a2.splitBefore("such as ."), a2 = a2.splitBefore("in addition to ."), a2 = a2.splitAfter("@hasSemicolon"), a2 = a2.splitAfter("@hasDash");
    let l2 = a2.filter((e4) => e4.wordCount() > 5 && e4.match("#Verb+").length >= 2);
    if (l2.found) {
      let e4 = l2.splitAfter("#Noun .* #Verb .* #Noun+");
      a2 = a2.splitOn(e4.eq(0));
    }
    return typeof t2 == "number" && (a2 = a2.get(t2)), new e3(a2.list, this, this.world);
  }, e3;
};
var Ki = function(e3) {
  class t2 extends e3 {
    constructor(e4, t3, r2) {
      super(e4, t3, r2), this.contracted = null;
    }
    expand() {
      return this.list.forEach((e4) => {
        let t3 = e4.terms(), r2 = t3[0].isTitleCase();
        t3.forEach((e5, r3) => {
          e5.set(e5.implicit || e5.text), e5.implicit = void 0, r3 < t3.length - 1 && e5.post === "" && (e5.post += " ");
        }), r2 && t3[0].toTitleCase();
      }), this;
    }
  }
  return e3.prototype.contractions = function(e4) {
    let r2 = this.match("@hasContraction+");
    return typeof e4 == "number" && (r2 = r2.get(e4)), new t2(r2.list, this, this.world);
  }, e3.prototype.expanded = e3.prototype.isExpanded, e3.prototype.contracted = e3.prototype.isContracted, e3;
};
var qi = function(e3) {
  const t2 = function(e4) {
    let t3 = e4.splitAfter("@hasComma").splitOn("(and|or) not?").not("(and|or) not?"), r3 = e4.match("[.] (and|or)", 0);
    return { things: t3, conjunction: e4.match("(and|or) not?"), beforeLast: r3, hasOxford: r3.has("@hasComma") };
  };
  class r2 extends e3 {
    conjunctions() {
      return this.match("(and|or)");
    }
    parts() {
      return this.splitAfter("@hasComma").splitOn("(and|or) not?");
    }
    items() {
      return t2(this).things;
    }
    add(e4) {
      return this.forEach((r3) => {
        let a2 = t2(r3).beforeLast;
        a2.append(e4), a2.termList(0).addPunctuation(",");
      }), this;
    }
    remove(e4) {
      return this.items().if(e4).remove();
    }
    hasOxfordComma() {
      return this.filter((e4) => t2(e4).hasOxford);
    }
    addOxfordComma() {
      let e4 = this.items(), t3 = e4.eq(e4.length - 2);
      return t3.found && t3.has("@hasComma") === false && t3.post(", "), this;
    }
    removeOxfordComma() {
      let e4 = this.items(), t3 = e4.eq(e4.length - 2);
      return t3.found && t3.has("@hasComma") === true && t3.post(" "), this;
    }
  }
  return r2.prototype.things = r2.prototype.items, e3.prototype.lists = function(e4) {
    let t3 = this.if("@hasComma+ .? (and|or) not? ."), a2 = t3.match("(#Noun|#Adjective|#Determiner|#Article)+ #Conjunction not? (#Article|#Determiner)? #Adjective? #Noun+").if("#Noun"), n2 = t3.match("(#Adjective|#Adverb)+ #Conjunction not? #Adverb? #Adjective+"), i2 = t3.match("(#Verb|#Adverb)+ #Conjunction not? #Adverb? #Verb+"), o2 = a2.concat(n2);
    return o2 = o2.concat(i2), o2 = o2.if("@hasComma"), typeof e4 == "number" && (o2 = t3.get(e4)), new r2(o2.list, this, this.world);
  }, e3;
};
var Wi = { hour: "an", heir: "an", heirloom: "an", honest: "an", honour: "an", honor: "an", uber: "an" };
var Ri = { a: true, e: true, f: true, h: true, i: true, l: true, m: true, n: true, o: true, r: true, s: true, x: true };
var Ui = [/^onc?e/i, /^u[bcfhjkqrstn][aeiou]/i, /^eul/i];
var Qi = { isSingular: [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i], isPlural: [/(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /men$/i, /.tia$/i, /(m|l)ice$/i] };
var Zi = /s$/;
var Xi = { he: "his", she: "hers", they: "theirs", we: "ours", i: "mine", you: "yours", her: "hers", their: "theirs", our: "ours", my: "mine", your: "yours" };
var Yi = function(e3) {
  return e3.has("#Plural") === true || e3.has("(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)") !== true;
};
var eo = function(e3) {
  if (e3.has("#Person") || e3.has("#Place"))
    return "";
  if (e3.has("#Plural"))
    return "the";
  let t2 = e3.text("normal").trim();
  if (Wi.hasOwnProperty(t2))
    return Wi[t2];
  let r2 = t2.substr(0, 1);
  if (e3.has("^@isAcronym") && Ri.hasOwnProperty(r2))
    return "an";
  for (let e4 = 0; e4 < Ui.length; e4++)
    if (Ui[e4].test(t2))
      return "a";
  return /^[aeiou]/i.test(t2) ? "an" : "a";
};
var to = function(e3) {
  return !Qi.isSingular.find((t2) => t2.test(e3)) && (Zi.test(e3) === true || (!!Qi.isPlural.find((t2) => t2.test(e3)) || null));
};
var ro = function(e3) {
  let t2 = e3.text("text").trim();
  return Xi.hasOwnProperty(t2) ? (e3.replaceWith(Xi[t2], true), void e3.tag("Possessive", "toPossessive")) : /s$/.test(t2) ? (t2 += "'", e3.replaceWith(t2, true), void e3.tag("Possessive", "toPossessive")) : (t2 += "'s", e3.replaceWith(t2, true), void e3.tag("Possessive", "toPossessive"));
};
var ao = function(e3) {
  let t2 = { main: e3 };
  if (e3.has("#Noun (of|by|for) .")) {
    let r2 = e3.splitAfter("[#Noun+]", 0);
    t2.main = r2.eq(0), t2.post = r2.eq(1);
  }
  return t2;
};
var no = { json: function(e3) {
  let t2 = null;
  typeof e3 == "number" && (t2 = e3, e3 = null), e3 = e3 || { text: true, normal: true, trim: true, terms: true };
  let r2 = [];
  return this.forEach((t3) => {
    let a2 = t3.json(e3)[0];
    a2.article = eo(t3), r2.push(a2);
  }), t2 !== null ? r2[t2] : r2;
}, adjectives: function() {
  let e3 = this.lookAhead("^(that|who|which)? (was|is|will)? be? #Adverb? #Adjective+");
  return e3 = e3.concat(this.lookBehind("#Adjective+ #Adverb?$")), e3 = e3.match("#Adjective"), e3.sort("index");
}, isPlural: function() {
  return this.if("#Plural");
}, hasPlural: function() {
  return this.filter((e3) => Yi(e3));
}, toPlural: function(e3) {
  let t2 = this.world.transforms.toPlural;
  return this.forEach((r2) => {
    if (r2.has("#Plural") || Yi(r2) === false)
      return;
    let a2 = ao(r2).main, n2 = a2.text("reduced");
    if ((a2.has("#Singular") || to(n2) !== true) && (n2 = t2(n2, this.world), a2.replace(n2).tag("#Plural"), e3)) {
      let e4 = a2.lookBefore("(an|a) #Adjective?$").not("#Adjective");
      e4.found === true && e4.remove();
    }
  }), this;
}, toSingular: function(e3) {
  let t2 = this.world.transforms.toSingular;
  return this.forEach((r2) => {
    if (r2.has("^#Singular+$") || Yi(r2) === false)
      return;
    let a2 = ao(r2).main, n2 = a2.text("reduced");
    if ((a2.has("#Plural") || to(n2) === true) && (n2 = t2(n2, this.world), a2.replace(n2).tag("#Singular"), e3)) {
      let e4 = r2, t3 = r2.lookBefore("#Adjective");
      t3.found && (e4 = t3);
      let a3 = eo(e4);
      e4.insertBefore(a3);
    }
  }), this;
}, toPossessive: function() {
  return this.forEach((e3) => {
    ro(e3);
  }), this;
} };
var io = function(e3) {
  class t2 extends e3 {
  }
  return Object.assign(t2.prototype, no), e3.prototype.nouns = function(e4, r2 = {}) {
    let a2 = this.match("(#City && @hasComma) (#Region|#Country)"), n2 = this.not(a2).splitAfter("@hasComma");
    n2 = n2.concat(a2);
    let i2 = n2.quotations();
    return i2.found && (n2 = n2.splitOn(i2.eq(0))), n2 = n2.match("#Noun+ (of|by)? the? #Noun+?"), r2.keep_anaphora !== true && (n2 = n2.not("#Pronoun"), n2 = n2.not("(there|these)"), n2 = n2.not("(#Month|#WeekDay)"), n2 = n2.not("(my|our|your|their|her|his)")), n2 = n2.not("(of|for|by|the)$"), typeof e4 == "number" && (n2 = n2.get(e4)), new t2(n2.list, this, this.world);
  }, e3;
};
var oo = /\(/;
var so = /\)/;
var lo = function(e3) {
  class t2 extends e3 {
    unwrap() {
      return this.list.forEach((e4) => {
        let t3 = e4.terms(0);
        t3.pre = t3.pre.replace(oo, "");
        let r2 = e4.lastTerm();
        r2.post = r2.post.replace(so, "");
      }), this;
    }
  }
  return e3.prototype.parentheses = function(e4) {
    let r2 = [];
    return this.list.forEach((e5) => {
      let t3 = e5.terms();
      for (let a2 = 0; a2 < t3.length; a2 += 1) {
        const n2 = t3[a2];
        if (oo.test(n2.pre)) {
          for (let i2 = a2; i2 < t3.length; i2 += 1)
            if (so.test(t3[i2].post)) {
              let t4 = i2 - a2 + 1;
              r2.push(e5.buildFrom(n2.id, t4)), a2 = i2;
              break;
            }
        }
      }
    }), typeof e4 == "number" ? (r2 = r2[e4] ? [r2[e4]] : [], new t2(r2, this, this.world)) : new t2(r2, this, this.world);
  }, e3;
};
var uo = function(e3) {
  class t2 extends e3 {
    constructor(e4, t3, r2) {
      super(e4, t3, r2), this.contracted = null;
    }
    strip() {
      return this.list.forEach((e4) => {
        e4.terms().forEach((e5) => {
          let t3 = e5.text.replace(/'s$/, "");
          e5.set(t3 || e5.text);
        });
      }), this;
    }
  }
  return e3.prototype.possessives = function(e4) {
    let r2 = this.match("#Noun+? #Possessive");
    return typeof e4 == "number" && (r2 = r2.get(e4)), new t2(r2.list, this, this.world);
  }, e3;
};
var co = { '"': '"', "\uFF02": "\uFF02", "'": "'", "\u201C": "\u201D", "\u2018": "\u2019", "\u201F": "\u201D", "\u201B": "\u2019", "\u201E": "\u201D", "\u2E42": "\u201D", "\u201A": "\u2019", "\xAB": "\xBB", "\u2039": "\u203A", "\u2035": "\u2032", "\u2036": "\u2033", "\u2037": "\u2034", "\u301D": "\u301E", "`": "\xB4", "\u301F": "\u301E" };
var ho = RegExp("(" + Object.keys(co).join("|") + ")");
var go = function(e3) {
  class t2 extends e3 {
    unwrap() {
      return this;
    }
  }
  return e3.prototype.quotations = function(e4) {
    let r2 = [];
    return this.list.forEach((e5) => {
      let t3 = e5.terms();
      for (let a2 = 0; a2 < t3.length; a2 += 1) {
        const n2 = t3[a2];
        if (ho.test(n2.pre)) {
          let i2 = (n2.pre.match(ho) || [])[0], o2 = co[i2];
          for (let i3 = a2; i3 < t3.length; i3 += 1)
            if (t3[i3].post.indexOf(o2) !== -1) {
              let t4 = i3 - a2 + 1;
              r2.push(e5.buildFrom(n2.id, t4)), a2 = i3;
              break;
            }
        }
      }
    }), typeof e4 == "number" ? (r2 = r2[e4] ? [r2[e4]] : [], new t2(r2, this, this.world)) : new t2(r2, this, this.world);
  }, e3.prototype.quotes = e3.prototype.quotations, e3;
};
var po = function(e3, t2) {
  let r2 = e3.verb, a2 = r2.text("reduced");
  if (r2.has("#Infinitive"))
    return a2;
  let n2 = null;
  return r2.has("#PastTense") ? n2 = "PastTense" : r2.has("#Gerund") ? n2 = "Gerund" : r2.has("#PresentTense") ? n2 = "PresentTense" : r2.has("#Participle") ? n2 = "Participle" : r2.has("#Actor") && (n2 = "Actor"), t2.transforms.toInfinitive(a2, t2, n2);
};
var mo = function(e3) {
  let t2 = e3.verb;
  if (t2.has("(are|were|does)") || e3.auxiliary.has("(are|were|does)"))
    return true;
  let r2 = function(e4) {
    return e4.lookBehind("#Noun+").last();
  }(t2);
  return !r2.has("(he|she|many|both)") && (!!r2.has("(we|they|you|i)") || !r2.has("#Person") && (!!r2.has("#Plural") || !r2.has("#Singular") && (!t2.has("(is|am|do|was)") && (!(e3.auxiliary.has("(is|am|do|was)") && !e3.negative.found) && null))));
};
var fo = po;
var bo = mo;
var yo = function(e3) {
  let t2 = e3.lookBehind(), r2 = t2.nouns(null, { keep_anaphora: true }).last();
  return r2.found || (r2 = t2.match("(that|this|each)").last(), r2 = r2.tag("#Noun").nouns()), r2;
};
var vo = yo;
var wo = mo;
var ko = po;
var Ao = (e3) => {
  let t2 = false, r2 = wo(e3), a2 = e3.negative.found;
  e3.verb.lookBehind("i (#Adverb|#Verb)?$").found && (t2 = true);
  let n2 = { PastTense: "was", PresentTense: "is", FutureTense: "will be", Infinitive: "is", Gerund: "being", Actor: "", PerfectTense: "been", Pluperfect: "been" };
  return r2 && (n2.PastTense = "were", n2.PresentTense = "are", n2.Infinitive = "are"), t2 === true && (n2.PastTense = "was", n2.PresentTense = "am", n2.Infinitive = "am"), a2 && (n2.PastTense += " not", n2.PresentTense += " not", n2.FutureTense = "will not be", n2.Infinitive += " not", n2.PerfectTense = "not " + n2.PerfectTense, n2.Pluperfect = "not " + n2.Pluperfect, n2.Gerund = "not " + n2.Gerund), n2;
};
var Do = function(e3) {
  let t2 = e3.verb.text();
  return { PastTense: t2 + " have", PresentTense: t2, FutureTense: t2, Infinitive: t2 };
};
var $o = mo;
var Po = function(e3, t2) {
  let r2 = e3.verb;
  if (r2.has("#Copula") || r2.out("normal") === "be" && e3.auxiliary.has("will"))
    return Ao(e3);
  if (e3.auxiliary.has("are") && r2.has("#Gerund")) {
    let r3 = e3.original.clone(), a3 = r3.clone().replace("are", "were"), n3 = r3.clone().replace("are", "will be"), i3 = ko(e3, t2);
    return { PastTense: a3.text(), PresentTense: r3.text(), FutureTense: n3.text(), Infinitive: i3 };
  }
  if (r2.has("#Modal"))
    return Do(e3);
  let a2 = ko(e3, t2);
  if (!a2)
    return {};
  let n2 = t2.transforms.conjugate(a2, t2);
  n2.Infinitive = a2;
  let i2 = $o(e3);
  i2 === true && (n2.PresentTense = n2.Infinitive);
  let o2 = e3.verb.termList(0).hasHyphen();
  if (e3.particle.found) {
    let t3 = e3.particle.text(), r3 = o2 === true ? "-" : " ";
    Object.keys(n2).forEach((e4) => n2[e4] += r3 + t3);
  }
  const s2 = e3.negative.found;
  return n2.FutureTense = n2.FutureTense || "will " + n2.Infinitive, s2 && (n2.PastTense = "did not " + n2.Infinitive, n2.FutureTense = "will not " + n2.Infinitive, i2 ? (n2.PresentTense = "do not " + n2.Infinitive, n2.Infinitive = "do not " + n2.Infinitive) : (n2.PresentTense = "does not " + n2.Infinitive, n2.Infinitive = "does not " + n2.Infinitive), n2.Gerund = "not " + n2.Gerund), n2;
};
var Eo = Po;
var Ho = { useParticiple: function(e3) {
  return !!e3.auxiliary.has("(could|should|would|may|can|must)") || (!!e3.auxiliary.has("am .+? being") || !!e3.auxiliary.has("had .+? been"));
}, toParticiple: function(e3, t2) {
  if (e3.auxiliary.has("(have|had)") && e3.verb.has("#Participle"))
    return;
  let r2 = Eo(e3, t2), a2 = r2.Participle || r2.PastTense;
  a2 && e3.verb.replaceWith(a2, false), e3.auxiliary.has("am .+? being") && (e3.auxiliary.remove("am"), e3.auxiliary.replace("being", "have been")), e3.auxiliary.has("have") || e3.auxiliary.append("have"), e3.verb.tag("Participle", "toParticiple"), e3.auxiliary.replace("can", "could"), e3.auxiliary.replace("be have", "have been"), e3.auxiliary.replace("not have", "have not"), e3.auxiliary.tag("Auxiliary");
} };
var jo = function(e3, t2) {
  let r2 = e3.verb;
  if (!e3.negative.found) {
    if (e3.auxiliary.found)
      return e3.auxiliary.eq(0).append("not"), void (e3.auxiliary.has("#Modal have not") && e3.auxiliary.replace("have not", "not have"));
    if (r2.has("(#Copula|will|has|had|do)"))
      r2.append("not");
    else {
      if (r2.has("#PastTense")) {
        let a2 = fo(e3, t2);
        return r2.replaceWith(a2, true), void r2.prepend("did not");
      }
      if (r2.has("#PresentTense")) {
        let a2 = fo(e3, t2);
        return r2.replaceWith(a2, true), void (bo(e3) ? r2.prepend("do not") : r2.prepend("does not"));
      }
      if (r2.has("#Gerund")) {
        let a2 = fo(e3, t2);
        return r2.replaceWith(a2, true), void r2.prepend("not");
      }
      bo(e3) ? r2.prepend("does not") : r2.prepend("do not");
    }
  }
};
var No = function(e3) {
  let t2 = { adverb: e3.match("#Adverb+"), negative: e3.match("#Negative"), auxiliary: e3.match("#Auxiliary+").not("(#Negative|#Adverb)"), particle: e3.match("#Particle"), verb: e3.match("#Verb+").not("(#Adverb|#Negative|#Auxiliary|#Particle)"), original: e3, subject: vo(e3) };
  if (t2.verb.has("(#PresentTense|#PastTense|#Infinitive) #Gerund$") && (t2.verb = t2.verb.not("#Gerund$")), !t2.verb.found)
    return Object.keys(t2).forEach((e4) => {
      t2[e4] = t2[e4].not(".");
    }), t2.verb = e3, t2;
  if (t2.adverb && t2.adverb.found) {
    let r2 = t2.adverb.text("reduced") + "$";
    e3.has(r2) && (t2.adverbAfter = true);
  }
  return t2;
};
var xo = mo;
var Fo = yo;
var Co = Po;
var { toParticiple: Bo, useParticiple: Go } = Ho;
var zo = function(e3) {
  return e3.auxiliary.remove("(will|are|am|being)"), e3.auxiliary.remove("(did|does)"), e3.auxiliary.remove("(had|has|have)"), e3.particle.remove(), e3.negative.remove(), e3;
};
var Io = { json: function(e3) {
  let t2 = null;
  typeof e3 == "number" && (t2 = e3, e3 = null), e3 = e3 || { text: true, normal: true, trim: true, terms: true };
  let r2 = [];
  return this.forEach((t3) => {
    let a2 = t3.json(e3)[0], n2 = No(t3);
    a2.parts = {}, Object.keys(n2).forEach((e4) => {
      n2[e4] && n2[e4].isA === "Doc" ? a2.parts[e4] = n2[e4].text("normal") : a2.parts[e4] = n2[e4];
    }), a2.isNegative = t3.has("#Negative"), a2.conjugations = Co(n2, this.world), r2.push(a2);
  }), t2 !== null ? r2[t2] : r2;
}, adverbs: function() {
  let e3 = [];
  this.forEach((t3) => {
    let r2 = No(t3).adverb;
    r2.found && (e3 = e3.concat(r2.list));
  });
  let t2 = this.lookBehind("#Adverb+$");
  return t2.found && (e3 = t2.list.concat(e3)), t2 = this.lookAhead("^#Adverb+"), t2.found && (e3 = e3.concat(t2.list)), this.buildFrom(e3);
}, isPlural: function() {
  let e3 = [];
  return this.forEach((t2) => {
    let r2 = No(t2);
    xo(r2, this.world) === true && e3.push(t2.list[0]);
  }), this.buildFrom(e3);
}, isSingular: function() {
  let e3 = [];
  return this.forEach((t2) => {
    let r2 = No(t2);
    xo(r2, this.world) === false && e3.push(t2.list[0]);
  }), this.buildFrom(e3);
}, conjugate: function() {
  let e3 = [];
  return this.forEach((t2) => {
    let r2 = No(t2), a2 = Co(r2, this.world);
    e3.push(a2);
  }), e3;
}, toPastTense: function() {
  return this.forEach((e3) => {
    let t2 = No(e3);
    if (Go(t2))
      return void Bo(t2, this.world);
    if (e3.has("#Imperative"))
      return;
    if (e3.has("be") && e3.lookBehind("to$").found)
      return;
    if (t2.verb.has("#Gerund") && t2.auxiliary.has("(is|will|was)"))
      return void e3.replace("is", "was");
    let r2 = Co(t2, this.world).PastTense;
    r2 && (t2 = zo(t2), t2.verb.replaceWith(r2, false), t2.auxiliary.remove("(do|did|will)"));
  }), this;
}, toPresentTense: function() {
  return this.forEach((e3) => {
    if (e3.has("#Imperative"))
      return;
    let t2 = No(e3), r2 = Co(t2, this.world), a2 = r2.PresentTense;
    if (e3.lookBehind("(i|we) (#Adverb|#Verb)?$").found && (a2 = r2.Infinitive), a2) {
      if (t2.auxiliary.has("(have|had) been"))
        return t2.auxiliary.replace("(have|had) been", "am being"), void (r2.Particle && (a2 = r2.Particle || r2.PastTense));
      t2.verb.replaceWith(a2, false), t2.verb.tag("PresentTense"), t2 = zo(t2), t2.auxiliary.remove("#Modal"), t2.auxiliary.remove("(do|did|will)");
    }
  }), this;
}, toFutureTense: function() {
  return this.forEach((e3) => {
    let t2 = No(e3);
    if (Go(t2))
      return;
    if (e3.has("#Imperative"))
      return;
    let r2 = Co(t2, this.world).FutureTense;
    r2 && (t2 = zo(t2), t2.auxiliary.remove("#Modal"), t2.verb.replaceWith(r2, false), t2.verb.tag("FutureTense"), t2.auxiliary.remove("(do|did|will)"));
  }), this;
}, toInfinitive: function() {
  return this.forEach((e3) => {
    let t2 = No(e3), r2 = Co(t2, this.world).Infinitive;
    r2 && (e3.replaceWith(r2, false), e3.tag("Infinitive"));
  }), this;
}, toGerund: function() {
  return this.forEach((e3) => {
    let t2 = No(e3), r2 = Co(t2, this.world).Gerund;
    r2 && (e3.replaceWith(r2, false), e3.tag("Gerund"));
  }), this;
}, toParticiple: function() {
  return this.forEach((e3) => {
    let t2 = No(e3), r2 = !t2.auxiliary.found;
    Bo(t2, this.world), r2 && (t2.verb.prepend(t2.auxiliary.text()), t2.auxiliary.remove());
  }), this;
}, isNegative: function() {
  return this.if("#Negative");
}, isPositive: function() {
  return this.ifNo("#Negative");
}, isImperative: function() {
  return this.if("#Imperative");
}, toNegative: function() {
  return this.list.forEach((e3) => {
    let t2 = this.buildFrom([e3]), r2 = No(t2);
    jo(r2, t2.world);
  }), this;
}, toPositive: function() {
  let e3 = this.match("do not #Verb");
  return e3.found && e3.remove("do not"), this.remove("#Negative");
}, subject: function() {
  let e3 = [];
  return this.forEach((t2) => {
    let r2 = Fo(t2);
    r2.list[0] && e3.push(r2.list[0]);
  }), this.buildFrom(e3);
} };
var Oo = Ia;
var To = [Ji, Si, _i, Ki, qi, io, lo, uo, go, function(e3) {
  class t2 extends e3 {
  }
  return Object.assign(t2.prototype, Io), t2.prototype.negate = t2.prototype.toNegative, e3.prototype.verbs = function(e4) {
    let r2 = this.match("(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+");
    r2 = r2.not("^#Adverb+"), r2 = r2.not("#Adverb+$");
    let a2 = r2.match("(#Adverb && @hasComma) #Adverb"), n2 = r2.not(a2).splitAfter("@hasComma");
    return n2 = n2.concat(a2), n2.sort("index"), n2 = n2.if("#Verb"), n2.has("(is|was)$") && (n2 = n2.splitBefore("(is|was)$")), n2.has("#PresentTense #Adverb #PresentTense") && (n2 = n2.splitBefore("#Adverb #PresentTense")), typeof e4 == "number" && (n2 = n2.get(e4)), new t2(n2.list, this, this.world);
  }, e3;
}, function(e3) {
  class t2 extends e3 {
  }
  return e3.prototype.people = function(e4) {
    let r2 = this.splitAfter("@hasComma");
    return r2 = r2.match("#Person+"), typeof e4 == "number" && (r2 = r2.get(e4)), new t2(r2.list, this, this.world);
  }, e3;
}];
var Vo = { misc: Ga, selections: Ia };
var Mo = Mi;
var Jo = xt;
var Lo = function(e3) {
  return Object.keys(Oo).forEach((t2) => e3.prototype[t2] = Oo[t2]), To.forEach((t2) => t2(e3)), e3;
};
var So = class {
  constructor(e3, t2, r2) {
    this.list = e3, Object.defineProperty(this, "from", { enumerable: false, value: t2, writable: true }), r2 === void 0 && t2 !== void 0 && (r2 = t2.world), Object.defineProperty(this, "world", { enumerable: false, value: r2, writable: true }), Object.defineProperty(this, "_cache", { enumerable: false, writable: true, value: {} }), Object.defineProperty(this, "found", { get: () => this.list.length > 0 }), Object.defineProperty(this, "length", { get: () => this.list.length }), Object.defineProperty(this, "isA", { get: () => "Doc" });
  }
  tagger() {
    return Mo(this);
  }
  pool() {
    return this.list.length > 0 ? this.list[0].pool : this.all().list[0].pool;
  }
};
So.prototype.buildFrom = function(e3) {
  return e3 = e3.map((e4) => e4.clone(true)), new So(e3, this, this.world);
}, So.prototype.fromText = function(e3) {
  let t2 = Jo(e3, this.world, this.pool());
  return this.buildFrom(t2);
}, Object.assign(So.prototype, Vo.misc), Object.assign(So.prototype, Vo.selections), Lo(So);
var _o = { untag: "unTag", and: "match", notIf: "ifNo", only: "if", onlyIf: "if" };
Object.keys(_o).forEach((e3) => So.prototype[e3] = So.prototype[_o[e3]]);
var Ko = Va;
var qo = xt;
var Wo = zt;
var Ro = So;
var Uo = nt;
var Qo = ne;
var Zo = ot;
var Xo = function(e3) {
  let t2 = e3.termList();
  return Ko(t2, e3.world), e3.world.taggers.forEach((t3) => {
    t3(e3);
  }), e3;
};
var Yo = _e;
var es = function e2(t2) {
  let r2 = t2;
  const a2 = function(e3 = "", t3) {
    t3 && r2.addWords(t3);
    let a3 = qo(e3, r2), n2 = new Ro(a3, null, r2);
    return n2.tagger(), n2;
  };
  return a2.tokenize = function(e3 = "", t3) {
    let a3 = r2;
    t3 && (a3 = a3.clone(), a3.words = {}, a3.addWords(t3));
    let n2 = qo(e3, a3), i2 = new Ro(n2, null, a3);
    return (t3 || i2.world.taggers.length > 0) && Xo(i2), i2;
  }, a2.extend = function(e3) {
    return e3(Ro, r2, this, Uo, Qo, Zo), this;
  }, a2.fromJSON = function(e3) {
    let t3 = Wo(e3, r2);
    return new Ro(t3, null, r2);
  }, a2.clone = function() {
    return e2(r2.clone());
  }, a2.verbose = function(e3 = true) {
    return r2.verbose(e3), this;
  }, a2.world = function() {
    return r2;
  }, a2.parseMatch = function(e3, t3) {
    return Yo(e3, t3);
  }, a2.version = "13.11.4", a2.import = a2.load, a2.plugin = a2.extend, a2;
}(new Rr());
var compromise_default = es;

// hw1/server/index.ts
var import_fs = __toModule(require("fs"));

// node_modules/koa/dist/koa.mjs
var import_application = __toModule(require_application());
var koa_default = import_application.default;
var HttpError = import_application.default.HttpError;

// hw1/server/index.ts
var import_koa_router = __toModule(require_router());
var import_xml2js = __toModule(require_xml2js());

// hw1/server/idx_table.ts
compromise_default.extend(require_compromise_sentences());
var genIdxTable = (docs2) => {
  for (let doc of docs2) {
    let docSentences = doc.content.reduce((prev, paragraph) => {
      return [
        ...prev,
        ...compromise_default(paragraph).sentences().json().map((sentence) => sentence["text"])
      ];
    }, []);
    console.log(docSentences);
  }
};

// hw1/server/utils.ts
compromise_default.extend(require_compromise_sentences());
var getDocInfo = (content) => {
  let charNum = content.reduce((prev, paragraph) => prev + paragraph.length, 0);
  let sentences = content.reduce((prev, paragraph) => {
    return [
      ...prev,
      ...compromise_default(paragraph).sentences().json().map((sentence) => sentence["text"])
    ];
  }, []);
  let sentenceNum = sentences.length;
  let wordNum = sentences.reduce((prev, sentence) => prev + sentence.split(" ").length, 0);
  return { charNum, wordNum, sentenceNum };
};

// hw1/server/index.ts
compromise_default.extend(require_compromise_sentences());
var xmlParser = new import_xml2js.Parser({ explicitArray: false });
var datasName = import_fs.default.readdirSync(`${__dirname}/.data/`);
var cached = false;
var docs;
if (!cached) {
  docs = datasName.reduce((prev, dataName) => {
    switch (dataName.split(".").at(-1)) {
      case "json": {
        let data = JSON.parse(import_fs.default.readFileSync(`${__dirname}/.data/${dataName}`, "utf8"));
        return [
          ...prev,
          ...data.map(({ tweet_text }) => ({
            title: "",
            content: [tweet_text],
            docInfo: getDocInfo([tweet_text])
          }))
        ];
      }
      case "xml": {
        let data;
        xmlParser.parseString(import_fs.default.readFileSync(`${__dirname}/.data/${dataName}`, "utf8"), (err, result) => {
          data = result;
        });
        return [
          ...prev,
          ...data["PubmedArticleSet"]["PubmedArticle"].map(({ MedlineCitation }) => {
            let article = MedlineCitation["Article"];
            let abstrsctText = article?.["Abstract"]?.["AbstractText"];
            let content = [];
            if (typeof abstrsctText == "object") {
              content = abstrsctText.map(({ _: _2 }) => _2);
            } else if (typeof abstrsctText == "string") {
              content = [abstrsctText];
            }
            let docInfo = getDocInfo(content);
            return {
              title: MedlineCitation["Article"]["ArticleTitle"],
              content,
              ...docInfo
            };
          })
        ];
      }
      default: {
        return prev;
      }
    }
  }, []);
  let idxTable = genIdxTable(docs);
  import_fs.default.writeFileSync(`${__dirname}/.data/.cache`, JSON.stringify(docs));
} else {
  docs = JSON.parse(import_fs.default.readFileSync(`${__dirname}/.data/.cache`, "utf8"));
}
var app = new koa_default();
var router = new import_koa_router.default();
router.get("/", (ctx, next) => {
  let path = ctx.params["path"];
  let data = import_fs.default.readFileSync(`${__dirname}/client/index.html`, "utf8");
  ctx.body = data;
}).get("/src/:path", (ctx, next) => {
  let path = ctx.params["path"];
  let data = import_fs.default.readFileSync(`${__dirname}/client/src/${path}`, "utf8");
  ctx.body = data;
}).get("/keyWord/:keyWord", (ctx, next) => {
  let keyWord = ctx.params["keyWord"];
  ctx.body = `search doc\uFF1A${keyWord}`;
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(3e3);
/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * content-disposition
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * cookies
 * Copyright(c) 2014 Jed Schmidt, http://jed.is/
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * depd
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * depd
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * depd
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * destroy
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
/*!
 * encodeurl
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * keygrip
 * Copyright(c) 2011-2014 Jed Schmidt
 * MIT Licensed
 */
/*!
 * media-typer
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * parseurl
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * type-is
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
