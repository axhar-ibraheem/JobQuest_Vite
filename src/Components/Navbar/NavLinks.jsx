import {
  BiSolidUserCircle,
  BiSolidDownArrow,
  BiSolidUser,
  BiSolidLogOutCircle,
  BiSolidHome,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../store/authContext";
import { useState } from "react";

const NavLinks = () => {
  const [show, setShow] = useState(false);
  const ctx = useContext(AuthContext);
  const dropdownHandler = () => {
    setShow((preVal) => !preVal);
  };

  return (
    <div className="relative">
      <button
        onClick={dropdownHandler}
        className="bg-blue-900 capitalize text-white shadow-md text-lg rounded-md px-2 gap-3 py-1 flex items-center justify-around"
      >
        <BiSolidUserCircle className="text-xl" />
        <span>user</span>
        <BiSolidDownArrow
          className={`text-sm transition ease-linear delay-100 duration-75 ${
            show ? `rotate-180` : ""
          }`}
        />
      </button>
      {show && (
        <div className="shadow-2xl rounded-md overflow-hidden grid w-40  top-14 -left-12 md:-left-6 absolute">
          <Link to="/dashboard">
            <button className="bg-yellow-50 text-lg flex items-center justify-center gap-2 hover:bg-slate-200    shadow-md w-full py-3 text-gray-900 capitalize tracking-wider">
              <BiSolidHome className="text-2xl text-blue-900" />
              <span>home</span>
            </button>
          </Link>

          <Link to="/profile">
            <button className="bg-yellow-50 text-lg flex items-center justify-center gap-2 hover:bg-slate-200    shadow-md w-full py-3 text-gray-900 capitalize tracking-wider">
              <BiSolidUser className="text-2xl text-blue-900" />
              <span>profile</span>
            </button>
          </Link>

          <button
            onClick={ctx.logout}
            className="bg-yellow-50 text-lg flex items-center justify-center gap-2 hover:bg-slate-200 shadow-md w-full py-3 text-gray-900 capitalize tracking-wider"
          >
            <BiSolidLogOutCircle className="text-2xl text-blue-900" />
            <span>logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NavLinks;
