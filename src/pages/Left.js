import React,{useEffect, useState} from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import PeopleIcon from '@mui/icons-material/People';
import profile from '../asset/avatar1.png'
import ChatList from './ChatList';
import axios from 'axios';
import OtherUsers from './OtherUsers'
import CurrentUser from '../context/currentUser';
import { useContext } from 'react';
import url from '../routes/baseUrl';
function Left({user}) {
     const [conversation,setConversations]=useState([])
     const [currentChat,setCurrentChat]=useState()
     const [openChat, setOpenChat] = useState(false);
     const [updated, setUpdate] = useState([])
     const updater = (data) => {
       setUpdate(data)
   
     }
     console.log(user)
     const update=useContext(CurrentUser)
       
          useEffect(() => {
               const getConversation = async () => {
                 const { data } = await axios.get(`${url}/api/conversation/${user.message._id}`)
           
                 setConversations(data)
               }
               getConversation()
               
           
             
     }, [user,updated])
     const origin=[]
     conversation.map((val) => {
          const findOtherUsers = val.members.find((m) => m !== user.message._id)
          origin.push(findOtherUsers)
        })
     // console.log(conversation)
     const updateUser=(item)=>{
          // console.log(item)
          update.updateCurrentUserChat(item)
     }
  return (
    <div className='left_container'>
         <div className='header'>
          <div className='currentUser'>

            <div className='userimg'>
                  <img className='imgring' src={profile} alt='img'/>
            
          </div>
          <div className='currentUserName'>
               {user.message.name}
          </div>
            </div>
            <div className='nav_icons'>
                    
                 <PeopleIcon className='people' onClick={()=>setOpenChat(!openChat)} />
                 <LogoutIcon className='logout' onClick={()=>update.user(null)} />
                 <MoreVertSharpIcon className='vertical'/>
            </div>
        </div>

        <div className='chatList'>

         {
              openChat?(
                   <OtherUsers id={user.message._id} userList={origin} updater={updater}/>
                   ):(
                        
                        
                        <>
       
        {
             conversation.map((item,index)=>{
                  return <div key={index} onClick={()=> updateUser(item)} >

           <ChatList  val={item} id={user.message._id}/>
                </div>
          })
     }     
     
     </>
        )
       }
        </div>
    </div>
  )
}

export default Left