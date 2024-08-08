import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddress, getUserCart, removeAddress, saveAddress } from '../features/user/userSlice';
import { FaHome, FaHotel, FaLock } from 'react-icons/fa';
import { MdDelete, MdWork } from 'react-icons/md';
import { GrLocationPin } from 'react-icons/gr';
import { BiSolidPencil } from 'react-icons/bi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdNavigateNext } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Address types with icons
const types = [
  { name: 'Home', icon: <FaHome /> },
  { name: 'Work', icon: <MdWork /> },
  { name: 'Hotel', icon: <FaHotel /> },
  { name: 'Other', icon: <GrLocationPin /> },
];

const Address = () => {
  const dispatch = useDispatch();
  const [addType, setAddType] = useState('Home');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [pincodeMsg,setPincodeMsg] = useState("");

  const {address,cart} = useSelector((state) => state.auth);

  // Validation schema
  const validationSchema = Yup.object({
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    addressLine2: Yup.string(),
    pincode: Yup.string().required('Pincode is required').matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
  });

  // Fetch city and state based on pincode
  const fetchLocationFromPincode = async (pincode) => {
    const pincodeData = await fetch(`https://api.postalpincode.in/pincode/${pincode}`).then((res) => res.json());
    if (pincodeData[0]?.PostOffice?.length > 0) {
      const PostOffice = pincodeData[0].PostOffice;
      const city = PostOffice[0]?.District;
      const state = PostOffice[0]?.State;
      setPincodeMsg("Successfully fetched city and state")
      return { city, state };
    }
    setPincodeMsg("Invalid Pincode")
    return { city: '', state: '' };
  };

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      country: '',
      state: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      pincode: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const address = {
        name: addType,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        state: values.state,
        country: values.country,
        pincode: values.pincode,
      };
      dispatch(saveAddress({ address }));
      setTimeout(() => {
        dispatch(getUserAddress());
        setSelectedAddress(null);
        setAddType('Home');
        setShowForm(false);
      }, 800);
    },
  });

  useEffect(() => {
    dispatch(getUserAddress());
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (selectedAddress) {
      formik.setValues({
        country: selectedAddress.country || '',
        state: selectedAddress.state || '',
        city: selectedAddress.city || '',
        addressLine1: selectedAddress.addressLine1 || '',
        addressLine2: selectedAddress.addressLine2 || '',
        pincode: selectedAddress.pincode || '',
      });
      setAddType(selectedAddress.name || 'Home');
      setShowForm(false);
    }
  }, [selectedAddress]);

  const navigate = useNavigate();

  const handleCheckout = ()=>{
    if(selectedAddress){
      navigate('/checkout',{state:{address: selectedAddress}})
    }else{
      alert("Please select an address")
    }
  }


  const handleDelete = (addressId)=>{
    dispatch(removeAddress(addressId));
    setTimeout(()=>{
      dispatch(getUserAddress());
    },2000)
  }

  

  return (
    <>
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
    <div className="flex w-full bg-white border-gray-200  dark:bg-gray-900 items-center gap-5 px-2 py-3">
        <Link to="/" className="flex px-10">
          <img src="/assets/shopme_logo.png" className="w-32" alt="Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span> */}
        </Link>
        <h1 className='text-2xl font-semibold'>Checkout({cart?.products?.length} items)</h1>
        {/* <p className='px-5'>
        <FaLock className='text-3xl text-gray-500' />
        </p> */}
    </div>
    <div className='flex gap-4 md:p-8 xxs:p-2 w-full'>
      <div className='flex flex-col w-full gap-3'>
          

          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a href="/" className="inline-flex items-center text-sm gap-2 font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <FaHome />
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                <MdNavigateNext className='text-gray-500 text-lg'/>
                  <a href="/cart" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">Cart</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                <MdNavigateNext className='text-gray-500 text-lg'/>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Information</span>
                </div>
              </li>
            </ol>
          </nav>


          
          

          <div className='w-full justify-between flex md:flex-row flex-col gap-5 p-3'>
            <div className='w-full flex flex-col gap-4'>
                  <div className='flex gap-5 justify-between'>
                  <h1 className='text-2xl font-bold mb-4'>Saved Address</h1>
                  <div>
                  <button onClick={()=>{setSelectedAddress(null);setShowForm(true);formik.resetForm()}} className='bg-blue-500 text-white text-sm px-3 py-1.5 hover:bg-blue-700 rounded-lg'>Add New</button>
                  </div>
                  </div>
                  <div className='flex gap-3 flex-wrap'>
                    {address?.map((addr) => (
                      <div
                        key={addr._id}
                        onClick={() => {
                          setSelectedAddress(addr);
                          setPincodeMsg('')
                        }}
                        className={`p-3 bg-white w-fit rounded-lg cursor-pointer ${addr._id === selectedAddress?._id ? 'border-2 border-blue-500 shadow-md scale-105' : ''}`}
                      >
                        <div className='flex gap-2 justify-between w-full mb-2'>
                          <p className='flex items-center gap-2 text-gray-500'>{types.find((type) => type.name === addr.name)?.icon}{addr.name}</p>
                          <p className='text-gray-600 flex gap-1 items-center'>
                            <MdDelete onClick={() => handleDelete(addr._id)} className='hover:text-red-500 text-lg' />
                          </p>
                        </div>
                        <div className='flex flex-col gap-1 text-gray-600 text-sm'>
                          <p>{addr.addressLine1},{addr.addressLine2}</p>
                          <p>{addr.city},{addr.state}</p>
                          <p>{addr.country}, {addr.pincode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='flex p-3 flex-col gap-2 bg-white'>
                    <h1 className='text-2xl font-semibold'>Shipping Details</h1>
                    <div className='md:flex gap-2 items-center hidden'>
                      <h4 className='flex text-sm font-semibold flex-nowrap'>Deliver To:</h4>
                      <p className='text-sm'>{selectedAddress?.addressLine1} {selectedAddress?.addressLine2} {selectedAddress?.city} {selectedAddress?.state} {selectedAddress?.pincode}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      {cart?.products?.map((item) => (
                        <div
                          key={item._id}
                          className='flex gap-2 items-center border-b p-1 relative'
                        >
                          <div className='w-20 h-20 relative p-2'>
                            <img
                              src={item.product.images[0].url}
                              className='w-full h-full object-contain relative'
                              alt=''
                            />
                            <p  className='bg-gray-400 text-white absolute px-1.5 py-0.5 text-xs rounded-full top-0 right-0'>{item.count}</p>
                            </div>
                            <div className='flex gap-2 justify-between w-full h-full'>
                            <div className='flex flex-col justify-center items-start'>
                              <p className='text-sm'>{item.product.title?.length < 25 ? item.product.title : `${item.product.title.slice(0,25)}...`}</p>
                              <p className='text-sm text-gray-500'>₹{item.product.price}</p>
                            </div>

                            <div className='flex flex-col gap-1 items-end justify-end'>
                              <p className='text-sm font-semibold'>Total</p>
                              <p className='text-sm'>₹{item.product.price * item.count}</p>
                            </div>
                            </div>

                            {/* <button className='absolute text-xs text-gray-50 cursor-pointer top-0 right-0 bg-red-600 px-1.5 py-0.5 font-semibold rounded-full'>
                              X
                            </button> */}
                        </div>
                      ))}

                      <div className='w-full py-1 flex justify-end'>
                        <p className='text-sm font-bold'>Pay <span className='text-black font-semibold'>: ₹{cart?.cartTotal}</span></p>
                      </div>
                    </div>

                  
                  
                </div>
            </div>

            {showForm && (
                <div className=' p-6 md:max-w-lg bg-white w-full rounded-lg'>
                  <div>
                    <h1 className='text-2xl font-bold mb-2'>Shipping Address</h1>
                    <p className='mb-4'>Enter your shipping address</p>
                  </div>
                  <div className='mb-4 flex justify-between'>
                    {types.map((type) => (
                      <div
                        key={type.name}
                        onClick={() => setAddType(type.name)}
                        className={`flex flex-col items-center cursor-pointer ${type.name === addType ? 'border-b-2 text-gray-800 bg-gray-200 border-black' : ''} p-2`}
                      >
                        <p className='text-lg'>{type.icon}</p>
                        <p className='text-sm'>{type.name}</p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    
                    <div className='mb-4'>
                      <label htmlFor='addressLine1' className='block text-sm font-medium text-gray-700'>Address Line 1</label>
                      <input
                        type='text'
                        name='addressLine1'
                        id='addressLine1'
                        className='mt-1 p-2 block w-full border-gray-300 rounded-md border sm:text-sm'
                        value={formik.values.addressLine1}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.addressLine1 && formik.touched.addressLine1 && (
                        <div className='text-red-600 text-sm mt-1'>{formik.errors.addressLine1}</div>
                      )}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='addressLine2' className='block text-sm font-medium text-gray-700'>Address Line 2</label>
                      <input
                        type='text'
                        name='addressLine2'
                        id='addressLine2'
                        className='mt-1 p-2 block w-full border-gray-300 rounded-md border sm:text-sm'
                        value={formik.values.addressLine2}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.addressLine2 && formik.touched.addressLine2 && (
                        <div className='text-red-600 text-sm mt-1'>{formik.errors.addressLine2}</div>
                      )}
                    </div>
                    <div className='mb-3 flex gap-4'>
                        <div className='w-full'>
                          <label htmlFor='pincode' className='block text-sm font-medium text-gray-700'>Pincode</label>
                          <input
                            type='text'
                            name='pincode'
                            id='pincode'
                            className='mt-1 p-2 block w-full border-gray-300 rounded-md border sm:text-sm'
                            value={formik.values.pincode}
                            onChange={async (e) => {
                              const { value } = e.target;
                              formik.handleChange(e);
                              if (value.length === 6) {
                                const { city, state } = await fetchLocationFromPincode(value);
                                formik.setFieldValue('city', city);
                                formik.setFieldValue('state', state);
                              }
                            }}
                          />
                          {/* {formik.errors.pincode && formik.touched.pincode && (
                            <div className='text-red-600 text-sm mt-1'>{formik.errors.pincode}</div>
                          )} */}
                          <div className={formik.values.pincode?.length ===6 && pincodeMsg === "Invalid Pincode" ? 'text-red-600 text-sm mt-1' : 'text-green-600 text-sm mt-1'}>{pincodeMsg}</div>
                        </div>
                        <div className='w-full'>
                          <label htmlFor='country' className='block text-sm font-medium text-gray-700'>Country</label>
                          <select
                            name='country'
                            id='country'
                            className='mt-1 p-2 block w-full border-gray-300 rounded-md border sm:text-sm'
                            value={formik.values.country}
                            onChange={formik.handleChange}
                          >
                            <option value=''>Select a country</option>
                            <option value='India'>India</option>
                          </select>
                          {formik.errors.country && formik.touched.country && (
                            <div className='text-red-600 text-sm mt-1'>{formik.errors.country}</div>
                          )}
                        </div>
                    </div>
                    <div className='mb-3 flex gap-4'>
                        <div className=''>
                          <label htmlFor='state' className='block text-sm font-medium text-gray-700'>State</label>
                          <input
                            type='text'
                            name='state'
                            id='state'
                            className='mt-1 p-2 block w-full border-gray-300 rounded-md border sm:text-sm'
                            value={formik.values.state}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.state && formik.touched.state && (
                            <div className='text-red-600 text-sm mt-1'>{formik.errors.state}</div>
                          )}
                        </div>
                        <div className=''>
                          <label htmlFor='city' className='block text-sm font-medium text-gray-700'>City</label>
                          <input
                            type='text'
                            name='city'
                            id='city'
                            className='mt-1 p-2 block w-full border-gray-300 rounded-md border sm:text-sm'
                            value={formik.values.city}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.city && formik.touched.city && (
                            <div className='text-red-600 text-sm mt-1'>{formik.errors.city}</div>
                          )}
                        </div>
                    </div>
                    <button
                      type='submit'
                      className='w-full p-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
          </div>


          

          
          <div className='flex justify-end'>    
             <div className='flex flex-wrap gap-3'>
              <Link to={'/cart'} className='bg-red-500 text-white px-5 py-2 hover:bg-red-700'>
                  Cancel
              </Link>
             <button onClick={handleCheckout} className='bg-yellow-400 text-white  px-5 py-2 hover:bg-yellow-600 '>
                  Proceed
              </button>
             </div>
          </div>
          
      </div>
      
    </div>
    </>
    
  );
};

export default Address;
