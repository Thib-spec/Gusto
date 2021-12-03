import { createSlice } from "@reduxjs/toolkit";

const wellPayload = (payload) => {
  return {
    id: payload.id_user,
    firstName: payload.firstname,
    lastName: payload.lastname,
    language: payload.user_language,
    id_client: payload.fk_id_client,
    id_level: payload.fk_id_level,
    client:{name:"Olivia"},
    // client:"Olivia",
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
  id_client: undefined,
  id_level: undefined,
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
        isLogged: true
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
