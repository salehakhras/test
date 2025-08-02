import axios, { type AxiosResponse } from "axios";
import { StatusRequest } from "../utils/constants/StatusRequest";

// const checkInternet = (): boolean => {
//   return window.navigator.onLine;
// };

export type Either<L, R> =
  | { left: L; right?: never }
  | { right: R; left?: never };

export const postData = async <T>(
  linkUrl: string,
  data: Record<string, unknown> | FormData
): Promise<Either<StatusRequest, T>> => {
  try {
    const isFormData = data instanceof FormData;
    const headers: Record<string, string> = {
      Accept: "application/json",
      "X-Client-Type": "web",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };
    const response: AxiosResponse<T> = await axios.post(linkUrl, data, {
      headers,
      withCredentials: true,
    });
    console.log("+++++++++++++++++", response.status);
    console.log("+++++++++++++++++", response.data);
    if (response.status === 200 || response.status === 201) {
      if (typeof response.data === "string") {
        console.warn("🚨 Response data is a string! Attempting to parse...");
        try {
          const parsed = JSON.parse(response.data);
          return { right: parsed as T };
        } catch (e) {
          console.error("❌ Failed to parse string response as JSON", e);
          return { left: StatusRequest.invalidData };
        }
      }
      return { right: response.data };
    } else {
      return { left: StatusRequest.serverFailure };
    }
  } catch (e) {
    console.error("Error:", e);
    return { left: StatusRequest.serverException };
  }
};

export const getData = async <T>(
  linkUrl: string,
  data?: Record<string, unknown>
): Promise<Either<StatusRequest, T>> => {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Client-Type": "web",
    };
    const response: AxiosResponse<T> = await axios.get(linkUrl, {
      headers,
      withCredentials: true,
      params: data,
    });
    console.log("+++++++++++++++++", response.status);
    console.log("+++++++++++++++++", response.data);
    if (response.status === 200 || response.status === 201) {
      if (typeof response.data === "string") {
        console.warn("🚨 Response data is a string! Attempting to parse...");
        try {
          const parsed = JSON.parse(response.data);
          return { right: parsed as T };
        } catch (e) {
          console.error("❌ Failed to parse string response as JSON", e);
          return { left: StatusRequest.invalidData };
        }
      }
      return { right: response.data };
    } else {
      return { left: StatusRequest.serverFailure };
    }
  } catch (e) {
    console.error("Error:", e);
    return { left: StatusRequest.serverException };
  }
};
