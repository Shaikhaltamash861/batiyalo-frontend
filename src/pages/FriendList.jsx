import React,{useState,useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import styeled from 'styled-components'
import avatar1 from '../asset/avatar1.png'
import avatar2 from '../asset/ava.webp'
import avatar3 from '../asset/avatar.jpg'
import avatar4 from '../asset/av.png'
import url from '../routes/baseUrl'
function FriendList({val,id}) {
  const [friends,setFriends]=useState([])
  const [lastMsg,setLastMsg]=useState()
  const [lastTime,setLastTime]=useState()

           
    useEffect(()=>{

          const findOtherUsers=val.members.find((m)=>m!==id)
               
               
               const getUsers=async()=>{
             const {data}=await axios.get(`${url}/api/getuser/${findOtherUsers}`)
             setFriends(data.message)
             
            }
            getUsers()
            
            
            
            
          } ,[val,id])
          
          
          // let profile=avatar+number;
          useEffect(()=>{
             const getLastMsg=async()=>{
                  const {data}=await axios.get(`${url}/api/message/getLastMsg/${val._id}`)
                  if(!data){return;}
                  setLastMsg(data.text)
         
                  const thatDay=   new Date(data.createdAt)
                  const today=new Date();
                
                  if(thatDay.getDate()===today.getDate()){
                     let h=thatDay.getHours();
                     let m=thatDay.getMinutes();
                     if(h>=12){
                      h=h%12
                      if(m<10){
                        setLastTime(String(h+":"+"0"+m+" pm")) 
                      }else{
                 
                        setLastTime(String(h+":"+m+" pm")) 
                       }
                     }
                     else{
                       if(m<10){
                        setLastTime(String(h+":"+"0"+m+" pm")) 
                        }else{
                   
                          setLastTime(String(h+":"+m+" am")) 
                       }
                        
                     }
                
                    }else{
                      if(thatDay.getDay()-today.getDate()<=7){
                        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        let dayName=days[thatDay.getDay()]
                        setLastTime( String(dayName))
                        
                      }
                      else{
                        const day=thatDay.getDate()
                        const month=thatDay.getMonth()
                        const year=thatDay.getFullYear()
                        setLastTime(String((data+"/"+month+"/"+year)))
                          

                      }
                    }

             }
             getLastMsg()
          },[val])
          
          
  return (
    
        <Div className='focus' >
                 <p className='imgName'>
                  <img className='imgring' src={avatar1} alt='ig'/>
                  <p >

                 <p className='chat-name' >
                   {friends.name}
                  </p>
                  <p className='lst-msg' >{lastMsg}</p>
                  </p>
                  </p> 

                   <Span className='lst-time'>{lastTime}</Span></Div>
    
  )
}

export default FriendList
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
const Span=styeled.div`
margin-top: 28px;
margin-right:20px;

`