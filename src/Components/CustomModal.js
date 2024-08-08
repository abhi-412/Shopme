import React, { useState } from 'react';

const CustomModel = (props) => {
const {toggleModal,isOpen,onOk,product,total,count,color,size} = props
  return (
    <>
      {isOpen && (
        <div 
          id="progress-modal" 
          tabIndex="1" 
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button 
                type="button" 
                onClick={toggleModal} 
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5">
                <div className='w-full flex justify-center items-center'>
                <img src={product?.images?.length > 0 ? product?.images[0]?.url : "/assets/watch.jpg"} className="object-contain" alt="" />

                </div>
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{product?.title?.length >20 ? product?.title?.slice(0,20) + "..." : product?.title}</h3>
                <div>
                  <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Color : <span className={`text-${color?.toLowerCase()}-500`}>{color}</span></p>
                  <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Size : <span className='font-semibold text-black'>{size}</span></p>
                  <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Quantity : {count}</p>
                  <p className="mb-2 text-end font-semibold text-gray-700 dark:text-gray-400">Total : ₹{total} /-</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center mt-6 justify-between">
                  <button 
                    onClick={onOk}
                    type="button" 
                    className="text-white text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                  <button 
                    onClick={toggleModal} 
                    type="button" 
                    className="py-1.5 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModel;
