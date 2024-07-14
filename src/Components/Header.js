import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart,FaShoppingCart,FaRegUserCircle } from "react-icons/fa";



const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdown,setDropDown] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrop = ()=>{
    setDropDown(!dropdown)
  }

  return (
    <nav className="bg-white border-gray-200  dark:bg-gray-900">
      <div className="flex flex-nowrap justify-between md:justify-center items-center gap-5 px-2 py-4">
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
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <BsSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
            <div className='w-full flex gap-3 flex-nowrap'>
                <ul className="flex flex-col md:p-0  font-medium text-md  rounded-lg bg-gray-50  md:flex-row md:gap-4 md:items-center md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <NavLink to="/" className="text-black">Home</NavLink>
                  <NavLink to="/store" className="text-black">Store</NavLink>
                  {/* <NavLink to="/about" className="text-black">Categories</NavLink> */}
                  <NavLink to="/blogs" className="text-black">Blogs</NavLink>
                  <NavLink to="/contact" className="text-black">Contact</NavLink>
                  
                </ul>


                <div className=" hidden md:flex gap-2 w-full  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <div className="flex items-center px-2 pointer-events-none">
                      <BsSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span className="sr-only">Search icon</span>
                    </div>
                    <input
                      type="text"
                      id="search-navbar"
                      className="w-full px-3 py-2.5 bg-gray-200 focus:outline-none"
                      placeholder="Search..."
                    />
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
                  
                    <Link to="/login" className="flex items-center gap-2 text-black">
                      <FaRegUserCircle className='text-xl text-orange-800'/>
                      <p className="mb-0">Login</p>
                    </Link>
                
                
                </ul>
            </div>

        </div>
      </div>
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 bg-black bg-opacity-50 z-40`} onClick={toggleSidebar}></div>
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out`}>
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
            <Link className="text-black border-0 font-semibold text-3xl" to="/">
              Shopnow
            </Link>
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              className="form-control py-2 w-full border rounded-md pl-4"
              placeholder="Search Product"
              aria-label="Search Product"
              aria-describedby="basic-addon2"
            />
            <span className="absolute right-0 top-0 bg-amber-800 p-3 rounded-r-md" id="basic-addon2">
              <BsSearch className="text-white" />
            </span>
          </div>
          <nav className="flex flex-col gap-3 mb-4">
            <NavLink to="/" className="text-black">HOME</NavLink>
            <NavLink to="/store" className="text-black">STORE</NavLink>
            <NavLink>
                <button
                  onClick={handleDrop}
                  id="doubleDropdownButton"
                  data-dropdown-toggle="doubleDropdown"
                  data-dropdown-placement="right-start"
                  type="button"
                  className="flex items-center justify-start w-full py-2 "
                >
                  Categories
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="doubleDropdown"
                  className={` ${dropdown ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700`}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                    <li>
                      <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Overview
                      </a>
                    </li>
                    <li>
                      <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        My downloads
                      </a>
                    </li>
                    <li>
                      <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Billing
                      </a>
                    </li>
                    <li>
                      <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                        Rewards
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Sign out
                    </a>
                  </div>
                </div>
              </NavLink>
            <NavLink to="/blogs" className="text-black">BLOGS</NavLink>
            <NavLink to="/contact" className="text-black">CONTACT</NavLink>
          </nav>
          <div className="flex flex-col gap-3">
            <div>
              <Link to="/compare-product" className="flex items-center gap-3 text-black">
                <img src="/images/compare.svg" className="w-6" alt="compare" />
                <p className="mb-0">Compare</p>
              </Link>
            </div>
            <div>
              <Link to="/wishlist" className="flex items-center gap-3 text-black">
                <img src="/images/wishlist.svg" className="w-6" alt="wishlist" />
                <p className="mb-0">WishList</p>
              </Link>
            </div>
            <div>
              <Link to="/cart" className="flex items-center gap-3 text-black">
                <img src="/images/cart.svg" className="w-6" alt="cart" />
                <div className="flex flex-col">
                  <span className="badge bg-black text-white">0</span>
                  <p className="mb-0">$ 500</p>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/login" className="flex items-center gap-3 text-black">
                <img src="/assets/login.svg" className="w-6" alt="signUp" />
                <p className="mb-0">Login</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
