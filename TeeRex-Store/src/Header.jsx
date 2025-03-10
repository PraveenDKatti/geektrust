import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
export default function Header({cart}) {
    return (
        <div className="flex justify-between p-5 md:py-5 md:px-10 bg-gray-200 z-50 sticky w-full top-0">
            <Link to={'/'}>
                <div><h1 className="text-[1.3rem] font-bold md:text-2xl">TeeRex Store</h1></div>
            </Link>
            
            {/* Navigates to Home page*/}
            <div className="flex gap-3">
                <Link to='/'>
                    <p className="text-[1.1rem] md:text-xl hover:text-teal-700">Products</p>
                </Link>
                
                {/* Navigates to cart on clicking cart icon*/}
                <Link to='Cart'>
                    <div className="flex text-3xl md:text-4xl hover:text-teal-700">
                        <IoCartOutline />
                        <sup className="text-sm font-bold">{cart}</sup>
                    </div>
                </Link>
            </div>
        </div>
    )
}