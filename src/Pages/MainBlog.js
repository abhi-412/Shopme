import React, { useEffect } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { Link, useLocation } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import Container from '../Components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { dislikeBlog, getBlog, likeBlog } from '../features/blog/blogSlice';
import { AiFillLike,AiOutlineLike } from "react-icons/ai";
import { BiDislike,BiSolidDislike } from "react-icons/bi";
import Loader from './Loader';


const MainBlog = () => {

    const location = useLocation();
    const id = location.pathname.split('/')[2]

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBlog(id));
    },[dispatch, id])

    const addLikeToBlog = (blogId)=>{

        dispatch(likeBlog(blogId));
        setTimeout(()=>{
            dispatch(getBlog(id));
        },200)
    }

    const addDislikeToBlog = (blogId)=>{
        dispatch(dislikeBlog(blogId));
        setTimeout(()=>{
            dispatch(getBlog(id));
        },200)
    }

    const parser = new DOMParser();
    const {blog,isLoading} = useSelector((state)=>state.blog?.blog);
    

  return (
   <>
   <Meta title={"Blog Name"} />
    <BreadCrumb title={"Blog Name"} />

        <Container class1="bg-gray-100 py-5 gap-5">
        <Link to={'/blogs'} className='flex items-center gap-3 mb-4'>      
                    <GoArrowLeft /> Go back to Blogs
                </Link>

                {isLoading ? (
        <div className='w-full flex justify-center items-center h-[200px]'>
        <Loader/> 
      </div>
):(
                        <div className=' flex justify-center w-full'>
                        <div className="flex flex-col md:p-4 p-3 bg-white md:w-3/4">
                           
                            <img src={blog?.images?.length ? blog?.images[0]?.url : "/images/blog-01.jpg"} className='img-fluid w-100 my-4' alt="blog" />
                            <div className='flex justify-between gap-2'>
                            <div className='flex flex-col gap-2'>
                            <h3 className="md:text-3xl text-xl">
                                {blog?.title}
                            </h3>
                            <p className='text-gray-500 md:text-sm text-xs md:mb-3'>{blog?.numViews} Views</p>
                            <p className='text-gray-600 text-sm md:text-base'>{parser.parseFromString(blog?.description,"text/html").body.textContent}</p>
            
                            </div>
                            <div className='flex items-center gap-3'>
                                <div>
                                <button onClick={()=>{addLikeToBlog(blog?._id)}} className='md:text-xl text-md  text-gray-700'>{blog?.isLiked ? <AiFillLike className='text-blue-500'/> : <AiOutlineLike/>}</button>
                                <p className=' text-gray-700 md:text-md text-sm'>{blog?.likes?.length ? blog?.likes?.length : 0}</p>
                                </div>
                                {/* <p className=' text-gray-700'>{blog?.isLiked && blog.numLikes }</p> */}
                                <div>
                                <button onClick={()=>{addDislikeToBlog(blog?._id)}} className='md:text-xl text-md  text-gray-700'>{blog?.isDisliked ? <BiSolidDislike className='text-blue-500'/> : <BiDislike/>}</button>
                                <p className=' text-gray-700 md:text-md text-sm'>{blog?.dislikes?.length ? blog?.dislikes?.length : 0}</p>                       
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
)}
           
        </Container>
   
   </>
  )
}

export default MainBlog
