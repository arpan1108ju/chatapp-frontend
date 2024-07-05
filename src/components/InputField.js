import React, { useState } from 'react'

const InputField = (props) => {

  const [message, setMessage] = useState({id:0,content:""});

  const handleFieldChange = (e) =>{
      e.preventDefault();
      setMessage({id : message.id + 1, content : e.target.value});
  }

  const handleOnSend = (e) =>{
      e.preventDefault();
      // console.log(message);
      if(message.content !== ""){
        const inp = document.getElementById("inputbox123");
        props.sendMessageToParent(message);
        setMessage({id : message.id + 1, content : ""});
        inp.value = "";
      }
  }

  return (
 
  <div className='flex items-center h-full'>
    <form onSubmit={handleOnSend} className="mx-auto" style={{width : '95%'}} action='GET' >   
        <div className="relative">
            <input onChange={handleFieldChange} type="text" id="inputbox123" className="h-full block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start chatting ..." required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa-solid fa-paper-plane"></i></button>
        </div>
    </form>
 </div> 

  )
}

export default InputField