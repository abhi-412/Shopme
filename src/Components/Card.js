import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Card = ({blog}) => {
  const parser = new DOMParser();
  return (
    <>
        <div className=" bg-gray-50 rounded min-w-[200px] p-2 flex flex-col gap-2">
          <div className='w-full flex flex-col gap-2 mb-2'>
          <img className=" w-full h-[130px] " src={blog?.images?.length ? blog.images[0]?.url : "/images/blog-1.jpg" } alt="Card cap" />
          <p className='text-sm font font-semibold text-purple-500'>{blog?.author}</p>
          </div>
        <div className="card-body">
            <p className='md:text-sm text-xs'>{moment(blog?.createdAt).format("MMM Do YY")}</p>
            <h5 className="md:text-lg text-base font-semibold">{blog?.title}</h5>
            <p className="md:text-sm text-xs">{`${parser.parseFromString(blog?.description,"text/html").body.textContent.slice(0,100)}...`}</p>
            <Link to={`/blog/${blog?._id}`} className="bg-orange-900 py-1.5 px-3 text-xs md:text-md rounded-2xl my-2 text-white hover:bg-amber-700">Read More</Link>
        </div>
        </div>
    
    </>
  )
}

export default Card
