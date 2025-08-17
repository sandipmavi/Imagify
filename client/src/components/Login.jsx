import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
     
      className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center"
    >
      <motion.form
        initial={{ opacity: 0.2, y: 50}}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Start by Registering on the App</p>
        {state !== "Login" && (
          <div className="border px-6 py-1 flex items-center gap-2 rounded-full mt-4">
            <img width={35} src={assets.profile_icon} alt="" />
            <input
              type="text"
              className="outline-none text-sm"
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img width={35} src={assets.email_icon} alt="" />
          <input
            type="email"
            className="outline-none text-sm"
            placeholder="Email"
            required
          />
        </div>
        <div className="border px-6 py-1 flex items-center gap-2 rounded-full mt-4">
          <img width={25} src={assets.lock_icon} alt="" />
          <input
            type="password"
            className="outline-none text-sm"
            placeholder="Password"
            required
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full ">
          {state === "Login" ? "Login" : "Create Account"}
        </button>
        {state === "Login" && (
          <p className="mt-5 text-center">
            Don't have an Account ?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="hover:text-blue-600"
            >
              Sign Up
            </span>
          </p>
        )}
        {state !== "Login" && (
          <p className="mt-5 text-center">
            Already have an Account ?{" "}
            <span
              onClick={() => setState("Login")}
              className="hover:text-blue-600"
            >
              Sign In
            </span>
          </p>
        )}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};
export default Login;
