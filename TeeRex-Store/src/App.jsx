import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Header'
import ProductList from './ProductList'
import Cart from './ShoppingCart'

function App() {
  const [cart, setCart] = useState(new Map());
  const [quantity, setQuantity] = useState({});

  function getQuantity(value, item) {
    setQuantity(prevQuantity => {
      const currentQuantity = prevQuantity[item.id] || 0;
      const newQuantity = currentQuantity + value;

      if (newQuantity <= 0) {
        removeFromCart(item); // Removes the item if quantity is zero
        return Object.fromEntries(Object.entries(prevQuantity).filter(([id]) => id !== item.id));
      }

      return { ...prevQuantity, [item.id]: newQuantity };
    });
  }

  function addToCart(product) {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [product.id]: (prevQuantity[product.id] || 0) + 1
    }));

    setCart(prevCart => {
      if (prevCart.has(product.id)) return prevCart; // Prevent redundant re-renders
      const updatedCart = new Map(prevCart);
      updatedCart.set(product.id, product);
      return updatedCart;
    });
  }

  function removeFromCart(product) {
    setCart(prevCart => {
      if (!prevCart.has(product.id)) return prevCart; // Prevent unnecessary updates
      const updatedCart = new Map(prevCart);
      updatedCart.delete(product.id);
      return updatedCart;
    });

    setQuantity(prevQuantity => {
      if (!prevQuantity[product.id]) return prevQuantity; // Prevent redundant updates
      const updatedQuantity = { ...prevQuantity };
      delete updatedQuantity[product.id]; // Remove from quantity state
      return updatedQuantity;
    });
  }

  return (
    <BrowserRouter>
      <Header cart={cart.size} />
      <Routes>
        <Route path='/' element={<ProductList addToCart={addToCart} />} />
        <Route path='/Cart' element={<Cart cart={cart} quantity={quantity} getQuantity={getQuantity} removeFromCart={removeFromCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
