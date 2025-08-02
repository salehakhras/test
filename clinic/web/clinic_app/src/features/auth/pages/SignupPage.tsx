// import { FcGoogle } from "react-icons/fc";
import AuthMethodButton from "../../../components/specific/auth/AuthMethodButton";
import TextMiddleLine from "../../../components/specific/auth/TextMiddleLine";
import TitleAuth from "../../../components/specific/auth/TitleAuth";
import { MdOutlineMail, MdOutlinePhoneAndroid } from "react-icons/md";
import AuthFooterPrompt from "../../../components/specific/auth/AuthFooterPrompt";
import Paths from "../../../routes/Paths";
import { AuthMethod } from "../../../utils/constants/constants";
import SignupForm from "../components/SignupForm";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const SignupPage = () => {
  const { t } = useTranslation();

  const { authMethod, handleAuthMethod } = useAuth();
  return (
    <>
      <TitleAuth text={t("auth.welcome")} showAppName={true} />
      <SignupForm signupMethod={authMethod} />
      {/* SIGNUP ALTERNATIVES LINE */}
      <TextMiddleLine text={t("auth.singup_with")} />
      <div className="flex flex-row w-full justify-center space-x-3">
        {/***********Google Button*************/}
        {/* {authMethod !== AuthMethod.Google && (
          <AuthMethodButton
            onClick={() => handleAuthMethod(AuthMethod.Google)}
            authMethodText={"Google"}
            Icon={FcGoogle}
          ></AuthMethodButton>
        )} */}
        {/***********Email Button*************/}
        {authMethod !== AuthMethod.Email && (
          <AuthMethodButton
            onClick={() => handleAuthMethod(AuthMethod.Email)}
            authMethodText={t("credintals.email")}
            Icon={MdOutlineMail}
          ></AuthMethodButton>
        )}
        {/***********Phone Button*************/}
        {authMethod !== AuthMethod.Phone && (
          <AuthMethodButton
            onClick={() => handleAuthMethod(AuthMethod.Phone)}
            authMethodText={t("credintals.phone")}
            Icon={MdOutlinePhoneAndroid}
          ></AuthMethodButton>
        )}
      </div>
      {/*SIGN UP OPTION*/}
      <AuthFooterPrompt
        message={t("auth.already_have_account")}
        linkText={t("auth.login")}
        linkTo={Paths.loginPage}
      ></AuthFooterPrompt>
    </>
  );
};

export default SignupPage;
