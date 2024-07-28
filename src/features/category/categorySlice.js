import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getcategories = createAsyncThunk(
    "category/get-all",
    async(ThunkAPI)=>{
        try{
            return await categoryService.getcategories();
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)




// export const getProdCat = createAsyncThunk('prodCategories/get-prodCategory',async(id,thunkAPI)=>{

//     try{
//         return await prodCatService.getproductCategory(id);

//     }catch(error){
//         return thunkAPI.rejectWithValue(error);
//     }
// })



// export const resetState = createAction("Reset_All");



const initialState ={
    categories: [],
    // prodCatName:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getcategories.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getcategories.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.categories=action.payload;
        })
        .addCase(getcategories.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        })
        // .addCase(getProdCat.pending,(state)=>{
        //     state.isLoading = true
        // })
        // .addCase(getProdCat.fulfilled,(state,action)=>{
        //     state.isError=false
        //     state.isLoading=false
        //     state.isSuccess=true
        //     state.prodCatName=action.payload.title; 
        // })
        // .addCase(getProdCat.rejected,(state,action)=>{
        //     state.isError=true
        //     state.isLoading=false
        //     state.isSuccess=false
        //     state.message=action.error;
        // })

    }
})

export default categorySlice.reducer;