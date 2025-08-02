import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import createClinicReducer from "../features/createClinic/slices/createClinicSlice";
import languageReducer from "./slices/languageSlice";
import getClinics from "../features/dashboard/manager/slices/clinicsSlice";
import clinicInfo from "../features/dashboard/manager/slices/clinicSettingsSlice";
import clinicStaff from "../features/dashboard/manager/slices/clinicStaffSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
    create_clinic: createClinicReducer,
    my_clinics: getClinics,
    clinic_info: clinicInfo,
    clinic_staff: clinicStaff,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
