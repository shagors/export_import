import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  console.log(name, email, password);

  const navigate = useNavigate();

  const googleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login Successfully with Gmail");
        navigate("/exportimport");
      })
      .catch((error) => {
        toast.error("Something Wrong");
      });
  };

  const handleName = (e) => {
    setName({ value: e, error: "" });
  };

  const handleEmail = (e) => {
    if (/^\S+@\S+\.\S+$/.test(e)) {
      setEmail({ value: e, error: "" });
    } else {
      setEmail({
        value: "",
        error: "Invalid Email. please give right email address",
      });
    }
  };

  const handlePassword = (e) => {
    if (e.length < 7) {
      setPassword({
        value: "",
        error: "Password too short minimum 8 characters",
      });
    } else {
      setPassword({ value: e, error: "" });
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Successfully login");
        navigate("/");
      })
      .catch((error) => {
        toast.error("something Went wrong");
      });
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
                  placeholder="Ener your name"
                  type="name"
                  name="name"
                  id="name"
                  onBlur={(e) => handleName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Ener your email"
                  type="email"
                  name="email"
                  id="email"
                  onBlur={(e) => handleEmail(e.target.value)}
                />
                {email?.error && (
                  <p className="mt-2 text-red-500 font-normal">{email.error}</p>
                )}
              </div>
              <div>
                <label className="text-lg font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Ener your password"
                  type="password"
                  name="password"
                  id="password"
                  onBlur={(e) => handlePassword(e.target.value)}
                />
                {password?.error && (
                  <p className="mt-2 text-red-500 font-normal">
                    {password.error}
                  </p>
                )}
              </div>
              <div>
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
              </div>
              <div className="mt-8 flex flex-col gap-y-2">
                <button
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                  type="submit">
                  Sign up
                </button>
                <div className="divider text-base font-semibold">OR</div>
                <button
                  className="flex items-center justify-center border-2 border-gray-100 py-3 rounded-xl gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all"
                  onClick={googleAuth}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  Sign up with Google
                </button>
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
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg " />
      </div>
    </div>
  );
};

export default Signup;
