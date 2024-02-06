import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import Container from '../Components/Container';



const MainBlog = () => {
  return (
   <>
   <Meta title={"Blog Name"} />
    <BreadCrumb title={"Blog Name"} />

    <Container class1="blog-wrapper home-wrapper-2 py-5">
            <div className="row">
                    <div className="col-12">
                        <div className="main-blog-card">
                            <Link to={'/blogs'} className='d-flex align-items-center gap-10'>      
                               <GoArrowLeft /> Go back to Blogs
                            </Link>
                            <h3 className="title">
                                A beautiful Sunday Morning
                            </h3>
                            <img src="/images/blog-1.jpg" className='img-fluid w-100 my-4' alt="blog" />
                            <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo nulla vitae enim. Placeat modi in voluptas error voluptate et ea nobis alias, nesciunt iusto veritatis tempore dolor nulla dignissimos adipisci?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum placeat aperiam odio, suscipit iste vel adipisci minima cum mollitia laudantium nesciunt eius ab, earum reiciendis alias veniam laborum, maiores saepe.
                            </p>
                        </div>
                        
                        
                    </div>
                </div>
    </Container>
   
   </>
  )
}

export default MainBlog
