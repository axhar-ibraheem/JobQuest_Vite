import Landing from "./Components/Landing";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Navbar from "./Components/Navbar";
import Searchbar from "./Components/Dashboard/Searchbar";
import Profile from "./Components/Dashboard/Profile";
function App() {
  console.log(import.meta.env )
  return (
    <>
      <Navbar />
      <section className="bg-slate-50 min-h-screen">
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/dashboard">
            <Searchbar />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </section>
    </>
  );
}

export default App;
