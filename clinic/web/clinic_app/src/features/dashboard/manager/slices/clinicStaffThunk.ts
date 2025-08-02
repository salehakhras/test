import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppLink } from "../../../../AppLink";
import { getData, postData } from "../../../../services/crud";
import { StatusRequest } from "../../../../utils/constants/StatusRequest";
import {
  type addClinicStaffReponse,
  addClinicStaffReponseSchema,
  type getDoctorsResponse,
  getDoctorsResponseSchema,
  type getSecretariesResponse,
  getSecretariesResponseSchema,
} from "../schemas/clinicStaffSchema";
import type { workingHourModel } from "../../../../utils/constants/models/workingHoursModel";

export const getClinicDoctors = createAsyncThunk<
  getDoctorsResponse,
  { clinic_id: number },
  { rejectValue: StatusRequest }
>(AppLink.get_clinic_doctors, async ({ clinic_id }, { rejectWithValue }) => {
  const response = await getData<getDoctorsResponse>(
    AppLink.get_clinic_doctors,
    { clinic_id: clinic_id }
  );
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = getDoctorsResponseSchema.safeParse(response.right);
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

export const getClinicSecretaries = createAsyncThunk<
  getSecretariesResponse,
  { clinic_id: number },
  { rejectValue: StatusRequest }
>(
  AppLink.get_clinic_secretaries,
  async ({ clinic_id }, { rejectWithValue }) => {
    const response = await getData<getSecretariesResponse>(
      AppLink.get_clinic_secretaries,
      { clinic_id: clinic_id }
    );
    if ("right" in response) {
      console.log("Success:", response.right);
      console.log("typeof response.right:", typeof response.right);
      const parsed = getSecretariesResponseSchema.safeParse(response.right);
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

export const addClinicStaff = createAsyncThunk<
  addClinicStaffReponse,
  {
    clinic_id: number;
    email_or_phone: string;
    role: string;
    working_hours: workingHourModel[];
  },
  { rejectValue: StatusRequest }
>(
  AppLink.add_clinic_staff,
  async (
    { clinic_id, email_or_phone, role, working_hours },
    { rejectWithValue }
  ) => {
    const response = await postData<addClinicStaffReponse>(
      AppLink.add_clinic_staff,
      {
        clinic_id: clinic_id,
        email_or_phone: email_or_phone,
        role: role,
        working_hours: working_hours,
      }
    );
    if ("right" in response) {
      console.log("Success:", response.right);
      const parsed = addClinicStaffReponseSchema.safeParse(response.right);
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
