import React, { useEffect } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Container from '../Components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getUserCart } from '../features/user/userSlice';
import { TbLoader } from 'react-icons/tb';


const Cart = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserCart())
    },[dispatch]);

    const {cart,isLoading} = useSelector((state)=>state.auth);


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

  return (
    <>
    <Meta title={"Cart"} />
    <BreadCrumb title={"Your Shopping Cart"} />

    <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-12">
                    <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                        <h4 className='cart-col-1'>PRODUCT</h4>
                        <h4 className='cart-col-2'>PRICE</h4>
                        <h4 className='cart-col-3'>QUANTITY</h4>
                        <h4 className='cart-col-4'>TOTAL</h4>
                    </div>

                        {isLoading && <div className="flex justify-center items-center"><TbLoader className='text-2xl' /></div>}
                    
                        {cart?.products?.map((p)=>{
                            return <div hidden={isLoading} className="cart-data mb-2 py-3 d-flex justify-content-between align-items-center">
                                <div className='cart-col-1 d-flex gap-30 align-items-center'>
                            <div className='w-25'>
                                <img className='img-fluid' src={p.product?.images?.length ? p.product?.images[0]?.url : "/assets/watch.jpg"} alt="" />
                            </div>
                            <div className='w-75'>
                                <p className="title">{p.product?.title}</p>
                                <p className="color">Color: {p.color?.toUpperCase()}</p>
                                <p className="size">Size: {p.size}</p>
                            </div>
                        </div>
                        <div className='cart-col-2'>
                            <h5 className="price">${p.product?.price}</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                            <div>
                                <input type="number"
                                min={1}
                                max={10}
                                value={p.count}
                                className='form-control' />
                            </div>
                            <button onClick={()=>addProductToCart(p)}><MdDelete className='text-black fs-4' /></button>
                        </div>
                        <div className='cart-col-4'>
                        <h5 className="total-price">${p.count * p.price}</h5>
                        </div>
                            </div>
                        })}
                    

                    <div className="col-12 cart-data py-12 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to={'/store'} className="shop-button">Continue to Shopping</Link>
                            <div className='d-flex align-items-end flex-column'>
                                <h5 className='price'>Subtotal: $ {cart?.cartTotal}</h5>
                                <p className='desc'>Taxes and Shipping calculated at Checkout</p>
                                <Link to={'/cart/information'} className='shop-button'>Proceed</Link>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
    </Container>
    </>
  )
}

export default Cart
