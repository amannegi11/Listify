import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
const Module = ({ setOpen ,setData,data,ID,update="",setUpdate}) => {
    const bgRef = useRef();
    const userId=useSelector((state)=>state.userId)
    const [formData, setFormData] = useState({task: "", des: "", pri: "High", due: "", status: "Pending" })
    
    const createAndupdate=async()=>{
          if(update){
            try {
                const res=await axios.put(`http://localhost:8000/api/v1/todo/updatetodo/${ID}`,{
                    Text:formData.task,
                    Description:formData.des,
                    Priority:formData.pri,
                    Date:formData.due,
                    Status:formData.status,
                })
                console.log(res);
              } catch (error) {
                    console.log(error);
              }
        }else{
            try {
                const res=await axios.post("http://localhost:8000/api/v1/todo/createtodo",{
                    Text:formData.task,
                    Description:formData.des,
                    Priority:formData.pri,
                    Date:formData.due,
                    Status:formData.status,
                    userId:userId
                })
                console.log(res);
              } catch (error) {
                    console.log(error);
              }
        }

    }


    const handler = (e) => {
        if (e.target === bgRef.current) {
            update ? setUpdate(false):setOpen(false)
        }
    }
    
    
    const changeHandler=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const currentDate = new Date().toISOString().split('T')[0];

    useEffect(()=>{
        if(update){
            const newData=data.filter((data)=>data._id===ID);
            setFormData({task: newData[0].Text, des:newData[0].Description, pri:newData[0].Priority, due:newData[0].Date, status:newData[0].Status })
        }
    },[])
    return (
        <div
            ref={bgRef}
            onClick={handler}
            className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white rounded-md  w-[90%]'>
                <div className="flex justify-end m-2 "
                >
                    <MdCancel className='text-4xl text-red-600 cursor-pointer'
                        onClick={() => {update ? setUpdate(false):setOpen(false)}} />
                </div>
                <form className='flex flex-col p-8 gap-4'
                onSubmit={createAndupdate}>
                    <label className='flex'>
                        <span className='w-[37%] font-semibold text-blue-800'>Task : </span>
                        <input type="text" placeholder='Write your task...'
                            value={formData.task}
                            name='task'
                            onChange={changeHandler}
                            required
                            className='border border-black w-[45%] text-center' />
                    </label>
                    <label className='flex'>
                        <span className='w-[37%] font-semibold text-blue-800'>Description : </span>
                        <textarea 
                        value={formData.des}
                        name='des'
                        required
                        onChange={changeHandler}
                        className='border  border-black w-[45%] text-center' placeholder='Write your description...'></textarea>
                    </label>
                    <label className='flex'>
                        <span className='w-[37%] font-semibold text-blue-800'>Priority : </span>
                        <select 
                        required
                        value={formData.pri}
                        name='pri'
                        onChange={changeHandler}
                        className='border border-black w-[45%] text-center'>
                            <option >High</option>
                            <option >Low</option>
                            <option >Medium</option>
                        </select>
                    </label>
                    <label className='flex'>
                        <span className='w-[37%] font-semibold text-blue-800'>Due Date : </span>
                        <input type="date" 
                        value={formData.due}
                        min={currentDate}
                        name='due'
                        required
                        onChange={changeHandler}
                        placeholder='Write your task'
                            className='border border-black w-[45%] text-center' />
                    </label>
                    <label className='flex'>
                        <span className='w-[37%] font-semibold text-blue-800'>Status : </span>
                        <select value={formData.status}
                        name='status'
                        required
                        onChange={changeHandler} className='border border-black fo w-[45%] text-center '>
                            <option >Pending</option>
                            <option>Completed</option>
                            <option>In Progress</option>
                        </select>
                    </label>
                    <div className='w-11/12 mt-4 flex justify-center'>
                        <button className='bg-blue-600 px-3 py-1 rounded-md text-white hover:bg-blue-500'
                        >{update ? "Update" : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Module