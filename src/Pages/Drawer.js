import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';

const Drawer = (props) => {
    const {
        Categories,
        priceFilterBy,
        handlePriceRange,
        totalProducts,
        selectedCategories,
        outOfStock,
        setOutOfStock,
        tags,
        toggleDrawer,
        handleCategoryChange,
        isDrawerOpen,
        colors,
        selectedTags,
        handleTagChange,
        setColor,
        getThumbPosition,
        color
    } = props;

    const handleCategoryClick = (category) => {
        handleCategoryChange(category);
        toggleDrawer(); // Close drawer after selection
    };

    const handleTagClick = (tag) => {
        handleTagChange(tag);
        toggleDrawer(); // Close drawer after selection
    };

    const [visibleCount, setVisibleCount] = useState(10);

    const handleShowMore = () => {
      setVisibleCount((prevCount) => prevCount + 10);
    };

    const visibleCategories = Categories.slice(0, visibleCount);
    const remainingCount = Categories.length - visibleCount;

    const handleSubmit = ()=>{
        toggleDrawer();
        window.scrollTo(0,0);
        setTimeout(()=>{
            toast(`${totalProducts} products found`,{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },1000)
    }

    return (
        <div
            className={`fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out ${
                isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            } z-40 bg-gray-100 shadow-lg w-96 overflow-y-auto `}
            role="dialog"
            aria-labelledby="drawer-title"
        >
            <div className="relative p-4">
                <button
                    onClick={toggleDrawer}
                    type="button"
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 "
                    aria-controls="drawer-content"
                    aria-label="Close menu"
                >
                    <RxCross1  className='text-xl '/>
                </button>
                <div className="pt-6">
                    <h5
                        id="drawer-title"
                        className="text-2xl py-1 font-semibold text-gray-800  mb-4 text-center"
                    >
                        Filters
                    </h5>
                    <div className='text-dark bg-white border-b border-b-gray-400  p-3 flex flex-wrap gap-3 mb-3'>
                            <h3 className="text-md font-semibold">Shop By Category</h3>
                            <ul className='flex flex-wrap items-center gap-3'>
                                {visibleCategories.length > 0 && visibleCategories.map((cat) => (
                                <li
                                    onClick={() => handleCategoryChange(cat.title)}
                                    key={cat?._id}
                                    className={`cursor-pointer ${selectedCategories.includes(cat.title) ? "text-white bg-blue-500" : "bg-gray-200 text-gray-500"} text-xs font-semibold rounded-3 py-1 px-2`}
                                >
                                    {cat.title}
                                </li>
                                ))}
                                {remainingCount > 0 ? (
                                <li
                                    onClick={handleShowMore}
                                    className="cursor-pointer text-sm underline text-blue-500"
                                >
                                    +{remainingCount} more
                                </li>
                                ):(
                                    <li
                                    onClick={()=>{setVisibleCount(10)}}
                                    className="cursor-pointer text-sm underline text-blue-500"
                                >
                                    see less
                                </li>
                                )}
                            </ul>
                        </div>
                    <div className="mb-4 flex gap-3 flex-col">
                        <h6 className="text-lg font-semibold text-gray-800  p-2 text-center">Filter By</h6>
                        <div className="border-b border-b-gray-400 bg-gray-50 pb-3 mb-2 py-2 px-3">
                            <h6 className="font-medium text-gray-800  mb-3">Availability</h6>
                            <div className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    id="in-stock"
                                    checked={!outOfStock}
                                    onChange={() => setOutOfStock(!outOfStock)}
                                    className="form-checkbox h-3 w-3 text-blue-600 border-gray-300 rounded"
                                />
                                <label htmlFor="in-stock" className="ml-2 text-xs text-gray-600 ">
                                    In Stock [{totalProducts}]
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="out-of-stock"
                                    checked={outOfStock}
                                    onChange={() => setOutOfStock(!outOfStock)}
                                    className="form-checkbox h-3 w-3 text-blue-600 border-gray-300 rounded"
                                />
                                <label htmlFor="out-of-stock" className="ml-2 text-xs text-gray-600">
                                    Out of Stock [0]
                                </label>
                            </div>
                        </div>
                        <div className='border-b border-b-gray-400 bg-gray-50 pb-3 mb-2 py-2 px-3'>
                                <h5 className='text-md mb-4 font-semibold'>Price</h5>
                                <div className="relative flex flex-col justify-center gap-1">
                                    <input
                                        type="range"
                                        className="w-full h-1 my-1 outline-none bg-blue-600 cursor-pointer"
                                        min={0}
                                        max={82000}
                                        step="10"
                                        onChange={handlePriceRange}
                                        id="customRange3"
                                        value={priceFilterBy}
                                    />
                                    <span
                                        className={`text-sm text-gray-700 -top-6 absolute ${priceFilterBy===0 || priceFilterBy===82000 ?  'hidden': 'block'}`}
                                        style={{
                                            left: getThumbPosition(),
                                            transform: 'translateX(-50%)', 
                                        }}
                                        id='rangeValue'
                                        
                                    >
                                        ₹{priceFilterBy}
                                    </span>
                                    <h6 className="text-sm flex justify-between w-full">
                                        ₹0 <span>₹82000</span>
                                    </h6>
                                    
                                </div>

                            </div>
                        <div className="border-b border-b-gray-400 bg-gray-50 pb-3 mb-2 py-2 px-3">
                            <h6 className="font-semibold text-gray-800  mb-3">Colors</h6>
                            <div className="flex gap-2">
                                {colors?.map((c, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setColor(c.color)}
                                        className={`p-2.5 rounded-full border-2 ${
                                            color === c.color ? 'border-black transform scale-125' : 'border-gray-500'
                                        }`}
                                        style={{ backgroundColor: c.color.toLowerCase() }}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        <div className='border-b border-b-gray-400 bg-gray-50 pb-3 mb-2 py-2 px-3'>
                            <h6 className=" font-semibold text-gray-800  mb-3">Product Tags</h6>
                            <div className="flex flex-wrap gap-2">
                                {tags?.map((t, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleTagClick(t)}
                                        className={`text-xs font-semibold rounded-lg py-1 px-2 ${
                                            selectedTags.includes(t)
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleSubmit} className='bg-yellow-800 px-5 py-2 rounded-xl hover:bg-yellow-950 text-white'>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
