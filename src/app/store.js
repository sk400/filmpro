import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import { movieApi } from "../services/movieApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,

    [movieApi.reducerPath]: movieApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});
