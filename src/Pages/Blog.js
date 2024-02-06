import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import Card from '../Components/Card';
import Container from '../Components/Container';

const Categories = ["Watch","Tv","Camera","Laptop"];


const Blog = () => {
  return (
    <>
    <Meta title={"Blogs"} />
    <BreadCrumb title={"Blogs"} />
    <Container class1="blog-wrapper home-wrapper-2 py-5">


            <div className="row">
                    <div className="col-3">
                    <div className='text-dark filter-card mb-3'>
                        <h3 className="filter-title">Shop By Category</h3>
                        <ul>
                            {Categories.map((cat)=>{
                                return <li>{cat}</li>
                            })}
                        </ul>
                     </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <Card />
                            </div>
                            <div className="col-6 mb-3">
                                <Card />
                            </div>
                            <div className="col-6 mb-3">
                                <Card />
                            </div>
                            <div className="col-6 mb-3">
                                <Card />
                            </div>
                        </div>
                            
                        
                    </div>
                </div>
    </Container>
       
    </>
  )
}

export default Blog
