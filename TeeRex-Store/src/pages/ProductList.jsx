import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import Products from '../components/Products';
import { FiFilter } from "react-icons/fi";
import { RxDividerVertical } from "react-icons/rx";
import { filters } from '../components/Filter';
import Select from 'react-select';

// Utility function to calculate initial filters structure
// Helps keep the main component cleaner and handles potential undefined category
const getInitialFilters = (category, allFilters) => {
    // Safely access filters[category] or use an empty object if undefined
    const categorySpecificFilters = allFilters[category] || {};

    // Get filter keys from the category-specific filters
    const categorizedFilters = Object.keys(categorySpecificFilters).map(key => [key, []]);
    
    // Create the initial filter state object: e.g., { size: [], color: [], price: [] }
    const initialFilters = { ...Object.fromEntries(categorizedFilters), price: [] };
    
    return initialFilters;
};

export default function ProductList({ searchTerm, category, addToCart }) {

    // --- State Initialization ---
    // Calculate initial filters using a utility function
    const initialFilters = getInitialFilters(category, filters);

    const [toggleFilter, setToggleFilter] = useState(false);
    const [filter, setFilter] = useState(initialFilters);
    const [product, setProduct] = useState([]);
    // New state to track the current sorting method
    const [sortType, setSortType] = useState(null); // 'ascending', 'descending', or null/initial state

    // --- Data Fetching ---
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
                console.error(error); // Use console.error for errors
            }
        };
        getProduct();
    }, []);

    // --- Filter Handling ---
    function handleFilters(e, value, key) {
        setFilter((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (e.target.checked) {
                // Check if the value is already included to prevent duplicates
                // Using JSON.stringify is necessary if 'value' is an array (like price ranges)
                const isAlreadyIncluded = newFilters[key].some(
                    (arr) => JSON.stringify(arr) === JSON.stringify(value)
                );
                if (!isAlreadyIncluded) {
                    newFilters[key] = [...newFilters[key], value];
                }
            } else {
                // If unchecked, remove the value from the key
                newFilters[key] = newFilters[key].filter(
                    (arr) => JSON.stringify(arr) !== JSON.stringify(value)
                );
            }
            return newFilters
        });
    }

    // --- Combined Filter and Sort Logic ---
    function triggerFilterAndSort() {
        let filteredProducts = product;
        
        // 1. Filter based on main category
        if (category) {
            filteredProducts = filteredProducts.filter((item) =>
                item.category.main?.toLowerCase() === category.toLowerCase());
        }

        // 2. Apply user-selected checkbox filters
        filteredProducts = filteredProducts.filter((item) => {
            return Object.keys(filter).every((key) => {
                if (filter[key].length > 0) {
                    if (key === "price") {
                        return filter[key].some((range) => {
                            const [minPrice, maxPrice] = range;
                            return item.price >= minPrice && item.price <= (maxPrice ?? Infinity);
                        });
                    } else if (key === "category") {
                        // Assuming item[key] holds category details (e.g., { main: '...', sub: '...' })
                        const allCategories = Object.values(item[key] || {}).map(i => i.toLowerCase());
                        return filter[key].some((i) => allCategories.includes(i.toLowerCase())); // Ensure filter value is also lowercase
                    }
                    // Generic filter logic for other keys (e.g., size, color)
                    return filter[key].some(filterValue => 
                        item[key] && item[key].toString().toLowerCase() === filterValue.toString().toLowerCase()
                    );
                }
                return true; // No filters checked for this key, so it passes
            });
        });

        // 3. Apply sorting logic based on sortType state (FIX)
        const sortedProducts = [...filteredProducts]; // Create a copy to sort
        
        if (sortType === "ascending") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === "descending") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        
        return sortedProducts;
    }

    // Calculate product list (now depends on filter and sortType state)
    let productList = triggerFilterAndSort();

    // --- Sort Handler (FIX) ---
    function handleSort(selected) {
        // Update the sortType state to trigger a re-render and re-sorting
        setSortType(selected ? selected.value : null); 
    }

    function updateToggleFilter() {
        setToggleFilter(!toggleFilter)
    }

    // --- Sort Options and Component ---
    const options = [
        { value: 'ascending', label: 'Low to High' },
        { value: 'descending', label: 'High to Low' }
    ];

    const SortElement = ({ handleSort }) => (
        <Select
            options={options}
            onChange={handleSort} // Passes the selected option object
            placeholder="Sort"
            // Set the value based on sortType state
            value={options.find(option => option.value === sortType)}
            isClearable // Allows clearing the sort selection
        />
    );

    // --- Render ---
    return (
        <div className='productDetails m-2 md:m-10'>
            {/* filter and sort for smallscreens */}
            <div className='md:hidden relative h-10 flex items-center m-[2%] rounded bg-gray-100'>
                <span onClick={updateToggleFilter} className='h-full bg-white border border-gray-400 rounded flex gap-2 items-center justify-center w-1/2 cursor-pointer'>
                    Filter
                    <FiFilter className='text-gray-400 text-2xl' />
                </span>
                <RxDividerVertical className='text-gray-400 text-3xl' />
                <div className='w-1/2'><SortElement handleSort={handleSort} /></div>

                {/* dropdown of filter list */}
                {toggleFilter &&
                    <div className='absolute z-50 border border-gray-100 top-12 rounded left-0 w-full p-10 overflow-auto h-[70vh] bg-white'>
                        <Filter category={category} handleFilters={handleFilters} />
                    </div>
                }
            </div>
            {/* Products, filter and sort */}
            <div className="grid md:grid-cols-4 gap-10">

                {/* filter and sort for big screens */}
                <div className="hidden md:block shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] p-5 h-fit">
                    <div className='flex items-center justify-center h-20'>
                        <h2 className='text-xl tracking-tight'>Sort & Filter</h2>
                    </div>
                    <div className="">
                        <SortElement handleSort={handleSort} />
                    </div>
                    <hr className="m-2 border-gray-300" />
                    <div className='p-2'>
                        <Filter category={category} handleFilters={handleFilters} />
                    </div>
                </div>

                {/* display products for all screens */}
                <div className="w-full md:col-span-3">
                    <Products productList={productList} searchTerm={searchTerm} addToCart={addToCart} />
                </div>
            </div>
        </div>
    );
}