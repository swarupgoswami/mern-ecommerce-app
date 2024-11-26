import React from 'react'
import {Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'

function PrivateRoute() {
  const {userinfo}=useSelector(state=>state.auth);

  return userinfo? <Outlet/> :<Navigate to ="/login" replace />;
}

export default PrivateRoute
