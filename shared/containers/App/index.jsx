if (process.env.CLIENT) {
  require('../../../scss/main.scss')
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default App
