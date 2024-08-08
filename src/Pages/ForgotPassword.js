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

      <Container class1="py-5 flex items-center justify-center h-96 w-full">
            <div className='w-full flex items-center md:items-start justify-center'>
            <div className="bg-white p-4 w-[450px] rounded shadow">
              <h3 className='text-center font-semibold text-lg'>Reset Your Password</h3>
              <p className="text-center mt-2 mb-3 text-sm text-gray-500">
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

                  <div className="flex flex-col mt-3 w-full justify-center gap-3 items-center">
                    <button type='submit' className='button login'>Submit</button>
                    <Link className='underline' to={'/login'}>Cancel</Link>
                  </div>
              </form>
            </div>
            </div>
      </Container>
    </>
  );
}

export default ForgotPassword;
