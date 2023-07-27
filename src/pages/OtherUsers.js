import React,{useState,useEffect} from 'react'
import Img from '../asset/avatar1.png'
import axios from 'axios'
import url from '../routes/baseUrl'

function OtherUsers({id,userList,updater}) {
    const [friends,setFriends]=useState([])
    useEffect(()=>{

       
           
        const getUsers=async()=>{
         const {data}=await axios.get(`${url}/api/getAllUser`)
         setFriends(data)
         
       }
       getUsers()
       
     } ,[id])

     const filteredArray=friends.filter((item,index)=>{
        return item._id!==id;
       })
   
       const addFriend= async(val)=>{
        
        const {data}=await axios.post(`${url}/api/conversation/newConversation`,{
          senderId:id,
          receiverId:val._id
        })
         if(data){
          
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
        uniqueResultArrayObjOne=myArray
        setFriends(myArray)
        updater(myArray)
     }
    
  return (
    <>
    {
        uniqueResultArrayObjOne.map((val,index)=>{
            return <div className='block' onClick={()=>addFriend(val)}>
            <div className='chat_img'>
                <img className='chat_user_img' src={Img} alt='user_img' />
            </div>
            <div className='details'>
                <div className='name_time'>
                    <h4 className='name'>{val.name}</h4>
                    <p style={
                        { color:'teal',
                        cursor:'pointer'
                    }
                    }> AddFriend</p>
                </div>
                <div className='last_msg'>
                    <p> </p>
                </div>
            </div>

        </div>
    })
}
    </>
  )
}

export default OtherUsers