import React, { useEffect, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import Card from '../Components/Card';
import Container from '../Components/Container';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blog/blogSlice';
import Loader from "./Loader"
import { getblCategories } from '../features/blogCategory/blCatSlice';

const Categories = ["Watch","Tv","Camera","Laptop"];


const Blog = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getBlogs());
    dispatch(getblCategories());
  },[dispatch]);

  const blogs = useSelector((state)=>state.blog?.blogs)
  const isLoading = useSelector((state)=>state.blog?.isLoading)
  const blogCategories = useSelector((state)=>state?.blogCategory?.blCategories)

  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState([]);

    const handleShowMore = () => {
      setVisibleCount((prevCount) => prevCount + 10);
    };

    const visibleCategories = blogCategories.slice(0, visibleCount);
    const remainingCount = blogCategories.length - visibleCount;
    const handleCategoryChange = (category) => {
      if (selectedCategories.includes(category)) {
          setSelectedCategories(selectedCategories.filter(cat => cat !== category));
      } else {
          setSelectedCategories([...selectedCategories, category]);
      }
  };


    const filteredBlogs = blogs?.filter((b)=>{
        if(selectedCategories.length === 0){
            return b
        }else{
            return selectedCategories.includes(b.category)
        }
    })

  return (
    <>
    <Meta title={"Blogs"} />
    <BreadCrumb title={"Blogs"} />
    <Container class1="blog-wrapper home-wrapper-2 py-5">

        <div className='flex justify-center w-full mb-5'>
          <h1 className='text-3xl font-semibold'> Read Our Blogs Here</h1>
        </div>

            <div className="flex flex-wrap gap-3 relative">
                    <div className='text-dark  bg-white flex flex-col gap-3 rounded-lg p-3  mb-3'>
                        <h3 className="text-lg font-semibold">Search By Category</h3>
                        <ul className='flex w-[250px] flex-wrap items-center gap-3'>
                                {visibleCategories.length > 0 && visibleCategories.map((cat) => (
                                <li
                                    onClick={() => handleCategoryChange(cat.title)}
                                    key={cat?._id}
                                    className={`cursor-pointer ${selectedCategories.includes(cat?.title) ? "text-white bg-blue-500" : "bg-gray-200 text-gray-500"} text-xs font-semibold rounded-3 py-1 px-2`}
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

                    {isLoading ? <div className='w-full flex justify-center items-center h-[200px]'>
                      <Loader/> 
                    </div>: (
                      
                      filteredBlogs?.map((item)=>{
                        return <Card key={item._id} blog={item}/>
                    })
                  )}
                      
                        
                  
                </div>
    </Container>
       
    </>
  )
}

export default Blog
