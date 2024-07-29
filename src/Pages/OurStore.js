import React, { useEffect, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import ReactStars from 'react-stars'
import Color from '../Components/Color'
import Container from '../Components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/products/productSlice'
import StoreCard from '../Components/StoreCard'
import { MdTune } from "react-icons/md";
import Drawer from './Drawer'
import { getcategories } from '../features/category/categorySlice'
import { getColors } from '../features/color/colorSlice'
import $ from 'jquery'
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/slider';


const size = ["S","M","L","XL","XXL"]; 

const tags = ["Laptops","Mobiles","Watches","Accessaries","Earpods","Earphones"];

const options = [
    {
        sort: "title",
        order: "asc",
        label: "Alphabetically, A-Z"
    },
    {
        sort: "title",
        order: "",
        label: "Alphabetically, Z-A"
    },
    {
        sort: "price",
        order: "asc",
        label: "Price, low to high"
    },
    {
        sort: "price",
        order: "desc",
        label: "Price, high to low"
    },
    {
        sort: "-createdAt",
        order: "asc",
        label: "Date, Old to New"
    },
    {
        sort: "-createdAt",
        order: "",
        label: "Date, New to Old"
    }
]



const OurStore = () => {
    const [priceFilterTo, setpriceFilterTo] = useState(50000);
    const [priceFilterFrom, setPriceFilterFrom] = useState(0);
    const [grid,setGrid] = useState(12);
    const [color,setColor] = useState("");

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    
    const [sortOption, setSortOption] = useState({sort:'-createdAt',order:'desc'});
    const [selectedCategories, setSelectedCategories] = useState([]);

    
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
      };

    const dispatch = useDispatch();

    const productState = useSelector(state=>state.product);
    const categories = useSelector(state=>state.category.categories);
    const colors = useSelector(state=>state.color.colors);
    const {products, isLoading,isError,message,isSuccess,totalPages} = productState;

    useEffect(() => {
        const filters = {
            page: currentPage,
            limit: itemsPerPage,
            sortBy: sortOption,
            price: { lte: priceFilterTo },
            color,
            categories: selectedCategories,
        };
        dispatch(getProducts(filters));
        dispatch(getcategories());
        dispatch(getColors());
    }, [currentPage, sortOption, priceFilterTo, color, selectedCategories, dispatch, itemsPerPage]);

    useEffect(()=>{
       if(window.innerWidth <= 768){
           setGrid(12);
       }
    },[])
    
  

    const handlePriceRange=(e)=>{
        const price = e.target.value;
        setpriceFilterTo(price);
    }

    const changeGrid = (cols)=>{
        setGrid(cols);
    }

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

        useEffect(() => {
          $("#slider-range").slider({
            range: true,
            min: 0,
            max: 1000000,
            values: [priceFilterFrom, priceFilterFrom],
            slide: function(event, ui) {
              $("#amount").val(`$${ui.values[0]} - $${ui.values[1]}`);
            }
          });
      
          $("#amount").val(`$${$("#slider-range").slider("values", 0)} - $${$("#slider-range").slider("values", 1)}`);
        }, []);
    

  return (
    <>
    <Meta title={"Our Store"} />
    <BreadCrumb title={"Our Store"} />
    

    <Container class1="py-5 ">
    {/* <Drawer handlePriceRange={handlePriceRange} Categories={Categories} size={size} tags={tags} priceFilterTo={priceFilterTo}/> */}
    {isDrawerOpen && (
        <Drawer 
          Categories={categories} 
          priceFilterTo={priceFilterTo} 
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
                <div className="md:col-span-3  hidden p-0 md:flex flex-col gap-4">
                     <div className='text-dark bg-white rounded-xl p-3 flex flex-wrap gap-3 mb-3'>
                        <h3 className="text-md font-semibold">Shop By Category</h3>
                        <ul className='flex flex-wrap gap-3'>
                            {categories?.length > 0 && categories.map((cat)=>{
                                return <li onClick={()=>handleCategoryChange(cat.title)} key={cat?._id} className={`cursor-pointer ${selectedCategories.includes(cat.title) ? "text-white bg-blue-500" : "bg-light text-secondary"} badge  cursor-pointer rounded-3 py-2 px-2`}>{cat.title}</li>
                            })}
                        </ul>
                     </div>



                     <div className='text-dark bg-white rounded-xl p-3 flex flex-col flex-wrap gap-3 mb-3'>
                     <h3 className="text-md font-semibold mb-3">Filter By</h3>
                        <div className='flex flex-col cursor-pointer'>
                            <h5 className='text-md mb-2'>Availibility</h5>

                            <div className="form-check">
                                <input type="checkbox" 
                                className="form-check-input" 
                                value={""}
                                id=''
                            
                                />
                                <label htmlFor="" 
                                className="form-check-label text-sm"
                                >
                                   In Stock [1]
                                </label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" 
                                className="form-check-input " 
                                value={""}
                                id=''
                                />
                                <label htmlFor="" 
                                className="form-check-label text-sm"
                                >
                                   Out of Stock [0]
                                </label>
                            </div>
                        </div>
                        
                        <div >
                            <h5 className='text-md mb-2'>Price</h5>

                            
                                <p>
                                    <label htmlFor="amount">Price range:</label>
                                    <input
                                    type="text"
                                    id="amount"
                                    readOnly
                                    className='border-0 w-full bg-blue text-sm mb-2'
                                   
                                    />
                                </p>
                                <div className='col-span-3 bg-blue-500 rounded' id="slider-range"></div>
                            
                         </div>
                        
                        <div className='flex items-center flex-wrap gap-2 '>
                                <h6 className='mb-0'>Colors:</h6>
                                <ul className='flex gap-2 flex-wrap'>
                                {colors?.map((c,i)=>(
                                    <button onClick={()=>setColor(c.color)} className={`text-center rounded-full ${color === c.color  ? "border-2 border-black scale-110" : ""} border-2  border-gray-600`} key={i} style={{backgroundColor:`${c.color?.toLowerCase()}`, width:"20px", height:"20px", borderRadius:"50%"}}></button>
                                ))}
                                </ul>
                            </div>

                        <div>
                        <h5 className='text-md mb-2'>Size</h5>
                           <div className='flex gap-3 items-center flex-wrap'>
                           {size.map((size)=>{
                                return  <div className="flex gap-1 items-center">
                                <input type="checkbox" 
                                className="form-check-input" 
                                value={""}
                                id=''
                                />
                                <label htmlFor="" 
                                className="mt-1 text-sm"
                                >
                                    {size}
                                </label>
                            
                            </div>
                            })}
                           </div>
                           
                        </div> 
                    </div>


                     <div className='text-dark filter-card mb-3'>
                     <h3 className="filter-title">Product Tags</h3>
                    
                     <div className='flex flex-wrap gap-2'>
                            {tags.map((tag)=>{
                                return <span className='badge bg-light text-secondary rounded-3 py-2 px-2'>{tag}</span>
                            })}
                     </div>
                    </div>


                     {/* <div className='text-dark filter-card mb-3'>
                     <h3 className="filter-title">Random Products</h3>
                     <div>
                        <div className='random-products d-flex mb-3'>
                            <div className="w-50">
                                <img src='/images/headphone.jpg' className='img-fluid' alt="random-image-2" />
                            </div>
                            <div className="w-50">
                                <h6>Kids Headphones Bulk 10 <br />
                                Pack Multi Colored For..
                                </h6>
                                <ReactStars
                            count={5}
                            value={3}
                            edit={false}
                            size={24}
                            color2={'#ffd700'} />
                            <p>$100 only</p>
                            </div>
                        </div>

                        <div className='random-products d-flex'>
                            <div className="w-50">
                                <img src='/images/watch.jpg' className='img-fluid' alt="random-image-2" />
                            </div>
                            <div className="w-50">
                                <h6>Aspiron Watch <br />
                                    Blue Sapphire Color
                                </h6>
                                <ReactStars
                            count={5}
                            value={4}
                            edit={false}
                            size={24}
                            color2={'#ffd700'} />
                            <p>$60 only</p>
                            </div>
                        </div>
                     </div>

                     
                     </div> */}

                </div>

                
                <div className={`md:col-span-9 col-span-12 p-2 ${isDrawerOpen && "opacity-50"} relative`}>
                        <div className="flex bg-white p-3 mb-4 justify-between flex-wrap gap-3 items-center">
                            <div className="d-flex align-items-center gap-2">
                                <p className='mb-0 d-block text-sm md:text-base'>Sort:</p>
                                <select
                                    name=""
                                    id=""
                                    className='border py-1.5 px-1 rounded text-sm'
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    {options.map((op, i) => {
                                        return <option key={i} value={{ sort: op.sort, order: op.order }}>{op.label}</option>
                                    })}
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

                        <div className="products-list">
                            <div className="grid grid-cols-12 gap-3">
                                {products?.map((product) => {
                                    return <StoreCard col={grid} key={product.id} product={product} />
                                })}
                            </div>
                        </div>




                        <div className="absolute -bottom-10 right-10 d-flex align-items-center justify-content-center">
                            <nav aria-label="Page navigation example">
                            <ul className="inline-flex -space-x-px text-sm">
                                <li>
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}hove
                                        className={`flex items-center ${currentPage === 1 ? "bg-gray-200" : "bg-gray-50 text-blue-500 border border-gray-600"} justify-center px-3 h-8 ms-0 leading-tight text-gray-500  border border-e-0 border-gray-300 rounded-s-lg`}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`flex items-center justify-center px-3 h-8 leading-tight    rounded-e-lg  ${currentPage === totalPages ? "bg-gray-200" : "bg-gray-50 text-blue-500 border border-gray-600"}`}
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

      
  )
}

export default OurStore
