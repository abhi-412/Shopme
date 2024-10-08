import React from 'react';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumb2 = ({path}) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 ">
            <FaHome className="w-3 h-3 me-2.5" aria-hidden="true" />
            Home
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <FaChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" />
            <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 ">Projects</a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <FaChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" />
            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 ">Flowbite</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb2;
