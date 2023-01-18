import CurrentUser from "./currentUser";
import { useState } from "react";
const UserState=(props)=>{
    const state1={
        name:"harry",
        id:"1bc"
    }
    const [state, setState] = useState()
    const updateCurrentUserChat=(data)=>{
           setState(data)
    }
    const[currentUser,setCurrentUser]=useState(null)
    const user=(data)=>{
       setCurrentUser(data)
    }
    return (
        <CurrentUser.Provider value={{state,updateCurrentUserChat,user ,currentUser}}>
         {props.children}

        </CurrentUser.Provider>
    )
}
export default UserState