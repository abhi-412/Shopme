import React from 'react'
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

const Home = () => {

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

        <div class="flex md:flex-row flex-col justify-center items-center md:gap-3 gap-1">
          <img src="/images/service-02.png" className='w-5 md:w-8' alt="service" />
          <div>
            <h6 className='text-xs md:text-base'>Daily Surprise Offers</h6>
            <p class="mb-0 text-xs md:text-base">Save upto 25%</p>
          </div>
        </div>

          <div class="flex md:flex-row flex-col justify-center items-center md:gap-3 gap-1">
            <img src="/images/service-03.png" className='w-5 md:w-8' alt="service" />
            <div>
              <h6 className='text-xs md:text-base'>24x7 Support</h6>
              <p className="mb-0 text-xs md:text-base">Talk with our experts</p>
            </div>
          </div>
          <div class="flex md:flex-row flex-col justify-center items-center md:gap-3 gap-1">
            <img src="/images/service-04.png" className='w-5 md:w-8' alt="service" />
            <div>
              <h6 className='text-xs md:text-base'>Affordable Prices</h6>
              <p class="mb-0 text-xs md:text-base">Get Factory  Prices</p>
            </div>
          </div>
          <div class="flex md:flex-row flex-col justify-center items-center md:gap-3 gap-1">
            <img src="/images/service-05.png" className='w-5 md:w-8' alt="service" />
            <div>
              <h6 className='text-xs md:text-base'>Secure Payments</h6>
              <p class="mb-0 text-xs md:text-base">100% Secure Payment</p>
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
    
    <Container class1 = " py-5 ">
       <div className="row">
            <div className='w-full'>
              <h3 className='section-heading'>Featured Collections</h3>
            </div>
            
             <div className='flex flex-nowrap  overflow-scroll hide-scrollbar gap-3'>
             <FeaturedCard />
              <FeaturedCard />
              <FeaturedCard />

              <FeaturedCard />
              <FeaturedCard />
              

             </div>

          </div>
    </Container>

    <div className='w-full hidden md:block'>
    <SwitchableCard />
    </div>

    {/* <Container class1=" py-5  md:hidden block ">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          <div className="col-span-1 bg-black hover:shadow-xl hover:scale-105 transition delay-50 relative">
            <img className='object-contain' src="/assets/famous-watch.jpg" alt="famous" />
            <div className=" text-light absolute md:top-10 top-4 gap-1 flex flex-col left-3">
              <h5 className='md:text-base text-xs'>Rolex Watch</h5>
              <h6 className='md:text-2xl text-base'>Luxary Watch Series 4</h6>
              <p className='md:text-sm text-xs'>From $11k or $1.2k/mo. for 12 mo. *</p>
            </div>
          </div>


          <div className="col-span-1 hover:shadow-xl bg-white hover:scale-105 transition delay-50  relative">
            <img className='object-contain' src="/assets/laptop-1.jpg" alt="famous" />
            <div className="absolute md:top-10 top-4 gap-1 flex flex-col left-3 text-black ">
              <h5 className='md:text-base text-xs'>Mackbook</h5>
              <h6 className='md:text-2xl text-base'>Mackbook Pro Series</h6>
              <p className='md:text-sm text-xs'>From $11k or $1.2k/mo. for 12 mo. *</p>
            </div>
          </div>

          <div className="col-span-1 hover:shadow-xl hover:scale-105 transition bg-white delay-50 relative">
            <img className='object-contain' src="/assets/headphones-3.png" alt="famous" /> 
          <div className="absolute md:top-10 top-4 gap-1 flex flex-col left-3 text-black">
              <h5 className='md:text-base text-xs'>Headset</h5>
              <h6 className='md:text-2xl text-base'>Sony Expira Series 2</h6>
              <p className='md:text-sm text-xs'>From $60 with flat 10% cashback</p>
            </div>
          </div>


          <div className="col-span-1 hover:shadow-xl hover:scale-105 transition delay-50 bg-white relative">
            <img className='object-contain' src="/assets/mobile.jpg" alt="famous" /> 
          <div className="absolute md:top-10 top-4 gap-1 flex flex-col left-3 text-dark ">
              <h5 className='md:text-base text-xs'>Samsung</h5>
              <h6 className='md:text-2xl text-base'>Samsung Pro Series 9</h6>
              <p className='md:text-sm text-xs'>From $300 or $30/mo. for 12 mo. *</p>
            </div>
          </div>


        </div>


    </Container> */}


    <Container class1="py-5  md:hidden block">
      <div className="row">
          <div className="w-full">
            <h3 className='section-heading'> Special Products</h3>
          </div>
          <div className='flex flex-nowrap  overflow-scroll hide-scrollbar gap-3'>
              <SpecialProducts />
              <SpecialProducts />
              <SpecialProducts />
          </div>
        </div>


    </Container>



<Container class1 = " py-5  md:hidden block ">
       <div className="row">
            <div className='w-full'>
              <h3 className='section-heading'>Featured Collections</h3>
            </div>
            
            <div className='flex flex-nowrap  overflow-scroll hide-scrollbar gap-3'>
             <FeaturedCard />
              <FeaturedCard />

              <FeaturedCard />
              <FeaturedCard />
              

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
    <div className="flex flex-no-wrap gap-3 overflow-x-scroll hide-scrollbar">
            
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

    </Container>
   
   </>
  )
}

export default Home
