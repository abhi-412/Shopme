import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom'
import Container from '../Components/Container'
import CustomInput from '../Components/CustomInput'

const Login = () => {
  return (
    <>
        <Meta title={"Login"} />
        <BreadCrumb title={"Login"} />
        
        <Container class1="login-wrapper py-5 home-wrapper-2">
          <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center'>Login</h3>
                        <form className='d-flex flex-column gap-15' action="">
                            <CustomInput  type="email" name='email' placeholder='Email' />
                            <CustomInput  type="password" name='password' placeholder='Password' />
                            <div>
                                <Link to={'/forgot-password'}>Forgot Password?</Link>
                                <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
                                   <button className='button login'>Login</button>
                                   <Link to={'/signup'} className='signup-button'>SignUp</Link>
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

export default Login
