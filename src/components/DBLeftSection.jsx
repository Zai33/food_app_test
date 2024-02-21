import React from "react";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/style";

const DBLeftSection = () => {
  return (
    <div className="h-full py-6 flex flex-col bg-yellow-50 backdrop-blur-md shadow-md shadow-cyan-400  min-w-[230px] max-w-[300px] gap-3">
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img
          src={require("../assets/images/logo.png")}
          alt=""
          className="w-12"
        />
        <p className="font-semibold text-xl">City</p>
      </NavLink>
      <hr />
      {/* menu list */}
      <ul className="flex flex-col items-start">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-cyan-500`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-cyan-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-cyan-500`
              : isNotActiveStyles
          }
        >
          Items
        </NavLink>
        <NavLink
          to={"/dashboard/addnewitems"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-cyan-500`
              : isNotActiveStyles
          }
        >
          Add New Itms
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-cyan-500`
              : isNotActiveStyles
          }
        >
          Users
        </NavLink>
      </ul>
      {/* button division */}
      <div className="w-full flex items-center justify-center h-[230px] mt-auto px-2">
        <div className="w-full h-full rounded-md flex flex-col items-center justify-center bg-sky-400 gap-3 px-2">
          <div className="w-12 h-12 border bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-2xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-700 text-center">
            Having troble in city. Please contact us for more questions.
          </p>
          <p className="rounded-full px-4 py-2 bg-primary text-red-500 cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
