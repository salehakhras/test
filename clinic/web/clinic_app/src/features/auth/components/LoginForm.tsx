import {
  MdOutlineMail,
  MdOutlinePassword,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import InputField from "../../../components/common/InputField";
import ButtonAuth from "../../../components/specific/auth/ButtonAuth";
import useForm from "../hooks/useForm";
import { AuthMethod } from "../../../utils/constants/constants";
import PhoneCodesDropdown from "../../../components/common/PhoneCodesDropdown";
import { useEffect, useState } from "react";
import { handleSubmitLogin } from "../hooks/handleSubmitLogin";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { StatusRequest } from "../../../utils/constants/StatusRequest";
import Paths from "../../../routes/Paths";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  loginMethod: string;
}

const LoginForm = ({ loginMethod }: LoginFormProps) => {
  const { t } = useTranslation();

  const {
    showPassword,
    handleShowPassword,
    formData,
    selectedCode,
    errors,
    handleSelectedCode,
    handleInputChange,
    validateForm,
  } = useForm(loginMethod, true);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = handleSubmitLogin({
    formData,
    selectedCode,
    loginMethod,
    dispatch,
    validateForm,
    status,
  });

  useEffect(() => {
    console.log("status", status);

    if (status === StatusRequest.success) {
      console.log("Form valid. Navigating...");
      console.log(status);
      navigate(Paths.dashboard, { replace: true });
    }
  }, [navigate, status]);

  useEffect(() => {
    if (status === StatusRequest.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  return (
    <form className="space-y-4">
      {
        /***********Email************/
        loginMethod === AuthMethod.Email ? (
          <InputField
            labelName={t("credintals.email")}
            type="text"
            placeholder=""
            Icon={MdOutlineMail}
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
          ></InputField>
        ) : /***********Phone************/
        loginMethod === AuthMethod.Phone ? (
          // <div className="flex flex-row">
          <InputField
            labelName={t("credintals.phone")}
            type="tel"
            placeholder="9-999-999-99"
            Icon={MdOutlinePhoneAndroid}
            value={formData.phone}
            onChange={handleInputChange("phone")}
            error={errors.phone}
          >
            <PhoneCodesDropdown
              selectedCode={selectedCode}
              onSelect={handleSelectedCode}
            />
          </InputField>
        ) : (
          <></>
        )
      }
      {/***********Password*************/}
      <InputField
        labelName={t("credintals.password")}
        type="password"
        placeholder=""
        obscureText={!showPassword}
        Icon={MdOutlinePassword}
        onClickIcon={handleShowPassword}
        value={formData.password}
        onChange={handleInputChange("password")}
        error={errors.password}
      ></InputField>
      {/*Forgot Password*/}
      <div>
        <a className="text-primary font-bold" href="">
          {t("auth.forgot_password")}
        </a>
      </div>

      {/* LOGIN BUTTON */}
      <ButtonAuth title={t("auth.login")} onClick={onSubmit}>
        {isLoading && <span className="loading loading-spinner"></span>}
      </ButtonAuth>
    </form>
  );
};
export default LoginForm;
