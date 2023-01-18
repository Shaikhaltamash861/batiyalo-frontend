import React,{useEffect,useState} from 'react'
import './chatBox.css'
function ChatBox({message,user}) {
    const [currentTime,setCurrentTime]=useState()
    useEffect(() => {
      
      
      const time=message.createdAt
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
     }, [message])
   
    return (
        <div className='chat_box'>
            <div className='messages'>
                
                    
                         <div  className={`message  ${message.senderId===user.message._id? " my_message":"him_message"}`} >
                                <p> {message.text} <br/> <span>{currentTime}</span></p>
                        </div>


            </div>
        </div>
    )
}

export default ChatBox