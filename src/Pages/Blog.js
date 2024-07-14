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


            <div className="grid grid-cols-12 gap-3">
                    <div className="md:col-span-3 hidden md:block">
                    <div className='text-dark filter-card mb-3'>
                        <h3 className="filter-title">Shop By Category</h3>
                        <ul>
                            {Categories.map((cat)=>{
                                return <li>{cat}</li>
                            })}
                        </ul>
                     </div>
                    </div>
                    <div className="md:col-span-9 col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                <Card />
                            
                                <Card />
                           
                                <Card />
                            
                                <Card /> 
                        
                    </div>
                </div>
    </Container>
       
    </>
  )
}

export default Blog
