import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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


const productCategories = [
  {
    name: 'Electronics',
    image: '/assets/electronics-cat.jpg',
    subcategories: [
      {
        name: 'Mobile Phones',
        subcategories: [
          'Smartphones',
          'Feature Phones',
          'Refurbished Phones',
          'Phone Accessories',
          'Mobile Phone Parts',
        ],
      },
      {
        name: 'Laptops',
        subcategories: [
          'Gaming Laptops',
          'Business Laptops',
          '2-in-1 Laptops',
          'MacBooks',
          'Laptop Accessories',
        ],
      },
      {
        name: 'Tablets',
        subcategories: [
          'Android Tablets',
          'iPads',
          'Windows Tablets',
          'Tablet Accessories',
          'Kids Tablets',
        ],
      },
      {
        name: 'Cameras',
        subcategories: [
          'DSLR Cameras',
          'Mirrorless Cameras',
          'Point & Shoot Cameras',
          'Action Cameras',
          'Camera Accessories',
        ],
      },
      {
        name: 'Televisions',
        subcategories: [
          'LED TVs',
          'OLED TVs',
          'QLED TVs',
          'Smart TVs',
          'TV Accessories',
        ],
      },
      {
        name: 'Audio',
        subcategories: [
          'Headphones',
          'Earbuds',
          'Speakers',
          'Soundbars',
          'Home Theater Systems',
        ],
      },
      {
        name: 'Wearables',
        subcategories: [
          'Smartwatches',
          'Fitness Trackers',
          'VR Headsets',
          'Wearable Accessories',
          'Smart Glasses',
        ],
      },
      {
        name: 'Gaming',
        subcategories: [
          'Gaming Consoles',
          'Gaming Laptops',
          'Gaming Accessories',
          'VR Gaming',
          'PC Games',
        ],
      },
      {
        name: 'Home Appliances',
        subcategories: [
          'Refrigerators',
          'Washing Machines',
          'Microwaves',
          'Air Conditioners',
          'Vacuum Cleaners',
        ],
      },
      {
        name: 'Power Banks',
        subcategories: [
          'Portable Chargers',
          'Solar Power Banks',
          'Wireless Power Banks',
          'Power Bank Cases',
          'High Capacity Power Banks',
        ],
      },
    ],
  },
  {
    name: 'Fashion',
    image: '/assets/fashion-cat.jpg',
    subcategories: [
      {
        name: 'Men\'s Clothing',
        subcategories: [
          'Shirts',
          'T-Shirts',
          'Jeans',
          'Jackets',
          'Suits',
        ],
      },
      {
        name: 'Women\'s Clothing',
        subcategories: [
          'Dresses',
          'Tops',
          'Skirts',
          'Pants',
          'Jackets',
        ],
      },
      {
        name: 'Footwear',
        subcategories: [
          'Men\'s Shoes',
          'Women\'s Shoes',
          'Kids\' Shoes',
          'Sports Shoes',
          'Formal Shoes',
        ],
      },
      {
        name: 'Accessories',
        subcategories: [
          'Bags',
          'Watches',
          'Belts',
          'Hats',
          'Sunglasses',
        ],
      },
      {
        name: 'Jewelry',
        subcategories: [
          'Necklaces',
          'Earrings',
          'Rings',
          'Bracelets',
          'Watches',
        ],
      },
      {
        name: 'Kids\' Clothing',
        subcategories: [
          'Boys\' Clothing',
          'Girls\' Clothing',
          'Baby Clothing',
          'School Uniforms',
          'Winter Wear',
        ],
      },
      {
        name: 'Sportswear',
        subcategories: [
          'Men\'s Sportswear',
          'Women\'s Sportswear',
          'Kids\' Sportswear',
          'Yoga Wear',
          'Gym Wear',
        ],
      },
      {
        name: 'Ethnic Wear',
        subcategories: [
          'Sarees',
          'Kurtas & Kurtis',
          'Lehengas',
          'Sherwanis',
          'Dupattas',
        ],
      },
      {
        name: 'Innerwear',
        subcategories: [
          'Men\'s Innerwear',
          'Women\'s Innerwear',
          'Kids\' Innerwear',
          'Lingerie',
          'Socks',
        ],
      },
      {
        name: 'Swimwear',
        subcategories: [
          'Men\'s Swimwear',
          'Women\'s Swimwear',
          'Kids\' Swimwear',
          'Swim Accessories',
          'Beachwear',
        ],
      },
    ],
  },
  {
    name: 'Home & Kitchen',
    image: '/assets/home-cat.webp',
    subcategories: [
      {
        name: 'Furniture',
        subcategories: [
          'Living Room Furniture',
          'Bedroom Furniture',
          'Office Furniture',
          'Outdoor Furniture',
          'Furniture Accessories',
        ],
      },
      {
        name: 'Home Decor',
        subcategories: [
          'Wall Art',
          'Vases',
          'Candles',
          'Photo Frames',
          'Clocks',
        ],
      },
      {
        name: 'Kitchenware',
        subcategories: [
          'Cookware',
          'Bakeware',
          'Kitchen Storage',
          'Kitchen Tools',
          'Kitchen Appliances',
        ],
      },
      {
        name: 'Bedding',
        subcategories: [
          'Bed Sheets',
          'Blankets',
          'Pillows',
          'Mattress Protectors',
          'Bedding Sets',
        ],
      },
      {
        name: 'Bath',
        subcategories: [
          'Towels',
          'Bath Mats',
          'Shower Curtains',
          'Bathroom Accessories',
          'Bathrobes',
        ],
      },
      {
        name: 'Lighting',
        subcategories: [
          'Ceiling Lights',
          'Table Lamps',
          'Wall Lights',
          'Floor Lamps',
          'Outdoor Lighting',
        ],
      },
      {
        name: 'Storage & Organization',
        subcategories: [
          'Closet Storage',
          'Shelving',
          'Storage Boxes',
          'Laundry Storage',
          'Garage Storage',
        ],
      },
      {
        name: 'Garden & Outdoor',
        subcategories: [
          'Garden Furniture',
          'BBQ & Outdoor Dining',
          'Gardening Tools',
          'Outdoor Decor',
          'Planters',
        ],
      },
      {
        name: 'Cleaning Supplies',
        subcategories: [
          'Cleaning Tools',
          'Cleaning Chemicals',
          'Trash & Recycling',
          'Laundry Care',
          'Dishwashing',
        ],
      },
      {
        name: 'Pet Supplies',
        subcategories: [
          'Dog Supplies',
          'Cat Supplies',
          'Bird Supplies',
          'Fish Supplies',
          'Small Animal Supplies',
        ],
      },
    ],
  },
  {
    name: 'Beauty & Personal Care',
    image: '/assets/beauty-cat.jpg',
    subcategories: [
      {
        name: 'Skincare',
        subcategories: [
          'Moisturizers',
          'Cleansers',
          'Toners',
          'Serums',
          'Sunscreens',
        ],
      },
      {
        name: 'Hair Care',
        subcategories: [
          'Shampoos',
          'Conditioners',
          'Hair Treatments',
          'Hair Styling',
          'Hair Accessories',
        ],
      },
      {
        name: 'Makeup',
        subcategories: [
          'Face Makeup',
          'Eye Makeup',
          'Lip Makeup',
          'Makeup Tools',
          'Makeup Removers',
        ],
      },
      {
        name: 'Fragrances',
        subcategories: [
          'Perfumes',
          'Body Sprays',
          'Deodorants',
          'Fragrance Sets',
          'Home Fragrances',
        ],
      },
      {
        name: 'Bath & Body',
        subcategories: [
          'Body Wash',
          'Body Lotion',
          'Hand Care',
          'Foot Care',
          'Body Scrubs',
        ],
      },
      {
        name: 'Men\'s Grooming',
        subcategories: [
          'Shaving',
          'Beard Care',
          'Hair Care',
          'Skincare',
          'Body Care',
        ],
      },
      {
        name: 'Oral Care',
        subcategories: [
          'Toothpaste',
          'Toothbrushes',
          'Mouthwash',
          'Dental Floss',
          'Teeth Whitening',
        ],
      },
      {
        name: 'Tools & Accessories',
        subcategories: [
          'Hair Tools',
          'Skincare Tools',
          'Makeup Tools',
          'Manicure & Pedicure Tools',
          'Bath Accessories',
        ],
      },
      {
        name: 'Wellness',
        subcategories: [
          'Supplements',
          'Vitamins',
          'Essential Oils',
          'Massage & Relaxation',
          'Fitness Equipment',
        ],
      },
      {
        name: 'Feminine Care',
        subcategories: [
          'Sanitary Pads',
          'Tampons',
          'Menstrual Cups',
          'Intimate Washes',
          'Panty Liners',
        ],
      },
    ],
  },
];

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdown,setDropDown] = useState(false)

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrop = ()=>{
    setDropDown(!dropdown)
  }

const customer = localStorage.getItem('customer') ? JSON.stringify(localStorage.getItem('customer')) : null

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = ()=>{
   if(customer){
    dispatch(logout())
   }
  } 

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
                  
                  {isLoggedIn ?
                    
                    <button onClick={handleLogout}  className="flex items-center gap-2 text-black">
                      <IoIosLogOut className='text-xl text-orange-800'/>
                      <p className="mb-0">Logout</p>
                    </button>

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


    <Header2 
      productCategories={productCategories}
      hoveredCategory={hoveredCategory} 
      setHoveredCategory={setHoveredCategory}
      hoveredSubCategory={hoveredSubCategory}
      setHoveredSubCategory={setHoveredSubCategory}
      />


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
            <Link className="text-black border-0 font-semibold text-3xl" to="/">
              Shopnow
            </Link>
          </div>
          <div className="bg-gray-200 mb-4 px-2 flex border items-center">
            <input
              type="text"
              className=" py-2 w-full bg-inherit focus:outline-none rounded-md pl-4"
              placeholder="Search Product"
              aria-label="Search Product"
              // aria-describedby="basic-addon2"
            />
            <span id="basic-addon2">
              <BsSearch className="text-black" />
            </span>
          </div>
          
          <div className="flex gap-3 mb-4  justify-between">
              <Link to="/wishlist" className="flex flex-col items-center gap-1 text-black">
                <img src="/images/wishlist.svg" className="w-6" alt="wishlist" />
                <p className="mb-0">WishList</p>
              </Link>
           
              <Link to="/cart" className="flex flex-col items-center gap-1 text-black">
                <img src="/images/cart.svg" className="w-6" alt="cart" />
                <div className="flex gap-1">
                  <p className="mb-0">$ 500</p>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                onMouseLeave={()=>{setHoveredCategory(null)}}
                  id="doubleDropdown"
                  className={` ${dropdown ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700`}
                >
                  {/* <Header2 /> */}
                  <ul  className=" md:p-0  rounded-lg  space-x-8 rtl:space-x-reverse  mt-0 border-0 bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {productCategories.map((category, index) => (
                      <li
                        key={index}
                        className="relative group "
                        onMouseEnter={() => setHoveredCategory(category.name)}
                        onClick={() => setHoveredCategory(category.name ? null : category.name)}
                      >
                        <button
                          className="flex flex-col flex-nowrap w-full gap-2 justify-start  items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent md:border-0 hover:text-blue-600 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-blue-500 dark:hover:bg-transparent dark:border-gray-700"
                            onMouseEnter={() => setTimeout(() => setHoveredCategory(category.name), 200)}
                            
                        >
                          {/* <img className='w-16 h-12' src={category.image} alt={category.name} /> */}
                          <p className='flex items-center justify-center  gap-3 flex-nowrap'>{category.name} <span><FaChevronDown className={`w-3 h-3 ${hoveredCategory === category.name ? 'rotate-180' : ''} transition delay-100 duration-100`} /></span></p>
                        </button>
                        {hoveredCategory === category.name && (
                          <div className=" z-10 mt-1 w-48 bg-white border border-gray-200  shadow-lg dark:bg-gray-800 dark:border-gray-600">
                            <ul className="py-1 z-10">
                              {category.subcategories.map((subcategory, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="relative group"
                                  onMouseEnter={() => setHoveredSubCategory(subcategory.name)}
                                  onMouseLeave={() => setHoveredSubCategory(null)}
                                >
                                  <button className=" w-full flex gap-2 items-center justify-between z-10 text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    {/* {subcategory.name} */}
                                    <p className='flex items-center justify-center  gap-3 flex-nowrap'>{subcategory.name} <span><FaChevronDown className={`w-3 h-3 ${hoveredSubCategory === subcategory.name ? 'rotate-180' : ''} transition delay-100 duration-100`} /></span></p>
                                    {/* <FaChevronRight className="ml-2 w-2.5 h-2.5 hover:rotate-90 transition delay-50" /> */}
                                  </button>
                                  {hoveredSubCategory === subcategory.name && (
                                    <div className="right-full mt-1 w-48 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-600">
                                      <ul className="py-1">
                                        {subcategory.subcategories.map((subSubCategory, subSubIndex) => (
                                          <li key={subSubIndex}>
                                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                              {subSubCategory}
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </NavLink>
            <NavLink to="/blogs" className="text-black">BLOGS</NavLink>
            <NavLink to="/contact" className="text-black">CONTACT</NavLink>
          </nav>
        </div>
      </div>
    </nav>
  );
}

export default Header;
