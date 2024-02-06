import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Container from '../Components/Container'


const Cart = () => {
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


                    <div className="cart-data mb-2 py-3 d-flex justify-content-between align-items-center">
                        <div className='cart-col-1 d-flex gap-30 align-items-center'>
                            <div className='w-25'>
                                <img className='img-fluid' src="/images/watch.jpg" alt="" />
                            </div>
                            <div className='w-75'>
                                <p className="title">svchjzdfk vudvbhduov bfffffff iurgfekgoeg</p>
                                <p className="color">Color: black</p>
                                <p className="size">Size: XXL</p>
                            </div>
                        </div>
                        <div className='cart-col-2'>
                            <h5 className="price">$100.00</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                            <div>
                                <input type="number"
                                min={1}
                                max={10}
                                className='form-control' />
                            </div>
                            <div><MdDelete className='text-black fs-4' /></div>
                        </div>
                        <div className='cart-col-4'>
                        <h5 className="total-price">$100.00</h5>
                        </div>
                    </div>
                    

                    <div className="col-12 cart-data py-12 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to={'/store'} className="shop-button">Continue to Shopping</Link>
                            <div className='d-flex align-items-end flex-column'>
                                <h5 className='price'>Subtotal: $ 100</h5>
                                <p className='desc'>Taxes and Shipping calculated at Checkout</p>
                                <Link to={'/checkout'} className='shop-button'>CheckOut</Link>
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
