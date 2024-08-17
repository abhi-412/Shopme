// OrdersPage.js
import React, { useState, useEffect } from 'react';
import OrderCard from '../Components/OrderCard';
import { FaCoins, FaDownload, FaExclamation, FaHome, FaHotel, FaMapMarkerAlt, FaSearch, FaStar } from 'react-icons/fa';
import Container from '../Components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../features/user/userSlice';
import { FaCheck, FaUser, FaFileAlt, FaClipboardCheck } from 'react-icons/fa';
import { getProducts } from '../features/products/productSlice';
import Loader from "./Loader"
import { useNavigate } from 'react-router-dom';
import { MdCancel, MdWork } from 'react-icons/md';
import { GrLocationPin } from 'react-icons/gr';

const Orders = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();
  const customer = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null
  const userOrders = useSelector((state)=>state.auth.orders)
  const isLoading = useSelector((state)=>state.auth.isLoading)
  
  const filteredOrders = userOrders?.filter(order =>
    order?.items?.some(item => item?.product?.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    order?.createdAt?.toString().includes(searchTerm)

  );

  


  useEffect(() => {
    if(customer !== null){
        const id = customer?._id;
        dispatch(getMyOrders(id))
    }

  }, [ dispatch]);

  const handleSelect = (id)=>{
    const order = userOrders?.find(order => order?._id === id);
    if(window.innerWidth < 1024){
        navigate(`/orders/${id}`,{state:{selectedOrder: order}});
    }else{
        setSelectedOrder(order);
    }
    // console.log(order?.items);
  }




  const rewardCoins = selectedOrder?.totalAfterDiscount * 0.01;


  return (
    
        <Container class1="py-4 flex items-center">
{isLoading ? (
        <Loader/>
    ): (
       <div>
         <div className='flex lg:flex-row flex-col gap-4 w-full'>
                <div className="bg-white max-h-[160vh] overflow-scroll hide-scrollbar w-[100%] lg:w-5/12 p-6 rounded-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>

                {/* Search Input */}
                <div className="relative mb-6 ">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    onChange={handleSearchChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                {/* Orders List */}
                {filteredOrders?.length > 0 ? (
                filteredOrders.map(order => (
                    order && order?.items?.length > 0 &&(
                    <OrderCard
                        key={order?._id}
                        order={order}
                        handleSelect={handleSelect}
                    />
                    )
                ))
                ) : (
                <p className="text-gray-600 text-center mt-4">No orders found.</p>
                )}

                </div>


                 {selectedOrder !== null ? (
                        <div className="bg-white w-100 lg:w-7/12  p-4 rounded-lg border border-gray-200">
                            <h1 className="text-sm border-b border-gray-200 pb-3 text-gray-500 mb-4">Order ID - {selectedOrder?._id}</h1>

                            {/* Products in Order */}
                            <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Products in This Order</h2>
                            {selectedOrder?.items?.map((p, index) => (
                                <div key={index} className="flex items-center mb-3 border-b border-gray-200 pb-1 pt-2">
                                <img onClick={()=>navigate(`/product/${p?.product?._id}`)} src={p.product?.images?.length > 0 ? p.product?.images[0].url : ""} alt={p.name} className="w-20 h-20 object-cover cursor-pointer rounded mr-4 border border-gray-300" />
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{p.product?.title?.length > 40 ? p.product?.title.slice(0, 40) + "..." : p.product?.title}</p>
                                    <p className="text-black text-lg "> ₹{p.price}</p>
                                    <p className="text-gray-600 text-xs">{p?.color?.color}</p>
                                    <p className="text-gray-600 text-sm">Seller: {p?.product?.brand}</p>
                                    
                                </div>

                                    <div>
                                            <ol className="relative text-gray-500 border-s border-gray-200 ">
                                                <li className="mb-10 ms-6">
                                                    <span className="absolute flex items-center justify-center w-4 h-4 bg-green-200 rounded-full -start-2 ring-4 ring-white ">
                                                    <FaCheck className="w-2 h-2 text-green-500 " />
                                                    </span>
                                                    <h3 className="text-sm">Ordered</h3>
                                                    <h3 className="text-xs">{new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date(selectedOrder?.createdAt))}</h3>
                                                </li>
                                                <li className="mb-10 ms-6">
                                                    <span className={`absolute flex items-center justify-center w-4 h-4 ${selectedOrder?.orderStatus === 'Delivered' ? 'bg-green-200' : selectedOrder?.orderStatus === 'Cancelled' ? 'bg-red-200' : 'bg-yellow-200'} rounded-full -start-2 ring-4 ring-white`}>
                                                    {selectedOrder?.orderStatus === 'Delivered' ? <FaCheck className="w-2 h-2 text-green-500 " /> : selectedOrder?.orderStatus === 'Cancelled' ? <MdCancel className="w-4 h-4 text-red-500" /> : <FaExclamation className="w-2 h-2 text-yellow-500" />}
                                                    </span>
                                                    <h3 className="text-sm">{selectedOrder?.orderStatus}</h3>
                                                    <h3 className="text-xs">{new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date(selectedOrder?.updatedAt))}</h3>
                                                </li>
                                            </ol>
                                    </div>

                                </div>
                            ))}
                            </div>

                            {/* Shipping Details */}
                            <div className="my-6 px-2 border-b  bg-gray-50 shadow border-gray-200">
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


                                <div className="mb-6  bg-white py-3 px-10 border-b shadow text-sm border-gray-300">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Information</h2>
                                        <p className="text-gray-600 flex mb-4">Paid via {selectedOrder?.paymentMethod} on {new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date(selectedOrder?.updatedAt))}</p>
                                        <p className="text-gray-600 flex justify-between mb-2"><span>Payment Id:</span> {selectedOrder?.paymentInfo?.razorpayPaymentID}</p>
                                        <p className="text-gray-600 flex justify-between mb-2"><span>Amount:</span> ₹ {selectedOrder?.totalPrice}</p>
                                        <p className="text-gray-600 flex justify-between mb-2"><span>Discount:</span> ₹ {selectedOrder?.totalPrice <= selectedOrder?.totalAfterDiscount ? "0" : selectedOrder?.totalPrice - selectedOrder?.totalAfterDiscount}</p>
                                        <p className="text-gray-600 flex justify-between mb-2"><span>Tax and Charges:</span> 10%</p>
                                        <p className="text-gray-600 flex justify-between mb-2"><span>Final Amount:</span> ₹ {selectedOrder?.totalAfterDiscount}</p>
                                </div>

                                {/* { selectedOrder?.orderStatus === "Delivered" && ( */}
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
                            
                        </div>   

    
                 ) : (

                    <div className="bg-white hidden lg:block w-7/12 max-h-screen overflow-scroll hide-scrollbar p-4 rounded-lg border border-gray-200">
                        <div className='w-full h-full flex items-center justify-center'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Select an order to display its details</h2>
                        </div>
                    </div>
                 )

                
                }
            
        </div>
       </div>
    )}
    
    </Container>
    
  );
};

export default Orders;
