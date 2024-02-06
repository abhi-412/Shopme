import React from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <>
        <div className="blog-card">
        <img className="img-fluid w-100" src="/images/blog-1.jpg" alt="Card cap" />
        <div className="card-body">
            <p className='date'>11-12-23</p>
            <h5 className="title">A beautiful Morning</h5>
            <p className="blog-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Link to={'/blog/:id'} className="button">Read More</Link>
        </div>
        </div>
    
    </>
  )
}

export default Card
