import style from '../assets/Login.module.css';
import {useState,useRef,useEffect} from 'react';
import db from '../firebase';
import {query,collection,where,getDocs} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';



export default function Login(){

    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let input = useRef(null);
    let navigate = useNavigate();
   

    useEffect(() => {
        input.current.focus();
      var data = localStorage.getItem('login-user');

      if (data){
        navigate('/chat')
      }
    },[])


   async function handleSubmit(e){


        e.preventDefault();

        let q = query(collection(db,'Users'),where('email',"==",email));
        let querySnapshot = await getDocs(q);

        if(querySnapshot.empty){

          toast.info('User Not There Please Do SignUP before',{
        
            theme : "colored",
            autoClose : 3000
          })
            navigate('/sign-up');
        }else{
             var data = querySnapshot.docs[0].data();

             if (password == data.password){
                localStorage.setItem('login-user',email);
                toast.success("logged In successfully",{
                    theme : 'colored',
                    autoClose : 3000
                })
                navigate('/chat');
             }else{
              toast.error("Please Check Your credentials",{
                theme : "colored",
                autoClose : 3000
              })
             }
             
          

        }



      setEmail("");
      setPassword("");
        input.current.focus();


    }



    return(
    <>
   
    <form onSubmit={(e) => handleSubmit(e)}>
    <div className = {style.loginContainer}>

    

        <h1>Login In</h1>
      
            <div className= {style.email}>
            <span>Email </span> 
            <input type = "email"  ref = {input} value = {email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the email' required></input>
            </div>
            <div className = {style.password}>
                <span>Password </span> 
                <input type="password" value= {password} onChange={(e) => setPassword(e.target.value)} placeholder='enter the password' required></input>
            </div>
            <div className= {style.button}>
                <input type = "submit" value = "Login"></input>
            </div>
         

    </div>
    
    </form>
    </>
    );


}