import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    isLoggedIn:false,
    error:null,
    token:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginSuccess : (state,action)=>{
            state.user  = action.payload
            
            state.isLoggedIn = false
            state.error = null
            
        },
        setToken: (state,action)=>{
            state.token  = action.payload
        },
        removeToken: (state,action)=>{
            state.token  = null
        },
        otpSuccess : (state)=>{
         
            state.isLoggedIn = true
            state.error = null
           
        },
        otpFailure: (state, action) => {
            state.user = null;
            state.token = null 
            state.isLoggedIn = false;
            state.error = action.payload; 
        },
        logoutSuccess : (state,action)=>{
            state.user  = null
            state.isLoggedIn = false
            
        },
        loginFailure : (state,action)=>{
            
            state.error = action.payload
            state.isLoggedIn = false
        }
    }
})
export const { loginSuccess,logoutSuccess,loginFailure,otpSuccess,otpFailure,setToken,removeToken} = userSlice.actions
export default userSlice.reducer