import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
export default function Header({cart}) {
    return (
        <div className="flex justify-between py-5 px-10 bg-gray-200 z-50 sticky w-full top-0">
            
            {/* Navigates to Home page*/}
            <Link to='/'>
                <div><h1 className="text-2xl">TeeRex Store</h1></div>
            </Link>
            <div className="flex gap-3">
                <div><p className="text-xl">Products</p></div>
                
                {/* Navigates to cart on clicking cart icon*/}
                <Link to='Cart'>
                    <div className="flex text-4xl">
                        <IoCartOutline />
                        <sup className="text-sm font-bold">{cart}</sup>
                    </div>
                </Link>
            </div>
        </div>
    )
}