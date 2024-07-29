import './App.scss';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from "./Components/Layout";
import Home from "./Pages/Home"
import Blog from './Pages/Blog';
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import OurStore from './Pages/OurStore';
import CompareProduct from './Pages/CompareProduct';
import Wishlist from './Pages/Wishlist';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword';
import MainBlog from './Pages/MainBlog';
import ShippingPolicy from './Pages/ShippingPolicy'
import ReturnPolicy from './Pages/ReturnPolicy'
import TermsAndConditions from './Pages/TermsAndConditions'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import MainProduct from './Pages/MainProduct';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {checkTokenExpiration} from "./features/user/userSlice"

function App() {
  const dispatch = useDispatch();
const [isLoggedIn,setIsLoggedIn] = useState(false);


  useEffect(() => {
    const res = dispatch(checkTokenExpiration());
    console.log(res);
    if(res){
      setIsLoggedIn(false);
    }
}, []);

const customer = localStorage.getItem('customer') ? JSON.stringify(localStorage.getItem('customer')) : null

useEffect(()=>{
    if(customer){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false);
    }
},[])

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                  <Route index element={<Home />}/>
                  <Route path="store?" element={<OurStore />}/>
                  <Route path="product/:id" element={<MainProduct />}/>
                  <Route path="about" element={<About />}/>
                  <Route path="blogs" element={<Blog />}/>
                  <Route path="blog/:id" element={<MainBlog />}/>
                  <Route path="cart" element={<Cart />}/>
                  <Route path="contact" element={<Contact />}/>
                  <Route path="compare-product" element={<CompareProduct />}/>
                  <Route path="wishlist" element={<Wishlist />}/>
                  <Route path="checkout" element={<Checkout />}/>
                  <Route path="login" element={<Login />}/>
                  <Route path="signup" element={<SignUp />}/>
                  <Route path="forgot-password" element={<ForgotPassword />}/>
                  <Route path="reset-password" element={<ResetPassword />}/>
                  <Route path="terms-and-conditions" element={<TermsAndConditions />}/>
                  <Route path="privacy-policy" element={<PrivacyPolicy />}/>
                  <Route path="return-policy" element={<ReturnPolicy />}/>
                  <Route path="shipping-policy" element={<ShippingPolicy />}/>
                  
                </Route>
              
            </Routes>
        
        </BrowserRouter>
    
    </>
  );
}

export default App;
