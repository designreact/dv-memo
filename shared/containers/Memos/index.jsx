if (process.env.CLIENT) {
  require('./_styles.scss')
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

import Memo from '../../components/Memo'
import Sort from '../Sort'

export class Memos extends Component {

  sortMemos() {
    const sort = this.props.sort
    const memos = this.props.memos
    // use id as default sort property
    const prop = sort !== 'default' ? sort : 'id'
    const memorandums = memos.slice(0)
    if (sort !== 'created_date') {
      memorandums.sort((a, b) => {
        if (a[prop] > b[prop]) return 1
        if (a[prop] < b[prop]) return -1
        return 0
      })
      return memorandums
    }
    memorandums.sort((a, b) => {
      // TODO move parsing of timestamps to action creators - map to timestamp property
      // sort on new timestamp property
      const stampA = new Date(a.created_date).getTime()
      const stampB = new Date(b.created_date).getTime()
      if (stampA > stampB) return 1
      if (stampA < stampB) return -1
      return 0
    })
    return memorandums
  }

  mapMemos(memos) {
    const memorandums = memos.slice(0)
    const apiServer = this.props.apiServer
    return memorandums.map(memo => {
      // only display valid memos
      if (typeof memo.id === 'number' &&
      memo.title &&
      memo.body) {
        return (
          <Memo
            key={memo.id}
            {...memo}
            onUpdate={data => {
              this.props.actions.updateMemo(apiServer, data)
            }}
            onDelete={data => {
              this.props.actions.deleteMemo(apiServer, data)
            }}
          />
        )
      }
      return false
    })
  }

  render() {
    const apiServer = this.props.apiServer
    const memorandums = this.sortMemos()
    const memos = this.mapMemos(memorandums)
    return (
      <div className="memos">
        <div className="memos-header">
          <Sort />
        </div>
        <div className="memos-items">
          {memos}
          <button
            className="memos-add"
            onClick={() => {
              this.props.actions.createMemo(apiServer)
            }}
          >
            Add New Memo
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    apiServer: state.app.apiServer,
    memos: state.memos,
    sort: state.sort,
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
  sort: PropTypes.string.isRequired,
  apiServer: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
}
