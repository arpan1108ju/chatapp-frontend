import React from 'react'

const Group = (props) => {
    return (
        <button onClick={props.handleClick} value={JSON.stringify(props.group_chat)} className='ChatBigButton text-white text-wrap p-4 border border-spacing-1 bg-blue-700 hover:bg-blue-800 mb-0 rounded-lg ' 
         style = {{width : '100%'}}
        >
             {props.group_chat.chat_name}
        </button>
      )
}

export default Group