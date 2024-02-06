import React, { useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import FeaturedCard from '../Components/FeaturedCard'
import ReactStars from 'react-stars'
import ReactImageZoom from 'react-image-zoom'
import Color from '../Components/Color'
import { IoIosHeartEmpty } from "react-icons/io";
import { GoGitCompare } from "react-icons/go";
import Container from '../Components/Container'

const Categories = ["Watch","Tv","Camera","Laptop"];
const size = ["S","M","L","XL","XXL"]; 

const tags = ["Laptops","Mobiles","Watches","Earphones"];



const MainProduct = () => {
    const [ordered, setOrdered] = useState(true);
    const [rating,setRating] = useState(0);

    const copyToClipboard = (text) => {
        // console.log('text', text)
        let textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        alert("Link was Copied")
      }

    const props={width:500,height:600,zoomWidth:600,img:"/assets/watch.jpg"}
  return (
    <>
    <Meta title={"Product Name"} />
    <BreadCrumb title={"Product Name"} />

    <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
                <div className="col-6">
                    <div className="main-product-image">
                        <div>
                            <ReactImageZoom {...props} />
                        </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            <div> <img className='img-fluid' src="/assets/watch.jpg" alt="" /></div>
                            <div> <img className='img-fluid' src="/assets/watch.jpg" alt="" /></div>
                            <div> <img className='img-fluid' src="/assets/watch.jpg" alt="" /></div>
                            <div> <img className='img-fluid' src="/assets/watch.jpg" alt="" /></div>
                        </div>
                </div>
                <div className="col-6">
                    <div className="main-product-details p-5">
                        <div className='border-bottom'>
                        <h3 className='title'>Sony Bravia LED Watch MultiColored pack of 10</h3>
                        </div>

                        <div className="border-bottom py-3">
                            <p className='price'>$100.00</p>
                            <div className="d-flex align-items-center gap-10">
                            <ReactStars
                                count={5}
                                value={3}
                                edit={false}
                                size={24}
                                color2={'#ffd700'} 
                            />
                            <p className='mb-0'>(2 reviews)</p>
                        </div>
                        <a href="#review" className='write-review'>Write a Review</a>
                        </div>
                       

                        <div className="d-flex flex-column py-3 gap-15">
                            <div className='d-flex align-items-center flex-wrap gap-10'>
                                <h6 className='mb-0'>Type :</h6>
                                <p className='mb-0'>Watch</p>
                            </div>

                            <div className='d-flex align-items-center flex-wrap gap-10'>
                                <h6 className='mb-0'>Brand :</h6>
                                <p className='mb-0'>Sony</p>
                            </div>

                            <div className='d-flex align-items-center flex-wrap gap-10'>
                            <h6 className='mb-0'>Categories :</h6>
                                {Categories.map((cat)=>{
                                    return <p className='mb-0'>{cat},</p>
                                })}
                            </div>

                            <div className='d-flex align-items-center flex-wrap gap-10'>
                            <h6 className='mb-0'>Tags :</h6>
                                {tags.map((cat)=>{
                                    return <p className='mb-0'>{cat},</p>
                                })}
                            </div>

                            <div className='d-flex align-items-center flex-wrap gap-10 mt-2 mb-3'>
                                <h6 className='mb-0'>SKU :</h6>
                                <p className='mb-0'>AFSYKM</p>
                            </div>

                            <div className='d-flex align-items-center flex-wrap gap-10'>
                                <h6 className='mb-0'>Availibility :</h6>
                                <p className='mb-0'>In Stock[864]</p>
                            </div>

                            <div className='d-flex flex-column flex-wrap mt-2 mb-3 gap-10'>
                                <h6>Size :</h6>
                                <div className='d-flex flex-wrap gap-15'>
                                    {size.map((s)=>{
                                    return <span className='badge border border-1 border-secondary bg-white text-dark'>{s}</span>
                                    })}
                                </div>
                            </div>

                            <div className='d-flex flex-column flex-wrap gap-10'>
                                <h6 className='mb-0'>Color</h6>
                                <Color />
                            </div>

                            <div className='d-flex flex-row mt-2 mb-3 gap-30 align-items-center'>
                                <h6 className='mb-0'>Quantity :</h6>
                                <div>
                                    <input type="number"
                                    style={{width:"60px"}} 
                                    min={0}
                                    max={10}
                                    id='' 
                                    className='form-control'
                                    />
                                </div>
                                <div className="d-flex gap-30 align-items-center">
                                    <button className='button login'>Add to Cart</button>
                                    <button className='signup-button'>Buy Now</button>
                                </div>
                            </div>
                            
                            <div className='d-flex align-items-center gap-30'>
                               <div>
                                <a href=""><GoGitCompare />  Add to Compare</a>
                               </div>
                               <div>
                                <a href=""><IoIosHeartEmpty />  Add to Wishlist</a>
                               </div>
                            </div>
                            
                            <div className='d-flex flex-column mt-2 mb-3 flex-wrap gap-10'>
                                <h6 className='mb-0'>Shipping and Returns:</h6>
                                <p className='mb-0'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, velit quod saepe distinctio sunt ipsum nulla qui quidem soluta autem eius provident omnis quam ratione laudantium obcaecati cum voluptate et!</p>
                            </div>    
                            

                            <div className='d-flex align-items-center mt-2 mb-3 flex-wrap gap-30'>
                                <h6 className='mb-0'>Copy Product Link: </h6>
                                <a href="javascript:void(0)"
                                onClick={()=>{copyToClipboard(
                                    "/assets/watch.jpg"
                                )}}
                                >
                                    Click Here to Copy
                                
                                </a>
                                
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
    </Container>
    <Container class1="description-wrapper py-5 home-wrapper-2">
    <div className="row">
                <div className="col-12">
                    <h4>Description</h4>
                    <div className="bg-white p-3">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi 
                            sunt quis laborum omnis similique ipsa commodi ducimus molestiae! 
                            Iure possimus sapiente animi optio at asperiores officia beatae tempore cumque?
                            Fuga velit totam sunt illo mollitia distinctio, expedita excepturi
                            perferendis praesentium veritatis fugit? Voluptatum, earum deleniti 
                            nulla dicta perferendis provident temporibus fuga?
                        </p>
                    </div>
                </div>
            </div>
    </Container>
    <Container class1="reviews-wrapper home-wrapper-2">
            <div className="row">
                <div id='review' className="col-12">
                    <h4>Reviews</h4>
                    <div className="review-inner-wrapper">
                    <div className="review-head d-flex justify-content-between align-items-end">
                        <div >
                            <h4 className='mb-2'>Customer Reviews</h4>
                           <div className='d-flex gap-10 align-items-center'>
                           <ReactStars
                                count={5}
                                value={3}
                                edit={false}
                                size={24}
                                color2={'#ffd700'} 
                            />
                            <p className='mb-0'>Based on 2 reviews</p>
                           </div>
                        </div>

                        {ordered && 
                        <div>
                            <a className='text-dark text-decoration-underline' href="">Write a Review</a>
                        </div>
                        }
                    </div>

                        
                        <div  className="review-form py-4">
                            <h4>Write a Review</h4>
                            <form action="" className='d-flex flex-column gap-15'>
                                <div>
                                <ReactStars
                                    count={5}
                                    value={rating}
                                    edit={true}
                                    size={24}
                                    color2={'#ffd700'} 
                                    onChange={(e)=>{setRating(e)}}
                                />
                                </div>
                                <div>
                                    <textarea
                                    cols="30"
                                    rows="4" 
                                    className="form-control w-100" 
                                    placeholder='Comments'
                                    />
                                </div>
                                <div className='d-flex justify-content-end '>
                                    <button className='button'>
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div>


                        <div className="reviews mt-4">
                            <div className="review">
                                <div className='d-flex gap-10 align-items-center'>
                                    <h6 className='mb-0'>Abhi</h6>
                                    <ReactStars
                                        count={5}
                                        value={3.5}
                                        edit={false}
                                        size={24}
                                        color2={'#ffd700'} 
                                    />
                                </div>
                                <p className='mb-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                Minus sint ipsam laudantium voluptatem eligendi aliquam doloribus
                                 dicta sunt, at sed consequuntur, porro itaque distinctio.
                                  Cupiditate tenetur consequuntur odit nesciunt temporibus?
                                  </p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
    </Container>
    <Container class1="featured-wrapper py-5 home-wrapper-2">
    <div className="row">
            <div className='col-12'>
              <h3 className='section-heading'>You May Also Like</h3>
            </div>
            
              <FeaturedCard />
              <FeaturedCard />

              <FeaturedCard />
              <FeaturedCard />
              


          </div>

    </Container>
    </>
  )
}

export default MainProduct
