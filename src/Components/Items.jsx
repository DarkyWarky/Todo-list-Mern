import React from 'react'

const Items = ({task,onDelete}) => {
  return (
    <div className='bg-red-300 p-4 h-32 ml-10 mr-10 rounded-3xl flex justify-between items-center min-h-0'>
        <div className="textbox">{task}</div>
        <button className="delete bg-green-300 p-3 rounded-3xl" onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Items