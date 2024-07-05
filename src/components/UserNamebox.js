import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserNamebox = (props) => {

    const navigate = useNavigate();

    const handleLogOut = () => {
        props.socket.disconnect();
        localStorage.clear();
        navigate('/login');
    }

  return (
    <div className='text-center flex flex-row justify-between'>
        <div></div>
        <h2 className='font-rubik text-xl font-normal ' > Hello , {props.username} </h2>
        {/* logout */}
        <button onClick={handleLogOut} className='rounded-lg bg-emerald-400  hover:bg-blue-700 text-white my-0.5 py-1 px-7 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200 ease-in-out' >Logout</button>
    </div>
  )
}

export default UserNamebox