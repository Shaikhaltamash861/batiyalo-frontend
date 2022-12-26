import React ,{useEffect,useState}from 'react'
import styled from 'styled-components'
import styeled from 'styled-components'
import axios from 'axios'
import avatar from '../asset/avatar.jpg'
function NewChat({id,userList,updater}) {
    const [friends,setFriends]=useState([])
    const [updated,setUpdate]=useState([])
    
    useEffect(()=>{

       
           
          const getUsers=async()=>{
           const {data}=await axios.get(`https://batiyaloapi.onrender.com/api/getAllUser`)
           setFriends(data)
           
         }
         getUsers()
         
       } ,[id])
       
       const filteredArray=friends.filter((item,index)=>{
        return item._id!==id;
       })
   
       const addFriend= async(val)=>{
        
        const {data}=await axios.post(`https://batiyaloapi.onrender.com/api/conversation/newConversation`,{
          senderId:id,
          receiverId:val._id
        })
         if(data){
          console.log(data.members[1])
             reFilter(data.members[1])
          }
        
         
          
       }
  

         let uniqueResultArrayObjOne = filteredArray.filter(function(objOne) {
           return !userList.some(function(objTwo) {
             return objOne._id === objTwo;
            });
          });
          
     



    const reFilter=(userId)=>{
      const myArray=uniqueResultArrayObjOne.filter((item,index)=>{
        return item._id!==userId;
       })
       console.log(uniqueResultArrayObjOne)
        console.log(myArray)
        uniqueResultArrayObjOne=myArray
      
        console.log(uniqueResultArrayObjOne)
        setFriends(myArray)
        updater(myArray)
     }
    
   
  return (
    <div>
        {
            uniqueResultArrayObjOne.map((val,index)=>{
                return  <Div key={index} onClick={()=>addFriend(val)}>
    <p className='imgName'>
     <img className='imgring' src={avatar} alt='ig'/>
     <p >

    <p className='chat-name' >
      {val.name}
     </p>
     <p className='last-message' ></p>
     </p>
     </p> 

      <Span>Add me</Span></Div>



            })
        }

    </div>
  )
}

export default NewChat
const Div = styled.div`
display: flex;
   justify-content: space-between;
   cursor:pointer;
  width:100%;
  height:72px;
  background-color:#101a20;
  border:1px solid #373d41;
  border-left:none;
  border-right:none;
  border-top:none;
  
  margin-left:10px;
  color:white;


`
const Span=styeled.div`
margin-top: 28px;
margin-right:20px;
color:teal;

`