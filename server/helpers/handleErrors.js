const handleError = (res, error) => {
  res.status(500).json(prepareErrorToTranslate(error))
}

const prepareErrorToTranslate = (error) => {
  if (typeof error !== 'string') {
    return JSON.parse(translateError(JSON.stringify(error)))
  } else {
    return translateError(error)
  }
}

const translateError = (error) => {
  error = error.replace('_id', 'Identificador')
  error = error.replace('name', 'Nombre')
  error = error.replace('cost', 'Costo')
  error = error.replace('description', 'Descripción')
  error = error.replace('category', 'Categoría')
  return error
}

module.exports = handleError