import React from 'react'

const SearchResult = (props) => {

  return (
        <button onClick={props.handleFetchChat} value={JSON.stringify(props.user)}  className=' text-white text-wrap m-1 border border-spacing-1 bg-blue-700 hover:bg-blue-800 mb-0 rounded-lg ' 
        style = {{width : '25%',height : ''}}
    >
            {props.user.name}
    </button>
  )
}

export default SearchResult