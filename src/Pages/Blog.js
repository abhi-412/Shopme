import React, { useEffect } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import Card from '../Components/Card';
import Container from '../Components/Container';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blog/blogSlice';

const Categories = ["Watch","Tv","Camera","Laptop"];


const Blog = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getBlogs());
  },[dispatch]);

  const blog = useSelector((state)=>state.blog?.blogs)


  return (
    <>
    <Meta title={"Blogs"} />
    <BreadCrumb title={"Blogs"} />
    <Container class1="blog-wrapper home-wrapper-2 py-5">

        <div className='flex justify-center w-full mb-5'>
          <h1 className='text-3xl font-semibold'> Read Our Blogs Here</h1>
        </div>

            <div className="flex flex-wrap gap-3">
                    <div className='text-dark bg-white flex flex-col gap-3 rounded-lg p-3  mb-3'>
                        <h3 className="text-lg font-semibold">Search By Category</h3>
                        <ul className='flex flex-col gap-2'>
                            {Categories.map((cat)=>{
                                return <li>{cat}</li>
                            })}
                        </ul>
                     </div>
                      {blog?.map((item)=>{
                          return <Card key={item._id} blog={item}/>
                      })}
                        
                  
                </div>
    </Container>
       
    </>
  )
}

export default Blog
