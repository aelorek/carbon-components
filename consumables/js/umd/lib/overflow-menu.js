(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/toggle-class', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/toggle-class'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.create, global.assign, global.classCallCheck, global.createClass, global.toggleClass, global.on, global.arrayFrom, global.elementMatches);
    global.overflowMenu = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _create, _assign, _classCallCheck2, _createClass2, _toggleClass, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _create2 = _interopRequireDefault(_create);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var OverflowMenu = function () {
    function OverflowMenu(element) {
      var _this = this;

      (0, _classCallCheck3.default)(this, OverflowMenu);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;
      this.constructor.components.set(this.element, this);

      /**
       * The handle to release click event listener on document object.
       * @member {Handle}
       */
      this.hDocumentClick = (0, _on2.default)(this.element.ownerDocument, 'click', function (event) {
        return _this.handleDocumentClick(event);
      });

      /**
       * The handle to release keypress event listener on document object.
       * @member {Handle}
       */
      this.hDocumentKeyPress = (0, _on2.default)(this.element.ownerDocument, 'keypress', function (event) {
        return _this.handleKeyPress(event);
      });
    }

    (0, _createClass3.default)(OverflowMenu, [{
      key: 'handleDocumentClick',
      value: function handleDocumentClick(event) {
        var isOfSelf = this.element.contains(event.target);
        var shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');

        if (isOfSelf && this.element.tagName === 'A') {
          event.preventDefault();
        }

        (0, _toggleClass2.default)(this.element, 'bx--overflow-menu--open', shouldBeOpen);
      }
    }, {
      key: 'handleKeyPress',
      value: function handleKeyPress(event) {
        var key = event.key || event.which;
        if (key === 'Enter' || key === 13) {
          var isOfSelf = this.element.contains(event.target);
          var shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');

          if (isOfSelf && this.element.tagName === 'A') {
            event.preventDefault();
          }

          (0, _toggleClass2.default)(this.element, 'bx--overflow-menu--open', shouldBeOpen);
        }
      }
    }, {
      key: 'release',
      value: function release() {
        if (this.hDocumentClick) {
          this.hDocumentClick = this.hDocumentClick.release();
        }
        if (this.hDocumentKeyPress) {
          this.hDocumentKeyPress = this.hDocumentKeyPress.release();
        }
        this.constructor.components.delete(this.element);
      }
    }], [{
      key: 'create',
      value: function create(element) {
        return this.components.get(element) || new this(element);
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this2.create(element);
          });
        }
      }
    }]);
    return OverflowMenu;
  }();

  exports.default = OverflowMenu;


  OverflowMenu.components = new _weakMap2.default();

  OverflowMenu.options = {
    selectorInit: '[data-overflow-menu]'
  };
});