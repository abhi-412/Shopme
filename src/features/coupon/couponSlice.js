import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { couponService } from "./couponService";
import { toast } from "react-toastify";




export const getCoupons = createAsyncThunk(
    "coupon/get-all",
    async (ThunkAPI)=>{
        try{
           return await couponService.getCoupons();
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)



export const getCoupon = createAsyncThunk('coupon/get-coupon',async(id,thunkAPI)=>{

    try{
        return await couponService.getCoupon(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})



const initialState = {
    coupon:{},
    coupons:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const couponSlice = createSlice({
    name:"coupon",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCoupons.pending,(state)=>{
            state.isLoading = true;
            state.isError=false;
            state.isSuccess=false;
        })
        .addCase(getCoupons.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.coupons = action.payload;
        })
        .addCase(getCoupons.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(getCoupon.pending,(state)=>{
            state.isLoading = true;
            state.isError=false;
            state.isSuccess=false;
        })
        .addCase(getCoupon.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.coupon = action.payload;
        })
        .addCase(getCoupon.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
            if(state.isError){
                toast.error("An Error Occured");
            }
        })
    }

})

export default couponSlice.reducer;