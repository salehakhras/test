import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { managerSidebar } from "../../utils/constants/sidebarContent";
import Dashboard from "../dashboard.tsx/Dashboard";
import LoadingPage from "../LoadngPage";
import Paths from "../../routes/Paths";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getMyClinics } from "../../features/dashboard/manager/slices/clinicSettingsThunk";
import { StatusRequest } from "../../utils/constants/StatusRequest";

const ManagerMainPage = () => {
  const hasFetched = useRef(false);
  const { clinicId } = useParams<{ clinicId: string }>();
  const navigate = useNavigate();
  const { clinics, status } = useAppSelector((state) => state.my_clinics);
  const dispatch = useAppDispatch();
  const [currentClinicId, setCurrentClinicId] = useState<number | null>(null);

  useEffect(() => {
    console.log("Clinics length:", clinics.length);
    if (
      !hasFetched.current &&
      clinics.length === 0 &&
      status === StatusRequest.none
    ) {
      hasFetched.current = true;
      dispatch(getMyClinics());
    }
  }, [clinics.length, dispatch, status]);

  useEffect(() => {
    if (!clinicId || clinics.length === 0) return;

    const parsedId = Number(clinicId);
    const clinicFromURL = clinics.find((c) => c.id === parsedId);

    if (clinicFromURL) {
      setCurrentClinicId(parsedId);
    } else {
      // Invalid ID, fallback to first clinic
      const fallbackId = clinics[0].id;
      setCurrentClinicId(fallbackId);
      navigate(`${Paths.managerPage}/${fallbackId}`, { replace: true });
    }
  }, [clinicId, clinics, navigate]);

  // When user changes clinic, update URL
  const handleClinicChange = (id: number) => {
    setCurrentClinicId(id);
    navigate(`${Paths.managerPage}/${id}`);
  };

  if (currentClinicId === null) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen overflow-hidden flex-1 flex flex-col ">
      <Dashboard
        clinics={clinics}
        currentClinicId={currentClinicId}
        onClinicChange={handleClinicChange}
        sidebarList={managerSidebar(currentClinicId)}
        mainContent={<Outlet />}
      />
    </div>
  );
};

export default ManagerMainPage;
