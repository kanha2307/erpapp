import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/setting 1.png";
import key from "../assets/icon/key-square.png";
import user from "../assets/icon/user-square 1.png";
import product from "../assets/icon/3d-square 1.png";
import order from "../assets/icon/wallet-money 2.png";
import { TbUserSquareRounded, TbSquareKey } from "react-icons/tb";
import { TiShoppingBag } from "react-icons/ti";
import { AiOutlineSisternode } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
const SideMenu = () => {
    // const [isActive, setisActive] = useState("")
    // console.log(isActive)
  const menu = [
    {
      icon: <TbSquareKey />,
      name: "Dashboard",
      dest: "/shopOwner",
    },
    {
      icon: <TiShoppingBag />,
      name: "Products",
      dest: "/shopOwner/products",
    },
    {
      icon: <AiOutlineSisternode />,
      name: "Orders",
      dest: "/shopOwner/orders",
    },
    {
      icon: <TbUserSquareRounded />,
      name: "Customers",
      dest: "/shopOwner/users",
    },
  ];
  return (
    <div className="w-1/5 p-5 bg-[#FFFFFF] ">
      <div className="text-2xl flex items-center gap-2 font-bold mb-6">
        <img className="" src={logo} />
        <h1 className="text-2xl">Dashboard</h1>
      </div>
      <div className="sidedown w-full ">
        <div className="flex  flex-col gap-2 w-full  items-start font-[Urbanthin] font-semibold text-[#9197B3] ">
          {menu.map((e) => (
            <div className="flex items-center  px-3 py-2 w-full rounded-md gap-2 ">
              
              <NavLink
              key={e.dest}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-4 p-3 w-full rounded-lg ${
                    isActive ? "bg-[#5932EA]" : "hover:bg-gray-200"
                  }`
                }
                to={e.dest}
                
              >
                <div className="flex gap-2 items-center">

                <span>{e.icon}</span>
                {e.name}
                </div>
              <span className="">
                <IoIosArrowForward />
              </span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
