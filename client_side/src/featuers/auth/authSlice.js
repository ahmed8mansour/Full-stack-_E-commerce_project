import { createSlice } from "@reduxjs/toolkit";

import { userLogin , userRegister , userLogout , userProfile} from "./authActions";


const user_token = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null
const user_refreshtoken = localStorage.getItem('userTokenRefresh') ? localStorage.getItem('userTokenRefresh') : null


const auth_state ={
    login_user_loading: false,
    login_user_success: false,
    login_user_error: null,    
    
    register_user_loading: false,
    register_user_success: false,
    register_user_error: null,

    logout_user_loading: false,
    logout_user_success: false,
    logout_user_error: null,

    profile_user_loading: false,
    profile_user_success: false,
    profile_user_error: null,

    user_info : {},
    user_token,
    user_refreshtoken,


}

const authSlice = createSlice({
    name: "auth",
    initialState: auth_state,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending, (state) => {
            state.login_user_loading = true;
            state.login_user_success = false;
            state.login_user_error = null;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            state.login_user_loading = false;
            state.login_user_success = true;
            state.user_token = action.payload.userToken;
            state.user_refreshtoken = action.payload.userTokenRefresh;

            localStorage.setItem('userToken', action.payload.userToken);
            localStorage.setItem('userTokenRefresh', action.payload.userTokenRefresh);
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.login_user_loading = false;
            state.login_user_success = false;
            state.login_user_error = action.payload;
            state.user_info = {};
            state.user_token = null;
            state.user_refreshtoken = null;

            localStorage.removeItem('userToken');
            localStorage.removeItem('userTokenRefresh');
        })
    
        .addCase(userRegister.pending, (state) => {
            state.register_user_loading = true;
            state.register_user_success= false;
            state.register_user_error = null;
        })

        .addCase(userRegister.fulfilled, (state, action) => {
            state.register_user_loading = false;
            state.register_user_success = true;
            state.user_info = action.payload.user_data;
            state.user_token = action.payload.tokens.access;
            state.user_refreshtoken = action.payload.tokens.refresh;

            localStorage.setItem('userToken', action.payload.tokens.access);
            localStorage.setItem('userTokenRefresh', action.payload.tokens.refresh);
        })

        .addCase(userRegister.rejected, (state, action) => {
            state.register_user_loading = false;
            state.register_user_success = false;
            state.register_user_error = action.payload;
            state.user_info = {};
            state.user_token = null;
            state.user_refreshtoken = null;

            localStorage.removeItem('userToken');
            localStorage.removeItem('userTokenRefresh');
        })

        .addCase(userLogout.pending , (state ,action ) => {
            state.logout_user_loading = true;
            state.logout_user_success= false;
            state.logout_user_error = null;
        })

        .addCase(userLogout.fulfilled , (state ,action ) => {
            state.logout_user_loading = false;
            state.logout_user_success= true;
            state.logout_user_error = null;
            
            localStorage.removeItem('userToken');
            localStorage.removeItem('userTokenRefresh');
            state.user_info= {}
            state.user_token = null
            state.user_refreshtoken = null

        })

        .addCase(userLogout.rejected , (state ,action ) => {
            state.logout_user_loading = false;
            state.logout_user_success= false;
            state.logout_user_error = action.payload;
        })

        .addCase(userProfile.pending, (state) => {
            state.profile_user_loading = true;
        })
        .addCase(userProfile.fulfilled, (state, { payload }) => {
            state.profile_user_loading = false;
            state.user_info = payload;
        })
        .addCase(userProfile.rejected, (state, { payload }) => {
            state.profile_user_loading = false;
            state.profile_user_error = payload;
        })
                
    
    
    }
    

})

export default authSlice.reducer;