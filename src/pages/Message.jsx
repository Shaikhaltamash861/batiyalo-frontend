import React,{useState,useEffect} from 'react'
import './msg.css'
import {format} from 'timeago.js'
function Message({id,item}) {
 const [currentTime,setCurrentTime]=useState()
 useEffect(() => {
   
   
   const time=item.createdAt
   const thatDay=   new Date(time);
   let h=thatDay.getHours()
   const m=thatDay.getMinutes();
   if(h>=12){
     h=h%12
     if(m<10){
      setCurrentTime(String(h+":"+"0"+m+" pm")) 
     }else{

       setCurrentTime(String(h+":"+m+" pm")) 
      }
    }
    else{
      if(m<10){
        setCurrentTime(String(h+":"+"0"+m+" pm")) 
       }else{
  
         setCurrentTime(String(h+":"+m+" am")) 
      }
       
    }
  }, [item])

  return (
    
      <div className='messages'>

        
        <div className={id===item.senderId?"me":"you"} >
            <div className='msg-box'>


            <span>
              <span className='message-tag'>{item.text} 
                
                <small className='timeago'>{currentTime}</small>
                </span > 
            </span> 
           
        
            
            </div>
            
            </div>
      </div>
            
    
    
    
  )
}

export default Message