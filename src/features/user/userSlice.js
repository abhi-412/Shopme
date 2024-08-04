import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';



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


export const getUserCart = createAsyncThunk('auth/get-cart',async(thunkAPI)=>{
    try {
        const res = await authService.getUserCart();
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

export const logout = createAsyncThunk('auth/logout',async(thunkAPI)=>{
    try {
        const res = await authService.logout();
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const addToCart = createAsyncThunk('auth/addToCart',async(cart,thunkAPI)=>{
    try{
        const res = await authService.addToCart(cart);
        return res;
    }catch(error){
        return thunkAPI.rejectWithValue(error?.response?.data?.message)
    }
})

export const saveAddress = createAsyncThunk('auth/save-address',async(address,thunkAPI)=>{
    try{
        const res = await authService.saveAddress(address);
        return res;
    }catch(error){
        return thunkAPI.rejectWithValue(error?.response?.data?.message)
    }
})

export const getUserAddress = createAsyncThunk('auth/get-address',async(thunkAPI)=>{
    try{
        const res = await authService.getUserAddress();
        return res;
    }catch(error){
        return thunkAPI.rejectWithValue(error?.response?.data?.message)
    }
})

export const createOrder = createAsyncThunk('auth/create-order',async(orderDetails,thunkAPI)=>{
    try{
        const res = await authService.createOrder(orderDetails);
        return res;
    }catch(error){
        return thunkAPI.rejectWithValue(error?.response?.data?.message)
    }
})


const customer = JSON.parse(localStorage.getItem('customer'));

export const getMyOrders = createAsyncThunk('auth/get-orders',async(id,thunkAPI)=>{
    try{
        const res = await authService.getOrders(id);
        return res;
    }catch(error){
        return thunkAPI.rejectWithValue(error?.response?.data?.message)
    }
})

const initialState = {
    user: {},
    newAddress: {},
    newOrder:{},
    curUser: customer ? customer : {},
    wishlist:[],
    address:[],
    cart:[],
    orders:[],
    isLoggedIn: customer ? true : false,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        checkTokenExpiration: (state) => {
            const token = JSON.parse(localStorage.getItem('token'));
            if (token) {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    localStorage.removeItem('customer');
                    localStorage.removeItem('token');
                    localStorage.removeItem('wishlist');
                    state.curUser = {};
                    toast.error("Session expired, please log in again.");
                }
            }
        }

    },
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
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
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.curUser = action.payload;
            if(state.curUser?._id && state.isSuccess){
            localStorage.setItem("token",JSON.stringify(state.curUser?.token));
                toast.info("Login Successfull");
                state.isLoggedIn = true;
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
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
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
        }).addCase(logout.pending,(state,action)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        }).addCase(logout.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
            if(state.isSuccess){
                state.isLoggedIn =false;
                localStorage.removeItem("customer")
            }
        }).addCase(logout.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
        }).addCase(addToCart.pending,(state,action)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
            
        }).addCase(addToCart.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload;
           
        }).addCase(getUserCart.pending,(state,action)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        }).addCase(getUserCart.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.cart = action.payload;
        }).addCase(getUserCart.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
            
        }).addCase(getUserAddress.pending,(state,action)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        }).addCase(getUserAddress.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.address = action.payload;
        }).addCase(getUserAddress.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
        }).addCase(saveAddress.pending,(state,action)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        }).addCase(saveAddress.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.newAddress = action.payload;
        }).addCase(saveAddress.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
        }).addCase(createOrder.pending,(state,action)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        }).addCase(createOrder.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.newOrder = action.payload;
        }).addCase(createOrder.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
        }).addCase(getMyOrders.pending,(state,action)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        }).addCase(getMyOrders.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
        }).addCase(getMyOrders.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload || "Something went wrong";
        })
    }
});

export const { checkTokenExpiration } = authSlice.actions;

export default authSlice.reducer