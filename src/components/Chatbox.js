import React, { useContext, useEffect ,useMemo, useState} from 'react'
import MessageBox from './MessageBox'
import InputField from './InputField'
import UserNamebox from './UserNamebox'
import ChatNameBox from './ChatNameBox'


const Chatbox = (props) => {
  
  var username = useMemo(()=> localStorage.getItem('name'),[localStorage]);
  

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  

  // const [messages, setMessages] = useState([]);

  // const pull_message = (data) => {
  //     const newMessages = [...messages,data];
  //     setMessages(newMessages);
  //     console.log("messages : ",newMessages);

  //     // scrolling technique nned to refine
  //     const m_box = document.getElementById('m-box');
  //     console.log(m_box.scrollHeight);
  //     m_box.scrollTop = m_box.scrollHeight;

  //     // send message to server
  //     console.log(socket);
  //     socket.emit('message-from-client',data.content);  

  // }


  return (
    <>
    <div className=' bg-indigo-500  text-white' style={{height : '5vh'}} >
      <UserNamebox username={username?username:"bro"} socket={props.socket} />  
    </div>
    <div className=' bg-amber-500 text-white' style={{height : '5vh'}} >
      <ChatNameBox/>  
    </div>
    <div id='m-box' className=' overflow-y-scroll bg-teal-300 text-white' style={{height : '80vh'}}>
      <MessageBox userId={props.userId} messages={props.messages} />  
    </div>
    <div className='bg-green-500 text-white' style={{height : '10vh'}} >
      <InputField  sendMessageToParent={props.pull_message} /> 
    </div>
    </>
  )
}

export default Chatbox