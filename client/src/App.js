import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/user/Dashboard'

import AdminDashboard from './pages/admin/AdminDashboard'
import OTPverify from './pages/OTPverify'
import ProtectedRoutes from './components/ProtectedRoutes'
import ProductDetail from './components/ProductDetail'
import Cart from './pages/user/WishList'
import Wishlist from './pages/user/WishList'
import PaymentPage from './components/PaymentPage'
import MyProduct from './pages/shop/MyProduct'
import ShopDashboard from './pages/shop/ShopDashboard'

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
        <Route 
            path="/user/wishlist" 
            element={
              // <ProtectedRoutes>
                <Wishlist/>
              // </ProtectedRoutes>
            }
          />
        {/* <Route 
            path="/checkout" 
            element={
              // <ProtectedRoutes>
                <PaymentPage/>
              // </ProtectedRoutes>
            }
          /> */}



        <Route 
            path="/shopOwner/products" 
            element={
              // <ProtectedRoutes>
                <MyProduct/>
              // </ProtectedRoutes>
            }
          />
      </Routes>
      
    </BrowserRouter> 
    </div>
  )
}

export default App
