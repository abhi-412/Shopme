import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
// import banner from "../assets/banner-1.jpg";


const imageArr = [
  {name:"banner-1",src:'/assets/banner-1.jpg'},
  {name:"banner-1",src:'/assets/banner-2.jpg'},
  {name:"banner-1",src:'/assets/banner-3.jpg'},
  {name:"banner-1",src:'/assets/banner-4.jpg'},
  {name:"banner-1",src:'/assets/banner-5.jpg'},
 
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = imageArr.length;

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto slide every 5 seconds
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div id="indicators-carousel" className="relative bg-gray-300 w-full mt-3 mb-5" data-carousel="static">
      <div className="relative h-56 overflow-hidden md:h-96">
        {imageArr.map((item, index) => (
          <div
            key={index}
            className={`absolute duration-700 ease-in-out w-full h-full ${index === activeIndex ? 'block' : 'hidden'}`}
            data-carousel-item={index === activeIndex ? 'active' : ''}
          >
            <img
              src={item.src}
              className="block w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute z-5 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
        {imageArr.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white'}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => goToSlide(index)}
          >
            {index === activeIndex ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <FaChevronLeft className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <FaChevronRight className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
