import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
import Search from "./Search";
import { BiUser } from "react-icons/bi";

const navgLink = {
    base: "font-sans font-medium text-[16px] h-full flex items-center p-2",
    hover: "hover:rounded hover:border-2 hover:text-teal-700"
}

export default function Header({ cartSize, searchTerm, triggerSearch }) {
    return (
        <header className="flex items-center justify-between bg-white px-10 py-5 z-50 sticky w-full top-0">
            <div className="w-auto">
                <Link to={'/'}>
                    <h1 className="text-[1.3rem] font-bold md:text-2xl">TeeRex Store</h1>
                </Link>
            </div>
            <div className="w-1/3 bg-gradient-to-r from-gray-300 to-white">
                <Search  triggerSearch={triggerSearch} 
                    searchTerm={searchTerm}/>
            </div>
            <div className="flex gap-4 w-auto">
                <Link to='ProductList' className={`h-full ${navgLink.base} ${navgLink.hover}`}>
                    <p>SHOP</p>
                </Link>
                <Link className={`gap-1 ${navgLink.base} ${navgLink.hover}`}>
                    <BiUser className="text-2xl"/>
                    <p className="font-medium">SIGN IN</p>
                </Link>
                 {/* Navigates to cart on clicking cart icon*/}
                <Link to='Cart' className={`${navgLink.base} ${navgLink.hover}`}>
                    <IoCartOutline className="text-3xl"/>
                    <sup className="text-sm font-bold">{cartSize}</sup>
                </Link>
            </div>
        </header>
    )
}