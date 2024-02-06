import React from 'react'
import '../styles/Header.scss'
import { Link, NavLink } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'


const Header = () => {

  return (
    <>
    <header className='header-top-strip' >
      <div className='container-xxl '>
        <div className='row' >
          <div className='col-6'>
            <p className='text-dark mt-2'>Free Shipping over $100 & free Returns</p>
          </div>
          <div className='col-6'>
            <p className='text-end text-dark mt-2'>
              Hotline: <a className='text-dark' href="tel:+ 8790989087">8790989087</a>
            </p>
          </div>
          
        </div>
      </div>

       
    </header>

    <header className="header-upper py-3">
      <div className="container-xxl">
        <div className="row align-icon">
          <div className="col-2">
            <h2><Link className='text-black'>Shopnow</Link></h2>
            </div>
            <div className="col-5">
                  <div className="input-group">
                    <input type="text" 
                    className="form-control py-2" 
                    placeholder="Search Product" 
                    aria-label="Search Product" 
                    aria-describedby="basic-addon2" 
                    />
                    <span className="input-group-text p-3"
                     id="basic-addon2">
                      < BsSearch className='fs-6'/>
                     </span>
                  </div>
                </div>
            <div className="col-5">

                <div className="header-upper-links d-flex 
                align-items-center 
                justify-content-between">
                      <div>
                        <Link to='/compare-product' className='d-flex align-items-center gap-10 text-black'>
                              <img src="/images/compare.svg" alt="compare" />
                              <p className='mb-0'>Compare <br /> Products</p>
                        </Link>
                      </div>
                      <div>
                        <Link to="/wishlist" className='d-flex align-items-center gap-10 text-black'>
                              <img src="/images/wishlist.svg" alt="wishlist" />
                              <p className='mb-0'>Favorite <br />WishList</p>
                        </Link>
                      </div>
                      <div>
                        <Link to="/login" className='d-flex align-items-center gap-10 text-black'>
                              <img src="/assets/login.svg" alt="signUp" />
                              <p className='mb-0'>Login <br /> SignUp</p>
                        </Link>
                      </div>
                      <div>
                        <Link to="/cart" className='d-flex align-items-center gap-10 text-black'>
                              <img src="/images/cart.svg" alt="cart" />
                              <div className='d-flex flex-column'>
                                <span className='badge bg-black text-white'>0</span>
                                <p className='mb-0'>$ 500</p>
                              </div>
                        </Link>
                      </div>

                </div>

            </div>
        </div>
      </div>
    </header>
    

    <header className="header-bottom py-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-35">
                <div>

                <div className="dropdown">
                    <button className="btn dropdown-toggle border-0 gap-15 d-flex align-items-center" 
                    type="button" id="dropdownMenuButton1" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="" />
                      <span> Shop Categories</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item" to={'/'}>Action</Link></li>
                      <li><Link className="dropdown-item" to={'/'}>Another action</Link></li>
                      <li><Link className="dropdown-item" to={'/'}>Something else here</Link></li>
                    </ul>
                  </div>

                </div>

                <div className="menu-links">
                    <div className='d-flex align-items-center gap-15'>
                        <NavLink  to={'/'}>HOME</NavLink>
                        <NavLink  to={'/store'}>OUR STORE</NavLink>
                        <NavLink  to={'/blogs'}>BLOGS</NavLink>
                        <NavLink  to={'/contact'}>CONTACT</NavLink>
                    </div>
                </div>

              </div>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header







 


