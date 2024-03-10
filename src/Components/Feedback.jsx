import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const Feedback = () => {
    const [message , setMessage]= useState('')
    useEffect(()=>{
        axios.defaults.withCredentials =true
        axios.get('http://localhost:3001/loginapi/feedback')
        .then((res)=>{
            if(res.data.valid ===true){
                setMessage('Logged in')
            }
            else{
                setMessage('Not-Logged in')
            }
        })
    }, [])
  return (
    <div>{message}</div>
  )
}

export default Feedback