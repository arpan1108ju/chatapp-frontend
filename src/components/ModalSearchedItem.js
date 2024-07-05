import React from 'react'

const ModalSearchedItem = (props) => {
    return (
      <div className='flex border border-spacing-1 bg-orange-600 hover:bg-red-800 mb-0 rounded-lg'>
        <div className=' text-white text-center text-wrap m-1.5 pr-1 ' 
        >
            {props.user.name}
        </div>
        <button onClick={props.handleClick} value={JSON.stringify(props.user)} className=' pt-1.5 pr-1'> <i className="fa-solid fa-xmark"></i> </button>
        
      </div>
  )
}

export default ModalSearchedItem