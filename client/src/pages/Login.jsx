import React, { useState } from 'react';
import { Input } from 'antd';
import { AntDesignOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import Nav from '../components/Nav';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      // Check if the response is not OK (e.g., status code 400)
      if (!response.ok) {
        const errorData = await response.json(); // Get the error response data
        setError(errorData.error || 'Login failed. Please try again.');
        return; // Stop further execution
      }

      const data = await response.json();
      console.log(data); // Handle successful login
      setSuccess('Login successful!'); // You can set success message or navigate to another page
    } catch (error) {
      setError('Network error. Please check your connection.');
      console.error(error);
    }
  };

  return (
    <div className='h-screen relative w-full flex flex-col justify-center items-center p-4'>
      <Nav />
      <div className='w-full md:w-[25%] font-[Urbanthin] flex flex-col gap-4 rounded-md bg-slate-100 p-4 md:p-10'>
        <h1 className='text-3xl font-[Urban] mb-2 text-center'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col '>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='mb-4'
            size="large"
            placeholder="Enter your Email"
            type='text'
            prefix={<UserOutlined />}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='mb-1'
            size="large"
            placeholder="Enter your Password"
            type='password'
            prefix={<LockOutlined />}
          />
          <p className='mb-4 text-end text-sm text-gray-700 font-normal'>
            <NavLink to='/forgotpassword'>Forgot Password</NavLink>
          </p>
          <button className='w-full rounded-md px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white' type="submit">
            Submit
          </button>
        </form>
        <p className='text-center text-md text-gray-700 font-normal'>
          Don't have an account, <NavLink className='text-blue-500' to="/register">Create One</NavLink>
        </p>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {success && <p className='text-green-500 text-center'>{success}</p>}
      </div>
    </div>
  );
};

export default Login;
