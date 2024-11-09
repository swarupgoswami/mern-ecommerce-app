import { useState } from "react"
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import {FaHeart} from "react-icons/fa"
import{Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Navigation.css";
import {useSelector,useDispatch} from "react-redux"
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";


const Navigation = () => {

  const {userInfo} = useSelector(state => state.auth)
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

  const [logoutApiCall]=useLoginMutation()

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


        </button>
      </div>




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
    </div>
  </>

  )
}

export default Navigation
