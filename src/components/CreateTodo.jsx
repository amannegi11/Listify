import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import Module from './Module';
import { useSelector } from 'react-redux';
const CreateTodo = ({setData,data}) => {
  const [open,setOpen]=useState(false);
  const user=useSelector((state)=>state.userName)
  return (
    <div className="flex flex-col mt-12">
      <div className='flex mb-4 w-11/12 justify-between mx-auto border-b-2 pb-2'>
        <h2 className="text-4xl font-bold mb-4 text-gray-100">{user}</h2>
        <button onClick={()=>{setOpen(true)}}>
            <FaCirclePlus className='text-5xl text-red-600 '/>
        </button>
      </div>
      <div>
      {
        open && <Module open={open} setOpen={setOpen} setData={setData} data={data}/>
      }
      </div>
      

    </div>
  )
}

export default CreateTodo