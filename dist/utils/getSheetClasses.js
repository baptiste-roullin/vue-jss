"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sheetsMeta = require("./sheetsMeta");

var getSheetClasses = function getSheetClasses(sheet, dynamicRules) {
  if (!dynamicRules) {
    return sheet.classes;
  }

  var classes = {};
  var meta = (0, _sheetsMeta.getMeta)(sheet);

  if (!meta) {
    return sheet.classes;
  }

  for (var key in meta.styles) {
    classes[key] = sheet.classes[key];

    if (key in dynamicRules) {
      classes[key] += " ".concat(sheet.classes[dynamicRules[key].key]);
    }
  }

  return classes;
};

var _default = getSheetClasses;
exports["default"] = _default;