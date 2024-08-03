import { createAction, createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";


export const getProducts = createAsyncThunk('product/get-products',async(queryObj,thunkAPI)=>{

    try{
        return await productService.getProducts(queryObj);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})




export const getProduct = createAsyncThunk(
    "product/get-one",
    async(id,ThunkAPI)=>{
        try{
            const res = await productService.getProduct(id);
            return res;
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
)


export const addToWishList = createAsyncThunk(
    "product/wishlist",
    async(id,ThunkAPI)=>{
        try{
            const res = await productService.addToWishList(id);
            return res;
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
)

export const addReview = createAsyncThunk(
    "product/rating",
    async(review,ThunkAPI)=>{
        try{
            const res = await productService.addReview(review);
            return res;
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
)




const initialState = {
    products: [],
    product:{},
    totalPages:0,
    totalProducts:0,
    newReview:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.products = action.payload.products;
            state.totalPages = action.payload.totalPages;
            state.totalProducts = action.payload.totalProducts;
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getProduct.pending,(state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        })
        .addCase(getProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addToWishList.pending,(state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Added To wishlist";
        })
        .addCase(addToWishList.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error("Something went wrong")
            }
        }).addCase(addReview.pending,(state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(addReview.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.newReview = action.payload;
        })
        .addCase(addReview.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error("Couldn't add Review");
            }
        })
    },
})

export default productSlice.reducer;

