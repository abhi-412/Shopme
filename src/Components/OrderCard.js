// OrderCard.js
import React from 'react';
import { GrNext } from 'react-icons/gr';



const OrderCard = ({ order, handleSelect, onCancel }) => {
    const products = order?.items
return (
  <div onClick={()=>{handleSelect(order?._id)}} className=" p-3 mb-3 flex justify-between items-center hover:shadow-md hover:scale-105 cursor-pointer transition delay-75 duration-300 border-b border-gray-600 ">
    <div className="flex gap-2 items-start flex-col mb-2">
    {products?.map((p)=>{
        return <div className='flex justify-between gap-1'>
            <img src={p.product?.images?.length > 0 ? p.product?.images[0].url : ""} alt={p.name} className="w-20 h-20 object-cover rounded mr-4 border border-gray-300" />
            <div className='flex flex-col gap-1 justify-center text-gray-600 text-sm'>
                <p className='text-sm text-black'><span className={` text-sm font-medium ${order?.orderStatus === 'Delivered' ? ' text-green-800' : ' text-yellow-600'}`}>{order?.orderStatus}</span> on {new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit' }).format(new Date(order?.updatedAt))}</p>
                {/* <p>{order.orderStatus} on {new Date(order?.updatedAt).toLocaleDateString()}</p> */}
                <p>{p.product?.title?.length > 20 ? p.product?.title.slice(0, 20) + "..." : p.product?.title}</p>

            </div>
        </div>
    })}
      
    </div>
    <button className='p-1 bg-gray-300  hover:scale-110 text-gray-700 rounded-full'>
        <GrNext />
    </button>
  </div>
)
};

export default OrderCard;
