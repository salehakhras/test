import InputField from "../../../components/common/InputField";
import type { ClinicFormData } from "../../../pages/CreateClinicPage";
import { MdLocationOn, MdOutlinePhoneAndroid } from "react-icons/md";
import PhoneCodesDropdown from "../../../components/common/PhoneCodesDropdown";
import type { PhoneCodeInterface } from "../../../utils/constants/PhoneCodes";
import { useTranslation } from "react-i18next";

interface Props {
  data: ClinicFormData;
  onChange: <K extends keyof ClinicFormData>(
    field: K
  ) => (value: ClinicFormData[K]) => void;
  onCodeSelect: (code: PhoneCodeInterface) => void;
  errors: {
    [key: string]: string;
  };
}

const Step3ContactAndAddress = ({
  data,
  onChange,
  onCodeSelect,
  errors,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {t("create_clinic.contact_address")}
      </h2>
      <InputField
        labelName={t("credintals.phone")}
        type="tel"
        placeholder="9-999-999-99"
        Icon={MdOutlinePhoneAndroid}
        value={data.phone}
        onChange={onChange("phone")}
        error={errors.phone}
      >
        <PhoneCodesDropdown
          selectedCode={data.selectedCode}
          onSelect={(code) => onCodeSelect(code)}
        />
      </InputField>
      <InputField
        labelName={t("credintals.city")}
        type={"text"}
        placeholder={""}
        Icon={MdLocationOn}
        onChange={onChange("city_name")}
        value={data.city_name}
        error={errors.city_name}
      ></InputField>
      <InputField
        labelName={t("credintals.street")}
        type={"text"}
        placeholder={""}
        Icon={MdLocationOn}
        onChange={onChange("street_name")}
        value={data.street_name}
        error={errors.street_name}
      ></InputField>
    </div>
  );
};

export default Step3ContactAndAddress;
