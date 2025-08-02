import type { AppDispatch } from "../../../store/store";
import { AuthMethod } from "../../../utils/constants/constants";
import type { PhoneCodeInterface } from "../../../utils/constants/PhoneCodes";
import type { StatusRequest } from "../../../utils/constants/StatusRequest";
import { signUpEmail, signUpPhone } from "../slices/authThunk";

interface SignupPayload {
  formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
  selectedCode: PhoneCodeInterface;
  signupMethod: AuthMethod;
  dispatch: AppDispatch;
  validateForm: () => boolean;
  status: StatusRequest;
}

export const handleSubmitSignup =
  ({
    formData,
    selectedCode,
    signupMethod,
    dispatch,
    validateForm,
  }: SignupPayload) =>
  async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (signupMethod === AuthMethod.Email) {
      dispatch(
        signUpEmail({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          fcm_token: "fcm_token_example_123456789",
        })
      );
    } else {
      dispatch(
        signUpPhone({
          number: selectedCode.code + formData.phone,
          name: formData.name,
          password: formData.password,
          fcm_token: "fcm_token_example_123456789",
        })
      );
    }
  };
