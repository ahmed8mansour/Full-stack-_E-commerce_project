import {createSlice} from "@reduxjs/toolkit"


const authstate = {showCounter: false}
const authSlice = createSlice({
        name : "auth",
        intialState : authstate,
        reducers : {
            flip: (state , action)=>{
                state.showCounter = !state.showCounter;
            }
        }
    })

export default authSlice.reducer;
export const authActions = authSlice.actions;
