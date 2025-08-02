import InputField from "../../../components/common/InputField";
import type { ClinicFormData } from "../../../pages/CreateClinicPage";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface Props {
  data: ClinicFormData;
  onChange: <K extends keyof ClinicFormData>(field: K) => (value: ClinicFormData[K])=> void;
  errors: {
    [key: string]: string;
  };
}

const Step2ClinicInfo = ({ data, onChange, errors }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {t("create_clinic.clinic_information")}
      </h2>
      <InputField
        labelName={t("credintals.name")}
        type={"text"}
        placeholder={""}
        Icon={MdDriveFileRenameOutline}
        onChange={onChange("name")}
        value={data.name}
        error={errors.name}
      ></InputField>
      <InputField
        labelName={t("credintals.bio")}
        type={"text"}
        placeholder={""}
        onChange={onChange("bio")}
        value={data.bio}
        error={errors.bio}
        isTextArea={true}
      ></InputField>
    </div>
  );
};

export default Step2ClinicInfo;
