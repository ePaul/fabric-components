define(['exports', 'react', '../imports', './tile'], function (exports, _react, _imports, _tile) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WSTilesChart = undefined;

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var WSTilesChart = exports.WSTilesChart = function (_Component) {
    _inherits(WSTilesChart, _Component);

    function WSTilesChart(props) {
      _classCallCheck(this, WSTilesChart);

      var _this = _possibleConstructorReturn(this, (WSTilesChart.__proto__ || Object.getPrototypeOf(WSTilesChart)).call(this, props));

      _this.state = { tileSize: 0 };
      _this.titleDivSize = 30;

      _this.getTileSize = _this.getTileSize.bind(_this);
      return _this;
    }

    _createClass(WSTilesChart, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setState({ tileSize: this.getTileSize() });
      }
    }, {
      key: 'getTileSize',
      value: function getTileSize() {
        var _props = this.props,
            height = _props.height,
            width = _props.width,
            maxTileSize = _props.maxTileSize,
            minTileSize = _props.minTileSize,
            data = _props.data;

        var groups = data.groups || {};

        if (maxTileSize === minTileSize || Object.keys(groups).length === 0) {
          return minTileSize;
        }

        var tilesAmount = Object.keys(groups).map(function (groupName) {
          return groups[groupName].length;
        }).reduce(function (a, b) {
          return a + b;
        });

        var tileSize = this.calculateMaximumPossibleTileSize(width, height - this.titleDivSize, tilesAmount);

        if (tileSize <= maxTileSize && tileSize >= minTileSize) {
          return tileSize;
        } else if (tileSize > maxTileSize) {
          return maxTileSize;
        }

        return minTileSize;
      }
    }, {
      key: 'calculateMaximumPossibleTileSize',
      value: function calculateMaximumPossibleTileSize(width, height, tilesAmount) {
        var chartArea = width < height ? width * width : height * height;
        return Math.sqrt(chartArea / tilesAmount);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props2 = this.props,
            data = _props2.data,
            config = _props2.config,
            title = _props2.title,
            width = _props2.width,
            height = _props2.height;

        var groups = data.groups || {};
        return _react2.default.createElement(
          'div',
          { className: 'ws-tiles-chart', style: { width: width + 'px', height: height + 'px' } },
          _react2.default.createElement(
            'div',
            { className: 'tiles-chart-title' },
            title
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'tiles-chart-container',
              style: { maxHeight: height - this.titleDivSize + 'px' },
              onMouseEnter: this.props.onMouseEnter,
              onMouseLeave: this.props.onMouseLeave
            },
            Object.keys(groups).map(function (groupName) {
              return groups[groupName].map(function (tile) {
                return _react2.default.createElement(_tile.Tile, {
                  identifier: tile,
                  groupName: groupName,
                  config: config[groupName],
                  size: _this2.state.tileSize,
                  onClick: _this2.props.onClick
                });
              });
            })
          )
        );
      }
    }]);

    return WSTilesChart;
  }(_imports.Component);

  Object.defineProperty(WSTilesChart, 'defaultProps', {
    enumerable: true,
    writable: true,
    value: {
      data: {},
      config: {},
      title: '',
      maxTileSize: 25,
      minTileSize: 8,
      width: 80,
      height: 80,
      onMouseEnter: function onMouseEnter() {},
      onMouseLeave: function onMouseLeave() {},
      onClick: function onClick() {}
    }
  });
  Object.defineProperty(WSTilesChart, 'propTypes', {
    enumerable: true,
    writable: true,
    value: {
      data: _imports.PropTypes.object,
      config: _imports.PropTypes.object,
      title: _imports.PropTypes.string,
      maxTileSize: _imports.PropTypes.number,
      width: _imports.PropTypes.number,
      height: _imports.PropTypes.number,
      onMouseEnter: _imports.PropTypes.func,
      onMouseLeave: _imports.PropTypes.func,
      onClick: _imports.PropTypes.func
    }
  });
});