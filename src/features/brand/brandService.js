import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";
 
const getBrands = async ()=>{
    const response = await axios.get(`${base_url}brands`)
    return response.data;
}

const getBrand = async(id)=>{
    const response = await axios.get(`${base_url}brands/${id}`,config);
    return response.data;
}


const brandService = {
    getBrands,
    getBrand,
    
};

export default brandService;