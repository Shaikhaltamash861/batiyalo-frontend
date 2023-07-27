import React,{useState ,useContext} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import CurrentUser from '../context/currentUser'
import LoginUser from '../asset/pngwing.com.png'
import axios from 'axios'
import url from '../routes/baseUrl'
function Login({userHandle}) {

//  console.log(height)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();
    const updateUser=useContext(CurrentUser)
    const signIn = async() => {
   
       const {data}=await  axios.post(`${url}/api/login`,{
        email:email,
        password:password
       })
       console.log(data)
      if(data.status){

        updateUser.user(data)
        navigate('/')
        
      }
      else{
      
        alert(`${data.message}`)
      }
      setEmail('');
      setPassword('')
    }
  return (
    <div className='login'>

    

    <div className="login__logo">
      <img
        src={LoginUser}
        alt="userimg"
        />
      
    </div>
      <input className="ipt" type='text' placeholder='gmail' name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />  
      <input className="pass" type='password' placeholder='password' name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />  
    <button className='button' onClick={signIn}>Sign In</button>
    <p className='account'>don't have account!! <span onClick={()=>navigate('/register')}>click</span></p>
  </div>
        
  )
}

export default Login