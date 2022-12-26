import React,{useState,useEffect,useRef} from 'react'
// import { css } from 'emotion';
// import { css } from '@emotion/css'
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({socket,name,id}) {
    const messagesEndRef = useRef(null)
   
    const [input, setInput] = useState()
    const [chat,setChat]=useState([])
    const connection= async()=>{
        if(input&&socket){
            const obj={
                room:id,
                username:name,
                message:input
            }
          await  socket.emit('private',obj)
            setChat((prev)=>[...prev,obj])
            
            scrollToBottom()
        }
    }
    useEffect(() => {
      if(!socket) return;
    
      socket.on('secret',(data)=>{
        console.log(data)
        setChat((prev)=>[...prev,data])
        scrollToBottom()
      })
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }, [socket])
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
  return (
    <div className='chat'>
        <ScrollToBottom className='message-container'>

        <h1>Chating by : <span>{name}</span> </h1>
       
        <div className='flx'>
            <ul >

            { chat.map((val,index)=>{
              return  <h3 key={index} className={name===val.username?"you":"other"}><span className='messages'>{val.message}</span> </h3>
            })}
            </ul>
          
        </div>
        <div className='bottom'>
        <div className='typer'>

        <input type='text' placelholder='enter' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={connection}>send</button>
        </div>
        </div>
            <div ref={messagesEndRef} />
        </ScrollToBottom>
    </div>
  )
}

export default Chat