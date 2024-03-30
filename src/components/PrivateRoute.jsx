import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
const PrivateRoute = ({children}) => {
    let token=useSelector((state)=>state.token);
    // console.log(token);
    if(token) return children 
    else return <Navigate to="/"/> 
    
}

export default PrivateRoute