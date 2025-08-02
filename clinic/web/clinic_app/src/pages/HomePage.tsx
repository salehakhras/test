import { Outlet, Link } from "react-router-dom";
import Paths from "../routes/Paths";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import LanguageDropdown from "../components/common/languageDropDown";
import { useTranslation } from "react-i18next";
import { handleLogout } from "../features/auth/hooks/handleLogout";

const HomePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onLogout = handleLogout({ dispatch });
  return (
    <>
      <nav className="navbar bg-primary light:shadow-md  dark:bg-base-100">
        <Link className="flex-1 text-lg text-white textbold" to={Paths.base}>
          {t("dental_hub")}
        </Link>
        <LanguageDropdown></LanguageDropdown>
        {!user ? (
          <div className="flex items-center space-x-6 text-white">
            <Link
              className="p-1 hover:text-blue-200 transition-colors"
              to={Paths.signupPage}
            >
              <span>{t("auth.signup")}</span>
            </Link>
            <Link
              className="p-1 hover:text-blue-200 transition-colors"
              to={Paths.loginPage}
            >
              <span>{t("auth.login")}</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-3 text-white">
            <button
              type="button"
              className=" px-3 py-1 hover:text-blue-200 transition-colors"
              onClick={onLogout}
            >
              <span>{t("auth.logout")}</span>
            </button>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default HomePage;
