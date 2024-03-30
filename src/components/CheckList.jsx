import React, { useEffect, useState } from 'react'
import Todos from './Todos'
import CreateTodo from './CreateTodo'
import axios from 'axios';
import { useSelector } from 'react-redux';

const CheckList = () => {  
  const [data,setData]=useState([]); 
  const [del,setDel]=useState(true);
  const id=useSelector((state)=>state.userId);
  
  const fetchTodos=async(id)=>{
    const res=await axios.get(`http://localhost:8000/api/v1/todo/getalltodo/${id}`);
    setData(res.data.data);
  }
  
  useEffect(()=>{
    fetchTodos(id);
  },[del])
  return (
    <div className='w-10/12 mx-auto h-full '>
        <CreateTodo setData={setData} data={data}/>
        <Todos data={data} setData={setData} setDel={setDel}/>
       

    </div>
  )
}

export default CheckList