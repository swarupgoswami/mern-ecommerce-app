import React from 'react'
import { Navigate,Outlet } from 'react-router'
import { useSelector } from 'react-redux'

function AdminRoute() {
    const {userinfo}=useSelector((state) => state.auth);

  return  userinfo && userinfo.isAdmin ? (
    <Outlet/>
  ):(
    <Navigate to='/login' replace/>

  );
  
};

export default AdminRoute
