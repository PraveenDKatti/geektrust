import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Header'
import ProductList from './ProductList'
import Cart from './ShoppingCart'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
