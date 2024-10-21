import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
