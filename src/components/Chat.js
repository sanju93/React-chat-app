import db from '../firebase';
import {collection,onSnapshot} from 'firebase/firestore';
import { useEffect , useState} from 'react';
import Chats from './Chats';
import style from '../assets/chat.module.css';
import { Outlet } from 'react-router-dom';

export default function Chat(){

    let [Users,setUsers] = useState([]);
   

    useEffect(() => {
         onSnapshot(collection(db,'Users'),(doc) => {
            var users = doc.docs.map((doc) => {
                return {
                    email : doc.data().email,
                    name : doc.data().Name,
                    id : doc.id
                }
            })

            var loggedIn = localStorage.getItem('login-user');

            users = users.filter((item) => item.email != loggedIn);

            setUsers(users);
         
         })   
    },[])
    
    return (
    <>
    <div className= {style.main}>
     <div className = {style.chatsContainer}>
    

    {Users.map((item,index) => {
        return (
            <Chats name = {item.name} id = {item.id} key = {index}/>
        )
    })}

    </div>
    <Outlet/>
    </div>
  
    </>);
}