import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BreadCrumb from '../Components/BreadCrumb';
import Meta from '../Components/Meta';
import { Link } from 'react-router-dom';
import Container from '../Components/Container';
import CustomInput from '../Components/CustomInput';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../features/user/userSlice';

const ForgotPassword = () => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),
    }),
    onSubmit: values => {
      dispatch(forgetPassword(values));
    },
  });

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
              <form className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                <CustomInput
                  type="email"
                  name='email'
                  placeholder='Email'
                  val={formik.values.email}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger text-sm">{formik.errors.email}</div>
                ) : null}

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
  );
}

export default ForgotPassword;
