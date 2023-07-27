import React ,{useState,useEffect}from 'react'
import Img from '../asset/avatar1.png'
import axios from 'axios'
import url from '../routes/baseUrl'
function ChatList({val,id}) {
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
                          setLastTime(String((day+"/"+month+"/"+year)))
                            
  
                        }
                      }
  
               }
               getLastMsg()
            },[val])

    return (
        <div className='block'>
            <div className='chat_img'>
                <img className='chat_user_img' src={Img} alt='user_img' />
            </div>
            <div className='details'>
                <div className='name_time'>
                    <h4 className='name'>{friends.name}</h4>
                    <p>{lastTime}</p>
                </div>
                <div className='last_msg'>
                    <p>{lastMsg} </p>
                </div>
            </div>

        </div>
    )
}

export default ChatList