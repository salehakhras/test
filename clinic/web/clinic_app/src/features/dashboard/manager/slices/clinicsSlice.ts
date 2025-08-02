import { createSlice } from "@reduxjs/toolkit";
import { StatusRequest } from "../../../../utils/constants/StatusRequest";
import { handlingData } from "../../../../utils/helpers/HadnlingData";
import type { Clinic } from "../schemas/clinicInfoSchema";
import { getMyClinics } from "./clinicSettingsThunk";

interface clinicsState {
  clinics: Clinic[];
  status: StatusRequest;
  error: string | undefined;
}

const initialState: clinicsState = {
  clinics: [],
  status: StatusRequest.none,
  error: undefined,
};

const clinicsSlice = createSlice({
  name: "clinics",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = StatusRequest.none;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      //get clinics
      .addCase(getMyClinics.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(getMyClinics.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          state.clinics = action.payload.data?.clinics || [];
        }
      })
      .addCase(getMyClinics.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("MAAAAAAa:", action.error.message);
      });
  },
});

export const { resetStatus } = clinicsSlice.actions;
export default clinicsSlice.reducer;
