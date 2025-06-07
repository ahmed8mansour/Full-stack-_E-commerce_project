import {createSlice} from "@reduxjs/toolkit"
import {flip} from "../store/authCounter"

const counterState = { value: 0}
const counterSlice = createSlice({ //2 
        name : "counter",
        intialState : counterState,
        reducers : {
            increase: (state , action)=>{
                state.value += action.payload;
            },
            decrease: (state , action)=>{
                state.value -= action.payload;
            },
        },
        extraReducers:{
            [flip] : (state,action)=>{
                state.value = 15;
            }
        }
    })

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;
