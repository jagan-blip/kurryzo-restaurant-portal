import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeDetails: "",
  authenticated: false,
  login_email: "",
  login_password: "",
  login_otp_token: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStoreDetails: (state, action) => {
      state.storeDetails = action.payload;
    },
    setAuthenticated: (state, { payload }) => {
      state.authenticated = payload;
    },
    setLoginData: (state, { payload }) => {
      state.login_email = payload.email;
      state.login_password = payload.password;
      state.login_otp_token = payload.token;
    },
  },
});
export const { setStoreDetails, setAuthenticated, setLoginData } =
  authSlice.actions;
export default authSlice.reducer;
