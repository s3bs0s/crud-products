import React from 'react'

const Field = (props) => {
  const {
    // General
    footer,
    type = 'text',
    disabled = false,
    placeholder,
    value,
    handleChange = () => {},
    handleSend = () => {},

    // Textarea
    minHeight = '90px',
    maxHeight = '130px',

    // Select
    options = [],
    defaultOption
  } = props
  let field

  const handleOnlyNumbers = ({ target: { value } }) => {
    if (value) {
      if (value && Number(value) !== NaN) {
        return handleChange({ target: { value: Number(value) } })
      } else {
        handleChange({ target: { value: 0 } })
      }
    } else {
      handleChange({ target: { value: '' } })
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }

  switch(type) {
    case 'textarea':
      field = (
        <textarea
          value={value}
          className='textarea'
          style={{ minHeight, maxHeight }}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
        ></textarea>
      )
      break;
    case 'select':
      field = (
        <div className='select'>
          <select
            value={value}
            disabled={disabled}
            onChange={handleChange}
          >
            {
              defaultOption&&
                <option value=''>
                  { defaultOption }
                </option>
            }
            {
              options.map(({ value, text }, index) => (
                <option key={index} value={value}>
                  { text }
                </option>
              ))
            }
          </select>
          <div className='arrow'>
            <i className='fas fa-caret-down'></i>
          </div>
        </div>
      )
      break;
    case 'number':
      field = (
        <input
          onKeyUp={handleKeyUp}
          value={value}
          disabled={disabled}
          type='number'
          placeholder={placeholder}
          onChange={handleOnlyNumbers}
        />
      )
      break;
    default:
      field = (
        <input
          onKeyUp={handleKeyUp}
          value={value}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
        />
      )
  }

  return (
    <div className='fieldContainer'>
      { field }
      {
        footer&&
          <p className='footer'>{ footer }</p>
      }
    </div>
  )
}

export default Field
