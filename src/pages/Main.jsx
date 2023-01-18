import React,{useState} from 'react'
import './main.css'
import avatar from '../asset/avatar1.png'
import Left from './Left'
import Right from './Right'
import { useContext } from 'react';
import CurrentUser from '../context/currentUser';
function Main({user}) {
  const contextApi=useContext(CurrentUser)
  const currentChat=contextApi.state;
  const [getcurrentUser,setCurrentUser]=useState();
  const getUser=(data)=>{
    setCurrentUser(data)
  }
  return (
    <div className='container'>
      <div className={ contextApi.state?'leftNone':'rightNone'}></div>
        <div className='left'> 
       
         <Left user={user} getUser={getUser}/>
         </div>
         <div className='right'>
          {
            currentChat?(

              <Right getcurrentUser={getcurrentUser} user={user}/>
            ):(<span>NO CHAT</span>)
          }
        </div>
    </div>
  )
}

export default Main