import { useEffect, useState } from "react"

export default function Products(){
    const [product, setProduct] = useState([])

    useEffect(()=>{
        const getProduct = async ()=>{
            try {
                const data = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
                if (!data.ok) {
                    throw new Error("Error occurred: cannot fetch data");
                }
                const products = await data.json();
                setProduct(products);
            } catch(error) {
                console.error(error);
            }
        }
        getProduct()
    },[])

    return (
        <div className="flex flex-wrap gap-4">
            {
                product.map((item) => (
                    <div key={item.id} className="w-[32%] p-4 shadow-md">
                        <div><img src={item.imageURL} alt={item.name} className="w-full h-40 object-cover"/></div>
                        <div className="flex items-center mt-2 mx-2 w-[full] justify-between">
                            <p className="font-bold">Rs {item.price}</p>
                            <button className=
                            "p-2 bg-black text-white w-[max] rounded cursor-pointer">
                            Add to Cart</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
