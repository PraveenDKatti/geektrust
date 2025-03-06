import { useState, useEffect } from "react"
import { MdCurrencyRupee } from "react-icons/md";

export default function Cart({ cart, removeFromCart }) {
    let [total, setTotal] = useState(0)
    let [quantity, setQuantity] = useState({})
    
    useEffect(() => {
        let newTotal = cart.reduce((acc, item) => acc + (quantity[item.id] || 1) * item.price, 0)
        setTotal(newTotal)
    }, [cart,quantity])


    function getQuantity(e,item){
        if(e.target.value>item.quantity){
            throw new Error("maximum quntity reached")
        }else{
            let totalProductQuantity = Number(e.target.value)
            setQuantity(prev => ({ ...prev, [item.id]: totalProductQuantity }))
        }
    }


    return (
        <div className="w-1/2 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] mx-10 mt-5 p-5">
            <div className="text-2xl font-semibold"><p>Shopping Cart</p></div>
            <div className="mt-10 ms-10 w-[90%]">
                {
                    cart.map((item) => (
                        <div key={item.id} className="flex p-5 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] mb-5">
                            <div className="flex gap-5 w-2/3">
                                <img className="w-20 h-20" src={item.imageURL} alt={item.name} />
                                <div className="font-bold">
                                    <p>{item.name}</p>
                                    <p className="flex items-center"><MdCurrencyRupee className="inline-block"/>{item.price} * {quantity[item.id] || 1}</p>
                                </div>
                            </div>
                            <div className="w-1/3 flex gap-5 items-end">
                                <select defaultValue="1" onChange={(e)=>getQuantity(e,item)}
                                className="rounded bg-gray-200 hover:bg-gray-300 cursor-pointer py-1 px-2">
                                    {Array.from({length:10},(_,i)=>(
                                        <option key={i+1} value={i+1}>Qty:{i+1}</option>
                                    ))}
                                </select>
                                <button onClick={() => removeFromCart(item)} className="rounded bg-gray-200 hover:bg-gray-300 cursor-pointer py-1 px-2">Delete</button>
                            </div>
                        </div>
                    ))
                }

                <hr />
                <div className="mt-5 flex justify-end"><span className="font-bold">Total Amount: <span className="font-normal">Rs. {total}</span></span></div>
            </div>
        </div>
    )
}