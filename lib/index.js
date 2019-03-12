'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require('./AutoComplete/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _help = require('@react-ag-components/help');

var _help2 = _interopRequireDefault(_help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import './ref-data-selector.css'


var RefDataSelector = function (_React$Component) {
  _inherits(RefDataSelector, _React$Component);

  function RefDataSelector(props) {
    _classCallCheck(this, RefDataSelector);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onChangeOld = function (val) {
      var value = val ? val.value : null;
      if (_this.props.onChange) {
        _this.props.onChange(value);
      }
    };

    _this.onChange = function (val, src) {
      var code = src.find(function (item) {
        return item.label.toLowerCase() === val.toLowerCase();
      });
      if (code) {
        if (_this.props.onChange) {
          _this.props.onChange(code.value, src, code);
        }
      } else {
        if (val.trim().length === 0) {
          if (_this.props.onChange) {
            _this.props.onChange('');
          }
        }
      }
    };

    _this.onNewRequest = function (val) {
      var value = val.value;
      if (_this.props.onChange) {
        _this.props.onChange(value);
      }
      _this.setState({
        inputText: val.label
      });
    };

    _this.onTextChange = function (event) {
      var value = event.target.value;
      _this.onChange(value, _this.state.options);
    };

    _this.state = {
      options: [],
      text: props.value,
      inputText: '',
      display: true
    };
    _this.linkStyle = {
      maxWidth: props.maxWidth || "100%"
    };
    _this.host = process.env.API_HOST || '';
    if (props.url) {
      _this.urlPrefix = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + props.url;
    } else {
      _this.urlPrefix = _this.host + '/api/refdata/';
    }
    return _this;
  }

  RefDataSelector.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!this.props.noCache) {
      if (window.refDataSelectorCache && window.refDataSelectorCache[this.props.type]) {
        var data = window.refDataSelectorCache[this.props.type];
        this.setState({
          options: data
        });
        if (data.length === 1) {
          this.onChange(data[0].label, data);
          this.setState({
            inputText: data[0].label
          });
        }
        if (data.length === 0) {
          this.setState({
            display: false
          });
          if (this.props.onChange) {
            this.props.onChange('');
          }
        }
        if (this.state.text) {
          var text = data.find(function (item) {
            return item.value.toLowerCase() === _this2.state.text.toLowerCase();
          });
          if (text && text.label) {
            this.setState({
              inputText: text.label
            });
          }
        }
        return;
      }
    }

    fetch(this.urlPrefix + this.props.type, { credentials: 'same-origin' }).then(function (response) {
      if (response.status === 200) {
        response.text().then(function (data) {
          var parsedData = JSON.parse(data);
          _this2.setState({
            options: parsedData
          });
          if (parsedData.length === 1) {
            _this2.onChange(parsedData[0].label, parsedData);
            _this2.setState({
              inputText: parsedData[0].label
            });
          }
          if (parsedData.length === 0) {
            _this2.setState({
              display: false
            });
            if (_this2.props.onChange) {
              _this2.props.onChange('');
            }
          }
          if (_this2.state.text) {
            var _text = parsedData.find(function (item) {
              return item.value.toLowerCase() === _this2.state.text.toLowerCase();
            });
            if (_text && _text.label) {
              _this2.setState({
                inputText: _text.label
              });
            }
          }
          if (!_this2.props.noCache) {
            if (!window.refDataSelectorCache) {
              window.refDataSelectorCache = [];
            }
            window.refDataSelectorCache[_this2.props.type] = JSON.parse(data);
          }
        });
      }
    });
  };

  RefDataSelector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    var textValue = nextProps.value;

    if (!this.props.noCache) {
      if (window.refDataSelectorCache && window.refDataSelectorCache[this.props.type]) {
        var data = window.refDataSelectorCache[this.props.type];
        this.setState({
          options: data
        });

        if (textValue) {
          var text = data.find(function (item) {
            return item.value.toLowerCase() === textValue.toLowerCase();
          });
          if (text && text.label) {
            this.setState({
              inputText: text.label
            });
          }
        } else {
          this.setState({ inputText: '' });
        }
        return;
      }
    }

    fetch(this.urlPrefix + this.props.type, { credentials: 'same-origin' }).then(function (response) {
      if (response.status === 200) {
        response.text().then(function (data) {
          var parsedData = JSON.parse(data);
          _this3.setState({
            options: parsedData
          });

          if (textValue) {
            var _text2 = parsedData.find(function (item) {
              return item.value.toLowerCase() === textValue.toLowerCase();
            });

            if (_text2 && _text2.label) {
              _this3.setState({
                inputText: _text2.label
              });
            }
          } else {
            _this3.setState({ inputText: '' });
          }

          if (!_this3.props.noCache) {
            if (!window.refDataSelectorCache) {
              window.refDataSelectorCache = [];
            }
            window.refDataSelectorCache[_this3.props.type] = JSON.parse(data);
          }
        });
      }
    });
  };

  RefDataSelector.prototype.render = function render() {
    var _props = this.props,
        id = _props.id,
        label = _props.label,
        value = _props.value,
        error = _props.error,
        placeholder = _props.placeholder,
        ref = _props.ref;


    var errorClass = error ? 'hasError' : '';

    var dataSourceConfig = {
      text: 'label',
      value: 'value'
    };

    var style = {
      'width': '100%',
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
      'color': '#313131'
    };

    var labelStyle = {
      'width': '100%',
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
      'color': '#999'
    };

    var containerStyle = {
      display: this.state.display ? 'block' : 'none',
      maxWidth: this.props.maxWidth || "100%"
    };

    var inputContainerStyle = {};
    var helpContainerStyle = {
      display: 'none'
    };
    var className = '';

    if (this.props.helpText) {
      className = 'input-with-help';
      inputContainerStyle = {
        width: '90%'
      };

      helpContainerStyle = {
        marginTop: '40px'
      };
    }

    var autoCompleteStyle = _extends({}, style, inputContainerStyle);

    return _react2.default.createElement(
      'div',
      { className: "text-group ref-data-selector " + errorClass + ' ' + className, style: containerStyle },
      _react2.default.createElement(_AutoComplete2.default, {
        id: id,
        ref: id,
        floatingLabelText: label,
        openOnFocus: true,
        dataSource: this.state.options,
        onUpdateInput: this.onChange,
        dataSourceConfig: dataSourceConfig,
        filter: _AutoComplete2.default.caseInsensitiveFilter,
        onNewRequest: this.onNewRequest,
        style: autoCompleteStyle,
        textFieldStyle: style,
        floatingLabelStyle: labelStyle,
        fullWidth: true,
        searchText: this.state.inputText,
        menuStyle: { maxHeight: "600px", overflowY: 'auto' },
        onKeyUp: this.onTextChange,
        maxSearchResults: 100,
        title: this.props.title || ''
      }),
      this.props.helpText && _react2.default.createElement(_help2.default, {
        text: this.props.helpText,
        style: helpContainerStyle
      })
    );
  };

  return RefDataSelector;
}(_react2.default.Component);

exports.default = RefDataSelector;
module.exports = exports['default'];