import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = "http://localhost:8000"


export const userLogin = createAsyncThunk(
    'auth/login',
    async (requestbody , thunkAPI) =>{

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${backendURL}/auth/user/login/`,
                requestbody,
                config
            )
            return {
                userToken: data.access,
                userTokenRefresh: data.refresh
            };

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

export const userRegister = createAsyncThunk(
    'auth/register',
    async (requestbody , thunkAPI) =>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/auth/user/register/`,
                requestbody,
                config
            )
            
            return data

        }catch(error){
            if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
            } else {
                console.log(error.message);
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
)

export const userLogout = createAsyncThunk(
    'auth/logout',
    async ( _, thunkAPI) =>{
        try {
            const accessToken = localStorage.getItem("userToken");
            const refreshToken = localStorage.getItem("userTokenRefresh");
            
            if (!refreshToken) throw new Error("No refresh token found");
                await axios.post(
                `${backendURL}/auth/user/logout/`,
                { refresh: refreshToken },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            );
            localStorage.removeItem("userToken");
            localStorage.removeItem("userTokenRefresh");

            return "successful logout";
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const userProfile = createAsyncThunk(
    "auth/profile" , 
    async( _, thunkAPI) => {
        try{
            const token = localStorage.getItem("userToken")
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            };
            const {data} =  await axios.get(
                `${backendURL}/auth/user/profile`,
                config
            )
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)