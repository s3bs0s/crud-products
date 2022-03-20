import React, { Fragment } from 'react'

import Navbar from './components/Navbar'
import Form from './components/Form'
import Table from './components/Table'
import './assets/app.scss';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Form />
      <Table />
    </Fragment>
  )
}

export default App
