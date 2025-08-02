import Card from "../../../../../components/specific/dashboard/Card";
import EditClinicInfoModal from "../../component/clinic_settings/EditClinicInfoModal";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import { showClinic } from "../../slices/clinicSettingsThunk";
import EditAddressAndContactModal from "../../component/clinic_settings/EditAddressAndContactModal";
import WorkingHoursTable from "../../../../../components/common/working_hours/WorkingHoursTable";
import { t } from "i18next";
import { MdLocationPin, MdOutlinePhoneAndroid  } from "react-icons/md";

const ClinicInfoPage = () => {
  const hasFetched = useRef(false);
  const { clinicId } = useParams<{ clinicId: string }>();
  const { clinic } = useAppSelector((state) => state.clinic_info);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("clinic id", clinicId, "clinic", clinic, hasFetched.current);
    if (!hasFetched.current && clinicId) {
      hasFetched.current = true;
      dispatch(showClinic({ clinic_id: Number(clinicId) }));
    }
  }, [clinic, clinicId, dispatch]);

  return (
    <div className="flex lg:flex-row flex-col gap-2">
      <div className="flex flex-col flex-1">
        <Card
          width="w-full"
          title={t("create_clinic.clinic_info")}
          cornerText={`${t("created_in")}: ${
            clinic?.created_at?.split("T")[0]
          }`}
          action={
            clinic && (
              <EditClinicInfoModal clinicData={clinic}></EditClinicInfoModal>
            )
          }
        >
          <div className="flex flex-row gap-x-2 items-center">
            <div className="avatar avatar-placeholder">
              <div className="w-24 bg-base-300 shadow-md rounded-full">
                {/* <img src="/avatar_placeholder.png" alt="User" /> */}
                <span className="text-4xl text-gray-400">
                  {clinic?.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 justify-center">
              <span className="font-semibold ">{clinic?.name}</span>
              <p>{clinic?.bio}</p>
            </div>
          </div>
        </Card>
        <Card
          width="w-full"
          title={t("create_clinic.contact_address")}
          action={
            clinic && (
              <EditAddressAndContactModal
                clinicData={clinic}
              ></EditAddressAndContactModal>
            )
          }
        >
          <>
            <div className="flex flex-row gap-x-1 items-center">
             <MdLocationPin className="size-5"/>
              <span>{clinic?.phone}</span>
            </div>
            <div className="flex flex-row gap-x-1 items-center">
              <MdOutlinePhoneAndroid  className="size-5"/>
              <span>
                {clinic?.city_name}, {clinic?.street_name}
              </span>
            </div>
          </>
        </Card>
      </div>
      <div className="flex flex-col w-128 flex-1">
        <Card width="w-full" title={t("open_hours")}>
          {clinic && clinic.working_hours && (
            <WorkingHoursTable days={clinic?.working_hours} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default ClinicInfoPage;
