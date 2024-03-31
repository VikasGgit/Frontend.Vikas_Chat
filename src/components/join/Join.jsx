import React , {useState}from 'react'
import { Link } from 'react-router-dom'
import "./Join.css"
let user;
const sendUser = () =>{
        user=document.getElementById('joinInput').value;
        if(user==="") alert("Please enter a username");
        else{
        document.getElementById('joinInput').value="";}
}
const handleKeyDown = (e) =>{
    if(e.key==='Enter'){
        sendUser();
    }
};
const Join = () => {
    const [name, setName]=useState("");
    
  return (
    <div className="JoinPage">
        <div className="Container">
        <h1 >Vikas Chat</h1>
        <input onChange={(e)=>{setName(e.target.value)}} onKeyPress={handleKeyDown} type="text" placeholder='Enter Your username' id="joinInput"/>
        {/* <input type="password" placeholder='Enter Your password'/> */}
        <Link onClick={(e)=>!name? e.preventDefault(): null} to="/chat"><button   onClick={sendUser} >Log In</button></Link>
        {/* <Link onClick={(e)=>!name? e.preventDefault(): null} to="/chat"></Link> */}
        {/* <Link to={name !== "" ? "/chat" : "/"} onClick={(e) => name !== "" ? null : e.preventDefault()}>
                    <button onClick={sendUser}>Log In</button>
                </Link> */}
        </div>
    </div>  
  )
}

export default Join
export {user}