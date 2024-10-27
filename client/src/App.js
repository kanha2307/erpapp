import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import AdminDashboard from './pages/AdminDashboard'
import ShopDashboard from './pages/ShopDashboard'
import OTPverify from './pages/OTPverify'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {
  return (
    <div className='font-[Urban]'>

    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/verify" element={<OTPverify/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" 
        element={
          // <ProtectedRoutes userRole='user'>
            <Dashboard/>
          /* </ProtectedRoutes> */
        }/>
        <Route path="/shopOwner" element={
          // <ProtectedRoutes userRole='shopOwner'>
            <ShopDashboard/>
          // </ProtectedRoutes>
        }/>
        <Route path="/admin" element={
          // <ProtectedRoutes userRole='admin'>
            <AdminDashboard/>
          // </ProtectedRoutes>
        }/>
      </Routes>
      
    </BrowserRouter> 
    </div>
  )
}

export default App
