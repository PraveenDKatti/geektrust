import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

function ProductDetails({ cart, addToCart, quantity, getQuantity }) {
  const { productId } = useParams();
  let [product, setProduct] = useState(null)
  const rating = 4

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`https://shopping-api-wk52.onrender.com/api/items/${productId}`)
      const data = await response.json()
      setProduct(data)
    }
    fetchProduct()
  }, [])

  if (!product)
    return <h1>Loading...</h1>
  else
    return (
      <div className='m-2 md:m-10'>
        <section className='heroSection grid grid-cols-2 gap-x-[4%] m-4'>
          <div className='productGallery'>
            <div className='productImage h-100 w-full flex justify-center bg-gray-200 rounded-xl'>
              <img
                className='w-auto h-full'
                src={product.image}
                alt="product.title" />
            </div>
            <div className='md:grid grid-cols-5 gap-4 my-4 p-3 rounded-xl bg-gray-200'>
              {
                [1, 2, 3, 4, 5].map((_, index) => (
                  <img
                    className='md:h-30'
                    key={index}
                    src={product.image}
                    alt={product.title} />
                ))
              }
            </div>
          </div>
          <div className='buyingGuide'>
            <h1 className='text-4xl font-bold uppercase' >{product.title}</h1>
            <div className='flex items-center my-3'>
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`text-xs fas fa-star ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                ></i>
              ))}
              <p className='bold text-sm mx-2'>{rating} out of 5</p>
              <p className='text-sm'>(1000 reviews)</p>
            </div>
            <p>Color: {product.color}</p>
            <div className='cartBuy my-3'>
              {
                (!cart.has(product.id)) ?
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 bg-gray-500 hover:bg-black text-sm text-white w-[max] rounded cursor-pointer">
                    Add to Cart
                  </button>
                  :
                  <div className="flex items-center border rounded w-[max-content]">
                    <button
                      onClick={() => getQuantity(-1, product)}
                      className="px-3 py-1 hover:bg-gray-200 font-bold"
                    >
                      –
                    </button>
                    <span className="px-4">{quantity[product.id]}</span>
                    <button
                      onClick={() => getQuantity(1, product)}
                      className="px-3 py-1 hover:bg-gray-200 font-bold"
                    >
                      +
                    </button>
                  </div>
              }
            </div>
            <div className='productDesc'>
              <h1 className='text-sm font-bold my-3'>Product Description</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sed similique dignissimos ex rem. Vel facilis dolore, modi
                tempora ab cumque ullam placeat odio nam tenetur ex natus
                eos quidem incidunt provident quia, doloremque suscipit,
                deserunt consequatur rerum velit molestias in. Delectus
                accusantium, error, dolor necessitatibus, possimus voluptatum
                nesciunt quibusdam dicta ea qui sit saepe molestias placeat
                magni quis itaque fugit impedit perferendis quasi alias animi
                a! Optio suscipit placeat eligendi laborum cumque voluptatibus
                libero, dignissimos perferendis nemo. Ullam distinctio est
                quibusdam sit earum recusandae, doloremque laudantium exercitationem
                laboriosam cupiditate maiores in? Tempore nihil ut labore natus
                voluptas ipsum expedita quod.
              </p>
            </div>
          </div>
        </section>
        <section className='infoSection'></section>
        <section className='recommendations'></section>
      </div>
    )
}

export default ProductDetails