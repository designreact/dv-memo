if (process.env.CLIENT) {
  require('./_styles.scss')
}

import React from 'react'
import PropTypes from 'prop-types'

const Count = ({ count, maxLength }) => {
  const remainingLetters = maxLength - count
  const notification = remainingLetters <= 15 ? remainingLetters : ''
  return (
    <div className="count">{notification}</div>
  )
}

export default Count

Count.propTypes = {
  count: PropTypes.number.isRequired,
  maxLength: PropTypes.number.isRequired,
}
