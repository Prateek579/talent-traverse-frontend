import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../../context/JobsStore";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [resetCode, setResetCode] = useState(null);
  const [inputCode, setInputCode] = useState();
  const [display, setDisplay] = useState("hidden");

  const { setAlertMessage, setUserName } = useContext(JobContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      userDetails.name === "" ||
      userDetails.email === "" ||
      userDetails.password === ""
    ) {
      setAlertMessage("All fields are mendatory");
    } else {
      if (display === "hidden") {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URI}/api/user/loginUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userDetails.email,
              password: userDetails.password,
            }),
          }
        );
        const result = await response.json();
        setAlertMessage(result.message);
        if (result.success === true) {
          navigate("/home");
          setUserName(result.name);
        }
        setUserDetails({
          ...userDetails,
          password: "",
        });
      }
      if (display === "block") {
        console.log("input code is", inputCode, "send code is", resetCode);
        if (inputCode == resetCode) {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_SERVER_URI}/api/user/resetPassword`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: userDetails.email,
                  password: userDetails.password,
                }),
              }
            );
            const result = await response.json();
            if (result.success === true) {
              navigate("/home");
            }
            setAlertMessage(result.message);
            setInputCode(null);
            setUserDetails({ ...userDetails, password: "" });
            setUserName(result.name)
          } catch (error) {
            console.log("Updating password error");
          }
        } else {
          setAlertMessage("Please enter a valid code");
        }
      }
    }
  };

  const handleForget = async () => {
    setDisplay("block");
    if (userDetails.email === "") {
      setAlertMessage("Please enter register email address");
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URI}/api/user/sendCode`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userDetails.email,
            }),
          }
        );
        const result = await response.json();
        if (result.success === true) {
          setAlertMessage(result.message);
          setResetCode(result.code);
          setUserName(result.name);
        } else {
          setAlertMessage(result.message);
        }
      } catch (error) {
        console.log("handle forget error");
      }
    }
  };

  return (
    <div className="login_container flex justify-center items-center h-screen bg-orange-50 w-screen">
      <div className="login_content flex flex-row w-3/5 p-5 bg-white">
        <div className="login_left w-1/2">
          <img
            src="./Talenttraverselogo.jpg"
            alt="talent traverse"
            className="h-full w-full"
          />
        </div>
        <div className="login_right w-1/2 flex flex-col items-center justify-around">
          <input
            type="text"
            placeholder="Username"
            className="border-b-2 w-4/5 border-slate-500 px-2 py-1 outline-none"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border-b-2 w-4/5 border-slate-500 px-2 py-1 outline-none"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="border-b-2 w-4/5 border-slate-500 px-2 py-1 outline-none"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Reset code"
            className={`border-b-2 w-4/5 border-slate-500 px-2 py-1 outline-none ${display}`}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <div className="login_btns flex justify-around flex-row w-4/5">
            <button
              className="login_right_btn bg-black text-white text-sm px-6 py-2 rounded-md cursor-pointer"
              onClick={() => handleSubmit()}
            >
              Login
            </button>
            <button
              className="login_right_btn bg-black text-white text-sm px-6 py-2 rounded-md cursor-pointer"
              onClick={() => handleForget()}
            >
              Forget Password
            </button>
          </div>
          <Link to={"/signUp"}>
            <div className="login_accout w-auto flex cursor-pointer text-red-400">
              don't have account? <p className="ml-3 text-black">Sign up</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
