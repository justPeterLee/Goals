import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState = {
  value: 0,
} as CounterState;

export const test = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state, action) => {
      state.value += 1;
      //   console.log(state);
    },
    decrement: (state, action) => {
      state.value += 1;
    },
  },
});

export const { increment, decrement } = test.actions;

export default test.reducer;
