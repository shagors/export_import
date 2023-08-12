import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    // userName: "",
    // userEmail: "",
    // password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // http://localhost:5001/login
    // http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/users
    axios
      .post("http://localhost:5001/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("values", JSON.stringify(values?.email));
          toast.success("Login Successfully");
          navigate("/exportimport");
          window.location.reload();
          console.log(res);
        } else {
          toast.error("User not found");
        }
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
          <h1 className="text-4xl font-semibold text-center">Welcome Back</h1>
          <p className="font-medium text-base text-gray-500 mt-4 text-center">
            Please Enter Your Details
          </p>
          <form onSubmit={handleLogin}>
            <div className="mt-8">
              {/* <div>
                <label className="text-lg font-semibold" htmlFor="userName">
                  Name
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your user name"
                  type="text"
                  name="userName"
                  onChange={(e) =>
                    setValues({ ...values, userName: e.target.value })
                  }
                />
              </div> */}
              <div>
                <label className="text-lg font-semibold" htmlFor="userEmail">
                  Email
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  // name="useEmail"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
              </div>
              {/* <div className="mt-4 flex justify-between items-center">
                <div></div>
                <button className="font-medium text-base text-violet-400">
                  <Link to="/forgotpassword">Forgot Password</Link>
                </button>
              </div> */}
              <div className="mt-5 flex flex-col gap-y-4">
                <button
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                  type="submit">
                  Sign in
                </button>
                <div className="divider text-base font-semibold">OR</div>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-normal text-base">Don't have an account?</p>
                <button className="text-violet-500 text-base font-medium ml-2">
                  <Link to="/signup">Sign Up</Link>
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

export default Login;
