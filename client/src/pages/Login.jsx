import React, { useState } from 'react';
import { Input } from 'antd';
import { AntDesignOutlined, EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import Nav from '../components/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess } from '../redux/userSlice';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      
      if (!response.ok) {
        const errorData = await response.json(); 
        console.log(response)
        dispatch(loginFailure(errorData.error))
        return; // Stop further execution
      }

      const data = await response.json();

      
      if (data.user) {
        dispatch(loginSuccess(data.user));
        
        navigate('/verify');
      } else {
        dispatch(loginFailure('Invalid response from server'));
      }
    } catch (error) {
      dispatch(loginFailure(error.message))
      console.log(error);
    }
  };

  return (
    <div className='h-screen relative w-full flex flex-col justify-center items-center p-4'>
      <Nav />
      <div className='w-full md:w-[25%] font-[Urbanthin] flex flex-col gap-4  rounded-md bg-slate-100 p-4 md:p-10'>
        <h1 className='text-3xl font-[Urban] mb-2 text-center'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col '>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='mb-2'
            size="large"
            placeholder="Enter your Email"
            type='text'
            prefix={<UserOutlined />}
          />
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='mb-4'
            size="large"
            placeholder="Enter your Password"
            type='password'
            prefix={<LockOutlined />}
            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />
          
          <button className='w-full rounded-md px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white' type="submit">
            Submit
          </button>
        </form>
        <p className='text-center text-md text-gray-700 font-normal'>
          Don't have an account, <NavLink className='text-blue-500' to="/register">Create One</NavLink>
        </p>
        {error && <p className='text-red-500 text-center'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
