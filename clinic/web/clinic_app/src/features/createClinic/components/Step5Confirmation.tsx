import { useTranslation } from "react-i18next";
import type { ClinicFormData } from "../../../pages/CreateClinicPage";

interface Props {
  data: ClinicFormData;
  error?: string;
}
const Step5Confirmation = ({ data, error }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{t("create_clinic.confirmation")}</h2>
        <div className="bg-base-200 border border-base-300 p-4 rounded shadow-sm space-y-2 text-sm">
          <div>
            <strong>{t("credintals.name")}:</strong> {data.name}
          </div>
          <div>
            <strong>{t("credintals.bio")}:</strong> {data.bio}
          </div>
          <div>
            <strong>{t("credintals.phone")}:</strong> {data.phone}
          </div>
          <div>
            <strong>{t("credintals.city")}:</strong> {data.city_name}
          </div>
          <div>
            <strong>{t("credintals.street")}:</strong> {data.street_name}
          </div>
        </div>
        <p className="text-gray-600 text-sm text-center">
          {t("create_clinic.redirecting")}
        </p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    </>
  );
};

export default Step5Confirmation;
