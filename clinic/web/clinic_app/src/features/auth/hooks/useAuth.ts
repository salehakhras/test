import { useState } from "react";
import { AuthMethod } from "../../../utils/constants/constants";

const useAuth = () => {
  const [authMethod, setAuthMethod] = useState(AuthMethod.Phone);
  const handleAuthMethod = (method: string) => {
    setAuthMethod(method);
  };

  return {
    authMethod,
    handleAuthMethod,
  };
};

export default useAuth;
