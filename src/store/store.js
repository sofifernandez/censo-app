import { configureStore } from "@reduxjs/toolkit";
import departamentosReducer from "../features/departamentosSlice";
import ocupacionesReducer from "../features/ocupacionesSlice";
import personasReducer from "../features/personasSlice";

export const store = configureStore({
    reducer: {
        departamentos: departamentosReducer,
        ocupaciones: ocupacionesReducer,
        personas:personasReducer
    }
});