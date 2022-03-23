import types from './types'

const creators = {
  PRODUCTS: {
    load: products => ({
      type: types.PRODUCTS.LOAD,
      products
    }),
    add: product => ({
      type: types.PRODUCTS.ADD,
      product
    }),
    update: product => ({
      type: types.PRODUCTS.UPDATE,
      product
    }),
    remove: _id => ({
      type: types.PRODUCTS.REMOVE,
      _id
    })
  },
  PRODUCT: {
    set: product => ({
      type: types.PRODUCT.SET,
      product
    }),
    remove: () => ({
      type: types.PRODUCT.REMOVE
    })
  }
}

export default creators