import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import {toast} from 'react-toastify'
import User from "./User";
import ModalSearchedItem from "./ModalSearchedItem";

const BroadcastModal = forwardRef((props,ref) => {

  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);


  const handleFieldChange = (e) => {
      e.preventDefault();
      // console.log(e.target.value);
      if(e.target.value.length !== 0){
        setBroadcastMessage(e.target.value);
      }
  }
  

  const cancel_modal = () => {
      setShowModal(false);
  }

  const handleOnOKclicked = ()=>{
      if(broadcastMessage.length === 0){
          toast.error('Message cannot be empty!!!');
          return;
      }
      setShowModal(false);
      console.log("broadcast message : ",broadcastMessage);
      props.send_broadcast_message(broadcastMessage);   
  }


  useImperativeHandle(ref,()=>{
    return{
      setShowModal,
    }
  })

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className=" relative p-6 flex-auto items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
                  
                </div>
                {/*body*/}
                {/*footer*/}
                <form className="m-2 self-center " style={{width : '30vw'}}>   
                        <div className="relative">
                          <input onChange={handleFieldChange} type="search" id="" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter broadcast message ..." required />
                        </div>
                </form>
                  
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={cancel_modal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleOnOKclicked}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
})

export default BroadcastModal