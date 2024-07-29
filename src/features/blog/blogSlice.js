import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from './blogService'
import { toast } from "react-toastify";

export const getBlogs = createAsyncThunk(
    "blog/get-all",
    async(ThunkAPI)=>{
        try{
            const res =  await blogService.getBlogs()
            return res.blogs;
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)

export const getBlog = createAsyncThunk('blog/get-blog',async(id,thunkAPI)=>{
    try{
        return await blogService.getBlog(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})



export const likeBlog = createAsyncThunk('blog/like-blog',async(blogId,thunkAPI)=>{
    try{
        return await blogService.likeBlog(blogId);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const dislikeBlog = createAsyncThunk('blog/dislike-blog',async(blogId,thunkAPI)=>{
    try{
        return await blogService.dislikeBlog(blogId);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


const initialState = {
    blogs: [],
    blog:{},
    likedBlog:{},
    dislikedBlog:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const blogSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogs.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getBlogs.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.blogs=action.payload;
        }).addCase(getBlogs.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Something went wrong");
            }
        }).addCase(getBlog.pending,(state)=>{
            state.isLoading = true
            state.isSuccess=false;
            state.isError = false;
        })
        .addCase(getBlog.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.blog=action.payload;
        }).addCase(getBlog.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Cannot find this blog.");
            }
        }).addCase(likeBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(likeBlog.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.likedBlog=action.payload;
        }).addCase(likeBlog.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Some error Occured.");
            }
        }).addCase(dislikeBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(dislikeBlog.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.dislikedBlog=action.payload;
        }).addCase(dislikeBlog.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Some error Occured.");
            }
        })
    }
})
export default blogSlice.reducer;