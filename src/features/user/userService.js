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

const getUserWishlist = async (userData)=>{
    const response = await axios.get(`${base_url}user/wishlist`,config);
    if(response.data){
        return response.data;
    }else{
        console.log("Error Occured");
    }
}

export const authService = {
    register,
    login,
    getOneUser,
    getUserWishlist
}