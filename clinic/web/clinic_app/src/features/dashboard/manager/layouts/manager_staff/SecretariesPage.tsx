import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Card from "../../../../../components/specific/dashboard/Card";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import AddStaffModal from "../../component/clinic_staff/AddStaffModal";
import StaffTable from "../../component/clinic_staff/StaffTable";
import { getClinicSecretaries } from "../../slices/clinicStaffThunk";

const SecretariesPage = () => {
  const hasFetched = useRef(false);
  const dispatch = useAppDispatch();
  const { clinicId } = useParams<{ clinicId: string }>();
  const { secretaries } = useAppSelector((state) => state.clinic_staff);
  useEffect(() => {
    if (!hasFetched.current && clinicId) {
      hasFetched.current = true;
      dispatch(getClinicSecretaries({ clinic_id: Number(clinicId) }));
    }
  }, [clinicId, dispatch]);
  return (
    <Card width={"w-full"}>
      <div className="w-full justify-between flex flex-row">
        <div className="flex flex-row items-end mx-2 mb-5">
          <span className="text-xl font-bold text-gray-500">
            {secretaries.length}{" "}
          </span>
          <span className="text-gray-500">
            {" "}
            {t("total")} {t("secretaries")}
          </span>
        </div>
        <AddStaffModal staffType="secretary" clinicId={Number(clinicId)} />
      </div>
      {secretaries && (
        <StaffTable
          staffType="secretary"
          secretaryList={secretaries}
        ></StaffTable>
      )}
    </Card>
  );
};
export default SecretariesPage;
