import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { movieApi } from "../services/movieApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});
