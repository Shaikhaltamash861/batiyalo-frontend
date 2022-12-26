// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Chat from './pages//Chat';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user,setUser]=useState();
  const userHandle=(data)=>{
    
    setUser(data)
    
    
  }

  useEffect(()=>{
    
    localStorage.setItem('user',JSON.stringify(user))
    
    
 
    
  },[user])
  

  
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={ user? <Chat user={user} userHandle={userHandle}/>:<Login userHandle={userHandle}/>}/>
        <Route exact path="/login" element={<Login userHandle={userHandle}/>}/>
        <Route exact path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </>

  );
}
  
  export default App;
  