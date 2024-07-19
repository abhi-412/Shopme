import { base_url } from "../../utils/base_url";
import axios from "axios";
import config from "../../utils/config";


const getBlogs  = async()=>{
    const response = await axios.get(`${base_url}blog`);
    return response.data;
}


const getBlog = async(id)=>{
    const response = await axios.get(`${base_url}blog/${id}`,config);
    return response.data;
}

const likeBlog = async(blogId)=>{
    const response = await axios.put(`${base_url}blog/likes`,{blogId:blogId},config);
    return response.data;
}

const dislikeBlog = async(blogId)=>{
    const response = await axios.put(`${base_url}blog/dislike`,{blogId:blogId},config);
    return response.data;
}


const blogService = {
    getBlogs,
    getBlog,
    likeBlog,
    dislikeBlog
}

export default blogService;

