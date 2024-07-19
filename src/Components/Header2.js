import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';



  

  

const Header2 = ({productCategories,setHoveredCategory,hoveredCategory,setHoveredSubCategory,hoveredSubCategory}) => {


  return (
    <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 w-full">
      <div className="flex justify-between items-center  mx-auto max-w-screen-xl p-2">
    
        <div  id="mega-menu-full" className="items-center justify-between font-medium flex md:w-auto order-1">
          <ul onMouseLeave={()=>{setHoveredCategory(null)}} className="md:flex  md:p-0 hidden  rounded-lg  space-x-8 rtl:space-x-reverse  mt-0 border-0 bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {productCategories.map((category, index) => (
              <li
                key={index}
                className="relative group "
                onMouseEnter={() => setTimeout(() => setHoveredCategory(category.name), 200)}
                onClick={() => setHoveredCategory(category.name ? null : category.name)}
              >
                <button
                  className="flex flex-col flex-nowrap w-full gap-2 justify-center items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent md:border-0 hover:text-blue-600 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-blue-500 dark:hover:bg-transparent dark:border-gray-700"
                    onMouseEnter={() => setTimeout(() => setHoveredCategory(category.name), 200)}
                    
                >
                  <img className='w-16 h-12' src={category.image} alt={category.name} />
                  <p className='flex items-center justify-center  gap-3 flex-nowrap'>{category.name} <span><FaChevronDown className={`w-3 h-3 ${hoveredCategory === category.name ? 'rotate-180' : ''} transition delay-100 duration-100`} /></span></p>
                </button>
                {hoveredCategory === category.name && (
                  <div className="absolute  z-10 mt-1 w-48 bg-white border border-gray-200  shadow-lg dark:bg-gray-800 dark:border-gray-600">
                    <ul className="py-1 z-10">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <li
                          key={subIndex}
                          className="relative group"
                          onMouseEnter={() => setHoveredSubCategory(subcategory.name)}
                          onMouseLeave={() => setHoveredSubCategory(null)}
                        >
                          <button className=" w-full flex gap-2 items-center justify-between z-10 text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                            {subcategory.name}
                            <FaChevronRight className="ml-2 w-2.5 h-2.5" />
                          </button>
                          {hoveredSubCategory === subcategory.name && (
                            <div className="absolute left-full top-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-600">
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
      </div>
    </nav>
  );
};

export default Header2;
