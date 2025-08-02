import Step5Confirmation from "../features/createClinic/components/Step5Confirmation";
import Button from "../components/common/button/button";
import Step1ClinicIntro from "../features/createClinic/components/Step1ClinicIntro";
import Step2ClinicInfo from "../features/createClinic/components/Step2ClinicInfo";
import Step3ContactAndAddress from "../features/createClinic/components/Step3ContactAndAddress";
import { type PhoneCodeInterface } from "../utils/constants/PhoneCodes";
import StepList from "../components/specific/CreateClinic/StepList";
import { useCreateClinic } from "../features/createClinic/hooks/useCreateClinic";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { handleConfirmAndPay } from "../features/createClinic/hooks/handleConfirmAndPay";
import { useTranslation } from "react-i18next";

export interface ClinicFormData {
  name: string;
  bio: string;
  selectedCode: PhoneCodeInterface;
  phone: string;
  city_name: string;
  street_name: string;
}

const CreateClinicPage = () => {
  const { t } = useTranslation();

  const {
    formData,
    errors,
    step,
    handlePhoneCodeChange,
    handleInputChange,
    nextStep,
    prevStep,
  } = useCreateClinic();

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.create_clinic);
  const onSubmit = handleConfirmAndPay({
    formData,
    dispatch,
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1ClinicIntro />;
      case 2:
        return (
          <Step2ClinicInfo
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3ContactAndAddress
            data={formData}
            onChange={handleInputChange}
            onCodeSelect={handlePhoneCodeChange}
            errors={errors}
          />
        );
      // case 4:
      //   return (
      //     <Step4WorkingHours data={formData} onChange={handleInputChange} />
      //   );
      case 4:
        return <Step5Confirmation data={formData} error={error} />;
    }
  };
  return (
    <div className="h-screen sm:bg-base-100 bg-base-200">
      <div className="justify-center w-full p-2 mb-5 lg:flex items-center hidden ">
        <ul className="steps w-full">
          <StepList
            title={t("create_clinic.get_started")}
            isPrimary={step >= 1}
          />
          <StepList
            title={t("create_clinic.clinic_info")}
            isPrimary={step >= 2}
          />
          <StepList
            title={t("create_clinic.contact_address")}
            isPrimary={step >= 3}
          />
          {/* <StepList
            title={t("create_clinic.working_hours")}
            isPrimary={step >= 4}
          /> */}
          <StepList
            title={t("create_clinic.confirmation")}
            isPrimary={step >= 4}
          />
        </ul>
      </div>
      <div className="flex justify-center items-center min-h-fit">
        <div className=" bg-base-200 sm:shadow-md p-10 items-center flex flex-col space-y-5 h-full sm:h-fit w-full sm:w-fit ">
          <div className="flex flex-col sm:w-fit sm:min-w-85 space-y-5">
            {renderStep()}
            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <Button
                  title={t("back")}
                  onClick={prevStep}
                  isPrimary={false}
                  color="bg-base-300"
                ></Button>
              )}
              {step < 4 && step > 1 ? (
                <Button
                  title={t("next")}
                  onClick={nextStep}
                  isPrimary={true}
                ></Button>
              ) : step === 1 ? (
                <Button
                  title={t("create_clinic.get_started")}
                  onClick={nextStep}
                  isPrimary={true}
                  isWidthFull={true}
                ></Button>
              ) : (
                <Button
                  title={t("create_clinic.confirm_pay")}
                  onClick={onSubmit}
                  color="bg-green-600"
                  textColor="text-white"
                ></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClinicPage;
