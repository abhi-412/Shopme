import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import Card from '../Components/Card'
import FeaturedCard from '../Components/FeaturedCard'
import SpecialProducts from '../Components/SpecialProducts'
import Meta from '../Components/Meta'
import Container from '../Components/Container'
import {services} from '../utils/data'
import SwitchableCard from '../Components/SwitchableCard'
import Carousel from '../Components/Carasoul'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../features/blog/blogSlice'
import { getProducts } from '../features/products/productSlice'

const Home = () => {


  const dispatch = useDispatch();


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
    dispatch(getBlogs());
    dispatch(getProducts(filters));
  },[dispatch])

  const blogs = useSelector((state)=>state.blog?.blogs)
  const products = useSelector((state)=>state.product?.products)
  

  const featuredProducts = products?.filter((item)=>item?.tags.includes('Featured')).slice(0,5);
  const specialProducts = products?.filter((item)=>item?.tags.includes('Special')).slice(0,3);
  const popularProducts = products?.filter((item)=>item?.tags.includes('Popular')).slice(0,5);

  const services = [
    {title:"Cameras",quant:"4,986 Items",src:"/images/camera.jpg"},
    {title:"Headset",quant:"8,915 Items",src:"/images/headphone.jpg"},
    {title:"Smart Tvs",quant:"2,564 Items",src:"/images/tv.jpg"},
    {title:"Speakers",quant:"4,986 Items",src:"/images/camera.jpg"},
    {title:"Laptops",quant:"1,825 Items",src:"/images/laptop.jpg"},
    {title:"Home App",quant:"3,955 Items",src:"/images/homeapp.jpg"},
    {title:"Accessories",quant:"4,585 Items",src:"/images/acc.jpg"},
    {title:"Smart Watch",quant:"1,845 Items",src:"/images/watch.jpg"},
   
  ]

  const dummyArr = [1,2,3,4,5,6,7,8];

  return (
   <>

{/* <Container> */}
  <Carousel/>
{/* </Container> */}


    <Container class="py-5">
      <div class="flex items-center">
        <div class="flex items-center flex-nowrap gap-2 w-full justify-between">

        <div class="flex md:flex-row flex-col justify-center items-center md:gap-3 gap-2">
          <img src="/images/service-02.png" className='w-5 md:w-8' alt="service" />
          <div>
            <h6 className='text-xs md:text-base'>Daily Surprise Offers</h6>
            {/* <p class="mb-0 text-xs md:text-base">Save upto 25%</p> */}
          </div>
        </div>

          <div class="flex md:flex-row flex-col justify-center items-center md:gap-3 gap-2">
            <img src="/images/service-03.png" className='w-5 md:w-8' alt="service" />
            <div>
              <h6 className='text-xs md:text-base'>24x7 Support</h6>
              {/* <p className="mb-0 text-xs md:text-base">Talk with our experts</p> */}
            </div>
          </div>
          <div class="flex md:flex-row flex-col justify-center items-center md:gap-3 gap-2">
            <img src="/images/service-04.png" className='w-5 md:w-8' alt="service" />
            <div>
              <h6 className='text-xs md:text-base'>Affordable Prices</h6>
              {/* <p class="mb-0 text-xs md:text-base">Get Factory  Prices</p> */}
            </div>
          </div>
          <div class="flex md:flex-row flex-col justify-center items-center md:gap-3 gap-2">
            <img src="/images/service-05.png" className='w-5 md:w-8' alt="service" />
            <div>
              <h6 className='text-xs md:text-base'>Secure Payments</h6>
              {/* <p class="mb-0 text-xs md:text-base">100% Secure Payment</p> */}
            </div>
          </div>
        </div>
      </div>
    </Container>

    <Container class1 = "py-5">
    <div className="row">
          <div className="w-full">
            <div className="bg-white w-full px-3 grid md:grid-cols-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 shadow">
                  {
                    services.map((items,index)=>(
                      <div className={`col-span-1  border-b cursor-pointer px-3 md:px-10 py-2 ${index===3 || index===7 ? "" : "border-r"} border-gray-200 flex items-center`}>
                          <div className=''>
                            <h6 className='text-sm'>{items.title}</h6>
                            <p className='text-xs'>{items.quant}</p>
                          </div>
                            <img  src={items.src} className='md:w-24 md:h-24 w-16 h-16' alt="" />
                          
                      </div>
                    ))
                  }
               
            </div>
          </div>
        </div>
    </Container>
    
    <Container class1 = " py-5 md:hidden block">
       <div className="row">
            <div className='w-full'>
              <h3 className='section-heading'>Featured Products</h3>
            </div>
            
             <div className='flex flex-nowrap  overflow-scroll hide-scrollbar gap-3'>
             {featuredProducts?.map((item,index)=>(
               <FeaturedCard key={index} product={item} />
             ))}
              

             </div>

          </div>
    </Container>

    <div className='w-full hidden md:block'>
    <SwitchableCard featuredProducts={featuredProducts} specialProducts={specialProducts} popularProducts={popularProducts}/>
    </div>


    <Container class1="py-5  md:hidden block">
      <div className="row">
          <div className="w-full">
            <h3 className='section-heading'> Special Products</h3>
          </div>
          <div className='flex flex-nowrap  overflow-scroll hide-scrollbar gap-3'>
             {specialProducts?.map((item,index)=>(
               <SpecialProducts key={index} product={item} />
             ))}
          </div>
        </div>


    </Container>



<Container class1 = "py-5  md:hidden block ">
       <div className="row">
            <div className='w-full'>
              <h3 className='section-heading'>Popular This Week</h3>
            </div>
            
            <div className='flex flex-nowrap  overflow-scroll hide-scrollbar gap-3'>
            {popularProducts?.map((item,index)=>(
              <FeaturedCard key={index} product={item} />
            ))}
             </div>

          </div>
    </Container>

    <Container class1=" p-2">

      <div className="">
            <div className="w-full">
                <div className="marquee-inner-wrapper card-wrapper py-2">
                    <Marquee pauseOnClick ={true}  className='flex'>
                      {dummyArr.map((i)=>(
                        
                        <div className='mx-4 w-50'>
                        <img src={`/images/brand-0${i}.png`} className='' alt="brand" />
                      </div>
                      ))}
                      
                    </Marquee>
                </div>
            </div>
          </div>

    </Container>


    <Container class1="blog-wrapper py-5 home-wrapper-2">
    <div className='my-3'>
              <h4 className='text-2xl font-semibold'>Read Our Blogs Here</h4>
            </div>
    <div className="flex flex-nowrap gap-3 overflow-x-scroll hide-scrollbar">
            
            {blogs?.map((blog)=>(
                <Card key={blog?._id} blog={blog} />
            ))}
          </div>

    </Container>
   
   </>
  )
}

export default Home
