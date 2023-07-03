
import style from '../assets/chat.module.css';


import { NavLink } from 'react-router-dom';


export default function Chats(props) {
 
   

    let {name,id} = props

 
    return (
        <>

<NavLink to = {`/chat/chat-box/${id}`} style={{textDecoration : 'none',color:'black',fontWeight : 'bolder'}}>

    <div className = {style.child}>
       
        <p>{name}</p>
        <span></span>
    

    </div>

</NavLink>
      
   
    
    </>
    );
}