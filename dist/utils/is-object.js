"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isObject;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object' && !Array.isArray(obj);
}