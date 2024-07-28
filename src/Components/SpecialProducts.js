import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'
import { GoHeart } from 'react-icons/go'

const SpecialProducts = ({product}) => {

    const leftToSell = product?.quantity - product?.sold;
    const progress = (leftToSell/product?.quantity)*100

    const parser = new DOMParser();
  return (
    <>
    <Link className="min-w-[450px] md:min-w-[300px]">
        
        <div className='bg-white hover:shadow-xl hover:scale-105 transition delay-50 rounded p-3'> 

                <div className='w-full items-center gap-3  grid grid-cols-5'>
                    
                    
                        <div className=' col-span-2 featured-image'>
                        <img className='img-fluid h-[170px]'  src={product?.images[0]?.url || "/assets/watch.jpg"} alt="Featured product" />
                        {product?.images?.length > 1 && 
                            <img className='img-fluid h-[170px]'  src={product?.images[1]?.url || "/assets/watch.jpg"} alt="Featured product" />
                        }
                        </div>
                   
                    <div className='flex flex-col col-span-3 h-full  w-full'>
                    <h6 className="text-sm text-start font-semibold mb-2 text-red-500">{product?.brand}</h6>

                        <p className="text-base">{product?.title?.slice(0,25)}</p>
                        <ReactStars
                            count={5}
                            value={product?.totalRating}
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
                        <div className="flex flex-col gap-2 mb-1">
                                <p className='text-sm text-gray-600'>{product?.quantity} remaining</p>
                                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-1 dark:bg-gray-700">
                                    <div class="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{width:`${100-progress}%`}}></div>
                                </div>
                        </div>

                        <p className='text-sm font-semibold text-gray-600'>₹ {product.price} /-</p>

                         
                    </div>
                </div>
            </div>
        </Link>
    </>
   
  )
}

export default SpecialProducts
