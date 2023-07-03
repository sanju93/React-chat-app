import { useParams } from 'react-router-dom';
import { useState ,useRef,useEffect} from 'react';
import db from '../firebase';
import {collection,getDoc,query,where,doc,setDoc, getDocs, addDoc,onSnapshot} from 'firebase/firestore';
import style from '../assets/chat.module.css';
export default function ChatBox(){
    var params = useParams();
    let [type,setType] = useState("");
    let input = useRef(null);
    let [Mess,setMess] = useState([]);
    let [userName,setUserName] = useState("");
  


    
    useEffect(()=> {
      input.current.focus();
    },[params]);

    useEffect(() => {

     async function data(){

         let loggedEmail = localStorage.getItem('login-user');

         let q1 = query(collection(db,'Users'),where('email',"==",loggedEmail));
         let querySnapshot = await getDocs(q1);
         let loggedId =  querySnapshot.docs[0].id;
         let a = true;
       
   
             onSnapshot(doc(db,'Chats',loggedId),async (docs) => {

             

               if (docs.exists()){

               
           

               for (let i = 0; i < docs.data().refIds.length; i++){
                    
                  onSnapshot(doc(db,"Messages",docs.data().refIds[i]),(chats) => {
                   
                     if (chats.data().id == params.id){
                        setMess(chats.data().chats);
                        a = false;
                        return;
                     }
                  })

                  if (!a){

                     break;
                  }
                  
               }

            }

               if (a){
                  setMess([]);
               }

            
            

            });


            
          
        
         let docRef = doc(db,"Users",params.id);
         let docSnap = await getDoc(docRef);
         setUserName(docSnap.data().Name);

          

      }

      data();

     
    },[params]);




   async function handleSendChat(){

       
       let loggedEmail = localStorage.getItem('login-user');

       let q1 = query(collection(db,'Users'),where('email',"==",loggedEmail));
       let querySnapshot = await getDocs(q1);
       let loggedId =  querySnapshot.docs[0].id;
     


       // 1 phase 
       let docRef = doc(db,'Chats',loggedId);
       let docSnap = await getDoc(docRef);

       if (!docSnap.exists()){
       let docRef = await addDoc(collection(db,'Messages'),{
            id : params.id,
            chats : [{me : type}]
         });
        let ref = [];

        ref.push(docRef.id);
         await setDoc(doc(db,'Chats',loggedId),{
            refIds : ref
         })
         
       }else{
       
     
         let refs = docSnap.data().refIds;
       

         const q = query(collection(db,"Messages"),where('id',"==",params.id));
         const querySnapshot = await getDocs(q);

         let a = true;
      

         for(let i = 0; i < querySnapshot.docs.length; i++){
         
            if (refs.includes(querySnapshot.docs[i].id)) {
             
         
                   let chats =  querySnapshot.docs[i].data().chats;
                   chats.push({me : type});
                   await setDoc(doc(db,'Messages',querySnapshot.docs[i].id),{
                     id : params.id,
                     chats : chats
                   });

                   a = false;
              
                break;
            }
         }

         if (a){

            let docRef = await addDoc(collection(db,"Messages"),{
               id : params.id,
               chats : [{me : type}]
            });
   
          
            refs.push(docRef.id);
            await setDoc(doc(db,'Chats',loggedId),{
               refIds : refs
            });

         }

      

               
         }
         
    
       

       // 2 phase

       let docRef_1 = doc(db,'Chats',params.id);
       let docSnap_1 = await getDoc(docRef_1);

       if (!docSnap_1.exists()){
           let docRef_2 = await addDoc(collection(db,'Messages'),{
            id : loggedId,
            chats : [{other : type}]
           })
            let ref = [];
            ref.push(docRef_2.id);
            await setDoc(docRef_1,{
            refIds : ref
           })
       }else{

         const q = query(collection(db,"Messages"),where('id',"==",loggedId));
         const querySnapshot = await getDocs(q);
         
        
         let refs = docSnap_1.data().refIds;

         let a = true;
      

         for (let i = 0; i < querySnapshot.docs.length; i++){
      
            if (refs.includes(querySnapshot.docs[i].id)){
                let chats = querySnapshot.docs[i].data().chats;
                chats.push({other : type});
                await setDoc(doc(db,'Messages',querySnapshot.docs[i].id),{
                  id : loggedId,
                  chats : chats
                });
                 a = false;
                 break;
               
            }
         }


         if (a){
            let docRef = await addDoc(collection(db,"Messages"),{
               id : loggedId,
               chats : [{other : type}]
            });
   
          
            refs.push(docRef.id); 
            await setDoc(doc(db,'Chats',params.id),{
               refIds :  refs
            });
         }
        





     
            

       }
 
      
      

      setType("");
       input.current.focus();
    }

   
    return (
    <>
    <div className = {style.ChatBox}>

        <div className= {style.chats}>

         {Mess.map((item,index) => {
                return(<>
                {item.me ? 
                <div className = {style.me}>
                  <span>You</span>
                 <p>{item.me}</p>
                 </div> : undefined}
                 {item.other ?
                 <div className = {style.other}>
                  <span>{userName}</span>
                 <p>{item.other}</p>
                 </div> : undefined}
                </>);
         })}
          
        </div>
     

<div className = {style.chatPadContainer}>
<input type='text' ref={input} value={type} onChange={(e) => setType(e.target.value)} placeholder='Type the chat'></input>
<button onClick={handleSendChat}>Send</button>
</div>

    </div>


    
    </>
    );
}