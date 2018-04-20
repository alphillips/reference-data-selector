'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _match = require('autosuggest-highlight/match');

var _match2 = _interopRequireDefault(_match);

var _parse = require('autosuggest-highlight/parse');

var _parse2 = _interopRequireDefault(_parse);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Menu = require('material-ui/Menu');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// let suggestions = [{ "label": "Afghanistan", "value": "AF" }, { "label": "Åland Islands", "value": "AX" }, { "label": "Albania", "value": "AL" }, { "label": "Algeria", "value": "DZ" }, { "label": "American Samoa", "value": "AS" }, { "label": "Andorra", "value": "AD" }, { "label": "Angola", "value": "AO" }, { "label": "Anguilla", "value": "AI" }, { "label": "Antarctica", "value": "AQ" },
// { "label": "Antigua and Barbuda", "value": "AG" }]

if (!window.referenceDataSelectorCache) {
  window.referenceDataSelectorCache = [];
}

function renderInput(inputProps) {
  var classes = inputProps.classes,
      ref = inputProps.ref,
      other = _objectWithoutProperties(inputProps, ['classes', 'ref']);

  return _react2.default.createElement(_TextField2.default, {
    fullWidth: true,
    InputProps: _extends({
      inputRef: ref,
      classes: {
        input: classes.input
      }
    }, other)
  });
}

function renderSuggestionsContainer(options) {
  var containerProps = options.containerProps,
      children = options.children;


  return _react2.default.createElement(
    _Paper2.default,
    _extends({}, containerProps, { square: true }),
    children
  );
}

var styles = function styles(theme) {
  return {
    container: {
      flexGrow: 1,
      position: 'relative'
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    },
    suggestion: {
      display: 'block'
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    }
  };
};

var IntegrationAutosuggest = function (_React$Component) {
  _inherits(IntegrationAutosuggest, _React$Component);

  function IntegrationAutosuggest(props) {
    _classCallCheck(this, IntegrationAutosuggest);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      value: '',
      suggestions: []
    };

    _this.handleSuggestionsFetchRequested = function (_ref) {
      var value = _ref.value;

      _this.setState({
        suggestions: _this.getSuggestions(value, _this.props.showOnEmpty)
      });
    };

    _this.handleSuggestionsClearRequested = function () {
      _this.setState({ suggestions: [] });
    };

    _this.handleChange = function (event, _ref2) {
      var newValue = _ref2.newValue;

      _this.setState({
        value: newValue
      });
    };

    _this.handleSuggestionSelected = function (suggestion, suggestionValue, suggestionIndex, sectionIndex) {
      if (suggestionValue && suggestionValue.suggestion && suggestionValue.suggestion.value) {
        if (_this.props.onChange) {
          _this.props.onChange(suggestionValue.suggestion.value);
        }
        _this.setState({ suggestions: [] });
      }
    };

    _this.loadSuggestions = function (type) {

      if (window.referenceDataSelectorCache[type]) {
        _this.setSuggestions(window.referenceDataSelectorCache[type]);
        _this.updateValue();
        return;
      }

      var host = process.env.REACT_APP_API_HOST || '';
      var urlPrefix = '';
      if (_this.props.url) {
        urlPrefix = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + _this.props.url;
      } else {
        urlPrefix = host + '/api/refdata/';
      }

      fetch(urlPrefix + type, { credentials: 'same-origin' }).then(function (response) {
        if (response.status === 200) {
          response.text().then(function (data) {
            var parsedData = JSON.parse(data);
            window.referenceDataSelectorCache[type] = parsedData;
            _this.setSuggestions(parsedData);
            _this.updateValue();
            //this.setState({suggestions: parsedData});
          });
        }
      });
    };

    _this.updateValue = function () {
      if (_this.props.value) {
        var defaultVal = _this.suggestions.find(function (item) {
          return item.value.toLowerCase() === _this.props.value.toLowerCase();
        });
        _this.setState({ value: defaultVal.label });
      }
    };

    _this.shouldRenderSuggestions = function (value) {
      return true;
    };

    _this.getSuggestionValue = function (suggestion) {
      return suggestion.label;
    };

    _this.setSuggestions = function (_suggestions) {
      _this.suggestions = _suggestions;

      if (_this.suggestions.length === 0) {
        _this.setState({ hide: true });
      }

      if (_this.suggestions.length === 1) {}
    };

    _this.getSuggestions = function (value, showOnEmpty) {

      var inputValue = value.trim().toLowerCase();
      var inputLength = inputValue.length;
      var count = 0;

      if (inputLength === 0) {
        if (_this.props.onChange) {
          _this.props.onChange('');
        }
      }

      if (inputLength === 0 && showOnEmpty) {
        return _this.suggestions;
      }

      return inputLength === 0 ? [] : _this.suggestions.filter(function (suggestion) {
        var keep = count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
    };

    _this.renderSuggestion = function (suggestion, _ref3) {
      var query = _ref3.query,
          isHighlighted = _ref3.isHighlighted;

      var matches = (0, _match2.default)(suggestion.label, query);
      var parts = (0, _parse2.default)(suggestion.label, matches);

      var extra = '';

      if (_this.props.showValueInLabel) {
        extra = ' (' + suggestion.value + ')';
      }
      console.log(suggestion);
      return _react2.default.createElement(
        _Menu.MenuItem,
        { selected: isHighlighted, component: 'div' },
        _react2.default.createElement(
          'div',
          null,
          parts.map(function (part, index) {
            return part.highlight ? _react2.default.createElement(
              'span',
              { key: String(index), style: { fontWeight: 300 } },
              part.text
            ) : _react2.default.createElement(
              'strong',
              { key: String(index), style: { fontWeight: 500 } },
              part.text
            );
          }),
          extra
        )
      );
    };

    _this.loadSuggestions(props.type);

    _this.suggestions = [];
    return _this;
  }

  IntegrationAutosuggest.prototype.componentDidReceiveProps = function componentDidReceiveProps(nextProps) {
    console.log(nextProps);
  };

  IntegrationAutosuggest.prototype.render = function render() {
    var classes = this.props.classes;


    return _react2.default.createElement(
      'div',
      { style: this.state.hide && { display: 'none' } },
      _react2.default.createElement(_reactAutosuggest2.default, {
        id: this.props.id,
        theme: {
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        },
        renderInputComponent: renderInput,
        suggestions: this.state.suggestions,
        onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
        renderSuggestionsContainer: renderSuggestionsContainer,
        getSuggestionValue: this.getSuggestionValue,
        renderSuggestion: this.renderSuggestion,
        onSuggestionSelected: this.handleSuggestionSelected,
        shouldRenderSuggestions: this.shouldRenderSuggestions,
        inputProps: {
          classes: classes,
          placeholder: this.props.label,
          value: this.state.value,
          onChange: this.handleChange
        }
      })
    );
  };

  return IntegrationAutosuggest;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? IntegrationAutosuggest.propTypes = {
  classes: _propTypes2.default.object.isRequired
} : void 0;

exports.default = (0, _styles.withStyles)(styles)(IntegrationAutosuggest);
module.exports = exports['default'];