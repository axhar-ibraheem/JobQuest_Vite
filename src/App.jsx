import Landing from "./Components/Landing";
import ScrollToTop from "./Components/UI/ScrollToTop";
import { Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import JobDetail from "./Components/Dashboard/JobDetail";
import Profile from "./Components/Dashboard/Profile";
import { useContext, useState, useEffect } from "react";
import AuthContext from "./store/authContext";
import Dashboard from "./Components/Dashboard/Dashboard";
import useHttp from "./hooks/useHttp";

function App() {
  const ctx = useContext(AuthContext);
  const isAuthenticated = !!ctx.idToken;
  const [jobs, setJobs] = useState([]);
  const [ getJobs, showSpinner ] = useHttp()
  const endPointUrl = "https://jobsboard-e5259-default-rtdb.firebaseio.com/jobs_data.json"

  useEffect(() => {
    const onSucces = (data)=> {
            setJobs([...data])
    }
    const onError = (errorResponse)=> {
            console.log(errorResponse)
    }
     if (isAuthenticated) {
      getJobs(endPointUrl, "GET", null, onSucces, onError);
    } else {
      setJobs([]);
    }
  }, [isAuthenticated]);
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <section className="bg-slate-50 min-h-screen">
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          {isAuthenticated && (
            <Route path="/dashboard" exact>
              <Dashboard jobs={jobs} showSpinner={showSpinner} />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/dashboard/:job_id">
              <JobDetail jobs={jobs} />
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
