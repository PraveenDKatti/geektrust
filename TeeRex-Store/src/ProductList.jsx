import { useState, useEffect } from 'react';
import Filter from './Filter'
import Products from './Products'
import Search from './Search';
import { FiFilter } from "react-icons/fi";
import { RxDividerVertical } from "react-icons/rx";

export default function ProductList({ addToCart }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [toggleFilter, setToggleFilter] = useState(new Set(["hidden", "md:hidden", "absolute", "left-0", "top-0", "z-40", "h-60", "overflow-auto"]))
    const [product, setProduct] = useState([])
    const [filters, setFilters] = useState([])

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

    function triggerFilter(fetchFilter) {
        let selectedFilter = Array.from(fetchFilter).map((value)=>JSON.parse(value))
        let newProducts = product.filter((item) => {
            let itemValues = Object.values(item)
            return selectedFilter.every((value) => {
                if (Array.isArray(value)) {
                    const minPrice = value[0]
                    const maxPrice = value[1] ?? Infinity;
                    return item.price >= minPrice && item.price <= maxPrice
                }
                return itemValues.includes(value)
            })
        })
        console.log(newProducts)
        setFilters(newProducts)
    }

    function triggerSearch(query) {
        setSearchTerm(query)
    }

    function updateFilter() {
        const newToggleFilter = new Set(toggleFilter)
        newToggleFilter.has("hidden") ? newToggleFilter.delete("hidden") : newToggleFilter.add("hidden")
        setToggleFilter(newToggleFilter)
    }

    let productList = filters.length>0 && filters.length<product.length ? filters : product 
    const filterClasses = Array.from(toggleFilter).join(" ")

    return (
        <div>
            <div>
                <Search
                    updateFilter={updateFilter}
                    triggerSearch={triggerSearch} />
            </div>
            <div>
                <div className='md:hidden h-10 flex items-center m-[2%] rounded bg-gray-100'>
                    <span onClick={updateFilter} className='h-full flex gap-2 items-center justify-center w-1/2 cursor-pointer'>
                        Filter
                        <FiFilter className='text-gray-400 text-2xl' />
                    </span>
                    <RxDividerVertical className='text-gray-400 text-3xl' />
                    <span className='w-1/2 h-full flex items-center justify-center'>
                        <select>
                            <option value="" selected disabled>Sort</option>
                            <option value="price-low">Low to High</option>
                            <option value="price-high">High to Low</option>
                        </select>
                    </span>
                </div>
                <div className='relative'>
                    <div className={filterClasses}>
                        <Filter triggerFilter={triggerFilter} />
                    </div>
                </div>
            </div>
            <div className="p-5 md:p-10 flex">
                <div className="hidden md:block md:w-1/4">
                    <Filter triggerFilter={triggerFilter} />
                </div>
                <div className="w-full md:w-3/4">
                    <Products productList={productList} searchTerm={searchTerm} addToCart={addToCart} />
                </div>
            </div>

        </div>
    )
}
