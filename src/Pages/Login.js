import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom'
import Container from '../Components/Container'
import CustomInput from '../Components/CustomInput'
import { useFormik } from 'formik'
import { loginUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup';



const Login = () => {

  const dispatch = useDispatch();


  let userSchema =  Yup.object({
    email : Yup.string().email("Email is Invalid").required("Email is required"),
    password : Yup.string().required("Password is required")
   })
   let formik = useFormik({
     initialValues: {     
       email: "",
       password: "",
     },
     validationSchema:userSchema,
     onSubmit: async values => {
       const userData = values;
       dispatch(loginUser(userData));
       
     },
   })



  return (
    <>
        <Meta title={"Login"} />
        <BreadCrumb title={"Login"} />
        
        <Container class1="login-wrapper py-5 px-3 home-wrapper-2">
          <div className="row">
               
                    <div className="auth-card">
                        <h3 className='text-center mb-2'>Login</h3>
                        <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15' action="">
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
                                <Link to={'/forgot-password'}>Forgot Password?</Link>
                                <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
                                   <button type='submit' className='button login'>Login</button>
                                   <Link to={'/signup'} className='signup-button'>SignUp</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

        </Container>
    </>
  )
}

export default Login
