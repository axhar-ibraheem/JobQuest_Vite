import { useContext, useState } from "react";
import jobsImg from "@jobquest/assets/svgs/jobs.svg";
import Login from "../auth/_components/Login";
import SignUp from "../auth/_components/SignUp";
import { AuthContext } from "@jobquest/context";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@jobquest/constants";

export type ModalView = "register" | "login" | "none";

const AuthPage = () => {
  const [activeModal, setActiveModal] = useState<ModalView>("none");
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGuestLogin = (): void => {
    ctx.loginAsGuest();
    navigate(ROUTES.DASHBOARD, { replace: true });
  };
  return (
    <>
      <section className="bg-slate-50 h-screen w-full flex justify-center items-center">
        <div className="max-w-6xl w-11/12  grid md:grid-cols-2 items-center">
          <div className="">
            <h1 className="md:text-6xl text-3xl capitalize text-cyan-800 font-bold mb-5 tracking-wide">
              job quest
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
                onClick={() => setActiveModal("register")}
                className="px-7 capitalize text-white tracking-wider rounded-md hover:bg-cyan-700 bg-cyan-800 py-2"
              >
                register
              </button>
              <button
                onClick={() => setActiveModal("login")}
                className="px-7 capitalize text-white tracking-wider rounded-md hover:bg-cyan-700 bg-cyan-800 py-2"
              >
                login
              </button>
              <button
                onClick={() => handleGuestLogin()}
                className="px-7 capitalize text-white tracking-wider rounded-md hover:bg-cyan-700 bg-cyan-800 py-2"
              >
                enter as guest
              </button>
            </div>
          </div>
          <div className="md:block hidden">
            <img src={jobsImg} alt="" />
          </div>
        </div>

        {activeModal === "register" && (
          <SignUp setActiveModal={setActiveModal}></SignUp>
        )}
        {activeModal === "login" && (
          <Login setActiveModal={setActiveModal}></Login>
        )}
      </section>
    </>
  );
};

export default AuthPage;
