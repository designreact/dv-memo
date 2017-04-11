import React from 'react'
import PropTypes from 'prop-types'
import Memos from '../../containers/Memos'

const App = ({ children }) => {
  return (
    <div className="app">
      {children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.instanceOf(Memos).isRequired,
}

export default App
