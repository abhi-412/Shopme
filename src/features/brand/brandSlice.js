import brandService from "./brandService";
import { createAction, createAsyncThunk , createSlice } from "@reduxjs/toolkit";


export const getBrands = createAsyncThunk(
    'brands/all-brands',
    async(ThunkAPI)=>{
        try{
            return await brandService.getBrands();
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)


export const getBrand = createAsyncThunk('brands/get-brand',async(id,thunkAPI)=>{

    try{
        return await brandService.getBrand(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


const initialState = {
    brands: [],
    brandName:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const brandSlice = createSlice({
    name:"brands",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBrands.pending, (state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(getBrands.fulfilled, (state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.brands=action.payload;
        })
        .addCase(getBrands.rejected, (state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(getBrand.pending, (state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        }).addCase(getBrand.fulfilled, (state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.brandName=action.payload.title;
        })
        .addCase(getBrand.rejected, (state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        })
    },
}) 


export default brandSlice.reducer;

