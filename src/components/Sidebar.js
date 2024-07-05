import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import  {allUsers}  from '../dummy/dummyusers'
import User from './User'
import {toast} from 'react-toastify'
import SearchResult from './SearchResult';
import Group from './Group';
import GroupSearchResult from './GroupSearchResult';


const Sidebar = forwardRef ((props,ref) => {

  const [searchItem, setSearchItem] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedGroups, setSearchedGroups] = useState([]);
  const [toBeShownUsers, setToBeShownUsers] = useState([]);
  const [toBeShownGroups, setToBeShownGroups] = useState([]);

  var token = useMemo(() => localStorage.getItem('token'),[]);

  useEffect(() => {
  
    return () => {
      
    }
  }, [])
  
  const hideSearchResults = ()=>{
    setSearchedUsers([]);
    setSearchedGroups([]);
  }

  useImperativeHandle(ref,()=>{
      return{
        hideSearchResults,
        setToBeShownUsers,
        setToBeShownGroups
      }
  })

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
      const backendUrlFetchChatByName = process.env.REACT_APP_BACKEND_URL_BASE + "/api/chat?search=" + searchItem;

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

      const responseChat = await fetch(backendUrlFetchChatByName,config);
      const jsonChat = await responseChat.json();
      
      
      if(responseChat.status === 200){
        
        console.log("json : ",jsonChat);
        console.log("Chat fetched succesfully.");
        setSearchedGroups(jsonChat);
      }


      else{
          toast.error(json.message);
      }
      } catch (error) {
        console.log("error : ",error);
        toast.error(error.message);
      }
  }

 

  
  return (
    <div>
      <div className='bg-indigo-950 text-white flex flex-col ' style={{height : '33vh'}} >
        {/* dummy div */}
        <div className=' h-2 ' ></div>

        {/* broadcast message  */}
        <button onClick={props.open_broadcast_modal}  type="submit" className=" self-center rounded-lg bg-emerald-400  hover:bg-blue-700 text-white my-0.5 py-1 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200 ease-in-out"
        style={{width : '20vw'}}
        >Broadcast</button>

        {/* creat group button */}
        <button onClick={props.open_group_modal} data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="submit" className=" self-center rounded-lg bg-emerald-400  hover:bg-blue-700 text-white my-0.5 py-1 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200 ease-in-out"
        style={{width : '20vw'}}
        >Create group</button>

        {/*  Search bar */}
        <form onSubmit={handleSubmitSearch} className="m-2 self-center " style={{width : '24vw'}}>   
            <div className="relative">
                <input onChange={handleFieldChange} type="search" id="" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search other users ..." required />
                <button  type="submit" className="text-white absolute end-3.5 bottom-3.5 "><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </form>

        {/* search results */}

        <div className=' flex flex-row flex-wrap '>
          {searchedUsers && searchedUsers.map((user) => {
              // setOtherSingleUser(user);
              return  <SearchResult key={user.email} user={user} handleFetchChat={props.handleFetchChat} />
          })}
          {searchedGroups && searchedGroups.map((group_chat) => {
              // setOtherSingleUser(user);
              return  <GroupSearchResult key={group_chat._id} group_chat={group_chat} handleFetchGroupChat={props.handleFetchGroupChat} />
          })}

        </div>
        

      </div>

      {/* users */}
      {toBeShownUsers && toBeShownUsers.map((user) => {
        console.log("User ",user);
        return  <User key={user.email} user={user} handleClick={props.handleFetchChat} />
      })}

      {toBeShownGroups && toBeShownGroups.map((group_chat) => {
        console.log("Group ",group_chat);
        // remember for handle click
        return  <Group key={group_chat._id} group_chat={group_chat} handleClick={props.handleFetchGroupChat}/>
      })}

    </div>
  )
})

export default Sidebar