import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'

import Navbar from './components/Navbar'
import Form from './components/Form'
import Table from './components/Table'
import './assets/app.scss'

const App = () => {
  return (
    <Fragment>
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <Navbar />
      <div className='container'>
        <Form />
        <Table />
      </div>
    </Fragment>
  )
}

export default App
