"use strict";

require("core-js/modules/es6.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = exports.parse = exports.stringify = exports.logError = exports.wrapPromiseWithCache = exports.wrapError = exports.invokeWithErrorCatch = void 0;

// 捕获错误用
var invokeWithErrorCatch = function invokeWithErrorCatch(_ref) {
  var _ref$fn = _ref.fn,
      fn = _ref$fn === void 0 ? noop : _ref$fn,
      _ref$errorHandler = _ref.errorHandler,
      errorHandler = _ref$errorHandler === void 0 ? noop : _ref$errorHandler,
      _ref$log = _ref.log,
      log = _ref$log === void 0 ? true : _ref$log;

  try {
    return fn();
  } catch (err) {
    log && logError(err);
    return errorHandler && typeof errorHandler === 'function' && errorHandler(err);
  }
}; // 返回包裹过错误处理的函数


exports.invokeWithErrorCatch = invokeWithErrorCatch;

var wrapError = function wrapError(_fn) {
  return function wrappedFn() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return invokeWithErrorCatch({
      fn: function fn() {
        return _fn.call.apply(_fn, [_this].concat(args));
      }
    });
  };
}; // 用于捕获promise中出现的错误


exports.wrapError = wrapError;

var wrapPromiseWithCache = function wrapPromiseWithCache(_fn2) {
  return function wrappedPromise() {
    var _this2 = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return invokeWithErrorCatch({
      fn: function fn() {
        return _fn2.call.apply(_fn2, [_this2].concat(args))["catch"](function (err) {
          return logError(err);
        });
      }
    });
  };
};

exports.wrapPromiseWithCache = wrapPromiseWithCache;

var logError = function logError(err) {
  if (process.env.NODE_ENV === 'development') {
    console.error("(DEV ONLY)\n".concat(err));
  } else {
    console.warn("(logError)\n".concat(err));
  }
};

exports.logError = logError;

var stringify = function stringify(val) {
  return invokeWithErrorCatch({
    fn: function fn() {
      return JSON.stringify(val);
    }
  });
};

exports.stringify = stringify;

var parse = function parse(val) {
  return invokeWithErrorCatch({
    fn: function fn() {
      return JSON.parse(val);
    }
  });
};

exports.parse = parse;

var noop = function noop() {};

exports.noop = noop;