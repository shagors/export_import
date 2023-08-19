import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  // const [name, setName] = useState({ value: "", error: "" });
  // const [email, setEmail] = useState({ value: "", error: "" });
  // const [password, setPassword] = useState({ value: "", error: "" });
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [userEmail, setUserEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const [values, setValues] = useState({
    // name: "",
    // email: "",
    // password: "",
    userName: "",
    userEmail: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleName = (e) => {
    // setName({ value: e, error: "" });
    setUserName({ value: e, error: "" });
  };

  const handleEmail = (e) => {
    if (/^\S+@\S+\.\S+$/.test(e)) {
      // setEmail({ value: e, error: "" });
      setUserEmail({ value: e, error: "" });
    } else {
      // setEmail({
      //   value: "",
      //   error: "Invalid Email. please give right email address",
      // });
      setUserEmail({
        value: "",
        error: "Invalid Email. please give right email address",
      });
    }
  };

  const handlePassword = (e) => {
    if (e.length > 6) {
      setPassword({
        value: "",
        error: "Password too short. minimum 6 characters",
      });
    } else {
      setPassword({ value: e, error: "" });
    }
  };

  // const handleConfirmPassword = (e) => {
  //   if (e === password.value) {
  //     setConfirmPassword({ value: e, error: "" });
  //   } else {
  //     setConfirmPassword({ value: "", error: "Password don't match" });
  //   }
  // };

  const handleSignup = (e) => {
    e.preventDefault();

    // http://localhost:5001/register
    // http://43.154.22.219:3091/api/dev/users/signup
    axios
      .post("http://43.154.22.219:3091/api/dev/users/signup", values)
      .then((res) => {
        // localStorage.setItem("values", JSON.stringify(values?.userEmail));
        toast.success("User create Successfully");
        navigate("/");
        console.log(res);
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white">
        <div
          className="py-16 px-20"
          style={{
            borderRadius: "50px",
            background: "#e0e0e0",
            boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
          }}>
          <h1 className="text-4xl font-semibold">Welcome To Registration </h1>
          <p className="font-medium text-base text-gray-500 mt-4 text-center">
            Please Enter Your Details
          </p>
          <form onSubmit={handleSignup}>
            <div className="mt-5">
              <div>
                <label className="text-lg font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Enter your name"
                  type="name"
                  // name="name"
                  name="userName"
                  onBlur={(e) => handleName(e.target.value)}
                  onChange={(e) =>
                    setValues({ ...values, userName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  type="email"
                  // name="email"
                  name="useEmail"
                  onBlur={(e) => handleEmail(e.target.value)}
                  onChange={(e) =>
                    setValues({ ...values, userEmail: e.target.value })
                  }
                />
                {/* {email?.error && (
                  <p className="mt-2 text-red-500 font-normal">{email.error}</p> */}
                {userEmail?.error && (
                  <p className="mt-2 text-red-500 font-normal">
                    {userEmail.error}
                  </p>
                )}
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  id="password"
                  onBlur={(e) => handlePassword(e.target.value)}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                {password?.error && (
                  <p className="mt-2 text-red-500 font-normal">
                    {password.error}
                  </p>
                )}
              </div>
              {/* <div>
                <label
                  className="text-lg font-semibold"
                  htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Retype your password"
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  onBlur={(e) => handleConfirmPassword(e.target.value)}
                />
                {confirmPassword?.error && (
                  <p className="mt-2 text-red-500 font-normal">
                    {confirmPassword.error}
                  </p>
                )}
              </div> */}
              <div className="mt-8 flex flex-col gap-y-2">
                <button
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                  type="submit">
                  Sign up
                </button>
                <div className="divider text-base font-semibold">OR</div>
              </div>
              <div className="mt-4 flex justify-center items-center">
                <p className="font-normal text-base">
                  Already have an account?
                </p>
                <button className="text-violet-500 text-base font-medium ml-2">
                  <Link to="/">Log In</Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg " />
      </div>
    </div>
  );
};

export default Signup;
