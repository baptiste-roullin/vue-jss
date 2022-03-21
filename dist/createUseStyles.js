"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _JssContext = require("./JssContext");

var _sheets = require("./utils/sheets");

var _getSheetIndex = _interopRequireDefault(require("./utils/getSheetIndex"));

var _managers = require("./utils/managers");

var _getSheetClasses = _interopRequireDefault(require("./utils/getSheetClasses"));

var _theming = require("./theming");

var _excluded = ["index", "theming", "name"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// export function createUseStyles<
//   Theme = DefaultTheme,
//   C extends string = string
// >(
//   styles: Styles<C> | ((theme: Theme) => Styles<C>),
//   options?: CreateUseStylesOptions<Theme>,
// ): (data?: unknown) => Classes<C>
function createUseStyles(styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _options$index = options.index,
      index = _options$index === void 0 ? (0, _getSheetIndex["default"])() : _options$index,
      theming = options.theming,
      name = options.name,
      sheetOptions = _objectWithoutProperties(options, _excluded);

  var useTheme = typeof styles === 'function' ? theming ? theming.useTheme : _theming.useTheme : _theming.useTheme;
  return function useStyles(data) {
    var theme = useTheme();
    var context = (0, _JssContext.injectJssContext)();
    /**
     * !important
     * 这里必须使用 shallowRef，默认的 `ref.value` 返回的是一个proxy
     * 在存储meta的时候存的是 StyleSheet 对象，但是我们那proxy去取就会导致取不到
     */

    var sheet = (0, _vue.shallowRef)();
    var dynamicRules = (0, _vue.shallowRef)(null);
    (0, _vue.watch)([context, theme], function (_ref, _ref2) {
      var _ref3 = _slicedToArray(_ref, 2),
          c = _ref3[0],
          t = _ref3[1];

      var _ref4 = _slicedToArray(_ref2, 2),
          pc = _ref4[0],
          pt = _ref4[1];

      var sheetInstance = (0, _sheets.createStyleSheet)({
        context: context.value,
        styles: styles,
        name: name,
        theme: theme.value,
        index: index,
        sheetOptions: sheetOptions
      });

      if (sheet.value && sheetInstance !== sheet.value) {
        (0, _managers.unmanageSheet)({
          index: index,
          context: pc,
          sheet: sheet.value,
          theme: pt
        });

        if (sheet.value && dynamicRules.value) {
          (0, _sheets.removeDynamicRules)(sheet.value, dynamicRules.value);
        }
      }

      var dys = sheetInstance ? (0, _sheets.addDynamicRules)(sheetInstance, (0, _vue.isRef)(data) ? data.value : data) : null; // console.log(dys)

      if (sheetInstance) {
        (0, _managers.manageSheet)({
          index: index,
          context: context.value,
          sheet: sheetInstance,
          theme: theme.value
        });
      }

      sheet.value = sheetInstance;
      dynamicRules.value = dys;
    }, {
      immediate: true
    });
    (0, _vue.watchEffect)(function () {
      if (sheet.value && dynamicRules.value) {
        (0, _sheets.updateDynamicRules)((0, _vue.isRef)(data) ? data.value : data, sheet.value, dynamicRules.value);
      }
    });
    var classes = (0, _vue.computed)(function () {
      return sheet.value && dynamicRules.value ? (0, _getSheetClasses["default"])(sheet.value, dynamicRules.value) : {};
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (sheet) {
        (0, _managers.unmanageSheet)({
          index: index,
          context: context.value,
          sheet: sheet.value,
          theme: theme.value
        });
      }

      if (sheet.value && dynamicRules.value) {
        (0, _sheets.removeDynamicRules)(sheet.value, dynamicRules.value);
      }
    });
    return classes;
  };
}

var _default = createUseStyles;
exports["default"] = _default;