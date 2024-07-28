import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const getColors = async ()=>{
    const response = await axios.get(`${base_url}color`)
    return response.data;
}




// const getColor = async(id)=>{
//     const response = await axios.get(`${base_url}color/${id}`,config);
//     return response.data;
// }


const colorService={
    getColors,
}

export default colorService;