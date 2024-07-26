import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enquiryService } from "./enquiryService";
import { toast } from "react-toastify";


export const createEnquiry = createAsyncThunk('enquiry/create-enquiry',async(enqData,thunkAPI)=>{
    try {
        return await enquiryService.createEnquiry(enqData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
})

const initialState = {
    createdEnquiry : {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}


export const enquirySlice = createSlice({
    name: 'enquiry',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createEnquiry.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = ''
            })
            .addCase(createEnquiry.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true;
                state.isError = false;
                state.createdEnquiry = action.payload;
                if(state.isSuccess && state.createdEnquiry){
                    toast.success("Successfully submitted your Enquiry");
                }
            })
            .addCase(createEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload
            })
    }
})

export default enquirySlice.reducer