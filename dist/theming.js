"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = exports.createTheming = exports.ThemeProvider = void 0;

var _vue = require("vue");

var _tinyWarning = _interopRequireDefault(require("tiny-warning"));

var _isObject = _interopRequireDefault(require("./utils/is-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultTheme = {};

var createTheming = function createTheming(contextKey, defaultTheme) {
  var ThemeProvider = (0, _vue.defineComponent)({
    props: {
      theme: {
        type: Object,
        required: true
      } // children: {} as any

    },
    setup: function setup(props, _ref) {
      var slots = _ref.slots;
      var outerTheme = (0, _vue.inject)(contextKey, undefined);
      var theme = (0, _vue.computed)(function () {
        var pt = props.theme;
        var theme;

        if (typeof pt === 'function') {
          theme = pt(outerTheme);
          (0, _tinyWarning["default"])((0, _isObject["default"])(theme), '[ThemeProvider] Please return an object from your theme function');
        } else {
          theme = outerTheme && outerTheme['value'] ? _objectSpread(_objectSpread({}, outerTheme['value']), pt) : pt;
          (0, _tinyWarning["default"])((0, _isObject["default"])(theme), '[ThemeProvider] Please make your theme prop a plain object');
        }

        return theme;
      });
      (0, _vue.provide)(contextKey, theme);
      return function () {
        return slots["default"] && slots["default"]();
      };
    }
  });

  var useTheme = function useTheme() {
    var theme = (0, _vue.inject)(contextKey, (0, _vue.ref)(defaultTheme));
    return theme;
  };

  return {
    ThemeProvider: ThemeProvider,
    useTheme: useTheme,
    contextKey: contextKey
  };
};

exports.createTheming = createTheming;

var _createTheming = createTheming('__vue_jss_provide_key__', defaultTheme),
    ThemeProvider = _createTheming.ThemeProvider,
    useTheme = _createTheming.useTheme;

exports.useTheme = useTheme;
exports.ThemeProvider = ThemeProvider;