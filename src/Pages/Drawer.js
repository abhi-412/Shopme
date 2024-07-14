import React from 'react';
import ReactStars from 'react-stars';
 // Import your data and handlers
// import Color from './Color'; // Import the Color component

const Drawer = (props) => {
    

    const { Categories, priceFilterBy, handlePriceRange, size, tags,toggleDrawer,isDrawerOpen } = props;
  return (
    <div className={`absolute top-20 right-0 z-40 h-full p-4 overflow-y-auto transition-transform -translate-x-50 bg-white w-96 dark:bg-gray-800 drawer`} tabindex="-1" aria-labelledby="drawer-backdrop-label">
        <h5 id="drawer-backdrop-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
      <button onClick={toggleDrawer} type="button" data-drawer-hide="drawer-backdrop" aria-controls="drawer-backdrop" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="py-4 overflow-y-auto">
        <div className='text-dark filter-card mb-3'>
          <h3 className="filter-title">Shop By Category</h3>
          <ul>
            {Categories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </div>

        <div className='text-dark filter-card mb-3'>
          <h3 className="filter-title mb-3">Filter By</h3>
          <div>
            <h5 className='sub-title'>Availability</h5>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" value={""} id='' />
              <label htmlFor="" className="form-check-label">In Stock [1]</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" value={""} id='' checked />
              <label htmlFor="" className="form-check-label">Out of Stock [0]</label>
            </div>
          </div>
          
          <div className='mb-3'>
            <h5 className='sub-title mb-3'>Price</h5>
            <div className="form-range d-flex flex-column justify-content-center gap-2">
              <h6 className='mb-0'>From $0 to ${priceFilterBy}</h6>
              <div className="filter-range">
                <input type="range" className="form-range" min="0" max="10000" step="10" onChange={handlePriceRange} id="customRange3" value={priceFilterBy} />
              </div>
            </div>
          </div>
          
          <div className='mb-3'>
            <h5 className='sub-title mb-3'>Colors</h5>
            <div>
              {/* <Color /> */}
            </div>
          </div>

          <div className='mb-3'>
            <h5 className='sub-title'>Size</h5>
            <div className='d-flex gap-10 justify-content-around align-items-center flex-wrap'>
              {size.map((sz) => (
                <div className="form-check d-flex gap-10 align-items-center" key={sz}>
                  <input type="checkbox" className="form-check-input" value={""} id='' />
                  <label htmlFor="" className="form-check-label mt-1">{sz}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='text-dark filter-card mb-3'>
          <h3 className="filter-title">Product Tags</h3>
          <div className='product-tags d-flex flex-wrap gap-10'>
            {tags.map((tag) => (
              <span key={tag} className='badge bg-light text-secondary rounded-3 py-2 px-2'>{tag}</span>
            ))}
          </div>
        </div>

        <div className='text-dark filter-card mb-3'>
          <h3 className="filter-title">Random Products</h3>
          <div>
            <div className='random-products d-flex mb-3'>
              <div className="w-50">
                <img src='/images/headphone.jpg' className='img-fluid' alt="random-image-2" />
              </div>
              <div className="w-50">
                <h6>Kids Headphones Bulk 10 <br />Pack Multi Colored For..</h6>
                <ReactStars count={5} value={3} edit={false} size={24} color2={'#ffd700'} />
                <p>$100 only</p>
              </div>
            </div>

            <div className='random-products d-flex'>
              <div className="w-50">
                <img src='/images/watch.jpg' className='img-fluid' alt="random-image-2" />
              </div>
              <div className="w-50">
                <h6>Aspiron Watch <br />Blue Sapphire Color</h6>
                <ReactStars count={5} value={4} edit={false} size={24} color2={'#ffd700'} />
                <p>$60 only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
