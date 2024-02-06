import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom'
import Container from '../Components/Container'
import CustomInput from '../Components/CustomInput'


const ForgotPassword = () => {
  return (
    <>
    <Meta title={"Forgot Password"} />
        <BreadCrumb title={"Forgot Password"} />

      <Container class1="login-wrapper py-5 home-wrapper-2">
      <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center'>Reset Your Password</h3>
                        <p className="text-center mt-2 mb-3">
                          We will send you an email to reset your password
                        </p>
                        <form className='d-flex flex-column gap-15' action="">
                            <CustomInput type="email" name='email' placeholder='Email' />
                           
                            <div>
                               
                                <div className="d-flex flex-column mt-3 justify-content-center gap-15 align-items-center">
                                   <button type='submit' className='button login'>Submit</button>
                                   <Link to={'/login'}>Cancel</Link>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
               </div>
      </Container>

    </>
  )
}

export default ForgotPassword
