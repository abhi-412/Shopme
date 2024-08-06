import React, { useState } from 'react';
import Container from './Container';
import  SpecialProducts from './SpecialProducts';
import FeaturedCard from './FeaturedCard';

const SwitchableCard = ({featuredProducts,specialProducts,popularProducts}) => {
    const [activeTab, setActiveTab] = useState('featured-products');
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div className="w-full flex justify-center flex-col gap-4 my-5 py-6 items-center  border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select tab</label>
          <select
            id="tabs"
            className="bg-gray-200 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleTabClick(e.target.value)}
          >
            <option value="popular-products">Popular This Week</option>
            <option value="special-products">Special Products</option>
            <option value="popular-products">Featured Products</option>
          </select>
        </div>
        <ul
          className="hidden w-3/4 text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
          id="fullWidthTab"
          role="tablist"
        >
          <li className="w-full">
            <button
              id="featured-products-tab"
              type="button"
              role="tab"
              aria-controls="featured-products"
              aria-selected={activeTab === 'featured-products'}
              className={`inline-block w-full p-4 rounded-ss-lg ${activeTab === 'featured-products'  ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'} focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => handleTabClick('featured-products')}
            >
              Featured Products
            </button>
          </li>
          <li className="w-full">
            <button
              id="special-products-tab"
              type="button"
              role="tab"
              aria-controls="special-products"
              aria-selected={activeTab === 'special-products'}
              className={`inline-block w-full p-4 ${activeTab === 'special-products' ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'} focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => handleTabClick('special-products')}
            >
              Special Products
            </button>
          </li>
          <li className="w-full">
            <button
              id="popular-products-tab"
              type="button"
              role="tab"
              aria-controls="popular-products"
              aria-selected={activeTab === 'popular-products'}
              className={`inline-block w-full p-4 rounded-se-lg ${activeTab === 'popular-products' ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'} focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => handleTabClick('popular-products')}
            >
              Popular Products
            </button>
          </li>
        </ul>
        <div id="fullWidthTabContent" className="border-t w-full border-gray-200 dark:border-gray-600">
          {activeTab === 'popular-products' && (
            <div className="flex justify-center w-full rounded-lg dark:bg-gray-800" id="popular-products" role="tabpanel" aria-labelledby="popular-products-tab">
            <div className="p-5">
              
                <div className="w-full">
                  <h3 className="section-heading">Popular Products</h3>
                </div>
                <div className="flex justify-start flex-wrap gap-3">
                  {popularProducts?.map((product) => (
                    <FeaturedCard key={product.id} product={product} />
                  ))}
                </div>
           
            </div>
          </div>
          )}
          {activeTab === 'special-products' && (
            <div className="p-4  rounded-lg md:p-8 dark:bg-gray-800" id="special-products" role="tabpanel" aria-labelledby="special-products-tab">
              <Container class1="py-5">
                <div className="row">
                  <div className="w-full">
                    <h3 className="section-heading">Special Products</h3>
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-2 gap-3">
                    {specialProducts?.map((product) => (
                      <SpecialProducts key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </Container>
            </div>
          )}
          {activeTab === 'featured-products' && (
            <div className="flex justify-center w-full rounded-lg dark:bg-gray-800" id="featured-products" role="tabpanel" aria-labelledby="featured-products-tab">
              <div className="p-5">
                
                  <div className="w-full">
                    <h3 className="section-heading">Featured Products</h3>
                  </div>
                  <div className="flex justify-start flex-wrap gap-3">
                    {featuredProducts?.map((product) => (
                      <FeaturedCard key={product.id} product={product} />
                    ))}
                  </div>
             
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default SwitchableCard;
