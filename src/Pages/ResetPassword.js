import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BreadCrumb from '../Components/BreadCrumb';
import Meta from '../Components/Meta';
import Container from '../Components/Container';
import CustomInput from '../Components/CustomInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../features/user/userSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();

  const location = useLocation();
  const  token  = location.pathname.split("/")[2];
  
  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password should be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@!#$%]/, 'Password must contain at least one special character (@!#$%)'),
      confirmPassword: Yup.string()
        .required('Re-enter Password')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: values => {
      const data = {
        token,
        password: values.newPassword
      }
      dispatch(resetPassword(data))
      setTimeout(() => {
        formik.resetForm();
          navigate('/login')
      }, 2000);
    },
  });

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    const value = e.target.value;
    setPasswordConditions({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[@!#$%]/.test(value),
    });
  };

  const allConditionsMet = Object.values(passwordConditions).every(Boolean);

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title={"Reset Password"} />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'>Reset Your Password</h3>
              <form className='flex flex-col' onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                  <input
                    type="password"
                    name='newPassword'
                    placeholder='New Password'
                    value={formik.values.newPassword}
                    onChange={handlePasswordChange}
                    onBlur={formik.handleBlur}
                    className={`border w-full p-2 rounded-md text-sm focus:outline ${allConditionsMet ? 'focus:outline-green-500' : 'focus:outline-red-500'}`}
                  />
                  
                </div >
                

                <div className="mb-2 flex flex-col gap-1">
                  <input
                    type="password"
                    name='confirmPassword'
                    placeholder='Re-enter Password'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`focus:outline border w-full p-2 rounded-md text-sm ${formik.values.confirmPassword === formik.values.newPassword && formik.values.confirmPassword ? 'focus:outline-green-500' : 'focus:outline-red-500'}`}
                  />
                </div>
                
                {formik.touched.confirmPassword && formik.errors.confirmPassword && formik.values.confirmPassword !== formik.values.newPassword ? (
                  <div className="text-red-500 text-xs mb-1">{formik.errors.confirmPassword}</div>
                ) : null}

                {formik.touched.newPassword && formik.errors.newPassword && !allConditionsMet ? (
                                  <div className="text-red-500 text-xs mb-1">{formik.errors.newPassword}</div>
                                ) : null}

                {!allConditionsMet && (
                    <ul className="text-xs">
                      <li className={passwordConditions.length ? 'text-green-500' : 'text-red-500'}>
                        At least 8 characters
                      </li>
                      <li className={passwordConditions.uppercase ? 'text-green-500' : 'text-red-500'}>
                        At least one uppercase letter
                      </li>
                      <li className={passwordConditions.lowercase ? 'text-green-500' : 'text-red-500'}>
                        At least one lowercase letter
                      </li>
                      <li className={passwordConditions.number ? 'text-green-500' : 'text-red-500'}>
                        At least one number
                      </li>
                      <li className={passwordConditions.specialChar ? 'text-green-500' : 'text-red-500'}>
                        At least one special character (@!#$%)
                      </li>
                    </ul>
                  )}

                <div className="d-flex mt-3 justify-content-center gap-4 align-items-center">
                  <button type='submit' className='reset-button bg-blue-500 text-white py-2 px-4 rounded'>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ResetPassword;
