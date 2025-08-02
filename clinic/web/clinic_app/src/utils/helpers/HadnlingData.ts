import { StatusRequest } from "../constants/StatusRequest";

const isStatusRequest = (value: unknown): value is StatusRequest => {
  return Object.values(StatusRequest).includes(value as StatusRequest);
};

export const handlingData = (response: unknown) => {
 if (isStatusRequest(response)) {
    return response; // response is a known status
  } else {
    return(StatusRequest.success); // assume success if not a known status
  }
}