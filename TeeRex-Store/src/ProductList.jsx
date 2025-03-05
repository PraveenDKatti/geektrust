import Filter from './Filter'
import Products from './Products'
import { PiMagnifyingGlassBold } from "react-icons/pi";

export default function ProductList({addToCart}) {
    return (
        <div>
            <div className='flex justify-between mx-10 mt-5'>
                <p className='invisible'>filtered results</p>
                <div className='flex items-center gap-5'>
                    <input type="search" placeholder='Search for products...' 
                    className='border-b-2 py-2 border-gray-300 focus:outline-none w-[300px]'/>
                    <span className='bg-gray-400 py-1 px-4 flex-shrink-0 rounded hover:bg-gray-600 cursor-pointer'>
                        <PiMagnifyingGlassBold className='text-white text-2xl'/>
                    </span>
                </div>
                <select name="" id="" className='bg-gray-100'>
                    <option value="" selected disabled>Sort By</option>
                    <option value="">Price: Low to High</option>
                    <option value="">Price: High to Low</option>
                </select>
            </div>
            <div className="p-10 flex">
                <div className="w-1/4">
                    <Filter />
                </div>
                <div className="w-3/4">
                    <Products addToCart={addToCart} />
                </div>
            </div>

        </div>
    )
}
