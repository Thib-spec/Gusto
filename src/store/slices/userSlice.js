import { createSlice } from "@reduxjs/toolkit";
import usersMapper from "helpers/mappers/users.mapper";

const initValue = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  image: undefined,
  language: undefined,
  // authToken: undefined,
  id_client: undefined,
  id_level: undefined,
  client: {
    name: undefined,
  },
  level: {
    label: undefined,
  },
  isLogged: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: { ...initValue },
  },
  reducers: {
    login: (state, action) => {
      state.value = {
        ...state.value,
        ...usersMapper(action.payload),
        isLogged: true,
      };
    },
    logout: (state) => {
      state.value = { ...initValue };
    },
    update: (state, action) => {
      state.value = { ...state.value, ...usersMapper(action.payload) };
    },
  },
});

export default userSlice;
