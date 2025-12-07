import { createSlice } from "@reduxjs/toolkit";

type InitialStateTypes = Record<string, never>;

export const initialState: InitialStateTypes = {};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const {} = globalSlice.actions;

export default globalSlice.reducer;
