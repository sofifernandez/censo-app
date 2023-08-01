import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  nombre: "No definido",
};

export const ocupacionesSlice = createSlice({
  name: "ocupaciones",
  initialState,
  reducers: {
    guardarOcupaciones: (state, action) => {
      state.data = action.payload;
    },
    buscarOcupacion: (state, action) => {
      const filteredData = state.data.find((item) => item.id === action.payload
      );
      state.nombre = filteredData.ocupacion 
    },
  },
});

export const { guardarOcupaciones, buscarOcupacion } = ocupacionesSlice.actions;
export default ocupacionesSlice.reducer;
