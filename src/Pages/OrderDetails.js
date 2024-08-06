import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Container from '../Components/Container';
import { FaCheck, FaMapMarkerAlt } from 'react-icons/fa';
import { FaExclamation } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productSlice';
import FeaturedCard from '../Components/FeaturedCard';
import { FaHome, FaHotel,FaCoins} from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { GrLocationPin } from 'react-icons/gr';

const OrderDetails = () => {
    const location = useLocation();
    const { selectedOrder } = location.state;
    const dispatch = useDispatch();
    // const customer = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null
    useEffect(() => {
        const filters = {
            page: 1,
            limit: 10,
            sortBy: { sort: 'createdAt', order: 'desc' },
            price: { lte: 82000,gte:0 },
            color:"",
            categories: [],
            outOfStock:false,
            tags:[]
        }
        dispatch(getProducts(filters));
      }, [dispatch]);

      console.log(selectedOrder);

  const products = useSelector((state)=>state.product.products);

  const categories = selectedOrder?.items?.map(p => p.product?.category)?.filter((c, index, arr) => arr.indexOf(c) === index);
  const similarCategoryProds = products?.filter(p => p.category === categories.find(c => c === p.category));
  const displayedProductIds = selectedOrder?.items?.map(p => p.product?._id);
  const similarProducts = similarCategoryProds?.filter(p => p._id !== displayedProductIds.find(id => id === p._id));

  const recommendedProducts = products?.filter(p => p._id !== displayedProductIds.find(id => id === p._id)).slice(0,4);

  const rewardCoins = selectedOrder?.totalAfterDiscount * 0.01;

  console.log(rewardCoins.toFixed(0));

  return (
    
         <div className='my-5 flex flex-col justify-center sm:mx-5 xxs:mx-2'>
                <div className=" w-100 p-3 shadow  bg-white border border-gray-200 ">
                    <h1 className="text-sm border-b border-gray-200 pb-3 text-gray-500 mb-4">Order ID - {selectedOrder?._id}</h1>

                    {/* Products in Order */}
                    <div className="mb-6 mx-0 sm:mx-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Products in This Order</h2>
                    {selectedOrder?.items?.map((p, index) => (
                        <div key={index} className="flex items-center border-b border-gray-200 pb-1 pt-2">
                        <img src={p.product?.images?.length > 0 ? p.product?.images[0].url : ""} alt={p.name} className="sm:w-20 sm:h-20 w-16 h-16 object-cover rounded mr-4 border border-gray-300" />
                        <div className="flex-1">
                            <p className="text-gray-800 text-sm mr-2 sm:text-lg font-medium">{p.product?.title?.length > 20 ? p.product?.title.slice(0, 20) + "..." : p.product?.title}</p>
                            <p className="text-black sm:text-lg text-sm"> ₹{p.price}</p>
                            <p className="text-gray-600 text-xs">{p?.color?.color}</p>
                            <p className="text-gray-600 text-xs sm:text-sm">Seller: {p?.product?.brand}</p>
                            
                        </div>

                            <div className="relative">
                                    <ol className="text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                        <li className="my-4  ms-3">
                                            <span className="absolute flex items-center justify-center w-4 h-4 bg-green-200 rounded-full -start-2">
                                            <FaCheck className="w-2 h-2 text-green-500 dark:text-green-400" />
                                            </span>
                                            <h3 className="text-sm">Ordered</h3>
                                            <h3 className="text-xs">{new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date(selectedOrder?.updatedAt))}</h3>
                                        </li>
                                        <li className="my-4 ms-3">
                                            <span className={`absolute flex items-center justify-center w-4 h-4 ${selectedOrder?.orderStatus === 'Delivered' ? 'bg-green-200' : 'bg-yellow-200'} rounded-full -start-2 `}>
                                            {selectedOrder?.orderStatus === 'Delivered' ? <FaCheck className="w-2 h-2 text-green-500 dark:text-green-400" /> :  <FaExclamation className="w-2 h-2 text-yellow-500 dark:text-yellow-400" />}
                                            </span>
                                            <h3 className="text-sm">{selectedOrder?.orderStatus}</h3>
                                        </li>
                                    </ol>
                            </div>

                        </div>
                    ))}
                    </div>
                    
                </div> 

                {/* Shipping Details */}
                <div className="my-6 px-2 border-b bg-white shadow border-gray-200">
                    <div className="flex border-b p-2 justify-between gap-4 items-center mb-2">
                    <h2 className=" text-sm  w-full p-1  ml-5 text-gray-500">Shipping Details</h2>
                        <div className='flex justify-start gap-1'>
                            <FaMapMarkerAlt className="w-4 h-4 text-gray-600 " />
                        <a className="text-sm text-nowrap text-blue-600 hover:underline" href={`https://www.google.com/maps?q=${encodeURIComponent( selectedOrder?.shippingInfo?.address?.city + ", " + selectedOrder?.shippingInfo?.address?.state + ", " + selectedOrder?.shippingInfo?.address?.pincode)}`} target="_blank" rel="noopener noreferrer">
                            View on Map
                        </a>
                        </div>
                    </div>
                        <div className='p-3 flex gap-3'>
                    
                            <p className="text-lg"> {selectedOrder?.shippingInfo?.address?.name === "Home" ? <FaHome /> : selectedOrder?.shippingInfo?.address?.name === "Work" ? <MdWork /> : selectedOrder?.shippingInfo?.address?.name === "Hotel" ? <FaHotel /> : <GrLocationPin />} </p>
                            <div className='text-sm flex gap-1 flex-col'>
                                <p className="text-gray-600 flex gap-2 items-center">
                                    <span className='text-sm text-black'>{selectedOrder?.orderBy?.firstName?.toUpperCase().slice(0,1) + selectedOrder?.orderBy?.firstName?.slice(1).toLowerCase() + " " + selectedOrder?.orderBy?.lastName?.toUpperCase().slice(0,1) + selectedOrder?.orderBy?.lastName?.slice(1).toLowerCase()}</span>
                                </p>
                                <span>{selectedOrder?.shippingInfo?.address?.addressLine1 + ", " +  selectedOrder?.shippingInfo?.address?.addressLine2 }</span>
                                <span> {selectedOrder?.shippingInfo?.address?.city + ", " + selectedOrder?.shippingInfo?.address?.state + ", " + selectedOrder?.shippingInfo?.address?.pincode}</span>
                                <span>{selectedOrder?.orderBy?.mobile}</span>
                            </div>

                        </div> 
                    </div>

                
                <div className='my-6'>
                
                 

                 { selectedOrder?.orderStatus === "Delivered" && (
                    <div className="bg-white shadow border p-4 border-gray-200 ">
                        <div className='border-b border-gray-200 mb-3'>
                            <h2 className="text-xs text-gray-400 mb-2"> Your rewards on This order</h2>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <span className='p-1 rounded-full border '><FaCoins className='text-yellow-400 text-lg font-bold'/></span>
                            <div>
                                <p className="text-gray-600">{rewardCoins.toFixed(0)} ShopCoins Cashback</p>
                                <p className="text-gray-600 text-xs">Use them to save on your next order</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Order Pricing Summary */}
                <div className="mb-8  bg-white py-3 px-10 border-b shadow text-sm border-gray-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Information</h2>
                        <p className="text-gray-600 flex mb-4">Paid via {selectedOrder?.paymentMethod} on {new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date(selectedOrder?.updatedAt))}</p>
                        <p className="text-gray-600 flex justify-between mb-2"><span>Payment Id:</span> {selectedOrder?.paymentInfo?.razorpayPaymentID}</p>
                        <p className="text-gray-600 flex justify-between mb-2"><span>Amount:</span> ₹ {selectedOrder?.totalPrice}</p>
                        <p className="text-gray-600 flex justify-between mb-2"><span>Discount:</span> ₹ {selectedOrder?.totalPrice < selectedOrder?.totalAfterDiscount ? "0" : selectedOrder?.totalPrice - selectedOrder?.totalAfterDiscount}</p>
                        <p className="text-gray-600 flex justify-between mb-2"><span>Tax and Charges:</span> 10%</p>
                        <p className="text-gray-600 flex justify-between mb-2"><span>Final Amount:</span> ₹ {selectedOrder?.totalAfterDiscount}</p>
                 </div>

                {/* Recommended Products */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">You Might Also Like</h2>
                    <div className="flex gap-3 p-2 w-full overflow-scroll hide-scrollbar">
                        {recommendedProducts?.map((product, index) => (
                        <div key={index} className='border shadow border-gray-600 rounded'>
                            <FeaturedCard  product={product} />
                        </div>
                        ))}
                    </div>
                 </div>

                 {similarProducts?.length > 0 && 
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">You Might Also Like</h2>
                        <div className="flex gap-3 p-2 w-full overflow-scroll hide-scrollbar">
                            {similarProducts?.map((product, index) => (
                            <div key={index} className='border shadow border-gray-600 rounded'>
                            <FeaturedCard  product={product} />
                            </div>
                            ))}
                        </div>
                    </div>
                }

                 
             </div> 
         </div>                
    
  )
}

export default OrderDetails
