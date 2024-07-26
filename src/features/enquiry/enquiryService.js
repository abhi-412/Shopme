import { base_url } from "../../utils/base_url";
import axios from "axios";
import config from "../../utils/config";



const createEnquiry = async(enqData)=>{
    const res =  await axios.post(`${base_url}enquiry/`,enqData,config);
    return res.data;
}

export const enquiryService = {
    createEnquiry,
}