import React from 'react'
import { HiMenu } from "react-icons/hi";
import img from '../images/5dd49958-4419-4dd2-8634-3fb242963da6.jpg'
const Navbar = () => {
  return (
    <div className='w-full h-screen flex justify-between items-center '>
       {/* <HiMenu className=' text-2xl'/> */}
       <div className='w-[22vw] h-screen bg-[#8447ff]'>
          <img src={img}/>
       </div>
    </div>
  )
}

export default Navbar
