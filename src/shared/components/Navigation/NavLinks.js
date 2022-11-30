import React from 'react'
import {NavLink} from 'react-router-dom';

import './NavLinks.css'

const NavLinks = () => {
  return (
   <ul className='nav-links'>
    <li>
        <NavLink to='/about'>About</NavLink>
    </li>
    <li>
        <NavLink to='/contact'>Contact</NavLink>
    </li>
    <li>
        <NavLink to='/resources'>Resources</NavLink>
    </li>
    <li>
        <NavLink to='/pages/new'>Add new page</NavLink>
    </li>
    <li>
        <NavLink to='/register'>Register</NavLink>
    </li>
   </ul>
  )
}

export default NavLinks