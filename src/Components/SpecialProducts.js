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
        <h6 className="text-sm text-start font-semibold mb-2 text-red-500">{product?.brand}</h6>

                <div className='flex w-full items-center gap-3'>
                    
                    
                        <div className='mb-3 featured-image'>
                        <img className='img-fluid object-cover w-100'  src={product?.images[0]?.url || "/assets/watch.jpg"} alt="Featured product" />
                        {product?.images?.length > 1 && 
                            <img className='img-fluid'  src={product?.images[1]?.url || "/assets/watch.jpg"} alt="Featured product" />
                        }
                        </div>
                   
                    <div className='flex flex-col p-2 w-full'>

                        <p className="text-base mb-2">{product?.title}</p>
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
                        <div className="flex flex-col gap-2 mt-2">
                                <p className='text-sm text-gray-600'>Only {product?.quantity} remaining</p>
                                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-3 dark:bg-gray-700">
                                    <div class="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{width:`${100-progress}%`}}></div>
                                </div>
                        </div>

                        <p className='text-sm'>{parser.parseFromString(product?.description,"text/html").body.textContent.slice(0,100)}</p>

                        
                    </div>
                </div>
            </div>
        </Link>
    </>
   
  )
}

export default SpecialProducts
