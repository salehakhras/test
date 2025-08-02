import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import Paths from "./Paths";

const UnverifiedOnlyRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    // Not logged in? Redirect to login
    return <Navigate to={Paths.loginPage} replace />;
  }

  if (user.isVerified) {
    // Already verified? Redirect to home or dashboard
    return <Navigate to={Paths.dashboard} replace />;
  }

  // Unverified user — allow access
  return <>{children}</>;
};

export default UnverifiedOnlyRoute;
