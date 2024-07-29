import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GoHeart } from "react-icons/go";
import ReactStars from 'react-stars';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../features/products/productSlice';
import { FaHeart } from "react-icons/fa";
import { addToCart, getOneUser, getUserCart, getUserWishlist } from '../features/user/userSlice';
import { TbLoader } from 'react-icons/tb';
import { IoBagAddSharp,IoBagCheck } from "react-icons/io5";

const StoreCard = (props) => {
    const {col,product} = props;
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const parser = new DOMParser();
    const {wishlist,cart} = useSelector(state=>state.auth);
    useEffect(()=>{
        dispatch(getUserWishlist());
        dispatch(getUserCart());
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

    let desc = product?.description && parser.parseFromString(product?.description,"text/html").body.textContent;
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
    const user = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;
   

  return (
    <>
   <div className={`${col===4 ? "col-span-4" : col===6 ? "col-span-6" : "col-span-12"}  relative hover:shadow-xl hover:scale-105 transition delay-50 bg-white rounded`} >
    <Link 
        to={`/product/${product?._id}`}
         className={`featured-card flex ${col===4 || col===6 ? "flex-col " : "md:flex-row flex-col"} gap-3`}
         >
                <div className='icon absolute right-5 top-2'>
                    <button onClick={!user ? ()=>{navigate('/login')}: () => {addToWishlist(product?._id)}} disabled={isAddingToCart || isLoading } className='border-0 bg-transparent'>
                         {wishIds?.includes(product?._id) ? <FaHeart className='text-danger' /> : <GoHeart />}
                    </button>
                    {isLoading && <TbLoader className='text-danger' />}
                </div>
        <div className='featured-image mb-3 mx-4'>
        <img className='img-fluid h-[170px]'  src={product?.images[0]?.url || "/assets/sample-img.jpg"} alt="Featured product" />
        {product?.images?.length > 1 && 
            <img className='img-fluid h-[170px]'  src={product?.images[1]?.url || "/assets/sample-img.jpg"} alt="Featured product" />
        } 
        </div>
        <div className="px-4 py-3">
            <h6 className="brand">{product?.brand || 'Timex'}</h6>
            <p className="featured-item-text">{product?.title?.length > 50 ? `${product?.title?.slice(0,50)}...` : product?.title} </p>
            <p className={`description ${col===12 ? "block" : "hidden"}`}>{desc.length > 140 ? `${desc.slice(0,140)}...` : desc}</p>
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
    </Link>

        <div className='action-bar absolute top-10 right-3'>
            <div className='d-flex flex-column gap-15'>
                    <button onClick={!user ? ()=>{navigate('/login')} : null} hidden={isAddingToCart} disabled={isAddingToCart || isLoading} className='border-0 bg-transparent' onClick={() => {addProductToCart(product?._id); }}>
                       {!inCart ? <IoBagAddSharp /> : <IoBagCheck className='text-green-500'/>}
                    </button>
                    {isAddingToCart && <TbLoader hidden={!isAddingToCart} className='text-green-500' />}
                    
                <button className='border-0 bg-transparent'>
                    <img src="/images/view.svg" alt="view" />
                </button>
                <button className='border-0 bg-transparent'>
                    <img src="/images/prodcompare.svg" alt="compare" />
                </button>
            </div>

        </div>
   </div>

</>
  )
}

export default StoreCard
