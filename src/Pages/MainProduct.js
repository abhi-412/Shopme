import React, { useEffect, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import FeaturedCard from '../Components/FeaturedCard'
import ReactStars from 'react-stars'
import ReactImageZoom from 'react-image-zoom'
import { GoGitCompare, GoHeart, GoHeartFill } from "react-icons/go";
import Container from '../Components/Container'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addReview, addToWishList, getProduct, getProducts } from '../features/products/productSlice'
import { addToCart, getUserCart, getUserWishlist } from '../features/user/userSlice'
import { FaHeart } from 'react-icons/fa'
import { IoBagAddSharp,IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout,MdOutlineContentCopy } from "react-icons/md";
import CustomModel from '../Components/CustomModal'
import { LuCopyCheck } from "react-icons/lu";

const Categories = ["Watch","Tv","Camera","Laptop"];
const size = ["S","M","L","XL","XXL"]; 

const tags = ["Laptops","Mobiles","Watches","Earphones"];



const MainProduct = () => {

    const {wishlist,cart} = useSelector(state=>state.auth);
    const curProduct = useSelector((state)=>state.product?.product);


    const [ordered, setOrdered] = useState(true);
    const [rating,setRating] = useState(0);
    const [imgActive, setImgActive] = useState(0);
    const [color,setColor] = useState("");
    const [pSize,setPsize] = useState('M');
    const [count,setCount] = useState(1);
    const [inCart,setInCart] = useState(false);
    const [comment,setComment] = useState("");
    const [copied,setCopied] = useState(false);

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=>{
        const filters = {
            page: 1,
            limit: 10,
            sortBy: { sort: 'createdAt', order: 'desc' },
            price: { lte: 82000,gte:0 },
            color:"",
            categories: [],
            outOfStock:false,
            tags:[]
        }
        dispatch(getProducts(filters));
        dispatch(getUserWishlist());
        dispatch(getUserCart());
        if(id){
            dispatch(getProduct(id))
        }
        if(curProduct?._id){
            setColor(curProduct?.color[0]?.color);
        }
    },[])


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
   
    const user = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;
        
   

    useEffect(()=>{
        const cartIds = cart?.products?.map((item)=>{
            if(item?.product?._id === curProduct?._id){
                return item?.product?._id;
            }else{
                return null;
            }
        })
        if(cartIds?.includes(curProduct?._id)){
            setInCart(true);
        }else{
            setInCart(false)
        }
    },[cart?.products, curProduct?._id,dispatch])
    const products = useSelector((state)=>state.product?.products)

    const parser = new DOMParser();
    // const featuredProducts = products?.filter((item)=>item?.tags.includes('Featured'));

const addProductToCart = ()=>{

    const cart = {
   
        cart: [
            {
                _id: curProduct?._id,
                count: count,
                color: color,
                size:pSize
            },
        ]
    }
    dispatch(addToCart(cart));
    setTimeout(()=>{
        dispatch(getUserCart());
        toggleModal();
    },2000)
}

        
    const [isOpen, setIsOpen] = useState(false);
        
        const toggleModal = () => {
            setIsOpen(!isOpen);
        };

    const copyToClipboard = (text) => {
        // console.log('text', text)
        let textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        setCopied(true)
      }

      const imagesUrls = curProduct?.images?.length > 0 ? curProduct?.images?.map((img)=>img.url) : [];
        const activeImage = imagesUrls[imgActive] ? imagesUrls[imgActive] : '/assets/sample-img.jpg';
      let width = 500,zoom = 100,height=350;
      if(window.innerWidth<768){
        width = 200;
        height = 200;
        zoom = 100;
      }
    const props={zoomWidth:zoom, scale:1.5,height:height, width:"100%", img:activeImage,opacity: 0.7,"background-color": "green"}



      const submitReview = ()=>{
        const review = {
            star:rating,
            comment:comment,
            productId:curProduct?._id
        }
        dispatch(addReview(review));
        setTimeout(()=>{
            setComment("");
            setRating(0);
            dispatch(getProduct(curProduct?._id));
        },1000)
      }

      const [isFullscreen, setIsFullscreen] = useState(false);

        const handleImageClick = () => {
            setIsFullscreen(!isFullscreen);
        };

  return (
    

    <>
    <Meta title={curProduct?.title?.slice(0,25)} />
    <BreadCrumb title={curProduct?.title?.slice(0,25)} />
    <div className="w-full py-5">
    {isFullscreen ? (
      <div className="w-full min-h-screen flex flex-col gap-3 items-start p-5 justify-center bg-white">
        <button className='flex items-center gap-2' onClick={handleImageClick}><IoArrowBackOutline className='text-gray-600' /> Go back</button>
        <div className='w-full h-full flex flex-col gap-4'>
        <div className='p-3 border w-fit flex justify-center items-center'>
        <img 
          src={activeImage} 
          alt="" 
          className=" img-fluid cursor-pointer max-h-[500px]" 
          onClick={handleImageClick}
        />
        </div>
        <div className="flex flex-row flex-nowrap overflow-scroll hide-scrollbar gap-2">
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
      </div>
      
    ) : (
    <>
    <Container class1="main-product-wrapper absolute py-5 home-wrapper-2 relative">
        <div className="w-full  grid md:grid-cols-2 gap-3 grid-cols-1">
                <div className="col-span-1 bg-gray-50 rounded  md:p-5 p-2 flex md:flex-col gap-2">
                    <div className="w-full  p-2">
                        <div onClick={handleImageClick} className="border-1 hidden cursor-pointer py-3  w-full sm:flex md:flex justify-center items-center border-gray-800 z-10">
                            <ReactImageZoom {...props} />
                        </div>
                        <div className="border-1 w-full h-[350px] flex items-center justify-center sm:hidden  border-gray-800 z-10">
                            <img className='cursor-pointer' src={activeImage} onClick={handleImageClick} alt="" />
                        </div>
                    </div>
                        <div className="flex md:flex-row flex-col flex-nowrap overflow-scroll hide-scrollbar gap-2">
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
                    <div className=" rounded-lg bg-white md:p-5 p-3">
                        <div className='border-bottom'>
                        <h3 className='text-xl font-semibold'>{curProduct?.title}</h3>
                        </div>

                        <div className="border-bottom py-3">
                            <p className='text-base font-semibold'>₹ {curProduct?.price} <span className='text-gray-400 ml-4 line-through text-sm'>₹ {curProduct?.price + 200 }</span></p>
                            <div className="d-flex align-items-center gap-10">
                            <ReactStars
                                count={5}
                                value={parseInt(curProduct?.totalRating)}
                                edit={false}
                                size={24}
                                color2={'#ffd700'} 
                                
                            />
                            <p className='mb-0'>({curProduct?.ratings?.length} reviews)</p>
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
                                    return <button onClick={()=>setPsize(s)} key={i} className={`text-xs font-semibold p-1.5 rounded-md  ${pSize === s ? "bg-blue-600 text-white border-1 border-black" : "bg-white"}   border-1 border-gray-500`}>{s}</button>
                                    })}
                                </div>
                            </div>

                            <div className='flex items-center flex-wrap gap-2 '>
                                <h6 className='mb-0'>Colors:</h6>
                                <ul className='flex gap-2 '>
                                {curProduct?.color?.map((c,i)=>(
                                    <button onClick={()=>setColor(c.color)} className={`text-center rounded-full ${color === c.color && color!=="Black" ? "border-2 border-black scale-110" : " border-white"} border focus:border-2 border-gray-900`} key={i} style={{backgroundColor:`${c.color === "Voilet" ? "violet" : c.color}`, width:"20px", height:"20px", borderRadius:"50%"}}></button>
                                ))}
                                </ul>
                            </div>

                            <div className='flex md:flex-row flex-col mt-2 mb-3 gap-3 items-start md:items-center'>
                                <div className='flex  gap-2  items-center'> 
                                <h6>Quantity:</h6>
                                    <div className='flex flex-col gap-1'>
                                    <input 
                                    type="number"
                                    onChange={(e)=>{setCount(e.target.value)}}
                                    value={count}
                                    min={0}
                                    max={200}
                                    id='' 
                                    className='w-24 p-2 border border-gray-200 focus:decoration-none'
                                    />
                                    {count > 200 && <p className='text-sm text-red-500 mt-1'>Please select a value between 1 and 200 </p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex md:gap-5 gap-3 items-center flex-wrap">
                               {!inCart && <button disabled={inCart} onClick={!user? navigate('/login') : toggleModal} className='button login text-nowrap flex items-center gap-2'><IoBagAddSharp />Add To Cart</button>}
                                {inCart && <Link to="/cart"  className='bg-purple-500 rounded-full px-4 text-white py-1.5 text-nowrap flex items-center gap-2'>CheckOut<MdOutlineShoppingCartCheckout className='font-bold' /></Link>}
    
                                {isOpen && <CustomModel isOpen={isOpen} setIsOpen={setIsOpen} toggleModal={toggleModal} onOk={addProductToCart} product={curProduct} count={count} color={color} total={count*curProduct?.price} size={pSize} />  }
                                
                                <button className='signup-button text-nowrap'>Buy Now</button>
                            </div>
                            
                            <div className='flex items-center gap-3 flex-wrap'>
                                <button className='flex gap-1 items-center text-nowrap' ><GoGitCompare className='text-lg' />  Add to Compare</button>
                                <button className='flex gap-1 items-center text-nowrap' onClick={!user? navigate('/login') : ()=>{addToWishlist(curProduct?._id)}}>{wishIds?.includes(curProduct?._id) ? <FaHeart className='text-lg text-red-500'/> : <GoHeart className='text-lg'/>} Add to Wishlist</button>
                            </div>
                            
                           
                            

                            <div className='d-flex align-items-center mt-2 mb-3 flex-wrap gap-30'>
                                <h6 className='mb-0'>Copy Product Link: </h6>
                                {!copied &&
                                <button
                                onClick={()=>{copyToClipboard(
                                    `http://localhost:3001${location.pathname}`
                                )}}
                                className='flex gap-1 items-center'
                                >
                                    <MdOutlineContentCopy /> Click Here to Copy
                                
                                </button>
                                }
                                {copied && <p className='text-green-500 flex items-center gap-2'><LuCopyCheck className='text-lg'/> Copied</p>}
                            </div>    
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-gray-50 rounded p-4 my-3'>
                    <div className='flex flex-col mt-2 mb-3  flex-wrap gap-2 md:mx-4 mx-1'>
                    <h2 className='text-lg font-semibold'>Product Details</h2>
                        <p className='md:text-sm text-xs'>
                            <div className='dang-description'
                                dangerouslySetInnerHTML={{ __html: curProduct?.description }}
                            />
                        </p>
                    </div>


                    <div className='flex flex-col mt-2 mb-3 flex-wrap gap-2 md:mx-4 mx-1'>
                                        <h2 className='text-lg font-semibold'>Shipping & Returns</h2>
                                        <ol className='md:text-sm text-xs flex flex-col gap-1'>
                                            <li>
                                            
                                            We offer Standard (5-7 business days, $5.99 or free over $50), Expedited (2-3 business days, $14.99), 
                                            and Overnight Shipping (next day, $29.99). Orders are processed within 1-2 business days with tracking details provided. 
                                            </li>
                                            <li>
                                            International shipping times and costs vary. You can return items within 30 days for a full refund if they are in original condition. 
                                            </li>
                                            <li>
                                            Contact customer service to start a return, pack items with the return form, and use the provided prepaid label or your own shipping method. 
                                            </li>
                                        <li>
                                        Refunds are processed within 7-10 business days of receipt. Exchanges require a new order. Non-returnable items include gift cards, 
                                        final sale, and personalized items.
                                            </li> 
                                            <li>
                                            For questions, contact our customer service team.
                                            </li>
                                        </ol>
                                    
                    </div>    
            </div>
 

    </Container>

    
    <Container class1="w-full bg-white mt-5 md:p-5 p-2">
            <div className="row w-full">
                <div id='' className="col-12">
                    
                    

                        
                    {ordered &&
                        <div  className="py-4 flex flex-col gap-2">
                        <h4 className='text-xl'>Write a Review</h4>
                        
                           
                            <ReactStars
                                count={5}
                                value={rating}
                                edit={true}
                                size={24}
                                color2={'#ffd700'} 
                                onChange={(e)=>{setRating(e)}}
                            />
                          
                            
                                <textarea
                                cols="30"
                                rows="4" 
                                name='comment'
                                value={comment}
                                className="form-control w-100" 
                                placeholder='Comments'
                                onChange={(e)=>{setComment(e.target.value)}}
                                />
                            
                            <div className='d-flex justify-content-end'>
                                <button onClick={submitReview} type='submit' className='px-4 py-1.5 bg-orange-800 text-white rounded-full'>
                                    Submit Review
                                </button>
                            </div>
                       
                    </div>
                    }

                        <div className=" d-flex justify-content-between align-items-end">
                        <div >
                            <h4 className='mb-2 md:text-3xl text-2xl font-semibold'>Customer Reviews</h4>
                           <div className='d-flex gap-10 align-items-center'>
                           <ReactStars
                                count={5}
                                value={3}
                                edit={false}
                                size={24}
                                color2={'#ffd700'} 
                            />
                            <p className='mb-0'>{curProduct?.ratings?.length} reviews</p>
                           </div>
                        </div>

                        {ordered && 
                        <div>
                            <button className='text-dark text-decoration-underline'>Write a Review</button>
                        </div>
                        }
                    </div>
                        <div className="reviews mt-2">
                            {curProduct?.ratings?.map((item,index)=>(
                                <div className="review">
                                <div className='d-flex gap-10 align-items-center'>
                                    <h6 className='mb-0'>Abhi</h6>
                                    <ReactStars
                                        count={5}
                                        value={item.star}
                                        edit={false}
                                        size={24}
                                        color2={'#ffd700'} 
                                    />
                                </div>
                                <p className='mb-3'>
                                    {item.comment}
                                  </p>
                            </div>
                            ))}
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
             {products?.map((item,index)=>(
               item?._id !== curProduct?._id && item?.category === curProduct?.category && (
                <FeaturedCard key={index} product={item} />
               )
             ))}
             </div>

          </div>
    </Container>
    
    </>
    )}
    </div>
    </> 
    
  )
}

export default MainProduct
