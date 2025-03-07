import { useState } from 'react';
import Filter from './Filter'
import Products from './Products'
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { FiFilter } from "react-icons/fi";

export default function ProductList({ addToCart }) {
    const [inputTerm, setInputTerm] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [toggleFilter, setToggleFilter] = useState(new Set(["hidden", "md:hidden", "absolute", "right-0", "top-0", "z-40"]))

    function updateFilter() {
        const newToggleFilter = new Set(toggleFilter)
        newToggleFilter.has("hidden") ? newToggleFilter.delete("hidden") : newToggleFilter.add("hidden")
        setToggleFilter(newToggleFilter)
    }

    const filterClasses = Array.from(toggleFilter).join(" ")

    return (
        <div>
            <div className='flex justify-center mx-[2%] mt-[4%] lg:mx-10 lg:mt-5'>
                <div className='flex items-center gap-2 lg:gap-5'>
                    <input
                        type="search"
                        placeholder='Search for products...'
                        className='border-b-2 py-1 lg:py-2 border-gray-300 focus:outline-none w-[65vw] sm:w-[30vw]'
                        value={inputTerm}
                        onChange={(e) => setInputTerm(e.target.value)}
                    />
                    <span
                        onClick={() => setSearchTerm(inputTerm)}
                        className='bg-gray-400 py-1 px-3 lg:px-4 flex-shrink-0 rounded hover:bg-gray-600 cursor-pointer'
                    >
                        <PiMagnifyingGlassBold className='text-white text-xl' />
                    </span>
                    <span onClick={updateFilter} className='md:hidden bg-gray-400 py-1 px-3 lg:px-4 flex-shrink-0 rounded hover:bg-gray-600 cursor-pointer'>
                        <FiFilter className='text-white text-xl' />
                    </span>
                </div>
            </div>
            <div className='relative'>
                <div className={filterClasses}>
                    <Filter />
                </div>
            </div>
            <div className="p-5 md:p-10 flex">
                <div className="hidden md:block md:w-1/4">
                    <Filter />
                </div>
                <div className="w-full md:w-3/4">
                    <Products searchTerm={searchTerm} addToCart={addToCart} />
                </div>
            </div>

        </div>
    )
}
