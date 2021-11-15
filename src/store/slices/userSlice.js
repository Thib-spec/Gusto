import { createSlice } from "@reduxjs/toolkit";

const initValue = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  pp_url: undefined,
  language: undefined,
  authToken: undefined,
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: { ...initValue },
  },
  reducers: {
    login: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    logout: (state) => {
      state.value = { ...initValue };
    },
  },
});

export default userSlice;
