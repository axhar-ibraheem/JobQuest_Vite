import { JSX, useContext, useState, useEffect } from "react";
import { AuthContext } from "@jobquest/context";
import { useHttp } from "@jobquest/hooks";
import { Navbar, ScrollToTop } from "@jobquest/shared";
import { AppRouter } from "@jobquest/routes";
import { JOBS_ENDPOINT } from "@jobquest/constants";
import { Job } from "@jobquest/models";
import { GUEST_JOBS } from "@jobquest/data";

const App = (): JSX.Element => {
  const ctx = useContext(AuthContext);
  const isAuthenticated = !!ctx.idToken;
  const isGuest = ctx.isGuest;
  const hasAccess = isAuthenticated || isGuest;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [getJobs, showSpinner] = useHttp();

  useEffect(() => {
    const onSuccess = (data: Job[]): void => {
      setJobs([...data]);
    };

    const onError = (errorResponse: string): void => {
      console.error(errorResponse);
    };

    if (isGuest) {
      setJobs(GUEST_JOBS);
    } else if (isAuthenticated) {
      getJobs<Job[]>(JOBS_ENDPOINT, "GET", null, onSuccess, onError);
    } else {
      setJobs([]);
    }
  }, [isAuthenticated, isGuest]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="bg-slate-50 min-h-screen">
        <AppRouter
          jobs={jobs}
          showSpinner={showSpinner}
          hasAccess={hasAccess}
          isAuthenticated={isAuthenticated}
        />
      </section>
    </>
  );
};

export default App;
