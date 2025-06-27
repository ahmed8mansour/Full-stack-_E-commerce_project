import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = "http://localhost:8000"


// get_or_create_cart
// {
//     product:"",
//     qunatity:"",
        // selected_color,
        // selected_size,
// }
export const cartItemRegister = createAsyncThunk(
    'cart/cartItemRegister',
    async(requestbody, thunkAPI)=>{
    console.log(requestbody)

        try{
            const token = localStorage.getItem("userToken")
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
            }
            const {data} = await axios.post(
                `${backendURL}/cart/cartItem/add/`,
                requestbody,
                config
            )
            return data

        }catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
}

)

export const cartItemsListView = createAsyncThunk(
    'cart/cartItemListView',
    async(_, thunkAPI)=>{
        try{
            const token = localStorage.getItem("userToken")
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
            }
            const {data} = await axios.get(
                `${backendURL}/cart/cartItem/listview/`,
                config
            )
            return data

        }catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
}

)

export const cartItemDelete = createAsyncThunk(
    'cart/cartItemDelete',
    async(cartItem_id , thunkAPI)=>{
        const token = localStorage.getItem("userToken")
        const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
            }

        try{
            const {data}= await axios.delete(
                `${backendURL}/cart/cartItem/delete/${cartItem_id}/`,
                config
            )
            return data
        }catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
    }
)


export const cartItemUpdate = createAsyncThunk(
    'cart/cartItemUpdate',
    async(requestbody , thunkAPI)=>{
        const token = localStorage.getItem("userToken")
        const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
            }
        const {id , ...requestbody2} = requestbody
        console.log(id)
        console.log(requestbody2)
        try{
            const {data}= await axios.put(
                `${backendURL}/cart/cartItem/update/${requestbody.id}/`,
                requestbody2,
                config
            )
            return data
        }catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
    }
)