import React, { useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import ReactStars from 'react-stars'
import FeaturedCard from '../Components/FeaturedCard'
import Color from '../Components/Color'
import Container from '../Components/Container'

const Categories = ["Watch","Tv","Camera","Laptop"];

const size = ["S","M","L","XL","XXL"]; 

const tags = ["Laptops","Mobiles","Watches","Accessaries","Earpods","Earphones"];

const options = [["manual","Featured"],["best-selling","Best Selling"],
["title-ascending","Alphabetically, A-Z"],["title-descending","Alphabetically, Z-A"],
["price-ascending","Price, low to high"],["price-descending","Price, high to low"],
["created-ascending","Date, Old to New"],["created-descending","Date, New to Old"]]


const OurStore = () => {
    const [priceFilterBy, setPriceFilterBy] = useState(50000);
    const [grid,setGrid] = useState(4);
  

    const handlePriceRange=(e)=>{
        const price = e.target.value;
        setPriceFilterBy(price);
    }

  return (
    <>
    <Meta title={"Our Store"} />
    <BreadCrumb title={"Our Store"} />
    

    <Container class1="store-wrapper py-5 home-wrapper-2">
        <div className="row">
                <div className="col-3 p-0">
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

                            <div className="form-range d-flex flex-column justify-content-center gap-10">
                            <h6 className='mb-0'>From $0 to ${priceFilterBy}</h6>
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
                
                <div className="col-9">
                    <div className="filter-sort-grid  mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-10">
                            <p className='mb-0 d-block'>Sort By:</p>
                            <select 
                            name="" 
                            id="" 
                            className='form-control form-select'>
                                {options.map((op)=>{
                                    return <option value={op[0]}>{op[1]}</option>
                                })}
                            </select>
                        </div>
                            <div className="d-flex align-items-center gap-10">
                                <p className='total-products mb-0'>21 Products</p>
                                <div className="d-flex gap-10 align-items-center grid">
                                    <img src="images/gr4.svg"
                                     className='d-block img-fluid' 
                                     alt="" 
                                     onClick={()=>{setGrid(3)}}
                                     />
                                    <img src="images/gr3.svg"
                                     className='d-block img-fluid' 
                                     alt="" 
                                     onClick={()=>{setGrid(4)}}
                                     />
                                    <img src="images/gr2.svg"
                                     className='d-block img-fluid' 
                                     alt="" 
                                     onClick={()=>{setGrid(6)}}
                                     />
                                    <img src="images/gr.svg"
                                     className='d-block img-fluid' 
                                     alt="" 
                                     onClick={()=>{setGrid(12)}}
                                     />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="products-list">
                        <div className="d-flex flex-wrap gap-10">
                        <FeaturedCard grid={grid} />
                        <FeaturedCard grid={grid} />
                        <FeaturedCard grid={grid} />
                        <FeaturedCard grid={grid} />
                        <FeaturedCard grid={grid} />
                        <FeaturedCard grid={grid} />
                       

                        </div>
                        
                    </div>

                </div>

            </div>
    </Container>


    </>
  )
}

export default OurStore
