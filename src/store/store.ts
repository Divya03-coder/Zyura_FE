import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseAPI } from "./api/baseApi";
import staticContentSlice from "./features/adminDashboard/staticContent/staticContentSlice";
import authReducer from "./features/auth/auth.slice";

const persistConfig = {
  key: "auth",
  storage,
};

const staticContentPersistConfig = {
  key: "staticContent",
  storage,
  whitelist: [
    "studentType",
    "profileType",
    "contentType",
    "contentFor",
    "type",
    "bankId",
  ],
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedStaticContentReducer = persistReducer(
  staticContentPersistConfig,
  staticContentSlice,
);

import { bioDigitalExternalAPI } from "./features/bioDigital/bioDigitalExternal.api";
import { drugApi } from "./features/drugApi/drugApi";
import quizReducer from "./features/MCQBank/quizSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    [bioDigitalExternalAPI.reducerPath]: bioDigitalExternalAPI.reducer,
    [drugApi.reducerPath]: drugApi.reducer,
    auth: persistedReducer,
    staticContent: persistedStaticContentReducer,
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(baseAPI.middleware)
      .concat(bioDigitalExternalAPI.middleware)
      .concat(drugApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
