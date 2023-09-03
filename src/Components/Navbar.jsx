import {
  BiSolidUserCircle,
  BiSolidDownArrow,
  BiSolidUser,
  BiSolidLogOutCircle,
} from "react-icons/bi";
import { Link } from "react-router-dom";

import { useState } from "react";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const dropdownHandler = () => {
    setShow((preVal) => !preVal);
  };
  return (
    <nav className="w-full fixed z-10 h-16 shadow-md bg-slate-50">
      <div className="max-w-6xl w-11/12 mx-auto flex justify-between items-center h-full">
        <h1 className="capitalize text-2xl font-bold">
          job<span className="text-blue-900">Quest</span>
        </h1>
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
            <div className="shadow-2xl rounded-md  overflow-hidden grid w-40  top-14 -left-12 md:-left-6 absolute">
              <button className="bg-yellow-50 text-lg flex items-center justify-center gap-2 hover:bg-slate-200 shadow-md w-full py-3 text-gray-900 capitalize tracking-wider">
                <BiSolidLogOutCircle className="text-2xl text-blue-900" />
                <span>logout</span>
              </button>
              <Link to="/profile">
                <button className="bg-yellow-50 text-lg flex items-center justify-center gap-2 hover:bg-slate-200    shadow-md w-full py-3 text-gray-900 capitalize tracking-wider">
                  <BiSolidUser className="text-2xl text-blue-900" />
                  <span>profile</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
