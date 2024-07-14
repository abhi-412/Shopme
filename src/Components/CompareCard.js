import React from 'react'
import Color from '../Components/Color'

const CompareCard = () => {
  return (

    <div className="compare-product-card min-w-[300px] position-relative">
    <img src="images/cross.svg" alt="cross" className="position-absolute img-fluid cross" />
    <div className="product-card-image">
       <img src="images/watch.jpg" alt="" />
    </div>
<div className="compare-product-details">
    <h5 className="title">
        Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wifi+3G Tablet
    </h5>
    <h6 className="price mb-3">$100</h6>
</div>
<div className="product-details">
    <h5>Brand</h5>
    <p>Havels</p>
</div>
<div className="product-details">
    <h5>Type</h5>
    <p>Watch</p>
</div>
<div className="product-details">
    <h5>Availibility</h5>
    <p>In Stock</p>
</div>
<div className="product-details">
    <h5>Color</h5>
    <p>Havels</p>
</div>
<div className="product-details">
    <h5>Color</h5>
    <Color />
</div>
<div className="product-details">
    <h5>Size</h5>
    <div className="d-flex gap-2">
        <p>S</p>
        <p>M</p>
        <p>L</p>

    </div>
</div>
</div>
  )
}

export default CompareCard
