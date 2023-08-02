import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const ocupacionesSlice = createSlice({
  name: "ocupaciones",
  initialState,
  reducers: {
    guardarOcupaciones: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { guardarOcupaciones, buscarOcupacion } = ocupacionesSlice.actions;
export default ocupacionesSlice.reducer;
