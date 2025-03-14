export default function Filter({ handleFilters }) {

    const generalFilters = {
        category: ["Footwear", "Accessories", "Winter", "Sports", "Formal", "Casual", "Traditional"],
        gender: ["Men", "Women", "Unisex"],
        brand: ["UrbanFeet", "LoaferStyle", "LuxuryBag", "FitFlex", "BeltCo", "CozyWrap", "ExecutiveWear"],
        color: ["Black", "White", "Brown", "Gray", "Red", "Blue", "Tan", "Navy Blue", "Yellow", "Silver"],
    }

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
                            <input type="checkbox" onChange={(e) => handleFilters(e, [0,1000], "price")} /> {"Below ₹1000"}
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e) => handleFilters(e, [1001,3000], "price")} /> {"₹1000 - ₹3000"}
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e) => handleFilters(e, [3001,5000], "price")} /> {"₹3000 - ₹5000"}
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e) => handleFilters(e, [5001,Infinity], "price")} /> {"₹5000+"}
                        </label>
                    </div>
                    <hr className="m-2 border-gray-300" />
                </div>

                {Object.entries(generalFilters).map(renderFilter)}
            </div>
        </div>
    )
}