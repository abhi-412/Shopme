import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Meta from '../Components/Meta'
import Color from '../Components/Color'
import Container from '../Components/Container'
import CompareCard from '../Components/CompareCard'

const CompareProduct = () => {
  return (
    <>
        <Meta title={"Compare Products"} />
        <BreadCrumb title={"Compare Products"} />
            
        <Container class1=" py-5">
            <div className="w-full flex gap-4 flex-nowrap overflow-x-auto">
            
                <CompareCard />
                <CompareCard />
                <CompareCard />
                <CompareCard />

            </div>
               
        </Container>

       
    </>
  )
}

export default CompareProduct
