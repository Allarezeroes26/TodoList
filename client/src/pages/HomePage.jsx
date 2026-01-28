import React from 'react'
import { userAuth } from '../stores/authStore'
import avatar from '../assets/avatar.png'


const HomePage = () => {

  const { authUser } = userAuth()

  return (
    <div className='flex flex-col font-paragraph justify-between items-center'>
      <div className="flex py-10 flex-row items-center justify-between w-full px-30">
        <div className='flex-row flex gap-5 items-center sm:flex-col'>
          <img alt='Profile Picture' className='size-12 rounded-full' src={authUser.profilePic ? authUser.profilePic : avatar} />
          <div className='flex flex-col'>
            <h1 className='font-bold text-xl'>Hi, {authUser.name} 👋</h1>
            <p className='font-light text-sm tracking-tight'>What do you wanna do today?</p>
          </div>
        </div>
        <div>
          <button className='btn'>Add Task</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
