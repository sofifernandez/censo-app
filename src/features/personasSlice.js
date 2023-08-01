import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const personasSlice = createSlice({
  name: "personas",
  initialState,
    reducers: {
        guardarPersonas: (state, action) => {
            state.data = action.payload;
        },
        agregarPersona: (state, action) => {
            //state.data = [...state.data, action.payload];
            state.data.push(action.payload);
        },
        eliminarPersona: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload);
        }
    }
});

export const { guardarPersonas, agregarPersona, eliminarPersona } = personasSlice.actions;
export default personasSlice.reducer;
