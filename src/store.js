import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./Reducers/RootReducer";

export const store = configureStore({
  reducer:RootReducer
})