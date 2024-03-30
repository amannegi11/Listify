import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
const HomePage = () => {
  const token=useSelector((state)=>state.token)
  return (
    <div className="bg-gray-800 min-h-screen w-full flex justify-center items-center">
      <div className="text-center flex flex-col items-center w-8/12">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to <span className='text-lime-500'>Listify</span></h1>
        <img src="/images/task.jpg"  alt="logo"  className=' rounded-md object-contain'/>
        <p className="m-8 text-2xl text-yellow-400 font-semibold">Organize your tasks efficiently</p>
        <NavLink to={token ? "/task" :"/login"}>
         <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out">Get Started</button>
        </NavLink>
      </div>
    </div>
  )
}

export default HomePage