"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDynamicRules = exports.removeDynamicRules = exports.createStyleSheet = exports.addDynamicRules = void 0;

var _tinyWarning = _interopRequireDefault(require("tiny-warning"));

var _jss = require("jss");

var _managers = require("./managers");

var _jss2 = _interopRequireDefault(require("../jss"));

var _sheetsMeta = require("./sheetsMeta");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getStyles = function getStyles(options) {
  var styles = options.styles;

  if (typeof styles !== 'function') {
    return styles;
  }

  (0, _tinyWarning["default"])(styles.length !== 0, "[JSS] <".concat(options.name || 'Hook', " />'s styles function doesn't rely on the \"theme\" argument. We recommend declaring styles as an object instead."));
  return styles(options.theme);
};

function getSheetOptions(options, link) {
  var minify;

  if (options.context.id && options.context.id.minify != null) {
    minify = options.context.id.minify;
  }

  var classNamePrefix = options.context.classNamePrefix || '';

  if (options.name && !minify) {
    classNamePrefix += "".concat(options.name.replace(/\s/g, '-'), "-");
  }

  var meta = '';
  if (options.name) meta = "".concat(options.name, ", ");
  meta += typeof options.styles === 'function' ? 'Themed' : 'Unthemed';
  return _objectSpread(_objectSpread({}, options.sheetOptions), {}, {
    index: options.index,
    meta: meta,
    classNamePrefix: classNamePrefix,
    link: link,
    generateId: options.sheetOptions.generateId || options.context.generateId
  });
}

var createStyleSheet = function createStyleSheet(options) {
  if (options.context.disableStylesGeneration) {
    return undefined;
  }

  var manager = (0, _managers.getManager)(options.context, options.index);
  var existingSheet = manager.get(options.theme);

  if (existingSheet) {
    return existingSheet;
  }

  var jss = options.context.jss || _jss2["default"];
  var styles = getStyles(options);
  var dynamicStyles = (0, _jss.getDynamicStyles)(styles);
  var sheet = jss.createStyleSheet(styles, getSheetOptions(options, dynamicStyles !== null));
  (0, _sheetsMeta.addMeta)(sheet, {
    dynamicStyles: dynamicStyles,
    styles: styles
  });
  manager.add(options.theme, sheet);
  return sheet;
};

exports.createStyleSheet = createStyleSheet;

var removeDynamicRules = function removeDynamicRules(sheet, rules) {
  // Loop over each dynamic rule and remove the dynamic rule
  // We can't just remove the whole sheet as this has all of the rules for every component instance
  for (var key in rules) {
    sheet.deleteRule(rules[key]);
  }
};

exports.removeDynamicRules = removeDynamicRules;

var updateDynamicRules = function updateDynamicRules(data, sheet, rules) {
  // Loop over each dynamic rule and update it
  // We can't just update the whole sheet as this has all of the rules for every component instance
  for (var key in rules) {
    ;
    sheet.updateOne(rules[key], data);
  } // sheet.update(data)

};

exports.updateDynamicRules = updateDynamicRules;

var addDynamicRules = function addDynamicRules( // StyleSheet does not contain rules
sheet, data) {
  var meta = (0, _sheetsMeta.getMeta)(sheet);

  if (!meta) {
    return null;
  }

  var rules = {}; // Loop over each dynamic rule and add it to the stylesheet

  for (var key in meta.dynamicStyles) {
    var initialRuleCount = sheet.rules.index.length;
    var originalRule = sheet.addRule(key, meta.dynamicStyles[key]); // Loop through all created rules, fixes updating dynamic rules

    for (var i = initialRuleCount; i < sheet.rules.index.length; i++) {
      var rule = sheet.rules.index[i];
      sheet.updateOne(rule, data); // If it's the original rule, we need to add it by the correct key so the hook and hoc
      // can correctly concat the dynamic class with the static one

      rules[originalRule === rule ? key : rule.key] = rule;
    }
  }

  return rules;
};

exports.addDynamicRules = addDynamicRules;