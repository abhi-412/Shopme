import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart,FaShoppingCart,FaRegUserCircle, FaChevronRight } from "react-icons/fa";
import { FiMenu } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import Header2 from './Header2';
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { BsBox } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';




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
      <div className="flex flex-nowrap justify-between bg-white border-gray-200  dark:bg-gray-900  md:justify-center items-center gap-5 px-2 py-4">
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
          className={`items-center justify-between hidden w-full md:flex md:w-full md:order-1 ${sidebarOpen ? 'block' : 'hidden'}`}
          id="navbar-search"
        >
          
            <div className='w-full flex gap-3 flex-nowrap'>
                <ul className="flex flex-col md:p-0  font-medium text-md  rounded-lg bg-gray-50  md:flex-row md:gap-4 md:items-center md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <NavLink to="/" className="text-black">Home</NavLink>
                  <NavLink to="/store" className="text-black">Store</NavLink>
                  {/* <NavLink to="/about" className="text-black">Categories</NavLink> */}
                  <NavLink to="/blogs" className="text-black">Blogs</NavLink>
                  <NavLink to="/contact" className="text-black">Contact</NavLink>
                  
                </ul>


                <div className=" hidden md:flex gap-2 w-full  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    
                    <Typeahead
                      id="pagination-example"
                      onPaginate={() => console.log('Results paginated')}
                      options={productOpts}
                      onChange={(selected)=>{
                          navigate(`/product/${selected[0]?.product}`)
                          window.location.reload();
                          selected=null;

                      }}
                      paginate={paginate}
                      labelKey={"name"}
                      placeholder="Search Products..."
                      className='w-full relative border-0' 
                    />
                    <div className="flex items-center px-2 pointer-events-none">
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
                          <img className="rounded-full border border-black" src="/assets/profile.png" alt="user" />
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
                                  href="/:id"
                                  className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <FaUser /> Profile
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/orders"
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <BsBox /> Orders
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Become a seller
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


     

    <div className='w-full py-2 bg-gray-100 px-2  md:hidden  items-center flex gap-0'>
        
            <Typeahead
                id="pagination-example"
                onPaginate={() => console.log('Results paginated')}
                options={productOpts}
                onChange={(selected)=>{
                  navigate(`/product/${selected[0]?.product}`)
                  window.location.reload();
                  selected=null;
                }}
                paginate={paginate}
                labelKey={"name"}
                placeholder="Search Products..."
                className='w-full relative border-r-0 rounded-r-none' 
              />
            {/* <div className="border inset-0 rounded-r inset-y-0 start-0 flex items-center ps-3 pointer-events-none"> */}
              <BsSearch className="w-5 h-5 absolute right-6 bg-gray-50 text-gray-500 dark:text-gray-400" />
            {/* </div> */}
    </div>


      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 bg-black bg-opacity-50 z-40`} onClick={toggleSidebar}></div>
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-scroll md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out`}>
        <div className="p-4 relative">
        <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 absolute right-0 top-0 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-xl p-2.5 me-1"
            onClick={toggleSidebar}
          >
            <AiOutlineClose />
            <span className="sr-only">Open main menu</span>
          </button>
          <div className="mb-4">
            <Link className="text-black mb-3 border-0 font-semibold text-3xl" to="/">
              Shopnow
            </Link>
          </div>
         
          
          <div className="flex gap-3 mb-4  justify-between">
              <Link to="/wishlist" className="flex flex-col items-center gap-1 text-black">
                <img src="/images/wishlist.svg" className="w-6" alt="wishlist" />
                <p className="mb-0">WishList</p>
              </Link>
           
              <Link to="/cart" className="flex flex-col items-center gap-1 text-black">
                <img src="/images/cart.svg" className="w-6" alt="cart" />
                <div className="flex gap-1">
                  <p className="mb-0 flex">$ 500</p>
                </div>
              </Link>
           
              {isLoggedIn ?
                    
                    <button onClick={handleLogout}   className="flex items-center gap-2 text-black">
                      <IoIosLogOut className='text-xl text-orange-800'/>
                      <p className="mb-0">Logout</p>
                    </button>

                    :

                        <Link to="/login" className="flex items-center gap-2 text-black">
                        <FaRegUserCircle className='text-xl text-orange-800'/>
                        <p className="mb-0">Login</p>
                      </Link>
                  }
            
          </div>
          <nav className="flex flex-col gap-3 mb-4">
            <NavLink to="/" className="text-black">HOME</NavLink>
            <NavLink to="/store" className="text-black">STORE</NavLink>
           
            <NavLink to="/blogs" className="text-black">BLOGS</NavLink>
            <NavLink to="/contact" className="text-black">CONTACT</NavLink>
          </nav>
        </div>
      </div>
    </nav>
  );
}

export default Header;
