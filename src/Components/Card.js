import React from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <>
        <div className="blog-card min-w-[200px]">
        <img className="img-fluid w-100" src="/images/blog-1.jpg" alt="Card cap" />
        <div className="card-body">
            <p className='md:text-sm text-xs'>11-12-23</p>
            <h5 className="md:text-lg text-md font-semibold">A beautiful Morning</h5>
            <p className="md:text-sm text-xs">Some quick example text to build on the card title and make up the</p>
            <Link to={'/blog/:id'} className="bg-orange-900 py-1.5 px-3 text-xs md:text-md rounded-2xl my-2 text-white hover:bg-amber-700">Read More</Link>
        </div>
        </div>
    
    </>
  )
}

export default Card
