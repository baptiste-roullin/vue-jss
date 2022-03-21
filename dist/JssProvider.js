"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _jss = require("jss");

var _JssContext = _interopRequireDefault(require("./JssContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import {shallowEqualObjects} from 'shallow-equal'
// import { Context, Managers } from './types'
// const DefaultContext = Symbol()
var initialContext = {};
var JssProvider = (0, _vue.defineComponent)({
  props: {
    jss: {
      type: Object,
      required: false
    },
    registry: {
      type: Object,
      required: false
    },
    generateId: {
      type: Function,
      required: false
    },
    classNamePrefix: {
      type: String,
      required: false
    },
    disableStylesGeneration: {
      type: Boolean
    },
    media: {
      type: String
    },
    id: {
      type: Object
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    // const registry: Ref<null | object> = ref(null)
    var manager = (0, _vue.ref)({});
    var generateId = (0, _vue.ref)({});
    var context = (0, _vue.computed)(function () {
      var classNamePrefix = props.classNamePrefix,
          jss = props.jss,
          generateId = props.generateId,
          disableStylesGeneration = props.disableStylesGeneration,
          media = props.media,
          id = props.id,
          registry = props.registry;
      var context = {
        manager: manager
      };

      if (registry) {
        context.registry = registry;
      }

      if (id !== undefined) {
        context.id = id;
      }

      context.generateId = generateId;

      if (classNamePrefix) {
        context.classNamePrefix += classNamePrefix;
      }

      if (media !== undefined) {
        context.media = media;
      }

      if (jss) {
        context.jss = jss;
      }

      if (disableStylesGeneration !== undefined) {
        context.disableStylesGeneration = disableStylesGeneration;
      }

      return context;
    });
    (0, _vue.watch)(function () {
      return props.generateId;
    }, function () {
      if (props.generateId) {
        generateId.value = props.generateId;
      } else {
        generateId.value = (0, _jss.createGenerateId)();
      }
    });
    (0, _vue.watch)(function () {
      return props.registry;
    }, function () {
      manager.value = {};
    });
    (0, _vue.provide)(_JssContext["default"], context);
    return function () {
      return slots["default"] && slots["default"]();
    };
  }
}); // ;(JssProvider as any).props = [
//   'jss',
//   'registry',
//   'generateId',
//   'classNamePrefix',
//   'disableStylesGeneration',
//   'media',
//   'id',
// ]

var _default = JssProvider;
exports["default"] = _default;