import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'

class Demo extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
        value:''
      }
  }

  onChange = (val) => {
    this.setState((prevState, props) => ({
      value: val
    }))
  }

  render() {
    return (
      <div>
        <h1>reference-data-selector Demo</h1>
        <Component
          id="load-country-selector"
          label="Country"
          placeholder="Select country"
          type="country"
          onChange={this.onChange}
          value={this.state.value}
        />
      </div>
    )
  }
}


render(<Demo/>, document.querySelector('#demo'))
