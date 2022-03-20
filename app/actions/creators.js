import types from './types'

const creators = {
  PRODUCT: {
    load: products => ({
      type: types.PRODUCT.LOAD,
      products
    }),
    add: product => ({
      type: types.PRODUCT.ADD,
      product
    }),
    update: product => ({
      type: types.PRODUCT.UPDATE,
      product
    }),
    remove: _id => ({
      type: types.PRODUCT.REMOVE,
      _id
    })
  }
}

export default creators