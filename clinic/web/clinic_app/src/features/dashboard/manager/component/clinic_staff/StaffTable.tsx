import { MdLocalPhone } from "react-icons/md";
import copy from "copy-to-clipboard";
import type {
  doctorModel,
  secretaryModel,
} from "../../schemas/clinicStaffSchema";
import { useState } from "react";
import { t } from "i18next";
import ProfileImage from "../../../../../components/specific/dashboard/ProfileImage";
import WorkingDaysCircles from "../../../../../components/specific/dashboard/WorkingDaysCircles";

interface StaffTableProps {
  doctorList?: doctorModel[];
  secretaryList?: secretaryModel[];
  staffType: "doctor" | "secretary";
}

const StaffTable = ({
  doctorList,
  secretaryList,
  staffType,
}: StaffTableProps) => {
  const [phoneCopied, setPhoneCopied] = useState(false);
  const handleCopyClick = (phone: string) => {
    copy(phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 1000); // Reset "copied" state after 1 second
  };

  const isDoctor = staffType === "doctor";
  const list = isDoctor ? doctorList ?? [] : secretaryList ?? [];
  return (
    <div className="space-y-4">
      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-pin-rows w-full">
          <thead>
            <tr>
              <th>{t("credintals.name")}</th>
              <th>{t("phone")}</th>
              {isDoctor && <th>{t("specialization")}</th>}
              {isDoctor && <th>{t("experience_years")}</th>}
              <th>{t("joined_clinic")}</th>
              <th>{t("working_hours")}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((staff) => {
              const profileImage = staff.profile_image;
              const name = staff.name;
              const phone = staff.phone;
              const joined = staff.created_at?.split("T")[0];
              return (
                <tr key={staff.user_id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <ProfileImage profileImage={profileImage} name={name} />
                      <div>
                        <div className="font-bold">
                          {isDoctor && `${t("dr")} `}
                          {name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {phone ? (
                      <div className="flex items-center gap-2">
                        <MdLocalPhone className="size-5" />
                        <span
                          onClick={() => handleCopyClick(phone)}
                          className="cursor-pointer"
                        >
                          {staff.phone}
                          {phoneCopied && (
                            <span className="badge badge-soft badge-primary badge-sm">
                              {t("copied")}!
                            </span>
                          )}
                        </span>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  {isDoctor && "specialization" in staff && (
                    <td>
                      <span>{staff.specialization}</span>
                    </td>
                  )}
                  {isDoctor && "experience_years" in staff && (
                    <td>
                      <span>{staff.experience_years}</span>
                    </td>
                  )}
                  <td>{joined}</td>
                  <td>
                    <WorkingDaysCircles workingHours={staff.working_hours} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;
