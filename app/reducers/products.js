import types from '../actions/types'

/*
* Carga de productos en el store
*/
const load = (action) => {
  return action.products || []
}

/*
* Agrega un producto al store
*/
const add = (state, action) => {
  let newState = [...state]
  if (action.product) {
    newState.push(action.product)
  }
  return newState
}

/*
* Actualiza un producto del store
*/
const update = (state, action) => {
  let newState = [...state]
  const productIndex = newState.findIndex(product => product._id === action.product._id)

  if (productIndex !== -1) {
    newState[productIndex] = action.product
  }
  return newState
}

/*
* Elimina un producto del store
*/
const remove = (state, action) => {
  let newState = [...state]
  const productIndex = newState.findIndex(product => product._id === action._id)

  if (productIndex !== -1) {
    newState.splice(productIndex, 1)
  }
  return newState
}

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case types.PRODUCTS.LOAD:
      return load(action)
    case types.PRODUCTS.ADD:
      return add(state, action)
    case types.PRODUCTS.UPDATE:
      return update(state, action)
    case types.PRODUCTS.REMOVE:
      return remove(state, action)
    default:
      return state
  }
}

export default productsReducer