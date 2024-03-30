import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken ,setUserId,setUserName} from '../Slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Form = ({type}) => {
  const [formData,setFormdata]=useState({username:"",email:"",password:""});
  const [err,setErr]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const onsubmitHandler=async(e)=>{
    e.preventDefault();

    if(type==="signup"){
      try {
        const res=await axios.post(`http://localhost:8000/api/v1/auth/signup`,{
         username:formData.username,email:formData.email,password:formData.password,confirmPass:formData.password
        });
        setFormdata({username:"",email:"",password:""})
        navigate("/login")
      } catch (error) {
        setErr(error.response.data.message);
      }
      
    }else{
      try {
        const res=await axios.post(`http://localhost:8000/api/v1/auth/login`,{
          email:formData.email,password:formData.password
        });
        
        dispatch(setToken(res.data.token));
        dispatch(setUserId(res.data.existingUser._id))
        dispatch(setUserName(res.data.existingUser.username));
        
        localStorage.setItem("token",JSON.stringify(res.data.token));
        localStorage.setItem("userId",JSON.stringify(res.data.existingUser._id));
        localStorage.setItem("userId",JSON.stringify(res.data.existingUser.username));
        
        setFormdata({username:"",email:"",password:""})
        navigate("/task")
      }catch (error) {
        setErr(error.response.data.message)
      }
    }
    
  }
  return (
    <div className="max-w-[80%] mx-auto p-6 bg-white rounded-md shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{type==="signup"? "SignUp": "LogIn"}</h2>
      <form onSubmit={onsubmitHandler}>
        {
            type==="signup" && <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username <span className='text-red-600'>*</span></label>
            <input 
            onChange={(e)=>setFormdata({...formData,username:e.target.value})}
            value={formData.username}
            type="text" id="username" className="px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required />
          </div>    
        }
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email <span className='text-red-600'>*</span></label>
          <input 
          onChange={(e)=>setFormdata({...formData,email:e.target.value})}
          value={formData.email}
          type="email" id="email" className="px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required/>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password <span className='text-red-600'>*</span></label>
          <input 
          onChange={(e)=>setFormdata({...formData,password:e.target.value})}
          value={formData.password}
          type="password" id="password" className="px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required/>
        </div>
        <div className='m-2'>
          {err && <span className='text-red-500'>{err}</span>}
        </div>
        <div className="flex items-center justify-between mb-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">{type==="signup"? "SignUp": "LogIn"}</button>
        </div>
      </form>
    </div>
  )
}

export default Form