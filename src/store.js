import {configureStore, createSlice} from "@reduxjs/toolkit";

const initState ={
    token :null,
}

const tokenSlice = createSlice({
    name:"token",
    initialState:initState,
    reducers:{
        setToken:(state, action)=>{
            state.token = action.payload;
        }
    }
});

const store=configureStore({
    reducer:{
        token:tokenSlice.reducer,
    }
});

export const {setToken} = tokenSlice.actions;
export default store;