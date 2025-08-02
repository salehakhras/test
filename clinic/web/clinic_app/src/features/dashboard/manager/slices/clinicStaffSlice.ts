import { createSlice } from "@reduxjs/toolkit";
import { StatusRequest } from "../../../../utils/constants/StatusRequest";
import { handlingData } from "../../../../utils/helpers/HadnlingData";
import type { doctorModel, secretaryModel } from "../schemas/clinicStaffSchema";
import {
  addClinicStaff,
  getClinicDoctors,
  getClinicSecretaries,
} from "./clinicStaffThunk";

interface clinicStaffState {
  doctors: doctorModel[];
  secretaries: secretaryModel[];
  status: StatusRequest;
  error: string | undefined;
}

const initialState: clinicStaffState = {
  doctors: [],
  secretaries: [],
  status: StatusRequest.none,
  error: undefined,
};

const clinicStaffSlice = createSlice({
  name: "clinic_staff",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = StatusRequest.none;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      //get doctors
      .addCase(getClinicDoctors.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(getClinicDoctors.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          state.doctors = action.payload.data?.doctors || [];
        }
      })
      .addCase(getClinicDoctors.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("MAAAAAAa:", action.error.message);
      })
      //get secretaries
      .addCase(getClinicSecretaries.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(getClinicSecretaries.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          state.secretaries = action.payload.data?.secretaries || [];
        }
      })
      .addCase(getClinicSecretaries.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("MAAAAAAa:", action.error.message);
      })
      //add staff
      .addCase(addClinicStaff.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(addClinicStaff.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          state.status = StatusRequest.none;
        }
      })
      .addCase(addClinicStaff.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("MAAAAAAa:", action.error.message);
      });
  },
});

export const { resetStatus } = clinicStaffSlice.actions;
export default clinicStaffSlice.reducer;
