// components/PublicOnlyRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import Paths from "./Paths";

const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);

  // const location = useLocation();

  if (user && !user.isVerified) {
    return <Navigate to={Paths.verifyPage} replace />;
  } else if (user && user.isVerified) {
    // const redirectTo = (location.state as { from?: string })?.from || '/';
    // return <Navigate to={redirectTo} replace />;
    console.log("NAAvigating to", Paths.dashboard);
    return <Navigate to={Paths.dashboard} replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
