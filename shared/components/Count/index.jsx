if (process.env.CLIENT) {
  require('./_styles.scss')
}

import React from 'react'
// import PropTypes from 'prop-types'

const Count = () => {
  return (
    <div className="count" />
  )
}

export default Count
