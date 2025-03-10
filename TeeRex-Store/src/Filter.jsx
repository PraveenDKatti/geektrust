import { useState, useEffect } from "react"
export default function Filter({ triggerFilter }) {
    const [filterList, setFilterList] = useState(() => new Set())

    useEffect(() => {
        triggerFilter(new Set(filterList))
    }, [filterList])

    function addFilter(e, value) {
        const valueStr = JSON.stringify(value);
        let newFilterList = new Set(filterList)
        e.target.checked ? newFilterList.add(valueStr) : newFilterList.delete(valueStr)
        setFilterList(newFilterList)
    }

    const generalFilters = {
        "category": ["Footwear", "Accessories", "Winter", "Sports", "Formal", "Casual", "Traditional"],
        "gender": ["Men", "Women", "Unisex"],
        "priceRange": ["Below ₹1000", "₹1000 - ₹3000", "₹3000 - ₹5000", "₹5000+"],
        "brand": ["UrbanFeet", "LoaferStyle", "LuxuryBag", "FitFlex", "BeltCo", "CozyWrap", "ExecutiveWear"],
        "color": ["Black", "White", "Brown", "Gray", "Red", "Blue", "Tan", "Navy Blue", "Yellow", "Silver"],
        "type": ["Shoes", "Boots", "Sneakers", "Handbag", "Backpack", "Scarf", "Belt", "Pants", "Blazer", "Kurti", "Necktie", "Bracelet", "Sunglasses", "Pyjamas", "Tracksuit"]
    }

    return (
        <div className="p-5 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] w-full md:w-3/4 bg-white">
            <div className="space-y-4">
                {Object.entries(generalFilters).map(([key, values]) => (
                    <>
                        <div key={key}>
                            <p className="font-bold mb-2">{key.toUpperCase()}</p>
                            <div className="space-y-2">
                                {values.map((val,index) => (
                                    <label key={`${key}-${index}`} className="flex items-center gap-2">
                                        <input type="checkbox" onChange={(e) => addFilter(e, val)} /> {val}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <hr className="m-2 border-gray-300" />
                    </>
                ))}
            </div>
        </div>
    )
}