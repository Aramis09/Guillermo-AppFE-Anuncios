import { configureStore } from "@reduxjs/toolkit";

// reducers
import { reducerExample, reducerToken } from "./features/index";
import { postApi } from "./services/apiPost";

export const store = configureStore({
  reducer: {
    example: reducerExample,
    tokenLogin: reducerToken,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
