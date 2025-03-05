import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
export default function Header() {
    return (
        <div>
            <div className="flex justify-between py-5 px-10 bg-gray-200 fixed">
                <Link to="ProductList"><div><h1 className="text-2xl">TeeRex Store</h1></div></Link>
                <div className="flex gap-3">
                    <div><p className="text-xl">Products</p></div>
                    <Link to="Cart">
                        <div className="flex text-4xl">
                            <IoCartOutline />
                            <sup className="text-sm font-bold">2</sup>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}