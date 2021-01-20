"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.noop = exports.parse = exports.stringify = exports.logError = exports.wrapPromiseWithCache = exports.wrapError = exports.invokeWithErrorCatch = void 0;
// 捕获错误用
var invokeWithErrorCatch = function (_a) {
    var _b = _a.fn, fn = _b === void 0 ? exports.noop : _b, _c = _a.errorHandler, errorHandler = _c === void 0 ? exports.noop : _c, _d = _a.log, log = _d === void 0 ? true : _d;
    try {
        return fn();
    }
    catch (err) {
        log && exports.logError(err);
        return errorHandler && typeof handler === 'function' && handler(err);
    }
};
exports.invokeWithErrorCatch = invokeWithErrorCatch;
// 返回包裹过错误处理的函数
var wrapError = function (fn) {
    return function wrappedFn() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return exports.invokeWithErrorCatch({ fn: function () { return fn.call.apply(fn, __spreadArrays([_this], args)); } });
    };
};
exports.wrapError = wrapError;
// 用于捕获promise中出现的错误
var wrapPromiseWithCache = function (fn) {
    return function wrappedPromise() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return exports.invokeWithErrorCatch({ fn: function () { return fn.call.apply(fn, __spreadArrays([_this], args))["catch"](function (err) { return exports.logError(err); }); } });
    };
};
exports.wrapPromiseWithCache = wrapPromiseWithCache;
var logError = function (err) {
    if (process.env.NODE_ENV === 'development') {
        console.error("(DEV ONLY)\n" + err);
    }
    else {
        console.warn("(logError)\n" + err);
    }
};
exports.logError = logError;
var stringify = function (val) { return exports.invokeWithErrorCatch({ fn: function () { return JSON.stringify(val); } }); };
exports.stringify = stringify;
var parse = function (val) { return exports.invokeWithErrorCatch({ fn: function () { return JSON.parse(val); } }); };
exports.parse = parse;
var noop = function () { };
exports.noop = noop;
