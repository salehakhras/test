export const StatusRequest = {
  none: "NONE",
  loading: "LOADING",
  success: "SUCCESS",
  serverFailure: "SERVER_FAILURE",
  offlineFailure: "OFFLINE_FAILURE",
  serverException: "SERVER_EXCEPTION",
  invalidData: "INVALID_DATA"
};
export type StatusRequest = (typeof StatusRequest)[keyof typeof StatusRequest];
