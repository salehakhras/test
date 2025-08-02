import { createSlice } from "@reduxjs/toolkit";
import { StatusRequest } from "../../../../utils/constants/StatusRequest";
import { handlingData } from "../../../../utils/helpers/HadnlingData";
import type { Clinic } from "../schemas/clinicInfoSchema";
import {
  addClinicImage,
  deleteClinicImage,
  getClinicImages,
  showClinic,
  updateClinic,
} from "./clinicSettingsThunk";
import type { imagesModel } from "../schemas/clinicImagesSchema";

interface clinicSettingsState {
  clinic: null | Clinic;
  images: imagesModel[];
  status: StatusRequest;
  error: string | undefined;
}

const initialState: clinicSettingsState = {
  clinic: null,
  images: [],
  status: StatusRequest.none,
  error: undefined,
};

const clinicSettingsSlice = createSlice({
  name: "clinic_info",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = StatusRequest.none;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      //get clinic
      .addCase(showClinic.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(showClinic.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          state.clinic = action.payload.data?.clinic;
        }
        state.status = StatusRequest.none;
      })
      .addCase(showClinic.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("error:", action.error.message);
      })
      //update clinic
      .addCase(updateClinic.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(updateClinic.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          state.clinic = action.payload.data?.clinic;
        }
        state.status = StatusRequest.none;
      })
      .addCase(updateClinic.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("error:", action.error.message);
      })
      //get images
      .addCase(getClinicImages.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(getClinicImages.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          state.images = action.payload.data.images;
        }
        state.status = StatusRequest.none;
      })
      .addCase(getClinicImages.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("error:", action.error.message);
      })
      //delete image
      .addCase(deleteClinicImage.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(deleteClinicImage.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          const deletedImageId = action.meta.arg.image_id;
          state.images = state.images.filter(
            (img) => img.id !== deletedImageId
          );
        }
        state.status = StatusRequest.none;
      })
      .addCase(deleteClinicImage.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("error:", action.error.message);
      })
      //upload image
      .addCase(addClinicImage.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(addClinicImage.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        if (state.status === StatusRequest.success) {
          state.images.unshift(action.payload.data.images[0]);
        }
        state.status = StatusRequest.none;
      })
      .addCase(addClinicImage.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("error:", action.error.message);
      });
  },
});

export const { resetStatus } = clinicSettingsSlice.actions;
export default clinicSettingsSlice.reducer;
