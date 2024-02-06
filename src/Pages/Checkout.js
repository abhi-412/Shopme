import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineArrowBackIos } from "react-icons/md";
import Container from '../Components/Container'


const Checkout = () => {
  return (
   <>
   <Container class1= "checkout-wrapper py-5 home-wrapper-2">
   <div className="row">
                <div className="col-7">
                    <div className="checkout-left-data">
                        <h3 className="website name">ShopMe</h3>
                        <nav 
                        style={{"--bs-breadcrumb-divider": '>'}}
    
                        aria-label="breadcrumb"
                        >
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <Link className='text-dark total-price' to={'/cart'}>Cart</Link>
                            </li>
                            &nbsp; /
                            <li class="breadcrumb-item total-price active">Information</li>
                            &nbsp; /
                            <li class="breadcrumb-item total-price active" aria-current="page">Shipping</li>
                            &nbsp; /
                            <li class="breadcrumb-item total-price active" aria-current="page">Payment</li>
                        </ol>
                        </nav>
                        <h4 className="title total">Contact Information</h4>
                        <p className="user-details total">Abhi Yadav (abhi1234@gmail.com)</p>
                        <h4 className='mb-3'>Shipping Address</h4>
                        <form action="" className='d-flex gap-15 flex-wrap justify-content-between'>
                            <div className='w-100'>
                                <select 
                                name="" 
                                className='form-select' 
                                id=""
                                >
                                    <option className='form-control' value="" disabled selected>Select Country</option>
                                </select>
                            </div>
                            <div className='flex-grow-1'>
                                <input placeholder='First Name' type="text" className="form-control" />
                            </div>
                            <div className='flex-grow-1'>
                                <input placeholder='Last Name' type="text" className="form-control" />
                            </div>
                            <div className='w-100'>
                                <input type="text" placeholder='Address' className="form-control" />
                            </div>
                            <div className='w-100'>
                                <input type="text" placeholder='House No.' className="form-control" />
                            </div>
                            <div className='flex-grow-1'>
                                <input type="text" placeholder='City' className="form-control" />
                            </div>
                            <div className='flex-grow-1'>
                                <select name="" className='form-select' id="">
                                    <option value="" selected disabled>Select State</option>
                                </select>
                            </div>
                            <div className='flex-grow-1'>
                                <input placeholder='Zip Code' type="text" className="form-control" />
                            </div>

                            <div className="w-100 py-3">
                                <div className="d-flex justify-content-between align-align-items-center">
                                    <Link to={'/cart'} className='text-dark'><MdOutlineArrowBackIos  /> Return to Cart</Link>
                                    <Link to={'/cart'} className='shop-button'>Continue to Shipping</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-5">
                    <div className='border-bottom py-4'>
                       <div className="d-flex gap-10 align-items-center">
                        <div className='w-75 d-flex gap-10'>
                                <div className='w-25 position-relative'>
                                    <span style={{"top":"-10px", "right":"1px"}} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">1</span>
                                    <img src="/images/watch.jpg" className='img-fluid' alt="" />
                                </div>
                                <div>
                                    <h5 className="total-price">
                                        zsxdcfgvh dtfgybh trf g
                                    </h5>
                                    <p className='total-price'>sxdcfgvmk gvhbjn </p>
                                </div>
                        </div>
                        <div className='flex-grow-1'>
                            <h5 className='total-price'>$100.00</h5>
                        </div>
                       </div>
                    </div>

                    <div className='border-bottom py-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 total'>Sub Total</p>
                            <p className='mb-0 total-price'>$100.00</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 total'>Shipping</p>
                            <p className='mb-0 total-price'>$100.00</p>
                        </div>
                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <h4 className='total'>Total</h4>
                        <h5 className='total-price'>$100.00</h5>

                    </div>

                </div>
            </div>

   </Container>
   </>
  )
}

export default Checkout
