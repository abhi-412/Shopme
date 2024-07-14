import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const registerUser = createAsyncThunk('auth/register',async(userData,thunkAPI)=>{
    try {
        const res = await authService.register(userData);
        return res;
        
    } catch (error) {
        console.log(error?.response?.data?.message);
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
})

export const loginUser = createAsyncThunk('auth/login',async(userData,thunkAPI)=>{
    try {
        const res = await authService.login(userData);
        
        return res;
    } catch (error) {
        
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
})





export const getUserWishlist = createAsyncThunk('auth/wishlist',async(thunkAPI)=>{
    try {
        const res = await authService.getUserWishlist();
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
})





export const getOneUser = createAsyncThunk('auth/get-one',async(id,thunkAPI)=>{
    try {
        const res = await authService.getOneUser(id);
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
})


const customer = JSON.parse(localStorage.getItem('customer'));

const initialState = {
    user: {},
    curUser: customer ? customer : {},
    wishlist:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            if(state.user?._id && state.isSuccess){
                toast.success("User Created Successfully");
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
            if(state.isError){
                toast.error(state.message);
            }
        }).addCase(loginUser.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.curUser = action.payload;
            if(state.curUser?._id && state.isSuccess){
            localStorage.setItem("token",JSON.stringify(state.curUser?.token));
                toast.info("Login Successfull");
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
            if(state.isError){
                toast.error(state.message);
            }
        }).addCase(getUserWishlist.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(getUserWishlist.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        }).addCase(getUserWishlist.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
        })
    }
});

export default authSlice.reducer