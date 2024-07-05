import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import {toast} from 'react-toastify'
import User from "./User";
import ModalSearchedItem from "./ModalSearchedItem";

const GroupModal = forwardRef((props,ref) => {

  const [searchItem, setSearchItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selcetedUsers, setSelcetedUsers] = useState([]);
  var token = useMemo(() => localStorage.getItem('token'),[]);

  const handleFieldChange = (e) => {
      e.preventDefault();
      // console.log(e.target.value);
      if(e.target.value.length !== 0){
        setSearchItem(e.target.value);
      }
  }
  const handleSubmitSearch = async(e) => {
    try{
      e.preventDefault();

      const backendUrlFetchUserByName = process.env.REACT_APP_BACKEND_URL_BASE + "/api/user?search=" + searchItem;

      var headers = new Headers();
        
      // headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjVlYzFiYmFmNDAzY2YxZjZhMDM3ZmYzIiwiaWF0IjoxNzEwMDAwOTA5fQ.Ljj5ZbLkvFm1ADcINP0d5RULdOt0fvpjXd_HU7S_MaI');
      headers.append('Authorization', `Bearer ${token}`);

      console.log(" sending token : ",token);
  
      const config = {
          method : "GET",
          headers : headers,
      }

      console.log(config);

      const response = await fetch(backendUrlFetchUserByName,config);
      const json = await response.json();
      
      
      if(response.status === 200){
        
        console.log("json : ",json);
         

          console.log("User fetched succesfully.");
          setSearchedUsers(json);
      }
      else{
          toast.error(json.message);
      }
      } catch (error) {
        console.log("error : ",error);
        toast.error(error.message);
      }
  }

  const moveSelectedUsers = (e) => {
    console.log("Moving..");
    e.preventDefault();

    const user = JSON.parse(e.target.value);
    console.log("user : ",user);

      if(selcetedUsers.length === 0){
          setSelcetedUsers([user]);
      }
      else{
          var present = selcetedUsers.filter((user1)=> user1._id === user._id);
          if(present.length===0){
            setSelcetedUsers((users)=>[...users,user]);
          }
      }
  }

  const cancelSelectedUser = (e) => {
      e.preventDefault();
      console.log("canelling..");
      const user = JSON.parse(e.currentTarget.value);
      console.log("user : ",user);
      
      console.log("Selected users  : ",selcetedUsers);

      const filteredArray = selcetedUsers.filter((item) => item._id !== user._id);
      setSelcetedUsers(filteredArray);

  }

  const cancel_modal = () => {
      setShowModal(false)
      setSelcetedUsers([]);
      setSearchedUsers([]);
  }

  const handleCreateGroup = ()=>{

      if(selcetedUsers.length === 0){
          toast.error('No user selected!!!');
          return;
      }
      if(selcetedUsers.length === 1){
          toast.error('More than one user required to form a group.');
          return;
      }

      setShowModal(false);
      props.open_group_name_modal();
      console.log("Users : ",selcetedUsers);
      props.setGroupMembers(selcetedUsers);
      setSelcetedUsers([]);
      setSearchedUsers([]);
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
                  <form onSubmit={handleSubmitSearch} className="m-2 self-center " style={{width : '30vw'}}>   
                        <div className="relative">
                          <input onChange={handleFieldChange} type="search" id="" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search other users ..." required />
                          <button  type="submit" className="text-white absolute end-3.5 bottom-3.5 "><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </form>

                    <div className=' flex flex-row flex-wrap '>
                    {selcetedUsers && selcetedUsers.map((user) => {
                // setOtherSingleUser(user);
                          return  <ModalSearchedItem key={user.email} user={user} handleClick={cancelSelectedUser} />
                  })}

                    </div>

                  
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  
                  <div className=' flex flex-col flex-wrap '>
                    {searchedUsers && searchedUsers.map((user) => {
                // setOtherSingleUser(user);
                          return  <User key={user.email} user={user} handleClick={moveSelectedUsers} />
                  })}

                    </div>

                </div>
                {/*footer*/}
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
                    onClick={handleCreateGroup}
                  >
                    Create group
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

export default GroupModal