import { useState,useEffect } from "react"
export default function Filter({triggerFilter}){
    const [filterList, setFilterList] = useState(()=>new Set())

    useEffect(()=>{
        triggerFilter(new Set(filterList))
    },[filterList])

    function addFilter(e,value){
        const valueStr = JSON.stringify(value);
        let newFilterList = new Set(filterList)
        e.target.checked ? newFilterList.add(valueStr) : newFilterList.delete(valueStr)
        setFilterList(newFilterList)
    }

    return (
        <div className="p-5 shadow-[0px_0px_4px_0.5px_rgba(0,0,0,0.1)] w-full md:w-3/4 bg-white">
            <div className="space-y-4">
                {/* Color Filter */}
                <div>
                    <p className="font-bold mb-2">Color</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Red")}/> Red
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Green")}/> Green
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Blue")}/> Blue
                        </label>
                    </div>
                </div>
                <hr className="m-2 border-gray-300"/>

                {/* Gender Filter */}
                <div>
                    <p className="font-bold mb-2">Gender</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Men")}/> Men
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Women")}/> Women
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Unisex")}/> Unisex
                        </label>
                    </div>
                </div>
                <hr className="m-2 border-gray-300"/>

                {/* Price Filter */}
                <div>
                    <p className="font-bold mb-2">Price</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,[0,250])}/> ₹0 - ₹250
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,[251,450])}/> ₹251 - ₹450
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,[451,Infinity])}/> ₹450+
                        </label>
                    </div>
                </div>
                <hr className="m-2 border-gray-300"/>
                
                {/* Type Filter */}
                <div>
                    <p className="font-bold mb-2">Type</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Polo")}/> Polo
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Hoodie")}/> Hoodie
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>addFilter(e,"Basic")}/> Basic
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}