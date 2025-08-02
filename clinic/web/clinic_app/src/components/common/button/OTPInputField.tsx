import OTPInput from "react-otp-input";

interface OTPInputFieldProps {
  otp: string;
  onChange: (otp: string) => void;
}

const OTPInputField = ({ otp, onChange }: OTPInputFieldProps) => {
  return (
    <div className="flex w-full justify-center">
      <OTPInput
        value={otp}
        onChange={onChange}
        numInputs={6}
        renderSeparator={<div className="w-3"></div>}
        inputStyle="!w-10 !h-14 md:!w-12 md:!h-16 border border-gray-400 flex p-2 w-16 text-center rounded-md focus:border-primary focus:border-2  focus:outline-none transition-colors duration-200"
        renderInput={(props) => <input {...props} />}
      />
    </div>
  );
};

export default OTPInputField;
