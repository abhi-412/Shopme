import React, { useEffect, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import ReactStars from 'react-stars'
import FeaturedCard from '../Components/FeaturedCard'
import Color from '../Components/Color'
import Container from '../Components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/products/productSlice'
import StoreCard from '../Components/StoreCard'
import { MdTune } from "react-icons/md";
import Drawer from './Drawer'
import { addToCart } from '../features/user/userSlice'

const Categories = ["Watch","Tv","Camera","Laptop"];

const size = ["S","M","L","XL","XXL"]; 

const tags = ["Laptops","Mobiles","Watches","Accessaries","Earpods","Earphones"];

const options = [["manual","Featured"],["best-selling","Best Selling"],
["title-ascending","Alphabetically, A-Z"],["title-descending","Alphabetically, Z-A"],
["price-ascending","Price, low to high"],["price-descending","Price, high to low"],
["created-ascending","Date, Old to New"],["created-descending","Date, New to Old"]]


const OurStore = () => {
    const [priceFilterBy, setPriceFilterBy] = useState(50000);
    const [grid,setGrid] = useState(12);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
      };

    const dispatch = useDispatch();

    const productState = useSelector(state=>state.product);
    const {products, isLoading,isError,message,isSuccess} = productState;

    useEffect(()=>{
        dispatch(getProducts());
    },[])

    useEffect(()=>{
       if(window.innerWidth <= 768){
           setGrid(12);
       }
    },[])
    
  

    const handlePriceRange=(e)=>{
        const price = e.target.value;
        setPriceFilterBy(price);
    }

    const changeGrid = (cols)=>{
        setGrid(cols);
    }


    

  return (
    <>
    <Meta title={"Our Store"} />
    <BreadCrumb title={"Our Store"} />
    

    <Container class1="py-5 ">
    {/* <Drawer handlePriceRange={handlePriceRange} Categories={Categories} size={size} tags={tags} priceFilterBy={priceFilterBy}/> */}
    {isDrawerOpen && (
        <Drawer 
          Categories={Categories} 
          priceFilterBy={priceFilterBy} 
          handlePriceRange={handlePriceRange} 
          size={size} 
          tags={tags} 
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
      )}

        <div className="grid grid-cols-12 gap-8">
                <div className="md:col-span-3 md:block hidden p-0">
                     <div className='text-dark filter-card mb-3'>
                        <h3 className="filter-title">Shop By Category</h3>
                        <ul>
                            {Categories.map((cat)=>{
                                return <li>{cat}</li>
                            })}
                        </ul>
                     </div>



                     <div className='text-dark filter-card mb-3'>
                     <h3 className="filter-title mb-3">Filter By</h3>
                        <div>
                            <h5 className='sub-title'>Availibility</h5>

                            <div className="form-check">
                                <input type="checkbox" 
                                className="form-check-input" 
                                value={""}
                                id=''
                            
                                />
                                <label htmlFor="" 
                                className="form-check-label"
                                >
                                   In Stock [1]
                                </label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" 
                                className="form-check-input" 
                                value={""}
                                id=''
                                checked
                                />
                                <label htmlFor="" 
                                className="form-check-label"
                                >
                                   Out of Stock [0]
                                </label>
                            </div>
                        </div>
                        
                        <div className='mb-3'>
                            <h5 className='sub-title mb-3'>Price</h5>

                            <div className="form-range d-flex flex-column justify-content-center gap-2">
                            <h6 className=''>From $0 to ${priceFilterBy}</h6>
                                <div className="filter-range">
                                <input type="range"
                                className="form-range"
                                min="0"
                                max="10000"
                                step="10"
                                onChange={handlePriceRange}
                                id="customRange3" 
                                value={priceFilterBy}
                                />
                            </div>
                         </div>
                        </div>
                        
                        <div className='mb-3'>
                            <h5 className='sub-title mb-3'>Colors</h5>

                            <div>
                                <Color />
                            </div>
                        </div>

                        <div className='mb-3'>
                        <h5 className='sub-title'>Size</h5>
                           <div className='d-flex gap-10 justify-content-around align-items-center flex-wrap'>
                           {size.map((size)=>{
                                return  <div className="form-check d-flex gap-10 align-items-center">
                                <input type="checkbox" 
                                className="form-check-input" 
                                value={""}
                                id=''
                                />
                                <label htmlFor="" 
                                className="form-check-label mt-1"
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
                    
                     <div className='product-tags d-flex flex-wrap gap-10'>
                            {tags.map((tag)=>{
                                return <span className='badge bg-light text-secondary rounded-3 py-2 px-2'>{tag}</span>
                            })}
                     </div>
                    </div>


                     <div className='text-dark filter-card mb-3'>
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

                     
                     </div>

                </div>

                
                <div className={`md:col-span-9 col-span-12 p-2 ${isDrawerOpen && "opacity-50"}`}>
                        <div className="flex bg-white p-3 mb-4 justify-between flex-wrap gap-3 items-center">
                        <div className="d-flex align-items-center gap-3">
                            <p className='mb-0 d-block'>Sort:</p>
                            <select 
                            name="" 
                            id="" 
                            className='border py-1.5 px-2 rounded'>
                                {options.map((op)=>{
                                    return <option value={op[0]}>{op[1]}</option>
                                })}
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* <p className='mb-0'>21 Products</p> */}
                            <button
                            onClick={toggleDrawer}
                             className='border py-1.5 px-2 rounded md:hidden' type="button" data-drawer-target="drawer-backdrop" data-drawer-show="drawer-backdrop" data-drawer-backdrop="true" aria-controls="drawer-backdrop">
                            <MdTune className='text-2xl'/>
                            </button>
                            <div className="flex gap-3 items-center cursor-pointer">
                                
                                <img src="images/gr3.svg"
                                    className='w-5 h-5 md:block hidden'  
                                    alt="" 
                                    onClick={()=>{changeGrid(4)}}
                                    />
                                <img src="images/gr2.svg"
                                    className='w-5 h-5 md:block hidden'  
                                    alt="" 
                                    onClick={()=>{changeGrid(6)}}
                                    />
                                <img src="images/gr.svg"
                                    className='w-5 h-5 md:block hidden'  
                                    alt="" 
                                    onClick={()=>{changeGrid(12)}}
                                    />
                            </div>
                        </div>
                        </div>
                    
                    
                    <div className="products-list">
                        <div className="grid grid-cols-12 flex-wrap gap-3">
                        {products.map((product)=>{
                            return <StoreCard  col={grid} key={product.id} product={product} />
                        })}
                       

                        </div>
                        
                    </div>

                </div>

            </div>
    </Container>


    </>
  )
}

export default OurStore
