import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Demo extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
        value:''
      }
  }

  componentDidMount() {
    this.loadCountrySelector.refs.loadCountrySelector.focus()
    console.log(this.loadCountrySelector.refs.loadCountrySelector)
  }

  onChange = (val) => {
    this.setState((prevState, props) => ({
      value: val
    }))
  }
  //ref={(input) => { this.loadCountrySelector = input; }}
  render() {
    return (
      <MuiThemeProvider>
      <div>
        <h1>reference-data-selector Demo</h1>
        <Component
          id="loadCountrySelector"
          ref={(input) => { this.loadCountrySelector = input }}
          label="Country"
          placeholder="Select country"
          type="daff.common.country"
          onChange={this.onChange}
          value={this.state.value}
          url="/RefDataRest/resources/v2/ref-data/data-set/"
          helpText="This is some help for the ref data field"
        />
      </div>
      </MuiThemeProvider>
    )
  }
}


render(<Demo/>, document.querySelector('#demo'))
