import React, { useEffect, useRef, useState } from 'react';
import { getUserCart } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidPencil } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { GrLocationPin } from "react-icons/gr";
import { getCoupons } from '../features/coupon/couponSlice';

// Dummy Data
const cartItems = [
  { id: 1, name: 'Product 1', price: 200, quantity: 2 },
  { id: 2, name: 'Product 2', price: 150, quantity: 1 },
];

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  address: '123 Main St, City, Country',
};

// Function to calculate total cost
const calculateTotalCost = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const Checkout = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card');
    const [coupon, setCoupon] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [taxes] = useState(0.1); // 10% tax
    const [deliveryCharges,setDeliveryCharges] = useState(50); // Fixed delivery charge
    const [CouponDiscount, setCouponDiscount] = useState(0);

  const dispatch = useDispatch();
  
  // Calculate subtotal, tax, discount, total


  const handleApplyCoupon = (c) => {
    const couponData = coupons.find(c => c.name === coupon);
    console.log(couponData && new Date(couponData.expiry) > new Date());
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


  
  const location = useLocation();
  const address = location?.state?.address;
  const customer = JSON.parse(localStorage.getItem('customer'));

  useEffect(() => {
    dispatch(getUserCart());
    dispatch(getCoupons());
    setCoupons(Curcoupons)

  }, [dispatch]);

  const cart = useSelector((state) => state.auth.cart);
  const Curcoupons = useSelector((state) => state.coupon?.coupons);

//   useEffect(() => {
//     const validCoupons = coupons.filter(c => new Date(c.expiry) > new Date());
//     setValidCoupons(validCoupons);
//   }, [coupons]);

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
  return (
    <div className="p-5 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* User Details */}
      <div className=" bg-gray-100 mb-4 p-3">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-xl">Contact Information</h4>
          <div className='flex gap-4'>
            <div className='flex gap-1'>
              <p className=" text-gray-500">{customer?.firstName?.toUpperCase().slice(0,1) + customer?.firstName?.slice(1)} {customer?.lastName?.toUpperCase().slice(0,1) + customer?.lastName?.slice(1)}</p>
              <button 
                ref={buttonRef}
                onMouseOver={togglePopover}
                className="cursor-pointer"
              >
                <p className='text-gray-500'>({customer?.email})</p>
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
              <BiSolidPencil className='text-lg' />
              <span className='text-sm'>Change</span>
            </a>
          </div>
          <div className='flex gap-4'>
            <h4 className='mb-3 flex gap-1 items-center'><GrLocationPin/>Deliver to:  </h4>
            <address className='text-gray-600'>
              {address?.addressLine1},{address?.addressLine2},{address?.city},{address?.state},{address?.country},{address?.pincode}
            </address>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cart Items</h2>
        <ul className="divide-y divide-gray-300">
          {cart?.products?.map((item) => (
            <li key={item.product_id} className="flex justify-between py-2 text-gray-700">
              <span>{item?.product?.title?.length > 20 ? item.product.title.slice(0, 20) + "..." : item.product.title} (x{item.count})</span>
              <span> ₹{item.price * item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-2">Available Coupons</h2>
        <ul className="divide-y divide-gray-300">
          {coupons.map(coupon => (
            <li key={coupon.name} className="py-2 text-gray-700 flex justify-between gap-2">
              <div className='flex gap-2 items-center'>
              <span>{coupon.name} - {coupon.discount}% off</span>
              <span className="text-sm text-gray-500"> (Expires on {new Date(coupon.expiry).toLocaleDateString()})</span>
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

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) =>{
                setCoupon(e.target.value);
                setIsCouponApplied(false);
                }
            } 
            
            className="p-2 border border-gray-300 rounded-md flex-grow"
          />
          <button
            onClick={handleApplyCoupon}
            className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Coupon
          </button>
        </div>
        {isCouponApplied && <p className="text-green-600">Coupon applied: {appliedCoupon.code} - {appliedCoupon.discount}% off</p>}
      </div>

      {/* Billing Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-2">Billing Summary</h2>
        <div className="flex justify-between py-1 text-gray-700">
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
          <p className='flex gap-3 items-center'><span className='text-gray-500 line-through font-normal'>₹{(total + discount).toFixed(2)}</span> ₹{total.toFixed(2)}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="credit-card"
              name="payment-method"
              value="Credit Card"
              checked={selectedPaymentMethod === 'Credit Card'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="credit-card" className="text-gray-700">Credit Card</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="paypal"
              name="payment-method"
              value="PayPal"
              checked={selectedPaymentMethod === 'PayPal'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="paypal" className="text-gray-700">PayPal</label>
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
        onClick={() => alert('Order placed successfully!')}
        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
