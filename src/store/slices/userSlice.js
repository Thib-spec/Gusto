import { createSlice } from "@reduxjs/toolkit";

const wellPayload = (payload) => {
  return {
    id: payload.id_user,
    language: payload.user_language,
    client: payload.fk_id_client,
    level: payload.fk_id_level,
    ...payload,
  };
};

const initValue = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  image: undefined,
  language: undefined,
  // authToken: undefined,
  client: undefined,
  level: undefined,
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
        ...wellPayload(action.payload),
      };
    },
    logout: (state) => {
      state.value = { ...initValue };
    },
    update: (state, action) => {
      state.value = { ...state.value, ...wellPayload(action.payload) };
    },
  },
});

export default userSlice;
