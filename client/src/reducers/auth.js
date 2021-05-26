import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: ""
  },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    }
  }
});

export const { saveToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
