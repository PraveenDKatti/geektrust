import './App.css'
import { useState } from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Header'
import ProductList from './ProductList'
import Cart from './ShoppingCart'


function App() {
  const [cart, setCart] = useState([])

  function addToCart(product){
    if(cart.contains(product))
    setCart((cart)=>[...cart, product])
  }

  function removeFromCart(product){
    setCart((cart)=>cart.filter((item)=> item.id!==product.id))
  }

  return (
    <>
      <BrowserRouter>
        <Header cart={cart.length}/>
        <Routes>
          <Route path='/' element={<ProductList addToCart={addToCart} />} />
          <Route path="/Cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
