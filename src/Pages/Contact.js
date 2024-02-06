import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import {FaHome,FaAddressBook} from 'react-icons/fa'
import { IoIosMail } from "react-icons/io";
import { BiInfoCircle } from "react-icons/bi";
import Container from '../Components/Container';
import CustomInput from '../Components/BreadCrumb'


const Contact = () => {
  return (
    <>
    <Meta title={"Contact Us"} />
    <BreadCrumb title={"Contact"} />
    
    
    <Container class1="contact-wrapper home-wrapper-2">
      <div className="row">
        <div className="col-12">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227821.98710530225!2d80.77769949830774!3d26.848902829067065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1707038041919!5m2!1sen!2sin" 
        width="600"
        height="450"
        className='border-0 w-100'
        title='contact'
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        >

        </iframe>
        </div>

        <div className="col-12 mt-5 mb-5">
            <div className="content-wrapper d-flex justify-content-between">
              <div>
                <h3 className='contact-title'>Contact Us</h3>
                <form action="" className='d-flex flex-column gap-15'>
                  <div>
                    <input type="text" className="form-control" placeholder='Name' />
                  </div>
                  <div>
                    <input type="email" placeholder='Email' className="form-control" />
                  </div>
                  <div>
                    <input type="tel" placeholder='Mobile' className="form-control" />
                  </div>
                  <div>
                    <textarea
                      cols="30"
                      rows="4" 
                      className="form-control w-100" 
                      placeholder='Comments'
                      />
                  </div>
                  <div>
                    <button className='button'>
                        Submit
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className='contact-title mb-4'>Get in Touch with Us</h3>
                <div>
                  <ul className='ps-0'>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <FaHome className='fs-5' />
                      <address className='mb-0'>Hno. 209/9, Near Metro Station-4, Hazaratganj, 
                        Lucknow,  UP</address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <FaAddressBook className='fs-5' />
                      <a href="tel:+91 8788091946">+91 9145105096</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <IoIosMail className='fs-5' />
                      <a href="mailto: rakhisingh41234@gmail.com">rakhisingh41234@gmail.com</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <BiInfoCircle className='fs-5' />
                      <p className='mb-0'>Monday-Friday 9am-10pm</p>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
    </Container>
    <div className="">
    <div className="container-xxl">
      
    </div>
    </div>
    </>
  )
}

export default Contact
