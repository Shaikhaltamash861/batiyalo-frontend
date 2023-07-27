import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import styeled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios'
import bg from '../asset/bg.png'
import './chat.css'
import { io } from 'socket.io-client'
import avatar from '../asset/avatar1.png'
import FriendList from './FriendList';
import Message from './Message';
import NewChat from './NewChat';
import EmojiPicker from 'emoji-picker-react';
import url from '../routes/baseUrl';
function Chat({ user, userHandle }) {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState([])
  const [messages, setMessages] = useState([])
  const [newMeassage, setNewmessage] = useState();
  const [selctedUser, setSelectedUser] = useState();
  const [openChat, setOpenChat] = useState(false);
  const [myFriend, setMyfriend] = useState([])
  const [socketMessge, setSocketMessage] = useState(null)
  const [onlineUsers, setOnlineUser] = useState()
  const [getStatus, setGetStatus] = useState()
  const [click, setClick] = useState(false)
  const socket = useRef()

  const id = user.message._id

  const scrollRef = useRef()
  const [updated, setUpdate] = useState([])
  const updater = (data) => {
    setUpdate(data)

  }
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
  }, [socketMessge, currentChat])
  useEffect(() => {
    socket?.current.emit('addUsers', id)
    socket?.current.on('getUsers', (users) => {
      setOnlineUser(users)
    })
  }, [user])
  useEffect(() => {
    const getConversation = async () => {
      const { data } = await axios.get(`${url}/api/conversation/${id}`)

      setConversations(data)
    }
    getConversation()

  }, [user, updated])

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get(`${url}/api/message/${currentChat._id}`)
      setMessages(data)
    }
    const getCurrentUser = async () => {
      const findOtherUsers = currentChat?.members.find((m) => m !== id)
      const { data } = await axios.get(`${url}/api/getuser/${findOtherUsers}`)
      setSelectedUser(data)
    }
    getMessages()
    getCurrentUser();
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sandesh = {
      conversationId: currentChat._id,
      senderId: id,
      text: newMeassage
    }
    const receiverId = currentChat.members.find((member) => member !== id)
    socket?.current.emit('sendMessage', {
      senderId: id,
      receiverId: receiverId,
      text: newMeassage

    })
    const { data } = await axios.post(`${url}/api/message/newMessages`, sandesh)
    setMessages([...messages, data])
    setNewmessage('')
  }
  const origin = []
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  const b = 'abc'
  // const getSelectedUser= async(data)=>{
  //   setCurrentChat(data);
  //   const {data}=await axios.get(`http://localhost:5000/api/getuser/${findOtherUsers}`)
  // }
  conversations.map((val) => {
    const findOtherUsers = val.members.find((m) => m !== id)
    origin.push(findOtherUsers)
  })

  useEffect(() => {
    const x = onlineUsers?.find((user) => user.userId == selctedUser?.message._id)
    setGetStatus(x)
  }, [selctedUser, onlineUsers])
  const emoji = (obj) => {

    let msg = newMeassage
    msg += obj.emoji
    setNewmessage(msg)
  }

  return (
    <>
      <Container>
        <Sidebar>
          <Nav>
            <div className='userdetail'>

              <img className='user-profile' src='https://i.pinimg.com/736x/bb/e3/02/bbe302ed8d905165577c638e908cec76.jpg' alt='ig' />
              <  span className='logged-user'>
                {user.message.name}
              </span>
            </div>
            <span className='people-icon'><PeopleIcon onClick={() => setOpenChat(!openChat)} /></span>
            <span className='nav-icons'>
              <LogoutIcon onClick={() => userHandle(false)} />
            </span>
          </Nav>

          {
            openChat ?
              <ContactList>

                <NewChat id={id} userList={origin} updater={updater} />
              </ContactList>
              : (

                <ContactList>



                  {
                    conversations.map((val, index) => (
                      <div className='click' onClick={() => setCurrentChat(val)}>

                        <FriendList key={index} val={val} id={id} />
                      </div>
                    ))
                  }
                </ContactList>
              )
          }

        </Sidebar>


        <ChatArea>
          {
            currentChat?._id ? (
              <div>

                <NavChat>
                  <p className='current-user-deatail'>
                    <img className='current-user' src={avatar} alt='ig' />
                    <div className='current-chat-info'>

                      <div>

                        <span className='user-name'>{selctedUser?.message.name}</span>
                      </div>
                      <div>
                        {
                          getStatus?.userId ? (

                            <h3 className='user-status'>online</h3>
                          ) : (

                            <h3 className='user-status'>offline</h3>
                          )
                        }
                      </div>
                    </div>
                  </p>
                  <p className='user-menu'>

                    <MoreVertSharpIcon />

                  </p>
                </NavChat>

                <Messages>
                  {

                    messages.map((item, index) => (
                      <div ref={scrollRef}>

                        <Message item={item} id={id} key={index} />
                      </div>
                    ))
                  }


                  <Textual>


                    {
                      click ? (

                        <div className='emoji-picker'>

                          <EmojiPicker onEmojiClick={emoji} className='emoji-picker' height={300} width='100%' />
                        </div>
                      ) : ('')

                    }

                    <EmojiEmotionsOutlinedIcon onClick={() => setClick(!click)} className='emoji' />





                    <AttachmentOutlinedIcon className='attachment' />

                    {/* <Input value={newMeassage} onChange={(e) => setNewmessage(e.target.value)} /> */}
                    <SendIcon className='sendbutton' onClick={handleSubmit} />
                  </Textual>
                </Messages>
              </div>
            ) : (
              <Messages></Messages>
            )
          }


        </ChatArea>

      </Container>

    </>
  )
}

export default Chat

const Container = styeled.div`
   display: flex;
   
`
const Sidebar = styeled.div`
 
 flex:30%;
 position:relative;
 background-color:#101a20;
 min-height: 100%;
   height: auto !important;
   height: 100%; 

`
const ChatArea = styeled.div`
flex:70%;
position:relative;
border-left:0.5px solid #848488;
// background-image:url('https://play-lh.googleusercontent.com/SZ97RCEv5EVH6iMCDIdHeGJM_BNyHYcnRQ4EdK4V_VyVxLlQS8GY1U3xB8atEBH55OM');
background-image:url(${bg});

background-color:	 #101a20;
// background-color:	rgba(233,237,239,0.12);
`
const Nav = styled.div`

height: 68px;
display:flex;
align-items:center;
justify-content:space-between;

background-color: #202c33;
`

const ContactList = styled.div`
 margin-top:10px;
 overflow-y:scroll;
 overflow-x:hidden;
height: 637px;
&::-webkit-scrollbar {
  width: 2px;
  
}
&::-webkit-scrollbar-track {
 width:1px;
 height:10vh;
  

}
&::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  height:2px;
  outline: 1px solid #aebac1;
}


`
const Div = styled.div`
display: flex;
   justify-content: space-between;
  width:100%;
  height:72px;
  background-color:#101a20;
  border:1px solid #373d41;
  border-left:none;
  border-right:none;
  border-top:none;
  
  margin-left:10px;
  color:white;


`
const Span = styeled.div`
margin-top: 28px;
margin-right:20px;

`
const NavChat = styled.div`
 display:flex;
 align-items:center;
 justify-content:space-between;
//  border-left:1px solid gray;
height:68px;
background-color: #202c33;
`
const Messages = styled.div`
overflow-y:scroll;
overflow-x:hidden;
position:relative;
// height: 100%;
&::-webkit-scrollbar {
 width: 3px;
 height:10px;
 
}
&::-webkit-scrollbar-track {

 

}
&::-webkit-scrollbar-thumb {
 background-color: darkgrey;
 height:5px;
 outline: 1px solid slategrey;
 
}


`
const Input = styled.input`
width:78%;
height:40px;
position:fixed;
outline:none;
// text-align:center;
text-indent:10px;
margin-right:20px;
 background-color:#373d41;
border-radius:6px;
border:none;
color:white;
`
const Button = styled.button`
height:50px;
width:70px
margin-right:40px;
`
const Textual = styled.div`
    position: relative;
    bottom:0;
      background-color:#202c33;
      height:70px;
      width:100%;
      display: flex;
      justify-content: flex-end;
      align-items:center;
      

`

