if (process.env.CLIENT) {
  require('./_styles.scss')
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

export class Notifier extends Component {
  render() {
    const message = this.props.message
    const notificationClassName = this.props.type ? this.props.type.split('_')[1].toLowerCase() : ''
    let notification
    if (message && message.length) notification = <div className={`notifier-message ${notificationClassName}`}>{message}</div>
    return (
      <div className="notifier">
        {notification}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    type: state.notifier.type,
    message: state.notifier.message,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifier)

Notifier.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
}

Notifier.defaultProps = {
  type: '',
  message: '',
}
