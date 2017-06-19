import React from 'react';

import Select from 'react-select'

import 'react-select/dist/react-select.css'
import './ref-data-selector.css'

class RefDataSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      options: []
    }

    this.linkStyle = {
      maxWidth: props.maxWidth || "100%"
    };

  }

  componentDidMount() {
    let urlPrefix = '/api/refdata/'
    fetch(urlPrefix + this.props.type, { credentials: 'same-origin' }).then(
      response => {
        if (response.status === 200) {
          response.text().then(data => {
            this.setState({
              options: JSON.parse(data)
            })
          });
        }
      }
    )
  }

  onChange = (val) => {
    var value = val ? val.value : null
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    const { id, label, value, error, placeholder } = this.props;

    const errorClass = error ? 'hasError' : '';

    return (
      <div className={"text-group ref-data-selector " + errorClass} style={this.linkStyle}>
        <label htmlFor={id}>{label}</label>
        <Select
          name="form-field-name"
          options={this.state.options}
          onChange={this.onChange}
          value={value}
          placeholder={placeholder}
          inputProps={{ id: id, className: 'hideError' }}
        />
        <span role="alert" aria-live="polite" className={errorClass}>{error}</span>
      </div>
    )
  }
}

export default RefDataSelector
