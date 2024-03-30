import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';
import { setToken } from '../Slices/authSlice';

const NavBar = () => {
  const token=useSelector((state)=>state.token);  
//   const userId=useSelector((state)=>state.userId);
  const [show,setShow]=useState(false);
  const [modal,setModal]=useState(false);

  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const logout=()=>{
    dispatch(setToken(null));
    localStorage.removeItem("token")
    navigate("/");  
    setModal(false)
}
  
  return (
    <nav className='full  h-12 bg-gray-700 flex justify-center realtive '>
        {modal && <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm z-9999'>
                <div className='w-[250px] h-[100px] bg-slate-800 rounded-md flex justify-center flex-col items-center'>
                    <span className='text-white'>Do you want to logout?</span>
                    <div className='flex gap-4 mt-4'>
                        <button className='bg-yellow-500 px-2 py-1 rounded-md text-gray-50 font-semibold' onClick={()=>setModal(false)}>cancel</button>
                        <button className='bg-yellow-500 px-2 py-1 rounded-md text-gray-50 font-semibold' onClick={logout}>logOut</button>
                    </div>
                </div>
            </div>}
        <div className=' w-10/12 flex items-center justify-between mx-auto'>
        <NavLink to="/">
            <img src="./images/listify.webp" alt="logo"  className='lg:w-[30%]  w-[40%] '/>
        </NavLink>
        <ul className='hidden md:block'>
            {
                token ? <li className='flex gap-4 text-gray-50 font-semibold'>
                    <NavLink to="/" className="text-xl hover:text-lime-400">Home</NavLink>
                    <NavLink to="/task" className="text-xl hover:text-lime-400">CheckList</NavLink>
                    <span className="cursor-pointer text-xl hover:text-lime-400" onClick={()=>setModal(true)}>LogOut</span>
                </li> :
                <li  className='flex gap-4 text-gray-50 font-semibold' >
                    <NavLink to="/" className="text-xl hover:text-lime-400">Home</NavLink>
                    <NavLink to="/login" className="text-xl hover:text-lime-400">Login</NavLink>
                    <NavLink to="/signUp" className="text-xl hover:text-lime-400">SignUp</NavLink>
                </li>

            }
        </ul>
        <div className="md:hidden" onClick={()=>setShow(true)}>
            <GiHamburgerMenu className='text-2xl text-gray-50'/>
        </div>
        </div>
        <div className={`${show ? "visible":"hidden" } absolute w-[60%]  bg-slate-900 h-screen md:hidden right-0 `}>
        <button className='m-4' onClick={()=>setShow(false)}>
            <MdCancel className='text-5xl text-gray-200'/>
        </button>
        <ul className='flex m-4'>
        {
                token ? <li className='flex flex-col gap-2 text-gray-50 font-semibold'>
                    <NavLink to="/" onClick={()=>setShow(false)} className="text-xl hover:text-lime-400">Home</NavLink>
                    <hr />
                    <NavLink to="/task" onClick={()=>setShow(false)} className="text-xl hover:text-lime-400">CheckList</NavLink>
                    <hr />
                    <span onClick={()=>{setShow(false); setModal(true)}} className="cursor-pointer text-xl hover:text-lime-400">LogOut</span>
                    <hr />
                </li> :
                <li className='flex flex-col gap-2 text-gray-100 font-semibold'>
                    <NavLink to="/" className="text-xl hover:text-lime-400">Home</NavLink>
                    <hr />
                    <NavLink to="/login" onClick={()=>setShow(false)} className="text-xl hover:text-lime-400">Login</NavLink>
                    <hr />
                    <NavLink to="/signUp" onClick={()=>setShow(false)} className="text-xl hover:text-lime-400">SignUp</NavLink>
                    <hr />
                </li>

            }
        </ul>
        </div>
    </nav>
  )
}


export default NavBar