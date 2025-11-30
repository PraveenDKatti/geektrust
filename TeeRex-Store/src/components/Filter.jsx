export const filters = {
    "Fashion": {
        category: ["Clothing", "Footwear", "Accessories"],
        gender: ["Men", "Women", "Unisex"],
        brand: ['ClassicStyle', 'DenimX', 'ActiveWear', 'UrbanWear', 'FlexFit',
            'ExecutiveStyle', 'CasualVibe', 'CozyWear', 'EthnicWear',
            'WarmTouch', 'ElegantWear', 'TechWear', 'WinterStyle', 'GlamStyle', 'UrbanSteps', 'LeatherPro', 'Sporty', 'TimeMaster', 'EliteBags',
            'TravelGear', 'FitGear'],
        color: ["Black", "White", "Brown", "Gray", "Red", "Blue", "Tan", "Navy Blue", "Yellow", "Silver"],
    },
    "Electronics": {
        category: ["Mobiles", "Laptops", "Cameras", "Headphones", "Wearables", "Home Appliances", "Smartwatches"],
        brand: ["Samsung", "Apple", "Sony", "LG", "Whirlpool"],
        features: ["Bluetooth", "WiFi", "Smart", "4K", "Touchscreen"],
    },
    "Home And Kitchen": {
        category: ["Furniture", "Cookware", "Decor", "Storage", "Lighting"],
        material: ["Wood", "Steel", "Plastic", "Glass", "Ceramic"],
        brand: ["Ikea", "Prestige", "Pigeon", "Philips"],
    },
    "Books": {
        category: ["Fiction", "Non-fiction", "Educational", "Comics", "Biographies"],
        language: ["English", "Hindi", "Spanish", "French"],
        format: ["Paperback", "Hardcover", "eBook", "Audiobook"],
    },
    "Sports": {
        category: ["Cricket", "Football", "Badminton", "Cycling", "Fitness Equipment"],
        brand: ["Nike", "Adidas", "Yonex", "Decathlon"],
    }
};

export default function Filter({ category, handleFilters }) {

    const renderFilter = ([key, values]) => (
        <div key={key}>
            <p className="font-bold mb-2">{key.toUpperCase()}</p>
            <div className="space-y-2">
                {values.map((val, index) => (
                    <label key={`${key}-${index}`} className="flex items-center gap-2">
                        <input type="checkbox" value={val} onChange={(e) => handleFilters(e, val.toLowerCase(), key)} /> {val}
                    </label>
                ))}
            </div>
            <hr className="m-2 border-gray-300" />
        </div>
    )

    return (
        <div className="p-5 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] w-full md:w-3/4 bg-white">
            <div className="space-y-4">
                <div>
                    <p className="font-bold mb-2">PRICE RANGE</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e) => handleFilters(e, [0, 1000], "price")} /> {"Below ₹1000"}
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e) => handleFilters(e, [1001, 3000], "price")} /> {"₹1000 - ₹3000"}
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e) => handleFilters(e, [3001, 5000], "price")} /> {"₹3000 - ₹5000"}
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e) => handleFilters(e, [5001, Infinity], "price")} /> {"₹5000+"}
                        </label>
                    </div>
                    <hr className="m-2 border-gray-300" />
                </div>
                {Object.entries(filters[category] || {}).map(renderFilter)}
            </div>
        </div>
    )
}