import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[]
}

export const departamentosSlice = createSlice({
    name: 'departamentos',
    initialState,
    reducers: {
        guardarDptos: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {guardarDptos } = departamentosSlice.actions;
export default departamentosSlice.reducer;