import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdLogout, MdSearch } from "react-icons/md";
import { BsFillBellFill, BsToggles2 } from "react-icons/bs";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";

const DBHeader = () => {
  const user = useSelector((state) => state.user);
  let avatar = require("../assets/Avatar/avatar.png");
  const firebaseAuth = getAuth(app);
  const navagite = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navagite("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-between w-full gap-4">
      {/* heading left */}
      <div className="flex flex-col px-4 gap-2">
        <p className="text-2xl text-headingColor">Welcome to City..</p>
        <p className="text-sm text-gray-500">
          {user?.name && (
            <span className="text-sm text-red-400 rounded-full shadow-md shadow-cyan-400 px-4 py-1 cursor-pointer">{`Hi..${user?.name}...!`}</span>
          )}
        </p>
      </div>
      {/* heading right */}
      <div className="flex items-center justify-center gap-3">
        {/* search bar */}
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-sky-400 rounded-md shadow-md backdrop-blur-md w-[400px]">
          <MdSearch className="text-gray-600 text-2xl" />
          <input
            type="text"
            placeholder="Search here..."
            className="outline-none w-[300px] bg-primary text-sm font-semibold text-textColor rounded-md px-4 py-1"
          />
          <BsToggles2 className="text-gray-600 text-2xl" />
        </div>
        <motion.div
          {...buttonClick}
          className="w-10 h-11 rounded-md cursor-pointer backdrop-blur-md shadow-md flex items-center justify-center bg-sky-400"
        >
          <BsFillBellFill className="text-gray-600 text-xl" />
        </motion.div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-11 rounded-md shadow-md cursor-pointer overflow-hidden bg-sky-400">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.picture ? user?.picture : avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            {...buttonClick}
            onClick={signOut}
            className="w-10 h-11 rounded-md cursor-pointer backdrop-blur-md shadow-md flex items-center justify-center bg-sky-400"
          >
            <MdLogout className="text-gray-600 text-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
