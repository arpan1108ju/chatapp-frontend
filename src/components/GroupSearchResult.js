import React from 'react'

const GroupSearchResult = (props) => {

  return (
        <button onClick={props.handleFetchGroupChat} value={JSON.stringify(props.group_chat)}  className=' text-white text-wrap m-1 border border-spacing-1 bg-blue-700 hover:bg-blue-800 mb-0 rounded-lg ' 
        style = {{width : '25%',height : ''}}
    >
            {props.group_chat.chat_name}
    </button>
  )
}

export default GroupSearchResult