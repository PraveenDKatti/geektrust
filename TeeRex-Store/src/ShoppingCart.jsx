export default function Cart({cart, removeFromCart}){
    return (
        <div className="w-1/2 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] mx-10 mt-5 p-5">
            <div className="text-2xl font-semibold"><p>Shopping Cart</p></div>
            <div className="mt-10 ms-10 w-[90%]">
                {
                    cart.map((item)=>(
                        <div key={item.id} className="flex">
                            <img src={item.imageURL} alt={item.name} />
                            <div className="font-bold">
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                            <select name="" id="">
                                <option value="1">Qty: 1</option>
                            </select>
                            <button onClick={()=>removeFromCart(item)} className="rounded px-3">Delete</button>
                        </div>
                    ))
                }

                <hr/>
                <div className="mt-5 flex justify-end"><span className="font-bold">Total Amount: <span className="font-normal">Rs. 1000</span></span></div>
            </div>
        </div>
    )
}