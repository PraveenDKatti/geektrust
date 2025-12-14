import { useState, useEffect } from "react"
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa"; // Added a better trash icon

export default function Cart({ cart, quantity, getQuantity, removeFromCart }) {
    let [total, setTotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        let newCart = Array.from(cart.values())
        let newTotal = newCart.reduce((acc, item) => acc + (quantity[item.id] || 1) * item.price, 0)
        setTotal(newTotal)
    }, [cart, quantity])

    function startShopping() {
        navigate('/ProductList');
    }

    // Helper to format currency (assuming INR for Rupee icon)
    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-IN');
    };

    // --- Empty Cart View ---
    if (!cart.size) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50 p-4">
                <h1 className="text-3xl font-semibold text-gray-700 mb-4">Your Cart is Empty 🛒</h1>
                <p className="text-lg text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                <button
                    onClick={startShopping}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xl rounded-lg transition duration-200 shadow-md"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    function checkoutOrder(){
        navigate('/Checkout', { state: { cart: Array.from(cart.values()), total }})
    }

    // --- Full Cart View ---
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Shopping Cart ({cart.size} Items)</h1>
            
            <div className="lg:flex lg:gap-8">
                
                {/* 🛒 Cart Items List (Left Column) */}
                <div className="lg:w-2/3 space-y-4">
                    {
                        Array.from(cart.values()).map((item) => (
                            <div 
                                key={item.id} 
                                className="flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition duration-300 hover:shadow-md"
                            >
                                {/* Item Details: Image, Title, Price */}
                                <div className="flex gap-4 md:w-3/5">
                                    <img 
                                        className="w-40 h-40 object-contain rounded-md" 
                                        src={item.image} 
                                        alt={item.title} 
                                    />
                                    <div className="flex flex-col justify-center">
                                        <p className="font-semibold text-gray-900 line-clamp-2">{item.title}</p>
                                        <p className="flex items-center text-xl font-bold text-gray-800 mt-1">
                                            <MdCurrencyRupee className="inline-block text-lg" />
                                            {formatCurrency(item.price)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {quantity[item.id] || 1}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Controls: Quantity and Remove (Right Side) */}
                                <div className="flex justify-between items-center mt-4 md:mt-0 md:w-2/5 md:justify-end md:space-x-4">
                                    
                                    {/* Quantity Controls */}
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button 
                                            onClick={() => getQuantity(-1, item)} 
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition text-lg text-gray-700"
                                            disabled={(quantity[item.id] || 1) <= 1} // Disable when quantity is 1
                                        >
                                            −
                                        </button>
                                        <span className="px-4 py-1 text-base font-medium bg-white w-12 text-center">
                                            {quantity[item.id] || 1}
                                        </span>
                                        <button 
                                            onClick={() => getQuantity(1, item)} 
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition text-lg text-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Delete Button */}
                                    <button 
                                        onClick={() => removeFromCart(item)} 
                                        className="p-2 text-red-500 hover:text-red-700 transition duration-150 rounded-full hover:bg-red-50 focus:outline-none"
                                        aria-label="Remove item from cart"
                                    >
                                        <FaTrashAlt className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* 💰 Order Summary (Right Column) */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8 border border-gray-100">
                        {/* Summary Details Table */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <p>Total MRP</p>
                                <p className="flex items-center font-medium">
                                    <MdCurrencyRupee />
                                    {formatCurrency(total)} {/* Assuming total = MRP for simplicity */}
                                </p>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <p>Discount</p>
                                <p>- <MdCurrencyRupee className="inline-block" />0.00</p>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <p>Coupon Discount</p>
                                <p>- <MdCurrencyRupee className="inline-block" />0.00</p>
                            </div>
                        </div>

                        <hr className="my-4 border-dashed border-gray-300" />
                        
                        {/* Estimated Total */}
                        <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                            <p>Estimated Total</p>
                            <p className="flex items-center">
                                <MdCurrencyRupee className="text-2xl" />
                                {formatCurrency(total)}
                            </p>
                        </div>

                        {/* Order Button */}
                        <button
                            onClick={checkoutOrder} 
                            className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-lg transition duration-200 shadow-lg shadow-indigo-200/50"
                        >
                            Checkout
                        </button>
                        
                        {/* Placeholder for other sections */}
                        <div className="mt-6 space-y-3 text-sm text-gray-500">
                            <p className="font-medium text-black">Apply Coupon / Gift Card</p>
                            <p className="font-medium text-black">Special Discounts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}