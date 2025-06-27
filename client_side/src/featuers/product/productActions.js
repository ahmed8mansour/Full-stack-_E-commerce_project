import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = "http://localhost:8000"

export const productHomePageReviewsData = createAsyncThunk(
    'product/HomePage/reviews',
    async(_, thunkAPI)=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const {data} = await axios.get(
                `${backendURL}/products/homePage/ReviewsData/`,
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

export const productHomePageNewArrivalsData = createAsyncThunk(
    'product/HomePage/NewArrivals',
    async(limit, thunkAPI)=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const {data} = await axios.get(
                `${backendURL}/products/homePage/NewArrivalsData/${limit}/`,
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

export const productHomePageTopRatedData = createAsyncThunk(
    'product/HomePage/TopRated',
    async(limit, thunkAPI)=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const {data} = await axios.get(
                `${backendURL}/products/homePage/TopRatedData/${limit}/`,
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

export const productHomePageNewArrivalsNext = createAsyncThunk(
    'product/newArrivalsNext',
    async(requestData, thunkAPI)=>{
        console.log(requestData.url)
            try{
            const {data} = await axios.get(requestData.url)
            
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

export const productHomePageTopRatedNext = createAsyncThunk(
    'product/topRatedNext',
    async(requestData, thunkAPI)=>{
        console.log(requestData.url)
            try{
            const {data} = await axios.get(requestData.url)
            
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

export const productSpecificData = createAsyncThunk(
    'product/SpecficeData',
    async (requestData, thunkAPI) => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const {data} = await axios.get(
                `${backendURL}/products/${requestData.style}/${requestData.id}/`,
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

export const productReviewRegister = createAsyncThunk(
    "product/ReviewRegister",
    async(requestData, thunkAPI) =>{
        const accessToken = localStorage.getItem("userToken");

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            const {data} = await axios.post(
                `${backendURL}/products/review/register/`,
                requestData,
                config
            )
            return data;

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


export const productReviewNext = createAsyncThunk(
    'product/reviewNext',
    async(url, thunkAPI)=>{
            try{
            const {data} = await axios.get(url)
            
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

export const productFilterPageDefault = createAsyncThunk(
    'product/FilterDefault',
    async({pageType , limit} , thunkAPI)=>{
        
        const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        try{
            const {data} = await axios.get(
                `${backendURL}/products/DefaultStylePage/${pageType}/${limit}/`,config
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

export const productFilterApplying = createAsyncThunk(
    'product/FilterApplying',
    async(requestData , thunkAPI)=>{
        const {pageType,limit , ...requestData2} = requestData

        const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        
        try{
            const {data} = await axios.post(
                `${backendURL}/products/DefaultStylePage/${pageType}/filter/${limit}/`,
                requestData2,
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

// default
export const productFilterPaginate = createAsyncThunk(
    'product/FilterPaginate',
    async (url , thunkAPI)=>{
        const config = {
            headers: {
                    'Content-Type': 'application/json',
                },
            }
            
            try{
                const {data} = await axios.get(url,config)
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
// paginate after filtering 

export const productFilterApplyingPaginate = createAsyncThunk(
    'product/FilterApplyingPaginate',
    async(requestData , thunkAPI)=>{
        const {url , ...requestData2} = requestData

        const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        
        try{
            const {data} = await axios.post(
                // `${backendURL}/products/DefaultStylePage/${pageType}/filter/${limit}/`,
                url,
                requestData2,
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