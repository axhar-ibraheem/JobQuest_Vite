import Landing from "./Components/Landing";
import ScrollToTop from "./Components/UI/ScrollToTop";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import JobDetail from "./Components/Dashboard/JobDetail";
import Profile from "./Components/Dashboard/Profile";
import { useContext, useState, useEffect } from "react";
import AuthContext from "./store/authContext";
import Dashboard from "./Components/Dashboard/Dashboard";
import useHttp from "./hooks/useHttp";
import { JOBS_ENDPOINT } from "./constants/api.constants";
import { ROUTES } from "./constants/routes.constants";
import { Job } from "./types/job.types";

const App = (): JSX.Element => {
  const ctx = useContext(AuthContext);
  const isAuthenticated = !!ctx.idToken;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [getJobs, showSpinner] = useHttp();

  useEffect(() => {
    const onSucces = (data: Job[]) => {
      setJobs([...data]);
    };
    const onError = (errorResponse: string) => {
      console.error(errorResponse);
    };
    if (isAuthenticated) {
      getJobs(JOBS_ENDPOINT, "GET", null, onSucces, onError);
    } else {
      setJobs([]);
    }
  }, [isAuthenticated]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="bg-slate-50 min-h-screen">
        <Routes>
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              isAuthenticated ? (
                <Dashboard jobs={jobs} showSpinner={showSpinner} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path={ROUTES.JOB_DETAIL}
            element={
              isAuthenticated ? (
                <JobDetail jobs={jobs} />
              ) : (
                <Navigate to={ROUTES.HOME} replace />
              )
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/" replace />
            }
          />
          <Route
            path={ROUTES.WILDCARD}
            element={
              <Navigate
                to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME}
                replace
              />
            }
          />
        </Routes>
      </section>
    </>
  );
};

export default App;
