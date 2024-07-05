import React, { useMemo, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import Chatbox from './Chatbox'
import GroupModal from './GroupModal'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import GroupNameModal from './GroupNameModal'
import BroadcastModal from './broadCastModal'

const Home = (props) => {

  const navigate = useNavigate();

  

  const socket = useMemo(()=> props.socket,[]);
  var token = useMemo(() => localStorage.getItem('token'),[]);
  var userId = useMemo(() => localStorage.getItem('id'),[]);
  const [messages, setMessages] = useState([]);
  const [chat_id, setChat_id] = useState(null);
  const [isChatSeleceted, setisChatSeleceted] = useState(false)
  const [groupMembers, setGroupMembers] = useState([])

  const sideBarRef = useRef();
  const groupModalRef = useRef();
  const groupNameModalRef = useRef();
  const broadCastModalRef = useRef();

  const pull_message = async(data) => {
    
    if(!isChatSeleceted){
      toast.error("No chat selected");
      return;
    }

    const sendingMessage = {message : data.content,chat_id : chat_id,userId : userId};
    console.log("data got :",sendingMessage);

      // backend --> send the message to be saved and use the returned message

      const backendUrlSaveMessage = process.env.REACT_APP_BACKEND_URL_BASE + "/api/message/savemessage";

      // api call for chat fetch
      try {

          var headers = new Headers();
      
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', `Bearer ${token}`);
      
      
          const config = {
              method : "POST",
              headers : headers,
              body : JSON.stringify(sendingMessage)
          }

          const response = await fetch(backendUrlSaveMessage,config);
          const json = await response.json();
          
          // console.log("response : ",response);
          
          // chat created
          if(response.status === 200){

              const singleMessage = json;

              const newMessages = [...messages,singleMessage];
              setMessages(newMessages);

              console.log("Form fetch m Got ",singleMessage);
              socket.emit('send-message',singleMessage);
              
              // ChatBoxRef.current.forceUpdate();

          }

          else{
              toast.error(json.message);
          }
      } catch (error) {
          console.log("error : ",error);
          toast.error(error.message);
      }

      // const newMessages = [...messages,data];
      // setMessages(newMessages);
      // console.log("messages : ",newMessages);

      // scrolling technique need to refine
      // const m_box = document.getElementById('m-box');
      // console.log(m_box.scrollHeight);
      // m_box.scrollTop = m_box.scrollHeight;

      // send message to server
      // console.log(socket);
      // socket.emit('message-from-client',{ room : localStorage.getItem('chat_id'),message : data.content});  

  }
  

  // clicks on user button
  const handleFetchChat = async(e) =>{
    
    e.preventDefault();
    
    setisChatSeleceted(true);
    // const other_user_id = e.target.value;
    const other_user = JSON.parse(e.target.value);
    const other_user_id = other_user._id;
    console.log("Id : ",other_user_id);
    
    // show the chat in lower side
    
    if(!e.target.classList.contains('UserBigButton')){

        sideBarRef.current.setToBeShownUsers(users => {
            if(users.length > 0){
                var present = users.filter((user)=> user._id === other_user_id);
                if(present.length !== 0 ) return users;
                return  [...users,other_user]; 
            }
            return [other_user];
        });

        // hide the search results

        sideBarRef.current.hideSearchResults();
  }

    const backendUrlFetchChat = process.env.REACT_APP_BACKEND_URL_BASE + "/api/chat/fetchchat";

    // api call for chat fetch
    try {

        var headers = new Headers();
    
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);
    
    
        const config = {
            method : "POST",
            headers : headers,
            body : JSON.stringify({
              other_user_id: other_user_id
            })
        }

        const response = await fetch(backendUrlFetchChat,config);
        const json = await response.json();
        
        // console.log("response : ",response);
        
        // chat created
        if(response.status === 201 || response.status === 202){

            // const newChats = [...chats,{chat_name : json.chat_name,user_ids : json.user_ids}];
            // setChats(newChats);
            // console.log("New chats : ",newChats);

            
            if(response.status === 201)
            toast.success("Chat created succesfully.");
          else if(response.status === 202)
          toast.success("Chat fetched succesfully.");
        
        
        // fetched all prev messages
        
            console.log("Got ",json.message_ids);
            setMessages(json.message_ids);

            socket.emit('join-chat',{my_id : userId,other_user_id : other_user_id});

        }

        else{
            toast.error(json.message);
        }
    } catch (error) {
        console.log("error : ",error);
        toast.error(error.message);
    }
  }

  const handleFetchGroupChat = async(e) =>{
    
    e.preventDefault();
    
    setisChatSeleceted(true);
    // const other_user_id = e.target.value;
    const chat = JSON.parse(e.target.value);
    const chat_id = chat._id;
    // console.log("Id : ",other_user_id);
    
    // show the chat in lower side
    
    if(!e.target.classList.contains('ChatBigButton')){

        sideBarRef.current.setToBeShownGroups(group_chats => {
            if(group_chats.length > 0){
                var present = group_chats.filter((chat)=> chat._id === chat_id);
                if(present.length !== 0 ) return group_chats;
                return  [...group_chats,chat]; 
            }
            return [chat];
        });

        // hide the search results

        sideBarRef.current.hideSearchResults();
  }

    const backendUrlFetchGroupChat = process.env.REACT_APP_BACKEND_URL_BASE + "/api/chat/fetchgroup";

    // api call for chat fetch
    try {

        var headers = new Headers();
    
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);
    
    
        const config = {
            method : "POST",
            headers : headers,
            body : JSON.stringify({
              chat_id : chat_id
            })
        }

        const response = await fetch(backendUrlFetchGroupChat,config);
        const json = await response.json();
        
        // console.log("response : ",response);
        
        // chat created
        if(response.status === 201 || response.status === 202){

            // const newChats = [...chats,{chat_name : json.chat_name,user_ids : json.user_ids}];
            // setChats(newChats);
            // console.log("New chats : ",newChats);

            
            if(response.status === 201)
            toast.success("Group Chat created succesfully.");
          else if(response.status === 202)
            toast.success("Group Chat fetched succesfully.");
        
        
        // fetched all prev messages
            const chat = json;
            console.log("Got ",chat.message_ids);
            setMessages(chat.message_ids);

            socket.emit('join-group-chat',chat);

        }

        else{
            toast.error(json.message);
        }
    } catch (error) {
        console.log("error : ",error);
        toast.error(error.message);
    }
  }

  const send_broadcast_message = (msg)=>{
      console.log("Sending broadcast message");
      socket.emit('send-broadcast-message', msg);
  }

  const open_broadcast_modal = () => {
    broadCastModalRef.current.setShowModal(true);
    console.log("Openning broadcast modal");
}


  const open_group_modal = () => {
      groupModalRef.current.setShowModal(true);
      console.log("Openning group modal");
  }

  const open_group_name_modal = () => {
    groupNameModalRef.current.setShowModal(true);
    console.log("Openning group name modal");
  }



  const createGroup = async(groupName)=>{
    console.log("In home");
    console.log("Group name : ",groupName);
    console.log("Group members : ",groupMembers);

    const backendUrlCreateGroup = process.env.REACT_APP_BACKEND_URL_BASE + "/api/chat/creategroup";

    // api call for chat fetch
    try {

        var headers = new Headers();
    
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);
    
        const other_user_ids = groupMembers.map((user) => user._id)
    
        const config = {
            method : "POST",
            headers : headers,
            body : JSON.stringify({
              name : groupName,
              other_user_ids : other_user_ids
            })
        }

        const response = await fetch(backendUrlCreateGroup,config);
        const json = await response.json();
        
        // console.log("response : ",response);
        
        // chat created
        if(response.status === 201){


            toast.success("Group created succesfully.");
            const chat = json;
            console.log('got chat',chat);
        
        // fetched all prev messages
        
            // console.log("Got ",json.message_ids);

            setMessages(chat.message_ids);
            socket.emit('join-group-chat',chat);

            // add an chat item in sidebar for groupchat
        }

        else{
            toast.error(json.message);
        }
    } catch (error) {
        console.log("error : ",error);
        toast.error(error.message);
    }


  }
 
  // always use lambda function for using useState inside useEffect
  
  useEffect(() => {
    
    // when page loads navigates to login page
    if(localStorage.getItem('token') === null){
      console.log("navigating to /login");
      navigate("/login");
    }
    props.socket.connect();
    
    const receive_message_listener = (data)=>{
      console.log(`Recieved message <${data.content}> for chat ${data.chat_id} from ${data.sender}`);
      setChat_id(data.chat_id);
  
      if(data.sender !== "-1"){
        setMessages( messages => ([...messages,data]));
      }
    }
    
   
    const connect_listener = ()=>{
      console.log("C : Connected to server with ",socket.id);
    }
    const someone_joined_listener = (data)=> { 
      console.log(`${data.name} is online now`);
      toast.info( `${data.name} is online now.`);
      console.log("previous s-j : ",messages);

    }

    const receive_broadcast_message_listener = (msg)=>{
      console.log("Got broadcasted message : ",msg);
      alert(msg);
    }


    socket.on('connect',connect_listener)
    socket.on('someone-joined',someone_joined_listener)
    socket.on('receive-message',receive_message_listener);
    socket.on('receive-broadcast-message',receive_broadcast_message_listener);
  
    return () => {
      // console.log("Clearing local storage");
      // localStorage.clear();

      socket.off('connect',connect_listener)
      socket.off('someone-joined',someone_joined_listener)
      socket.off('receive-message',receive_message_listener);
      socket.off('receive-broadcast-message',receive_broadcast_message_listener);

      socket.disconnect();
      // socket.off('')
    }
  },[])
  

  return (
    <>
        <div className="flex flex-row justify-between overflow-y-hidden ">
        <div className='h-screen'> < BroadcastModal ref={broadCastModalRef}
             send_broadcast_message={send_broadcast_message}
            /> </div>
            <div className='h-screen'> < GroupModal ref={groupModalRef}
            open_group_name_modal={open_group_name_modal}
            setGroupMembers = {setGroupMembers}
            /> </div>
            <div className='h-screen'> < GroupNameModal ref={groupNameModalRef} 
            createGroup = {createGroup}
            /> </div>
            <div className='w-1/4 h-screen'> < Sidebar
             ref={sideBarRef}
             handleFetchChat={handleFetchChat} 
             handleFetchGroupChat = {handleFetchGroupChat}
             open_broadcast_modal = {open_broadcast_modal}
             open_group_modal = {open_group_modal}
              /> </div>
            <div className='w-3/4'> < Chatbox userId={userId} messages={messages} pull_message={pull_message} socket={props.socket} /> </div>
        </div>
    </>
  )
}

export default Home