import React from 'react'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import Card from '../Components/Card'
import FeaturedCard from '../Components/FeaturedCard'
import SpecialProducts from '../Components/SpecialProducts'
import Meta from '../Components/Meta'
import Container from '../Components/Container'
import {services} from '../utils/data'

const Home = () => {
  return (
   <>

    <Container class1={'home-wrapper-2 py-2'}>
    <div className="row">
          <div className="col-6">
          <div className='main-banner p-3 position-relative'>
            <img 
              className='img-fluid rounded' 
              src="/images/main-banner-1.jpg" 
              alt="" 
            />
            <div className='main-banner-content position-absolute'>
                  <h4>Supercharged VR Headset</h4>
                  <h5>Sony Ultra 2000</h5>
                  <p>From $3999 or $140/month</p>
                  <Link className='button'>Buy Now</Link>
            </div>

            </div>
          </div>
          <div className="col-6 d-flex flex-wrap p-3 gap-10 justify-content-between align-page-item">
          
          
          <div className='small-banner position-relative'>
            <img 
              className='img-fluid rounded' 
              src="/images/catbanner-01.jpg" 
              alt="" 
            />
            <div className='small-banner-content position-absolute'>
                  <h4>Diwali Offer</h4>
                  <h5>Vivobook pro</h5>
                  <p>From $9999 <br /> or $599/month</p>
                  {/* <Link className='button'>Buy Now</Link> */}
            </div>
          </div>
            
            
            <div className='small-banner position-relative'>
            <img 
              className='img-fluid rounded' 
              src="/images/catbanner-02.jpg" 
              alt="" 
            />
            <div className='small-banner-content position-absolute'>
                  <h4>Maha sale offer</h4>
                  <h5>Boat rist</h5>
                  <p>From $9999 <br />or $599/month</p>
                  {/* <Link className='button'>Buy Now</Link> */}
            </div>

            </div>


            <div className='small-banner position-relative'>
            <img 
              className='img-fluid rounded' 
              src="/images/catbanner-03.jpg" 
              alt="" 
            />
            <div className='small-banner-content position-absolute'>
                  <h4>Diwali Sale</h4>
                  <h5>Samsung Tablet</h5>
                  <p>From $9999 <br />upto 80% off</p>
                  {/* <Link className='button'>Buy Now</Link> */}
            </div>

            </div>


            <div className='small-banner position-relative'>
            <img 
              className='img-fluid rounded' 
              src="/images/catbanner-04.jpg" 
              alt="" 
            />
            <div className='small-banner-content position-absolute'>
                  <h4>December Dhamaka</h4>
                  <h5>Amplify headset</h5>
                  <p>From $199 <br /> upto 40% off</p>
                  {/* <Link className='button'>Buy Now</Link> */}
            </div>

            </div>


          </div>


        </div>
    </Container>

    <Container class1 = "home-wrapper-2 py-5">
    <div className="row">
            <div className="col-12">
                <div className="services d-flex align-items-center justify-content-between">
                    {services?.map((i,j)=>{
                      return(
                        <div className="d-flex align-items-center gap-15">
                      <img src={i.image} alt="service" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className="mb-0">{i.tagline}</p>
                      </div>
                    </div>
                      )
                    })}
                    
                    
                    {/* <div className="d-flex align-items-center gap-15">
                      <img src="/images/service-02.png" alt="service" />
                      <div>
                        <h6>Daily Surprise Offers</h6>
                        <p className="mb-0">Save upto 25%</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                      <img src="/images/service-03.png" alt="service" />
                      <div>
                        <h6>24x7 Support</h6>
                        <p className="mb-0">Talk with our experts</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                      <img src="/images/service-04.png" alt="service" />
                      <div>
                        <h6>Affordable Prices</h6>
                        <p className="mb-0">Get Factory Default Prices</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                      <img src="/images/service-05.png" alt="service" />
                      <div>
                        <h6>Secure Payments</h6>
                        <p className="mb-0">100% Protected Payment</p>
                      </div>
                    </div> */}
                </div>
            </div>
          </div>
    </Container>

    <Container class1 = "home-wrapper-2 py-5">
    <div className="row">
          <div className="col-12">
            <div className="categories d-flex flex-wrap justify-content-between align-items-center">
               <div className=' service-item-a d-flex align-items-center'>
                  <div>
                    <h6>Camers</h6>
                    <p>4,986 Items</p>
                    </div>
                    <img src="/images/camera.jpg" alt="" />
                  
               </div>

               <div className='service-item-a d-flex align-items-center'>
                  <div>
                    <h6>Headset</h6>
                    <p>8,915 Items</p>
                    </div>
                    <img src="/images/headphone.jpg" alt="" />
                  
               </div>

               <div className='service-item-a d-flex align-items-center'>
                  <div>
                    <h6>Smart Tvs</h6>
                    <p>2,564 Items</p>
                    </div>
                    <img src="/images/tv.jpg" alt="" />
                  
               </div>

               <div className='service-item-4  d-flex align-items-center'>
                  <div>
                    <h6>Speakers</h6>
                    <p>1,845 Items</p>
                    </div>
                    <img src="/images/speaker.jpg" alt="" />
                  
               </div>

               <div className=' service-item-b d-flex align-items-center'>
                  <div>
                    <h6>Computer & Laptops</h6>
                    <p>986 Items</p>
                    </div>
                    <img src="/images/laptop.jpg" alt="" />
                  
               </div>

               <div className=' service-item-b d-flex align-items-center'>
                  <div>
                    <h6>Home Appliances</h6>
                    <p>4,925 Items</p>
                    </div>
                    <img src="/images/homeapp.jpg" alt="" />
                  
               </div>

               <div className=' service-item-b d-flex align-items-center'>
                  <div>
                    <h6>Accessories</h6>
                    <p>4,981 Items</p>
                    </div>
                    <img src="/images/acc.jpg" alt="" />
                  
               </div>

               <div className=' service-item-8 d-flex align-items-center'>
                  <div>
                    <h6>Smart Watches</h6>
                    <p>1,845 Items</p>
                    </div>
                    <div className='watch'>
                      <img src="/images/headphone.jpg" alt="" />
                    </div>
                    
                  
               </div>

               
            </div>
          </div>
        </div>
    </Container>
    
    <Container class1 = "featured-wrapper py-5 home-wrapper-2">
       <div className="row">
            <div className='col-12'>
              <h3 className='section-heading'>Featured Collections</h3>
            </div>
            
              <FeaturedCard />
              <FeaturedCard />

              <FeaturedCard />
              <FeaturedCard />
              


          </div>
    </Container>

    <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3 famous-card position-relative">
            <img className='img-fluid' src="/assets/famous-watch.jpg" alt="famous" />
            <div className="famous-content text-light position-absolute">
              <h5>Rolex Watch</h5>
              <h6>Luxary Watch Series 4</h6>
              <p>From $11k or $1.2k/mo. for 12 mo. *</p>
            </div>
          </div>


          <div className="col-3 famous-card position-relative">
            <img className='img-fluid' src="/assets/laptop-1.jpg" alt="famous" />
            <div className="famous-content text-dark position-absolute">
              <h5>Mackbook</h5>
              <h6>Mackbook Pro Series 4</h6>
              <p>From $11k or $1.2k/mo. for 12 mo. *</p>
            </div>
          </div>

          <div className="col-3 famous-card position-relative">
            <img className='img-fluid' src="/assets/headphones-3.png" alt="famous" /> 
          <div className="famous-content text-dark position-absolute">
              <h5>Headset</h5>
              <h6>Sony Expira Series 2</h6>
              <p>From $60 with flat 10% cashback</p>
            </div>
          </div>


          <div className="col-3 famous-card position-relative">
            <img className='img-fluid' src="/assets/mobile.jpg" alt="famous" /> 
          <div className="famous-content text-dark position-absolute">
              <h5>Samsung</h5>
              <h6>Samsung Pro Series 9</h6>
              <p>From $300 or $30/mo. for 12 mo. *</p>
            </div>
          </div>


        </div>


    </Container>


    <Container class1="special-wrapper py-5 home-wrapper-2">
      <div className="row">
          <div className="col-12">
            <h3 className='section-heading'> Special Products</h3>
          </div>
          <div className="row">
              <SpecialProducts />
              <SpecialProducts />
              <SpecialProducts />
          </div>
        </div>


    </Container>



    <Container class1="featured-wrapper py-5 home-wrapper-2">

        <div className="row">
            <div className='col-12'>
              <h3 className='section-heading'>Featured Collections</h3>
            </div>
            
              <FeaturedCard />
              <FeaturedCard />

              <FeaturedCard />
              <FeaturedCard />
              


          </div>

    </Container>

    <Container class1="marquee-wrapper home-wrapper-2 p-2">

      <div className="row">
            <div className="col-12">
                <div className="marquee-inner-wrapper card-wrapper py-2">
                    <Marquee pauseOnClick ={true}  className='d-flex'>
                         <div className='mx-4 w-25'>
                            <img src="/images/brand-01.png" alt="brand" />
                          </div>
                          <div className='mx-4 w-25'>
                            <img src="images/brand-02.png" alt="brand" />
                          </div>
                          <div className='mx-4 w-25'>
                            <img src="images/brand-03.png" alt="brand" />
                          </div>
                          <div className='mx-4 w-25'>
                            <img src="images/brand-04.png" alt="brand" />
                          </div>
                          <div className='mx-4 w-25'>
                            <img src="images/brand-05.png" alt="brand" />
                          </div>
                          <div className='mx-4 w-25'>
                            <img src="images/brand-06.png" alt="brand" />
                          </div>
                          <div className='mx-4 w-25'>
                            <img src="images/brand-07.png" alt="brand" />
                          </div>
                      
                    </Marquee>
                </div>
            </div>
          </div>

    </Container>


    <Container class1="blog-wrapper py-5 home-wrapper-2">

    <div className="row">
            <div className='my-3'>
              <h4>Read Our Blogs Here</h4>
            </div>
            <div className="col-3">
              <Card />
              </div>
            <div className="col-3">
            <Card />
              </div>
            <div className="col-3">
            <Card />
              </div>
            <div className="col-3">
            <Card />
              </div>
          </div>

    </Container>
   
   </>
  )
}

export default Home
