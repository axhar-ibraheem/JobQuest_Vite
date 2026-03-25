import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../_constants/routes.constants";

interface ProtectedRouteProps {
  element: JSX.Element;
  hasAccess: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({
  element,
  hasAccess,
  redirectTo = ROUTES.HOME,
}: ProtectedRouteProps) => {
  return hasAccess ? element : <Navigate to={redirectTo} replace></Navigate>;
};

export default ProtectedRoute;
