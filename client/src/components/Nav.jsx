import React from 'react'
import logo from '../assets/images/logo-no-background.png'

const Nav = () => {
  return (
    <div className=' absolute top-0 px-5 md:px-10 py-2 w-full  bg-[#1E232C]'>
      <img className='h-10' src={logo}/>
    </div>
  )
}

export default Nav
