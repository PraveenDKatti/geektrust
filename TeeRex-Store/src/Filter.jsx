export default function Filter(){
    return (
        <div className="p-5 shadow-md w-3/4 bg-white">
            <div className="space-y-4">
                {/* Color Filter */}
                <div>
                    <p className="font-bold mb-2">Color</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Red
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Green
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Blue
                        </label>
                    </div>
                </div>

                {/* Gender Filter */}
                <div>
                    <p className="font-bold mb-2">Gender</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Men
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Women
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Unisex
                        </label>
                    </div>
                </div>

                {/* Price Filter */}
                <div>
                    <p className="font-bold mb-2">Price</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> ₹0 - ₹250
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> ₹251 - ₹450
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> ₹450+
                        </label>
                    </div>
                </div>

                {/* Type Filter */}
                <div>
                    <p className="font-bold mb-2">Type</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Polo
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Hoodie
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" /> Basic
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
