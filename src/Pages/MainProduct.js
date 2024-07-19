import React, { useEffect, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import FeaturedCard from '../Components/FeaturedCard'
import ReactStars from 'react-stars'
import ReactImageZoom from 'react-image-zoom'
import Color from '../Components/Color'
import { IoIosHeartEmpty } from "react-icons/io";
import { GoGitCompare, GoHeart, GoHeartFill } from "react-icons/go";
import Container from '../Components/Container'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList, getProduct, getProducts } from '../features/products/productSlice'
import Breadcrumb2 from '../Components/BreadCrumb2'
import { getUserWishlist } from '../features/user/userSlice'
import { FaHeart } from 'react-icons/fa'

const Categories = ["Watch","Tv","Camera","Laptop"];
const size = ["S","M","L","XL","XXL"]; 

const tags = ["Laptops","Mobiles","Watches","Earphones"];



const MainProduct = () => {
    const [ordered, setOrdered] = useState(true);
    const [rating,setRating] = useState(0);
    const [imgActive, setImgActive] = useState(0)

    const location = useLocation();
    const path = location.pathname;
    const id = location.state.id;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
        dispatch(getUserWishlist());

        if(id){
            dispatch(getProduct(id))
        }
    },[])

    const wishlist = useSelector(state=>state.auth?.wishlist);

   

    const addToWishlist = (id)=>{
        dispatch(addToWishList(id));
        setTimeout(() =>{
            dispatch(getUserWishlist());
        },600)
    }
    const wishIds = wishlist?.map((item)=>{
        if(item?._id === curProduct?._id){
            return item?._id;
        }
    })

   

    const curProduct = useSelector((state)=>state.product?.product);
    const products = useSelector((state)=>state.product?.products)

    const featuredProducts = products?.filter((item)=>item?.tags.includes('Featured'));

    const copyToClipboard = (text) => {
        // console.log('text', text)
        let textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        alert("Link was Copied")
      }

      const imagesUrls = curProduct?.images?.length > 0 ? curProduct?.images?.map((img)=>img.url) : [];
        const activeImage = imagesUrls[imgActive] ? imagesUrls[imgActive] : '/assets/sample-img.jpg';
      let width = 400, height = 400;
      if(window.innerWidth<768){
        width = 200;
        height = 200;
      }
    const props={zoomWidth:600,width:width, height:height,img:activeImage}
  return (
    <>
    <Meta title={curProduct?.title} />
    <BreadCrumb title={curProduct?.title} />

    <Container class1="main-product-wrapper bg-white absolute py-5 home-wrapper-2 relative">
        <div className="w-full  grid md:grid-cols-2 grid-cols-1">
                <div className="col-span-1  h-fit md:p-5 p-2 flex md:flex-col gap-2">
                    <div className="w-full flex items-center justify-center  border border-gray-600 p-2">
                        <div className="">
                            <ReactImageZoom {...props} />
                        </div>
                    </div>
                        <div className="flex md:flex-row  flex-col flex-nowrap overflow-scroll hide-scrollbar gap-2">
                            {imagesUrls.map((url,i)=>(
                                <div key={i} className={`cursor-pointer ${imgActive === i ? 'border-2 border-blue-500 ' : 'border border-gray-300 '} p-1 md:p-2`}>
                                 <img  
                                    onMouseOver={()=>setImgActive(i)} 
                                    src={url} 
                                    alt={`Product ${i+1}`}
                                 
                                    className='md:w-20 md:h-20 w-14 h-14 object-contain'/>
                                </div>
                            ))}
                        </div>
                </div>
                <div className="col-span-1">
                    <div className=" rounded-lg md:p-5 p-3">
                        <div className='border-bottom'>
                        <h3 className='text-xl font-semibold'>{curProduct?.title}</h3>
                        </div>

                        <div className="border-bottom py-3">
                            <p className='text-base font-semibold'>₹ {curProduct?.price} <span className='text-gray-400 ml-4 line-through text-sm'>₹ {curProduct?.price + 200 }</span></p>
                            <div className="d-flex align-items-center gap-10">
                            <ReactStars
                                count={5}
                                value={(curProduct?.totalRating)}
                                edit={false}
                                size={24}
                                color2={'#ffd700'} 
                                
                            />
                            <p className='mb-0'>({curProduct?.totalRating} reviews)</p>
                        </div>
                        <a href="#review" className='write-review'>Write a Review</a>
                        </div>
                       

                        <div className="d-flex flex-column py-3 gap-3">
                            <div className='flex items-center flex-wrap gap-2'>
                                <h6 className='mb-0'>Type :</h6>
                                <p className='mb-0'>{curProduct?.category}</p>
                            </div>

                            <div className='flex items-center flex-wrap gap-2'>
                                <h6 className='mb-0'>Brand :</h6>
                                <p className='mb-0'>{curProduct?.brand}</p>
                            </div>

                            <div className='flex items-center flex-wrap gap-2'>
                            <h6 className='mb-0'>Categories :</h6>
                                {curProduct?.category}
                            </div>

                            <div className='flex items-center flex-wrap gap-3'>
                            <h6 className='mb-0'>Tags :</h6>
                                {curProduct?.tags?.map((tag,i)=>{
                                    return <p key={i} className='mb-0'>{tag}</p>
                                })}
                            </div>

                            <div className='flex items-center flex-wrap gap-2'>
                                <h6 className='mb-0'>SKU :</h6>
                                <p className='mb-0'>AFSYKM</p>
                            </div>

                            <div className='flex items-center flex-wrap gap-2'>
                                <h6 className='mb-0'>Availibility :</h6>
                                <p className='mb-0'>{curProduct?.outOfStock ? "Out of Stock" : `In Stock[${curProduct?.quantity - curProduct?.sold}]`}</p>
                            </div>

                            <div className='flex items-center flex-wrap gap-2'>
                                <h6>Size :</h6>
                                <div className='d-flex flex-wrap gap-15'>
                                    {size.map((s,i)=>{
                                    return <span key={i} className='badge border border-1 border-secondary bg-white text-dark'>{s}</span>
                                    })}
                                </div>
                            </div>

                            <div className='flex items-center flex-wrap gap-2 '>
                                <h6 className='mb-0'>Colors:</h6>
                                <ul className='flex gap-2 '>
                                {curProduct?.color?.map((c,i)=>(
                                    
                                    <li className='text-center rounded-full border border-gray-900' key={i} style={{backgroundColor:`${c.color === "Voilet" ? "violet" : c.color}`, width:"20px", height:"20px", borderRadius:"50%"}}></li>
                                ))}
                                </ul>
                            </div>

                            <div className='flex md:flex-row flex-col mt-2 mb-3 gap-3 items-start md:items-center'>
                                <div className='flex gap-2  items-center'> 
                                <h6>Quantity:</h6>
                                    <input type="number"
                                    style={{width:"60px"}} 
                                    min={0}
                                    max={10}
                                    id='' 
                                    className='form-control'
                                    />
                                </div>
                            </div>
                            <div className="flex md:gap-5 gap-3 items-center flex-wrap">
                                    <button className='button login text-nowrap'>Add to Cart</button>
                                    <button className='signup-button text-nowrap'>Buy Now</button>
                                </div>
                            
                            <div className='flex items-center gap-3 flex-wrap'>
                                <button className='flex gap-1 items-center text-nowrap' ><GoGitCompare className='text-lg' />  Add to Compare</button>
                                <button className='flex gap-1 items-center text-nowrap' onClick={()=>{addToWishlist(curProduct?._id)}}>{wishIds?.includes(curProduct?._id) ? <FaHeart className='text-lg text-red-500'/> : <GoHeart className='text-lg'/>} Add to Wishlist</button>
                            </div>
                            
                            <div className='d-flex flex-column mt-2 mb-3 flex-wrap gap-10'>
                                <h6 className='mb-0'>Shipping and Returns:</h6>
                                <p className='mb-0'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, velit quod saepe distinctio sunt ipsum nulla qui quidem soluta autem eius provident omnis quam ratione laudantium obcaecati cum voluptate et!</p>
                            </div>    
                            

                            <div className='d-flex align-items-center mt-2 mb-3 flex-wrap gap-30'>
                                <h6 className='mb-0'>Copy Product Link: </h6>
                                <a href="/"
                                onClick={()=>{copyToClipboard(
                                    `http://localhost:3001${location.pathname}`
                                )}}
                                >
                                    Click Here to Copy
                                
                                </a>
                                
                            </div>    
                        </div>
                    </div>
                </div>
            </div>







    </Container>
    <Container class1="description-wrapper py-5 home-wrapper-2">
    <div className="row">
                <div className="col-12">
                    <h4>Description</h4>
                    <div className="bg-white p-3">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi 
                            sunt quis laborum omnis similique ipsa commodi ducimus molestiae! 
                            Iure possimus sapiente animi optio at asperiores officia beatae tempore cumque?
                            Fuga velit totam sunt illo mollitia distinctio, expedita excepturi
                            perferendis praesentium veritatis fugit? Voluptatum, earum deleniti 
                            nulla dicta perferendis provident temporibus fuga?
                        </p>
                    </div>
                </div>
            </div>
    </Container>
    <Container class1="reviews-wrapper home-wrapper-2">
            <div className="row">
                <div id='review' className="col-12">
                    <h4>Reviews</h4>
                    <div className="review-inner-wrapper">
                    <div className="review-head d-flex justify-content-between align-items-end">
                        <div >
                            <h4 className='mb-2'>Customer Reviews</h4>
                           <div className='d-flex gap-10 align-items-center'>
                           <ReactStars
                                count={5}
                                value={3}
                                edit={false}
                                size={24}
                                color2={'#ffd700'} 
                            />
                            <p className='mb-0'>Based on 2 reviews</p>
                           </div>
                        </div>

                        {ordered && 
                        <div>
                            <a className='text-dark text-decoration-underline' href="">Write a Review</a>
                        </div>
                        }
                    </div>

                        
                        <div  className="review-form py-4">
                            <h4>Write a Review</h4>
                            <form action="" className='d-flex flex-column gap-15'>
                                <div>
                                <ReactStars
                                    count={5}
                                    value={rating}
                                    edit={true}
                                    size={24}
                                    color2={'#ffd700'} 
                                    onChange={(e)=>{setRating(e)}}
                                />
                                </div>
                                <div>
                                    <textarea
                                    cols="30"
                                    rows="4" 
                                    className="form-control w-100" 
                                    placeholder='Comments'
                                    />
                                </div>
                                <div className='d-flex justify-content-end '>
                                    <button className='button'>
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div>


                        <div className="reviews mt-4">
                            <div className="review">
                                <div className='d-flex gap-10 align-items-center'>
                                    <h6 className='mb-0'>Abhi</h6>
                                    <ReactStars
                                        count={5}
                                        value={3.5}
                                        edit={false}
                                        size={24}
                                        color2={'#ffd700'} 
                                    />
                                </div>
                                <p className='mb-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                Minus sint ipsam laudantium voluptatem eligendi aliquam doloribus
                                 dicta sunt, at sed consequuntur, porro itaque distinctio.
                                  Cupiditate tenetur consequuntur odit nesciunt temporibus?
                                  </p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
    </Container>
    <Container class1 = " py-5 block">
       <div className="row">
            <div className='w-full'>
              <h3 className='section-heading'>You May Also Like</h3>
            </div>
            
             <div className='flex flex-nowrap  overflow-scroll hide-scrollbar gap-3'>
             {featuredProducts?.map((item,index)=>(
               <FeaturedCard key={index} product={item} />
             ))}
             </div>

          </div>
    </Container>
    </>
  )
}

export default MainProduct
