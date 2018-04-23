import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

// let suggestions = [{ "label": "Afghanistan", "value": "AF" }, { "label": "Åland Islands", "value": "AX" }, { "label": "Albania", "value": "AL" }, { "label": "Algeria", "value": "DZ" }, { "label": "American Samoa", "value": "AS" }, { "label": "Andorra", "value": "AD" }, { "label": "Angola", "value": "AO" }, { "label": "Anguilla", "value": "AI" }, { "label": "Antarctica", "value": "AQ" },
// { "label": "Antigua and Barbuda", "value": "AG" }]

if(!window.referenceDataSelectorCache){
  window.referenceDataSelectorCache = []
}
// let weightUnitOptions = [
//   { "value": "kg", "label": "kilogram" },
//   { "value": "g", "label": "gram" },
//   { "value": "mg", "label": "milligram" },
//   { "value": "t", "label": "tonne" }
// ]
// window.referenceDataSelectorCache['unit'] = weightUnitOptions

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}


function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}



const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '32px'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class IntegrationAutosuggest extends React.Component {

  state = {
    value: '',
    suggestions: [],
  };

  constructor(props) {
      super(props)



      this.suggestions = []
  }

  componentDidMount() {
    this.loadSuggestions(this.props.type)
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value, this.props.dontShowOnEmpty),
    });


  };

  handleSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  handleSuggestionSelected = (suggestion, suggestionValue, suggestionIndex, sectionIndex) => {
    if(suggestionValue && suggestionValue.suggestion && suggestionValue.suggestion.value){
      if(this.props.onChange){
        this.props.onChange(suggestionValue.suggestion.value, this.suggestions)
      }
      this.setState({suggestions: []});
    }
  }

  loadSuggestions = (type) => {

    if(window.referenceDataSelectorCache[type]){
      this.setSuggestions(window.referenceDataSelectorCache[type])
      this.updateValue()
      return
    }

    const host = process.env.REACT_APP_API_HOST || ''
    let urlPrefix = ''
    if(this.props.url) {
        urlPrefix = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '') + this.props.url
    } else {
      urlPrefix = host + '/api/refdata/'
    }

    fetch(urlPrefix + type, { credentials: 'same-origin' }).then(
      response => {
        if (response.status === 200) {
          response.text().then(data => {
            const parsedData = JSON.parse(data)
            window.referenceDataSelectorCache[type] = parsedData
            this.setSuggestions(parsedData)
            this.updateValue()
            //this.setState({suggestions: parsedData});
          });
        }
      }
    )

  }

  updateValue = () => {
    if(this.props.value){
      let defaultVal = this.suggestions.find((item) =>  item.value.toLowerCase() === this.props.value.toLowerCase())
      this.setState({value: defaultVal.label});
    }

  }

  shouldRenderSuggestions = (value) => {
    return true
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.label;
  }

  setSuggestions = (_suggestions) => {
    this.suggestions = _suggestions

    if(this.suggestions.length === 0){
      this.setState({hide: true});
    }

    if(this.suggestions.length === 1){

    }

  }

  getSuggestions = (value, dontShowOnEmpty) => {

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    if(inputLength === 0){
      if(this.props.onChange){
        this.props.onChange('')
      }
    }

    if(inputLength === 0 && !dontShowOnEmpty) {
      return this.suggestions
    }

    return inputLength === 0
      ? []
      : this.suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    let extra = ''

    if(this.props.showValueInLabel){
      extra = ' (' + suggestion.value +')'
    }

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            );
          })}
          {extra}
        </div>
      </MenuItem>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={this.state.hide && {display:'none'}}>
        <Autosuggest
          id={this.props.id}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected={this.handleSuggestionSelected}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          inputProps={{
            classes,
            placeholder: this.props.label,
            value: this.state.value,
            onChange: this.handleChange,
            autoFocus:this.props.autoFocus || false,
            inputRef:this.props.inputRef
          }}
        />
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
