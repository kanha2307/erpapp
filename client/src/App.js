import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import AdminDashboard from './pages/AdminDashboard'
import ShopDashboard from './pages/ShopDashboard'
import OTPverify from './pages/OTPverify'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/verify" element={<OTPverify/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<Dashboard/>}/>
        <Route path="/shopOwner" element={<ShopDashboard/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
      
    </BrowserRouter> 
  )
}

export default App
