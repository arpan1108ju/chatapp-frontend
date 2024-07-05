import React, { useEffect, useState } from 'react'
import Message from './Message'

const MessageBox = (props) => {

  useEffect(() => {

    // window.scrollTo(0,document.body.scrollHeight);
    
    console.log("In m box ",props.messages);

    return () => {
      
    }
  }, [])
  

  return (
    <div className=''>
      {/* <Message content='msg1' />
      <Message content='msg2' />
      <Message content='msg3' />
      <Message content='msg5' />
      <Message content='msg5' />
      <Message content='msg5' />
      <Message content='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      /> */}

      {props.messages.length > 0 ? props.messages.map((message)=>{

        // return  <Message userId={props.userId} content={message.content} key={message._id} id={message} sender={message.sender} />
        return  <Message userId={props.userId} message={message} key={message._id} />
      })
      :null}


      {/* <Message content='hefnaaaaaaaaaaaaaaaaourwoehohrhgiorhgeighegheiogtotehoehgoerhgerhgoierhgioerhgivnigegjeogoighergioerhgioerhgioerhgieogoi' /> */}
    </div>

  )
}

export default MessageBox