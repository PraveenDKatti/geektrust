import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from "./utility/ScrollToTop";
import Layout from './Layout'
import ProductList from "./pages/ProductList"
import Cart from './pages/ShoppingCart'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import {filters} from './components/Filter'

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState(new Map());
  const [quantity, setQuantity] = useState({});
  const [category, setCategory] = useState(null);

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

  function getCategory(newCategory){
    setCategory(newCategory)
  };

  function handleSearch(query) {
    setSearchTerm(query);
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout cartSize={cart.size} searchTerm={searchTerm} triggerSearch={handleSearch}>
        <Routes>
          <Route path='/' element={<Home filters={filters} getCategory={getCategory} />} />
          <Route path='/ProductList' element={<ProductList filters={filters} searchTerm={searchTerm} triggerSearch={handleSearch} category={category} addToCart={addToCart} />} />
          <Route path="Product/:productId" element={<ProductDetails cart={cart} addToCart={addToCart} quantity={quantity} getQuantity={getQuantity}/>} />
          <Route path='/Cart' element={<Cart cart={cart} quantity={quantity} getQuantity={getQuantity} removeFromCart={removeFromCart} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
