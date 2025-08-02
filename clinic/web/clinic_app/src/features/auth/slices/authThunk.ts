import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppLink } from "../../../AppLink";
import { postData } from "../../../services/crud";
import { authResponseSchema, type AuthResponse } from "../schemas/authSchemas";
import { StatusRequest } from "../../../utils/constants/StatusRequest";

export const fetchUser = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: StatusRequest }
>(AppLink.fetchUser, async (_, { rejectWithValue }) => {
  const response = await postData<AuthResponse>(AppLink.fetchUser, {});
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = authResponseSchema.safeParse(response.right);
    console.log("Parse error:", parsed.error);
    if (!parsed.success) {
      return rejectWithValue(StatusRequest.invalidData);
    }
    return parsed.data;
  } else {
    console.error("Error:", response.left);
    return rejectWithValue(response.left);
  }
});

export const signUpEmail = createAsyncThunk<
  AuthResponse,
  { email: string; name: string; password: string; fcm_token: string },
  { rejectValue: StatusRequest }
>(
  AppLink.emailSignup,
  async ({ email, name, password, fcm_token }, { rejectWithValue }) => {
    const response = await postData<AuthResponse>(AppLink.emailSignup, {
      email: email,
      name: name,
      password: password,
      fcm_token: fcm_token,
    });
    if ("right" in response) {
      console.log("Success:", response.right);
      console.log("typeof response.right:", typeof response.right);
      const parsed = authResponseSchema.safeParse(response.right);
      console.log("Parse error:", parsed.error);
      if (!parsed.success) {
        return rejectWithValue(StatusRequest.invalidData);
      }
      return parsed.data;
    } else {
      console.error("Error:", response.left);
      return rejectWithValue(response.left);
    }
  }
);
export const signUpPhone = createAsyncThunk<
  AuthResponse,
  { number: string; name: string; password: string; fcm_token: string },
  { rejectValue: StatusRequest }
>(
  AppLink.phoneSignup,
  async ({ number, name, password, fcm_token }, { rejectWithValue }) => {
    const response = await postData<AuthResponse>(AppLink.emailSignup, {
      number: number,
      name: name,
      password: password,
      fcm_token: fcm_token,
    });
    if ("right" in response) {
      console.log("Success:", response.right);
      console.log("typeof response.right:", typeof response.right);
      const parsed = authResponseSchema.safeParse(response.right);
      console.log("Parse error:", parsed.error);
      if (!parsed.success) {
        return rejectWithValue(StatusRequest.invalidData);
      }
      return parsed.data;
    } else {
      console.error("Error:", response.left);
      return rejectWithValue(response.left);
    }
  }
);

export const loginEmail = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; fcm_token: string },
  { rejectValue: StatusRequest }
>(
  AppLink.emailLogin,
  async ({ email, password, fcm_token }, { rejectWithValue }) => {
    const response = await postData<AuthResponse>(AppLink.emailLogin, {
      email: email,
      password: password,
      fcm_token: fcm_token,
    });
    if ("right" in response) {
      console.log("Success:", response.right);
      console.log("typeof response.right:", typeof response.right);
      const parsed = authResponseSchema.safeParse(response.right);
      console.log("Parse error:", parsed.error);
      if (!parsed.success) {
        return rejectWithValue(StatusRequest.invalidData);
      }
      return parsed.data;
    } else {
      console.error("Error:", response.left);
      return rejectWithValue(response.left);
    }
  }
);

export const loginPhone = createAsyncThunk<
  AuthResponse,
  { number: string; password: string; fcm_token: string },
  { rejectValue: StatusRequest }
>(
  AppLink.phoneLogin,
  async ({ number, password, fcm_token }, { rejectWithValue }) => {
    const response = await postData<AuthResponse>(AppLink.phoneLogin, {
      number: number,
      password: password,
      fcm_token: fcm_token,
    });
    if ("right" in response) {
      console.log("Success:", response.right);
      const parsed = authResponseSchema.safeParse(response.right);
      if (!parsed.success) {
        return rejectWithValue(StatusRequest.invalidData);
      }
      return parsed.data;
    } else {
      console.error("Error:", response.left);
      return rejectWithValue(response.left);
    }
  }
);

export const verify = createAsyncThunk<
  AuthResponse,
  { otp: string },
  { rejectValue: StatusRequest }
>(AppLink.verify_otp, async ({ otp }, { rejectWithValue }) => {
  const response = await postData<AuthResponse>(AppLink.verify_otp, {
    otp: otp,
  });
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = authResponseSchema.safeParse(response.right);
    console.log("Parse error:", parsed.error);
    if (!parsed.success) {
      return rejectWithValue(StatusRequest.invalidData);
    }
    return parsed.data;
  } else {
    console.error("Error:", response.left);
    return rejectWithValue(response.left);
  }
});

export const resendOtp = createAsyncThunk(AppLink.resend_otp, async () => {
  const response = await postData(AppLink.resend_otp, {});
  if ("right" in response) {
    console.log("Success:", response.right);
    return response.right;
  } else {
    console.error("Error:", response.left);
    return response.left;
  }
});

export const logout = createAsyncThunk(AppLink.logout, async () => {
  const response = await postData(AppLink.logout, {});
  if ("right" in response) {
    console.log("Success:", response.right);
    return response.right;
  } else {
    console.error("Error:", response.left);
    return response.left;
  }
});
