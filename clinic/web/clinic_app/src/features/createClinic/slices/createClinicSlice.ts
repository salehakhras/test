import { createSlice } from "@reduxjs/toolkit";
import { StatusRequest } from "../../../utils/constants/StatusRequest";
import { storeClinic } from "./createClinicThunk";
import { handlingData } from "../../../utils/helpers/HadnlingData";
import { useTranslation } from "react-i18next";

interface CreateClinicState {
  status: StatusRequest;
  error: string | undefined;
}

const initialState: CreateClinicState = {
  status: StatusRequest.none,
  error: undefined,
};

const createClinicSlice = createSlice({
  name: "create_clinic",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = StatusRequest.none;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeClinic.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(storeClinic.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
        console.log("+++++++++++status", state.status);
        if (state.status === StatusRequest.success) {
          const checkoutUrl = action.payload.data?.checkout_url;
          if (checkoutUrl) {
            window.location.href = checkoutUrl;
          } else {
            const { t } = useTranslation();

            state.error = t("create_clinic.try_again");
            state.status = StatusRequest.serverFailure;
          }
        }
      })
      .addCase(storeClinic.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        const { t } = useTranslation();

        state.error = t("create_clinic.try_again");
        console.log("MAAAAAAa:", action.error.message);
      });
  },
});

export const { resetStatus } = createClinicSlice.actions;
export default createClinicSlice.reducer;
