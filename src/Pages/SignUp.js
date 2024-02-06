import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom'
import Container from '../Components/Container'
import CustomInput from '../Components/CustomInput'


const SignUp = () => {
  return (
    <>
    <Meta title={"Sign Up"} />
    <BreadCrumb title={"Sign Up"} />

    
    <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center'>Sign Up</h3>
                        <form className='d-flex flex-column gap-15' action="">
                            <CustomInput type="text" name='name' placeholder='Name'   />
                            <CustomInput type="email" name='email' placeholder='Email'   />
                            <CustomInput type="tel" name='mobile' placeholder='Mobile No.'  />
                            <CustomInput type="password" name='password' placeholder='Password' />
                            <div>
                                <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
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

export default SignUp
