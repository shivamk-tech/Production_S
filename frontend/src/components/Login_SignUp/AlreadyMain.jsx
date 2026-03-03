import React from 'react'
import LoginNav from './LoginNav'
import LoginForm from './LoginForm'
import AlreadyLog from './AlreadyLog'

const AlreadyMain = () => {
  return (
    <div className='h-screen w-full overflow-hidden'>
      <LoginNav/>
      <AlreadyLog/>
    </div>
  )
}

export default AlreadyMain
