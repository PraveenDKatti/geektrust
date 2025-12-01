import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
import Search from "./Search";
import { BiUser } from "react-icons/bi";

// Simplified and updated base classes for navigation links
const navgLink = {
    base: "font-sans text-gray-700 transition-colors duration-200 ease-in-out flex items-center p-2 rounded-lg",
    hover: "hover:bg-gray-100 hover:text-teal-600"
}

export default function Header({ cartSize, searchTerm, triggerSearch }) {
    return (
        // Sticky, white background, shadow for lift, subtle border-b for separation
        <header className="flex flex-col md:flex-row items-center justify-between bg-white px-6 md:px-10 py-3 md:py-4 z-50 sticky w-full top-0 shadow-md border-b border-gray-100">
            
            {/* 1. Logo/Brand Name (Left) */}
            <div className="mb-3 md:mb-0 w-auto">
                <Link to={'/'}>
                    {/* Teal accent color, larger and bolder font */}
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider">TeeRex Store</h1>
                </Link>
            </div>
            
            {/* 2. Search Bar (Center) - Removed gradient and set a max width */}
            <div className="w-full max-w-lg mx-auto mb-3 md:mb-0"> 
                <Search triggerSearch={triggerSearch} 
                    searchTerm={searchTerm}/>
            </div>
            
            {/* 3. Navigation Links (Right) */}
            <div className="flex gap-2 md:gap-4 w-auto items-center">
                
                {/* SHOP Link */}
                <Link to='ProductList' className={`h-full ${navgLink.base} ${navgLink.hover}`}>
                    <p className="font-semibold text-sm md:text-base">SHOP</p>
                </Link>
                
                {/* SIGN IN Link */}
                <Link to='SignIn' className={`gap-1 ${navgLink.base} ${navgLink.hover}`}>
                    <BiUser className="text-xl md:text-2xl"/>
                    <p className="font-semibold text-sm hidden sm:block">SIGN IN</p> {/* Hide text on small screens */}
                </Link>
                
                {/* Cart Link with Badge */}
                <Link to='Cart' className={`relative ${navgLink.base} ${navgLink.hover} p-1 md:p-2`}>
                    <IoCartOutline className="text-2xl md:text-3xl"/>
                    {/* Absolute positioning for the badge */}
                    {cartSize > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {cartSize}
                        </span>
                    )}
                </Link>
                
            </div>
        </header>
    )
}