
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children,userRole}) => {
  const role = useSelector((state)=>state.user?.user.role)
  console.log(userRole);
  
    if(!role || role !== userRole){
        return <Navigate to='/'/>
    }
    return children
}

export default ProtectedRoutes
