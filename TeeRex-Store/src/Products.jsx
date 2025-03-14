export default function Products({productList,searchTerm,addToCart}){

    const displayProducts = searchTerm
        ? productList.filter((item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : productList;

    if(displayProducts && displayProducts.length!==0){
        return (
            <div className="grid gap-5 md:flex md:flex-wrap md:gap-7">
                {
                    displayProducts.map((item) => (
                        <div key={item.id} className="w-full md:w-[30%] rounded p-4 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)]">
                            <div className="mb-1 md:mb-5 font-bold"><p>{item.title}</p></div>
                            <div>
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="scale-85 hover:scale-100 w-full h-40 object-cover"
                                />
                            </div>
                            <div className="flex items-center mt-3 mx-1 w-[full] justify-between">
                                <p className="font-bold">Rs {item.price}</p>
                                <button onClick={()=>addToCart(item)} className=
                                "p-2 bg-gray-500 hover:bg-black text-sm text-white w-[max] rounded cursor-pointer">
                                Add to Cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }else{
        return(
            <p className="font-bold">No matched Products!</p>
        )
    }
}
