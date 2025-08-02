import { createSlice } from "@reduxjs/toolkit";
import { StatusRequest } from "../../../utils/constants/StatusRequest";
import {
  signUpEmail,
  signUpPhone,
  loginEmail,
  loginPhone,
  verify,
  resendOtp,
  logout,
  fetchUser,
} from "./authThunk";
import { handlingData } from "../../../utils/helpers/HadnlingData";

interface roleInterface {
  id: number;
  name: string;
}

interface AuthState {
  user: null | {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    roles: roleInterface[];
    isVerified: boolean;
  };
  status: StatusRequest;
  fetchUserStatus: StatusRequest;
  error: string | undefined;
}

const initialState: AuthState = {
  user: null,
  status: StatusRequest.none,
  error: undefined,
  fetchUserStatus: StatusRequest.loading,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = StatusRequest.none;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch user
      .addCase(fetchUser.pending, (state) => {
        state.fetchUserStatus = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchUserStatus = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
        console.log("+++++++++++status", state.fetchUserStatus);
        if (state.fetchUserStatus === StatusRequest.success) {
          const userdata = action.payload.data?.user;
          state.user = {
            id: userdata.id,
            name: userdata.name,
            email: userdata?.email ?? undefined,
            phone: userdata?.number ?? undefined,
            roles: userdata?.roles
              ? userdata.roles.map((role) => ({ id: role.id, name: role.name }))
              : [],
            isVerified: userdata?.verified_at ? true : false,
          };
          console.log("USER", state.user);
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchUserStatus = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("MAAAAAAa:", action.error.message);
      })
      //Signup Email
      .addCase(signUpEmail.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(signUpEmail.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
        console.log("+++++++++++status", state.status);
        if (state.status === StatusRequest.success) {
          const userdata = action.payload.data?.user;
          state.user = {
            id: userdata.id,
            name: userdata.name,
            email: userdata?.email ?? undefined,
            phone: userdata?.number ?? undefined,
            roles: userdata?.roles
              ? userdata.roles.map((role) => ({ id: role.id, name: role.name }))
              : [],
            isVerified: userdata?.verified_at ? true : false,
          };
          console.log("USER", state.user);
        }
      })
      .addCase(signUpEmail.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
        console.log("MAAAAAAa:", action.error.message);
      })
      //Sign up phone
      .addCase(signUpPhone.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(signUpPhone.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
        if (state.status === StatusRequest.success) {
          const userdata = action.payload.data?.user;
          state.user = {
            id: userdata.id,
            name: userdata.name,
            email: userdata?.email ?? undefined,
            phone: userdata?.number ?? undefined,
            roles: userdata?.roles
              ? userdata.roles.map((role) => ({ id: role.id, name: role.name }))
              : [],
            isVerified: userdata?.verified_at ? true : false,
          };
          console.log("USER", state.user);
        }
      })
      .addCase(signUpPhone.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
      })
      //login email
      .addCase(loginEmail.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(loginEmail.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
        console.log("STATUS:", state.status);

        if (state.status === StatusRequest.success) {
          const userdata = action.payload.data?.user;
          state.user = {
            id: userdata.id,
            name: userdata.name,
            email: userdata?.email ?? undefined,
            phone: userdata?.number ?? undefined,
            roles: userdata?.roles
              ? userdata.roles.map((role) => ({ id: role.id, name: role.name }))
              : [],
            isVerified: userdata?.verified_at ? true : false,
          };
          console.log(state.user);
        }
      })
      .addCase(loginEmail.rejected, (state, action) => {
        console.log("MAAAAAAa:", action.error.message);

        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
      })

      //login phone
      .addCase(loginPhone.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(loginPhone.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
        if (state.status === StatusRequest.success) {
          const userdata = action.payload.data?.user;
          state.user = {
            id: userdata.id,
            name: userdata.name,
            email: userdata?.email ?? undefined,
            phone: userdata?.number ?? undefined,
            roles: userdata?.roles
              ? userdata.roles.map((role) => ({ id: role.id, name: role.name }))
              : [],
            isVerified: userdata?.verified_at ? true : false,
          };
        }
      })
      .addCase(loginPhone.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
      })

      //Verfiy
      .addCase(verify.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
        if (state.status === StatusRequest.success) {
          const userdata = action.payload.data?.user;
          state.user = {
            id: userdata.id,
            name: userdata.name,
            email: userdata?.email ?? undefined,
            phone: userdata?.number ?? undefined,
            roles: userdata?.roles
              ? userdata.roles.map((role) => ({ id: role.id, name: role.name }))
              : [],
            isVerified: userdata?.verified_at ? true : false,
          };
        }
      })
      .addCase(verify.rejected, (state, action) => {
        console.log("MAAAAAA:", action.error.message);

        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
      })
      //Resend Otp
      .addCase(resendOtp.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
      })
      //Logout
      .addCase(logout.pending, (state) => {
        state.status = StatusRequest.loading;
        console.log("+++++++++++ loading");
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = handlingData(action.payload);
        console.log("+++++++++++", action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = StatusRequest.serverFailure;
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = authSlice.actions;
export default authSlice.reducer;
