import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IoHomeSharp, IoLogOut } from "react-icons/io5";
import { FaRegHeart,FaShoppingCart,FaRegUserCircle,  FaHandHoldingHeart, FaStore, FaBlog } from "react-icons/fa";
import { FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart, logout } from '../features/user/userSlice';
import { BsBox } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { BiLogIn, BiLogInCircle, BiSupport } from "react-icons/bi";




const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdown,setDropDown] = useState(false);
  const [paginate, setPaginate] = useState(true);
  const [productOpts, setProductOpts] = useState([]);
  const navigate = useNavigate();


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrop = ()=>{
    setDropDown(!dropdown)
  }

const customer = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  const handleLogout = ()=>{
   if(customer){
    dispatch(logout())
   }
  }

  const cart = useSelector((state) => state?.auth?.cart);
  useEffect(()=>{
    dispatch(getUserCart());
  },[])

  const productState = useSelector((state) => state?.product?.products);

  useEffect(()=>{
    let data = [];
    for(let i=0;i<productState.length;i++){
      let element = productState[i];
      data.push({
        key:i,
        product:element._id,
        name:element.title,
      })
      setProductOpts(data);
    }
    setProductOpts(data)

  },[productState])

  return (
    <nav className="flex flex-col gap-3">
      <div className="flex flex-nowrap justify-between  bg-white border-gray-200  dark:bg-gray-900  md:justify-center items-center gap-3 px-2 py-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/assets/shopme_logo.png" className="w-32" alt="Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span> */}
        </Link>
        <div className="flex md:order-2 md:hidden">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            onClick={toggleSidebar}
          >
            <AiOutlineMenu className="w-5 h-5" />
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div
          className={`items-center  hidden w-full md:flex md:w-full md:order-1 ${sidebarOpen ? 'block' : 'hidden'}`}
          id="navbar-search"
        >
          
            <div className='w-full flex gap-3 justify-between flex-nowrap'>
                <div className='flex gap-3 text-gray-700 font-semibold'>
                <NavLink className="flex gap-2 items-center " to="/"><IoHomeSharp className='text-lg text-orange-800'/> Home</NavLink>
                  <NavLink className="flex gap-2 items-center " to="/store"><FaStore className='text-lg text-orange-800'/> Store</NavLink>
                  <NavLink className="flex gap-2 items-center" to="/blogs"><FaBlog className='text-lg text-orange-800'/> Blogs</NavLink>
                  
                </div>


                <div className=" hidden w-full md:flex gap-2   border border-gray-300 bg-gray-50 text-sm text-gray-900  ">
                    
                    <Typeahead
                      id="pagination-example"
                      // onPaginate={() => console.log('Results paginated')}
                      options={productOpts}
                      minLength={2}
                      onChange={(selected)=>{
                          navigate(`/product/${selected[0]?.product}`)
                          window.location.reload();
                          selected=null;

                      }}
                      paginate={paginate}
                      labelKey={"name"}
                      placeholder="Search Products..."
                      className='w-full' 
                    />
                    <div className="lg:flex items-center px-2 hidden">
                      <BsSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span className="sr-only">Search icon</span>
                    </div>
                  </div>
                
                <ul className="flex flex-col md:p-0 md:gap-3  font-medium  rounded-lg bg-gray-50  md:flex-row md:items-center md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              
                  
                    {/* <Link to="/compare-product" className="flex items-center gap-2 text-black">
                      <IoGitCompareOutline className='text-xl text-orange-800' />
                      <p className="mb-0">Compare</p>
                    </Link> */}
                  
               
                    <Link to="/wishlist" className="flex items-center gap-2 text-black">
                      <FaRegHeart  className='text-xl text-orange-800'/> 
                      <p className="mb-0">WishList</p>
                    </Link>
                  
                    <Link to="/cart" className="flex items-center gap-2 text-black">
                      <FaShoppingCart className='text-xl text-orange-800'/>
                      <p className="mb-0">Cart</p>
                      
                    </Link>
                  
                  {isLoggedIn ?
                    
                    <div className="relative">
                        <button
                          id="dropdownAvatarNameButton"
                          onClick={toggleDropdown}
                          className="flex items-center w-6 text-sm font-medium text-gray-900 border-0"
                          type="button"
                        >
                          <span className="sr-only">Open user menu</span>
                          <img className="rounded-full border-1 border-orange-800" src="/assets/profile.png" alt="user" />
                          <FaChevronDown className="w-2.5 h-2.5 text-black"  />
                        </button>

                        {isOpen && (
                          <div
                            id="dropdownAvatarName"
                            className="absolute z-10 right-0 top-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                          >
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              <div className="font-medium">{customer?.firstName?.toUpperCase().slice(0,1) + customer?.firstName?.slice(1) + " " + customer?.lastName?.toUpperCase().slice(0,1) + customer?.lastName?.slice(1)}</div>
                              <div className="truncate">{customer?.email}</div>
                            </div>
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownAvatarNameButton"
                            >
                              <li>
                                <a
                                  href="/"
                                  className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <FaUser className='text-orange-800' /> Profile
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/orders"
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <BsBox className=' text-orange-800' /> Orders
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/contact"
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <BiSupport className='text-lg text-orange-800'/> Help & Support
                                </a>
                              </li>
                            </ul>
                            <div className="py-2">
                              <button
                                onClick={handleLogout}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Sign out
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    :

                        <Link to="/login" className="flex items-center gap-2 text-black">
                        <FaRegUserCircle className='text-xl text-orange-800'/>
                        <p className="mb-0">Login</p>
                      </Link>
                  }
                   
                
                
                </ul>
            </div>

        </div>
      </div>


     

    <div className='w-full p-3 bg-white px-2  md:hidden  items-center flex gap-0'>
        
            <Typeahead
                id="pagination-example"
                onPaginate={() => console.log('Results paginated')}
                options={productOpts}
                onChange={(selected)=>{
                  navigate(`/product/${selected[0]?.product}`)
                  window.location.reload();
                  selected=null;
                }}
                minLength={2}
                paginate={paginate}
                labelKey={"name"}
                placeholder="Search Products..."
                className='w-full bg-white' 
              />
            {/* <div className="border inset-0 rounded-r inset-y-0 start-0 flex items-center ps-3 pointer-events-none"> */}
              <BsSearch className="w-5 h-5 absolute right-5 text-gray-500 dark:text-gray-400" />
            {/* </div> */}
    </div>


      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 bg-black bg-opacity-50 z-40`} onClick={toggleSidebar}></div>
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-scroll md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out`}>
        <div className="p-3 relative text-gray-600">
        <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 absolute right-0 top-0 p-3"
            onClick={toggleSidebar}
          >
            <AiOutlineClose className='hover:text-black text-xl' />
            <span className="sr-only">Open main menu</span>
          </button>

          <div className="mb-">
            <Link className="text-black mb-3 border-0 font-semibold text-3xl" to="/">
            <img src="/assets/shopme_logo.png" className="w-24" alt="Logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span> */}
            </Link>
          </div>
         
          <div className='flex flex-col gap-3'>
           
              {isLoggedIn ?
                    
                      <div className='flex flex-col gap-2'>

                        <div className='flex flex-col gap-1 mb-3'>
                            <h3 className='text-lg font-semibold'>Hey! <span className='text-blue-700 italic'>{customer?.firstName?.toUpperCase().slice(0,1) + customer?.firstName?.slice(1) + " " + customer?.lastName?.toUpperCase().slice(0,1) + customer?.lastName?.slice(1)}</span></h3>
                            <p className='text-sm text-gray-500'>Welcome to <a href='/' className='text-orange-800 font-bold font-mono'>Shopme</a></p>
                        </div>
                            
                          <ul
                            className=" text-gray-700 flex gap-2 justify-between "
                          >
                                <li className='px-3 text-sm py-1 w-full hover:bg-gray-100 hover:border-orange-800 border-1 border-gray-300'>
                                  <a
                                    href="/"
                                    className="flex gap-2 items-center  "
                                  >
                                    <FaUser className='text-orange-800'/> <span className='text-sm font-semibold' >Profile</span>
                                  </a>
                                </li>

                                <li className='px-3 text-sm py-1 w-full hover:bg-gray-100 hover:border-orange-800  border-1 border-gray-300'>
                                  <a
                                    href="/wishlist"
                                    className="flex gap-2 items-center hover:bg-gray-100 "
                                  >
                                    <FaHandHoldingHeart className='text-orange-800' /> <span className='text-sm font-semibold' >Wishlist</span>
                                  </a>
                                </li>
                            </ul>

                          <ul
                              className=" text-gray-700 flex  justify-between gap-2 dark:text-gray-200"
                            >
                                <li className='px-3 text-sm py-1 w-full hover:bg-gray-100 hover:border-orange-800 border-1 border-gray-300'>
                                  <a
                                    href="/cart"
                                    className="flex gap-2 items-center  hover:bg-gray-100 "
                                  >
                                    <FaShoppingCart className='text-orange-800'/> <span className='text-sm font-semibold' >Cart</span>
                                  </a>
                                </li>

                                <li className='px-3 text-sm py-1 w-full hover:bg-gray-100 hover:border-orange-800  border-1 border-gray-300'>
                                  <a
                                    href="/orders"
                                    className="flex gap-2 items-center hover:bg-gray-100 "
                                  >
                                    <BsBox className='text-orange-800' /> <span className='text-sm font-semibold' >Orders</span>
                                  </a>
                                </li>
                            </ul>
                      </div>
                        :
                    
                        <div className='flex flex-col gap-2 mb-3'>
                            <h3 className='text-lg font-semibold text-black'>Hey <span className='text-blue-700 italic'>Guest!</span></h3>
                            <p className='text-sm text-gray-500'>Welcome to <a href='/' className='text-orange-800 font-bold text-lg font-mono'>Shopme</a></p>
                            <p className='text-sm'><a className='text-orange-800 font-bold' href="/login">Login</a> or <a className='text-orange-800 font-bold' href="/signup">Register</a> to access your account.</p>
                        </div>
                  }
            
                <nav className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
                  <NavLink className="flex gap-3 items-center hover:bg-gray-200 px-3 rounded py-2" to="/"><IoHomeSharp className='text-lg text-orange-800'/> Home</NavLink>
                  <NavLink className="flex gap-3 items-center hover:bg-gray-200 px-3 rounded py-2" to="/store"><FaStore className='text-lg text-orange-800'/> Store</NavLink>
                  <NavLink className="flex gap-3 items-center hover:bg-gray-200 px-3 rounded py-2" to="/blogs"><FaBlog className='text-lg text-orange-800'/> Blogs</NavLink>
                  <NavLink className="flex gap-3 items-center hover:bg-gray-200 px-3 rounded py-2" to="/contact"><BiSupport className='text-lg text-orange-800'/> Help & Support</NavLink>
                {isLoggedIn && <button onClick={handleLogout} className="flex gap-3 hover:bg-gray-200 px-3 rounded py-2 items-center" to="/store"><IoLogOut className='text-xl text-orange-800'/>Logout</button> }
                </nav>
            </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
