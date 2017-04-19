if (process.env.CLIENT) {
  require('./_styles.scss')
}

import React from 'react'
import PropTypes from 'prop-types'
import DynamicField from '../DynamicField'

const Memo = ({ id, title, body, isNew, onUpdate, onDelete }) => {
  const memo = { id, title, body }
  const updateMemo = (className, value) => {
    // update memo ahead sending to server
    if (className === 'memo-title') {
      memo.title = value
    } else {
      memo.body = value
    }
    onUpdate(memo)
  }
  const deleteMemo = () => {
    onDelete(memo)
  }
  return (
    <div className="memo">
      {<DynamicField TagName="h4" className="memo-title" value={title} focus={isNew} onUpdateValue={updateMemo} />}
      {<DynamicField TagName="p" className="memo-body" value={body} onUpdateValue={updateMemo} />}
      <button className="memo-delete" onClick={deleteMemo}>Delete</button>
    </div>
  )
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
