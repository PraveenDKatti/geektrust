import './App.css'
import { useState } from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Header'
import ProductList from './ProductList'
import Cart from './ShoppingCart'


function App() {
  const [cart, setCart] = useState([])


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProductList/>} />
          <Route path="/Cart" element={<Cart data={cartData} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
