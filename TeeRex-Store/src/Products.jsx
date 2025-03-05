import { useEffect } from "react"

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
        <div className="flex flex-wrap gap-7">
            {
                product.map((item) => (
                    <div key={item.id} className="w-[30%] rounded p-4 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)]">
                        <div><img src={item.imageURL} alt={item.name} className="scale-85 hover:scale-100 w-full h-40 object-cover"/></div>
                        <div className="flex items-center mt-3 mx-1 w-[full] justify-between">
                            <p className="font-bold">Rs {item.price}</p>
                            <button className=
                            "p-2 bg-black text-sm text-white w-[max] rounded cursor-pointer">
                            Add to Cart</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
