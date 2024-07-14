import React, { useEffect } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom'
import Container from '../Components/Container'
import CustomInput from '../Components/CustomInput'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice'


const SignUp = () => {

    const dispatch = useDispatch();


    let userSchema =  Yup.object({
       firstName : Yup.string().required("First Name is required"),
       lastName : Yup.string().required("Last Name is required"),
       email : Yup.string().email("Email is Invalid").required("Email is required"),
       mobile : Yup.string().required("Mobile is required").max(10,"Mobile number should be 10 digit").min(10,"Mobile number should be 10 digit"),
       password : Yup.string().required("Password is required").max(16,"Password should be 10 digit").min(8,"Password should be 8 digit"),
      })
    
      let formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          password: "",
        },
        validationSchema:userSchema,
        onSubmit: values => {
          console.log(values);
          const userData = values;
          dispatch(registerUser(userData));
        },
      })


     

      

  return (
    <>
    <Meta title={"Sign Up"} />
    <BreadCrumb title={"Sign Up"} />
    
    <Container class1="login-wrapper py-5 px-3 home-wrapper-2">
        <div className="row">
                    <div className="auth-card">
                        <h3 className='text-center mb-4'>Sign Up</h3>
                        <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15' action="">
                            <div className="d-flex flex-column  justify-items-center gap-2"> 
                            <CustomInput
                             type="text"
                             name='firstName'
                             placeholder='First Name'
                             onCh={formik.handleChange}
                             val={formik.values.firstName}  
                            //  onBl={formik.handleBlur("firstName")}
                             />
                                <div>
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div><p className='text-sm text-danger'>{formik.errors.firstName}</p></div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="d-flex flex-column  justify-items-center gap-2"> 
                            <CustomInput
                             type="text"
                             name='lastName'
                             placeholder='Last Name'
                             onCh={formik.handleChange}
                             val={formik.values.lastName}  
                            //  onBl={formik.handleBlur("lastName")}
                             />
                                <div>
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div><p className='text-sm text-red-400 text-danger'>{formik.errors.lastName}</p></div>
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
                             placeholder='Mobile No.'
                             onCh={formik.handleChange}
                             val={formik.values.mobile}  
                            //  onBl={formik.handleBlur("email")}
                             />
                                <div>
                                    {formik.touched.mobile && formik.errors.mobile ? (
                                        <div><p className='text-sm text-red-400 text-danger'>{formik.errors.mobile}</p></div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="d-flex flex-column  justify-items-center gap-2"> 
                            <CustomInput
                             type="password"
                             name='password'
                             placeholder='Password'
                             onCh={formik.handleChange}
                             val={formik.values.password}  
                            //  onBl={formik.handleBlur("email")}
                             />
                                <div>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div><p className='text-sm text-red-400 text-danger'>{formik.errors.password}</p></div>
                                    ) : null}
                                </div>
                            </div>
                            <div>
                                <div className="d-flex mt-3 justify-content-center gap-3 align-items-center">
                                <Link to={'/login'}>Already have an account? &nbsp; <a className='text-blue-500' href="/login">Login</a></Link>
                                <button type='submit' className='button login'>SignUp</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
    </Container>
    </>
  )
}

export default SignUp
