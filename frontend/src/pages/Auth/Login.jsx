import React from 'react'
import { useState , useEffect } from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useLoginMutation} from '../../redux/api/usersApiSlice'
import {setCredientials} from '../../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

function Login() {
  const [email,setemail]=useState('')
  const[password,setpassword]=useState('')

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [login,{isLoading}]=useLoginMutation()

  const {userinfo}=useSElector(state => state.auth)

  const {serach}=useLocation()
  const sp= new URLSearchParams(serach)
  const redirect=sp.get('redirect') || '/'


  useEffect(()=>{
    if(userinfo){
      navigate(redirect)
    }
  },[navigate,redirect,userinfo])

  return (
    <div>
      <section className='pl-[10rem] flex flex-wrap'>
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className='text-2xl font-semibold mb-4 text-black'>sign in</h1>
        </div>
      </section>
      
    </div>
  )
}

export default Login
