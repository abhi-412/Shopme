import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blCatService from "./blCatService";

export const getblCategories = createAsyncThunk(
    "blogCategories/get-all",
    async(ThunkAPI)=>{
        try{
            return await blCatService.getblCategories()
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)

export const resetState = createAction("Reset_All");

const initialState ={
    blCategories: [],
    createdBlogCat:{},
    deletedBlogCat:{},
    blogCatName:"",
    updatedBlogCat:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"", 
}

export const blCatSlice = createSlice({
    name:"blCategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getblCategories.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getblCategories.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.blCategories=action.payload;
        })
        .addCase(getblCategories.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(resetState,()=>initialState)
    }
})

export default blCatSlice.reducer;