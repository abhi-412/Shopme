// OrdersPage.js
import React, { useState, useEffect } from 'react';
import OrderCard from '../Components/OrderCard';
import { FaDownload, FaExclamation, FaMapMarkerAlt, FaSearch, FaStar } from 'react-icons/fa';
import Container from '../Components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../features/user/userSlice';
import { FaCheck, FaUser, FaFileAlt, FaClipboardCheck } from 'react-icons/fa';
import { getProducts } from '../features/products/productSlice';

const Orders = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();
  const customer = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null
  const userOrders = useSelector((state)=>state.auth.orders)
  
  const filteredOrders = userOrders?.filter(order => 
    order.orderBy?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );



  useEffect(() => {
    if(customer !== null){
        const id = customer?._id;
        dispatch(getMyOrders(id))
    }
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

  const handleSelect = (id)=>{
    const order = userOrders?.find(order => order?._id === id);
    setSelectedOrder(order);
    // console.log(order?.items);
  }

  console.log(filteredOrders[filteredOrders.length - 1]);
  useEffect(()=>{
    setSelectedOrder(filteredOrders[filteredOrders.length - 1])
  },[filteredOrders])

  const products = useSelector((state)=>state.product.products);

  return (
    <Container class1="py-4 flex items-center">

        <div className='flex gap-4 w-full'>
                <div className="bg-white max-h-screen overflow-scroll hide-scrollbar w-5/12 p-6 rounded-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>

                {/* Search Input */}
                <div className="relative mb-6 ">
                <input
                    type="text"
                    placeholder="Search by order ID or customer name..."
                    onChange={handleSearchChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
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

            
               {/* {selectedOrder !== null && ( */}
                 <div className="bg-white w-7/12 max-h-screen overflow-scroll hide-scrollbar p-5 rounded-lg border border-gray-200">
                 <h1 className="text-sm border-b border-gray-200 pb-3 text-gray-500 mb-4">Order ID - {selectedOrder?._id}</h1>

                 {/* Products in Order */}
                 <div className="mb-6">
                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">Products in This Order</h2>
                 {selectedOrder?.items?.map((p, index) => (
                     <div key={index} className="flex items-center mb-4 border-b border-gray-200 pb-4">
                     <img src={p.product?.images?.length > 0 ? p.product?.images[0].url : ""} alt={p.name} className="w-20 h-20 object-cover rounded mr-4 border border-gray-300" />
                     <div className="flex-1">
                         <p className="text-gray-800 font-medium">{p.product?.title?.length > 40 ? p.product?.title.slice(0, 40) + "..." : p.product?.title}</p>
                         <p className="text-black text-lg "> ₹{p.price}</p>
                         <p className="text-gray-600 text-xs">{p?.color?.color}</p>
                         <p className="text-gray-600 text-sm">Seller: {p?.product?.brand}</p>
                         
                     </div>

                        <div>
                                <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                    <li className="mb-10 ms-6">
                                        <span className="absolute flex items-center justify-center w-4 h-4 bg-green-200 rounded-full -start-2 ring-4 ring-white ">
                                        <FaCheck className="w-2 h-2 text-green-500 dark:text-green-400" />
                                        </span>
                                        <h3 className="text-sm">Ordered</h3>
                                        <h3 className="text-xs">{new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date(selectedOrder?.updatedAt))}</h3>
                                    </li>
                                    <li className="mb-10 ms-6">
                                        <span className={`absolute flex items-center justify-center w-4 h-4 ${selectedOrder?.orderStatus === 'Delivered' ? 'bg-green-200' : 'bg-yellow-200'} rounded-full -start-2 ring-4 ring-white`}>
                                        {selectedOrder?.orderStatus === 'Delivered' ? <FaCheck className="w-2 h-2 text-green-500 dark:text-green-400" /> :  <FaExclamation className="w-2 h-2 text-yellow-500 dark:text-yellow-400" />}
                                        </span>
                                        <h3 className="text-sm">{selectedOrder?.orderStatus}</h3>
                                    </li>
                                </ol>
                        </div>

                     </div>
                 ))}
                 </div>

                 {/* Shipping Details */}
                 <div className="mb-6 bg-gray-50 p-4 border border-gray-200 rounded-lg">
                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">Shipping Details</h2>
                 <p className="text-gray-600 mb-2"><strong>Address:</strong> {selectedOrder?.shippingInfo?.address?.addressLine1 + " " +  selectedOrder?.shippingInfo?.address?.addressLine2 + " " + selectedOrder?.shippingInfo?.address?.city + ", " + selectedOrder?.shippingInfo?.address?.state + ", " + selectedOrder?.shippingInfo?.address?.pincode}</p>
                 {/* <p className="text-gray-600 mb-2"><strong>Tracking Number:</strong> {selectedOrder?.trackingNumber}</p> */}
                 <div className="flex items-center mt-2">
                     <FaMapMarkerAlt className="w-6 h-6 text-gray-600 mr-2" />
                     <a href={`https://www.google.com/maps?q=${encodeURIComponent( selectedOrder?.shippingInfo?.address?.city + ", " + selectedOrder?.shippingInfo?.address?.state + ", " + selectedOrder?.shippingInfo?.address?.pincode)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                     View on Map
                     </a>
                 </div>
                 </div>

                 {/* Similar Products */}
                
             </div>
            
        </div>

        <div className='bg-white p-4 my-6'>
             <div className="mb-6">
                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">Similar Products</h2>
                 <div className="flex max-w-full p-3 overflow-scroll hide-scrollbar">
                     {products?.map((product, index) => (
                     <div key={index} className="bg-white min-w-[300px] flex flex-col justify-between  shadow-lg rounded-lg p-4 mr-4 border border-gray-200">
                        <div>
                            <img src={product?.images?.length > 0 ? product?.images[0].url : ""} alt={product.title} className="w-full h-32 object-contain rounded mb-4 border border-gray-300" />
                        </div>
                            <div className='flex flex-col'>
                                <p className="text-gray-800 font-medium">{product.title?.length > 40 ? product.title.slice(0, 40) + "..." : product.title}</p>
                                <p className="text-gray-600">₹ {product.price}</p>
                            </div>
                        <div className='flex justify-start items-end'>
                            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors">
                            View Product
                            </button>
                        </div>
                     </div>
                     ))}
                 </div>
                 </div>

                 {/* Recommended Products */}
                 <div className="mb-6">
                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">You Might Also Like</h2>
                 <div className="flex overflow-x-auto">
                     {/* {recommendedProducts.map((product, index) => (
                     <div key={index} className="bg-white shadow-lg rounded-lg p-4 mr-4 border border-gray-200">
                         <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-4 border border-gray-300" />
                         <p className="text-gray-800 font-medium">{product.name}</p>
                         <p className="text-gray-600">{product.price}</p>
                         <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors">
                         View Product
                         </button>
                     </div>
                     ))} */}
                 </div>
                 </div>

                 {/* Order Pricing Summary */}
                 <div className="mb-6 bg-gray-50 p-4 border border-gray-200 rounded-lg">
                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pricing Summary</h2>
                 <p className="text-gray-600 mb-2"><strong>Subtotal:</strong> $120.00</p>
                 <p className="text-gray-600 mb-2"><strong>Shipping:</strong> $10.00</p>
                 <p className="text-gray-600 mb-2"><strong>Tax:</strong> $8.00</p>
                 <p className="text-gray-800 font-bold mb-2"><strong>Total:</strong> $138.00</p>
                 </div>

                 {/* Rewards */}
                 <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">Rewards</h2>
                 {/* <p className="text-gray-600">{order.rewards}</p> */}
                 </div>
             </div>

    
    </Container>
  );
};

export default Orders;
