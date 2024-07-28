import { createAction, createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import colorService from './colorService'

export const getColors = createAsyncThunk(
    "colors/get-all",
    async (ThunkAPI)=>{
        try{
           return await colorService.getColors();

        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)







const initialState= {
    colors: [],
    isLoading:false,
    isError:false,
    isSuccess: false,
    message:"",
};
export const colorSlice = createSlice({
    name:"colors",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getColors.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getColors.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.colors = action.payload;
        })
        .addCase(getColors.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        })
        
    }
})

export default colorSlice.reducer;