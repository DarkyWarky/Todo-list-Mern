import React from 'react'
import { Link} from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className='h-[10vh] bg-gray-100'>
        <ul className='flex justify-around align-middle' >
            <li className='font-bold p-5 size-5 text-gray-600 text-2xl transition duration-300 delay-150 hover:text-red-500 cursor-pointer '>
            <Link to='/'>Home</Link></li>
            <li className='font-bold p-5 size-5 text-gray-600 text-2xl transition duration-300 delay-150 hover:text-red-500 cursor-pointer '>
            <Link to='/Login'>Login</Link></li>
            <li className='font-bold p-5 size-5 text-gray-600 text-2xl transition duration-300 delay-150 hover:text-red-500 cursor-pointer '>
            <Link to='/resources'>Resources</Link></li>
            <li className='font-bold p-5 size-5 text-gray-600 text-2xl transition duration-300 delay-150 hover:text-red-500 cursor-pointer '>
            <Link to='/feedback'>Feedback</Link></li>
        </ul>
    </nav>
  )
}
