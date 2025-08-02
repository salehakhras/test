// import type { IconBaseProps } from "react-icons";
// import InputField from "../../../components/specific/auth/InputField";
// import { MdOutlineMail } from "react-icons/md";

import { useTranslation } from "react-i18next";

const Step1ClinicIntro = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-primary">
        {t("create_clinic.ready_title")}
      </h1>

      <p className="text-gray-600 max-w-md">
        {t("create_clinic.ready_content")}
      </p>
    </div>
  );
};

export default Step1ClinicIntro;
