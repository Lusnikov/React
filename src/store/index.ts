import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import citiesSlice from "./slice/citiesSlice";
import productSlice from "./slice/productSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
    reducer: {
      user: userSlice,
      cities: citiesSlice,
      products: productSlice
    },
  })

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  export const useAppDispatch: () => AppDispatch = useDispatch