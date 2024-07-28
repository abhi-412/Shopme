import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const getcategories  = async()=>{
    const response = await axios.get(`${base_url}category`,config);
    return response.data;
}



// const getcategory = async(id)=>{
//     const response = await axios.get(`${base_url}category/${id}`,config);
//     return response.data;
// }



const categoryService = {
    getcategories, 
   
}

export default categoryService;