import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  FaFacebook,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { grey } from "@mui/material/colors";

function StudentSignup(props) {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const tenth = useRef();
  const twelth = useRef();
  const course = useRef();
  const img = useRef();
  const [isloading, setIsloading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setIsloading(true);
    console.log(course.current.value);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      await setDoc(doc(db, "students", res.user.uid), {
        uid: res.user.uid,
        studentname: name.current.value,
        email: email.current.value,
        highschool: tenth.current.value,
        twelth: twelth.current.value,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEidraPhmCDVkOsdFzkhtvO8TXj2_1ukhLZw&usqp=CAU",
        password: password.current.value,
        timestamp: serverTimestamp(),
        course: course.current.value,
        status: "Pending",
        bool: -1,
        quiz: 0,
        result: -1,
        interview: -1,
        paid: "unpaid",
      }).then(
        await setDoc(doc(db, "userChats", res.user.uid), {}),
        setIsloading(false),
        navigate("/")
      );
    } catch (err) {
      console.log(err);
    }
  }
  const [usernameExist, setUsernameExist] = useState(false);
  const options = [
    {
      label: "------Select your Course------",
      value: "null",
    },
    {
      label: "B-Tech",
      value: "be",
    },
    {
      label: "MBA",
      value: "mba",
    },
    {
      label: "MCA",
      value: "mca",
    },
    {
      label: "LAW",
      value: "law",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center  py-2">
      <main className="flex flex-col items-center  w-full  px-20 text-center">
        <div className="bg-neutral-500 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Header Text */}
          <div className="w-3/5 p-5 ">
            <div className="flex text-left font-bold">
              <span className="text-2xl">Step-Up</span>
              <span className="text-1xl font-bold text-yellow-500">+</span>
            </div>
            <div className="py-7">
              <h2 className="text-3xl text-yellow-400 font-bold mb-2">
                Sign Up your Account
              </h2>
              <div className="border-2 w-40 border-yellow-400 inline-block mb-2"></div>
            </div>
            <div className="flex justify-center my-2">
              <a
                href="facebook.com"
                className="border-2 border-yellow-300 rounded-full p-3 mx-2"
              >
                <FaFacebook className="text-md"></FaFacebook>
              </a>
              <a
                href="linkedin.com"
                className="border-2 border-yellow-300 rounded-full p-3 mx-2"
              >
                <FaLinkedinIn className="text-md"></FaLinkedinIn>
              </a>
              <a
                href="google.com"
                className="border-2 border-yellow-300 rounded-full p-3 mx-2"
              >
                <FaGoogle className="text-md"></FaGoogle>
              </a>
            </div>
            <p className="text-black my-3">or use your email account</p>

            {/* Inputs for Register Page Starts Here  */}
            <Snackbar
              open={usernameExist}
              autoHideDuration={3000}
              onClose={() => setUsernameExist(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert severity="warning">
                Username or email already exist !!! PLEASE LOGIN
              </Alert>
            </Snackbar>
            <div className="flex flex-col items-center">
              <form onSubmit={(e) => handleRegister(e)}>
                <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                  {/* <FiUser className='text-slate-700 m-2 ml-1' /> */}
                  <input
                    type="text"
                    name="username"
                    placeholder="StudentName"
                    className="outline-none text-md flex-1"
                    ref={name}
                  />
                </div>
                <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                  {/* <FaRegEnvelope className='text-slate-700 m-2 ml-1' /> */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="outline-none text-md flex-1"
                    ref={email}
                  />
                </div>
                <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                  <input
                    type="number"
                    name="highschool"
                    placeholder="10th Marks"
                    className="outline-none text-md flex-1"
                    ref={tenth}
                  />
                </div>
                <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                  <input
                    type="number"
                    name="PUC"
                    placeholder="12th Marks"
                    className="outline-none text-md flex-1"
                    ref={twelth}
                  />
                </div>
                <div className="bg-gray-200 w-64 p-2  flex items-center mb-3">
                  <select
                    ref={course}
                    style={{ width: "inherit", color: "grey" }}
                  >
                    {options.map((option) => (
                      <option value={option.value} style={{color: "black"}}>{option.label}</option>
                    ))}
                  </select>
                </div>
                {/* <div className='bg-gray-200 w-64 p-2 flex items-center mb-3'>
                  
                  <input
                    type='text'
                    name='image'
                    placeholder='Image Url'
                    className='outline-none text-md flex-1'
                    ref={img}
                  />
                </div> */}
                <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                  {/* <MdLockOutline className='text-slate-700 m-2 ml-1' /> */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="outline-none text-md flex-1"
                    ref={password}
                  />
                </div>
                {isloading ? (
                  <div style={{"margin-left":"100px"}}>
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.5"
                    width="70"
                    visible={true}
                  />
                  </div>
                ) : (
                  <button
                    type="submit"
                    value="submit"
                    className="border-2 border-yellow-400 text-yellow-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-yellow-400 hover:text-black"
                    onClick={handleRegister}
                  >
                    Sign Up
                  </button>
                )}
              </form>
            </div>
            {/* Inputs for Register Page Ends Here  */}
          </div>
          <div className="w-2/5 bg-yellow-400 text-black rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Aspirant</h2>
            <div className="border-2 w-20 border-black inline-block mb-2"></div>
            <p className="mb-10">Login if, Signed Up</p>
            <button
              onClick={() => navigate("/studentlogin")}
              className="border-2 border-black rounded-full px-12 py-2 inline-block font-semibold hover:bg-black hover:text-yellow-400"
            >
              Log In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentSignup;
