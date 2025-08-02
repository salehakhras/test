import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getMyClinics } from "../features/dashboard/manager/slices/clinicSettingsThunk";
import Paths from "./Paths";
import LoadingPage from "../pages/LoadngPage";

const ManagerRedirectToFirstClinic = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { clinics } = useAppSelector((state) => state.my_clinics);

  useEffect(() => {
    if (!user) {
      console.log("redirecting to login");
      navigate(Paths.loginPage, { replace: true });
      return;
    }

    if (clinics.length === 0) {
      dispatch(getMyClinics());
    }
  }, [dispatch, clinics.length, user, navigate]);

  useEffect(() => {
    if (clinics.length > 0) {
      console.log("navigting to ", `${Paths.managerPage}/${clinics[0].id}`);
      navigate(`${Paths.managerPage}/${clinics[0].id}`, { replace: true });
    }
  }, [clinics, navigate]);

  return <LoadingPage />; // or a loading spinner if you prefer
};

export default ManagerRedirectToFirstClinic;
