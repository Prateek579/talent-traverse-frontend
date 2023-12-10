import React, { useContext, useState } from "react";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../../context/JobsStore";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confPassword, setConfPassword] = useState("");

  const { setAlertMessage, setUserName } = useContext(JobContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      userDetails.name === "" ||
      userDetails.email === "" ||
      userDetails.password === ""
    ) {
      setAlertMessage("All fields are mendatory");
    } else if (userDetails.password !== confPassword) {
      setAlertMessage("Please renter correct password");
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/api/user/createNewUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
          }),
        }
      );
      const result = await response.json();
      setAlertMessage(result.message);
      if (result.success === true) {
        navigate("/home");
        setUserName(userDetails.name);
      }
    }
  };

  return (
    <div className="signup_container flex justify-center items-center h-screen bg-orange-50">
      <div className="signup_content flex flex-row w-3/5 p-5 bg-white">
        <div className="signup_left w-1/2">
          <img
            src="./Talenttraverselogo.jpg"
            alt="talent traverse"
            className="h-full w-full"
          />
        </div>
        <div className="signup_right w-1/2 flex flex-col items-center justify-around">
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
            type="password"
            placeholder="Conferm Password"
            className="border-b-2 w-4/5 border-slate-500 px-2 py-1 outline-none"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <button
            className="signup_right_btn bg-black text-white text-xl px-6 py-2 rounded-md cursor-pointer"
            onClick={() => handleSubmit()}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
