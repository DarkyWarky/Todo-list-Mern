import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { Navbar } from './Components/Navbar'
import Lists from './Components/Lists'
import Login from './Components/Login'


const App = () => {

  return (
    <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Lists/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
    </Router>
  )
}

export default App