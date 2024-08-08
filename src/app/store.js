import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blog/blogSlice";
import couponReducer from "../features/coupon/couponSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import categoryReducer from "../features/category/categorySlice";
import colorReducer from "../features/color/colorSlice";
import blogCategoryReducer from "../features/blogCategory/blCatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
    blog:blogReducer,
    coupon:couponReducer,
    enquiry:enquiryReducer,
    category:categoryReducer,
    color:colorReducer,
    blogCategory:blogCategoryReducer
  },
});
