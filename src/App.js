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
import { PrivateRoutes } from './routing/privateRoutes';
import { OpenRoutes } from './routing/openRoutes';
import Address from './Pages/Address';
import Orders from './Pages/Orders';
import OrderDetails from './Pages/OrderDetails';

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
                  <Route path="cart" element={<PrivateRoutes><Cart /></PrivateRoutes> }/>
                  <Route path="orders" element={<PrivateRoutes><Orders /></PrivateRoutes> }/>
                  {/* <Route path="orders/:orderId" element={<PrivateRoutes><OrderDetails /></PrivateRoutes> }/> */}
                  <Route path="contact" element={<Contact />}/>
                  <Route path="compare-product" element={<CompareProduct />}/>
                  <Route path="wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>}/>
                  <Route path="login" element={<Login />}/>
                  <Route path="signup" element={<OpenRoutes><SignUp /></OpenRoutes>}/>
                  <Route path="forgot-password" element={<ForgotPassword />}/>
                  <Route path="reset-password" element={<PrivateRoutes><ResetPassword /></PrivateRoutes>}/>
                  <Route path="terms-and-conditions" element={<TermsAndConditions />}/>
                  <Route path="privacy-policy" element={<PrivacyPolicy />}/>
                  <Route path="return-policy" element={<ReturnPolicy />}/>
                  <Route path="shipping-policy" element={<ShippingPolicy />}/>
                  
                </Route>
                <Route path="cart/information" element={<PrivateRoutes><Address /></PrivateRoutes> }/>
                <Route path="checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>}/>
              
            </Routes>
        
        </BrowserRouter>
    
    </>
  );
}

export default App;
