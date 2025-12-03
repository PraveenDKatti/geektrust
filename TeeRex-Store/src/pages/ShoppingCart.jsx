import { useState, useEffect } from "react"
import { MdCurrencyRupee } from "react-icons/md";

export default function Cart({ cart, quantity, getQuantity, removeFromCart }) {
    let [total, setTotal] = useState(0)

    useEffect(() => {
        let newCart = Array.from(cart.values())
        let newTotal = newCart.reduce((acc, item) => acc + (quantity[item.id] || 1) * item.price, 0)
        setTotal(newTotal)
    }, [cart, quantity])


    return (
        <div className="flex m-2 md:m-10">
            <div className="w-[90vw] md:w-2/3 lg:w-2/3 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] m-5 p-5">
                <div className="text-xl md:text-2xl font-semibold"><p>Shopping Cart</p></div>
                <div className="mt-5 md:mt-10 md:ms-10 md:w-[90%]">
                    {
                        Array.from(cart.values()).map((item) => (
                            <div key={item.id} className="grid gap-5 md:flex p-5 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] mb-5">
                                <div className="flex gap-5 md:w-2/3">
                                    <img className="w-25 h-30 md:w-30 md:h-40" src={item.image} alt={item.title} />
                                    <div className="font-bold">
                                        <p>{item.title}</p>
                                        <p className="flex items-center"><MdCurrencyRupee className="inline-block" />{item.price} * {quantity[item.id] || 1}</p>
                                    </div>
                                </div>
                                <div className="md:w-1/3 flex gap-5 justify-end md:items-end">
                                    <div className="flex gap-2 md:w-1/2">
                                        <label className="text-center text-sm rounded bg-gray-200 cursor-pointer w-10 py-1 md:w-2/5" onClick={() => getQuantity(-1, item)}>➖</label>
                                        <label>{quantity[item.id] || 1}</label>
                                        <label className="text-center text-sm rounded bg-gray-200 cursor-pointer w-10 py-1 md:w-2/5" onClick={() => getQuantity(1, item)}>➕</label>
                                    </div>
                                    <button onClick={() => removeFromCart(item)} className="rounded bg-gray-200 hover:bg-gray-300 cursor-pointer py-1 px-2">Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className="lg:w-1/3 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] m-5 p-5">
                <div className="font-bold text-md">Apply coupon</div>
                <hr className="bg-black/20 opacity-50 my-2"/>
                <div className="font-bold text-md">Special Discounts</div>
                <hr className="bg-black/20 opacity-50 my-2"/>
                <h1 className="font-bold text-md">Order Details</h1>
                <div className="grid grid-cols-2 gap-2 my-2">
                    <div>
                        <p>MRP Amount</p>
                        <p>Discount</p>
                        <p>Coupon Discount</p>
                        <p>Estimated Total</p>
                    </div>
                    <div>
                        <p>mrp</p>
                        <p>discount</p>
                        <p>couponDiscount</p>
                        <p>{total}</p>
                    </div>
                </div>
                <button className="w-[50%] p-2 bg-blue-400 rounded text-white font-bold">Order cart</button>
            </div>
        </div>
    )
}