import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/setting 1.png";
import { TbUserSquareRounded, TbSquareKey } from "react-icons/tb";
import { TiShoppingBag } from "react-icons/ti";
import { AiOutlineSetting, AiOutlineSisternode } from "react-icons/ai";
import { IoIosArrowForward, } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openMenu, toggleMenu } from "../redux/menuSlice";
import { IoCloseSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";




const SideMenu = () => {
  

 
  const isOpen = useSelector((state)=>state.menu?.isOpen)
  const dispatch = useDispatch()
  const [screenSize, setscreenSize] = useState()
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()

  
  useEffect(() => {
    const handleResize = ()=>setscreenSize(window.innerWidth)
    window.addEventListener('resize',handleResize)
    handleResize()
    return()=> window.removeEventListener('resize',handleResize)
  }, [])

  useEffect(()=>{
    if(screenSize<=900){
      dispatch(closeMenu())

    }
    else{
      dispatch(openMenu())
    }

  },[screenSize])

  const handleLogout = ()=>{
    localStorage.removeItem()
    navigate('/')
    
  }
  
  const userMenu = [
    { icon: <TbSquareKey />, name: "Dashboard", dest: "/user" },
    { icon: <TiShoppingBag />, name: "Wish List", dest: "/user/wishlist" },
    { icon: <AiOutlineSisternode />, name: "Orders", dest: "/user/orders" },

];

const adminMenu = [
    { icon: <TbSquareKey />, name: "Dashboard", dest: "/admin/dashboard" },
    { icon: <TiShoppingBag />, name: "Manage Products", dest: "/admin/products" },
    { icon: <AiOutlineSisternode />, name: "Manage Orders", dest: "/admin/orders" },
    { icon: <TbUserSquareRounded />, name: "Manage Users", dest: "/admin/users" },
    { icon: <AiOutlineSetting />, name: "Settings", dest: "/admin/settings" }, // Settings option for admin
];

const shopOwnerMenu = [
    { icon: <TbSquareKey />, name: "Dashboard", dest: "/shopOwner/dashboard" },
    { icon: <TiShoppingBag />, name: "My Products", dest: "/shopOwner/products" },
    { icon: <AiOutlineSisternode />, name: "Orders", dest: "/shopOwner/orders" },
    { icon: <TbUserSquareRounded />, name: "Customers", dest: "/shopOwner/customers" },
];

  const menu = user.role==='admin' ? adminMenu : user.role === 'shopOwner' ? shopOwnerMenu : userMenu
  return (
    <div className={` transition-all ease-in-out duration-200 z-50 ${isOpen ? 'w-1/5' : 'w-0'} ${screenSize<900 && "w-full absolute "}`}>
      <button className=" mt-6 ml-4 absolute z-40 " onClick={() => dispatch(toggleMenu())}>
          {isOpen?  < IoCloseSharp className="text-xl md:text-3xl"/> : <IoMenu className="text-xl md:text-3xl"/> }
        </button>
    
    <div className={` z-20  h-screen flex  flex-col p-5 bg-[#FFFFFF] ${isOpen ? "w-full" : "hidden"}  `}>
      
      <div className="text-2xl flex items-center justify-end gap-2 font-bold mb-6">
        <span className="flex items-center gap-2">
          <img className="" src={logo} />
        <h1 className="text-2xl">Dashboard</h1>
        </span>
        
      </div>
      <div className="sidedown h-full flex flex-col justify-between w-full ">
        <div className="flex  flex-col gap-2 w-full  items-start font-[Urbanthin] font-semibold text-[#9197B3] ">
          {menu.map((e) => (
            <div className="flex items-center  px-3 py-2 w-full rounded-md gap-2 ">
              <NavLink
                key={e.dest}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-4 p-3 w-full rounded-lg ${
                    isActive ? "bg-[#5932EA] text-white" : "hover:bg-gray-200"
                  }`
                }
                to={e.dest}
                end
              >
                <div className="flex gap-2 items-center">
                  <span className="text-2xl ">{e.icon}</span>
                  {e.name}
                </div>
                <span className="">
                  <IoIosArrowForward />
                </span>
              </NavLink>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
        {
          user.role === 'shopOwner' && <div className="w-full  flex flex-col gap-4 p-6 items-center bg-gradient-to-r from-[#EAABF0] to-[#4623E9] rounded-[20px] text-white ">
          <h1 className="text-md text-center leading-1">
            Upgrade to pro to get <br /> access all Features!
          </h1>
          <button className="bg-white text-[#4925E9] w-full rounded-full px-3 py-3 font-bold hover:bg-[#4925E9] hover:text-white">
            Get Pro Now!
          </button>
        </div>
        }
          
          <div className="w-full flex items-center justify-between py-3 rounded-[20px]  ">
            <div className="flex items-center gap-5">
              <div className="bg-[#4925E9] text-white rounded-full size-12 flex items-center justify-center  p-1"><h1 className="text-xl">{user.name[0].toUpperCase()}</h1></div>
              <div className="text-lg leading-1">
                <h1 className="text-md font-normal text-[#4a4949]">{user.name}</h1>
                <h1 className="text-sm text-[#757575]">{user.role}</h1>
              </div>

            </div>
            <div onClick={handleLogout}>
              <AiOutlineLogout className="text-2xl"/>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default SideMenu;
