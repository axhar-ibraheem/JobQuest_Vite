import Landing from "./Components/Landing";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom/cjs/react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

import Searchbar from "./Components/Dashboard/Searchbar";
import Profile from "./Components/Dashboard/Profile";
import { useContext } from "react";
import AuthContext from "./store/authContext";
function App() {
  const ctx = useContext(AuthContext);
  const isAuthenticated = !!ctx.idToken;
  return (
    <>
      <Navbar />
      <section className="bg-slate-50 min-h-screen">
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          {isAuthenticated && (
            <Route path="/dashboard">
              <Searchbar />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}

          {!isAuthenticated ? (
            <Redirect from="*" to="/" />
          ) : (
            <Redirect from="*" to="/dashboard" />
          )}
        </Switch>
      </section>
    </>
  );
}

export default App;
