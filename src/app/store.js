import { configureStore,combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice"; 


export const store=configureStore({
    reducer:authReducer
})


