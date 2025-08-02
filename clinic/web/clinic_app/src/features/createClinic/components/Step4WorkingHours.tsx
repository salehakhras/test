import type { ClinicFormData } from "../../../pages/CreateClinicPage";
import { t } from "i18next";
import SetWorkingHoursTable from "../../../components/common/working_hours/SetWorkingHoursTable";

interface Props {
  data: ClinicFormData;
  onChange: <K extends keyof ClinicFormData>(
    field: K
  ) => (value: ClinicFormData[K]) => void;
}

const Step4WorkingHours = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {t("create_clinic.contact_address")}
      </h2>
      <SetWorkingHoursTable
        clinicWorkingHours={data.working_hours}
        onChange={onChange("working_hours")}
      />
    </div>
  );
};

export default Step4WorkingHours;
