import React, { useEffect, useState } from "react";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../Api";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertInfo,
  alertWarining,
} from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSingUp] = useState(false);
  const [passwrod, setPasswrod] = useState("");
  const [comfirm_password, setComfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              //console.log(data);
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmail = async () => {
    if (userEmail === "" || passwrod === "" || comfirm_password === "") {
      // alert message
      dispatch(alertInfo("Requierd fields should not be empty!"));
      console.log("fill");
    } else if (passwrod === comfirm_password) {
      setUserEmail("");
      setPasswrod("");
      setComfirm_password("");
      await createUserWithEmailAndPassword(
        firebaseAuth,
        userEmail,
        passwrod
      ).then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                //console.log(data);
                dispatch(setUserDetails(data));
              });
              navigate("/", { replace: true });
            });
          }
        });
      });
    } else {
      // allert message
      dispatch(alertWarining("Passwords doesn't match!"));
      console.log("not equal");
    }
  };

  const loginWithEmail = async () => {
    if (userEmail !== "" && passwrod !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, passwrod).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  // console.log(data);
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      // alert message
      dispatch(
        alertWarining("Email or password doesn't match. Please fill correctly!")
      );
      console.log("please fill all");
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* bg image */}
      <img
        src={require("../assets/images/loginBg.jpg")}
        alt=""
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      {/* content box */}
      <div className="flex flex-col items-center bg-opacity-30 bg-gray-200 w-[80%] md:w-508 h-full z-10 backdrop-blur-sm p-4 px-6 py-8 gap-3">
        {/* top logo section */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img
            src={require("../assets/images/logo.png")}
            alt=""
            className="w-8"
          />
          <p className="font-semibold text-2xl text-headingColor">City</p>
        </div>
        <p className="text-3xl font-semibold text-headingColor">welcome Back</p>
        <p className="text-xl text-textColor -mt-2">
          {isSignUp ? "Sign Up " : "Login In "}with follwoing..
        </p>
        {/* input section */}
        <div className="w-full flex flex-col items-center justify-center gap-4 px-4 md:px-4 py-12">
          <LoginInput
            placeholder={"Email Here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inpuState={userEmail}
            inpuStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />
          <LoginInput
            placeholder={"Password Here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inpuState={passwrod}
            inpuStateFunc={setPasswrod}
            type="password"
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeholder={"Comfirm Password"}
              icon={<FaLock className="text-xl text-textColor" />}
              inpuState={comfirm_password}
              inpuStateFunc={setComfirm_password}
              type="password"
              isSignUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p>
              Doesn't have an accoutn:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-600 underline bg-transparent cursor-pointer"
                onClick={() => setIsSingUp(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an accoutn:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-600 underline bg-transparent cursor-pointer"
                onClick={() => setIsSingUp(false)}
              >
                Sign-In here
              </motion.button>
            </p>
          )}
          {/* button section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 bg-red-500 rounded-md text-xl cursor-pointer text-white capitalize hover:bg-red-600 transition-all duration-150"
              onClick={signUpWithEmail}
            >
              SignUp
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 bg-red-500 rounded-md text-xl cursor-pointer text-white capitalize hover:bg-red-600 transition-all duration-150"
              onClick={loginWithEmail}
            >
              login
            </motion.button>
          )}
        </div>
        {/* made line */}
        <div className="flex items-center justify-between gap-16 -mt-3">
          <div className="w-24 h-[1px] rounded-md bg-cyan-500"></div>
          <p className="text-xl text-gray-700">OR</p>
          <div className="w-24 h-[1px] rounded-md bg-cyan-500"></div>
        </div>
        {/* google signin */}
        <motion.button
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 backdrop-blur-mdcursor-pointer rounded-3xl gap-3 bg-slate-100"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-textColor">
            Sign In with Google.
          </p>
        </motion.button>
      </div>
    </div>
  );
};

export default Login;
