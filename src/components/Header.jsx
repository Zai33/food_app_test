import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/style";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations";
import { MdLogout, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";

const Header = () => {
  const user = useSelector((state) => state.user);
  let avatar = require("../assets/Avatar/avatar.png");
  const firebaseAuth = getAuth(app);
  const navagite = useNavigate();
  const dispatch = useDispatch();

  const [isMenu, setIsMenu] = useState(false);

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
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-8 md:px-20 py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 shadow-md shadow-indigo-300">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img
          src={require("../assets/images/logo.png")}
          alt=""
          className="w-12"
        />
        <p className="font-semibold text-xl">City</p>
      </NavLink>
      {/* Nab bar */}
      <nav className="flex items-center justify-center gap-8">
        {/* nav link */}
        <ul className="hidden md:flex items-center justify-center gap-5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/menu"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Menu
          </NavLink>
          <NavLink
            to={"/services"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Services
          </NavLink>
          <NavLink
            to={"/aboutus"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            About Us
          </NavLink>
        </ul>
        {/* add to card  */}
        <motion.div {...buttonClick} className="relative cursor-pointer">
          <MdShoppingCart className="text-2xl text-textColor" />
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-3 -right-2">
            <p className="text-base font-semibold text-primary">2</p>
          </div>
        </motion.div>
        {/* login button */}
        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsMenu(true)}
            >
              <div className="w-8 h-8 rounded-full cursor-pointer shadow-md overflow-hidden bg-green-200 flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>
              {isMenu && (
                <motion.div
                  onMouseLeave={() => setIsMenu(false)}
                  {...slideTop}
                  className="px-6 py-4 w-40 bg-transparent backdrop-blur-md rounded-md shadow-md shadow-purple-600 absolute top-10 -right-10 flex flex-col gap-3"
                >
                  <Link
                    className="hover:text-red-500 text-textColor"
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="hover:text-red-500 text-textColor"
                    to={"/profile"}
                  >
                    Profile
                  </Link>
                  <Link
                    className="hover:text-red-500 text-textColor"
                    to={"/users-orders"}
                  >
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center rounded-md shadow-purple-600 shadow-md px-3 py-2 bg-gray-200 hover:bg-gray-400 gap-2"
                  >
                    <MdLogout className="text2xl text-textColor group-hover:text-headingColor" />
                    <p className="text2xl text-textColor group-hover:text-headingColor">
                      Logout
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md shadow-purple-600 bg-gradient-to-r from-blue-700 to-cyan-600"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
