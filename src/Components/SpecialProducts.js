import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'
import { GoHeart } from 'react-icons/go'

const SpecialProducts = () => {
  return (
    <>
    <div className="min-w-[450px] md:min-w-[300px]">
        
        <div className='bg-white hover:shadow-xl hover:scale-105 transition delay-50 rounded p-3'>
            
                <div className='flex w-full items-center gap-3'>
                    
                    <img className='w-48 h-48 md:w-40 md:h-40' src="/assets/watch.jpg" alt="" />
                   
                    <div className='flex flex-col p-2 w-full'>
                        <h6 className="text-sm text-red-500">Timex</h6>
                        <p className="text-base">Digital Timex Watch<br /> Pack Multi For.. </p>
                        <ReactStars
                            count={5}
                            value={3}
                            edit={false}
                            size={window.innerWidth > 768 ? 20 : 24}
                            color2={'#ffd700'} />
                        {/* <h5 className='text-sm mb-2'><span className='text-gray-500'>Rs. 100 /-</span> &nbsp; <strike>Rs 200</strike></h5>
                        <div className='flex items-center gap-3'>
                            <p className='limit mb-0 md:block hidden'><b>7</b>d</p>
                            <div className='flex gap-2 flex-wrap'>
                                <span className='rounded-full px-2.5 justify-center items-center flex py-0.5 text-sm text-white font-semibold bg-red-600'>1</span>:
                                <span className='rounded-full px-2 justify-center items-center flex py-1 text-sm text-white font-semibold bg-red-600'>12</span>:
                                <span className='rounded-full px-2 justify-center items-center flex py-1 text-sm text-white font-semibold bg-red-600'>14</span>

                            </div>
                        </div> */}
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
                        <Link className='w-fit bg-orange-900 hover:bg-orange-700 rounded-2xl py-1.5 text-white px-3 my-3'>
                            Add to Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
   
  )
}

export default SpecialProducts
