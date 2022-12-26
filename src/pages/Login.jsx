import React,{useState} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Login({userHandle}) {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate();
  
    const signIn = async() => {
   
       const {data}=await  axios.post('https://batiyaloapi.onrender.com/api/login',{
        email:email,
        password:password
       })
      if(data.status){
        userHandle(data)
        navigate('/')
        
      }
      else{
      
        alert(`${data.message}`)
      }
      setEmail('');
      setPassword('')
    }
  return (
    <div className="login">
    <div className="login__logo">
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a60c69b4-dbdc-49e3-b152-43bbdbfb0160/d6dy6qy-19e320f2-932f-4549-8050-2b7fb9289eda.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTYwYzY5YjQtZGJkYy00OWUzLWIxNTItNDNiYmRiZmIwMTYwXC9kNmR5NnF5LTE5ZTMyMGYyLTkzMmYtNDU0OS04MDUwLTJiN2ZiOTI4OWVkYS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.AQSIo8n9g9HHLZFVdCwqbDOjFg9DwZI35LCTIuLgtEw"
        alt=""
      />
      <h1 className='app-name'>BatiyaLo</h1>
    </div>
      <input className="ipt" type='text' placeholder='gmail' name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />  
      <input className="pass" type='password' placeholder='password' name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />  
    <button className='button' onClick={signIn}>Sign In</button>
    <p className='account'>don't have account!! <span onClick={()=>navigate('/register')}>click</span></p>
  </div>
  )
}

export default Login