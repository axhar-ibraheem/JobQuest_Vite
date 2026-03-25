import { useContext } from "react";
import Navlogo from "./Navlogo";
import NavLinks from "./NavLinks";
import { AuthContext } from "@jobquest/context";

const Navbar = () => {
  const ctx = useContext(AuthContext);
  const isAuthenticated = !!ctx.idToken;
  return (
    <nav className="w-full fixed z-10 h-16 shadow-md bg-white">
      <div className="max-w-6xl w-11/12 mx-auto flex justify-between items-center h-full">
        <Navlogo></Navlogo>
        {isAuthenticated && <NavLinks></NavLinks>}
      </div>
    </nav>
  );
};

export default Navbar;
