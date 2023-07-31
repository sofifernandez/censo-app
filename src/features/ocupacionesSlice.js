import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    nombre:""
}

export const ocupacionesSlice = createSlice({
    name: 'ocupaciones',
    initialState,
    reducers: {
        guardarOcupaciones: (state, action) => {
            state.data = action.payload
        },
        buscarOcupacion: (state, action) => {
            const filteredData = state.data.filter((item) => item.id === action.payload);
            console.log(filteredData)
            state.nombre = filteredData.nombre;
        }
    }
})

export const {guardarOcupaciones,buscarOcupacion } = ocupacionesSlice.actions;
export default ocupacionesSlice.reducer;