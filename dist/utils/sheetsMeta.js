"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeta = exports.addMeta = void 0;
var sheetsMeta = new WeakMap();

var getMeta = function getMeta(sheet) {
  return sheetsMeta.get(sheet);
};

exports.getMeta = getMeta;

var addMeta = function addMeta(sheet, meta) {
  sheetsMeta.set(sheet, meta);
};

exports.addMeta = addMeta;