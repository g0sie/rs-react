import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api/apiSlice';

import searchReducer from './pages/Home/searchSlice';
import formsReducer from './pages/Forms/formsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    search: searchReducer,
    forms: formsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
