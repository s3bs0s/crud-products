const validate = (data, requestFields) => {
  let index
  const result = requestFields.every((field, indexArray) => {
    index = indexArray
    return data[field]
  })

  return { result, field: requestFields[index] }
}

module.exports = validate