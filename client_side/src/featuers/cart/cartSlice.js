import { createSlice } from "@reduxjs/toolkit";
import { cartItemRegister , cartItemsListView ,  cartItemUpdate ,  cartItemDelete} from "./cartActions";
import { backendURL } from "../../store/Constants";

const cart_state = {
    cart_items :[],
    cart_details :null,
    cart_item_register_loading:false,
    cart_item_register_error:null,

    cart_items_loading : false,
    cart_items_error : null,

    cart_item_delete_loading : false,
    cart_item_delete_error : null,

    cart_item_update_loading : false,
    cart_item_update_error : null,
}

const cartSlice = createSlice({
    name:"cart",
    initialState:cart_state,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(cartItemRegister.pending, (state) => {
            state.cart_item_register_loading = true;
            state.cart_item_register_error = null;
        })
        
        .addCase(cartItemRegister.fulfilled, (state , action) => {
            state.cart_item_register_loading = false;
            state.cart_item_register_error = null;
            console.log(action.payload)
            // state.filter_product = action.payload
        })

        .addCase(cartItemRegister.rejected, (state , action) => {
            state.cart_item_register_loading = false;
            state.cart_item_register_error = action.payload;
        })

// ===============================================================
// ===============================================================

        .addCase(cartItemsListView.pending, (state) => {
            state.cart_items_loading = true;
            state.cart_items_error = null;
        })
        
        .addCase(cartItemsListView.fulfilled, (state , action) => {
            state.cart_items_loading = false;
            state.cart_items_error = null;
            for(let i = 0 ; i < action.payload.length ; i++){
                state.cart_details = action.payload[i].cart
                action.payload[i].cart = action.payload[i].cart.id
            }
            state.cart_items = action.payload
            // if (state.cart_details) {
            //     state.cart_details.Total = parseInt(parseFloat(state.cart_details.Total))
            //     state.cart_details.Subtotal = parseInt(parseFloat(state.cart_details.Subtotal))
            // }
            console.log(state.cart_items)
        })

        .addCase(cartItemsListView.rejected, (state , action) => {
            state.cart_items_loading = false;
            state.cart_items_error = action.payload;
        })
// ===============================================================
// ===============================================================

        .addCase(cartItemDelete.pending, (state) => {
            state.cart_item_delete_loading = true;
            state.cart_item_delete_error = null;
        })
        
        .addCase(cartItemDelete.fulfilled, (state , action) => {
            state.cart_item_delete_loading = false;
            state.cart_item_delete_error = null;
            console.log("deleting the cart item is done")
        })

        .addCase(cartItemDelete.rejected, (state , action) => {
            state.cart_item_delete_loading = false;
            state.cart_item_delete_error = action.payload;
        })

// ===============================================================

        .addCase(cartItemUpdate.pending, (state) => {
            state.cart_item_update_loading = true;
            state.cart_item_update_error = null;
        })
        
        .addCase(cartItemUpdate.fulfilled, (state , action) => {
            state.cart_item_update_loading = false;
            state.cart_item_update_error = null;
            console.log("updating the cart item is done")
        })

        .addCase(cartItemUpdate.rejected, (state , action) => {
            state.cart_item_update_loading = false;
            state.cart_item_update_error = action.payload;
        })

    }
})

export default cartSlice.reducer;