import React from 'react'
import "./Message.css"
const Message = ({msg, user, id, uid}) => {
    console.log(msg)
    if(uid!==id){
        return (
    <div className='msgBox left' >{user} : {msg}</div>
  )}
  else{
    return (
<div className='msgBox right' >You : {msg}</div>
)}
}

export default Message