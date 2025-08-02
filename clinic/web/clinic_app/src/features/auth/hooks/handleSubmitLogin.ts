import type { AppDispatch } from "../../../store/store";
import { AuthMethod } from "../../../utils/constants/constants";
import type { PhoneCodeInterface } from "../../../utils/constants/PhoneCodes";
import type { StatusRequest } from "../../../utils/constants/StatusRequest";
import { loginEmail, loginPhone } from "../slices/authThunk";

interface LoginPayLoad {
  formData: {
    email: string;
    phone: string;
    password: string;
  };
  selectedCode: PhoneCodeInterface;
  loginMethod: AuthMethod;
  dispatch: AppDispatch;
  validateForm: () => boolean;
  status: StatusRequest;
}

export const handleSubmitLogin =
  ({
    formData,
    selectedCode,
    loginMethod,
    dispatch,
    validateForm,
  }: LoginPayLoad) =>
  async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (loginMethod === AuthMethod.Email) {
      dispatch(
        loginEmail({
          email: formData.email,
          password: formData.password,
          fcm_token: "fcm_token_example_123456789",
        })
      );
    } else {
      dispatch(
        loginPhone({
          number: selectedCode.code + formData.phone,
          password: formData.password,
          fcm_token: "fcm_token_example_123456789",
        })
      );
    }
  };
