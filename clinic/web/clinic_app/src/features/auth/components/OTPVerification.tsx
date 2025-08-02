import { useEffect, useRef, useState } from "react";
import ButtonAuth from "../../../components/specific/auth/ButtonAuth";
import OTPInputField from "../../../components/common/button/OTPInputField";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { verify } from "../slices/authThunk";
import { StatusRequest } from "../../../utils/constants/StatusRequest";
import { useNavigate } from "react-router-dom";
import Paths from "../../../routes/Paths";
import { resetStatus } from "../slices/authSlice";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (value: string) => {
    setOtp(value);
  };
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length === 6) {
      hasSubmitted.current = true;
      dispatch(
        verify({
          otp: otp,
        })
      );
    }
  };
  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (hasSubmitted.current && status === StatusRequest.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  useEffect(() => {
    console.log("Sumitted??????", hasSubmitted.current, status);
    if (hasSubmitted.current && status === StatusRequest.success) {
      console.log("otp valid. Navigating...");
      navigate(Paths.dashboard);
    } else {
      hasSubmitted.current = false;
    }
  }, [status, navigate]);

  return (
    <>
      <form className="space-y-5">
        <OTPInputField otp={otp} onChange={handleChange} />
        <ButtonAuth title={"Verify"} onClick={handleSubmit}>
          {isLoading && <span className="loading loading-spinner"></span>}
        </ButtonAuth>
      </form>
    </>
  );
};

export default OTPVerification;
