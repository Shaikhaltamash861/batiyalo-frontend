// import logo from './logo.svg';
import { useEffect, useState,useContext } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Chat from './pages//Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Notfound from './pages/Notfound';
import CurrentUser from './context/currentUser';
import { useNavigate } from 'react-router-dom'
function App() {
  const userData=useContext(CurrentUser);
  const user=userData.currentUser;

  
  
  

  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={ user? <Main user={user}/> : <Login/> }/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </>

  );
}
  
  export default App;
  