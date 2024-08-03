import React, { useEffect, useState } from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import Meta from '../Components/Meta';
import ReactStars from 'react-stars';
import Color from '../Components/Color';
import Container from '../Components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productSlice';
import StoreCard from '../Components/StoreCard';
import { MdTune } from "react-icons/md";
import Drawer from './Drawer';
import { getcategories } from '../features/category/categorySlice';
import { getColors } from '../features/color/colorSlice';
import Loader from './Loader';

const size = ["S", "M", "L", "XL", "XXL"];
const tags = ["Featured", "Special", "Popular", "None"];
const options = [
    { sort: "title", order: "desc", label: "Alphabetically, Z-A" },
    { sort: "title", order: "asc", label: "Alphabetically, A-Z" },
    { sort: "price", order: "asc", label: "Price, low to high" },
    { sort: "price", order: "desc", label: "Price, high to low" },
    { sort: "createdAt", order: "asc", label: "Date, Old to New" },
    { sort: "createdAt", order: "desc", label: "Date, New to Old" }
];

const OurStore = () => {
    const [priceFilterBy, setPriceFilterBy] = useState(82000);
    // const [priceFilterFrom, setPriceFilterFrom] = useState(0);
    const [grid, setGrid] = useState(12);
    const [color, setColor] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(5);
    const [sortOption, setSortOption] = useState({ sort: 'createdAt', order: 'desc' });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setselectedTags] = useState([]);
    const [outOfStock, setOutOfStock] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const categories = useSelector(state => state.category.categories);
    const colors = useSelector(state => state.color.colors);
    const { products, isLoading, isError, message, isSuccess,totalProducts, totalPages } = productState;

    useEffect(() => {
        const filters = {
            page: currentPage,
            limit: itemsPerPage,
            sortBy: sortOption,
            price: { lte: priceFilterBy,gte:0 },
            color,
            categories: selectedCategories,
            outOfStock:outOfStock,
            tags:selectedTags
        };
        dispatch(getProducts(filters));
        dispatch(getcategories());
        dispatch(getColors());
    }, [currentPage, sortOption, priceFilterBy, color, selectedCategories, dispatch, itemsPerPage, outOfStock, selectedTags]);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setGrid(12);
        }
    }, []);

    const handlePriceRange = (e) => {
        const price = e.target.value;
        setPriceFilterBy(price);
    };

    const changeGrid = (cols) => {
        setGrid(cols);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleTagChange = (tag) => {
        if (selectedTags.includes(tag)) {
            setselectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setselectedTags([...selectedTags, tag]);
        }
    };

    const handleSorting = (label) => {
        const selectedOption = options.find(op => op.label === label);
        console.log(selectedOption);
        setSortOption({ sort: selectedOption.sort, order: selectedOption.order });
    };

    useEffect(()=>{
        if(grid === 12){
            setItemsPerPage(4)
        }else if(grid === 6){
            setItemsPerPage(4)
        }else{
            setItemsPerPage(6)
        }
    },[grid])





    
    return (
        <>
            <Meta title={"Our Store"} />
            <BreadCrumb title={"Our Store"} />
            <Container class1="py-5 ">
                {isDrawerOpen && (
                    <Drawer 
                        Categories={categories} 
                        priceFilterBy={priceFilterBy} 
                        handlePriceRange={handlePriceRange} 
                        size={size} 
                        tags={tags} 
                        colors={colors}
                        setColor={setColor}
                        color={color}
                        toggleDrawer={toggleDrawer}
                        isDrawerOpen={isDrawerOpen}
                    />
                )}
                <div className="grid grid-cols-12 gap-8">
                    <div className="md:col-span-3 hidden p-0 md:flex flex-col gap-4">
                        <div className='text-dark bg-white rounded-xl p-3 flex flex-wrap gap-3 mb-3'>
                            <h3 className="text-md font-semibold">Shop By Category</h3>
                            <ul className='flex flex-wrap gap-3'>
                                {categories?.length > 0 && categories.map((cat) => {
                                    return <li onClick={() => handleCategoryChange(cat.title)} key={cat?._id} className={`cursor-pointer ${selectedCategories.includes(cat.title) ? "text-white bg-blue-500" : "bg-light text-secondary"} badge cursor-pointer rounded-3 py-2 px-2`}>{cat.title}</li>
                                })}
                            </ul>
                        </div>
                        <div className='text-dark bg-white rounded-xl p-3 flex flex-col flex-wrap gap-3 mb-3'>
                            <h3 className="text-md font-semibold mb-3">Filter By</h3>
                            <div className='flex flex-col cursor-pointer'>
                                <h5 className='text-md mb-2'>Availability</h5>
                                <div className="form-check">
                                    <input type="checkbox" 
                                        className="form-check-input" 
                                        value={outOfStock}
                                        id=''
                                        onChange={(e)=>setOutOfStock(!outOfStock)}
                                        checked={!outOfStock}
                                    />
                                    <label htmlFor=""  className="form-check-label text-sm">
                                        In Stock [{totalProducts}]
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" 
                                        className="form-check-input" 
                                        value={outOfStock}
                                        id=''
                                        checked={outOfStock}
                                        onChange={(e)=>setOutOfStock(!outOfStock)}
                                    />
                                    <label htmlFor="" className="form-check-label text-sm">
                                        Out of Stock [0]
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h5 className='text-md mb-2'>Price</h5>
                                <div className="flex flex-col justify-center gap-2">
                                    <h6 className='text-sm'>From $0 to ${priceFilterBy}</h6>
                                    <div className="filter-range">
                                        <input type="range"
                                            className="form-range"
                                            min={0}
                                            max={82000}
                                            step="10"
                                            onChange={handlePriceRange}
                                            id="customRange3" 
                                            value={priceFilterBy}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center flex-wrap gap-2 py-3'>
                                <h6 className='mb-0'>Colors:</h6>
                                <ul className='flex gap-2 flex-wrap'>
                                    {colors?.map((c, i) => (
                                        <button onClick={() => setColor(c.color)} className={`text-center rounded-full ${color === c.color  ? "border-2 border-black scale-110" : ""} border-2 border-gray-600`} key={i} style={{backgroundColor: `${c.color?.toLowerCase()}`, width: "20px", height: "20px", borderRadius: "50%"}}></button>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='text-dark filter-card mb-3'>
                            <h3 className="filter-title">Product Tags</h3>
                            <div className='flex flex-wrap gap-2'>
                            {tags?.length > 0 && tags.map((t,i) => {
                                    return <li onClick={() => handleTagChange(t)} key={i} className={`cursor-pointer ${selectedTags.includes(t) ? "text-white bg-blue-500" : "bg-light text-secondary"} badge cursor-pointer text-sm font-semibold rounded-3 py-2 px-2`}>{t}</li>
                                })}
                            </div>
                        </div>
                    </div>
                                
                    

                    

                    <div  className={`md:col-span-9  col-span-12 p-2 ${isDrawerOpen && "opacity-50"} relative`}>
                        <div className="flex bg-white p-3 mb-4 justify-between flex-wrap gap-3 items-center">
                            <div className="d-flex align-items-center gap-2">
                                <p className='mb-0 d-block text-sm md:text-base'>Sort:</p>
                                <select
                                    name=""
                                    id=""
                                    className='border py-1.5 px-1 rounded text-sm'
                                    onChange={(e) => {
                                        
                                        handleSorting(e.target.value);
                                    }}
                                >
                                    {options.map((op, i) => (
                                        <option key={i} value={op.label}>{op.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className='mb-0 text-sm'>Filters</p>
                                <button
                                    onClick={toggleDrawer}
                                    className='border py-1.5 px-2 rounded md:hidden' type="button">
                                    <MdTune className='text-xl' />
                                </button>
                                <div className="flex gap-3 items-center cursor-pointer">
                                    <img src="images/gr3.svg"
                                        className='w-5 h-5 md:block hidden'
                                        alt=""
                                        onClick={() => { changeGrid(4) }}
                                    />
                                    <img src="images/gr2.svg"
                                        className='w-5 h-5 md:block hidden'
                                        alt=""
                                        onClick={() => { changeGrid(6) }}
                                    />
                                    <img src="images/gr.svg"
                                        className='w-5 h-5 md:block hidden'
                                        alt=""
                                        onClick={() => { changeGrid(12) }}
                                    />
                                </div>
                            </div>
                        </div>

                                                            {isLoading && (
                                                            <div className="col-span-9">
                                                                <Loader />
                                                            </div>
                                                        )}
                        <div hidden={isLoading} className="products-list">
                            <div className="grid grid-cols-12 gap-3">
                                {products?.map((product) => (
                                    <StoreCard col={grid} key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                                                            {products?.length === 0 && !isLoading && (
                                                            <div className="flex col-span-9 h-screen gap-3  flex-col items-center justify-center  p-4 text-center">
                                                            {/* <img src="/images/no-products.svg" alt="No Products" className="w-32 h-32 mb-4" /> */}
                                                            <p className='text-7xl bounce-animation'>
                                                            😔
                                                            </p>
                                                            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h2>
                                                            <p className="text-gray-500">We couldn't find any products matching your search criteria. Please try again with different keywords or filters.</p>
                                                        </div>
                                                        )}
                        <div className="mt-5 d-flex align-items-center justify-center">
                            <nav className='absolute -bottom-5'>
                                <ul className="inline-flex -space-x-px text-sm font-semibold">
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`flex items-center hover:bg-blue-100 hover:text-blue-700 ${currentPage === 1 ? "bg-gray-200" : "bg-gray-50 text-blue-500 border border-gray-600"} justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-e-0 border-gray-300 rounded-s-lg`}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`flex items-center justify-center px-3  h-8 hover:bg-blue-100 hover:text-blue-700 leading-tight ${currentPage === index + 1 ? 'text-blue-600 border border-gray-300 bg-blue-200 ' : 'text-gray-500 border border-gray-300 '}`}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`flex items-center hover:bg-blue-100 hover:text-blue-700 justify-center px-3 h-8 leading-tight rounded-e-lg ${currentPage === totalPages ? "bg-gray-200" : "bg-gray-50 text-gray-500 border border-gray-600"}`}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    
                </div>
            </Container>
        </>
    );
};

export default OurStore;
