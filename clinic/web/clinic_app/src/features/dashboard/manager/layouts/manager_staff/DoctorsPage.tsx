import { useParams } from "react-router-dom";
import Card from "../../../../../components/specific/dashboard/Card";
import StaffTable from "../../component/clinic_staff/StaffTable";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import { getClinicDoctors } from "../../slices/clinicStaffThunk";
import AddStaffModal from "../../component/clinic_staff/AddStaffModal";
import { t } from "i18next";
const DoctorsPage = () => {
  const hasFetched = useRef(false);
  const dispatch = useAppDispatch();
  const { clinicId } = useParams<{ clinicId: string }>();
  const { doctors } = useAppSelector((state) => state.clinic_staff);
  useEffect(() => {
    if (!hasFetched.current && clinicId) {
      hasFetched.current = true;
      dispatch(getClinicDoctors({ clinic_id: Number(clinicId) }));
    }
  }, [clinicId, dispatch]);
  return (
    <Card width={"w-full"}>
      <div className="w-full justify-between flex flex-row">
        <div className="flex flex-row items-end mx-2 mb-5">
          <span className="text-xl font-bold text-gray-500">
            {doctors.length}{" "}
          </span>
          <span className="text-gray-500">
            {" "}
            {t("total")} {t("doctors")}
          </span>
        </div>
        <AddStaffModal staffType="doctor" clinicId={Number(clinicId)} />
      </div>
      {doctors && (
        <StaffTable staffType="doctor" doctorList={doctors}></StaffTable>
      )}
    </Card>
  );
};

export default DoctorsPage;
