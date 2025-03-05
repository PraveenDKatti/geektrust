import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Header'
import ProductList from './ProductList'
import Cart from './ShoppingCart'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<ProductList />} />
            <Route path='/Cart' element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
