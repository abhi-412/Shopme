import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";




const getProducts = async ()=>{
    const response = await axios.get(`${base_url}product/`);
    return response.data;
}

const getProduct = async (id)=>{
    const response = await axios.get(`${base_url}product/${id}`);
    return response.data;
}

const addToWishList = async (id)=>{
    const response = await axios.put(`${base_url}product/wishlist`,{productId : id},config);
    return response.data;
}



const productService = {
    getProducts,
    getProduct,
    addToWishList
}

export default productService