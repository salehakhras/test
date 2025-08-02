import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { resetStatus } from "../slices/authSlice";
import { resendOtp } from "../slices/authThunk";

const ResendOTP = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const onClick = () => {
    dispatch(resendOtp());
    setDisabled(true);
    setCountdown(10); // start countdown
  };
  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (disabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0 && disabled) {
      setDisabled(false);
    }

    return () => clearTimeout(timer);
  }, [countdown, disabled]);

  return (
    <div>
      <span className="text-gray-500">Didn't recieve code?</span>
      <button
        className="btn btn-link no-underline text-primary font-bold align-baseline"
        onClick={onClick}
        disabled={disabled}
      >
        {disabled ? `Resend in ${countdown}s` : "Resend"}
        {/* <span className="text-primary font-bold"> Resend </span> */}
      </button>
    </div>
  );
};

export default ResendOTP;
