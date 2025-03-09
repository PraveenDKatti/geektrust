import { useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

export default function Search({ triggerSearch }) {
    const [inputTerm, setInputTerm] = useState("")

    return (
        <div className='flex justify-center mx-[2%] mt-[4%] lg:mx-10 lg:mt-5'>
            <div className='flex w-full md:w-auto focus:outline-gray-400 bg-gray-100 items-center gap-2 lg:gap-5 py-1 px-3 lg:px-4 rounded hover:bg-gray-200'>
                <input
                    type="search"
                    placeholder='Search for products...'
                    className='py-1 lg:py-2 focus:outline-none flex-1 sm:w-[30vw]'
                    value={inputTerm}
                    onChange={(e) => setInputTerm(e.target.value)}
                />
                <PiMagnifyingGlassBold onClick={() => triggerSearch(inputTerm)} 
                    className='text-gray-400 text-2xl cursor-pointer hover:text-gray-500' />
            </div>
        </div>
    )
}