import { useTranslation } from "react-i18next";

interface TitleAutProps {
  text: string;
  showAppName: boolean;
}

const TitleAuth = ({ text, showAppName }: TitleAutProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full text-center">
      <h1 className="font-bold align-middle text-xl sm:text-2xl">
        {text}
        {showAppName && (
          <span className="text-primary"> {t("dental_hub")}</span>
        )}
        !
      </h1>
    </div>
  );
};

export default TitleAuth;
