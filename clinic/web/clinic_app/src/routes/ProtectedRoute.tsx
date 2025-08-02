// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import Paths from "./Paths";
import LoadingPage from "../pages/LoadngPage";
import { StatusRequest } from "../utils/constants/StatusRequest";
import type { userRoles } from "../utils/constants/constants";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: userRoles[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  allowedRoles,
  redirectTo = Paths.dashboard,
}) => {
  const { user, fetchUserStatus } = useAppSelector((state) => state.auth);

  if (fetchUserStatus === StatusRequest.loading) {
    return <LoadingPage />; // Or a loading spinner if you prefer
  }
  if (requireAuth && !user) {
    console.log("navigating toooo ", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  if (
    allowedRoles &&
    user &&
    !user.roles.some((role) => role && allowedRoles.includes(role.name))
  ) {
    // console.log("allowedRoles", allowedRoles, "user", user.roles);
    return <Navigate to="*" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
