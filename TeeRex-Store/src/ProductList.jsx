import { useState, useEffect } from 'react';
import Filter from './Filter';
import Products from './Products';
import Search from './Search';
import { FiFilter } from "react-icons/fi";
import { RxDividerVertical } from "react-icons/rx";

export default function ProductList({ addToCart }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [toggleFilter, setToggleFilter] = useState(new Set(["hidden", "md:hidden", "absolute", "left-0", "top-0", "z-40", "h-60", "overflow-auto"]));
    const [product, setProduct] = useState([]);
    const [filters, setFilters] = useState({
        category: [],
        gender: [],
        brand: [],
        color: [],
        price: []
    });

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
                console.error(error);
            }
        };
        getProduct();
    }, []);

    function handleFilters(e, value, key) {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (e.target.checked) {
                newFilters[key] = [...newFilters[key], value];
            } else {
                newFilters[key] = newFilters[key].filter((item) => item !== value);
            }
            return newFilters;
        });
    }

    function triggerFilter() {
        let filteredProducts = product.filter((item) => {
            // Filter based on the selected filters
            return Object.keys(filters).every((key) => {
                if (filters[key].length > 0) {
                    if (key === "price") {
                        return filters[key].some((range) => {
                            const [minPrice, maxPrice] = range;
                            return item[key] >= minPrice && item[key] <= (maxPrice ?? Infinity);
                        });
                    }
                    return filters[key].includes(item[key].toLowerCase());
                }
                return true;
            });
        });
        console.log(filteredProducts)
        return filteredProducts;
    }

    let productList = triggerFilter();
    const filterClasses = Array.from(toggleFilter).join(" ");

    function triggerSearch(query) {
        setSearchTerm(query);
    }

    function updateFilter() {
        setToggleFilter((prevToggleFilter) => {
            const newToggleFilter = new Set(prevToggleFilter);
            newToggleFilter.has("hidden") ? newToggleFilter.delete("hidden") : newToggleFilter.add("hidden");
            return newToggleFilter;
        });
    }

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
            <div className="p-5 md:p-10 flex">
                <div className="hidden md:block md:w-1/4">
                    <Filter handleFilters={handleFilters} />
                </div>
                <div className="w-full md:w-3/4">
                    <Products productList={productList} searchTerm={searchTerm} addToCart={addToCart} />
                </div>
            </div>
        </div>
    );
}
