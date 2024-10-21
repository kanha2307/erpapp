import React from 'react'

import Nav from '../components/Nav'
import { Button, Input } from 'antd'
import { AntDesignOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

const Register = () => {
  return (
    <div className='h-screen relative w-full  flex flex-col justify-center items-center p-4 '>
    <Nav className=''/>
    <div className='w-full md:w-[25%] font-[Urbanthin] flex flex-col gap-4 rounded-md bg-slate-100 p-4 md:p-10 '>
        <h1 className='text-3xl font-[Urban] mb-2 text-center'>Register</h1>
        <form action="" className='flex flex-col '>

        <Input className='mb-4' size="large" placeholder="Enter your Email" type='text' prefix={<UserOutlined/>} />
        <Input className='mb-4' size="large" placeholder="Enter your Password" type='password' prefix={<LockOutlined />} />

        <Button  type="default" size="large" icon={<AntDesignOutlined />}>Submit</Button>
        </form>
        <p className='text-center text-md text-gray-700 font-normal'>Already have an account, <NavLink className='text-blue-500' to="/login">Sign in</NavLink></p>
    </div>
   
  </div>
  )
}

export default Register
