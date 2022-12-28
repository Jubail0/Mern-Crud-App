import React from 'react'
import './App.css';
import Home from './Components/Home';
import User from './Components/User';
import Navbar from './Components/Navbar';
import View from './Components/View';
import{BrowserRouter as Router, Route,Routes}from "react-router-dom"

function App() {
  return (
   <div>
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={ <Home/>}/>
      <Route path='/view/:id' element={ <View/>}/>
      <Route path='/user' element={ <User/>}/>
      <Route path='/user/:id' element={ <User/>}/>
      <Route path='/delete/:id' element={ <Home/>}/>
    </Routes>
    </Router>
   </div>
  );
}

export default App;
