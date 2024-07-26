import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import ReactStars from 'react-stars';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../features/products/productSlice';
import { FaHeart } from "react-icons/fa";
import { getUserWishlist } from '../features/user/userSlice';
import { TbLoader } from "react-icons/tb";

const FeaturedCard = (props) => {
    const { grid, product } = props;

    const dispatch = useDispatch();
    let location = useLocation();

    const parser = new DOMParser();

    const wishlist = useSelector(state => state.auth?.wishlist);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserWishlist());
    }, []);

    const user = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;

    const addToWishlist = (id) => {
        if (user) {
            dispatch(addToWishList(id));
            setTimeout(() => {
                dispatch(getUserWishlist());
            }, 600);
        } else {
            navigate('/login', { state: { from: location } });
        }
    };

    const wishIds = wishlist?.map((item) => {
        if (item?._id === product?._id) {
            return item?._id;
        }
    });

    let isLoading = useSelector((state) => state.product?.isLoading);





    return (
        <>
        <div className="relative min-w-[250px] hover:shadow-xl hover:scale-105 transition delay-50 bg-white rounded">
        
                <div className='icon absolute right-5 top-2'>
                    <button hidden={isLoading} className='border-0 bg-transparent' onClick={() => {addToWishlist(product?._id); }}>
                         {wishIds?.includes(product?._id) ? <FaHeart className='text-danger' /> : <GoHeart />}
                    </button>
                    {isLoading && <TbLoader className='text-danger' />}
                </div>
                <Link
                to={`/product/${product?.slug}`}
                state={{ id: product?._id }}
                
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
                <div className='action-bar absolute top-10 right-5'>
                    <div className='d-flex flex-column gap-15'>
                        <button className='border-0 bg-transparent' >
                            <img src="/images/add-cart.svg" alt="cart" />
                        </button>
                        <button className='border-0 bg-transparent' >
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
    );
};

export default FeaturedCard;
