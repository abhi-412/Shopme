import React, { useEffect } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import Container from '../Components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWishlist } from '../features/user/userSlice'
import { addToWishList } from '../features/products/productSlice'
import { FaHeartCirclePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { FaCartPlus, FaEye } from "react-icons/fa";

const Wishlist = () => {
  const dispatch = useDispatch();

  const authState = useSelector(state=>state.auth);
  const {wishlist, isLoading,isError,message,isSuccess} = authState;

  useEffect(()=>{
      dispatch(getUserWishlist());
  },[dispatch])


  const handleRemove = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch((getUserWishlist()));
    },500)
  }


  return (
    <>
      <Meta title={"Wishlist"} />
        <BreadCrumb title={"Wishlist"} />

        <Container class1="wishlist-wrapper py-5 home-wrapper-2">
          {wishlist?.length === 0 && <Link to="/store" className="text-center flex flex-col gap-4 py-12 justify-center items-center">
            <FaHeartCirclePlus className="text-5xl bounce-animation text-red-600" />
            <h5 className="text-3xl text-gray-600 ">Add Items to wishlist</h5>
          </Link>
            
            }
        <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 xxs:grid-cols-1 xs:grid-cols-2 gap-3">
                   
                  {wishlist?.map((item)=>(
                       <div className="col-span-1  bg-white shadow sm:p-3 p-2 rounded">
                       <div className="w-full h-full flex flex-col sm:gap-4 justify-between gap-2 relative">
                       <h6 className='sm:text-sm text-xs  text-indigo-500 font-semibold'>{item?.category}</h6>
                          
                           <button
                              className="absolute w-4 h-4 top-0 -right-1"
                              onClick={() => handleRemove(item?._id)}>
                              <img src="images/cross.svg" alt="cross" />
                              
                            </button>
                             <div className="w-full flex justify-center">
                                <img className='w-10/12' src={item?.images[0]?.url || "/assets/watch.jpg"} alt="" />
                             </div>
                             <div className='sm:py-3 py-1 flex flex-col gap-2'>
                              <h6 className='text-sm text-red-500 font-semibold'>{item?.brand}</h6>
                             <h5 className="md:text-lg hidden md:block text-base font-semibold">
                                {item?.title}
                           </h5>
                           <h5 className="md:text-lg md:hidden block text-base font-semibold">
                                {`${item?.title?.slice(0,17)}...`}
                           </h5>
                           <h6 className="sm:text-sm text-xs font-semibold">Rs. {item?.price}/-</h6>

                           
                        </div>
                        <div className='flex gap-2 sm:gap-4 px-2 w-full items-end py-2 sm:justify-normal justify-between flex-wrap'>
                                <Link className=' text-nowrap flex gap-2 items-center text-blue-500 font-semibold rounded' to={`/product/${item?._id}`}><FaEye className='text-xl' />View</Link>
                                <button className=' text-nowrap text-sm flex gap-2 items-center text-blue-600 font-semibold  rounded'><FaCartPlus className='text-xl' />Cart</button>
                             </div>
                             
                       </div>
                   </div>


                  ))}
               
                   
           </div>
        </Container>

        
        </>
  )
}

export default Wishlist
