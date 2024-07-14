import React, { useState } from 'react';
import Container from './Container';
import  SpecialProducts from './SpecialProducts';
import FeaturedCard from './FeaturedCard';

const SwitchableCard = () => {
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
            <option value="featured-products">Featured Products</option>
            <option value="special-products">Special Products</option>
            <option value="featured-collections">Featured Collections</option>
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
              id="featured-collections-tab"
              type="button"
              role="tab"
              aria-controls="featured-collections"
              aria-selected={activeTab === 'featured-collections'}
              className={`inline-block w-full p-4 rounded-se-lg ${activeTab === 'featured-collections' ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'} focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600`}
              onClick={() => handleTabClick('featured-collections')}
            >
              Featured Collections
            </button>
          </li>
        </ul>
        <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
          {activeTab === 'featured-products' && (
            <div className="p-4  rounded-lg md:p-8 dark:bg-gray-800" id="featured-products" role="tabpanel" aria-labelledby="featured-products-tab">
              <Container class1="py-5">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5 gap-4">
                  <div className="col-span-1 bg-black hover:shadow-xl hover:scale-105 transition delay-50 relative">
                    <img className="object-contain" src="/assets/famous-watch.jpg" alt="famous" />
                    <div className="text-light absolute md:top-10 top-4 gap-1 flex flex-col left-3">
                      <h5 className=" text-lg">Rolex Watch</h5>
                      <h6 className="md:text-3xl">Luxury Watch Series 4</h6>
                      <p className="text-base">From $11k or $1.2k/mo. for 12 mo. *</p>
                    </div>
                  </div>
                  <div className="col-span-1 hover:shadow-xl bg-white hover:scale-105 transition delay-50 relative">
                    <img className="object-contain" src="/assets/laptop-1.jpg" alt="famous" />
                    <div className="absolute md:top-10 top-4 gap-1 flex flex-col left-3 text-black">
                      <h5 className="text-lg">MacBook</h5>
                      <h6 className="text-3xl">MacBook Pro Series</h6>
                      <p className="text-base">From $11k or $1.2k/mo. for 12 mo. *</p>
                    </div>
                  </div>
                  <div className="col-span-1 hover:shadow-xl hover:scale-105 transition bg-white delay-50 relative">
                    <img className="object-contain" src="/assets/headphones-3.png" alt="famous" />
                    <div className="absolute md:top-10 top-4 gap-1 flex flex-col left-3 text-black">
                      <h5 className="text-base">Headset</h5>
                      <h6 className="md:text-2xl text-base">Sony Xperia Series 2</h6>
                      <p className="text-base">From $60 with flat 10% cashback</p>
                    </div>
                  </div>
                  <div className="col-span-1 hover:shadow-xl hover:scale-105 transition delay-50 bg-white relative">
                    <img className="object-contain" src="/assets/mobile.jpg" alt="famous" />
                    <div className="absolute md:top-10 top-4 gap-1 flex flex-col left-3 text-dark">
                      <h5 className="text-base">Samsung</h5>
                      <h6 className="md:text-2xl text-base">Samsung Pro Series 9</h6>
                      <p className="text-base">From $300 or $30/mo. for 12 mo. *</p>
                    </div>
                  </div>
                </div>
              </Container>
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
                    <SpecialProducts />
                    <SpecialProducts />
                    <SpecialProducts />
                  </div>
                </div>
              </Container>
            </div>
          )}
          {activeTab === 'featured-collections' && (
            <div className="p-4 rounded-lg dark:bg-gray-800" id="featured-collections" role="tabpanel" aria-labelledby="featured-collections-tab">
              <Container class1="py-5">
                <div className="row">
                  <div className="w-full">
                    <h3 className="section-heading">Featured Collections</h3>
                  </div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 grid-cols-2 flex-wrap gap-3">
                    <FeaturedCard />
                    <FeaturedCard />
                    <FeaturedCard />
                    <FeaturedCard />
                  </div>
                </div>
              </Container>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default SwitchableCard;
