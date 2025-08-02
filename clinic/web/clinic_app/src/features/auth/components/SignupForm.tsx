import {
  MdOutlineMail,
  MdOutlinePassword,
  MdOutlinePhoneAndroid,
  MdPerson,
} from "react-icons/md";
import { AuthMethod } from "../../../utils/constants/constants";
import InputField from "../../../components/common/InputField";
import ButtonAuth from "../../../components/specific/auth/ButtonAuth";
import { useNavigate } from "react-router-dom";
import Paths from "../../../routes/Paths";
import PhoneCodesDropdown from "../../../components/common/PhoneCodesDropdown";
import useForm from "../hooks/useForm";
import { useEffect, useState } from "react";
import { StatusRequest } from "../../../utils/constants/StatusRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { handleSubmitSignup } from "../hooks/handleSubmitSignup";
import { useTranslation } from "react-i18next";

interface SignupFormProps {
  signupMethod: string;
}

const SignupForm = ({ signupMethod }: SignupFormProps) => {
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
  } = useForm(signupMethod, false);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmitSignup({
    formData,
    selectedCode,
    signupMethod,
    dispatch,
    validateForm,
    status,
  });

  useEffect(() => {
    if (status === StatusRequest.success) {
      console.log("Form valid. Navigating...");
      navigate(Paths.verifyPage);
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
    <form className="space-y-3">
      {/***********Name*************/}
      <InputField
        labelName={t("credintals.full_name")}
        type="text"
        placeholder=""
        Icon={MdPerson}
        value={formData.name}
        onChange={handleInputChange("name")}
        error={errors.name}
      ></InputField>
      {
        /***********Email************/
        signupMethod === AuthMethod.Email ? (
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
        signupMethod === AuthMethod.Phone ? (
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

      {/* LOGIN BUTTON */}
      {status === StatusRequest.serverFailure && (
        <span className="text-red">
          {" "}
          {signupMethod.charAt(0).toUpperCase() + signupMethod.slice(1)} Already
          exists.
        </span>
      )}
      <ButtonAuth title={t("auth.signup")} onClick={onSubmit}>
        {isLoading && <span className="loading loading-spinner"></span>}
      </ButtonAuth>
    </form>
  );
};

export default SignupForm;
