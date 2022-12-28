import React from 'react'
import {NavLink}from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav>
        <input type="checkbox" id="check"/>          
        <label htmlFor="check" className='checkbtn'>
        <i className="fa-solid fa-bars"></i>
        </label>
        <label className='nav-logo'>Crud App</label>
        <ul>
            <li><NavLink className="navLink active" to="/">Home</NavLink></li>
            <li><NavLink className="navLink" to="/user">User</NavLink></li>
            <li><NavLink className="navLink" to="/">Service</NavLink></li>
            <li><NavLink className="navLink" to="/">About</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar