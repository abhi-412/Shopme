import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {BsLinkedin,BsGithub,BsYoutube,BsInstagram} from 'react-icons/bs'


const Footer = () => {
  return (
    <>
        <footer className="py-3">
            <div className="container-xxl">
              <div className="row align-items-center">
                <div className="col-5">
                <div className="top-footer d-flex gap-35 align-items-center">
                      <img src="/images/newsletter.png" alt="newsletter" />
                      <h2>Sign Up for Newsletter</h2>
                  </div>
                </div>
                <div className="col-7">
                <div className="input-group">
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
            </div>


        </footer>


        <footer className="py-3">
          <div className="container-xxl">
            <div className="row">
              <div className="col-4">
                <h4 className='text-white mb-4'>Contact Us</h4>
                <div>
                  <address className='text-white fs-6'>
                    Hno : 204/86 Near Phoenix Mall <br /> Lucknow, Uttar Pradesh <br />
                    Pincode: 123456
                  </address>
                  <a href="tel:+91 9654875876" className='mt-2 d-block mb-1 text-white'>+91 9654875876</a>
                  <a href="mailto:ramsingh@gmail.com" className='mt-2 d-block mb-1 text-white'>ramsingh@gmail.com</a>
                  <div className="social_icons d-flex align-items-center gap-15">
                    <Link className='text-white fs-4' to={'/'} alt="social-icon"><BsLinkedin /></Link>
                    <Link className='text-white fs-4' to={'/'} alt="social-icon"><BsGithub /></Link>
                    <Link className='text-white fs-4' to={'/'} alt="social-icon"><BsInstagram /></Link>
                    <Link className='text-white fs-4' to={'/'} alt="social-icon"> <BsYoutube /></Link>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <h4 className='text-white mb-4'>Information</h4>
                <div className='footer-links d-flex flex-column'>

                    <Link className='text-white py-2 mb-1' to={'/privacy-policy'}>Privacy Policy</Link>
                    <Link className='text-white py-2 mb-1' to={'/return-policy'}>Return Policy</Link>
                    <Link className='text-white py-2 mb-1' to={'/shipping-policy'}>Shopping Policy</Link>
                    <Link className='text-white py-2 mb-1' to={'/terms-and-conditions'}>Terms of Service</Link>
                    <Link className='text-white py-2 mb-1' to={'/blogs'}>Blogs</Link>
                  
                </div>
              </div>
              <div className="col-3">
                <h4 className='text-white mb-4'>Account</h4>
                <div className='footer-links d-flex flex-column'>

                    <Link className='text-white py-2 mb-1' to={'/'}>Search</Link>
                    <Link className='text-white py-2 mb-1' to={'/'}>About Us</Link>
                    <Link className='text-white py-2 mb-1' to={'/'}>Faq</Link>
                    <Link className='text-white py-2 mb-1' to={'/'}>Contact</Link>
                    <Link className='text-white py-2 mb-1' to={'/'}>Size Chart</Link>
                  
                </div>
              </div>
              <div className="col-2">
                <h4 className='text-white mb-4'>Quick Links</h4>
                <div className='footer-links d-flex flex-column'>

                    <Link className='text-white py-2 mb-1' to={'/'}>Accessories</Link>
                    <Link className='text-white py-2 mb-1' to={'/'}>Laptops</Link>
                    <Link className='text-white py-2 mb-1' to={'/'}>Headphones</Link>
                    <Link className='text-white py-2 mb-1' to={'/'}>Smart Watches</Link>
                    <Link className='text-white py-2 mb-1' to={'/'}>Tablets</Link>
                  
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
