import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GoHeart } from "react-icons/go";
import ReactStars from 'react-stars';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../features/products/productSlice';
import { FaHeart } from "react-icons/fa";
import { getOneUser, getUserWishlist } from '../features/user/userSlice';

const StoreCard = (props) => {
    const {col,product} = props;

    const dispatch = useDispatch();
    // console.log(grid);
    let location=useLocation();

    const parser = new DOMParser();

    const wishlist = useSelector(state=>state.auth?.wishlist);

    useEffect(()=>{
        dispatch(getUserWishlist());
    },[dispatch])

    const addToWishlist = (id)=>{
        dispatch(addToWishList(id));
        setTimeout(() =>{
            dispatch(getUserWishlist());
        },600)
    }
    const wishIds = wishlist?.map((item)=>{
        if(item?._id === product?._id){
            return item?._id;
        }
    })

    console.log(col)


  return (
    <>
   <div className={`${col ? `col-span-${col}` : "col-span-4"}`} >
    <Link 
        // to={'/product/:id'}
         className={`featured-card flex ${col===4 || col===6 ? "flex-col" : "flex-row"} gap-3 relative hover:shadow-xl hover:scale-105 transition delay-50 bg-white rounded`}
         >
        <div className='icon absolute right-5 top-2'>
        <button className='border-0 bg-transparent' onClick={()=>{addToWishlist(product?._id)}}>{wishIds?.includes(product?._id) ? <FaHeart className='text-danger'/> : <GoHeart/>}</button>
        </div>
        <div className='featured-image mb-3 mx-4'>
        <img className='img-fluid'  src={product?.images[0]?.url || "/assets/watch.jpg"} alt="Featured product" />
        {product?.images?.length > 1 && 
            <img className='img-fluid'  src={product?.images[1]?.url || "/assets/watch.jpg"} alt="Featured product" />
        } 
        </div>
        <div className="px-4 py-3">
            <h6 className="brand">{product?.brand || 'Timex'}</h6>
            <p className="featured-item-text">{product?.title} </p>
            <p className={`description ${col===12 ? "block" : "hidden"}`}>{parser.parseFromString(product?.description,"text/html").body.textContent}</p>
            <div className='d-flex align-items-center gap-3'>
                
            <ReactStars
            count={5}
            value={product?.totalRating}
            edit={false}
            size={window.innerWidth < 768 ? 20 : 24}
            color2={'#ffd700'} 
            className={col===3 ? "hidden" : "block"}
            />

            <p style={{color:"gray"}} className={`mb-0 ${col===3 || col===4 ? "hidden" : "block"} md:block hidden`}>{product?.ratings?.length} ratings</p>
            </div>
            <h5 className='price'>₹ {product?.price} only</h5>
        </div>
        <div className='action-bar absolute top-10 right-5'>
            <div className='d-flex flex-column gap-15'>
                <button className='border-0 bg-transparent'>
                    <img src="/images/add-cart.svg" alt="cart" />
                </button>
                <button className='border-0 bg-transparent'>
                    <img src="/images/view.svg" alt="view" />
                </button>
                <button className='border-0 bg-transparent'>
                    <img src="/images/prodcompare.svg" alt="compare" />
                </button>
            </div>

        </div>
    </Link>
   </div>

</>
  )
}

export default StoreCard
