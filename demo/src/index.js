import React from 'react'
import {render} from 'react-dom'

import * as api from './mock-server'

import IntegrationAutosuggest from '../../src'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'



class Demo extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
        country1:'',
        country2:'',
        country3:'JP',
        other:'ABC'
      }
  }

  componentDidMount() {
    //this.loadCountrySelector.refs.loadCountrySelector.focus()
    //console.log(this.loadCountrySelector.refs.loadCountrySelector)
  }

  onChange = (field) => {
    return (value) => {
      this.setState((prevState, props) => ({
        [field]: value
      }))
    }
  }

  //ref={(input) => { this.loadCountrySelector = input; }}
  render() {
    return (
      <MuiThemeProvider>
      <div>

        <h1>Reference data selector</h1>

        <IntegrationAutosuggest
          type="country"
          onChange={this.onChange('country1')}
          dontShowOnEmpty={true}
          label="Select country"
          value={this.state.country1}
        />

        <p>Value = {this.state.country1}</p>


        <IntegrationAutosuggest
          type="country"
          onChange={this.onChange('country2')}
          label="Select country"
          value={this.state.country2}
        />

        <p>Value = {this.state.country2}</p>


        <IntegrationAutosuggest
          type="country"
          onChange={this.onChange('country3')}
          label="Select country"
          value={this.state.country3}
        />

        <p>Value = {this.state.country3}</p>


        <IntegrationAutosuggest
          type="unit"
          onChange={this.onChange('weight')}
          label="Enter weight"
          value={this.state.weight}
          showOnEmpty={true}
        />

        <p>Value = {this.state.weight}</p>

        <IntegrationAutosuggest
          type="other"
          onChange={this.onChange('other')}
          label="This should default the value"
          value={this.state.other}
          showOnEmpty={true}
        />

        <p>Value = {this.state.other}</p>

        <IntegrationAutosuggest
          type="nothing"
          onChange={this.onChange('nothing')}
          label="This shouldnot show up"
          value={this.state.nothing}
        />

        <p>There should be no select when there is no values</p>

        <IntegrationAutosuggest
          type="unit"
          onChange={this.onChange('weight2')}
          label="Enter weight"
          value={this.state.weight2}
          showValueInLabel={true}
        />

        <p>Value = {this.state.weight2}</p>

      {/*
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
        />
        */}
      </div>
      </MuiThemeProvider>
    )
  }
}


render(<Demo/>, document.querySelector('#demo'))
