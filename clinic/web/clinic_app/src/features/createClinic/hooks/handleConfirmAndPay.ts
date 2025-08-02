import type { ClinicFormData } from "../../../pages/CreateClinicPage";
import type { AppDispatch } from "../../../store/store";
import { storeClinic } from "../slices/createClinicThunk";

interface createClinicPayLoad {
  formData: ClinicFormData;
  dispatch: AppDispatch;
}

export const handleConfirmAndPay =
  ({ formData, dispatch }: createClinicPayLoad) =>
  async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      storeClinic({
        name: formData.name,
        bio: formData.bio,
        phone: formData.selectedCode.code + formData.phone,
        city_name: formData.city_name,
        street_name: formData.street_name,
        stripe_token: "tok_visa_123456",
      })
    );
  };
