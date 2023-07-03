import style from '../assets/SignUp.module.css';
import {useState,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
import { collection,addDoc ,query,where,getDocs} from 'firebase/firestore';
import { toast } from 'react-toastify';



export default function SignUp(){

    let [name,setName] = useState("");
    let [email,setEmail] = useState("");
    let [Password,setPassword] = useState("");
    let [Confirm_Password,setConfirm_password] = useState("");
    let navigate = useNavigate();
    let input = useRef(null);


    useEffect(() => {
        input.current.focus();
    },[]);

   async function handleSubmit(e){
        e.preventDefault();
        const q = query(collection(db, "Users"), where("email", "==", email));
  
        const querySnapshot = await getDocs(q);
        
       

        if (Password === Confirm_Password){

           

            if (querySnapshot.empty){

                await addDoc(collection(db,"Users"),{
                    Name : name,
                    email : email,
                    password : Password
                })

           
                 toast.success("SignUp Successfully",{
                    theme : "colored",
                    autoClose : 3000
                 })

                setName("");
                setEmail("");
                setConfirm_password("");
                setPassword("");
               
            }else{
                toast.info("User is Already There",{
                    theme : 'colored'
                })
            }

            navigate('/');

        }else{
            toast.error("Fill Correct password and Confirm Password",{
              theme : 'colored',
              autoClose : 3000
            })
            setPassword("");
            setConfirm_password("");
        }
        input.current.focus();
          
    }

    

    return (
    <>
     <form onSubmit={(e) => handleSubmit(e)}>
    <div className = {style.SignUpContainer}>

    

        <h1>Sign Up</h1>
      
            <div className= {style.name}>
            <span>Name </span> 
            <input type = "text" value={name} ref={input} placeholder='enter your name' onChange={(e) => setName(e.target.value)} required></input>
            </div>
            <div className = {style.email}>
                <span>Email</span> 
                <input type= "email" value={email}  placeholder='enter your email' onChange={(e) => setEmail(e.target.value)} required></input>
            </div>

            <div className= {style.password}>
            <span>Password </span> 
            <input type = "password" value = {Password}  placeholder='enter the password' required onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <div className= {style.confirm_password}>
            <span> Confirm Password </span> 
            <input type = "password" value={Confirm_Password} required onChange={(e) => setConfirm_password(e.target.value)} placeholder='enter the Confirm password'></input>
            </div>
            <div className= {style.button}>
                <input type = "submit" value = "Sign Up"></input>
            </div>
         

    </div>
    
    </form>
    
    
    
    
    </>
    )
}