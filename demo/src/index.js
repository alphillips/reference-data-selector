import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'

let Demo = React.createClass({
  render() {
    return <div>
      <h1>reference-data-selector Demo</h1>
      <Component type="country"/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
