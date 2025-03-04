import { IoCartOutline } from "react-icons/io5";
export default function Header(){
    return (
        <div className="flex justify-between py-5 px-10 bg-gray-200">
            <div><h1 className="text-2xl">TeeRex Store</h1></div>
            <div className="flex gap-3">
                <div><p className="text-xl">Products</p></div>
                <div className="flex text-4xl">
                    <IoCartOutline />
                    <sup className="text-sm font-bold">2</sup>
                </div>
            </div>
        </div>
    )
}