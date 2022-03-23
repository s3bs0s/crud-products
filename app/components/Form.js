import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

import Field from './Field'
import creators from '../actions/creators'

const Form = () => {
  const { product, products } = useSelector(state => state, () => {})
  const dispatch = useDispatch()
  const productInitialized = {
    name: '',
    cost: 0,
    category: '',
    description: ''
  }
  const [ getProduct, setProduct ] = useState(productInitialized)
  const [ getLoading, setLoading ] = useState(false)
  const [ getNewCategory, setNewCategory ] = useState(false)

  const handleChange = name => ({ target }) => {
    if (target) {
      setProduct({ ...getProduct, [name]: target.value })
    }
  }

  const handleSend = () => {
    if (getLoading) {
      return
    }
    setLoading(true)

    const catchAction = ({ response: { data: error } }) => {
      toast.error(error, { autoClose: 5000 })
    }

    if (product) {
      axios.put('/api/products', getProduct)
        .then(({ data }) => {
          dispatch(creators.PRODUCTS.update(data))
          handleCancel()
          toast.success('Producto editado!', { autoClose: 5000 })
        })
        .catch(catchAction)
        .finally(() => setLoading(false))
    } else {
      axios.post('/api/products', getProduct)
        .then(({ data }) => {
          dispatch(creators.PRODUCTS.add(data))
          handleClean()
          toast.success('Producto agregado!', { autoClose: 5000 })
        })
        .catch(catchAction)
        .finally(() => setLoading(false))
    }
  }

  const handleClean = () => {
    setNewCategory(false)
    setProduct({ ...productInitialized })
  }

  const handleCancel = () => {
    handleClean()
    dispatch(creators.PRODUCT.remove())
  }

  useEffect(() => {
    if (product) {
      return setProduct(product)
    }

    setProduct(productInitialized)
  }, [product])

  const getAvailableCategories = () => {
    const categories = []
    products.forEach(iteratedProduct => {
      if (!categories.find(category => category.value === iteratedProduct.category)) {
        const category = iteratedProduct.category
        categories.push({ value: category, text: category })
      }
    })
    return categories
  }

  return (
    <aside className='form'>
      <h2 className='title'>
        { product ? 'Editar' : 'Agregar' } producto
      </h2>

      <div className='groupFields'>
        <Field
          value={getProduct.name}
          disabled={getLoading}
          placeholder='Nombre *'
          handleChange={handleChange('name')}
          handleSend={handleSend}
        />
        <Field
          value={getProduct.cost}
          disabled={getLoading}
          type='number'
          placeholder='Costo *'
          handleChange={handleChange('cost')}
          handleSend={handleSend}
        />
      </div>
      {
        getNewCategory
          ? (
            <Field
              value={getProduct.category}
              disabled={getLoading}
              placeholder='Categoría *'
              handleChange={handleChange('category')}
              handleSend={handleSend}
              footer={(
                <a
                  href='#'
                  onClick={() => {
                    setProduct({ ...getProduct, category: '' })
                    setNewCategory(false)
                  }}
                >
                  Cancelar.
                </a>
              )}
            />
          )
          : (
            <Field
              value={getProduct.category}
              disabled={getLoading}
              type='select'
              handleChange={handleChange('category')}
              defaultOption='Categoría *'
              options={getAvailableCategories()}
              footer={(
                <Fragment>
                  No la encuentro. 
                  <a
                    href='#'
                    className='m-l-6'
                    onClick={() => {
                      setProduct({ ...getProduct, category: '' })
                      setNewCategory(true)
                    }}
                  >
                    Agregar una nueva.
                  </a>
                </Fragment>
              )}
            />
          )
      }
      <Field
        value={getProduct.description}
        disabled={getLoading}
        type='textarea'
        placeholder='Descripción del producto'
        handleChange={handleChange('description')}
      />

      <div className='groupButtons'>
        <button
          className={['btn', product ? 'info' : 'success'].join(' ')}
          disabled={getLoading}
          onClick={handleSend}
        >
          Enviar
        </button>
        <button className='btn warning' disabled={getLoading} onClick={handleClean}>
          Limpiar
        </button>
        {
          product&&
            <button className='btn default' disabled={getLoading} onClick={handleCancel}>
              Cancelar
            </button>
        }
      </div>
    </aside>
  )
}

export default Form
