import './App.css';
import {Route,Routes} from 'react-router-dom'

import Home from './components/Home';
import Signup from './authentication/Signup';
import Login from './authentication/Login';
import {io} from 'socket.io-client'
import { useEffect, useMemo, useState } from 'react';
import GroupModal from './components/GroupModal';

// let socket = io.connect("http://localhost:5000");

function App() {

  const url = process.env.REACT_APP_BACKEND_URL_BASE;
  const socket = useMemo( () => io(url,{autoConnect : false}) , []);
  
  // const socket = io(url);
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      console.log("Clearing local storage...");
      localStorage.clear();
      return event.returnValue = "Are you sure you want to exit?";

    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home socket={socket} />}/>
        <Route exact path='/home' element={<Home socket={socket}/>}/>
        <Route exact path='/signup' element={<Signup socket={socket} />} />
        <Route exact path='/login' element={<Login socket={socket} />} />
        <Route exact path='/modal' element={<GroupModal />} />

        {/* <Route exact path='/chat' Component={Chat} /> */}
      
      </Routes>
    </>
  );
}

export default App;
