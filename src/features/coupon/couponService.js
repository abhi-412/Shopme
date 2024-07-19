import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";



const getCoupons = async ()=>{
    const response = await axios.get(`${base_url}coupon`,config)
    return response.data;
}



const getCoupon = async(id)=>{
    const response = await axios.get(`${base_url}coupon/${id}`,config);
    return response.data;
}



export const couponService = {
    getCoupons,
    getCoupon
}