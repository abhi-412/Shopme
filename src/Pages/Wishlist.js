import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import Container from '../Components/Container'

const Wishlist = () => {
  return (
    <>
      <Meta title={"Wishlist"} />
        <BreadCrumb title={"Wishlist"} />

        <Container class1="wishlist-wrapper py-5 home-wrapper-2">
        <div className="row">
                   
                   <div className="col-3">
                       <div className="wishlist-card position-relative">
                          
                           <img src="images/cross.svg" alt="cross" className="position-absolute img-fluid cross" />
                             <div className="wishlist-card-image">
                                <img className='img-fluid w-100' src="images/watch.jpg" alt="" />
                             </div>
                             <div className='py-3'>
                             <h5 className="title">
                               Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wifi+3G Tablet
                           </h5>
                           <h6 className="price mb-3">$100</h6>
                             </div>
                       </div>
                   </div>
               
                   <div className="col-3">
                       <div className="wishlist-card position-relative">
                          
                           <img src="images/cross.svg" alt="cross" className="position-absolute img-fluid cross" />
                             <div className="wishlist-card-image">
                                <img className='img-fluid w-100' src="images/watch.jpg" alt="" />
                             </div>
                             <div className='py-3'>
                             <h5 className="title">
                               Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wifi+3G Tablet
                           </h5>
                           <h6 className="price mb-3">$100</h6>
                             </div>
                       </div>
                   </div>
           </div>
        </Container>

        
        </>
  )
}

export default Wishlist
