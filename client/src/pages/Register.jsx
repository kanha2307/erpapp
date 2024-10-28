import React, { useState } from 'react';
import { Button, Input, Select, message } from 'antd';
import { AntDesignOutlined, EyeInvisibleOutlined, EyeOutlined, LockOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCountryChange = (value) => {
    setCountryCode(value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeRole = (value) => {
    setRole(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${countryCode}${phoneNumber}`; // Concatenate country code with phone number

    const userData = {
      name,
      email,
      phone: fullPhoneNumber,
      password,
      role,
    };

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send JSON data
      });

      const data = await response.json();
      if (response.ok) {
        // Dispatch success action to Redux store
        dispatch(loginSuccess(data.user));
  
        
        navigate('/verify'); // Navigate to the desired path
      } else {
        message.error(data.error);
      }
    } catch (error) {
      console.error(error);
      message.error('Registration failed!');
    }
  };

  return (
    <div className='h-screen relative w-full flex flex-col justify-center items-center p-4'>
      <div className='w-full md:w-[25%] flex flex-col gap-4 rounded-md bg-slate-100 p-4 md:p-10'>
        <h1 className='text-3xl mb-2 text-center'>Register your Account</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <Input
            className='mb-4'
            size="large"
            placeholder="Enter your Name"
            type='text'
            prefix={<UserOutlined />}
            value={name}
            onChange={handleNameChange} // Update name state
          />
          <Input
            className='mb-4'
            size="large"
            placeholder="Enter your Email"
            type='text'
            prefix={<MessageOutlined />}
            value={email}
            onChange={handleEmailChange} // Update email state
          />

          <Input
            size='large'
            className='mb-4'
            addonBefore={
              <Select defaultValue={countryCode} onChange={handleCountryChange}>
                <Select.Option value="+1">+1</Select.Option>
                <Select.Option value="+91">+91</Select.Option>
                <Select.Option value="+44">+44</Select.Option>
              </Select>
            }
            placeholder="Enter mobile number"
            value={phoneNumber}
            onChange={handlePhoneChange}
          />

          <Select
            className='mb-4'
            size='large'
            placeholder="Select a role"
            onChange={handleChangeRole}
            value={role}
          >
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="shopOwner">Shop Owner</Select.Option>
          </Select>

          <Input.Password
            placeholder="Enter your password"
            size='large'
            className='mb-4'
            value={password}
            prefix={<LockOutlined />}
            onChange={handlePasswordChange}
            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />

          <Button type="default" size="large" icon={<AntDesignOutlined />} htmlType="submit">Submit</Button>
        </form>

        <p className='text-center text-md text-gray-700'>
          Already have an account? <NavLink className='text-blue-500' to="/">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
