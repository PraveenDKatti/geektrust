import { CreditCard, IndianRupee, Smartphone } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { MdCurrencyRupee } from 'react-icons/md'; 
import { useNavigate } from 'react-router-dom';

// Helper to format currency (assuming INR for Rupee icon)
const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN');
};

// Component for Order Summary
function OrderSummary({ cart, quantity, total }) {
    if (cart.length === 0 || total === 0) return (
        <div className="p-4 text-center text-gray-500">No items in the order summary.</div>
    ); 

    return (
        <div className='bg-white rounded-lg shadow-lg p-6 sticky top-8 border border-gray-100'>
            <h2 className="text-2xl font-bold mb-5 border-b pb-3 text-gray-800">Order Summary</h2>

            {/* List of items in a simple format */}
            <div className="mb-4 max-h-60 overflow-y-auto space-y-3 pr-2">
                {Array.from(cart.values()).map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm border-b pb-2 last:border-b-0">
                        <p className="text-gray-700 font-medium w-3/5 line-clamp-2">{item.title}</p>
                        <p className="text-gray-500 text-right w-2/5">
                            Qty: **{quantity[item.id] || 1}** x <MdCurrencyRupee className="inline-block text-base" />{formatCurrency(item.price)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                    <p>Subtotal (MRP)</p>
                    <p className="flex items-center font-medium">
                        <MdCurrencyRupee />
                        {formatCurrency(total)}
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
                <div className="flex justify-between text-red-600 border-t pt-3">
                    <p className="font-medium">Shipping Charge</p>
                    <p className="font-medium flex items-center">
                        <MdCurrencyRupee className="inline-block" />
                        0.00
                    </p>
                </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Final Total */}
            <div className="flex justify-between text-2xl font-bold text-gray-900">
                <p>Order Total</p>
                <p className="flex items-center">
                    <MdCurrencyRupee className="text-2xl" />
                    {formatCurrency(total)}
                </p>
            </div>
        </div>
    );
}

// Checkout component now accepts cart and quantity as props
export default function Checkout({ cart, quantity }) {
    const [paymentType, setPaymentType] = useState('card');
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    // Calculate total inside Checkout component using props
    useEffect(() => {
        let newCart = Array.from(cart.values())
        let newTotal = newCart.reduce((acc, item) => acc + (quantity[item.id] || 1) * item.price, 0)
        setTotal(newTotal)
    }, [cart, quantity])


    if (cart.size === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50 p-4">
                <h1 className="text-3xl font-semibold text-gray-700 mb-4">No items to checkout!</h1>
                <p className="text-lg text-gray-500 mb-6">Please add items to your cart first.</p>
                <button
                    onClick={() => navigate('/ProductList')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xl rounded-lg transition duration-200 shadow-md"
                >
                    Start Shopping
                </button>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-100 p-4 md:p-8 lg:p-12'>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
            <div className='lg:flex lg:gap-8'>
                
                {/* --- Left Column: Form (Shipping & Payment) --- */}
                <form className='lg:w-2/3 space-y-8'>
                    
                    {/* 1. Shipping Address */}
                    <div className='bg-white addressSection rounded-xl shadow-lg p-6 md:p-10 border border-gray-200'>
                        <h2 className='font-bold text-2xl mb-5 text-gray-800'>Shipping Address</h2>
                        <div className="space-y-4">
                            <div>
                                <label className='font-medium block mb-1 text-gray-700'>Full Name</label>
                                <input type="text" className='p-3 bg-gray-100 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' placeholder='Enter your full name' />
                            </div>
                            <div>
                                <label className='font-medium block mb-1 text-gray-700'>Street Address</label>
                                <input type="text" className='p-3 bg-gray-100 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' placeholder='House number, street name' />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <span>
                                    <label className='font-medium block mb-1 text-gray-700'>City</label>
                                    <input type="text" className='p-3 bg-gray-100 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' />
                                </span>
                                <span>
                                    <label className='font-medium block mb-1 text-gray-700'>State</label>
                                    <input type="text" className='p-3 bg-gray-100 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' />
                                </span>
                                <span>
                                    <label className='font-medium block mb-1 text-gray-700'>Zip / Postal Code</label>
                                    <input type="text" className='p-3 bg-gray-100 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' />
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* 2. Payment Method */}
                    <div className='paymentSection bg-white rounded-xl shadow-lg p-6 md:p-10 border border-gray-200'>
                        <h2 className='font-bold text-2xl mb-6 text-gray-800'>Payment Method</h2>
                        
                        {/* Payment Type Selection */}
                        <div className='grid grid-cols-3 gap-4 mb-6'>
                            <span
                                onClick={() => setPaymentType('card')}
                                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-lg border-2 cursor-pointer transition duration-200 
                                    ${paymentType === 'card' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'}`}
                            >
                                <CreditCard className='text-2xl' />
                                <label className='font-medium text-sm md:text-base'>Card</label>
                            </span>
                            <span
                                onClick={() => setPaymentType('upi')}
                                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-lg border-2 cursor-pointer transition duration-200 
                                    ${paymentType === 'upi' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'}`}
                            >
                                <Smartphone className='text-2xl' />
                                <label className='font-medium text-sm md:text-base'>UPI</label>
                            </span>
                            <span
                                onClick={() => setPaymentType('cod')}
                                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-lg border-2 cursor-pointer transition duration-200 
                                    ${paymentType === 'cod' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'}`}
                            >
                                <IndianRupee className='text-2xl' />
                                <label className='font-medium text-sm md:text-base'>COD</label>
                            </span>
                        </div>
                        
                        {/* Payment Input Fields */}
                        <div className="pt-4">
                            {/* Card */}
                            {paymentType === 'card' &&
                                <div className='space-y-4'>
                                    <div>
                                        <label className='font-medium block mb-1 text-gray-700'>Card Number</label>
                                        <input type="text" className='w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' placeholder='XXXX XXXX XXXX XXXX' />
                                    </div>
                                    <div className='flex gap-4'>
                                        <span className='w-1/2'>
                                            <label className='font-medium block mb-1 text-gray-700'>Expiry</label>
                                            <input type="text" className='p-3 bg-gray-100 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' placeholder='MM/YY' />
                                        </span>
                                        <span className='w-1/2'>
                                            <label className='font-medium block mb-1 text-gray-700'>CVV</label>
                                            <input type="text" className='p-3 bg-gray-100 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' placeholder='###' />
                                        </span>
                                    </div>
                                </div>
                            }
                            {/* UPI */}
                            {paymentType === 'upi' &&
                                <div>
                                    <label className='font-medium block mb-1 text-gray-700'>UPI ID</label>
                                    <input type="text" className='w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500' placeholder='yourname@bank' />
                                </div>
                            }
                            {/* COD */}
                            {paymentType === 'cod' &&
                                <ul className='bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg space-y-2'>
                                    <li className='font-semibold'>⚠️ Note on Cash on Delivery:</li>
                                    <li>* Extra Charges <MdCurrencyRupee className="inline-block text-base" />50 will be applicable on COD (not added in this summary).</li>
                                    <li>* To avoid charges and delays, please consider choosing a digital payment method.</li>
                                </ul>
                            }
                        </div>
                    </div>
                    
                    {/* Place Order Button */}
                    <button 
                        type="submit" 
                        className='w-full p-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-lg transition duration-200 shadow-lg shadow-indigo-200/50'
                    >
                        Place Order
                    </button>
                </form>
                
                {/* --- Right Column: Order Summary --- */}
                <div className='lg:w-1/3 mt-8 lg:mt-0'>
                    <OrderSummary cart={cart} quantity={quantity} total={total} />
                </div>
            </div >
        </div>
    )
}