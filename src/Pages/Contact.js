import React, { useEffect, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import CustomInput from '../Components/CustomInput'
import Meta from '../Components/Meta'
import {FaHome,FaAddressBook} from 'react-icons/fa'
import { IoIosMail } from "react-icons/io";
import { BiInfoCircle } from "react-icons/bi";
import Container from '../Components/Container';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createEnquiry } from '../features/enquiry/enquirySlice'
import { Link } from 'react-router-dom'


const Contact = () => {

  const [successPage,setSuccessPage] = useState(false);

  const dispatch = useDispatch();

  let enqSchema =  Yup.object({
    name : Yup.string().required("Name is required").min(3,"Name should be at least 3 characters"),
    email : Yup.string().email("Email is Invalid").required("Email is required"),
    mobile : Yup.number().required("Mobile is required").min(1000000000,"Mobile number should have minimum 10 digits").max(9999999999,"Mobile number should should have maximum 10 digits"),
    comment : Yup.string().required("Message is required").min(10,"Message should be at least 10 characters")
   })
 
   let formik = useFormik({
     initialValues: {     
       name: "",
       email: "",
       mobile: "",
       comment: "",
     },

     validationSchema:enqSchema,
     onSubmit: values => {
       const enqData = values;
       dispatch(createEnquiry(enqData));
     },
   })


   let {isSuccess,createdEnquiry} = useSelector(state=>state.enquiry)

  useEffect(()=>{
    if(isSuccess && createdEnquiry?._id){
      setSuccessPage(true);
     }
  },[isSuccess,createdEnquiry])

   console.log(successPage);


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
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        >

        </iframe>
        </div>

        <div className="col-12 mt-5 mb-5">
            <div className="content-wrapper d-flex justify-content-between">
              <div>
                <h3 className='contact-title mb-3'>Contact Us</h3>
                {successPage && <div className='my-3 flex flex-col items-center gap-2 justify-center'>
                  <p className='text-green-600'>Enquiry Submitted Successfully. We will get back to you shortly.</p>
                  <div className='flex gap-3 flex-wrap items-center'>
                  <button className='bg-gray-800 py-1.5 px-4 rounded-full text-gray-50' onClick={()=>setSuccessPage(false)}>Add New Enquiry</button>
                  <Link className='bg-gray-400 py-1.5 px-4 rounded-full text-gray-50' to="/store">Continue Shopping</Link>
                  </div>
                  
                  </div>}
                {!successPage && (
                            <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                              <div className="d-flex flex-column  justify-items-center gap-2"> 
                                <CustomInput
                                type="text"
                                name='name'
                                placeholder='Full Name'
                                onCh={formik.handleChange}
                                val={formik.values.name}  
                                //  onBl={formik.handleBlur("name")}
                                />
                                    <div>
                                        {formik.touched.name && formik.errors.name ? (
                                            <div><p className='text-sm text-red-400 text-danger'>{formik.errors.name}</p></div>
                                        ) : null}
                                    </div>
                              </div>
                              <div className="d-flex flex-column  justify-items-center gap-2"> 
                                <CustomInput
                                type="text"
                                name='email'
                                placeholder='Email Address'
                                onCh={formik.handleChange}
                                val={formik.values.email}  
                                //  onBl={formik.handleBlur("email")}
                                />
                                    <div>
                                        {formik.touched.email && formik.errors.email ? (
                                            <div><p className='text-sm text-red-400 text-danger'>{formik.errors.email}</p></div>
                                        ) : null}
                                    </div>
                              </div>
                              <div className="d-flex flex-column  justify-items-center gap-2"> 
                                <CustomInput
                                type="text"
                                name='mobile'
                                placeholder='Phone Number'
                                onCh={formik.handleChange}
                                val={formik.values.mobile}  
                                //  onBl={formik.handleBlur("mobile")}
                                />
                                    <div>
                                        {formik.touched.mobile && formik.errors.mobile ? (
                                            <div><p className='text-sm text-red-400 text-danger'>{formik.errors.mobile}</p></div>
                                        ) : null}
                                    </div>
                              </div>
                              <div className="d-flex flex-column  justify-items-center gap-2"> 

                                  <textarea
                                    cols="30"
                                    name='comment'
                                    onChange={formik.handleChange}
                                    value={formik.values.comment}
                                    rows="4" 
                                    className="form-control w-100" 
                                    placeholder='Comments'
                                    />
                                    <div>
                                        {formik.touched.comment && formik.errors.comment ? (
                                            <div><p className='text-sm text-red-400 text-danger'>{formik.errors.comment}</p></div>
                                        ) : null}
                                    </div>
                              </div>
                      
                        
                      
                              <div>
                                <button className='button'>
                                    Submit
                                </button>
                              </div>
                            </form>
                )}
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
