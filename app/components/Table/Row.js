import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

import creators from '../../actions/creators'

const Row = (props) => {
  const { product = {} } = props
  const dispatch = useDispatch()
  const [ getLoading, setLoading ] = useState(false)

  const handleUpdate = () => {
    if (product._id) {
      dispatch(creators.PRODUCT.set(product))
    }
  }

  const handleDelete = () => {
    if (getLoading) {
      return
    }
    setLoading(true)

    axios.delete(`/api/products/${product._id}`)
      .then(() => {
        dispatch(creators.PRODUCTS.remove(product._id))
        toast.success('Producto eliminado!', { autoClose: 5000 })
      })
      .catch(({ response: { data: error } }) => {
        toast.error(error, { autoClose: 5000 })
      })
      .finally(() => setLoading(false))
  }

  return (
    <tr>
      <td>{ product.name }</td>
      <td>{ product.cost.toLocaleString('en-US') }</td>
      <td>{ product.category }</td>
      <td>{ product.description }</td>
      <td>
        <div className='groupButtons'>
          <button className='btn info' disabled={getLoading} onClick={handleUpdate}>
            Editar
          </button>
          <button className='btn danger' disabled={getLoading} onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Row
