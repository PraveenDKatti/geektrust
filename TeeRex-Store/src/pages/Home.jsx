import React, {useState, useEffect} from "react";
import HeroBanner from "../components/HeroBanner"
import categories from "../utility/categoryData";
import DealsBanner from '../assets/DealsBanner.png';
import { useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';

const numbers = [];
while (numbers.length < 5) {
  const randomNumber = Math.floor(Math.random() * 50);
  if (!numbers.includes(randomNumber)) {
    numbers.push(randomNumber);
  }
}

export default function Home({filters, getCategory}) {
  const [items, setItems] = useState([])
  const [deals, setDeals] = useState([])
  const [catg, setCatg] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const keys = Object.keys(filters)
    setCatg(keys)
    async function fetchData(){
      try {
        const response = await fetch('https://shopping-api-wk52.onrender.com/api/items')
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.log("failed to fetch data")
      }
    }
    fetchData()
  },[])

  useEffect(()=>{
    if(items.length>0){
      const products = numbers.map((i)=> items[i])
      setDeals(products)
    }
  },[items])

  function handleClick(id){
    navigate(`/product/${id}`)
  }

  function handleCategory(newCatg){
    getCategory(newCatg)
    navigate('/productList')
  }

  return (
    <div className="home-page bg-white m-2 md:m-10">

      {/* Hero Banner */}
      <section className="hero-banner h-[250px] md:h-[400px]">
        <HeroBanner />
      </section>

      {/* Featured Categories */}
      <section className="categories py-6">
        <h2 className="text-2xl font-bold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {catg.map((cat) => (
            <div
              key={nanoid()}
              className="bg-white shadow p-3 rounded hover:shadow-lg cursor-pointer"
              onClick={()=>handleCategory(cat)}
            >
              <img
                src={categories[cat]}
                alt={cat}
                className="w-full h-32 object-cover rounded"
              />
              <p className="mt-2 text-center font-medium">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Sale */}
      <section className="flex items-center justify-center w-full h-[140px] bg-black">
        <img
          src={DealsBanner}
          alt="TikTok time"
          className="h-20 w-20 rounded-lg shadow-md"
        />
        <p className="ml-6 text-xl font-medium text-white tracking-wide">
          You are at the right time
        </p>
      </section>


      {/* Product Highlights */}
      <section className="product-highlights py-6">
        <h2 className="text-2xl font-bold mb-4">Top Deals for You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

          {deals.map((topDeal) => (
            <div
              key={topDeal.id}
              className="bg-white shadow p-3 rounded hover:shadow-lg cursor-pointer"
              onClick={()=>handleClick(topDeal.id)}
            >
              <img
                src={topDeal.image}
                alt={topDeal.title}
                className="w-full h-50 object-cover rounded"
              />
              <p className="mt-2 font-medium">{topDeal.title}</p>
              <p className="text-sm text-gray-600">₹{topDeal.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
