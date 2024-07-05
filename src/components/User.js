import React from 'react'

const User = (props) => {
    return (
        <button onClick={props.handleClick} value={JSON.stringify(props.user)} className='UserBigButton text-white text-wrap p-4 border border-spacing-1 bg-blue-700 hover:bg-blue-800 mb-0 rounded-lg ' 
         style = {{width : '100%'}}
        >
             {props.user.name}
        </button>
      )
}

export default User