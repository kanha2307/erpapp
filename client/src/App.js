import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/user/Dashboard'

import AdminDashboard from './pages/admin/AdminDashboard'
import ShopDashboard from './pages/shop/ShopDashboard'
import OTPverify from './pages/OTPverify'
import ProtectedRoutes from './components/ProtectedRoutes'
import ProductDetail from './components/ProductDetail'

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

        <Route 
            path="/product/:productId" 
            element={
              // <ProtectedRoutes>
                <ProductDetail />
              // </ProtectedRoutes>
            }
          />
      </Routes>
      
    </BrowserRouter> 
    </div>
  )
}

export default App
