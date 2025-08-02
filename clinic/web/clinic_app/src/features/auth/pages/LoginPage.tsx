import { MdOutlineMail, MdOutlinePhoneAndroid } from "react-icons/md";
import AuthMethodButton from "../../../components/specific/auth/AuthMethodButton";
import Paths from "../../../routes/Paths";
import TitleAuth from "../../../components/specific/auth/TitleAuth";
import TextMiddleLine from "../../../components/specific/auth/TextMiddleLine";
import AuthFooterPrompt from "../../../components/specific/auth/AuthFooterPrompt";
// import { useGoogleLogin } from "@react-oauth/google";
// import { FcGoogle } from "react-icons/fc";
import LoginForm from "../components/LoginForm";
import { AuthMethod } from "../../../utils/constants/constants";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();

  const { authMethod, handleAuthMethod } = useAuth();
  // const loginWithGoogle = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     console.log(tokenResponse);
  //   },
  //   onError: () => {
  //     console.log("Login Failed");
  //   },
  // });
  return (
    <>
      <TitleAuth text={t("auth.welcome_back")} showAppName={true} />
      <LoginForm loginMethod={authMethod} />

      {/* LOGIN ALTERNATIVES LINE */}
      <TextMiddleLine text={t("auth.login_with")} />

      {/*LOGIN METHOD BUTTONS*/}
      <div className="flex flex-row w-full justify-center space-x-3">
        {/***********Google Button*************/}
        {/* {authMethod !== AuthMethod.Google && (
          <AuthMethodButton
            onClick={() => loginWithGoogle()}
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
        message={t("auth.don't_have_account")}
        linkText={t("auth.signup")}
        linkTo={Paths.signupPage}
      ></AuthFooterPrompt>
    </>
  );
};

export default LoginPage;
