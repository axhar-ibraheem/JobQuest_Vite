import { useState } from "react";
import jobsImg from "../assets/images/jobs.svg";
import Modal from "./UI/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
const Landing = () => {
  const [show, setShow] = useState("");
  return (
    <>
      <section className="bg-slate-50 h-screen w-full flex justify-center items-center">
        <div className="max-w-6xl w-11/12  grid md:grid-cols-2 items-center">
          <div className="">
            <h1 className="md:text-6xl text-3xl capitalize text-cyan-800 font-bold mb-5 tracking-wide">
              job board
            </h1>
            <p className="capitalize text-xl italic mb-3 tracking-wide">
              Your Pathway to the Perfect Job!
            </p>
            <p className="mb-5 max-w-lg leading-7">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Architecto fuga pariatur vel, harum reiciendis debitis repellendus
              delectus quas. Neque voluptas doloribus eum nobis quaerat dolor
              iure, nulla ipsa repudiandae laudantium.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShow("register")}
                className="px-7 capitalize text-white tracking-wider rounded-md hover:bg-cyan-700 bg-cyan-800 py-2"
              >
                register
              </button>
              <button
                onClick={() => setShow("login")}
                className="px-7 capitalize text-white tracking-wider rounded-md hover:bg-cyan-700 bg-cyan-800 py-2"
              >
                login
              </button>
            </div>
          </div>
          <div className="md:block hidden">
            <img src={jobsImg} alt="" />
          </div>
        </div>
         
          {show === "register" &&  <SignUp setShow = {setShow} />} 
        {show === "login" && <Login setShow = {setShow} />}
        
      </section>
    </>
  );
};

export default Landing;
