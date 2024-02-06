import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GoHeart } from "react-icons/go";
import ReactStars from 'react-stars';

const FeaturedCard = (props) => {
    const {grid} = props;
    // console.log(grid);
    let location=useLocation();
  return (
    <>
   <div className={`${location.pathname == "/store" ? `gr-${grid}` : "col-3"}`} >
    <Link to={'/product/:id'} className="featured-card position-relative">
        <div className='icon position-absolute'>
        <GoHeart />
        </div>
        <div className='featured-image'>
        <img className='img-fluid'  src="/assets/watch.jpg" alt="Featured product" />
        <img className='img-fluid'  src="/assets/watch-2.jpg" alt="Featured product" />
        </div>
        <div className="featured-body">
            <h6 className="brand">Timex</h6>
            <p className="featured-item-text">Modern Watch Bulk 10<br /> Pack Multi For.. </p>
            <p className={`description ${grid===12 ? "d-block" : "d-none"}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima praesentium nesciunt qui nam tempore accusantium, repellat velit reprehenderit sed sit magni, hic autem aut.......</p>
            <ReactStars
            count={5}
            value={3}
            edit={false}
            size={24}
            color2={'#ffd700'} />
            <h5 className='price'>$100.00</h5>
        </div>
        <div className='action-bar position-absolute'>
            <div className='d-flex flex-column gap-15'>
                <button className='border-0 bg-transparent'>
                    <img src="/images/add-cart.svg" alt="cart" />
                </button>
                <button className='border-0 bg-transparent'>
                    <img src="/images/view.svg" alt="view" />
                </button>
                <button className='border-0 bg-transparent'>
                    <img src="/images/prodcompare.svg" alt="compare" />
                </button>
            </div>

        </div>
    </Link>
   </div>

</>
  )
}

export default FeaturedCard
