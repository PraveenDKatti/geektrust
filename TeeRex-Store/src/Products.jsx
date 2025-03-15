export default function Products({productList,searchTerm,addToCart}){

    const displayProducts = searchTerm
        ? productList.filter((item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : productList;

    if(displayProducts && displayProducts.length!==0){
        return (
            <div className="grid gap-5 sm:flex sm:flex-wrap md:gap-10 lg:gap-7">
                {
                    displayProducts.map((item) => (
                        <div key={item.id} className="w-full sm:w-[48%] md:w-[45%] lg:w-[30%] rounded p-4 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)]">
                            <div className="mb-1 md:mb-2 font-bold"><p>{item.title}</p></div>
                            <div className="w-full sm:h-80 md:h-75 lg:h-64">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="scale-100 w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex items-center mt-2 mx-1 w-[full] justify-between">
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
