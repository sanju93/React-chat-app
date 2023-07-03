import NavBar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat";
import ChatBox from "./components/ChatBox";


import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  

  var router = createBrowserRouter([
    {
      path : '/',
      element : <NavBar/>,
      children : [
      {
        index : true,
        element : <Login/>
      },
      {
        path : '/sign-up',
        element : <SignUp/>
      },
      {
        path : '/chat',
        element : <Chat />,
        children : [
          {
          path : '/chat/chat-box/:id',
          element : <ChatBox />
        }
      ]
      }
  ]}
  ]);

    
 

  return (
    <div className="App">
      <ToastContainer/>
     
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
