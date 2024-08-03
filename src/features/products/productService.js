import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";




const getProducts = async (filters)=>{
    const {page, limit, sortBy, price, color,tags, categories,outOfStock} = filters;
    let url = `${base_url}product?page=${page}&limit=${limit}`

    if(categories.length > 0){
       categories.map((cat)=>{
        url = url + `&category=${cat}`
       })
    }
    if(tags.length > 0){
        tags.map((t)=>{
         url = url + `&tags=${t}`
        })
     }

    if(color){
        url = url + `&color.color=${color}`
    }

    if(price){
        const {gte,lte} = price
        url = url + `&price[gte]=${gte}&price[lte]=${lte}`
    }
     if(sortBy){
        const {sort,order} =sortBy;
        url = url + `&sort=${sort}&order=${order}`
     }

     if(outOfStock){
        url = url + `&outOfStock=${outOfStock}`
     }
    
    const response = await axios.get(url);
    // const response = await axios.get(`${base_url}product/`);
    return response.data;
}

// const getProducts = async (filters)=>{
   
//     const response = await axios.get(`${base_url}product?${filters}`);
//     return response.data;
// }

const getProduct = async (id)=>{
    const response = await axios.get(`${base_url}product/${id}`);
    return response.data;
}

const addToWishList = async (id)=>{
    const response = await axios.put(`${base_url}product/wishlist`,{productId : id},config);
    return response.data;
}

const addReview = async(review)=>{
    const response = await axios.put(`${base_url}product/rating`,{star:review.star , comment:review.comment, productId:review.productId},config)
    return response.data;
}



const productService = {
    getProducts,
    getProduct,
    addToWishList,
    addReview
}

export default productService