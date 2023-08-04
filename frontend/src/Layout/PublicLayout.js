import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
export default function PublicLayout() {
    const token=localStorage.getItem("token")
   if(token)
     return <Navigate to='/chat'/>
   return <Outlet/>
    
}

