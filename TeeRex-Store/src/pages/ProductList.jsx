import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import Products from '../components/Products';
import { FiFilter } from "react-icons/fi";
import { RxDividerVertical } from "react-icons/rx";

export default function ProductList({ filters, category, addToCart, searchTerm }) {
    const categorizedFilters = Object.keys({...filters[category]}).map(key=>[key,[]])
    const [toggleFilter, setToggleFilter] = useState(new Set(["hidden", "md:hidden", "absolute", "left-0", "top-0", "z-40", "h-60", "overflow-auto"]));
    const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState({...Object.fromEntries(categorizedFilters),price:[]});

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetch('https://shopping-api-wk52.onrender.com/api/items');
                if (!data.ok) {
                    throw new Error("Error occurred: cannot fetch data");
                } else {
                    const products = await data.json();
                    setProduct(products);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, []);

    function handleFilters(e, value, key) {
        setFilter((prevFilters)=>{
            const newFilters = { ...prevFilters };
            if (e.target.checked) {
                // Check if the array (value) is already included, avoiding duplicates
                const isAlreadyIncluded = newFilters[key].some(
                    (arr) => JSON.stringify(arr) === JSON.stringify(value)
                );
                if (!isAlreadyIncluded) {
                    newFilters[key] = [...newFilters[key], value]; //actually this line is enough for other filters except price
                }
            } else {
                // If unchecked, remove the array (value) from the key
                newFilters[key] = newFilters[key].filter(
                    (arr) => JSON.stringify(arr) !== JSON.stringify(value)
                );
            }
            return newFilters
        }); 
    }

    function triggerFilter() {
        let filteredProducts = product.filter((item) => {
            // Filter based on the selected filters
            return Object.keys(filter).every((key) => {
                if (filter[key].length > 0) {
                    if (key === "price") {
                        return filter[key].some((range) => {
                            const [minPrice, maxPrice] = range;
                            return item[key] >= minPrice && item[key] <= (maxPrice ?? Infinity);
                        });
                    }else if(key === "category"){
                        const allCategories = Object.values(item[key]).map(i=>i.toLowerCase())
                        return filter[key].some((i)=>allCategories.includes(i));
                    }
                    return filter[key].includes(item[key].toLowerCase());
                }
                return true;
            });
        });
        return filteredProducts;
    }

    let productList = triggerFilter();
    const filterClasses = Array.from(toggleFilter).join(" ");

    function updateFilter() {
        setToggleFilter((prevToggleFilter) => {
            const newToggleFilter = new Set(prevToggleFilter);
            newToggleFilter.has("hidden") ? newToggleFilter.delete("hidden") : newToggleFilter.add("hidden");
            return newToggleFilter;
        });
    }

    return (
        <div className='productDetails m-2 md:m-10'>
            <div>
                <div className='md:hidden h-10 flex items-center m-[2%] rounded bg-gray-100'>
                    <span onClick={updateFilter} className='h-full flex gap-2 items-center justify-center w-1/2 cursor-pointer'>
                        Filter
                        <FiFilter className='text-gray-400 text-2xl' />
                    </span>
                    <RxDividerVertical className='text-gray-400 text-3xl' />
                    <span className='w-1/2 h-full flex items-center justify-center'>
                        <select defaultValue="">
                            <option value="" disabled>Sort</option>
                            <option value="price-low">Low to High</option>
                            <option value="price-high">High to Low</option>
                        </select>
                    </span>
                </div>
                <div className='relative'>
                    <div className={filterClasses}>
                        <Filter handleFilters={handleFilters} />
                    </div>
                </div>
            </div>
            <div className="flex px-2">
                <div className="hidden md:block md:w-1/4">
                    <Filter category={category} handleFilters={handleFilters} />
                </div>
                <div className="w-full md:w-3/4">
                    <Products productList={productList} searchTerm={searchTerm} addToCart={addToCart} />
                </div>
            </div>
        </div>
    );
}
