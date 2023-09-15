import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { RotatingLines } from "react-loader-spinner";
// import { AuthContext } from "../store/AuthContext";
import {
  FaFacebook,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";


function AdminLogin(props) {
  const navigate = useNavigate();
  const [invalidUser, setInvalidUser] = useState(false);
  const [email, setEmail]= useState("");
  const [password,setPassword]=useState("");
  const {dispatch} =useContext(AuthContext);
  const [isloading, setIsloading] = useState(false);
  const [wrong, setIsWrong] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setIsloading(true);
    signInWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        // if(props.admin===true){
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navigate("/admin");
        // }
        // else{
        //   navigate("/student");
        // }
      })
      .catch((e) => {
        console.log(email);
        console.log(password);
        console.log(e);
        setIsWrong(true);
      });
    // navigate("/funding")
    // const form = e.target
    // const user = {
    //   username: form[0].value,
    //   password: form[1].value,
    // }

    // fetch("http://localhost:4000/login/", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     localStorage.setItem("token", data.token)
    //     localStorage.setItem("currentUser",JSON.stringify(user))
    //     if (data.message === "Success") {
    //       navigate("/funding")
    //     } else setInvalidUser(true)
    //   })
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <main className="flex flex-col items-center pt-10 w-full flex-1 px-20 text-center">
        <div className="bg-neutral-500 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5 ">
            <div className="flex text-left font-bold">
              <span className="text-2xl">Step-Up</span>
              <span className="text-1xl font-bold text-yellow-500">+</span>
            </div>
            <div className="py-12">
              <h2 className="text-3xl text-yellow-400 font-bold mb-2">
                Log in to your Account
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

            <Snackbar
              open={invalidUser}
              autoHideDuration={3000}
              onClose={() => setInvalidUser(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert severity="warning">Enter Valid Username or Password</Alert>
            </Snackbar>

            {/* Input div starts here */}

            <div className="flex flex-col items-center">
              <form onSubmit={handleLogin}>
                <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-slate-700 m-2 ml-1" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="outline-none text-md flex-1"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-slate-700 m-2 ml-1" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="outline-none text-md flex-1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {!wrong && isloading ? (
                  <div style={{"margin-left":"100px"}}>
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.5"
                    width="70"
                    visible={true}
                  />
                  </div>
                ):
                  <button
                  type="submit"
                  value="submit"
                  className="border-2 border-yellow-400 text-yellow-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-yellow-400 hover:text-black"
                >
                  Log In
                </button>
                }
                {wrong && <div style={{color:"red", "margin-top": "10px"}}>** Wrong Email-Id or Password</div>}
              </form>
            </div>

            {/* Input div ends Here */}
          </div>
          <div className="w-2/5 bg-yellow-400 text-black rounded-tr-2xl rounded-br-2xl py-36 px-12">
             <h2 className="text-3xl font-bold mb-2"></h2>
            <div className="border-2 w-20 border-black inline-block mb-2"></div>
            <p className="mb-10">
             Welcom Admin!!
            </p>
            <a
              onClick={() => {navigate("/adminsignup")}}
              className="border-2 border-black rounded-full px-12 py-2 inline-block font-semibold hover:bg-black hover:text-yellow-400"
            >
              Sign Up
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminLogin;
