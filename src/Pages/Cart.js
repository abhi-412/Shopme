// OrdersPage.js
import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaHeart, FaHome, FaHotel, FaMapMarkerAlt, FaShoppingCart} from 'react-icons/fa';
import Container from '../Components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getUserAddress, getUserCart, getUserWishlist } from '../features/user/userSlice';
import Loader from "./Loader"
import { Link, useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { FaHeartCirclePlus } from 'react-icons/fa6';
import { BsCart4 } from 'react-icons/bs';
import { addToWishList } from '../features/products/productSlice';
import { MdWork } from 'react-icons/md';
import { GrLocationPin } from 'react-icons/gr';
const Orders = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getUserCart())
    dispatch(getUserAddress())
},[dispatch]);

const {isLoading,wishlist,address} = useSelector((state)=>state.auth);

const wishIds = wishlist?.map((item)=>{
    return item?._id;
})

const addProductToCart = (p)=>{

    const cart = {
   
        cart: [
            {
                _id: p?.product?._id,
                count: p?.count,
                color: p?.color,
                size:p?.size
            },
        ]
    }
    dispatch(addToCart(cart));
    setTimeout(()=>{
        dispatch(getUserCart());
    },1100)
    
}

const customer = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null


const addToWishlist = (id)=>{
    dispatch(addToWishList(id));
    setTimeout(() =>{
        dispatch(getUserWishlist());
    },600)
}


const userCart = useSelector((state)=>state.auth?.cart);
const randomNum =  Math.floor(Math.random() * (1200 - 100 + 1)) + 100;


  return (
    
        <Container class1="py-4 flex items-center">
{isLoading ? (
        <Loader/>
    ): (
       <div className='py-5'>
         <div className='flex flex-col gap-4 w-full justify-center'>

                <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-3 md:flex-row md:flex-wrap  bg-gray-200 py-8 px-4">
                <h1 className="text-4xl bg-white p-3 col-span-1 md:col-span-2 lg:col-span-3 text-center font-semibold text-gray-900 mb-2">My Cart</h1>
                {userCart?.products?.length > 0 ? (
                userCart?.products?.map(p => (
                        <div className="flex bg-white p-3 col-span-1  gap-2 shadow-sm items-start flex-col">
                             <div key={p.product?._id} className='flex w-full items-start gap-1 '>
                                <div className='flex flex-col gap-1 justify-center items-center mr-4'>
                                <img src={p.product?.images?.length > 0 ? p.product?.images[0].url : ""} alt={p.name} className="w-24 h-24 object-cover rounded " />
                                    <div className='px-2 flex justify-center'>
                                    <div className=" text-gray-600 text-xs font-semibold border px-3 py-1">Qty: {p?.count}</div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 justify-center text-gray-600 text-sm'>
                                    <h6 className='text-sm text-purple-600 font-semibold'>{p.product?.brand}</h6>
                                    <p className='font-semibold'>{p.product?.title?.length > 40 ? p.product?.title.slice(0, 40) + "..." : p.product?.title}</p>
                                        <div className='flex gap-1 items-center'>
                                        <ReactStars
                                            count={5}
                                            value={parseInt(p.product?.totalRating)}
                                            edit={false}
                                            size={18}
                                            color2={'#ffd700'}
                                            className='mb-0' 
                                        />
                                        <div className='flex gap-2 items-center text-xs'>
                                            <span className={`mt-0.5  font-semibold ${parseInt(p.product?.totalRating) < 2.5 ? 'text-red-500' : 'text-green-600'}`}>{parseInt(p.product?.totalRating)}</span>
                                            <span>({p.product?.ratings?.length}) </span>
                                        </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <h6 className='line-through text-gray-400 font-semibold'>₹ {p.product?.price * 2 + randomNum}</h6>
                                            <h6 className='text-black font-semibold'>₹{p.product?.price}</h6>
                                            <span className='text-green-700 flex gap-1 items-center font-semibold'><FaArrowDown /> {((((p?.product?.price * 2 + randomNum) - (p?.product?.price))/(p?.product?.price *2 + randomNum))*100).toFixed(0)}% </span>
                                        </div>
                    
                                </div>
                            </div>
                            <div className='text-xs flex items-center gap-2 text-gray-700'>
                                    Delivery by <h3 >{new Intl.DateTimeFormat('en-US', {weekday: "short" , month: 'long', day: '2-digit', year: 'numeric' }).format(new Date(Date.now() + 7*24*60*60*1000))}</h3>
                                    {p?.product?.price < 1000 ? <span className='text-black font-semibold'>₹50</span> : <p className='flex gap-2 items-center mb-0 text-xs'><span className='text-gray-400 font-semibold line-through '>₹50</span><span className="text-green-600 font-semibold">FREE</span></p>}
                            </div>
                            <div className='flex flex-nowrap flex-col xxs:flex-row justify-between md:px-3 mt-1 cursor-pointer w-full text-gray-500 font-semibold'> 
                                <Link to={`/product/${p?.product?._id}`} className='border-t hover:scale-105 hover:text-green-500 py-1 text-sm flex justify-center gap-2 items-center w-full text-center'><HiOutlineViewfinderCircle  className='text-lg ' /> Product</Link>
                                <button onClick={()=>addProductToCart(p)} className='border-l py-1 text-sm flex justify-center gap-2 items-center border-t text-center hover:text-red-600  w-full'><RiDeleteBin6Line className='text-lg '  /> Remove</button>
                                <button onClick={()=>addToWishlist(p?.product?._id)} className='border-t py-1 text-sm flex justify-center gap-2 items-center hover:text-red-600 border-l text-center w-full' > {wishIds?.includes(p?.product?._id) ? <FaHeart className='text-danger' /> : <FaHeartCirclePlus className='text-lg ' />}Wishlist</button>
                            </div>
                        </div>
                    
                ))
                ) : (
                    <Link to={"/store"} className="flex flex-col col-start-2 cursor-pointer items-center justify-center h-72 w-full text-center">
                        <div className="flex flex-col items-center justify-center  rounded-lg ">
                            <FaArrowDown className='text-4xl animate-bounce'/>
                            <BsCart4 className="text-9xl text-gray-600" />
                        </div>
                       
                    </Link>
              
                )}

                </div>


                       <div className='flex md:flex-row flex-col gap-3 my-6 w-full items-center justify-between'>
                       {address?.length > 0 && (
                                <div className=" px-2 border-b w-full bg-white py-2 shadow border-gray-200">
                                <div className="flex border-b p-2 justify-between gap-4 items-center mb-2">
                                <h2 className=" text-sm  w-full p-1  ml-5 text-gray-500">Shipping Details</h2>
                                    <div className='flex justify-start gap-1'>
                                        <FaMapMarkerAlt className="w-4 h-4 text-gray-600 " />
                                    <a className="text-sm text-nowrap text-blue-600 hover:underline" href={`https://www.google.com/maps?q=${encodeURIComponent( address[0]?.city + ", " + address[0]?.state + ", " + address[0]?.pincode)}`} target="_blank" rel="noopener noreferrer">
                                        View on Map
                                    </a>
                                    </div>
                                </div>
                                    <div className='p-3 flex gap-3'>
                                
                                        <p className="text-lg"> {address[0]?.name === "Home" ? <FaHome /> : address[0]?.name === "Work" ? <MdWork /> : address[0]?.name === "Hotel" ? <FaHotel /> : <GrLocationPin />} </p>
                                        <div className='text-sm flex gap-1 flex-col w-full'>
                                            <p className="text-gray-600 flex gap-2 items-center">
                                                <span className='text-sm text-nowrap text-black'>{customer?.firstName?.toUpperCase().slice(0,1) + customer?.firstName?.slice(1).toLowerCase() + " " + customer?.lastName?.toUpperCase().slice(0,1) + customer?.lastName?.slice(1).toLowerCase()}</span>
                                                <span className='w-full text-end text-blue-500'>You can change address on checkout</span>
                                            </p>
                                            <span>{address[0]?.addressLine1 + ", " +  address[0]?.addressLine2 }</span>
                                            <span> {address[0]?.city + ", " + address[0]?.state + ", " + address[0]?.pincode}</span>
                                            <span>{customer?.mobile}</span>
                                        </div>

                                    </div> 
                                </div>


                            )}

                                <div className=" w-full bg-white p-4 border-b shadow h-fit text-sm border-gray-300">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Price Details</h2>
                                        <p className="text-gray-600 flex justify-between mb-2"><span>Price ({userCart?.products?.length} items):</span> ₹ {userCart?.cartTotal +( userCart?.cartTotal * 2 + randomNum)}</p>
                                        <p className="text-green-500 flex justify-between mb-2"><span className='text-gray-600'>Discount:</span>- ₹{userCart?.cartTotal * 2 + randomNum}</p>
                                        <p className="text-gray-600 flex justify-between mb-2"><span>Delivery Charges:</span>{userCart?.cartTotal > 1000 ? <p className='flex gap-2'> <span className='line-through text-gray-400'>₹50</span> <span className='text-green-500'> FREE Delivery</span></p> : <span>₹50</span>} </p>
                                        <p className="text-black flex font-semibold  justify-between"><span>Final Amount:</span> ₹ {userCart?.cartTotal > 1000 ? userCart?.cartTotal  : userCart?.cartTotal > 0 ? userCart?.cartTotal + 50 : 0}</p>
                                </div>
                       </div>

                       <div className='flex md:flex-row flex-col gap-3 my-6 w-full items-center justify-end'>
                            <Link to={"/store"} className='py-2 px-5 text-gray-200 bg-red-500 hover:bg-red-700 hover:text-white'>Continue Shopping</Link>
                            <Link to={"/checkout"} className='py-2 px-5 bg-green-500 hover:bg-green-700 hover:text-white'>Place Order</Link>
                       </div>
                
            
        </div>
       </div>
    )}
    
    </Container>
    
  );
};

export default Orders;
