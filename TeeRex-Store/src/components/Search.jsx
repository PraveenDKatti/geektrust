import { useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function Search({ triggerSearch }) {
    const [inputTerm, setInputTerm] = useState("")
    const navigate = useNavigate()

    function handleSearch(){
        triggerSearch(inputTerm.trim())
        navigate('/ProductList')
        setInputTerm("")
    }

    return (
        <div className='flex items-center w-full md:w-auto gap-2 lg:gap-5 py-1 px-3 lg:px-4 rounded focus-within:ring-2 focus-within:ring-blue-500'>
            <input
                type="search"
                placeholder='Search for products...'
                className='py-1 lg:py-2 focus:outline-none flex-1 sm:w-[30vw]'
                value={inputTerm}
                onChange={(e) => setInputTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <PiMagnifyingGlassBold onClick={handleSearch}
                className='text-gray-400 text-2xl cursor-pointer hover:text-black' />
        </div>
    )
}