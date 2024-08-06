import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";


const register = async (userData)=>{
    const response = await axios.post(`${base_url}user/register`,userData);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const getOneUser = async(id)=>{
    const response = await axios.get(`${base_url}user/${id}`,config);
    return response.data;
}

const login = async (userData)=>{
    const response = await axios.post(`${base_url}user/login`,userData);
    if(response.data){
        localStorage.setItem('customer',JSON.stringify(response.data));
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const logout = async()=>{
    localStorage.removeItem('token');
}

const addToCart = async(cart)=>{
    console.log(config);
    const response = await axios.post(`${base_url}user/cart`,cart,config);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const getUserWishlist = async ()=>{
    const response = await axios.get(`${base_url}user/wishlist`,config);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const getUserCart = async ()=>{
    const response = await axios.get(`${base_url}user/get-cart`,config);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const saveAddress = async (address)=>{
    const response = await axios.put(`${base_url}user/save-address`,address,config);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const getUserAddress = async ()=>{
    const response = await axios.get(`${base_url}user/address`,config);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const createOrder = async(orderDetails)=>{
    const response = await axios.post(`${base_url}user/create-order`,orderDetails,config);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const getOrders = async(id)=>{
    const response = await axios.get(`${base_url}user/orders/${id}`,config);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

const forgetPass = async(values)=>{
    const response = await axios.post(`${base_url}user/forgot-password-token`,values);
    return response.data
}

const resetPass = async(data)=>{
    const response = await axios.put(`${base_url}user/reset-password/${data.token}`,{password:data.password});
    return response.data;
}

export const authService = {
    register,
    login,
    getOneUser,
    getUserWishlist,
    logout,
    addToCart,
    getUserCart,
    saveAddress,
    getUserAddress,
    createOrder,
    getOrders,
    forgetPass,
    resetPass
}