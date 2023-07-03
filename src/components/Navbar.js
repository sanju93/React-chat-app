
import style from '../assets/Navbar.module.css';
import {NavLink,Outlet,useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';


function NavBar(){

    var navigate = useNavigate();
  

   



    function handleLogout() {

        localStorage.removeItem("login-user");
        toast.success("User Successfully LoggedOut",{
            theme: "colored",
            autoClose: 3000
        })

        navigate('/');
        

    }

    return (
        <>
    <div className= {style.container}>

        <div className = {style.child}>
           <span>Chat-App</span> 
        </div> 

      <div className= {style.child}>
        <NavLink to = "/" style = {({isActive}) => isActive ? {color : "red"} : undefined}> 
        <span>
            Login
        </span>
        </NavLink>

        </div>


       

        <div className= {style.child}>

        <NavLink to = "/sign-up" style = {({isActive}) => isActive ? {color : "red"} : undefined}>
        <span>
            Sign Up    
        </span>
        </NavLink>    
            
        </div>  

        <div className= {style.child}>

    
                <span onClick={handleLogout} style={{cursor : 'pointer'}}>
                    Logout
                </span>
              

            


        </div>

    

    </div>
    <Outlet/>
    
    </>
    );
}

export default NavBar;