import { useState } from "react"
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import {FaHeart} from "react-icons/fa"
import{Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Navigation.css";
import {useSelector,useDispatch} from "react-redux"
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";


const Navigation = () => {

  const {userinfo} = useSelector(state => state.auth)
  console.log(userinfo)
  const [dropDown, setdropDown]=useState(false);
  const [sideBar,setsideBar]=useState(false);

  
  const toggleDropdown=()=>{
    setdropDown(!dropDown);
    
  }
  const toggleSidebar=()=>{
    setsideBar(!sideBar);
    
  }
  const closedsidebar=()=>{
    setsideBar(false);
    
  }
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [logoutApiCall]=useLogoutMutation()

  const logOutHandler= async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error(error)
    }
  }

  return (
  <>
     <div style={{zIndex:999}} className={`${sideBar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:[15%] h-[100vh] fixed`}
         id="navigation-container"> 
      <div className="flex flex-col justify-center space-y-4">
        <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem] " size={26} style={{ color: 'white' }}/>
          <span className="hidden nav-item-name mt-[3rem]">Home</span>{" "}
        </Link>
        <Link to="/shopping" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem] " size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">shopping</span>{" "}
        </Link>
        <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShoppingCart className="mr-2 mt-[3rem] " size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">cart</span>{" "}
        </Link>
        <Link to="/favorite" className="flex items-center transition-transform transform hover:translate-x-2">
          <FaHeart className="mr-2 mt-[3rem] " size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">Home</span>{" "}
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center text-gray-8000 focus:outline-none">
          {userinfo? <span className="text-white">{userinfo.email}</span>:<></>}

          {userinfo && (
            <svg
            xmls="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 ${
              dropDown ? "transform rotate-180":""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            >
              <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth='2'
                 d={dropDown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />

            </svg>
          )}
        </button>


          {dropDown && userinfo && (
            <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userinfo.isAdmin?'-top-20':'-top-80'}`}>
              {userinfo.isAdmin && (
                <>
                 <li>
                 <Link to='/admin/dashboard' className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                 </li>


                 <li>
                 <Link to='/admin/dashboard' className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                 </li>

                 <li>
                 <Link to='/admin/productlist' className="block px-4 py-2 hover:bg-gray-100">Products</Link>
                 </li>

                 <li>
                 <Link to='/admin/orderlist' className="block px-4 py-2 hover:bg-gray-100">Order</Link> 
                 </li>


                 <li>
                 <Link to='/admin/userlist' className="block px-4 py-2 hover:bg-gray-100">user</Link> 
                 </li>


                
                   
                </>
              )}
               <li>
                 <Link to='/profile' className="block px-4 py-2 hover:bg-gray-500">profile</Link> 
                 </li>


                 <li>
                 <button className="block px-4 py-2 hover:bg-gray-500"
                 onClick={logOutHandler}>logout</button> 
                 </li>
            </ul>
          )}

      </div>



      {!userinfo && (
        <ul>
        <li>
          <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineLogin className="mr-2 mt-[3rem] " size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">login</span>{" "}
          </Link>

        </li>
        <li>
          <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineUserAdd className="mr-2 mt-[3rem] " size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">register</span>{" "}
          </Link>

        </li>

      </ul>
      )}
      
    </div>
  </>

  )
}

export default Navigation
