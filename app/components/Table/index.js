import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Row from './Row'
import creators from '../../actions/creators'

const Table = () => {
  const { products } = useSelector(state => state, () => {})
  const dispatch = useDispatch()
  const [ getLoading, setLoading ] = useState(true)

  useEffect(() => {
    axios.get('/api/products')
      .then(({ data }) => dispatch(creators.PRODUCTS.load(data)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th></th>
          </tr>
        </thead>
        {
          getLoading
            ? (
              <tbody>
                <tr>
                  <td colSpan={5}>Cargando productos...</td>
                </tr>
              </tbody>
            )
            : products.length
                ? (
                  <tbody>
                    {
                      products.map((product, index) => (
                        <Row
                          key={index}
                          product={product}
                        />
                      ))
                    }
                  </tbody>
                )
                : (
                  <tbody>
                    <tr>
                      <td colSpan={5}>No se encontraron productos</td>
                    </tr>
                  </tbody>
                )
        }
      </table>
    </div>
  )
}

export default Table
