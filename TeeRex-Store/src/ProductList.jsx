import { useState,useEffect } from 'react';
import Filter from './Filter'
import Products from './Products'
import Search from './Search';

export default function ProductList({ addToCart }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [toggleFilter, setToggleFilter] = useState(new Set(["hidden", "md:hidden", "absolute", "right-0", "top-0", "z-40"]))
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
                if (!data.ok) {
                    throw new Error("Error occurred: cannot fetch data");
                } else {
                    const products = await data.json();
                    setProduct(products);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getProduct()
    }, [])


    function searchQuery(query) {
        setSearchTerm(query)
    }
    function updateFilter() {
        const newToggleFilter = new Set(toggleFilter)
        newToggleFilter.has("hidden") ? newToggleFilter.delete("hidden") : newToggleFilter.add("hidden")
        setToggleFilter(newToggleFilter)
    }

    const filterClasses = Array.from(toggleFilter).join(" ")

    return (
        <div>
            <div>
                <Search
                    updateFilter={updateFilter}
                    searchQuery={searchQuery} />
            </div>
            <div className='relative'>
                <div className={filterClasses}>
                    <Filter />
                </div>
            </div>
            <div className="p-5 md:p-10 flex">
                <div className="hidden md:block md:w-1/4">
                    <Filter />
                </div>
                <div className="w-full md:w-3/4">
                    <Products product={product} searchTerm={searchTerm} addToCart={addToCart} />
                </div>
            </div>

        </div>
    )
}
