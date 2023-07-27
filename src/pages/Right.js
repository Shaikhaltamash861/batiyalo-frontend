import React, { useState,useEffect ,useRef} from 'react'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import SendIcon from '@mui/icons-material/Send';
import Img from '../asset/avatar1.png'
import { useContext } from 'react';
import ChatBox from './ChatBox';
import CurrentUser from '../context/currentUser';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';

import { io } from 'socket.io-client'
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import url from '../routes/baseUrl';
function Right({user}) {
  const update=useContext(CurrentUser)
  const updateUser=(item)=>{
    // console.log(item)
    update.updateCurrentUserChat(item)
}
const foc=useRef(null)
  const contextApi=useContext(CurrentUser)
  const currentChat=contextApi.state;
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedUser, setSelectedUser] = useState();
  const [socketMessge,setSocketMessage]=useState(null)
  const [click,setClick]=useState(false)
  const [onlineUsers,setOnlineUser]=useState([])
  const [getStatus,setGetStatus]=useState()
  const scrollRef = useRef()
  const socket = useRef()
  foc.current?.focus()
  const height = window.innerHeight;
  useEffect(() => {
    socket.current = io('https://socketapi-2ffd.onrender.com');
    socket?.current.on('getMessage', (data) => {

      setSocketMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date()
      })
    })
    console.log('socketMsg arrived ')
  }, [])
  useEffect(() => {
    console.log('msg received')
    socketMessge && currentChat?.members?.includes(socketMessge?.sender) &&
      setMessages(prev => [...prev, socketMessge])
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [socketMessge, currentChat])
  useEffect(() => {
    socket?.current.emit('addUsers', user.message._id)
    socket?.current.on('getUsers', (users) => {
      setOnlineUser(users)
    })
  }, [user])




  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get(`${url}/api/message/${currentChat._id}`)
      setMessages(data)
    }
    const getCurrentUser = async () => {
      const findOtherUsers = currentChat?.members.find((m) => m !==user.message._id )
      const { data } = await axios.get(`${url}/api/getuser/${findOtherUsers}`)
      setSelectedUser(data)
    }
    getMessages()
    getCurrentUser();
  }, [currentChat])
  const handleKeyPress=(e)=>{
   console.log('keyPressed')
    if(e.key=='Enter'){
      handleSubmit(e);
    }

  }
  const handleSubmit = async (e) => {
  
    console.log('clicked')
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    e.preventDefault();
        if(!newMessage)return;
        const renderMessage={
          createdAt: Date.now(),
          senderId: user.message._id,
          text: newMessage
        }
        setMessages([...messages,renderMessage])
    const sandesh = {
      conversationId: currentChat._id,
      senderId: user.message._id,
      text: newMessage
    }
    const receiverId = currentChat.members.find((member) => member !== user.message._id)
    socket?.current.emit('sendMessage', {
      senderId: user.message._id,
      receiverId: receiverId,
      text: newMessage

    })
    const { data } = await axios.post(`${url}/api/message/newMessages`, sandesh)
    // setMessages([...messages, data])
    console.log(data)
    setNewMessage('')
  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  useEffect(() => {
    const x = onlineUsers?.find((user) => user.userId == selectedUser?.message._id)
    setGetStatus(x)
  }, [selectedUser, onlineUsers])
  const emoji = (obj) => {

    let msg = newMessage
    msg += obj.emoji
    setNewMessage(msg)
  }
  return (
    <div className='right_container' onKeyDown={handleKeyPress}>
          <div className='header'>
            <div className='current_user_detail'>
               
               <KeyboardBackspaceSharpIcon className='back' onClick={()=>updateUser(null)}/>
            <div className='current_user_img'>
             <img className='cover' src={Img} alt='img'/>
            </div>
            <h4>{selectedUser?.message.name}
               <br/>
               {
                          getStatus?.userId ? (

                            <span className='users-status'>online</span>
                          ) : (

                            <span className='users-status'>offline</span>
                          )
                        }
            </h4>
            </div>
            <div className='nav_icons'>
                <MoreVertSharpIcon className='vertical'/>
            </div>
        </div>
        <div className='chatBox'  style={{
          height:`${height}`
        }} >
               {
                messages.map((message,index)=>(
                  <div ref={scrollRef}  key={index}>

                    <ChatBox  message={message} user={user}/>
                  </div>
                ))
               }
           
            
        </div>
        <div className='input_box'>
            <>
              
            {
                      click ? (

                        <div className='emoji-picker'>

                          <EmojiPicker onEmojiClick={emoji} className='emojipickers' height={300} width='100%' />
                        </div>
                      ) : ('')

                    }

                   <div className='emojiRemove'>
                     <EmojiEmotionsOutlinedIcon onClick={() => setClick(!click)} className='emoji' />
                    </div>
            </>
            <input className='inpt' type='text' ref={foc} autoFocus autocomplete="off"  value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}
            name="message" placeholder='write something...' />
            <SendIcon type='submit' onKeyDown={handleKeyPress} className='send' onClick={handleSubmit}
           
            
            
            />
        </div>
    </div>
  )
}

export default Right