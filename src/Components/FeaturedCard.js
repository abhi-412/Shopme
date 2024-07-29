import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import ReactStars from 'react-stars';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../features/products/productSlice';
import { FaHeart } from "react-icons/fa";
import { addToCart, getUserCart, getUserWishlist } from '../features/user/userSlice';
import { TbLoader } from "react-icons/tb";
import { IoBagAddSharp, IoBagCheck } from 'react-icons/io5';

const FeaturedCard = (props) => {
    const { grid, product } = props;

    useEffect(()=>{
        dispatch(getUserWishlist());
        dispatch(getUserCart());
        dispatch(getUserWishlist());
    },[dispatch])


    const user = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;

    const dispatch = useDispatch();
    const parser = new DOMParser();
    const {wishlist,cart} = useSelector(state=>state.auth);
   
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
    const [inCart,setInCart] = useState(false)
    
    useEffect(()=>{
        const cartIds = cart?.products?.map((item)=>{
            if(item?.product?._id === product?._id){
                return item?.product?._id;
            }else{
                return null;
            }
        })
        if(cartIds?.includes(product?._id)){
            setInCart(true);
        }else{
            setInCart(false)
        }
    },[cart?.products, product?._id,dispatch])

    const isAddingToCart = useSelector((state)=>state.auth?.isLoading)

    let isLoading = useSelector((state) => state.product?.isLoading);


    const addProductToCart = ()=>{
        const cart = {
            cart: [
                {
                    _id: product?._id,
                    count: 1,
                    color: product?.colors?.length ? product.colors[0] : "all",
                    size:"M"
                },
            ]
        }
        dispatch(addToCart(cart));
        setTimeout(()=>{
            dispatch(getUserCart());
        },2000)
    }
   


    return (
        <>
        <div className="relative min-w-[250px] max-w-[255px]  hover:shadow-xl hover:scale-105 transition delay-50 bg-white rounded">
        
                <div className='icon absolute right-5 top-2'>
                    <button hidden={isLoading} className='border-0 bg-transparent' onClick={() => {addToWishlist(product?._id); }}>
                         {wishIds?.includes(product?._id) ? <FaHeart className='text-danger' /> : <GoHeart />}
                    </button>
                    {isLoading && <TbLoader className='text-danger' />}
                </div>
                <a
                href={`/product/${product?._id}`}
            >
                <div className='mb-3 mx-4 p-4 featured-image'>
                    <img className='img-fluid object-cover w-100' src={product?.images[0]?.url || "/assets/watch.jpg"} alt="Featured product" />
                    {product?.images?.length > 1 &&
                        <img className='img-fluid' src={product?.images[1]?.url || "/assets/watch.jpg"} alt="Featured product" />
                    }
                </div>
                <div className="px-4 py-3">
                    <h6 className="brand">{product?.brand || 'Timex'}</h6>
                    <p className="featured-item-text">{product?.title}</p>
                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>{parser.parseFromString(product?.description, "text/html").body.textContent}</p>
                    <div className='d-flex align-items-center gap-3'>
                        <ReactStars
                            count={5}
                            value={parseInt(product?.totalRating)}
                            edit={false}
                            size={window.innerWidth < 768 ? 20 : 24}
                            color2={'#ffd700'}
                        />
                        <p style={{ color: "gray" }} className='mb-0 md:block hidden'>{product?.ratings?.length} ratings</p>
                    </div>
                    <h5 className='price'>₹ {product?.price} only</h5>
                </div>
                </a>
                <div className='action-bar absolute top-10 right-5'>
                    <div className='d-flex flex-column gap-15'>
                    <button hidden={isAddingToCart} disabled={isAddingToCart} className='border-0 bg-transparent' onClick={() => {addProductToCart(product?._id); }}>
                       {!inCart ? <IoBagAddSharp /> : <IoBagCheck className='text-green-500'/>}
                    </button>
                    {isAddingToCart && <TbLoader hidden={!isAddingToCart} className='text-green-500' />}
                        <button className='border-0 bg-transparent' >
                            <img src="/images/view.svg" alt="view" />
                        </button>
                        <button className='border-0 bg-transparent'>
                            <img src="/images/prodcompare.svg" alt="compare" />
                        </button>
                    </div>
                </div>
            
        </div>
            
        </>
    );
};

export default FeaturedCard;
