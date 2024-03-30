import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) :null,
    userId:localStorage.getItem("userId") ? JSON.parse(localStorage.getItem("userId")):null,
    userName:localStorage.getItem("userName") ? JSON.parse(localStorage.getItem("userName")):null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setUserId:(state,action)=>{
            state.userId=action.payload
        },
        setUserName:(state,action)=>{
            state.userName=action.payload
        }
    },
})

export default authSlice.reducer;
export const {setToken,setUserId,setUserName}=authSlice.actions;