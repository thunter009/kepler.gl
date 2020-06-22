"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MapContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMapGl = _interopRequireDefault(require("react-map-gl"));

var _react2 = _interopRequireDefault(require("@deck.gl/react"));

var _reselect = require("reselect");

var _viewportMercatorProject = _interopRequireDefault(require("viewport-mercator-project"));

var _mapPopover = _interopRequireDefault(require("./map/map-popover"));

var _mapControl = _interopRequireDefault(require("./map/map-control"));

var _styledComponents = require("./common/styled-components");

var _editor = _interopRequireDefault(require("./editor/editor"));

var _mapboxUtils = require("../layers/mapbox-utils");

var _baseLayer = require("../layers/base-layer");

var _glUtils = require("../utils/gl-utils");

var _mapboxUtils2 = require("../utils/map-style-utils/mapbox-utils");

var _dBuildingLayer = _interopRequireDefault(require("../deckgl-layers/3d-building-layer/3d-building-layer"));

var _defaultSettings = require("../constants/default-settings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MAP_STYLE = {
  container: {
    display: 'inline-block',
    position: 'relative'
  },
  top: {
    position: 'absolute',
    top: '0px',
    pointerEvents: 'none'
  }
};
var MAPBOXGL_STYLE_UPDATE = 'style.load';
var MAPBOXGL_RENDER = 'render';
var TRANSITION_DURATION = 0;

var Attribution = function Attribution() {
  return _react["default"].createElement(_styledComponents.StyledAttrbution, null, _react["default"].createElement("a", {
    href: "https://kepler.gl/policy/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\xA9 kepler.gl |", ' '), _react["default"].createElement("a", {
    href: "https://www.mapbox.com/about/maps/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\xA9 Mapbox |", ' '), _react["default"].createElement("a", {
    href: "http://www.openstreetmap.org/copyright",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\xA9 OpenStreetMap |", ' '), _react["default"].createElement("a", {
    href: "https://www.mapbox.com/map-feedback/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, _react["default"].createElement("strong", null, "Improve this map")));
};

function getLayerProp(_ref) {
  var interactionConfig = _ref.interactionConfig,
      hoverInfo = _ref.hoverInfo,
      layers = _ref.layers,
      layersToRender = _ref.layersToRender,
      datasets = _ref.datasets;

  if (interactionConfig.tooltip.enabled && hoverInfo && hoverInfo.picked) {
    // if anything hovered
    var object = hoverInfo.object,
        overlay = hoverInfo.layer; // deckgl layer to kepler-gl layer

    var layer = layers[overlay.props.idx];

    if (layer.getHoverData && layersToRender[layer.id]) {
      // if layer is visible and have hovered data
      var dataId = layer.config.dataId;
      var _datasets$dataId = datasets[dataId],
          allData = _datasets$dataId.allData,
          fields = _datasets$dataId.fields;
      var data = layer.getHoverData(object, allData);
      var fieldsToShow = interactionConfig.tooltip.config.fieldsToShow[dataId];
      return {
        data: data,
        fields: fields,
        fieldsToShow: fieldsToShow,
        layer: layer
      };
    }
  }
}

MapContainerFactory.deps = [_mapPopover["default"], _mapControl["default"], _editor["default"]];

function MapContainerFactory(MapPopover, MapControl, Editor) {
  var MapContainer =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(MapContainer, _Component);

    function MapContainer(_props) {
      var _this;

      (0, _classCallCheck2["default"])(this, MapContainer);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MapContainer).call(this, _props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layersSelector", function (props) {
        return props.layers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerDataSelector", function (props) {
        return props.layerData;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapLayersSelector", function (props) {
        return props.mapLayers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerOrderSelector", function (props) {
        return props.layerOrder;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layersToRenderSelector", (0, _reselect.createSelector)(_this.layersSelector, _this.layerDataSelector, _this.mapLayersSelector, // {[id]: true \ false}
      function (layers, layerData, mapLayers) {
        return layers.reduce(function (accu, layer, idx) {
          return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, layer.id, layer.shouldRenderLayer(layerData[idx]) && _this._isVisibleMapLayer(layer, mapLayers)));
        }, {});
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filtersSelector", function (props) {
        return props.filters;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "polygonFilters", (0, _reselect.createSelector)(_this.filtersSelector, function (filters) {
        return filters.filter(function (f) {
          return f.type === _defaultSettings.FILTER_TYPES.polygon;
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapboxLayersSelector", (0, _reselect.createSelector)(_this.layersSelector, _this.layerDataSelector, _this.layerOrderSelector, _this.layersToRenderSelector, _mapboxUtils.generateMapboxLayers));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCloseMapPopover", function () {
        _this.props.visStateActions.onLayerClick(null);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLayerSetDomain", function (idx, colorDomain) {
        _this.props.visStateActions.layerConfigChange(_this.props.layers[idx], {
          colorDomain: colorDomain
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleMapToggleLayer", function (layerId) {
        var _this$props = _this.props,
            _this$props$index = _this$props.index,
            mapIndex = _this$props$index === void 0 ? 0 : _this$props$index,
            visStateActions = _this$props.visStateActions;
        visStateActions.toggleLayerForMap(mapIndex, layerId);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMapboxStyleUpdate", function () {
        // force refresh mapboxgl layers
        _this.previousLayers = {};

        _this._updateMapboxLayers();

        if (typeof _this.props.onMapStyleLoaded === 'function') {
          _this.props.onMapStyleLoaded(_this._map);
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setMapboxMap", function (mapbox) {
        if (!_this._map && mapbox) {
          _this._map = mapbox.getMap(); // i noticed in certain context we don't access the actual map element

          if (!_this._map) {
            return;
          } // bind mapboxgl event listener


          _this._map.on(MAPBOXGL_STYLE_UPDATE, _this._onMapboxStyleUpdate);

          _this._map.on(MAPBOXGL_RENDER, function () {
            if (typeof _this.props.onMapRender === 'function') {
              _this.props.onMapRender(_this._map);
            }
          });
        }

        if (_this.props.getMapboxRef) {
          // The parent component can gain access to our MapboxGlMap by
          // providing this callback. Note that 'mapbox' will be null when the
          // ref is unset (e.g. when a split map is closed).
          _this.props.getMapboxRef(mapbox, _this.props.index);
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBeforeRender", function (_ref2) {
        var gl = _ref2.gl;
        (0, _glUtils.setLayerBlending)(gl, _this.props.layerBlending);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderLayer", function (overlays, idx) {
        var _this$props2 = _this.props,
            datasets = _this$props2.datasets,
            layers = _this$props2.layers,
            layerData = _this$props2.layerData,
            hoverInfo = _this$props2.hoverInfo,
            clicked = _this$props2.clicked,
            mapState = _this$props2.mapState,
            interactionConfig = _this$props2.interactionConfig,
            animationConfig = _this$props2.animationConfig;
        var layer = layers[idx];
        var data = layerData[idx];

        var _ref3 = datasets[layer.config.dataId] || {},
            gpuFilter = _ref3.gpuFilter;

        var objectHovered = clicked || hoverInfo;
        var layerCallbacks = {
          onSetLayerDomain: function onSetLayerDomain(val) {
            return _this._onLayerSetDomain(idx, val);
          }
        }; // Layer is Layer class

        var layerOverlay = layer.renderLayer({
          data: data,
          gpuFilter: gpuFilter,
          idx: idx,
          interactionConfig: interactionConfig,
          layerCallbacks: layerCallbacks,
          mapState: mapState,
          animationConfig: animationConfig,
          objectHovered: objectHovered
        });
        return overlays.concat(layerOverlay || []);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onViewportChange", function (viewState) {
        if (typeof _this.props.onViewStateChange === 'function') {
          _this.props.onViewStateChange(viewState);
        }

        _this.props.mapStateActions.updateMap(viewState);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleMapControl", function (panelId) {
        var _this$props3 = _this.props,
            index = _this$props3.index,
            uiStateActions = _this$props3.uiStateActions;
        uiStateActions.toggleMapControl(panelId, index);
      });
      _this.previousLayers = {// [layers.id]: mapboxLayerConfig
      };
      _this._deck = null;
      return _this;
    }

    (0, _createClass2["default"])(MapContainer, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // unbind mapboxgl event listener
        if (this._map) {
          this._map.off(MAPBOXGL_STYLE_UPDATE);

          this._map.off(MAPBOXGL_RENDER);
        }
      }
    }, {
      key: "_isVisibleMapLayer",

      /* component private functions */
      value: function _isVisibleMapLayer(layer, mapLayers) {
        // if layer.id is not in mapLayers, don't render it
        return !mapLayers || mapLayers && mapLayers[layer.id];
      }
    }, {
      key: "_renderMapPopover",

      /* component render functions */

      /* eslint-disable complexity */
      value: function _renderMapPopover(layersToRender) {
        // TODO: move this into reducer so it can be tested
        var _this$props4 = this.props,
            mapState = _this$props4.mapState,
            hoverInfo = _this$props4.hoverInfo,
            clicked = _this$props4.clicked,
            datasets = _this$props4.datasets,
            interactionConfig = _this$props4.interactionConfig,
            layers = _this$props4.layers,
            _this$props4$mousePos = _this$props4.mousePos,
            mousePosition = _this$props4$mousePos.mousePosition,
            coordinate = _this$props4$mousePos.coordinate,
            pinned = _this$props4$mousePos.pinned;

        if (!mousePosition) {
          return null;
        } // if clicked something, ignore hover behavior


        var layerHoverProp = null;
        var layerPinnedProp = null;
        var position = {
          x: mousePosition[0],
          y: mousePosition[1]
        };
        var pinnedPosition = {};
        layerHoverProp = getLayerProp({
          interactionConfig: interactionConfig,
          hoverInfo: hoverInfo,
          layers: layers,
          layersToRender: layersToRender,
          datasets: datasets
        });
        var compareMode = interactionConfig.tooltip.config ? interactionConfig.tooltip.config.compareMode : false;
        var hasTooltip = pinned || clicked;
        var hasComparisonTooltip = compareMode || !clicked && !pinned;

        if (pinned || clicked) {
          // project lnglat to screen so that tooltip follows the object on zoom
          var viewport = new _viewportMercatorProject["default"](mapState);
          var lngLat = clicked ? clicked.lngLat : pinned.coordinate;
          pinnedPosition = this._getHoverXY(viewport, lngLat);
          layerPinnedProp = getLayerProp({
            interactionConfig: interactionConfig,
            hoverInfo: clicked,
            layers: layers,
            layersToRender: layersToRender,
            datasets: datasets
          });

          if (layerHoverProp) {
            layerHoverProp.primaryData = layerPinnedProp.data;
            layerHoverProp.compareType = interactionConfig.tooltip.config.compareType;
          }
        }

        return _react["default"].createElement("div", null, hasTooltip && _react["default"].createElement(MapPopover, (0, _extends2["default"])({}, pinnedPosition, {
          layerHoverProp: layerPinnedProp,
          coordinate: interactionConfig.coordinate.enabled && (pinned || {}).coordinate,
          frozen: Boolean(hasTooltip),
          onClose: this._onCloseMapPopover,
          mapW: mapState.width,
          mapH: mapState.height,
          isBase: compareMode
        })), hasComparisonTooltip && _react["default"].createElement(MapPopover, (0, _extends2["default"])({}, position, {
          layerHoverProp: layerHoverProp,
          coordinate: interactionConfig.coordinate.enabled && coordinate,
          onClose: this._onCloseMapPopover,
          mapW: mapState.width,
          mapH: mapState.height
        })));
      }
      /* eslint-enable complexity */

    }, {
      key: "_getHoverXY",
      value: function _getHoverXY(viewport, lngLat) {
        var screenCoord = !viewport || !lngLat ? null : viewport.project(lngLat);
        return screenCoord && {
          x: screenCoord[0],
          y: screenCoord[1]
        };
      }
    }, {
      key: "_renderDeckOverlay",
      value: function _renderDeckOverlay(layersToRender) {
        var _this2 = this;

        var _this$props5 = this.props,
            mapState = _this$props5.mapState,
            mapStyle = _this$props5.mapStyle,
            layerData = _this$props5.layerData,
            layerOrder = _this$props5.layerOrder,
            layers = _this$props5.layers,
            visStateActions = _this$props5.visStateActions,
            mapboxApiAccessToken = _this$props5.mapboxApiAccessToken,
            mapboxApiUrl = _this$props5.mapboxApiUrl;
        var deckGlLayers = []; // wait until data is ready before render data layers

        if (layerData && layerData.length) {
          // last layer render first
          deckGlLayers = layerOrder.slice().reverse().filter(function (idx) {
            return layers[idx].overlayType === _baseLayer.OVERLAY_TYPE.deckgl && layersToRender[layers[idx].id];
          }).reduce(this._renderLayer, []);
        }

        if (mapStyle.visibleLayerGroups['3d building']) {
          deckGlLayers.push(new _dBuildingLayer["default"]({
            id: '_keplergl_3d-building',
            mapboxApiAccessToken: mapboxApiAccessToken,
            mapboxApiUrl: mapboxApiUrl,
            threeDBuildingColor: mapStyle.threeDBuildingColor,
            updateTriggers: {
              getFillColor: mapStyle.threeDBuildingColor
            }
          }));
        }

        return _react["default"].createElement(_react2["default"], (0, _extends2["default"])({}, this.props.deckGlProps, {
          viewState: mapState,
          id: "default-deckgl-overlay",
          layers: deckGlLayers,
          onBeforeRender: this._onBeforeRender,
          onHover: visStateActions.onLayerHover,
          onClick: visStateActions.onLayerClick,
          ref: function ref(comp) {
            if (comp && comp.deck && !_this2._deck) {
              _this2._deck = comp.deck;
            }
          }
        }));
      }
    }, {
      key: "_updateMapboxLayers",
      value: function _updateMapboxLayers() {
        var mapboxLayers = this.mapboxLayersSelector(this.props);

        if (!Object.keys(mapboxLayers).length && !Object.keys(this.previousLayers).length) {
          return;
        }

        (0, _mapboxUtils.updateMapboxLayers)(this._map, mapboxLayers, this.previousLayers);
        this.previousLayers = mapboxLayers;
      }
    }, {
      key: "_renderMapboxOverlays",
      value: function _renderMapboxOverlays() {
        if (this._map && this._map.isStyleLoaded()) {
          this._updateMapboxLayers();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props6 = this.props,
            mapState = _this$props6.mapState,
            mapStyle = _this$props6.mapStyle,
            mapStateActions = _this$props6.mapStateActions,
            mapLayers = _this$props6.mapLayers,
            layers = _this$props6.layers,
            MapComponent = _this$props6.MapComponent,
            datasets = _this$props6.datasets,
            mapboxApiAccessToken = _this$props6.mapboxApiAccessToken,
            mapboxApiUrl = _this$props6.mapboxApiUrl,
            mapControls = _this$props6.mapControls,
            uiState = _this$props6.uiState,
            uiStateActions = _this$props6.uiStateActions,
            visStateActions = _this$props6.visStateActions,
            editor = _this$props6.editor,
            index = _this$props6.index;
        var layersToRender = this.layersToRenderSelector(this.props);

        if (!mapStyle.bottomMapStyle) {
          // style not yet loaded
          return _react["default"].createElement("div", null);
        }

        var mapProps = _objectSpread({}, mapState, {
          preserveDrawingBuffer: true,
          mapboxApiAccessToken: mapboxApiAccessToken,
          mapboxApiUrl: mapboxApiUrl,
          onViewportChange: this._onViewportChange,
          transformRequest: _mapboxUtils2.transformRequest
        });

        var isEdit = uiState.mapControls.mapDraw.active;
        return _react["default"].createElement(_styledComponents.StyledMapContainer, {
          style: MAP_STYLE.container
        }, _react["default"].createElement(MapControl, {
          datasets: datasets,
          dragRotate: mapState.dragRotate,
          isSplit: Boolean(mapLayers),
          isExport: this.props.isExport,
          layers: layers,
          layersToRender: layersToRender,
          mapIndex: index,
          mapControls: mapControls,
          readOnly: this.props.readOnly,
          scale: mapState.scale || 1,
          top: 0,
          editor: editor,
          locale: uiState.locale,
          onTogglePerspective: mapStateActions.togglePerspective,
          onToggleSplitMap: mapStateActions.toggleSplitMap,
          onMapToggleLayer: this._handleMapToggleLayer,
          onToggleMapControl: this._toggleMapControl,
          onSetEditorMode: visStateActions.setEditorMode,
          onSetLocale: uiStateActions.setLocale,
          onToggleEditorVisibility: visStateActions.toggleEditorVisibility
        }), _react["default"].createElement(MapComponent, (0, _extends2["default"])({}, mapProps, {
          key: "bottom",
          ref: this._setMapboxMap,
          mapStyle: mapStyle.bottomMapStyle,
          getCursor: this.props.hoverInfo ? function () {
            return 'pointer';
          } : undefined,
          transitionDuration: TRANSITION_DURATION,
          onMouseMove: this.props.visStateActions.onMouseMove
        }), this._renderDeckOverlay(layersToRender), this._renderMapboxOverlays(layersToRender), _react["default"].createElement(Editor, {
          index: index,
          datasets: datasets,
          editor: editor,
          filters: this.polygonFilters(this.props),
          isEnabled: isEdit,
          layers: layers,
          layersToRender: layersToRender,
          onDeleteFeature: visStateActions.deleteFeature,
          onSelect: visStateActions.setSelectedFeature,
          onUpdate: visStateActions.setFeatures,
          onTogglePolygonFilter: visStateActions.setPolygonFilterLayer,
          style: {
            pointerEvents: isEdit ? 'all' : 'none',
            position: 'absolute',
            display: editor.visible ? 'block' : 'none'
          }
        })), mapStyle.topMapStyle && _react["default"].createElement("div", {
          style: MAP_STYLE.top
        }, _react["default"].createElement(MapComponent, (0, _extends2["default"])({}, mapProps, {
          key: "top",
          mapStyle: mapStyle.topMapStyle
        }))), this._renderMapPopover(layersToRender), _react["default"].createElement(Attribution, null));
      }
    }]);
    return MapContainer;
  }(_react.Component);

  (0, _defineProperty2["default"])(MapContainer, "propTypes", {
    // required
    datasets: _propTypes["default"].object,
    interactionConfig: _propTypes["default"].object.isRequired,
    layerBlending: _propTypes["default"].string.isRequired,
    layerOrder: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layerData: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    filters: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    mapState: _propTypes["default"].object.isRequired,
    mapControls: _propTypes["default"].object.isRequired,
    uiState: _propTypes["default"].object.isRequired,
    mapStyle: _propTypes["default"].object.isRequired,
    mousePos: _propTypes["default"].object.isRequired,
    mapboxApiAccessToken: _propTypes["default"].string.isRequired,
    mapboxApiUrl: _propTypes["default"].string,
    visStateActions: _propTypes["default"].object.isRequired,
    mapStateActions: _propTypes["default"].object.isRequired,
    uiStateActions: _propTypes["default"].object.isRequired,
    // optional
    readOnly: _propTypes["default"].bool,
    isExport: _propTypes["default"].bool,
    clicked: _propTypes["default"].object,
    hoverInfo: _propTypes["default"].object,
    mapLayers: _propTypes["default"].object,
    onMapToggleLayer: _propTypes["default"].func,
    onMapStyleLoaded: _propTypes["default"].func,
    onMapRender: _propTypes["default"].func,
    getMapboxRef: _propTypes["default"].func,
    index: _propTypes["default"].number
  });
  (0, _defineProperty2["default"])(MapContainer, "defaultProps", {
    MapComponent: _reactMapGl["default"],
    deckGlProps: {},
    index: 0
  });
  MapContainer.displayName = 'MapContainer';
  return MapContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC1jb250YWluZXIuanMiXSwibmFtZXMiOlsiTUFQX1NUWUxFIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInBvc2l0aW9uIiwidG9wIiwicG9pbnRlckV2ZW50cyIsIk1BUEJPWEdMX1NUWUxFX1VQREFURSIsIk1BUEJPWEdMX1JFTkRFUiIsIlRSQU5TSVRJT05fRFVSQVRJT04iLCJBdHRyaWJ1dGlvbiIsImdldExheWVyUHJvcCIsImludGVyYWN0aW9uQ29uZmlnIiwiaG92ZXJJbmZvIiwibGF5ZXJzIiwibGF5ZXJzVG9SZW5kZXIiLCJkYXRhc2V0cyIsInRvb2x0aXAiLCJlbmFibGVkIiwicGlja2VkIiwib2JqZWN0Iiwib3ZlcmxheSIsImxheWVyIiwicHJvcHMiLCJpZHgiLCJnZXRIb3ZlckRhdGEiLCJpZCIsImRhdGFJZCIsImNvbmZpZyIsImFsbERhdGEiLCJmaWVsZHMiLCJkYXRhIiwiZmllbGRzVG9TaG93IiwiTWFwQ29udGFpbmVyRmFjdG9yeSIsImRlcHMiLCJNYXBQb3BvdmVyRmFjdG9yeSIsIk1hcENvbnRyb2xGYWN0b3J5IiwiRWRpdG9yRmFjdG9yeSIsIk1hcFBvcG92ZXIiLCJNYXBDb250cm9sIiwiRWRpdG9yIiwiTWFwQ29udGFpbmVyIiwibGF5ZXJEYXRhIiwibWFwTGF5ZXJzIiwibGF5ZXJPcmRlciIsImxheWVyc1NlbGVjdG9yIiwibGF5ZXJEYXRhU2VsZWN0b3IiLCJtYXBMYXllcnNTZWxlY3RvciIsInJlZHVjZSIsImFjY3UiLCJzaG91bGRSZW5kZXJMYXllciIsIl9pc1Zpc2libGVNYXBMYXllciIsImZpbHRlcnMiLCJmaWx0ZXJzU2VsZWN0b3IiLCJmaWx0ZXIiLCJmIiwidHlwZSIsIkZJTFRFUl9UWVBFUyIsInBvbHlnb24iLCJsYXllck9yZGVyU2VsZWN0b3IiLCJsYXllcnNUb1JlbmRlclNlbGVjdG9yIiwiZ2VuZXJhdGVNYXBib3hMYXllcnMiLCJ2aXNTdGF0ZUFjdGlvbnMiLCJvbkxheWVyQ2xpY2siLCJjb2xvckRvbWFpbiIsImxheWVyQ29uZmlnQ2hhbmdlIiwibGF5ZXJJZCIsImluZGV4IiwibWFwSW5kZXgiLCJ0b2dnbGVMYXllckZvck1hcCIsInByZXZpb3VzTGF5ZXJzIiwiX3VwZGF0ZU1hcGJveExheWVycyIsIm9uTWFwU3R5bGVMb2FkZWQiLCJfbWFwIiwibWFwYm94IiwiZ2V0TWFwIiwib24iLCJfb25NYXBib3hTdHlsZVVwZGF0ZSIsIm9uTWFwUmVuZGVyIiwiZ2V0TWFwYm94UmVmIiwiZ2wiLCJsYXllckJsZW5kaW5nIiwib3ZlcmxheXMiLCJjbGlja2VkIiwibWFwU3RhdGUiLCJhbmltYXRpb25Db25maWciLCJncHVGaWx0ZXIiLCJvYmplY3RIb3ZlcmVkIiwibGF5ZXJDYWxsYmFja3MiLCJvblNldExheWVyRG9tYWluIiwidmFsIiwiX29uTGF5ZXJTZXREb21haW4iLCJsYXllck92ZXJsYXkiLCJyZW5kZXJMYXllciIsImNvbmNhdCIsInZpZXdTdGF0ZSIsIm9uVmlld1N0YXRlQ2hhbmdlIiwibWFwU3RhdGVBY3Rpb25zIiwidXBkYXRlTWFwIiwicGFuZWxJZCIsInVpU3RhdGVBY3Rpb25zIiwidG9nZ2xlTWFwQ29udHJvbCIsIl9kZWNrIiwib2ZmIiwibW91c2VQb3MiLCJtb3VzZVBvc2l0aW9uIiwiY29vcmRpbmF0ZSIsInBpbm5lZCIsImxheWVySG92ZXJQcm9wIiwibGF5ZXJQaW5uZWRQcm9wIiwieCIsInkiLCJwaW5uZWRQb3NpdGlvbiIsImNvbXBhcmVNb2RlIiwiaGFzVG9vbHRpcCIsImhhc0NvbXBhcmlzb25Ub29sdGlwIiwidmlld3BvcnQiLCJXZWJNZXJjYXRvclZpZXdwb3J0IiwibG5nTGF0IiwiX2dldEhvdmVyWFkiLCJwcmltYXJ5RGF0YSIsImNvbXBhcmVUeXBlIiwiQm9vbGVhbiIsIl9vbkNsb3NlTWFwUG9wb3ZlciIsIndpZHRoIiwiaGVpZ2h0Iiwic2NyZWVuQ29vcmQiLCJwcm9qZWN0IiwibWFwU3R5bGUiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIm1hcGJveEFwaVVybCIsImRlY2tHbExheWVycyIsImxlbmd0aCIsInNsaWNlIiwicmV2ZXJzZSIsIm92ZXJsYXlUeXBlIiwiT1ZFUkxBWV9UWVBFIiwiZGVja2dsIiwiX3JlbmRlckxheWVyIiwidmlzaWJsZUxheWVyR3JvdXBzIiwicHVzaCIsIlRocmVlREJ1aWxkaW5nTGF5ZXIiLCJ0aHJlZURCdWlsZGluZ0NvbG9yIiwidXBkYXRlVHJpZ2dlcnMiLCJnZXRGaWxsQ29sb3IiLCJkZWNrR2xQcm9wcyIsIl9vbkJlZm9yZVJlbmRlciIsIm9uTGF5ZXJIb3ZlciIsImNvbXAiLCJkZWNrIiwibWFwYm94TGF5ZXJzIiwibWFwYm94TGF5ZXJzU2VsZWN0b3IiLCJPYmplY3QiLCJrZXlzIiwiaXNTdHlsZUxvYWRlZCIsIk1hcENvbXBvbmVudCIsIm1hcENvbnRyb2xzIiwidWlTdGF0ZSIsImVkaXRvciIsImJvdHRvbU1hcFN0eWxlIiwibWFwUHJvcHMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJvblZpZXdwb3J0Q2hhbmdlIiwiX29uVmlld3BvcnRDaGFuZ2UiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwiaXNFZGl0IiwibWFwRHJhdyIsImFjdGl2ZSIsImRyYWdSb3RhdGUiLCJpc0V4cG9ydCIsInJlYWRPbmx5Iiwic2NhbGUiLCJsb2NhbGUiLCJ0b2dnbGVQZXJzcGVjdGl2ZSIsInRvZ2dsZVNwbGl0TWFwIiwiX2hhbmRsZU1hcFRvZ2dsZUxheWVyIiwiX3RvZ2dsZU1hcENvbnRyb2wiLCJzZXRFZGl0b3JNb2RlIiwic2V0TG9jYWxlIiwidG9nZ2xlRWRpdG9yVmlzaWJpbGl0eSIsIl9zZXRNYXBib3hNYXAiLCJ1bmRlZmluZWQiLCJvbk1vdXNlTW92ZSIsIl9yZW5kZXJEZWNrT3ZlcmxheSIsIl9yZW5kZXJNYXBib3hPdmVybGF5cyIsInBvbHlnb25GaWx0ZXJzIiwiZGVsZXRlRmVhdHVyZSIsInNldFNlbGVjdGVkRmVhdHVyZSIsInNldEZlYXR1cmVzIiwic2V0UG9seWdvbkZpbHRlckxheWVyIiwidmlzaWJsZSIsInRvcE1hcFN0eWxlIiwiX3JlbmRlck1hcFBvcG92ZXIiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwiYXJyYXlPZiIsImFueSIsImJvb2wiLCJvbk1hcFRvZ2dsZUxheWVyIiwiZnVuYyIsIm51bWJlciIsIk1hcGJveEdMTWFwIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxHQUFHO0FBQ2hCQyxFQUFBQSxTQUFTLEVBQUU7QUFDVEMsSUFBQUEsT0FBTyxFQUFFLGNBREE7QUFFVEMsSUFBQUEsUUFBUSxFQUFFO0FBRkQsR0FESztBQUtoQkMsRUFBQUEsR0FBRyxFQUFFO0FBQ0hELElBQUFBLFFBQVEsRUFBRSxVQURQO0FBRUhDLElBQUFBLEdBQUcsRUFBRSxLQUZGO0FBR0hDLElBQUFBLGFBQWEsRUFBRTtBQUhaO0FBTFcsQ0FBbEI7QUFZQSxJQUFNQyxxQkFBcUIsR0FBRyxZQUE5QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxRQUF4QjtBQUNBLElBQU1DLG1CQUFtQixHQUFHLENBQTVCOztBQUVBLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjO0FBQUEsU0FDbEIsZ0NBQUMsa0NBQUQsUUFDRTtBQUFHLElBQUEsSUFBSSxFQUFDLDJCQUFSO0FBQW9DLElBQUEsTUFBTSxFQUFDLFFBQTNDO0FBQW9ELElBQUEsR0FBRyxFQUFDO0FBQXhELHlCQUNnQixHQURoQixDQURGLEVBSUU7QUFBRyxJQUFBLElBQUksRUFBQyxvQ0FBUjtBQUE2QyxJQUFBLE1BQU0sRUFBQyxRQUFwRDtBQUE2RCxJQUFBLEdBQUcsRUFBQztBQUFqRSxzQkFDYSxHQURiLENBSkYsRUFPRTtBQUFHLElBQUEsSUFB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Q3BFakssWUFEb0Usa0JBbUNsRDtBQUNwQmtILElBQUFBLFlBQVksRUFBRWdELHNCQURNO0FBRXBCMUQsSUFBQUEsV0FBVyxFQUFFLEVBRk87QUFHcEI5RSxJQUFBQSxLQUFLLEVBQUU7QUFIYSxHQW5Da0Q7QUFvZDFFMUIsRUFBQUEsWUFBWSxDQUFDbUssV0FBYixHQUEyQixjQUEzQjtBQUVBLFNBQU9uSyxZQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vLyBsaWJyYXJpZXNcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBNYXBib3hHTE1hcCBmcm9tICdyZWFjdC1tYXAtZ2wnO1xuaW1wb3J0IERlY2tHTCBmcm9tICdAZGVjay5nbC9yZWFjdCc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgV2ViTWVyY2F0b3JWaWV3cG9ydCBmcm9tICd2aWV3cG9ydC1tZXJjYXRvci1wcm9qZWN0JztcblxuLy8gY29tcG9uZW50c1xuaW1wb3J0IE1hcFBvcG92ZXJGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvbWFwL21hcC1wb3BvdmVyJztcbmltcG9ydCBNYXBDb250cm9sRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL21hcC9tYXAtY29udHJvbCc7XG5pbXBvcnQge1N0eWxlZE1hcENvbnRhaW5lciwgU3R5bGVkQXR0cmJ1dGlvbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgRWRpdG9yRmFjdG9yeSBmcm9tICcuL2VkaXRvci9lZGl0b3InO1xuXG4vLyB1dGlsc1xuaW1wb3J0IHtnZW5lcmF0ZU1hcGJveExheWVycywgdXBkYXRlTWFwYm94TGF5ZXJzfSBmcm9tICdsYXllcnMvbWFwYm94LXV0aWxzJztcbmltcG9ydCB7T1ZFUkxBWV9UWVBFfSBmcm9tICdsYXllcnMvYmFzZS1sYXllcic7XG5pbXBvcnQge3NldExheWVyQmxlbmRpbmd9IGZyb20gJ3V0aWxzL2dsLXV0aWxzJztcbmltcG9ydCB7dHJhbnNmb3JtUmVxdWVzdH0gZnJvbSAndXRpbHMvbWFwLXN0eWxlLXV0aWxzL21hcGJveC11dGlscyc7XG5cbi8vIGRlZmF1bHQtc2V0dGluZ3NcbmltcG9ydCBUaHJlZURCdWlsZGluZ0xheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvM2QtYnVpbGRpbmctbGF5ZXIvM2QtYnVpbGRpbmctbGF5ZXInO1xuaW1wb3J0IHtGSUxURVJfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgTUFQX1NUWUxFID0ge1xuICBjb250YWluZXI6IHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICB9LFxuICB0b3A6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6ICcwcHgnLFxuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJ1xuICB9XG59O1xuXG5jb25zdCBNQVBCT1hHTF9TVFlMRV9VUERBVEUgPSAnc3R5bGUubG9hZCc7XG5jb25zdCBNQVBCT1hHTF9SRU5ERVIgPSAncmVuZGVyJztcbmNvbnN0IFRSQU5TSVRJT05fRFVSQVRJT04gPSAwO1xuXG5jb25zdCBBdHRyaWJ1dGlvbiA9ICgpID0+IChcbiAgPFN0eWxlZEF0dHJidXRpb24+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8va2VwbGVyLmdsL3BvbGljeS9cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICDCqSBrZXBsZXIuZ2wgfHsnICd9XG4gICAgPC9hPlxuICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL2Fib3V0L21hcHMvXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgwqkgTWFwYm94IHx7JyAnfVxuICAgIDwvYT5cbiAgICA8YSBocmVmPVwiaHR0cDovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICDCqSBPcGVuU3RyZWV0TWFwIHx7JyAnfVxuICAgIDwvYT5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXAtZmVlZGJhY2svXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgPHN0cm9uZz5JbXByb3ZlIHRoaXMgbWFwPC9zdHJvbmc+XG4gICAgPC9hPlxuICA8L1N0eWxlZEF0dHJidXRpb24+XG4pO1xuXG5mdW5jdGlvbiBnZXRMYXllclByb3Aoe2ludGVyYWN0aW9uQ29uZmlnLCBob3ZlckluZm8sIGxheWVycywgbGF5ZXJzVG9SZW5kZXIsIGRhdGFzZXRzfSkge1xuICBpZiAoaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5lbmFibGVkICYmIGhvdmVySW5mbyAmJiBob3ZlckluZm8ucGlja2VkKSB7XG4gICAgLy8gaWYgYW55dGhpbmcgaG92ZXJlZFxuICAgIGNvbnN0IHtvYmplY3QsIGxheWVyOiBvdmVybGF5fSA9IGhvdmVySW5mbztcblxuICAgIC8vIGRlY2tnbCBsYXllciB0byBrZXBsZXItZ2wgbGF5ZXJcbiAgICBjb25zdCBsYXllciA9IGxheWVyc1tvdmVybGF5LnByb3BzLmlkeF07XG5cbiAgICBpZiAobGF5ZXIuZ2V0SG92ZXJEYXRhICYmIGxheWVyc1RvUmVuZGVyW2xheWVyLmlkXSkge1xuICAgICAgLy8gaWYgbGF5ZXIgaXMgdmlzaWJsZSBhbmQgaGF2ZSBob3ZlcmVkIGRhdGFcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29uZmlnOiB7ZGF0YUlkfVxuICAgICAgfSA9IGxheWVyO1xuICAgICAgY29uc3Qge2FsbERhdGEsIGZpZWxkc30gPSBkYXRhc2V0c1tkYXRhSWRdO1xuICAgICAgY29uc3QgZGF0YSA9IGxheWVyLmdldEhvdmVyRGF0YShvYmplY3QsIGFsbERhdGEpO1xuICAgICAgY29uc3QgZmllbGRzVG9TaG93ID0gaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGZpZWxkcyxcbiAgICAgICAgZmllbGRzVG9TaG93LFxuICAgICAgICBsYXllclxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuTWFwQ29udGFpbmVyRmFjdG9yeS5kZXBzID0gW01hcFBvcG92ZXJGYWN0b3J5LCBNYXBDb250cm9sRmFjdG9yeSwgRWRpdG9yRmFjdG9yeV07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hcENvbnRhaW5lckZhY3RvcnkoTWFwUG9wb3ZlciwgTWFwQ29udHJvbCwgRWRpdG9yKSB7XG4gIGNsYXNzIE1hcENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIC8vIHJlcXVpcmVkXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIGludGVyYWN0aW9uQ29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBsYXllckJsZW5kaW5nOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBsYXllck9yZGVyOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgZmlsdGVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBDb250cm9sczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgdWlTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwU3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1vdXNlUG9zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbWFwYm94QXBpVXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdmlzU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHVpU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cbiAgICAgIC8vIG9wdGlvbmFsXG4gICAgICByZWFkT25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBpc0V4cG9ydDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBjbGlja2VkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgaG92ZXJJbmZvOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgbWFwTGF5ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgb25NYXBUb2dnbGVMYXllcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBvbk1hcFN0eWxlTG9hZGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTWFwUmVuZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIGdldE1hcGJveFJlZjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBpbmRleDogUHJvcFR5cGVzLm51bWJlclxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgTWFwQ29tcG9uZW50OiBNYXBib3hHTE1hcCxcbiAgICAgIGRlY2tHbFByb3BzOiB7fSxcbiAgICAgIGluZGV4OiAwXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSB7XG4gICAgICAgIC8vIFtsYXllcnMuaWRdOiBtYXBib3hMYXllckNvbmZpZ1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fZGVjayA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAvLyB1bmJpbmQgbWFwYm94Z2wgZXZlbnQgbGlzdGVuZXJcbiAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgdGhpcy5fbWFwLm9mZihNQVBCT1hHTF9TVFlMRV9VUERBVEUpO1xuICAgICAgICB0aGlzLl9tYXAub2ZmKE1BUEJPWEdMX1JFTkRFUik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGF5ZXJzU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5sYXllcnM7XG4gICAgbGF5ZXJEYXRhU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5sYXllckRhdGE7XG4gICAgbWFwTGF5ZXJzU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5tYXBMYXllcnM7XG4gICAgbGF5ZXJPcmRlclNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMubGF5ZXJPcmRlcjtcbiAgICBsYXllcnNUb1JlbmRlclNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmxheWVyc1NlbGVjdG9yLFxuICAgICAgdGhpcy5sYXllckRhdGFTZWxlY3RvcixcbiAgICAgIHRoaXMubWFwTGF5ZXJzU2VsZWN0b3IsXG4gICAgICAvLyB7W2lkXTogdHJ1ZSBcXCBmYWxzZX1cbiAgICAgIChsYXllcnMsIGxheWVyRGF0YSwgbWFwTGF5ZXJzKSA9PlxuICAgICAgICBsYXllcnMucmVkdWNlKFxuICAgICAgICAgIChhY2N1LCBsYXllciwgaWR4KSA9PiAoe1xuICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgIFtsYXllci5pZF06XG4gICAgICAgICAgICAgIGxheWVyLnNob3VsZFJlbmRlckxheWVyKGxheWVyRGF0YVtpZHhdKSAmJiB0aGlzLl9pc1Zpc2libGVNYXBMYXllcihsYXllciwgbWFwTGF5ZXJzKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICApO1xuXG4gICAgZmlsdGVyc1NlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZmlsdGVycztcbiAgICBwb2x5Z29uRmlsdGVycyA9IGNyZWF0ZVNlbGVjdG9yKHRoaXMuZmlsdGVyc1NlbGVjdG9yLCBmaWx0ZXJzID0+XG4gICAgICBmaWx0ZXJzLmZpbHRlcihmID0+IGYudHlwZSA9PT0gRklMVEVSX1RZUEVTLnBvbHlnb24pXG4gICAgKTtcblxuICAgIG1hcGJveExheWVyc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmxheWVyc1NlbGVjdG9yLFxuICAgICAgdGhpcy5sYXllckRhdGFTZWxlY3RvcixcbiAgICAgIHRoaXMubGF5ZXJPcmRlclNlbGVjdG9yLFxuICAgICAgdGhpcy5sYXllcnNUb1JlbmRlclNlbGVjdG9yLFxuICAgICAgZ2VuZXJhdGVNYXBib3hMYXllcnNcbiAgICApO1xuXG4gICAgLyogY29tcG9uZW50IHByaXZhdGUgZnVuY3Rpb25zICovXG4gICAgX2lzVmlzaWJsZU1hcExheWVyKGxheWVyLCBtYXBMYXllcnMpIHtcbiAgICAgIC8vIGlmIGxheWVyLmlkIGlzIG5vdCBpbiBtYXBMYXllcnMsIGRvbid0IHJlbmRlciBpdFxuICAgICAgcmV0dXJuICFtYXBMYXllcnMgfHwgKG1hcExheWVycyAmJiBtYXBMYXllcnNbbGF5ZXIuaWRdKTtcbiAgICB9XG5cbiAgICBfb25DbG9zZU1hcFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5vbkxheWVyQ2xpY2sobnVsbCk7XG4gICAgfTtcblxuICAgIF9vbkxheWVyU2V0RG9tYWluID0gKGlkeCwgY29sb3JEb21haW4pID0+IHtcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLmxheWVyQ29uZmlnQ2hhbmdlKHRoaXMucHJvcHMubGF5ZXJzW2lkeF0sIHtcbiAgICAgICAgY29sb3JEb21haW5cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfaGFuZGxlTWFwVG9nZ2xlTGF5ZXIgPSBsYXllcklkID0+IHtcbiAgICAgIGNvbnN0IHtpbmRleDogbWFwSW5kZXggPSAwLCB2aXNTdGF0ZUFjdGlvbnN9ID0gdGhpcy5wcm9wcztcbiAgICAgIHZpc1N0YXRlQWN0aW9ucy50b2dnbGVMYXllckZvck1hcChtYXBJbmRleCwgbGF5ZXJJZCk7XG4gICAgfTtcblxuICAgIF9vbk1hcGJveFN0eWxlVXBkYXRlID0gKCkgPT4ge1xuICAgICAgLy8gZm9yY2UgcmVmcmVzaCBtYXBib3hnbCBsYXllcnNcbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSB7fTtcbiAgICAgIHRoaXMuX3VwZGF0ZU1hcGJveExheWVycygpO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25NYXBTdHlsZUxvYWRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnByb3BzLm9uTWFwU3R5bGVMb2FkZWQodGhpcy5fbWFwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3NldE1hcGJveE1hcCA9IG1hcGJveCA9PiB7XG4gICAgICBpZiAoIXRoaXMuX21hcCAmJiBtYXBib3gpIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwYm94LmdldE1hcCgpO1xuICAgICAgICAvLyBpIG5vdGljZWQgaW4gY2VydGFpbiBjb250ZXh0IHdlIGRvbid0IGFjY2VzcyB0aGUgYWN0dWFsIG1hcCBlbGVtZW50XG4gICAgICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJpbmQgbWFwYm94Z2wgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5fbWFwLm9uKE1BUEJPWEdMX1NUWUxFX1VQREFURSwgdGhpcy5fb25NYXBib3hTdHlsZVVwZGF0ZSk7XG5cbiAgICAgICAgdGhpcy5fbWFwLm9uKE1BUEJPWEdMX1JFTkRFUiwgKCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbk1hcFJlbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk1hcFJlbmRlcih0aGlzLl9tYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLmdldE1hcGJveFJlZikge1xuICAgICAgICAvLyBUaGUgcGFyZW50IGNvbXBvbmVudCBjYW4gZ2FpbiBhY2Nlc3MgdG8gb3VyIE1hcGJveEdsTWFwIGJ5XG4gICAgICAgIC8vIHByb3ZpZGluZyB0aGlzIGNhbGxiYWNrLiBOb3RlIHRoYXQgJ21hcGJveCcgd2lsbCBiZSBudWxsIHdoZW4gdGhlXG4gICAgICAgIC8vIHJlZiBpcyB1bnNldCAoZS5nLiB3aGVuIGEgc3BsaXQgbWFwIGlzIGNsb3NlZCkuXG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TWFwYm94UmVmKG1hcGJveCwgdGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9vbkJlZm9yZVJlbmRlciA9ICh7Z2x9KSA9PiB7XG4gICAgICBzZXRMYXllckJsZW5kaW5nKGdsLCB0aGlzLnByb3BzLmxheWVyQmxlbmRpbmcpO1xuICAgIH07XG5cbiAgICAvKiBjb21wb25lbnQgcmVuZGVyIGZ1bmN0aW9ucyAqL1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICAgIF9yZW5kZXJNYXBQb3BvdmVyKGxheWVyc1RvUmVuZGVyKSB7XG4gICAgICAvLyBUT0RPOiBtb3ZlIHRoaXMgaW50byByZWR1Y2VyIHNvIGl0IGNhbiBiZSB0ZXN0ZWRcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIG1vdXNlUG9zOiB7bW91c2VQb3NpdGlvbiwgY29vcmRpbmF0ZSwgcGlubmVkfVxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmICghbW91c2VQb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGNsaWNrZWQgc29tZXRoaW5nLCBpZ25vcmUgaG92ZXIgYmVoYXZpb3JcbiAgICAgIGxldCBsYXllckhvdmVyUHJvcCA9IG51bGw7XG4gICAgICBsZXQgbGF5ZXJQaW5uZWRQcm9wID0gbnVsbDtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0ge3g6IG1vdXNlUG9zaXRpb25bMF0sIHk6IG1vdXNlUG9zaXRpb25bMV19O1xuICAgICAgbGV0IHBpbm5lZFBvc2l0aW9uID0ge307XG5cbiAgICAgIGxheWVySG92ZXJQcm9wID0gZ2V0TGF5ZXJQcm9wKHtcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllcnNUb1JlbmRlcixcbiAgICAgICAgZGF0YXNldHNcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjb21wYXJlTW9kZSA9IGludGVyYWN0aW9uQ29uZmlnLnRvb2x0aXAuY29uZmlnXG4gICAgICAgID8gaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuY29tcGFyZU1vZGVcbiAgICAgICAgOiBmYWxzZTtcblxuICAgICAgY29uc3QgaGFzVG9vbHRpcCA9IHBpbm5lZCB8fCBjbGlja2VkO1xuICAgICAgY29uc3QgaGFzQ29tcGFyaXNvblRvb2x0aXAgPSBjb21wYXJlTW9kZSB8fCAoIWNsaWNrZWQgJiYgIXBpbm5lZCk7XG5cbiAgICAgIGlmIChwaW5uZWQgfHwgY2xpY2tlZCkge1xuICAgICAgICAvLyBwcm9qZWN0IGxuZ2xhdCB0byBzY3JlZW4gc28gdGhhdCB0b29sdGlwIGZvbGxvd3MgdGhlIG9iamVjdCBvbiB6b29tXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0ID0gbmV3IFdlYk1lcmNhdG9yVmlld3BvcnQobWFwU3RhdGUpO1xuICAgICAgICBjb25zdCBsbmdMYXQgPSBjbGlja2VkID8gY2xpY2tlZC5sbmdMYXQgOiBwaW5uZWQuY29vcmRpbmF0ZTtcbiAgICAgICAgcGlubmVkUG9zaXRpb24gPSB0aGlzLl9nZXRIb3ZlclhZKHZpZXdwb3J0LCBsbmdMYXQpO1xuICAgICAgICBsYXllclBpbm5lZFByb3AgPSBnZXRMYXllclByb3Aoe1xuICAgICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICAgIGhvdmVySW5mbzogY2xpY2tlZCxcbiAgICAgICAgICBsYXllcnMsXG4gICAgICAgICAgbGF5ZXJzVG9SZW5kZXIsXG4gICAgICAgICAgZGF0YXNldHNcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsYXllckhvdmVyUHJvcCkge1xuICAgICAgICAgIGxheWVySG92ZXJQcm9wLnByaW1hcnlEYXRhID0gbGF5ZXJQaW5uZWRQcm9wLmRhdGE7XG4gICAgICAgICAgbGF5ZXJIb3ZlclByb3AuY29tcGFyZVR5cGUgPSBpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZy5jb21wYXJlVHlwZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7aGFzVG9vbHRpcCAmJiAoXG4gICAgICAgICAgICA8TWFwUG9wb3ZlclxuICAgICAgICAgICAgICB7Li4ucGlubmVkUG9zaXRpb259XG4gICAgICAgICAgICAgIGxheWVySG92ZXJQcm9wPXtsYXllclBpbm5lZFByb3B9XG4gICAgICAgICAgICAgIGNvb3JkaW5hdGU9e2ludGVyYWN0aW9uQ29uZmlnLmNvb3JkaW5hdGUuZW5hYmxlZCAmJiAocGlubmVkIHx8IHt9KS5jb29yZGluYXRlfVxuICAgICAgICAgICAgICBmcm96ZW49e0Jvb2xlYW4oaGFzVG9vbHRpcCl9XG4gICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuX29uQ2xvc2VNYXBQb3BvdmVyfVxuICAgICAgICAgICAgICBtYXBXPXttYXBTdGF0ZS53aWR0aH1cbiAgICAgICAgICAgICAgbWFwSD17bWFwU3RhdGUuaGVpZ2h0fVxuICAgICAgICAgICAgICBpc0Jhc2U9e2NvbXBhcmVNb2RlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtoYXNDb21wYXJpc29uVG9vbHRpcCAmJiAoXG4gICAgICAgICAgICA8TWFwUG9wb3ZlclxuICAgICAgICAgICAgICB7Li4ucG9zaXRpb259XG4gICAgICAgICAgICAgIGxheWVySG92ZXJQcm9wPXtsYXllckhvdmVyUHJvcH1cbiAgICAgICAgICAgICAgY29vcmRpbmF0ZT17aW50ZXJhY3Rpb25Db25maWcuY29vcmRpbmF0ZS5lbmFibGVkICYmIGNvb3JkaW5hdGV9XG4gICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuX29uQ2xvc2VNYXBQb3BvdmVyfVxuICAgICAgICAgICAgICBtYXBXPXttYXBTdGF0ZS53aWR0aH1cbiAgICAgICAgICAgICAgbWFwSD17bWFwU3RhdGUuaGVpZ2h0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbiAgICBfZ2V0SG92ZXJYWSh2aWV3cG9ydCwgbG5nTGF0KSB7XG4gICAgICBjb25zdCBzY3JlZW5Db29yZCA9ICF2aWV3cG9ydCB8fCAhbG5nTGF0ID8gbnVsbCA6IHZpZXdwb3J0LnByb2plY3QobG5nTGF0KTtcbiAgICAgIHJldHVybiBzY3JlZW5Db29yZCAmJiB7eDogc2NyZWVuQ29vcmRbMF0sIHk6IHNjcmVlbkNvb3JkWzFdfTtcbiAgICB9XG5cbiAgICBfcmVuZGVyTGF5ZXIgPSAob3ZlcmxheXMsIGlkeCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBhbmltYXRpb25Db25maWdcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaWR4XTtcbiAgICAgIGNvbnN0IGRhdGEgPSBsYXllckRhdGFbaWR4XTtcbiAgICAgIGNvbnN0IHtncHVGaWx0ZXJ9ID0gZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0gfHwge307XG5cbiAgICAgIGNvbnN0IG9iamVjdEhvdmVyZWQgPSBjbGlja2VkIHx8IGhvdmVySW5mbztcbiAgICAgIGNvbnN0IGxheWVyQ2FsbGJhY2tzID0ge1xuICAgICAgICBvblNldExheWVyRG9tYWluOiB2YWwgPT4gdGhpcy5fb25MYXllclNldERvbWFpbihpZHgsIHZhbClcbiAgICAgIH07XG5cbiAgICAgIC8vIExheWVyIGlzIExheWVyIGNsYXNzXG4gICAgICBjb25zdCBsYXllck92ZXJsYXkgPSBsYXllci5yZW5kZXJMYXllcih7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdwdUZpbHRlcixcbiAgICAgICAgaWR4LFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgbGF5ZXJDYWxsYmFja3MsXG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBhbmltYXRpb25Db25maWcsXG4gICAgICAgIG9iamVjdEhvdmVyZWRcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gb3ZlcmxheXMuY29uY2F0KGxheWVyT3ZlcmxheSB8fCBbXSk7XG4gICAgfTtcblxuICAgIF9yZW5kZXJEZWNrT3ZlcmxheShsYXllcnNUb1JlbmRlcikge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIGxheWVyRGF0YSxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICAgICAgICBtYXBib3hBcGlVcmxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBsZXQgZGVja0dsTGF5ZXJzID0gW107XG4gICAgICAvLyB3YWl0IHVudGlsIGRhdGEgaXMgcmVhZHkgYmVmb3JlIHJlbmRlciBkYXRhIGxheWVyc1xuICAgICAgaWYgKGxheWVyRGF0YSAmJiBsYXllckRhdGEubGVuZ3RoKSB7XG4gICAgICAgIC8vIGxhc3QgbGF5ZXIgcmVuZGVyIGZpcnN0XG4gICAgICAgIGRlY2tHbExheWVycyA9IGxheWVyT3JkZXJcbiAgICAgICAgICAuc2xpY2UoKVxuICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgaWR4ID0+IGxheWVyc1tpZHhdLm92ZXJsYXlUeXBlID09PSBPVkVSTEFZX1RZUEUuZGVja2dsICYmIGxheWVyc1RvUmVuZGVyW2xheWVyc1tpZHhdLmlkXVxuICAgICAgICAgIClcbiAgICAgICAgICAucmVkdWNlKHRoaXMuX3JlbmRlckxheWVyLCBbXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXBTdHlsZS52aXNpYmxlTGF5ZXJHcm91cHNbJzNkIGJ1aWxkaW5nJ10pIHtcbiAgICAgICAgZGVja0dsTGF5ZXJzLnB1c2goXG4gICAgICAgICAgbmV3IFRocmVlREJ1aWxkaW5nTGF5ZXIoe1xuICAgICAgICAgICAgaWQ6ICdfa2VwbGVyZ2xfM2QtYnVpbGRpbmcnLFxuICAgICAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgICAgICBtYXBib3hBcGlVcmwsXG4gICAgICAgICAgICB0aHJlZURCdWlsZGluZ0NvbG9yOiBtYXBTdHlsZS50aHJlZURCdWlsZGluZ0NvbG9yLFxuICAgICAgICAgICAgdXBkYXRlVHJpZ2dlcnM6IHtcbiAgICAgICAgICAgICAgZ2V0RmlsbENvbG9yOiBtYXBTdHlsZS50aHJlZURCdWlsZGluZ0NvbG9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPERlY2tHTFxuICAgICAgICAgIHsuLi50aGlzLnByb3BzLmRlY2tHbFByb3BzfVxuICAgICAgICAgIHZpZXdTdGF0ZT17bWFwU3RhdGV9XG4gICAgICAgICAgaWQ9XCJkZWZhdWx0LWRlY2tnbC1vdmVybGF5XCJcbiAgICAgICAgICBsYXllcnM9e2RlY2tHbExheWVyc31cbiAgICAgICAgICBvbkJlZm9yZVJlbmRlcj17dGhpcy5fb25CZWZvcmVSZW5kZXJ9XG4gICAgICAgICAgb25Ib3Zlcj17dmlzU3RhdGVBY3Rpb25zLm9uTGF5ZXJIb3Zlcn1cbiAgICAgICAgICBvbkNsaWNrPXt2aXNTdGF0ZUFjdGlvbnMub25MYXllckNsaWNrfVxuICAgICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgICBpZiAoY29tcCAmJiBjb21wLmRlY2sgJiYgIXRoaXMuX2RlY2spIHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVjayA9IGNvbXAuZGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlTWFwYm94TGF5ZXJzKCkge1xuICAgICAgY29uc3QgbWFwYm94TGF5ZXJzID0gdGhpcy5tYXBib3hMYXllcnNTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICAgIGlmICghT2JqZWN0LmtleXMobWFwYm94TGF5ZXJzKS5sZW5ndGggJiYgIU9iamVjdC5rZXlzKHRoaXMucHJldmlvdXNMYXllcnMpLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU1hcGJveExheWVycyh0aGlzLl9tYXAsIG1hcGJveExheWVycywgdGhpcy5wcmV2aW91c0xheWVycyk7XG5cbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSBtYXBib3hMYXllcnM7XG4gICAgfVxuXG4gICAgX3JlbmRlck1hcGJveE92ZXJsYXlzKCkge1xuICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9tYXAuaXNTdHlsZUxvYWRlZCgpKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hcGJveExheWVycygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9vblZpZXdwb3J0Q2hhbmdlID0gdmlld1N0YXRlID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vblZpZXdTdGF0ZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnByb3BzLm9uVmlld1N0YXRlQ2hhbmdlKHZpZXdTdGF0ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLm1hcFN0YXRlQWN0aW9ucy51cGRhdGVNYXAodmlld1N0YXRlKTtcbiAgICB9O1xuXG4gICAgX3RvZ2dsZU1hcENvbnRyb2wgPSBwYW5lbElkID0+IHtcbiAgICAgIGNvbnN0IHtpbmRleCwgdWlTdGF0ZUFjdGlvbnN9ID0gdGhpcy5wcm9wcztcblxuICAgICAgdWlTdGF0ZUFjdGlvbnMudG9nZ2xlTWFwQ29udHJvbChwYW5lbElkLCBpbmRleCk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcExheWVycyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBNYXBDb21wb25lbnQsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgbWFwYm94QXBpVXJsLFxuICAgICAgICBtYXBDb250cm9scyxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgZWRpdG9yLFxuICAgICAgICBpbmRleFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGNvbnN0IGxheWVyc1RvUmVuZGVyID0gdGhpcy5sYXllcnNUb1JlbmRlclNlbGVjdG9yKHRoaXMucHJvcHMpO1xuXG4gICAgICBpZiAoIW1hcFN0eWxlLmJvdHRvbU1hcFN0eWxlKSB7XG4gICAgICAgIC8vIHN0eWxlIG5vdCB5ZXQgbG9hZGVkXG4gICAgICAgIHJldHVybiA8ZGl2IC8+O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXBQcm9wcyA9IHtcbiAgICAgICAgLi4ubWFwU3RhdGUsXG4gICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSxcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgIG1hcGJveEFwaVVybCxcbiAgICAgICAgb25WaWV3cG9ydENoYW5nZTogdGhpcy5fb25WaWV3cG9ydENoYW5nZSxcbiAgICAgICAgdHJhbnNmb3JtUmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNFZGl0ID0gdWlTdGF0ZS5tYXBDb250cm9scy5tYXBEcmF3LmFjdGl2ZTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZE1hcENvbnRhaW5lciBzdHlsZT17TUFQX1NUWUxFLmNvbnRhaW5lcn0+XG4gICAgICAgICAgPE1hcENvbnRyb2xcbiAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgIGRyYWdSb3RhdGU9e21hcFN0YXRlLmRyYWdSb3RhdGV9XG4gICAgICAgICAgICBpc1NwbGl0PXtCb29sZWFuKG1hcExheWVycyl9XG4gICAgICAgICAgICBpc0V4cG9ydD17dGhpcy5wcm9wcy5pc0V4cG9ydH1cbiAgICAgICAgICAgIGxheWVycz17bGF5ZXJzfVxuICAgICAgICAgICAgbGF5ZXJzVG9SZW5kZXI9e2xheWVyc1RvUmVuZGVyfVxuICAgICAgICAgICAgbWFwSW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgbWFwQ29udHJvbHM9e21hcENvbnRyb2xzfVxuICAgICAgICAgICAgcmVhZE9ubHk9e3RoaXMucHJvcHMucmVhZE9ubHl9XG4gICAgICAgICAgICBzY2FsZT17bWFwU3RhdGUuc2NhbGUgfHwgMX1cbiAgICAgICAgICAgIHRvcD17MH1cbiAgICAgICAgICAgIGVkaXRvcj17ZWRpdG9yfVxuICAgICAgICAgICAgbG9jYWxlPXt1aVN0YXRlLmxvY2FsZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmU9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVQZXJzcGVjdGl2ZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlU3BsaXRNYXA9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVTcGxpdE1hcH1cbiAgICAgICAgICAgIG9uTWFwVG9nZ2xlTGF5ZXI9e3RoaXMuX2hhbmRsZU1hcFRvZ2dsZUxheWVyfVxuICAgICAgICAgICAgb25Ub2dnbGVNYXBDb250cm9sPXt0aGlzLl90b2dnbGVNYXBDb250cm9sfVxuICAgICAgICAgICAgb25TZXRFZGl0b3JNb2RlPXt2aXNTdGF0ZUFjdGlvbnMuc2V0RWRpdG9yTW9kZX1cbiAgICAgICAgICAgIG9uU2V0TG9jYWxlPXt1aVN0YXRlQWN0aW9ucy5zZXRMb2NhbGV9XG4gICAgICAgICAgICBvblRvZ2dsZUVkaXRvclZpc2liaWxpdHk9e3Zpc1N0YXRlQWN0aW9ucy50b2dnbGVFZGl0b3JWaXNpYmlsaXR5fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPE1hcENvbXBvbmVudFxuICAgICAgICAgICAgey4uLm1hcFByb3BzfVxuICAgICAgICAgICAga2V5PVwiYm90dG9tXCJcbiAgICAgICAgICAgIHJlZj17dGhpcy5fc2V0TWFwYm94TWFwfVxuICAgICAgICAgICAgbWFwU3R5bGU9e21hcFN0eWxlLmJvdHRvbU1hcFN0eWxlfVxuICAgICAgICAgICAgZ2V0Q3Vyc29yPXt0aGlzLnByb3BzLmhvdmVySW5mbyA/ICgpID0+ICdwb2ludGVyJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbj17VFJBTlNJVElPTl9EVVJBVElPTn1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5vbk1vdXNlTW92ZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5fcmVuZGVyRGVja092ZXJsYXkobGF5ZXJzVG9SZW5kZXIpfVxuICAgICAgICAgICAge3RoaXMuX3JlbmRlck1hcGJveE92ZXJsYXlzKGxheWVyc1RvUmVuZGVyKX1cbiAgICAgICAgICAgIDxFZGl0b3JcbiAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGVkaXRvcj17ZWRpdG9yfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXt0aGlzLnBvbHlnb25GaWx0ZXJzKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICBpc0VuYWJsZWQ9e2lzRWRpdH1cbiAgICAgICAgICAgICAgbGF5ZXJzPXtsYXllcnN9XG4gICAgICAgICAgICAgIGxheWVyc1RvUmVuZGVyPXtsYXllcnNUb1JlbmRlcn1cbiAgICAgICAgICAgICAgb25EZWxldGVGZWF0dXJlPXt2aXNTdGF0ZUFjdGlvbnMuZGVsZXRlRmVhdHVyZX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3Zpc1N0YXRlQWN0aW9ucy5zZXRTZWxlY3RlZEZlYXR1cmV9XG4gICAgICAgICAgICAgIG9uVXBkYXRlPXt2aXNTdGF0ZUFjdGlvbnMuc2V0RmVhdHVyZXN9XG4gICAgICAgICAgICAgIG9uVG9nZ2xlUG9seWdvbkZpbHRlcj17dmlzU3RhdGVBY3Rpb25zLnNldFBvbHlnb25GaWx0ZXJMYXllcn1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc0VkaXQgPyAnYWxsJyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBlZGl0b3IudmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9NYXBDb21wb25lbnQ+XG4gICAgICAgICAge21hcFN0eWxlLnRvcE1hcFN0eWxlICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e01BUF9TVFlMRS50b3B9PlxuICAgICAgICAgICAgICA8TWFwQ29tcG9uZW50IHsuLi5tYXBQcm9wc30ga2V5PVwidG9wXCIgbWFwU3R5bGU9e21hcFN0eWxlLnRvcE1hcFN0eWxlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7dGhpcy5fcmVuZGVyTWFwUG9wb3ZlcihsYXllcnNUb1JlbmRlcil9XG4gICAgICAgICAgPEF0dHJpYnV0aW9uIC8+XG4gICAgICAgIDwvU3R5bGVkTWFwQ29udGFpbmVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBNYXBDb250YWluZXIuZGlzcGxheU5hbWUgPSAnTWFwQ29udGFpbmVyJztcblxuICByZXR1cm4gTWFwQ29udGFpbmVyO1xufVxuIl19