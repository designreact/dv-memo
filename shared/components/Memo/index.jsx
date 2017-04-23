if (process.env.CLIENT) {
  require('./_styles.scss')
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DynamicField from '../DynamicField'
import Count from '../Count'

const maxBodyLength = 140

export class Memo extends Component {

  constructor() {
    super()
    this.boundUpdateMemo = this.updateMemo.bind(this)
    this.boundDeleteMemo = this.deleteMemo.bind(this)
    this.state = {
      bodyLength: null,
    }
  }

  getMemo() {
    return {
      id: this.props.id,
      title: this.props.title,
      body: this.props.body,
    }
  }

  updateMemo(className, value) {
    // update memo ahead sending to server
    const memo = this.getMemo()
    if (className === 'memo-title') {
      memo.title = value
    } else {
      memo.body = value
    }
    this.props.onUpdate(memo)
    this.setState({
      bodyLength: null,
    })
  }

  deleteMemo() {
    this.props.onDelete(this.getMemo())
  }

  render() {
    const { title, body, isNew } = this.props
    let counter
    if (this.state.bodyLength !== null) counter = <Count count={this.state.bodyLength} maxLength={maxBodyLength} />
    return (
      <div className="memo">
        <DynamicField
          TagName="h4"
          FieldTagName="input"
          className="memo-title"
          value={title}
          onUpdateValue={this.boundUpdateMemo}
          focus={isNew}
        />
        <DynamicField
          TagName="p"
          FieldTagName="textarea"
          className="memo-body"
          value={body}
          onUpdateValue={this.boundUpdateMemo}
          onUpdateLength={bodyLength => {
            this.setState({ bodyLength })
          }}
          maxBodyLength={maxBodyLength}
        />
        <button className="memo-delete" onClick={this.boundDeleteMemo}>Delete</button>
        {counter}
      </div>
    )
  }
}

Memo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

Memo.defaultProps = {
  isNew: false,
}

export default Memo
