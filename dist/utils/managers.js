"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmanageSheet = exports.manageSheet = exports.getManager = void 0;

var _jss = require("jss");

// @flow
var defaultManagers = new Map();

var getManager = function getManager(context, managerId) {
  // If `managers` map is present in the context, we use it in order to
  // let JssProvider reset them when new response has to render server-side.
  if (context.managers) {
    if (!context.managers[managerId]) {
      context.managers[managerId] = new _jss.SheetsManager();
    }

    return context.managers[managerId];
  }

  var manager = defaultManagers.get(managerId);

  if (!manager) {
    manager = new _jss.SheetsManager();
    defaultManagers.set(managerId, manager);
  }

  return manager;
};

exports.getManager = getManager;

var manageSheet = function manageSheet(options) {
  var sheet = options.sheet,
      context = options.context,
      index = options.index,
      theme = options.theme;

  if (!sheet) {
    return;
  }

  var manager = getManager(context, index);
  manager.manage(theme);

  if (context.registry) {
    context.registry.add(sheet);
  }
};

exports.manageSheet = manageSheet;

var unmanageSheet = function unmanageSheet(options) {
  if (!options.sheet) {
    return;
  }

  var manager = getManager(options.context, options.index);
  manager.unmanage(options.theme);
};

exports.unmanageSheet = unmanageSheet;