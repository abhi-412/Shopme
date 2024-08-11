import React, { useEffect, useRef, useState } from 'react';
import { createOrder, getUserCart } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidPencil } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GrLocationPin } from "react-icons/gr";
import { getCoupons } from '../features/coupon/couponSlice';
import { getColors } from '../features/color/colorSlice';
import axios from 'axios';
import logo from "../shopme_logo.png"
import config from '../utils/config';
import { FaLock } from 'react-icons/fa';
import { base_url } from '../utils/base_url';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Function to calculate total cost

const Checkout = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');
    const [coupon, setCoupon] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [taxes] = useState(0.1); // 10% tax
    const [deliveryCharges,setDeliveryCharges] = useState(50); // Fixed delivery charge
    const [CouponDiscount, setCouponDiscount] = useState(0);
    const [paymentInfo,setPaymentInfo] = useState({razorpayOrderID: "", razorpayPaymentID: ""});

  const dispatch = useDispatch();
  
  // Calculate subtotal, tax, discount, total


  const handleApplyCoupon = (c) => {
    const couponData = coupons.find(c => c.name === coupon);
    if (couponData && new Date(couponData.expiry) > new Date()) {
      setIsCouponApplied(true);
      setAppliedCoupon(couponData);
      setCouponDiscount(couponData.discount);
    } else {
      alert('Invalid or expired coupon');
      setIsCouponApplied(false);
      setAppliedCoupon(null);
    }
  };


  const navigate = useNavigate();
  const location = useLocation();
  const address = location?.state?.address;  
  const customer = JSON.parse(localStorage.getItem('customer'));



  useEffect(() => {
    dispatch(getUserCart());
    dispatch(getCoupons());
    dispatch(getColors())

  }, [dispatch]);

  const cart = useSelector((state) => state.auth.cart);
  const Curcoupons = useSelector((state) => state.coupon?.coupons);
 

  useEffect(() => {
    setCoupons(Curcoupons)
    if(!address){
      navigate('/cart/information')
    }
  }, [Curcoupons, address, navigate]);

  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsVisible(false);

      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };

  useEffect(()=>{
    if(cart?.cartTotal > 999){
        setDeliveryCharges(0);
    }else{
        setDeliveryCharges(50);
    }
  },[dispatch, cart?.cartTotal])

  let subTotal = cart?.cartTotal;
  let tax = subTotal* taxes;
  let discount = subTotal * CouponDiscount/100;
  let total = subTotal + tax - discount + deliveryCharges;

  const colors = useSelector((state)=>state.color?.colors);

  let items = []
  for(let i = 0; i < cart?.products?.length; i++){
    let obj = {};
    const product = cart?.products[i]?.product;
    obj['product'] = product;
    obj['count'] = cart?.products[i]?.count;
    const curColor = colors?.find((col)=>col?.color === cart?.products[i]?.color);
    obj['color'] = curColor?._id;
    obj['size'] = cart?.products[i]?.size;
    obj['price'] = cart?.products[i]?.price;
    items.push(obj);
  }



  const loadScript = async (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.head.appendChild(script);
    });
  };

  const checkOutHandler = async()=>{
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    
    const result = await axios.post(`${base_url}user/order/payment`,{amount:total},config);
    if (result && result?.data) {
      const { amount, id: order_id, currency } = result.data?.order;
      const options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "Shopme Official.",
        description: "Test Transaction",
        image: logo ,
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                // razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post(`${base_url}user/order/payment-verify`, data,config);
            const orderDetails = {
              items,
              shippingInfo:{
                address: address?._id,
                customerName: customer?.firstName + " " + customer?.lastName,
                phoneNumber: customer?.mobile
              },
              paymentMethod : selectedPaymentMethod,
              paymentInfo:{
                razorpayPaymentID:  response.razorpay_payment_id,
                razorpayOrderID:  response.razorpay_order_id,
              },
              orderStatus: "Not Processed",
              orderBy: customer?._id,
              totalPrice:subTotal,
              totalAfterDiscount: Number(total?.toFixed(2))
            } 
            // console.log(orderDetails);
             dispatch(createOrder(orderDetails));
             setTimeout(()=>{
               navigate("/orders");
             },3000)

        },
        prefill: {
            name: customer?.firstName?.toUpperCase().slice(0, 1) + customer?.firstName?.slice(1) + " " + customer?.lastName?.toUpperCase().slice(0,1) + customer?.lastName?.slice(1),
            email: customer?.email,
            contact: customer?.mobile,
        },
        notes: {
            address: JSON.stringify({address:address.addressLine1 + address.addressLine2, city:address.city, state:address.state, country:address.country, pincode:address.pincode}),
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }else{
    alert("Server error. Are you online?");
    return;
  }
}


const handleOrder = async()=>{
  if(selectedPaymentMethod !== "Cash on Delivery"){
    checkOutHandler();
  }else{
    const orderDetails={
              items,
              shippingInfo:{
                address: address?._id,
                customerName: customer?.firstName + " " + customer?.lastName,
                phoneNumber: customer?.mobile
              },
              paymentMethod : selectedPaymentMethod,
              paymentInfo:paymentInfo,
              orderStatus: "Not Processed",
              orderBy: customer?._id,
              totalPrice:subTotal,
              totalAfterDiscount: Number(total?.toFixed(2))
            }
      dispatch(createOrder(orderDetails));

  }
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
     

<div className="flex w-full justify-between bg-white border-gray-200 flex-wrap  dark:bg-gray-900 items-center px-2 py-3">
    <Link to="/" className="flex md:px-10">
      <img src="/assets/shopme_logo.png" className="md:w-32 w-24" alt="Logo" />
      {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span> */}
    </Link>
    <h1 className='md:text-2xl text-base text-nowrap font-semibold'>Checkout({cart?.products?.length} items)</h1>
    <p className='md:px-5'>
    <FaLock className='md:text-3xl text-base text-gray-500' />
    </p>
</div>
    <div className='p-2 '>
     
        <div className="md:p-5 bg-white max-w-4xl mx-auto p-4 shadow-md rounded-lg my-5">
      <h1 className="md:text-3xl text-xl font-bold mb-6">Billing Information</h1>

      {/* User Details */}
      <div className=" bg-gray-100 mb-4 p-3">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-xl">Contact Information</h4>
          <div className='flex gap-4'>
            <div className='flex gap-1 flex-wrap'>
              <p className=" text-gray-500 text-sm md:text-base flex text-nowrap">{customer?.firstName?.toUpperCase().slice(0,1) + customer?.firstName?.slice(1)} {customer?.lastName?.toUpperCase().slice(0,1) + customer?.lastName?.slice(1)}</p>
              <button 
                ref={buttonRef}
                onMouseOver={togglePopover}
                className="cursor-pointer"
              >
                <p className='text-gray-500 text-sm md:text-base'>({customer?.email})</p>
              </button>
              <div 
                ref={popoverRef}
                onMouseLeave={togglePopover}
                id="popover-user-profile" 
                role="tooltip" 
                className={`absolute z-10 mt-8 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <a href="#">
                      <img 
                        className="w-10 h-10 rounded-full" 
                        src={customer?.image ? customer?.image.url : "/assets/spidey.jpg"} 
                        alt={customer?.firstName}
                      />
                    </a>
                    <div>
                      <button 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                  <p className="text-base font-semibold leading-none text-gray-900">
                    <a href="#">{customer?.firstName?.toUpperCase().slice(0,1) + customer?.firstName?.slice(1)} {customer?.lastName?.toUpperCase().slice(0,1) + customer?.lastName?.slice(1)}</a>
                  </p>
                  <p className="mb-2 text-sm font-normal">
                    <a href="#" className="hover:underline">@{customer?.firstName?.toLowerCase()}</a>
                  </p>
                  <p className="mb-2 text-sm">
                    {customer?.email}
                  </p>
                  <ul className="flex text-sm">
                    <li className="me-2">
                      <a href="#" className="hover:underline">
                        <span className="font-semibold text-gray-900">Phone: </span>
                        <span>{customer?.mobile}</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div data-popper-arrow></div>
              </div>
            </div>
            <a href='/login' className='text-gray-600 flex gap-1 items-center cursor-pointer hover:text-blue-500'>
              <BiSolidPencil className='text-sm md:text-lg' />
              <span className='text-xs md:text-sm'>Change</span>
            </a>
          </div>
          <div className='flex gap-4'>
            <h4 className='mb-3 flex gap-1 text-sm md:text-base items-center text-nowrap'><GrLocationPin/>Deliver to:  </h4>
            <address className='text-gray-600 text-xs md:text-sm flex text-wrap flex-wrap'>
              {address?.addressLine1},{address?.addressLine2},{address?.city}, <br /> {address?.state},{address?.country},{address?.pincode}
            </address>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="md:text-2xl text-lg font-semibold mb-2">Cart Items</h2>
        <ul className="divide-y divide-gray-300">
          {cart?.products?.map((item) => (
            <li key={item.product?._id} className="flex text-sm md:text-base justify-between py-2 text-gray-700">
              <span>{item?.product?.title?.length > 20 ? item.product.title.slice(0, 20) + "..." : item.product.title} (x{item.count})</span>
              <span> ₹{item.price * item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg md:text-2xl font-semibold mb-2">Available Coupons</h2>
        <ul className="divide-y divide-gray-300">
          {coupons?.map(coupon => (
            <li key={coupon.name} className="py-2 text-gray-700 flex justify-between gap-2">
              <div className='flex gap-2 items-center'>
              <p className='text-sm relative'>{coupon.name} - {coupon.discount}% off <span className='text-xs text-blue-500 absolute -top-1'>T&C</span></p>
              {/* <span className="text-sm text-gray-500"> (Valid until {new Date(coupon.expiry).toLocaleDateString()})</span> */}
              </div>

              <button
                onClick={() => {setCoupon(coupon.name);setIsCouponApplied(false);}}
                className="text-xs text-blue-600"
              >
                Apply
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-100 p-3 mb-5 rounded-lg">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) =>{
                setCoupon(e.target.value);
                setIsCouponApplied(false);
                setCouponDiscount(0);
                }
            } 
            
            className="p-2 border text-sm border-gray-300 rounded-md flex-grow"
          />
          <button
            onClick={handleApplyCoupon}
            className="ml-2 text-nowrap px-3 py-2 h-fit text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
        {isCouponApplied && <p className="text-green-600">Coupon applied: {appliedCoupon.code} - {appliedCoupon.discount}% off</p>}
      </div>

      {/* Billing Summary */}
      <div className="bg-gray-100 p-4 text-sm md:text-base rounded-lg mb-6">
        <h2 className="md:text-2xl text-lg font-semibold mb-2">Billing Summary</h2>
        <div className="flex justify-between py-1  text-gray-700">
          <span>Subtotal:</span>
          <span> ₹{subTotal}</span>
        </div>
        <div className="flex justify-between py-1 text-gray-700">
          <span>Tax (10%):</span>
          <span> ₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1 text-gray-700">
          <span>Delivery Charges:</span>
          <div className='flex gap-3 items-center'>
          <span className={deliveryCharges > 0 ? 'text-red-600' : 'text-green-600'}> {deliveryCharges > 0 ? `₹${deliveryCharges}` : 'Free'}</span>
          <span className={deliveryCharges === 0 ? 'line-through text-gray-500' : "hidden"}>₹50</span>
          </div>
        </div>
        <div className="flex justify-between py-1 text-gray-700">
          <span>Discount:</span>
          <span>- ₹{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 font-bold text-gray-900">
          <span>Total:</span>
          <p className='flex gap-3 items-center'><span hidden={total + discount === total} className='text-gray-500 line-through font-normal'>₹{(total + discount).toFixed(2)}</span> ₹{total.toFixed(2)}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-100 p-4 text-sm md:text-base rounded-lg mb-6">
        <h2 className="md:text-2xl text-lg font-semibold mb-2">Payment Method</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="card"
              name="payment-method"
              value="Card"
              checked={selectedPaymentMethod === 'Card'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="card" className="text-gray-700">Card</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="upi"
              name="payment-method"
              value="UPI"
              checked={selectedPaymentMethod === 'UPI'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="upi" className="text-gray-700">UPI</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="cash-on-delivery"
              name="payment-method"
              value="Cash on Delivery"
              checked={selectedPaymentMethod === 'Cash on Delivery'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="cash-on-delivery" className="text-gray-700">Cash on Delivery</label>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handleOrder}
        className="w-full px-5 py-2 h-fit bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Place Order
      </button>
        </div>
    </div>
</>
   
  );
};

export default Checkout;
