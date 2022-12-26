import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './register.css'
import axios from 'axios'
function Register() {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate();
    const register= async()=>{
         const {data}=await axios.post('https://batiyaloapi.onrender.com/api/register',{
          name:name,
          email:email,
          password:password
         })
         if(data.status){
          navigate('/login')
         }
         else{
        
          alert(`${data.message}`)
         }
    }
  
  return (
    <div className="register">
        

    <div className="regsiter__logo">
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a60c69b4-dbdc-49e3-b152-43bbdbfb0160/d6dy6qy-19e320f2-932f-4549-8050-2b7fb9289eda.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTYwYzY5YjQtZGJkYy00OWUzLWIxNTItNDNiYmRiZmIwMTYwXC9kNmR5NnF5LTE5ZTMyMGYyLTkzMmYtNDU0OS04MDUwLTJiN2ZiOTI4OWVkYS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.AQSIo8n9g9HHLZFVdCwqbDOjFg9DwZI35LCTIuLgtEw"
        alt=""
        />
      <h1 className='app-name-register'>BatiyaLo</h1>
    </div>
      <input className="ipts" type='text' placeholder='name' name="name" value={name} onChange={(e)=>setName(e.target.value)}  />  
      <input className="iptss" type='text' placeholder='gmail' name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />  
      <input className="passw" type='password' placeholder='password' name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />  
    <button className='buttons' onClick={register}>Register</button>
    <p className='accounts'>already have account!! <span onClick={()=>navigate('/login')}>click</span></p>
  </div>
        
  )
}

export default Register