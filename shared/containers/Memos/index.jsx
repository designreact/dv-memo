if (process.env.CLIENT) {
  require('./_styles.scss')
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

import Memo from '../../components/Memo'
import Sort from '../../components/Sort'

export class Memos extends Component {
  render() {
    const memos = this.props.memos.map(memo => {
      return <Memo {...memo} />
    })
    const sort = <Sort />

    return (
      <div className="memos">
        <div className="memos-header">
          {sort}
        </div>
        <div className="memos-items">
          {memos}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    memos: state.memos,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memos)

Memos.propTypes = {
  memos: PropTypes.arrayOf(PropTypes.object).isRequired,
}
