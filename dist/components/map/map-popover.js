"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MapPopoverFactory;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layerHoverInfo = _interopRequireDefault(require("./layer-hover-info"));

var _coordinateInfo = _interopRequireDefault(require("./coordinate-info"));

var _icons = require("../common/icons");

var _errorBoundary = _interopRequireDefault(require("../common/error-boundary"));

var _reactIntl = require("react-intl");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  left: 50%;\n  transform: rotate(30deg);\n  top: 10px;\n  color: ", ";\n\n  &.popover-arrow-left {\n    left: 40%;\n    transform: rotate(0deg);\n  }\n\n  &.popover-arrow-right {\n    left: 60%;\n    transform: rotate(0deg);\n  }\n\n  :hover {\n    cursor: pointer;\n    color: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n  font-size: 11px;\n  font-weight: 500;\n  background-color: ", ";\n  color: ", ";\n  z-index: 1000;\n  position: absolute;\n  overflow-x: auto;\n  box-shadow: ", ";\n\n  :hover {\n    background-color: ", ";\n  }\n\n  .gutter {\n    height: 6px;\n    margin-bottom: 20px;\n  }\n\n  .primary-label {\n    color: ", ";\n    position: absolute;\n    right: 18px;\n    top: 10px;\n    font-size: 10px;\n  }\n\n  table {\n    margin: 2px 12px 12px 12px;\n    width: auto;\n\n    tbody {\n      border-top: transparent;\n      border-bottom: transparent;\n    }\n\n    td {\n      border-color: transparent;\n      padding: 4px;\n      color: ", ";\n    }\n\n    td.row__value {\n      text-align: right;\n      font-weight: 500;\n      color: ", ";\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var MAX_WIDTH = 500;
var MAX_HEIGHT = 600;

var StyledMapPopover = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.scrollBar;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.panelBoxShadow;
}, function (props) {
  return "".concat(props.theme.panelBackground, "dd");
}, function (props) {
  return props.theme.notificationColors.success;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var StyledIcon = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.linkBtnColor;
});

MapPopoverFactory.deps = [_layerHoverInfo["default"], _coordinateInfo["default"]];

function MapPopoverFactory(LayerHoverInfo, CoordinateInfo) {
  var MapPopover =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inherits2["default"])(MapPopover, _PureComponent);

    function MapPopover(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, MapPopover);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MapPopover).call(this, props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "popover", (0, _react.createRef)());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "moveLeft", function () {
        _this.setState({
          isLeft: true
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "moveRight", function () {
        _this.setState({
          isLeft: false
        });
      });
      _this.state = {
        width: 380,
        height: 160,
        isLeft: false
      };
      return _this;
    }

    (0, _createClass2["default"])(MapPopover, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._setContainerSize();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this._setContainerSize();
      }
    }, {
      key: "_setContainerSize",
      value: function _setContainerSize() {
        var node = this.popover.current;

        if (!node) {
          return;
        }

        var width = Math.min(Math.round(node.scrollWidth), MAX_WIDTH);
        var height = Math.min(Math.round(node.scrollHeight), MAX_HEIGHT);

        if (width !== this.state.width || height !== this.state.height) {
          this.setState({
            width: width,
            height: height
          });
        }
      }
    }, {
      key: "_getPosition",
      value: function _getPosition(x, y, isLeft) {
        var topOffset = 20;
        var leftOffset = 20;
        var _this$props = this.props,
            mapW = _this$props.mapW,
            mapH = _this$props.mapH;
        var _this$state = this.state,
            width = _this$state.width,
            height = _this$state.height;
        var pos = {};

        if (x + leftOffset + width > mapW || isLeft) {
          pos.right = mapW - x + leftOffset;
        } else {
          pos.left = x + leftOffset;
        }

        if (y + topOffset + height > mapH) {
          pos.bottom = 10;
        } else {
          pos.top = y + topOffset;
        }

        return pos;
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            x = _this$props2.x,
            y = _this$props2.y,
            frozen = _this$props2.frozen,
            coordinate = _this$props2.coordinate,
            layerHoverProp = _this$props2.layerHoverProp,
            isBase = _this$props2.isBase;
        var isLeft = this.state.isLeft;
        var style = Number.isFinite(x) && Number.isFinite(y) ? this._getPosition(x, y, isLeft) : {};
        return _react["default"].createElement(_errorBoundary["default"], null, _react["default"].createElement(StyledMapPopover, {
          ref: this.popover,
          className: "map-popover",
          style: _objectSpread({}, style, {
            maxWidth: MAX_WIDTH
          })
        }, frozen ? _react["default"].createElement("div", {
          className: "map-popover__top"
        }, _react["default"].createElement("div", {
          className: "gutter"
        }), !isLeft && _react["default"].createElement(StyledIcon, {
          className: "popover-arrow-left",
          onClick: this.moveLeft
        }, _react["default"].createElement(_icons.ArrowLeft, null)), _react["default"].createElement(StyledIcon, {
          className: "popover-pin",
          onClick: this.props.onClose
        }, _react["default"].createElement(_icons.Pin, {
          height: "16px"
        })), isLeft && _react["default"].createElement(StyledIcon, {
          className: "popover-arrow-right",
          onClick: this.moveRight
        }, _react["default"].createElement(_icons.ArrowRight, null)), isBase && _react["default"].createElement("div", {
          className: "primary-label"
        }, _react["default"].createElement(_reactIntl.FormattedMessage, {
          id: "mapPopover.primary"
        }))) : null, Array.isArray(coordinate) && _react["default"].createElement(CoordinateInfo, {
          coordinate: coordinate
        }), layerHoverProp && _react["default"].createElement(LayerHoverInfo, layerHoverProp)));
      }
    }]);
    return MapPopover;
  }(_react.PureComponent);

  (0, _defineProperty2["default"])(MapPopover, "propTypes", {
    layerHoverProp: _propTypes["default"].object,
    coordinate: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].bool]),
    frozen: _propTypes["default"].bool,
    x: _propTypes["default"].number,
    y: _propTypes["default"].number,
    mapW: _propTypes["default"].number.isRequired,
    mapH: _propTypes["default"].number.isRequired,
    onClose: _propTypes["default"].func.isRequired,
    isBase: _propTypes["default"].bool
  });
  return (0, _reactIntl.injectIntl)(MapPopover);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlci5qcyJdLCJuYW1lcyI6WyJNQVhfV0lEVEgiLCJNQVhfSEVJR0hUIiwiU3R5bGVkTWFwUG9wb3ZlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzY3JvbGxCYXIiLCJwYW5lbEJhY2tncm91bmQiLCJ0ZXh0Q29sb3IiLCJwYW5lbEJveFNoYWRvdyIsIm5vdGlmaWNhdGlvbkNvbG9ycyIsInN1Y2Nlc3MiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZEljb24iLCJwcmltYXJ5QnRuQmdkIiwibGlua0J0bkNvbG9yIiwiTWFwUG9wb3ZlckZhY3RvcnkiLCJkZXBzIiwiTGF5ZXJIb3ZlckluZm9GYWN0b3J5IiwiQ29vcmRpbmF0ZUluZm9GYWN0b3J5IiwiTGF5ZXJIb3ZlckluZm8iLCJDb29yZGluYXRlSW5mbyIsIk1hcFBvcG92ZXIiLCJzZXRTdGF0ZSIsImlzTGVmdCIsInN0YXRlIiwid2lkdGgiLCJoZWlnaHQiLCJfc2V0Q29udGFpbmVyU2l6ZSIsIm5vZGUiLCJwb3BvdmVyIiwiY3VycmVudCIsIk1hdGgiLCJtaW4iLCJyb3VuZCIsInNjcm9sbFdpZHRoIiwic2Nyb2xsSGVpZ2h0IiwieCIsInkiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0IiwibWFwVyIsIm1hcEgiLCJwb3MiLCJyaWdodCIsImxlZnQiLCJib3R0b20iLCJ0b3AiLCJmcm96ZW4iLCJjb29yZGluYXRlIiwibGF5ZXJIb3ZlclByb3AiLCJpc0Jhc2UiLCJzdHlsZSIsIk51bWJlciIsImlzRmluaXRlIiwiX2dldFBvc2l0aW9uIiwibWF4V2lkdGgiLCJtb3ZlTGVmdCIsIm9uQ2xvc2UiLCJtb3ZlUmlnaHQiLCJBcnJheSIsImlzQXJyYXkiLCJQdXJlQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib2JqZWN0Iiwib25lT2ZUeXBlIiwiYXJyYXkiLCJib29sIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImZ1bmMiXSwibWFw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QUFWLENBQWVELFVBUlA7QUFTakJsQixJQUFBQSxNQUFNLEVBQUVZLHNCQUFVSTtBQVRELEdBRm1EO0FBMkh4RSxTQUFPLDJCQUFXN0MsVUFBWCxDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtQdXJlQ29tcG9uZW50LCBjcmVhdGVSZWZ9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBMYXllckhvdmVySW5mb0ZhY3RvcnkgZnJvbSAnLi9sYXllci1ob3Zlci1pbmZvJztcbmltcG9ydCBDb29yZGluYXRlSW5mb0ZhY3RvcnkgZnJvbSAnLi9jb29yZGluYXRlLWluZm8nO1xuaW1wb3J0IHtQaW4sIEFycm93TGVmdCwgQXJyb3dSaWdodH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZXJyb3ItYm91bmRhcnknO1xuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlLCBpbmplY3RJbnRsfSBmcm9tICdyZWFjdC1pbnRsJztcblxuY29uc3QgTUFYX1dJRFRIID0gNTAwO1xuY29uc3QgTUFYX0hFSUdIVCA9IDYwMDtcblxuY29uc3QgU3R5bGVkTWFwUG9wb3ZlciA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Nyb2xsQmFyfTtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIHotaW5kZXg6IDEwMDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3ZlcmZsb3cteDogYXV0bztcbiAgYm94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJveFNoYWRvd307XG5cbiAgOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IGAke3Byb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH1kZGB9O1xuICB9XG5cbiAgLmd1dHRlciB7XG4gICAgaGVpZ2h0OiA2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuXG4gIC5wcmltYXJ5LWxhYmVsIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ub3RpZmljYXRpb25Db2xvcnMuc3VjY2Vzc307XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAxOHB4O1xuICAgIHRvcDogMTBweDtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gIH1cblxuICB0YWJsZSB7XG4gICAgbWFyZ2luOiAycHggMTJweCAxMnB4IDEycHg7XG4gICAgd2lkdGg6IGF1dG87XG5cbiAgICB0Ym9keSB7XG4gICAgICBib3JkZXItdG9wOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci1ib3R0b206IHRyYW5zcGFyZW50O1xuICAgIH1cblxuICAgIHRkIHtcbiAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgIH1cblxuICAgIHRkLnJvd19fdmFsdWUge1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkSWNvbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XG4gIHRvcDogMTBweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG5cbiAgJi5wb3BvdmVyLWFycm93LWxlZnQge1xuICAgIGxlZnQ6IDQwJTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuXG4gICYucG9wb3Zlci1hcnJvdy1yaWdodCB7XG4gICAgbGVmdDogNjAlO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICB9XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGlua0J0bkNvbG9yfTtcbiAgfVxuYDtcblxuTWFwUG9wb3ZlckZhY3RvcnkuZGVwcyA9IFtMYXllckhvdmVySW5mb0ZhY3RvcnksIENvb3JkaW5hdGVJbmZvRmFjdG9yeV07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hcFBvcG92ZXJGYWN0b3J5KExheWVySG92ZXJJbmZvLCBDb29yZGluYXRlSW5mbykge1xuICBjbGFzcyBNYXBQb3BvdmVyIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGxheWVySG92ZXJQcm9wOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgY29vcmRpbmF0ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmFycmF5LCBQcm9wVHlwZXMuYm9vbF0pLFxuICAgICAgZnJvemVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIHg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICB5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbWFwVzogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgbWFwSDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGlzQmFzZTogUHJvcFR5cGVzLmJvb2xcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIHdpZHRoOiAzODAsXG4gICAgICAgIGhlaWdodDogMTYwLFxuICAgICAgICBpc0xlZnQ6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fc2V0Q29udGFpbmVyU2l6ZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuX3NldENvbnRhaW5lclNpemUoKTtcbiAgICB9XG5cbiAgICBwb3BvdmVyID0gY3JlYXRlUmVmKCk7XG5cbiAgICBfc2V0Q29udGFpbmVyU2l6ZSgpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnBvcG92ZXIuY3VycmVudDtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5taW4oTWF0aC5yb3VuZChub2RlLnNjcm9sbFdpZHRoKSwgTUFYX1dJRFRIKTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWluKE1hdGgucm91bmQobm9kZS5zY3JvbGxIZWlnaHQpLCBNQVhfSEVJR0hUKTtcblxuICAgICAgaWYgKHdpZHRoICE9PSB0aGlzLnN0YXRlLndpZHRoIHx8IGhlaWdodCAhPT0gdGhpcy5zdGF0ZS5oZWlnaHQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2lkdGgsIGhlaWdodH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRQb3NpdGlvbih4LCB5LCBpc0xlZnQpIHtcbiAgICAgIGNvbnN0IHRvcE9mZnNldCA9IDIwO1xuICAgICAgY29uc3QgbGVmdE9mZnNldCA9IDIwO1xuICAgICAgY29uc3Qge21hcFcsIG1hcEh9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBwb3MgPSB7fTtcbiAgICAgIGlmICh4ICsgbGVmdE9mZnNldCArIHdpZHRoID4gbWFwVyB8fCBpc0xlZnQpIHtcbiAgICAgICAgcG9zLnJpZ2h0ID0gbWFwVyAtIHggKyBsZWZ0T2Zmc2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zLmxlZnQgPSB4ICsgbGVmdE9mZnNldDtcbiAgICAgIH1cblxuICAgICAgaWYgKHkgKyB0b3BPZmZzZXQgKyBoZWlnaHQgPiBtYXBIKSB7XG4gICAgICAgIHBvcy5ib3R0b20gPSAxMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcy50b3AgPSB5ICsgdG9wT2Zmc2V0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNMZWZ0OiB0cnVlfSk7XG4gICAgfTtcblxuICAgIG1vdmVSaWdodCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTGVmdDogZmFsc2V9KTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge3gsIHksIGZyb3plbiwgY29vcmRpbmF0ZSwgbGF5ZXJIb3ZlclByb3AsIGlzQmFzZX0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge2lzTGVmdH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICBjb25zdCBzdHlsZSA9IE51bWJlci5pc0Zpbml0ZSh4KSAmJiBOdW1iZXIuaXNGaW5pdGUoeSkgPyB0aGlzLl9nZXRQb3NpdGlvbih4LCB5LCBpc0xlZnQpIDoge307XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFcnJvckJvdW5kYXJ5PlxuICAgICAgICAgIDxTdHlsZWRNYXBQb3BvdmVyXG4gICAgICAgICAgICByZWY9e3RoaXMucG9wb3Zlcn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1hcC1wb3BvdmVyXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIC4uLnN0eWxlLFxuICAgICAgICAgICAgICBtYXhXaWR0aDogTUFYX1dJRFRIXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtmcm96ZW4gPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLXBvcG92ZXJfX3RvcFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3V0dGVyXCIgLz5cbiAgICAgICAgICAgICAgICB7IWlzTGVmdCAmJiAoXG4gICAgICAgICAgICAgICAgICA8U3R5bGVkSWNvbiBjbGFzc05hbWU9XCJwb3BvdmVyLWFycm93LWxlZnRcIiBvbkNsaWNrPXt0aGlzLm1vdmVMZWZ0fT5cbiAgICAgICAgICAgICAgICAgICAgPEFycm93TGVmdCAvPlxuICAgICAgICAgICAgICAgICAgPC9TdHlsZWRJY29uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPFN0eWxlZEljb24gY2xhc3NOYW1lPVwicG9wb3Zlci1waW5cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xvc2V9PlxuICAgICAgICAgICAgICAgICAgPFBpbiBoZWlnaHQ9XCIxNnB4XCIgLz5cbiAgICAgICAgICAgICAgICA8L1N0eWxlZEljb24+XG4gICAgICAgICAgICAgICAge2lzTGVmdCAmJiAoXG4gICAgICAgICAgICAgICAgICA8U3R5bGVkSWNvbiBjbGFzc05hbWU9XCJwb3BvdmVyLWFycm93LXJpZ2h0XCIgb25DbGljaz17dGhpcy5tb3ZlUmlnaHR9PlxuICAgICAgICAgICAgICAgICAgICA8QXJyb3dSaWdodCAvPlxuICAgICAgICAgICAgICAgICAgPC9TdHlsZWRJY29uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2lzQmFzZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaW1hcnktbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJtYXBQb3BvdmVyLnByaW1hcnlcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHtBcnJheS5pc0FycmF5KGNvb3JkaW5hdGUpICYmIDxDb29yZGluYXRlSW5mbyBjb29yZGluYXRlPXtjb29yZGluYXRlfSAvPn1cbiAgICAgICAgICAgIHtsYXllckhvdmVyUHJvcCAmJiA8TGF5ZXJIb3ZlckluZm8gey4uLmxheWVySG92ZXJQcm9wfSAvPn1cbiAgICAgICAgICA8L1N0eWxlZE1hcFBvcG92ZXI+XG4gICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluamVjdEludGwoTWFwUG9wb3Zlcik7XG59XG4iXX0=