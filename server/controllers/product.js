const Product = require('../models/Product')
const validate = require('../helpers/validations')
const handleError = require('../helpers/handleErrors')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    handleError(res, error)
  }
}

const getProduct = async ({ params: { _id } }, res) => {
  try {
    const product = await Product.findOne({ _id })
    res.json(product)
  } catch (error) {
    handleError(res, error)
  }
}

const createProduct = async ({ body }, res) => {
  try {
    const { result, field } = validate(body, ['name', 'cost', 'category'])
    if (!result) {
      throw `El campo "${field}" es requerido`
    }

    const product = await Product.create({ ...body })
    res.json(product)
  } catch (error) {
    handleError(res, error)
  }
}

const updateProduct = async ({ body }, res) => {
  try {
    const { result, field } = validate(body, ['_id', 'name', 'cost', 'category'])
    if (!result) {
      throw `El campo "${field}" es requerido`
    }

    let product = await Product.findOne({ _id: body._id })
    if (!product) {
      throw 'El producto no fue encontrado'
    }

    await Product.findOneAndUpdate({ _id: body._id }, body)
    getProduct({ params: { _id: body._id } }, res)
  } catch (error) {
    handleError(res, error)
  }
}

const deleteProduct = async ({ params }, res) => {
  try {
    if (!params.hasOwnProperty('_id')) {
      throw 'El _id es requerido'
    }

    const product = await Product.findOne({ _id: params._id })
    if (!product) {
      throw 'El producto no fue encontrado'
    }

    await Product.findOneAndDelete({ _id: params._id })
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    handleError(res, error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}