import React, { useEffect } from 'react'

const Message = (props) => {

    useEffect(() => {
      
      var pos = '';
      var color = '';
  
      // console.log(`User - ${props.userId}, Sender - ${props.message.sender}`);
  
      if(props.userId === props.message.sender){
          pos = 'float-right';
          color = 'bg-slate-800';
      }
      else{
          pos = 'float-left';
          color = 'bg-slate-700';
      }
  
      const m_comp = document.getElementById(props.message._id);
      if(m_comp !== undefined && m_comp !== null){
        m_comp.classList.add(pos);
        m_comp.classList.add(color);
          
      }
      // console.log("Component : ",m_comp);
    
    
      return () => {
        
        
      }
    }, [])
    
    // const val = 

  return (
    <div>
      <div id={props.message._id} className='p-2 border border-spacing-1 mb-6 rounded-2xl' 
      style = {{display : 'inline-block',width : 'calc(min-content,max-content)',maxWidth : '40rem',wordWrap :'break-word'}}
      >
          {props.message.content}
      </div>
      <div className=' w-full flex'>
      </div>
    </div>
  )
}

export default Message