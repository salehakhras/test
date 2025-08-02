// components/DashboardRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import Paths from "./Paths";
import { userRoles } from "../utils/constants/constants";

const DashboardRedirect = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("redirecting to login");
      navigate(Paths.loginPage, { replace: true });
      return;
    }

    const roles = user.roles.filter(Boolean); // Clean nulls

    const hasRole = (roleNAme: userRoles) => {
      return roles.some((role) => role.name === roleNAme);
    };

    if (hasRole(userRoles.manager) && hasRole(userRoles.doctor)) {
      navigate(Paths.managerPage, { replace: true });
    } else if (hasRole(userRoles.manager)) {
      console.log("navigting to ", Paths.managerPage);
      navigate(Paths.managerPage, { replace: true });
    } else if (hasRole(userRoles.doctor)) {
      navigate(Paths.doctorPage, { replace: true });
    } else if (hasRole(userRoles.secretary)) {
      navigate("/dashboard/secretary", { replace: true });
    } else {
      navigate(Paths.createClinic, { replace: true }); // fallback
    }
  }, [user, navigate]);

  return null;
};

export default DashboardRedirect;
