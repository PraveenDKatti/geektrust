export default function Cart({data}){

    const products = data

    return (
        <div>
            <div><p>Shopping Cart</p></div>
            <div>
                {
                    products.map((item)=>(
                        <div key={item.id} className="flex">
                            <img src={item.imageURL} alt={item.name} />
                            <div className="font-bold">
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                            <select name="" id="">
                                <option value="1">Qty: 1</option>
                            </select>
                            <button className="rounded px-3">Delete</button>
                        </div>
                    ))
                }
                <hr />
                <h1>Total Amount:  Rs.</h1>
            </div>
        </div>
    )
}