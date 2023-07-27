import React ,{ useEffect,useState,useContext}from 'react'
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import app from './firebase';
import './auth.css';
import CurrentUser from '../context/currentUser'
import axios from 'axios';
import url from '../routes/baseUrl';


function Auth() {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [haveAccount,setHaveAccout]=useState(true);
    const [error,setError]=useState('')
const updateUser=useContext(CurrentUser)
const signIn= async()=>{
 if(!email  || !password){
    setError('Firebase:values are missing')
    return;
 }
    
        const {data}=await  axios.post(`${url}/api/login`,{
            email:email,
            password:password
        })
        console.log(data)
        if(data.status){
          updateUser.user(data)

      }
      else{
        alert('unable to login')
      }

    
}
const signUp= async()=>{
 
    const {data}=await axios.post(`${url}/api/register`,{
        name:name,
        email:email,
        password:password
       })
       if(data.status){
        setHaveAccout(!haveAccount)
       }else{
        console.log('something went wrong')
       }
       

}
  return (
    <div className='container'>

        <div className='box'>
            {
                haveAccount?(
                    <>

            <h1>Login</h1>
            <input type='email' value={email} name='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' value={password} name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <div>
               <p className='error' style={
                {
                    color:'red'
                }
               }>{error.slice(9,error.length)}</p>
            <p className='account'>don't have account! <span onClick={()=>setHaveAccout(!haveAccount)}>click</span></p>
            </div>
            <button onClick={signIn}>Login</button>

                    </>
                ):(
                    <> 

                    <h1>SignUp</h1>
                    <input type='text' value={name} name='name' placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
                    <input type='email' value={email} name='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>

                    <input type='password' value={password} name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    <p className='account'>have account! <span onClick={()=>setHaveAccout(!haveAccount)}>click</span></p>
                    <button onClick={signUp}>SignUp</button>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default Auth