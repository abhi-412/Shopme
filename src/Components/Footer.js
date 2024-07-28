import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {BsLinkedin,BsGithub,BsYoutube,BsInstagram} from 'react-icons/bs'


const Footer = () => {
  return (
    <>
        <footer className="py-3 w-full ">
            <div className="w-full flex justify-center">
              <div className="flex md:flex-row flex-col gap-3 px-3 justify-between md:w-10/12 w-full items-center">
                <div className="flex w-full items-center gap-3">
                      <img src="/images/newsletter.png" alt="newsletter" />
                      <h2 className='text-white'>Sign Up for Newsletter</h2>
                  </div>
                
               
                <div className="input-group w-full">
                    <input type="text" 
                    className="form-control py-1" 
                    placeholder="Your Email Address" 
                    aria-label="Your Email Address" 
                    aria-describedby="basic-addon2" 
                    />
                    <span className="input-group-text p-2"
                     id="basic-addon2">
                      <button className='button'>Subscribe</button>
                     </span>
                  </div>

             
                  
              </div>
            </div>


        </footer>


        <footer className="py-3 w-full">
          <div className="w-full flex justify-center md:px-10 px-2">
            <div className="md:container flex flex-wrap justify-between gap-4">

              <div className="md:col-span-5 col-span-3 flex flex-col flex-wrap">
                <h4 className='text-white mb-4'>Contact Us</h4>
                <div className='text-sm md:text-base flex flex-col flex-wrap md:gap-3 gap-2'>
                  <address className='text-white mb-0'>
                    Hno : 204/86 Near Phoenix Mall <br /> Lucknow, Uttar Pradesh <br />
                    Pincode: 123456
                  </address>
                  <a href="tel:+91 9654875876" className=' flex text-white'>+91 9654875876</a>
                  <a href="mailto:ramsingh@gmail.com" className=' flex  text-white'>ramsingh@gmail.com</a>
                  <div className="flex align-items-center gap-3 flex-wrap">
                    <Link className='text-white text-lg md:text-xl ' to={'/'} alt="social-icon"><BsLinkedin /></Link>
                    <Link className='text-white text-lg md:text-xl ' to={'/'} alt="social-icon"><BsGithub /></Link>
                    <Link className='text-white text-lg md:text-xl ' to={'/'} alt="social-icon"><BsInstagram /></Link>
                    <Link className='text-white text-lg md:text-xl' to={'/'} alt="social-icon"> <BsYoutube /></Link>
                  </div>
                </div>
              </div>
              <div className="col-span-2 md:col-span-3">
                <h4 className='text-white mb-4'>Information</h4>
                <div className='text-sm md:text-base flex flex-col gap-2'>

                    <Link className='text-white' to={'/privacy-policy'}>Privacy Policy</Link>
                    <Link className='text-white' to={'/return-policy'}>Return Policy</Link>
                    <Link className='text-white' to={'/shipping-policy'}>Shopping Policy</Link>
                    <Link className='text-white' to={'/terms-and-conditions'}>Terms of Service</Link>
                    <Link className='text-white' to={'/blogs'}>Blogs</Link>
                  
                </div>
              </div>
              <div className="col-span-3">
                <h4 className='text-white mb-4'>Account</h4>
                <div className='text-sm md:text-base flex flex-col gap-2'>

                    <Link className='text-white ' to={'/'}>Search</Link>
                    <Link className='text-white' to={'/'}>About Us</Link>
                    <Link className='text-white' to={'/'}>Faq</Link>
                    <Link className='text-white' to={'/'}>Contact</Link>
                    <Link className='text-white' to={'/'}>Size Chart</Link>
                  
                </div>
              </div>
              <div className="col-span-2">
                <h4 className='text-white mb-4'>Quick Links</h4>
                <div className='text-sm md:text-base flex flex-col gap-2'>

                    <Link className='text-white' to={'/'}>Accessories</Link>
                    <Link className='text-white' to={'/'}>Laptops</Link>
                    <Link className='text-white' to={'/'}>Headphones</Link>
                    <Link className='text-white' to={'/'}>Smart Watches</Link>
                    <Link className='text-white' to={'/'}>Tablets</Link>
                  
                </div>
              </div>
            </div>
          </div>


        </footer>
        <footer className="py-4">
              <div className="container-xxl">
                <div className="row">
                  <div className="col-12">
                      <p className='text-center mb-0 text-white'>
                        &copy;{new Date().getFullYear()};  Powered by Abhay Pratap
                      </p>
                  </div>
                </div>
              </div>
        </footer>
    
    </>
  )
}

export default Footer
