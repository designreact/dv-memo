if (process.env.CLIENT) {
  require('./_styles.scss')
}

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import PropTypes from 'prop-types'

export class Sort extends Component {
  render() {
    return (
      <select
        className="sort"
        onChange={event => {
          this.props.actions.updateSort(event.target.value)
        }}
        value={this.props.sort}
      >
        <option value="default">Default</option>
        <option value="title">Title</option>
        <option value="created_date">Created Date</option>
      </select>
    )
  }
}

function mapStateToProps(state) {
  return {
    sort: state.sort,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)

Sort.propTypes = {
  sort: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
}
