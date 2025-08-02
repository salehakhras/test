import { useEffect, useState } from "react";
import { AuthMethod } from "../../../utils/constants/constants";
import {
  phoneCodes,
  type PhoneCodeInterface,
} from "../../../utils/constants/PhoneCodes";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../../utils/helpers/validation";
import { useTranslation } from "react-i18next";

const useForm = (authMethod: AuthMethod, isLogin: boolean) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [selectedCode, setSelectedCode] = useState<PhoneCodeInterface>(
    phoneCodes.syria
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSelectedCode = (
    country: PhoneCodeInterface,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();
    setSelectedCode(country);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!isLogin && (!formData.name || !validateName(formData.name)))
      newErrors.name = t("validation.name");
    if (!formData.password || !validatePassword(formData.password))
      newErrors.password = t("validation.password");
    if (formData.email && !validateEmail(formData.email))
      newErrors.email = t("validation.email");
    if (
      authMethod == AuthMethod.Phone &&
      !validatePhone(
        selectedCode.code + formData.phone,
        selectedCode.countryCode
      )
    )
      newErrors.phone = t("validation.phone");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
    setErrors({});
  }, [authMethod]);

  return {
    showPassword,
    handleShowPassword,
    authMethod,
    // handleAuthMethod,
    formData,
    selectedCode,
    handleSelectedCode,
    handleInputChange,
    validateForm,
    errors,
  };
};

export default useForm;
