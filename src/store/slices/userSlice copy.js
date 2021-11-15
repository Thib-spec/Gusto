import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
        firstName:undefined,
        lastName:undefined,
        email:undefined,
        pp_url:undefined,
        language:undefined,
        authToken:undefined,
    },
  },
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
    login: (state, action) => {
        state.value = {...state.value,...action.payload}
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, } = counterSlice.actions

export default counterSlice.reducer