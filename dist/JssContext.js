"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultContextValue = exports["default"] = void 0;
exports.injectJssContext = injectJssContext;

var _vue = require("vue");

// const JssContext: Context<JssContextValue> = React.createContext({
//   classNamePrefix: '',
//   disableStylesGeneration: false
// })
var defaultContextValue = {
  classNamePrefix: '',
  disableStylesGeneration: false
}; // export default JssContext

exports.defaultContextValue = defaultContextValue;
var JssContext = Symbol();

function injectJssContext() {
  return (0, _vue.inject)(JssContext, (0, _vue.ref)(defaultContextValue));
}

var _default = JssContext;
exports["default"] = _default;