import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import Module from './Module';
import axios from 'axios';
const Todos = ({data,setData,setDel}) => {
  const [update,setUpdate]=useState(false);
  const [id,setId]=useState(null);
  const [newData,setNewData]=useState(null);
  const [filtered,setFiltered]=useState({Priority:"All",Status:"All"});
  
  const deleteHanlder=async(id)=>{
    const res=await axios.delete(`http://localhost:8000/api/v1/todo/deletetodo/${id}`);
    setDel((prev)=>!prev) 
    // console.log(res);
  }
  const updateHandler=(id)=>{
      setId(id)
      setUpdate(true)
  }
  

  const filteringHandler=(e)=>{
    const {name,value}=e.target;
    setFiltered((prev)=>({...prev,[name]:value}));
  }

  useEffect(()=>{
    if(filtered.Priority==="All" && filtered.Status==="All"){
      setNewData(data);
    }else if(filtered.Priority==="All"){
      const newData=data.filter((d)=>(d.Status==filtered.Status));
      setNewData(newData)
    }else if(filtered.Status==="All"){
      const newData=data.filter((d)=>(d.Priority==filtered.Priority));
      setNewData(newData)
    }else{
      const newData=data.filter((d)=>(d.Priority==filtered.Priority && d.Status==filtered.Status));
      setNewData(newData)
    }
  },[filtered])

  useEffect(()=>{
    setNewData(data);  
  },[data]
  )
  
  return (
    <div className="container h-full mx-auto py-8">
    
    {
      data.length ?
      (
      <div className="overflow-x-auto">
      <table className="table-auto min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-2">Task</th>
            <th className="px-6 py-2">Description</th>
            <th className="px-6 py-2">Priority
              <select onChange={filteringHandler} value={filtered.Priority}
              name='Priority'>
                <option >All</option>
                <option >High</option>
                <option >Low</option>
                <option >Medium</option>
              </select>
            </th>
            <th className="px-10 py-2">Date</th>
            <th className="px-6 py-2">Status
              <select onChange={filteringHandler} value={filtered.Status}
              name='Status'>
               <option>All</option>
                <option >Pending</option>
                <option >In Progress</option>
                <option>Completed</option>
              </select>
            </th>
            <th className="px-6 py-2">Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {
           newData && newData.map((d,i)=>(
              <tr key={d._id} className='border border-b-blue-500'>
                <td className="py-2 text-blue-300 text-center">{d.Text}</td>
                <td className="py-2 text-blue-300 text-center">{d.Description}</td>
                
                <td className={`${d.Priority==="High" ? "bg-red-500 text-white": d.Priority==="Medium" ? "bg-orange-400":"bg-yellow-100 text-black"} py-2  text-center font-serif `}>{d.Priority}</td>
                <td className="py-2 text-blue-300 text-center">{d.Date}</td>
                <td className={`${d.Status==="Completed" ? "bg-green-500 text-white" : d.Status==="Pending" ? "bg-red-500 text-white" : "bg-yellow-100 text-black"} py-2  text-center font-mono`}>{d.Status}</td>
                <td className="py-2 text-blue-300 text-center">
                  <button 
                  onClick={()=>updateHandler(d._id)}  
                  className='px-2 text-2xl text-blue-600 rounded-md  hover:text-blue-400'>
                    <FaPenToSquare/>
                  </button>
                  <button className='px-2 text-2xl text-red-600 rounded-md  hover:text-red-400'
                    onClick={()=>deleteHanlder(d._id)}
                    >
                    <MdDelete/>
                  </button> 
                </td>

              </tr>
            ))
              
            
          }
          
         
        </tbody>
      </table>
      
      {update && <Module setUpdate={setUpdate} update={update} data={data} setData={setData} ID={id}/>}
    </div>
      ):
      (
        <div className=' text-red-600 font-extrabold text-2xl text-center mt-8'>
          
            <div className='mt-12'>Your Listify is Empty, Add some task...</div>
          </div>
      )
    }
  </div>
  )
}

export default Todos