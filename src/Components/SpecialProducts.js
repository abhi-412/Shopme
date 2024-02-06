import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'
import { GoHeart } from 'react-icons/go'

const SpecialProducts = () => {
  return (
    <>
    <div className="col-4">
        
        <div className='special-product'>
            <div className='product-details'>
                <div className='d-flex justify-content-between'>
                    <div className='special-product-image'>
                        <img className='img-fluid' src="/assets/watch.jpg" alt="" />
                    </div>
                        <div className='special-product-content d-flex flex-column'>
                        <h6 className="brand">Timex</h6>
                        <p className="special-product-text">Digital Timex Watch<br /> Pack Multi For.. </p>
                        <ReactStars
                            count={5}
                            value={3}
                            edit={false}
                            size={24}
                            color2={'#ffd700'} />
                        <h5 className='price'><span className='red-p'>$100</span> &nbsp; <strike>$200</strike></h5>
                        <div className='discount d-flex align-items-center gap-10'>
                            <p className='limit mb-0'><b>7 </b><span>days</span></p>
                            <div className='d-flex gap-10'>
                                <span className='badge rounded-circle p-2 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-2 bg-danger'>2</span>:
                                <span className='badge rounded-circle p-2 bg-danger'>14</span>
                            </div>
                        </div>
                        <div className="product-count mt-3">
                                <p>Products: 50</p>
                                <div className="progress">
                                <div className="progress-bar" 
                                role="progressbar" 
                                style={{"width" :"25%"}} 
                                aria-valuenow="25" 
                                aria-valuemin="0" 
                                aria-valuemax="100"></div>
                                </div>
                        </div>
                        <Link className='button my-3'>
                            Add to Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    
    
    
    
    
    
    

    </div>
    </>
   
  )
}

export default SpecialProducts
