import { createAsyncThunk } from "@reduxjs/toolkit";
import { StatusRequest } from "../../../utils/constants/StatusRequest";
import { postData } from "../../../services/crud";
import {
  createClinicResponseSchema,
  type CreateClinicResponseSchema,
} from "../schemas/createClinicSchema";
import { AppLink } from "../../../AppLink";

export const storeClinic = createAsyncThunk<
  CreateClinicResponseSchema,
  {
    name: string;
    bio: string;
    phone: string;
    city_name: string;
    street_name: string;
    stripe_token: string;
  },
  { rejectValue: StatusRequest }
>(
  AppLink.store_clinic,
  async (
    { name, bio, phone, city_name, street_name, stripe_token },
    { rejectWithValue }
  ) => {
    const response = await postData<CreateClinicResponseSchema>(
      AppLink.store_clinic,
      {
        name: name,
        bio: bio,
        phone: phone,
        city_name: city_name,
        street_name: street_name,
        stripe_token: stripe_token,
      }
    );
    if ("right" in response) {
      console.log("Success:", response.right);
      console.log("typeof response.right:", typeof response.right);
      const parsed = createClinicResponseSchema.safeParse(response.right);
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
