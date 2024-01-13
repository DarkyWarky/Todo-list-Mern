import React from 'react'
import './component.css'
import { Link, BrowserRouter as Router } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className='h-[10vh] bg-[#334155]'>
        <ul className='flex justify-around align-middle' >
          <Router basename={'/'}>
            <li className='font-bold p-5 size-5 text-white text-3xl transition duration-300 delay-150 underline-animation hover:text-red-500 cursor-pointer '><Link to='/'>Home</Link></li>
            <li className='font-bold p-5 size-5 text-white text-3xl transition duration-300 delay-150 underline-animation hover:text-red-500 cursor-pointer '><Link to='/about'>About</Link></li>
            <li className='font-bold p-5 size-5 text-white text-3xl transition duration-300 delay-150 underline-animation hover:text-red-500 cursor-pointer '><Link to='/resources'>Resources</Link></li>
            <li className='font-bold p-5 size-5 text-white text-3xl transition duration-300 delay-150 underline-animation hover:text-red-500 cursor-pointer '><Link to='/feedback'>Feedback</Link></li>
            </Router>
        </ul>
    </nav>
  )
}
