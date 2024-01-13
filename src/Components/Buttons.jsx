import React from 'react'

export const Buttons = ({onAdd}) => {
  return (
    <div className='flex justify-around bg-blue-500 align-middle '>
        <button onClick={onAdd} className=' bg-red-500 p-3 text-3xl rounded-xl font-bold'>ADD</button>
    </div>
  )
}
