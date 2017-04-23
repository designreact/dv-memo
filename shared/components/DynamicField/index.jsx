import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class DynamicField extends Component {
  constructor() {
    super()
    this.state = {
      blurred: true,
    }
  }

  componentDidMount() {
    // select text in input when focus is true
    if (this.inputField) this.inputField.focus()
  }

  componentDidUpdate() {
    // select text in input when editing
    if (this.inputField) this.inputField.focus()
  }

  render() {
    const { TagName, FieldTagName, className, focus, value, onUpdateValue, maxBodyLength } = this.props
    if (!this.state.blurred || focus) {
      return (
        <FieldTagName
          ref={c => { this.inputField = c }}
          className={className}
          type="text"
          maxLength={maxBodyLength}
          defaultValue={value}
          onBlur={event => {
            onUpdateValue(className, event.target.value)
            this.setState({
              blurred: true,
            })
          }}
          onFocus={event => {
            event.target.select()
          }}
        />
      )
    }
    // TODO use separate classNames for input and Tags
    return (
      <TagName
        role="button"
        tabIndex="0"
        className={className}
        onFocus={() => {
          this.setState({
            blurred: false,
          })
        }}
      >
        {value}
      </TagName>
    )
  }
}

DynamicField.propTypes = {
  TagName: PropTypes.string.isRequired,
  FieldTagName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  focus: PropTypes.bool,
  maxBodyLength: PropTypes.number,
  value: PropTypes.string.isRequired,
  onUpdateValue: PropTypes.func.isRequired,
}

DynamicField.defaultProps = {
  focus: false,
  maxBodyLength: 20,
  onUpdateLength: () => {},
}

export default DynamicField
