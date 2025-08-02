// import AuthFooterPrompt from "../../../components/specific/auth/AuthFooterPrompt";
import TitleAuth from "../../../components/specific/auth/TitleAuth";
import OTPVerification from "../components/OTPVerification";
import ResendOTP from "../components/ResendOTP";

const OTPPage = () => {
  return (
    <>
      <TitleAuth text="Verify Your Account" showAppName={false} />
      <span className="text-sm text-gray-500 text-center">
        We’ve sent a verification code to your email or phone. Enter it below to
        complete your Dental Hub sign-up.
      </span>
      <OTPVerification />
      <ResendOTP></ResendOTP>
      {/* <AuthFooterPrompt message={"Didn't recieve code?"} linkText={"Resend"} linkTo={""} /> */}
    </>
  );
};

export default OTPPage;
