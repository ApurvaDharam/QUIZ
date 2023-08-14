import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Quiz2 from './components/Quiz2';
import {auth} from './firebase';
import Theme from './components/Theme';
import newQuiz from './components/newQuiz';
import newTheme from './components/newTheme';


function App() {
  const[userName, setUserName]= useState("");

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if (user){
        setUserName(user.displayName);
      }else setUserName("");
      console.log(user);
    });
  },[]);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<Home name={userName}/>} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/quiz" element={<Quiz2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
