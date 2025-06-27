import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../featuers/auth/authSlice";
import productReducer from "../featuers/product/productSlice"
import cartReducer from "../featuers/cart/cartSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        product:productReducer,
        cart:cartReducer
    }
});
export default store;