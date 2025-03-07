import { useState } from 'react';
import Filter from './Filter'
import Products from './Products'
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { FiFilter } from "react-icons/fi";

export default function ProductList({addToCart}) {
    const [inputTerm, setInputTerm] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div>
            <div className='flex justify-center m-[2%] lg:mx-10 lg:mt-5'>
                <div className='flex items-center gap-2 lg:gap-5'>
                    <input 
                        type="search" 
                        placeholder='Search for products...'
                        className='border-b-2 py-1 lg:py-2 border-gray-300 focus:outline-none w-[65vw] sm:w-[30vw]'
                        value={inputTerm}
                        onChange={(e)=>setInputTerm(e.target.value)}
                    />
                    <span
                        onClick={()=>setSearchTerm(inputTerm)} 
                        className='bg-gray-400 py-1 px-3 lg:px-4 flex-shrink-0 rounded hover:bg-gray-600 cursor-pointer'
                    >
                        <PiMagnifyingGlassBold className='text-white text-xl'/>
                    </span>
                    <span
                        onClick={()=>setSearchTerm(inputTerm)} 
                        className='md:hidden bg-gray-400 py-1 px-3 lg:px-4 flex-shrink-0 rounded hover:bg-gray-600 cursor-pointer'
                    >
                        <FiFilter className='text-white text-xl' />
                    </span>
                </div>
            </div>
            <div className="p-10 flex">
                <div className="hidden md:w-1/4">
                    <Filter />
                </div>
                <div className="w-full md:w-3/4">
                    <Products searchTerm={searchTerm} addToCart={addToCart} />
                </div>
            </div>

        </div>
    )
}
