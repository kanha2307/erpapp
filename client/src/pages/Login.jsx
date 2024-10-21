import React, { useState } from 'react'
import { Button, Input } from 'antd';
import {AntDesignOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import Nav from '../components/Nav';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const [email, setemail] = useState("")
  const [password,setpassword] = useState("")
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const res = await axios.post(`http://localhost:3000/api/login`,{email,password},{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

  }
  

  return (
    <div className='h-screen relative w-full  flex flex-col justify-center items-center p-4 '>
      <Nav className=''/>
      <div className='w-full md:w-[25%] font-[Urbanthin] flex flex-col gap-4 rounded-md bg-slate-100 p-4 md:p-10 '>
          <h1 className='text-3xl font-[Urban] mb-2 text-center'>Login</h1>
          <form onSubmit={handleSubmit} className='flex flex-col '>

          <Input className='mb-4' size="large" placeholder="Enter your Email" type='text' prefix={<UserOutlined/>} />
          <Input className='mb-1' size="large" placeholder="Enter your Password" type='password' prefix={<LockOutlined />} />
          <p className='mb-4 text-end text-sm text-gray-700 font-normal'><NavLink to='/forgotpassword'>Forgot Password</NavLink></p>
          <Button  type="default" size="large" icon={<AntDesignOutlined />}>Submit</Button>
          </form>
          <p className='text-center text-md text-gray-700 font-normal'>Don't have an account, <NavLink className='text-blue-500' to="/register">Create One</NavLink></p>
      </div>
     
    </div>
  )
}

export default Login
