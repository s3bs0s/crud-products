import types from '../actions/types'

/*
* Carga de un producto en el store
*/
const set = (action) => {
  return action.product || null
}

/*
* Elimina el producto del store
*/
const remove = () => {
  return null
}

const productReducer = (state = [], action) => {
  switch (action.type) {
    case types.PRODUCT.SET:
      return set(action)
    case types.PRODUCT.REMOVE:
      return remove()
    default:
      return state
  }
}

export default productReducer