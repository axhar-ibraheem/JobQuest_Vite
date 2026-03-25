import { JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthPage from "../_pages/auth/AuthPage";
import DashboardPage from "../_pages/dashboard/DashboardPage";
import JobDetailPage from "../_pages/jobDetail/JobDetailPage";
import ProfilePage from "../_pages/profile/ProfilePage";
import { ROUTES } from "@jobquest/constants";
import { Job } from "@jobquest/models";

interface AppRouterProps {
  jobs: Job[];
  showSpinner: boolean;
  hasAccess: boolean;
  isAuthenticated: boolean;
}

const AppRouter = ({
  jobs,
  showSpinner,
  hasAccess,
  isAuthenticated,
}: AppRouterProps): JSX.Element => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<AuthPage />} />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute
            hasAccess={hasAccess}
            element={<DashboardPage jobs={jobs} showSpinner={showSpinner} />}
          />
        }
      />
      <Route
        path={ROUTES.JOB_DETAIL}
        element={
          <ProtectedRoute
            hasAccess={hasAccess}
            element={<JobDetailPage jobs={jobs} />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute
            hasAccess={isAuthenticated}
            element={<ProfilePage />}
          />
        }
      />
      <Route
        path={ROUTES.WILDCARD}
        element={
          <Navigate to={hasAccess ? ROUTES.DASHBOARD : ROUTES.HOME} replace />
        }
      />
    </Routes>
  );
};

export default AppRouter;
