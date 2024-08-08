import { base_url } from "../../utils/base_url";
import axios from "axios";
import config from "../../utils/config";

const getblCategories  = async()=>{
    const response = await axios.get(`${base_url}blogCat`);
    return response.data;
}



const blCatService = {
getblCategories,
}

export default blCatService;