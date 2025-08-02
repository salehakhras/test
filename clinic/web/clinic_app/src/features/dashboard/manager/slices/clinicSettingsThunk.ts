import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppLink } from "../../../../AppLink";
import { getData, postData } from "../../../../services/crud";
import {
  clinicInfoResponseSchema,
  getClinicsResponseSchema,
  type ClinicInfoResponse,
  type getClinicsResponse,
} from "../schemas/clinicInfoSchema";
import { StatusRequest } from "../../../../utils/constants/StatusRequest";
import {
  addClinicImageResponseSchema,
  deleteClinicImageResponseSchema,
  getClinicImagesResponseSchema,
  type addClinicImageResponse,
  type deleteClinicImageResponse,
  type getClinicImagesResponse,
} from "../schemas/clinicImagesSchema";

export const getMyClinics = createAsyncThunk<
  getClinicsResponse,
  void,
  { rejectValue: StatusRequest }
>(AppLink.get_my_clinics, async (_, { rejectWithValue }) => {
  const response = await getData<getClinicsResponse>(AppLink.get_my_clinics);
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = getClinicsResponseSchema.safeParse(response.right);
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

export const showClinic = createAsyncThunk<
  ClinicInfoResponse,
  { clinic_id: number },
  { rejectValue: StatusRequest }
>(AppLink.show_clinic, async ({ clinic_id }, { rejectWithValue }) => {
  const response = await postData<ClinicInfoResponse>(AppLink.show_clinic, {
    clinic_id: clinic_id,
  });
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = clinicInfoResponseSchema.safeParse(response.right);
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

export const updateClinic = createAsyncThunk<
  ClinicInfoResponse,
  Record<string, unknown>,
  { rejectValue: StatusRequest }
>(AppLink.update_clinic, async (data, { rejectWithValue }) => {
  const response = await postData<ClinicInfoResponse>(
    AppLink.update_clinic,
    data
  );
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = clinicInfoResponseSchema.safeParse(response.right);
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

export const getClinicImages = createAsyncThunk<
  getClinicImagesResponse,
  { clinic_id: number },
  { rejectValue: StatusRequest }
>(AppLink.get_clinic_images, async ({ clinic_id }, { rejectWithValue }) => {
  const response = await getData<getClinicImagesResponse>(
    AppLink.get_clinic_images,
    { clinic_id: clinic_id }
  );
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = getClinicImagesResponseSchema.safeParse(response.right);
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

export const deleteClinicImage = createAsyncThunk<
  deleteClinicImageResponse,
  { image_id: number },
  { rejectValue: StatusRequest }
>(AppLink.delete_clinic_image, async ({ image_id }, { rejectWithValue }) => {
  const response = await postData<deleteClinicImageResponse>(
    AppLink.delete_clinic_image,
    { image_id: image_id }
  );
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = deleteClinicImageResponseSchema.safeParse(response.right);
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

export const addClinicImage = createAsyncThunk<
  addClinicImageResponse,
  FormData,
  { rejectValue: StatusRequest }
>(AppLink.add_clinic_image, async (FormData, { rejectWithValue }) => {
  const response = await postData<addClinicImageResponse>(
    AppLink.add_clinic_image,
    FormData
  );
  if ("right" in response) {
    console.log("Success:", response.right);
    console.log("typeof response.right:", typeof response.right);
    const parsed = addClinicImageResponseSchema.safeParse(response.right);
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
