import React, {useEffect, useState} from 'react'
import {user} from "../join/Join.jsx"
import socketIO from "socket.io-client"
import "./Chat.css"
import Message from '../message/Message.jsx'
import ReactScroller from "react-scroll-to-bottom"



const ENDPOINT = "https://server-vikas-chat.onrender.com/"
let socket;
const Chat=()=> {
const [chatt, setChatt]=useState([])
const[usr, setusr]=useState()
                const [id, setId]=useState("")
                const send=()=>{
                    let message=document.querySelector('#c_chat').value;
                    socket.emit("message", {message, id})
                    document.getElementById('c_chat').value="";}
    useEffect(()=>{
        socket=socketIO(ENDPOINT, {transports:['websocket']});
            socket.on('connect',()=>{
                // alert("Connected") 
                setId(socket.id);             
            })
            socket.emit('joined', {user})
            socket.on("welcome",(data)=>{
                setusr(data.message);
                setChatt(prevChatt => [...prevChatt, data]);
                console.log(data.user," : " ,data.message);
            });
            socket.on("userJoined", (data)=>{
                setChatt(prevChatt => [...prevChatt, data]);
                console.log(data.user," : " ,data.message);
            })        
            socket.on("leave", (data)=>{
                // setChatt(prevChatt => [...prevChatt, data]);
                console.log(data.user," : " ,data.message);
            })    
            return ()=>{
               socket.emit('disconnected');
               socket.off();
            }
    },[]);

        useEffect(()=>{
                socket.on("sendMessage", (data)=>{
                    setChatt(prevChatt => [...prevChatt, data]);
                    console.log(data);
                })

            return ()=>{
                socket.off();
            }
        },[])


  return (
    <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
               Mr: {usr}
            </div>
            <ReactScroller className="chatBox"  >
            {chatt.map((item) => (
            <Message  msg={item.message} user={item.user} id={id} uid={item.id} />
        ))}
                  </ReactScroller>
            <div className="inputBox" ><input id='c_chat' placeholder='Type message here'/> 
            <button onClick={send}>Send</button> </div>
        </div>
    </div>
  )
}
export default Chat
