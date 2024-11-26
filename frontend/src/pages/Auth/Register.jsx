import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import Loader from '../../components/loader'
import { useDispatch,useSelector } from 'react-redux'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice' 




function Register() {
    const[username,setusername]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('')
    const[confirmpassword,setconfirmpassword]=useState('')

    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    
    const[register,{isLoading}]=useRegisterMutation()

    const {userinfo}=useSelector( state=> state.auth)

    const search=useLocation();
    const sp=new URLSearchParams(search);
    const redirect=sp.get('redirect') || '/'

    useEffect(()=>{
        if(userinfo){
            navigate(redirect);
        }

    },[navigate,userinfo,redirect])


const submitHandler= async (e)=>{
    e.preventDefault()

    if(password != confirmpassword){
        toast.error('passwords do not match')
    }else{
        try {
            const res= await register({username,password,email}).unwrap()
            dispatch(setCredientials({...res}))
            navigate(redirect);
            toast.success('user succesfully registered')


            
        } catch (error) {
            console.log(error);
            toast.error(error.data.message)
        }
    }
}

  return (
    <section className='pl-[10rem] flex flex-wrap'>
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl font-semibold mb-4 text-white">Register</h1>
            <form onSubmit={submitHandler} className='container w-[40rem]'>
                <div className="my-[2rem]">
                    <label htmlFor='name' className='block text-sm font-medium text-white'>name</label>
                    <input type='username' id='username' className='text-white bg-[#3B3B3B] mt-1 p-2 border rounded' placeholder='enter name' value={username} onChange={(e)=>{
                        setusername(e.target.value)
                    }}></input>
                </div>

                <div className="my-[2rem]">
                    <label htmlFor='password' className='block text-sm font-medium text-white'>password</label>
                    <input type='password' id='password' className='text-white bg-[#3B3B3B] mt-1 p-2 border rounded' placeholder='enter password' value={password} onChange={(e)=>{
                        setpassword(e.target.value)
                    }}></input>
                </div>


                <div className="my-[2rem]">
                    <label htmlFor='name' className='block text-sm font-medium text-white'>email</label>
                    <input type='email' id='email' className='text-white bg-[#3B3B3B] mt-1 p-2 border rounded' placeholder='enter email' value={email} onChange={(e)=>{
                        setemail(e.target.value)
                    }}></input>
                </div>


                <div className="my-[2rem]">
                    <label htmlFor='name' className='block text-sm font-medium text-white'>confirmpassword</label>
                    <input type='password' id='confirmpassword' className='text-white bg-[#3B3B3B] mt-1 p-2 border rounded' placeholder='enter confirm passsword' value={confirmpassword} onChange={(e)=>{
                        setconfirmpassword(e.target.value)
                    }}></input>
                </div>
                <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointed my-[1rem]'>{isLoading?"registering..": "register"}</button>
                {isLoading && <Loader/>}
            </form>
            <div className="mt-4">
                <p className='text-white '>
                    already have an account?{''}
                    <Link to={redirect ? `/login?redirect=${redirect}`:'/login'} className='bg-pink-500 hover:underline'>Login
                    </Link>
                </p>

            </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
      
    </section>
  )
}

export default Register
